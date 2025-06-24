"""
API router
"""

from fastapi import APIRouter

from app.api.endpoints import health, weather

api_router = APIRouter()

# Include endpoint routers
api_router.include_router(health.router, prefix="", tags=["Health"])
api_router.include_router(weather.router, prefix="/weather", tags=["Weather"])

# Legacy routes for backward compatibility
api_router.include_router(
    weather.router,
    prefix="",
    tags=["Legacy"],
    include_in_schema=False,  # Hide from OpenAPI docs
)
