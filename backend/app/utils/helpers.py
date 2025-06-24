"""
Utility helper functions
"""
from datetime import datetime
from typing import Optional


def parse_coordinates(coord_str: str) -> tuple[float, float]:
    """
    Parse coordinate string like "lat,lon" into float tuple
    
    Args:
        coord_str: Coordinate string in format "lat,lon"
        
    Returns:
        Tuple of (latitude, longitude)
        
    Raises:
        ValueError: If coordinate string is invalid
    """
    try:
        parts = coord_str.split(',')
        if len(parts) != 2:
            raise ValueError("Coordinate string must be in format 'lat,lon'")
        
        lat = float(parts[0].strip())
        lon = float(parts[1].strip())
        
        # Validate coordinate ranges
        if not (-90 <= lat <= 90):
            raise ValueError("Latitude must be between -90 and 90")
        if not (-180 <= lon <= 180):
            raise ValueError("Longitude must be between -180 and 180")
        
        return lat, lon
    except (ValueError, IndexError) as e:
        raise ValueError(f"Invalid coordinate format: {e}")


def format_timestamp(timestamp: Optional[str]) -> Optional[str]:
    """
    Format timestamp string to ISO format
    
    Args:
        timestamp: Timestamp string
        
    Returns:
        Formatted timestamp or None if invalid
    """
    if not timestamp:
        return None
    
    try:
        # Try to parse common timestamp formats
        formats = [
            "%Y-%m-%d %H:%M",
            "%Y-%m-%d %H:%M:%S",
            "%Y-%m-%dT%H:%M:%S",
            "%Y-%m-%dT%H:%M:%SZ"
        ]
        
        for fmt in formats:
            try:
                dt = datetime.strptime(timestamp, fmt)
                return dt.isoformat()
            except ValueError:
                continue
        
        # If no format matches, return original
        return timestamp
    except Exception:
        return timestamp


def validate_location_name(location: str) -> bool:
    """
    Validate location name
    
    Args:
        location: Location name string
        
    Returns:
        True if valid, False otherwise
    """
    if not location or not isinstance(location, str):
        return False
    
    # Check length
    if len(location.strip()) < 2:
        return False
    
    # Check for reasonable characters (letters, spaces, hyphens, apostrophes)
    import re
    pattern = r"^[a-zA-Z\s\-'.,()]+$"
    return bool(re.match(pattern, location.strip()))


def clean_location_name(location: str) -> str:
    """
    Clean and normalize location name
    
    Args:
        location: Raw location name
        
    Returns:
        Cleaned location name
    """
    if not location:
        return ""
    
    # Strip whitespace and normalize
    cleaned = location.strip()
    
    # Remove multiple spaces
    import re
    cleaned = re.sub(r'\s+', ' ', cleaned)
    
    return cleaned