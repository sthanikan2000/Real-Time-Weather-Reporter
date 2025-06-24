"""
Application configuration
"""

from functools import lru_cache
from typing import List

from pydantic import Field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings"""

    # Weather API Configuration
    weather_api_key: str = Field(..., description="WeatherAPI.com API key")
    weather_api_url: str = Field(
        default="http://api.weatherapi.com/v1", description="Weather API base URL"
    )
    forecast_api_url: str = Field(
        default="http://api.weatherapi.com/v1/forecast.json",
        description="Forecast API URL",
    )

    # Environment
    environment: str = Field(default="development", description="Environment")

    # CORS
    allowed_origins: List[str] = Field(
        default=["http://localhost:3000", "http://localhost:5173"],
        description="Allowed CORS origins",
    )

    # Logging
    log_level: str = Field(default="INFO", description="Logging level")

    # API Configuration
    api_timeout: float = Field(
        default=10.0, description="API request timeout in seconds"
    )
    forecast_days: int = Field(
        default=2, description="Number of forecast days to fetch"
    )

    class Config:
        env_file = ".env"
        case_sensitive = False

    def get_allowed_origins_list(self) -> List[str]:
        """Get allowed origins as a list"""
        if isinstance(self.allowed_origins, str):
            return [origin.strip() for origin in self.allowed_origins.split(",")]
        return self.allowed_origins


@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance"""
    return Settings()
