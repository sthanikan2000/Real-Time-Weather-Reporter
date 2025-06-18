from pydantic import BaseSettings, Field
from typing import List

class Settings(BaseSettings):
    weather_api_key: str = Field(..., env="WEATHER_API_KEY")
    weather_api_base_url: str = "http://api.weatherapi.com/v1"
    host: str = "0.0.0.0"
    port: int = Field(8000, env="PORT")
    debug: bool = Field(False, env="DEBUG")
    allowed_origins: List[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:3001",
    ]
    log_level: str = Field("INFO", env="LOG_LEVEL")
    rate_limit_per_minute: int = Field(60, env="RATE_LIMIT")

    class Config:
        env_file = ".env"
        case_sensitive = False

settings = Settings()

def validate_settings():
    if not settings.weather_api_key:
        raise ValueError(
            "WEATHER_API_KEY environment variable is required. "
            "Please sign up at https://weatherapi.com and set your API key."
        )
    print(f"✅ Settings validated successfully")
    print(f"🌤️  Weather API configured")
    print(f"🚀 Server will run on {settings.host}:{settings.port}")
    print(f"🔧 Debug mode: {settings.debug}")

if __name__ == "__main__":
    validate_settings()
