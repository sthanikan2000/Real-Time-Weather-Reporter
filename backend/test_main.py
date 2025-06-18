import pytest
import os
from fastapi.testclient import TestClient
from unittest.mock import patch, AsyncMock
import httpx

# Set test environment variables before importing main
os.environ["WEATHER_API_KEY"] = "test_key_123"

from main import app, WeatherService

client = TestClient(app)

class TestWeatherAPI:
    """Test suite for Weather API endpoints"""
    
    def test_root_endpoint(self):
        """Test the root endpoint"""
        response = client.get("/")
        assert response.status_code == 200
        assert "Weather Reporter API is running" in response.json()["message"]
    
    def test_health_endpoint(self):
        """Test the health check endpoint"""
        response = client.get("/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert "timestamp" in data
        assert data["service"] == "Weather Reporter API"
    
    @patch.object(WeatherService, 'get_weather')
    def test_colombo_weather_endpoint(self, mock_get_weather):
        """Test the Colombo-specific weather endpoint"""
        # Mock the weather service response
        mock_weather_data = {
            "location": "Colombo, Sri Lanka",
            "temperature": 28.5,
            "humidity": 75,
            "wind_speed": 12.0,
            "uv_index": 7.0,
            "condition": "Partly cloudy",
            "icon_url": "https://cdn.weatherapi.com/weather/64x64/day/116.png",
            "last_updated": "2024-06-17 15:30"
        }
        
        mock_get_weather.return_value = mock_weather_data
        
        response = client.get("/weather/colombo")
        assert response.status_code == 200
        data = response.json()
        assert data["location"] == "Colombo, Sri Lanka"
        assert data["temperature"] == 28.5
        assert data["humidity"] == 75
        assert data["wind_speed"] == 12.0
        assert data["uv_index"] == 7.0
    
    @patch.object(WeatherService, 'get_weather')
    def test_weather_endpoint_with_city_parameter(self, mock_get_weather):
        """Test the weather endpoint with city parameter"""
        mock_weather_data = {
            "location": "London, United Kingdom",
            "temperature": 15.2,
            "humidity": 60,
            "wind_speed": 8.5,
            "uv_index": 3.0,
            "condition": "Overcast",
            "icon_url": "https://cdn.weatherapi.com/weather/64x64/day/122.png",
            "last_updated": "2024-06-17 15:30"
        }
        
        mock_get_weather.return_value = mock_weather_data
        
        response = client.get("/weather?city=London")
        assert response.status_code == 200
        data = response.json()
        assert data["location"] == "London, United Kingdom"
        assert data["temperature"] == 15.2


class TestWeatherService:
    """Test suite for WeatherService class"""
    
    def test_weather_service_initialization(self):
        """Test WeatherService initialization"""
        service = WeatherService()
        assert service.api_key == "test_key_123"
        assert service.base_url == "http://api.weatherapi.com/v1"
    
    def test_weather_service_no_api_key(self):
        """Test WeatherService initialization without API key"""
        with patch.dict(os.environ, {}, clear=True):
            with pytest.raises(ValueError, match="Weather API key is required"):
                WeatherService()
    
    @pytest.mark.asyncio
    async def test_get_weather_success(self):
        """Test successful weather data retrieval"""
        service = WeatherService()
        
        # Mock httpx response
        mock_response_data = {
            "location": {
                "name": "Colombo",
                "country": "Sri Lanka"
            },
            "current": {
                "temp_c": 28.5,
                "humidity": 75,
                "wind_kph": 12.0,
                "uv": 7.0,
                "condition": {
                    "text": "Partly cloudy",
                    "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png"
                },
                "last_updated": "2024-06-17 15:30"
            }
        }
        
        with patch('httpx.AsyncClient') as mock_client:
            mock_response = AsyncMock()
            mock_response.status_code = 200
            mock_response.json.return_value = mock_response_data
            
            mock_client.return_value.__aenter__.return_value.get.return_value = mock_response
            
            result = await service.get_weather("Colombo")
            
            assert result.location == "Colombo, Sri Lanka"
            assert result.temperature == 28.5
            assert result.humidity == 75
            assert result.wind_speed == 12.0
            assert result.uv_index == 7.0
            assert result.condition == "Partly cloudy"
    
    @pytest.mark.asyncio
    async def test_get_weather_invalid_location(self):
        """Test weather retrieval with invalid location"""
        service = WeatherService()
        
        with patch('httpx.AsyncClient') as mock_client:
            mock_response = AsyncMock()
            mock_response.status_code = 400
            mock_response.json.return_value = {
                "error": {"message": "No matching location found."}
            }
            
            mock_client.return_value.__aenter__.return_value.get.return_value = mock_response
            
            with pytest.raises(Exception):  # Should raise HTTPException
                await service.get_weather("InvalidCity123")
    
    @pytest.mark.asyncio
    async def test_get_weather_api_timeout(self):
        """Test weather retrieval with API timeout"""
        service = WeatherService()
        
        with patch('httpx.AsyncClient') as mock_client:
            mock_client.return_value.__aenter__.return_value.get.side_effect = httpx.TimeoutException("Timeout")
            
            with pytest.raises(Exception):  # Should raise HTTPException
                await service.get_weather("Colombo")


class TestErrorHandling:
    """Test suite for error handling"""
    
    @patch.object(WeatherService, 'get_weather')
    def test_500_error_handling(self, mock_get_weather):
        """Test 500 error handling"""
        mock_get_weather.side_effect = Exception("Internal server error")
        
        response = client.get("/weather/colombo")
        assert response.status_code == 500
        data = response.json()
        assert data["error"] == "INTERNAL_ERROR"
        assert "timestamp" in data


if __name__ == "__main__":
    # Run tests
    pytest.main([__file__, "-v"])