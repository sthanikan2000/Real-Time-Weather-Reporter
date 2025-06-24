"""
Weather endpoints
"""
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException

from app.services.weather_service import WeatherService
from app.api.dependencies import get_weather_service, validate_location_params
from app.models.weather import WeatherResponse, ErrorResponse
from app.core.exceptions import (
    LocationNotFoundException,
    WeatherServiceException,
    APIQuotaExceededException,
    APIAuthenticationException
)
from app.core.logging import get_logger

router = APIRouter()
logger = get_logger(__name__)


@router.get(
    "/forecast",
    response_model=WeatherResponse,
    responses={
        200: {"description": "Weather forecast retrieved successfully"},
        400: {"model": ErrorResponse, "description": "Invalid request parameters"},
        404: {"model": ErrorResponse, "description": "Location not found"},
        429: {"model": ErrorResponse, "description": "API quota exceeded"},
        503: {"model": ErrorResponse, "description": "Weather service unavailable"}
    },
    tags=["Weather"]
)
async def get_weather_forecast(
    location_params: tuple = Depends(validate_location_params),
    weather_service: WeatherService = Depends(get_weather_service)
) -> WeatherResponse:
    """
    Get current weather and 24-hour forecast for a location
    
    **Parameters:**
    - **location**: Location name (e.g., "London", "New York", "Colombo")
    - **lat**: Latitude coordinate (-90 to 90)
    - **lon**: Longitude coordinate (-180 to 180)
    
    **Note:** Provide either `location` OR both `lat` and `lon`, not both.
    
    **Returns:**
    - Current weather conditions
    - 24-hour hourly forecast
    - Weather alerts (if any)
    - Location information
    """
    location, lat, lon = location_params
    
    try:
        logger.info(f"Fetching weather forecast for: {location or f'{lat},{lon}'}")
        
        # Get weather forecast from service
        weather_data = await weather_service.get_weather_forecast(
            location=location,
            lat=lat,
            lon=lon
        )
        
        logger.info(f"Successfully retrieved weather data for: {weather_data.message.location.name}")
        return weather_data
        
    except LocationNotFoundException as e:
        logger.warning(f"Location not found: {e.message}")
        raise HTTPException(status_code=e.status_code, detail=e.message)
    
    except APIQuotaExceededException as e:
        logger.error(f"API quota exceeded: {e.message}")
        raise HTTPException(status_code=e.status_code, detail=e.message)
    
    except APIAuthenticationException as e:
        logger.error(f"API authentication failed: {e.message}")
        raise HTTPException(status_code=e.status_code, detail=e.message)
    
    except WeatherServiceException as e:
        logger.error(f"Weather service error: {e.message}")
        raise HTTPException(status_code=e.status_code, detail=e.message)
    
    except Exception as e:
        logger.error(f"Unexpected error in weather endpoint: {e}")
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred while fetching weather data"
        )
