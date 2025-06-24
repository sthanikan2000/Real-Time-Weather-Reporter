"""
Custom exceptions
"""

from typing import Optional


class WeatherAPIException(Exception):
    """Base weather API exception"""

    def __init__(
        self, message: str, status_code: int = 500, detail: Optional[str] = None
    ):
        self.message = message
        self.status_code = status_code
        self.detail = detail
        super().__init__(self.message)


class LocationNotFoundException(WeatherAPIException):
    """Location not found exception"""

    def __init__(self, location: str):
        super().__init__(
            message=f"Location '{location}' not found",
            status_code=404,
            detail="Please check the location name and try again",
        )


class WeatherServiceException(WeatherAPIException):
    """Weather service exception"""

    def __init__(self, message: str = "Weather service unavailable"):
        super().__init__(
            message=message,
            status_code=503,
            detail="Weather service is temporarily unavailable",
        )


class APIQuotaExceededException(WeatherAPIException):
    """API quota exceeded exception"""

    def __init__(self):
        super().__init__(
            message="API quota exceeded",
            status_code=429,
            detail="API request limit reached. Please try again later",
        )


class APIAuthenticationException(WeatherAPIException):
    """API authentication exception"""

    def __init__(self):
        super().__init__(
            message="Weather API authentication failed",
            status_code=500,
            detail="Invalid API credentials",
        )
