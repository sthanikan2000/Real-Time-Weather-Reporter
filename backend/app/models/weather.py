"""
Weather data models
"""
from typing import List, Optional
from pydantic import BaseModel, Field


class WeatherCondition(BaseModel):
    """Weather condition model"""
    text: str = Field(..., description="Weather condition text")
    icon: str = Field(..., description="Weather icon URL")


class CurrentWeather(BaseModel):
    """Current weather model"""
    last_updated: str = Field(..., description="Last updated timestamp")
    temp_c: float = Field(..., description="Temperature in Celsius")
    temp_f: float = Field(..., description="Temperature in Fahrenheit")
    feelslike_c: float = Field(..., description="Feels like temperature in Celsius")
    feelslike_f: float = Field(..., description="Feels like temperature in Fahrenheit")
    condition: WeatherCondition = Field(..., description="Weather condition")
    wind_mph: float = Field(..., description="Wind speed in mph")
    wind_kph: float = Field(..., description="Wind speed in kph")
    wind_degree: int = Field(..., description="Wind direction in degrees")
    wind_dir: str = Field(..., description="Wind direction")
    humidity: int = Field(..., description="Humidity percentage")
    uv: float = Field(..., description="UV index")
    gust_kph: float = Field(..., description="Wind gust in kph")
    gust_mph: float = Field(..., description="Wind gust in mph")
    precip_mm: float = Field(..., description="Precipitation in mm")
    precip_in: float = Field(..., description="Precipitation in inches")


class HourlyForecast(BaseModel):
    """Hourly forecast model"""
    time: str = Field(..., description="Forecast time")
    temp_c: float = Field(..., description="Temperature in Celsius")
    temp_f: float = Field(..., description="Temperature in Fahrenheit")
    condition: WeatherCondition = Field(..., description="Weather condition")
    wind_mph: float = Field(..., description="Wind speed in mph")
    wind_kph: float = Field(..., description="Wind speed in kph")
    wind_degree: int = Field(..., description="Wind direction in degrees")
    wind_dir: str = Field(..., description="Wind direction")
    humidity: int = Field(..., description="Humidity percentage")
    uv: float = Field(..., description="UV index")
    precip_mm: float = Field(..., description="Precipitation in mm")
    precip_in: float = Field(..., description="Precipitation in inches")


class Location(BaseModel):
    """Location model"""
    name: str = Field(..., description="Location name")
    region: str = Field(..., description="Region/state")
    country: str = Field(..., description="Country")


class Alert(BaseModel):
    """Weather alert model"""
    headline: str = Field(..., description="Alert headline")
    msgtype: Optional[str] = Field(None, description="Message type")
    severity: Optional[str] = Field(None, description="Severity level")
    urgency: Optional[str] = Field(None, description="Urgency level")
    areas: Optional[str] = Field(None, description="Affected areas")
    category: str = Field(..., description="Alert category")
    certainty: Optional[str] = Field(None, description="Certainty level")
    event: str = Field(..., description="Event type")
    note: Optional[str] = Field(None, description="Additional notes")
    effective: str = Field(..., description="Effective date")
    expires: str = Field(..., description="Expiry date")
    desc: str = Field(..., description="Description")
    instruction: str = Field(..., description="Instructions")


class WeatherMessage(BaseModel):
    """Weather message model"""
    location: Location = Field(..., description="Location information")
    alerts: List[Alert] = Field(default=[], description="Weather alerts")
    current: CurrentWeather = Field(..., description="Current weather")
    forecast: List[HourlyForecast] = Field(..., description="Hourly forecast")


class WeatherResponse(BaseModel):
    """Weather API response model"""
    error: bool = Field(default=False, description="Error status")
    message: WeatherMessage = Field(..., description="Weather data")


class ErrorResponse(BaseModel):
    """Error response model"""
    error: bool = Field(default=True, description="Error status")
    message: str = Field(..., description="Error message")
    detail: Optional[str] = Field(None, description="Error details")