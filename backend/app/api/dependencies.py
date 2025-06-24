"""
API dependencies
"""

from typing import Optional

from fastapi import HTTPException, Query

from app.services.weather_service import weather_service


async def get_weather_service():
    """Get weather service dependency"""
    return weather_service


def validate_location_params(
    location: Optional[str] = Query(
        None, description="Location name (e.g., 'London', 'New York')"
    ),
    lat: Optional[float] = Query(
        None, description="Latitude (-90 to 90)", ge=-90, le=90
    ),
    lon: Optional[float] = Query(
        None, description="Longitude (-180 to 180)", ge=-180, le=180
    ),
) -> tuple[Optional[str], Optional[float], Optional[float]]:
    """
    Validate location parameters

    Either location or lat/lon coordinates must be provided
    """
    if not location and (lat is None or lon is None):
        raise HTTPException(
            status_code=400,
            detail="Either 'location' or both 'lat' and 'lon' parameters must be provided",
        )

    if location and (lat is not None or lon is not None):
        raise HTTPException(
            status_code=400,
            detail="Please provide either 'location' or 'lat'/'lon' coordinates, not both",
        )

    return location, lat, lon
