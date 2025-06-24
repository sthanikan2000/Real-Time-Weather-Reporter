# Weather Backend Project Structure

```
weather-backend/
├── .env.example
├── .env
├── .gitignore
├── requirements.txt
├── vercel.json
├── main.py
├── app/
│   ├── __init__.py
│   ├── models/
│   │   ├── __init__.py
│   │   └── weather.py
│   ├── services/
│   │   ├── __init__.py
│   │   └── weather_service.py
│   ├── api/
│   │   ├── __init__.py
│   │   ├── dependencies.py
│   │   ├── router.py
│   │   └── endpoints/
│   │       ├── __init__.py
│   │       ├── health.py
│   │       └── weather.py
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py
│   │   ├── exceptions.py
│   │   └── logging.py
│   └── utils/
│       ├── __init__.py
│       └── helpers.py
```

## Key Features

- **Modular Architecture**: Clean separation of concerns
- **Environment Configuration**: Proper .env file handling
- **Error Handling**: Robust exception handling
- **Logging**: Structured logging setup
- **Validation**: Pydantic models for request/response validation
- **CORS**: Properly configured for production
- **Health Checks**: Built-in health endpoints
- **Vercel Ready**: Configured for Vercel deployment

## Setup Instructions

1. Create the project structure as shown above
2. Copy the `.env.example` to `.env` and fill in your API keys
3. Install dependencies: `pip install -r requirements.txt`
4. Run locally: `uvicorn main:app --reload`
5. Access Swagger UI at: `http://localhost:8000/docs`
6. Deploy to Vercel using the provided `vercel.json` configuration

## API Endpoints

- `GET /` - Root endpoint
- `GET /health` - Health check
- `GET /api/v1/weather/forecast` - Weather forecast (supports location or lat/lon)

## Environment Variables

- `WEATHER_API_KEY`: Your WeatherAPI.com API key
- `WEATHER_API_URL`: Base URL for weather API
- `FORECAST_API_URL`: Forecast API endpoint
