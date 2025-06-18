from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import httpx
import os
from typing import Optional
from pydantic import BaseModel, Field
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Pydantic models for request/response validation
class WeatherResponse(BaseModel):
    location: str
    temperature: float = Field(..., description="Temperature in Celsius")
    humidity: int = Field(..., ge=0, le=100, description="Humidity percentage")
    wind_speed: float = Field(..., ge=0, description="Wind speed in km/h")
    uv_index: float = Field(..., ge=0, description="UV Index")
    condition: str = Field(..., description="Weather condition")
    icon_url: Optional[str] = Field(None, description="Weather icon URL")
    last_updated: str = Field(..., description="Last updated timestamp")

class ErrorResponse(BaseModel):
    error: str
    message: str
    timestamp: str

# Weather service class
class WeatherService:
    def __init__(self):
        self.api_key = os.getenv("WEATHER_API_KEY")
        self.base_url = "http://api.weatherapi.com/v1"
        
        if not self.api_key:
            logger.error("WEATHER_API_KEY environment variable not set")
            raise ValueError("Weather API key is required")
    
    async def get_weather(self, city: str = "Colombo") -> WeatherResponse:
        """
        Fetch weather data from WeatherAPI
        """
        try:
            async with httpx.AsyncClient() as client:
                url = f"{self.base_url}/current.json"
                params = {
                    "key": self.api_key,
                    "q": city,
                    "aqi": "no"  # We don't need air quality data for basic requirements
                }
                
                logger.info(f"Fetching weather data for {city}")
                response = await client.get(url, params=params, timeout=10.0)
                
                if response.status_code == 200:
                    data = response.json()
                    return self._parse_weather_data(data)
                elif response.status_code == 400:
                    error_data = response.json()
                    raise HTTPException(
                        status_code=400, 
                        detail=f"Invalid location: {error_data.get('error', {}).get('message', 'Unknown error')}"
                    )
                elif response.status_code == 401:
                    raise HTTPException(status_code=500, detail="Weather service authentication failed")
                elif response.status_code == 403:
                    raise HTTPException(status_code=500, detail="Weather service access forbidden")
                else:
                    raise HTTPException(status_code=500, detail="Weather service unavailable")
                    
        except httpx.TimeoutException:
            logger.error(f"Timeout while fetching weather for {city}")
            raise HTTPException(status_code=504, detail="Weather service timeout")
        except httpx.RequestError as e:
            logger.error(f"Request error while fetching weather: {str(e)}")
            raise HTTPException(status_code=500, detail="Failed to connect to weather service")
    
    def _parse_weather_data(self, data: dict) -> WeatherResponse:
        """
        Parse the weather API response into our response model
        """
        try:
            location_data = data["location"]
            current_data = data["current"]
            
            return WeatherResponse(
                location=f"{location_data['name']}, {location_data['country']}",
                temperature=current_data["temp_c"],
                humidity=current_data["humidity"],
                wind_speed=current_data["wind_kph"],
                uv_index=current_data["uv"],
                condition=current_data["condition"]["text"],
                icon_url=f"https:{current_data['condition']['icon']}",
                last_updated=current_data["last_updated"]
            )
        except KeyError as e:
            logger.error(f"Missing key in weather data: {str(e)}")
            raise HTTPException(status_code=500, detail="Invalid weather data format")

# Initialize FastAPI app
app = FastAPI(
    title="Weather Reporter API",
    description="A robust API for fetching weather data",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "*"],  # Add your frontend URLs
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Initialize weather service
weather_service = None

@app.on_event("startup")
async def startup_event():
    """Initialize services on startup"""
    global weather_service
    try:
        weather_service = WeatherService()
        logger.info("Weather service initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize weather service: {str(e)}")
        raise

# Dependency to get weather service
def get_weather_service() -> WeatherService:
    if weather_service is None:
        raise HTTPException(status_code=500, detail="Weather service not initialized")
    return weather_service

# Exception handlers
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content=ErrorResponse(
            error="HTTP_ERROR",
            message=exc.detail,
            timestamp=datetime.utcnow().isoformat()
        ).dict()
    )

@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    logger.error(f"Unhandled exception: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content=ErrorResponse(
            error="INTERNAL_ERROR",
            message="An unexpected error occurred",
            timestamp=datetime.utcnow().isoformat()
        ).dict()
    )

# API Routes
@app.get("/")
async def root():
    """Health check endpoint"""
    return {"message": "Weather Reporter API is running", "status": "healthy"}

@app.get("/health")
async def health_check():
    """Detailed health check"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "service": "Weather Reporter API",
        "version": "1.0.0"
    }

@app.get("/weather", response_model=WeatherResponse)
async def get_current_weather(
    city: str = "Colombo",
    service: WeatherService = Depends(get_weather_service)
):
    """
    Get current weather for a specified city (defaults to Colombo)
    """
    logger.info(f"Weather request for city: {city}")
    return await service.get_weather(city)

@app.get("/weather/colombo", response_model=WeatherResponse)
async def get_colombo_weather(service: WeatherService = Depends(get_weather_service)):
    """
    Get current weather specifically for Colombo, Sri Lanka
    """
    return await service.get_weather("Colombo")

if __name__ == "__main__":
    import uvicorn
    
    # For development only
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )