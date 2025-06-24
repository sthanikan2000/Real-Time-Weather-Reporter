"""
Health check endpoints
"""

from datetime import datetime

import httpx
from fastapi import APIRouter, Depends

from app.core.config import get_settings
from app.core.logging import get_logger

router = APIRouter()
logger = get_logger(__name__)


@router.get("/health", tags=["Health"])
async def health_check():
    """Basic health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "service": "Weather API",
    }


@router.get("/health/detailed", tags=["Health"])
async def detailed_health_check(settings: get_settings = Depends()):
    """Detailed health check including external service status"""
    health_data = {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "service": "Weather API",
        "version": "1.0.0",
        "environment": settings.environment,
        "external_services": {},
    }

    # Check weather API connectivity
    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            response = await client.get(
                f"{settings.weather_api_url}/current.json",
                params={
                    "key": settings.weather_api_key,
                    "q": "London",  # Test with a known location
                    "aqi": "no",
                },
            )
            health_data["external_services"]["weather_api"] = {
                "status": "healthy" if response.status_code == 200 else "unhealthy",
                "response_time_ms": (
                    response.elapsed.total_seconds() * 1000
                    if response.elapsed
                    else None
                ),
            }
    except Exception as e:
        logger.warning(f"Weather API health check failed: {e}")
        health_data["external_services"]["weather_api"] = {
            "status": "unhealthy",
            "error": str(e),
        }
        health_data["status"] = "degraded"

    return health_data
