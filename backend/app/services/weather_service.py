"""
Weather service module
"""

from datetime import datetime
from typing import Optional, Tuple

import httpx

from app.core.config import get_settings
from app.core.exceptions import (APIAuthenticationException,
                                 APIQuotaExceededException,
                                 LocationNotFoundException,
                                 WeatherServiceException)
from app.core.logging import get_logger
from app.models.weather import (Alert, CurrentWeather, HourlyForecast,
                                Location, WeatherCondition, WeatherMessage,
                                WeatherResponse)

logger = get_logger(__name__)
settings = get_settings()


class WeatherService:
    """Weather service class"""

    def __init__(self):
        self.api_key = settings.weather_api_key
        self.base_url = settings.weather_api_url
        self.forecast_url = settings.forecast_api_url
        self.timeout = settings.api_timeout
        self.forecast_days = settings.forecast_days

    async def get_weather_forecast(
        self,
        location: Optional[str] = None,
        lat: Optional[float] = None,
        lon: Optional[float] = None,
    ) -> WeatherResponse:
        """
        Get weather forecast for a location

        Args:
            location: Location name (e.g., "London", "New York")
            lat: Latitude
            lon: Longitude

        Returns:
            WeatherResponse: Weather forecast data

        Raises:
            LocationNotFoundException: If location is not found
            WeatherServiceException: If service is unavailable
            APIQuotaExceededException: If API quota is exceeded
            APIAuthenticationException: If API authentication fails
        """
        try:
            # Validate input parameters
            query = self._build_query(location, lat, lon)

            # Make API request
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                response = await client.get(
                    self.forecast_url,
                    params={
                        "key": self.api_key,
                        "q": query,
                        "days": self.forecast_days,
                        "aqi": "no",
                        "alerts": "yes",
                    },
                )

                # Handle different response status codes
                self._handle_response_status(response, location or f"{lat},{lon}")

                data = response.json()

                # Transform and return data
                return self._transform_weather_data(data)

        except httpx.TimeoutException:
            logger.error("Weather API request timeout")
            raise WeatherServiceException("Weather service timeout")
        except httpx.RequestError as e:
            logger.error(f"Weather API request error: {e}")
            raise WeatherServiceException("Weather service unavailable")
        except Exception as e:
            logger.error(f"Unexpected error in weather service: {e}")
            raise WeatherServiceException(f"Unexpected error: {str(e)}")

    def _build_query(
        self, location: Optional[str], lat: Optional[float], lon: Optional[float]
    ) -> str:
        """Build query string for API request"""
        if location:
            return location
        elif lat is not None and lon is not None:
            return f"{lat},{lon}"
        else:
            raise ValueError("Either location or lat/lon coordinates must be provided")

    def _handle_response_status(self, response: httpx.Response, location: str) -> None:
        """Handle different HTTP response status codes"""
        if response.status_code == 400:
            raise LocationNotFoundException(location)
        elif response.status_code == 401:
            raise APIAuthenticationException()
        elif response.status_code == 403:
            raise APIQuotaExceededException()
        elif response.status_code != 200:
            raise WeatherServiceException(f"Weather API error: {response.status_code}")

    def _transform_weather_data(self, data: dict) -> WeatherResponse:
        """Transform API response data to our models"""
        try:
            # Get current time for filtering forecast
            current_time = datetime.strptime(
                data["location"]["localtime"], "%Y-%m-%d %H:%M"
            )

            # Filter forecast to get next 24 hours
            forecast_hours = self._get_filtered_forecast(data, current_time)

            # Build response
            weather_response = WeatherResponse(
                error=False,
                message=WeatherMessage(
                    location=Location(
                        name=data["location"]["name"],
                        region=data["location"]["region"],
                        country=data["location"]["country"],
                    ),
                    alerts=self._transform_alerts(
                        data.get("alerts", {}).get("alert", [])
                    ),
                    current=self._transform_current_weather(data["current"]),
                    forecast=self._transform_forecast(forecast_hours),
                ),
            )

            return weather_response

        except Exception as e:
            logger.error(f"Error transforming weather data: {e}")
            raise WeatherServiceException(f"Error processing weather data: {str(e)}")

    def _get_filtered_forecast(self, data: dict, current_time: datetime) -> list:
        """Get filtered forecast for next 24 hours"""
        try:
            # Find the starting index for current hour
            filter_start_index = 0
            today_hours = data["forecast"]["forecastday"][0]["hour"]

            for i, hour in enumerate(today_hours):
                hour_time = datetime.strptime(hour["time"], "%Y-%m-%d %H:%M")
                if hour_time > current_time:
                    filter_start_index = i
                    break

            # Get remaining hours from today + hours from tomorrow
            remaining_today = today_hours[filter_start_index:]
            tomorrow_hours = (
                data["forecast"]["forecastday"][1]["hour"]
                if len(data["forecast"]["forecastday"]) > 1
                else []
            )

            # Take only what we need to make 24 hours
            needed_tomorrow = max(0, 24 - len(remaining_today))

            return remaining_today + tomorrow_hours[:needed_tomorrow]

        except Exception as e:
            logger.error(f"Error filtering forecast: {e}")
            # Return today's hours as fallback
            return data["forecast"]["forecastday"][0]["hour"]

    def _transform_alerts(self, alerts_data: list) -> list[Alert]:
        """Transform alerts data"""
        alerts = []
        for alert in alerts_data:
            try:
                alerts.append(
                    Alert(
                        headline=alert.get("headline", ""),
                        msgtype=alert.get("msgtype"),
                        severity=alert.get("severity"),
                        urgency=alert.get("urgency"),
                        areas=alert.get("areas"),
                        category=alert.get("category", ""),
                        certainty=alert.get("certainty"),
                        event=alert.get("event", ""),
                        note=alert.get("note"),
                        effective=alert.get("effective", ""),
                        expires=alert.get("expires", ""),
                        desc=alert.get("desc", ""),
                        instruction=alert.get("instruction", ""),
                    )
                )
            except Exception as e:
                logger.warning(f"Error transforming alert: {e}")
                continue
        return alerts

    def _transform_current_weather(self, current_data: dict) -> CurrentWeather:
        """Transform current weather data"""
        return CurrentWeather(
            last_updated=current_data["last_updated"],
            temp_c=current_data["temp_c"],
            temp_f=current_data["temp_f"],
            feelslike_c=current_data["feelslike_c"],
            feelslike_f=current_data["feelslike_f"],
            condition=WeatherCondition(
                text=current_data["condition"]["text"],
                icon=current_data["condition"]["icon"],
            ),
            wind_mph=current_data["wind_mph"],
            wind_kph=current_data["wind_kph"],
            wind_degree=current_data["wind_degree"],
            wind_dir=current_data["wind_dir"],
            humidity=current_data["humidity"],
            uv=current_data["uv"],
            gust_kph=current_data["gust_kph"],
            gust_mph=current_data["gust_mph"],
            precip_mm=current_data["precip_mm"],
            precip_in=current_data["precip_in"],
        )

    def _transform_forecast(self, forecast_data: list) -> list[HourlyForecast]:
        """Transform forecast data"""
        forecast = []
        for hour in forecast_data:
            try:
                forecast.append(
                    HourlyForecast(
                        time=hour["time"],
                        temp_c=hour["temp_c"],
                        temp_f=hour["temp_f"],
                        condition=WeatherCondition(
                            text=hour["condition"]["text"],
                            icon=hour["condition"]["icon"],
                        ),
                        wind_mph=hour["wind_mph"],
                        wind_kph=hour["wind_kph"],
                        wind_degree=hour["wind_degree"],
                        wind_dir=hour["wind_dir"],
                        humidity=hour["humidity"],
                        uv=hour["uv"],
                        precip_mm=hour["precip_mm"],
                        precip_in=hour["precip_in"],
                    )
                )
            except Exception as e:
                logger.warning(f"Error transforming forecast hour: {e}")
                continue
        return forecast


# Service instance
weather_service = WeatherService()
