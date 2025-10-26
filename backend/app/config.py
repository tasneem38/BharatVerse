from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    database_url: str
    secret_key: str
    refresh_secret_key: str  # Add this, keep separate key from access
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    gemini_api_key: str
    google_api_key: str = ""
    huggingface_api_key: str = ""
    use_ollama: bool = False
    ollama_model: str = "llama3"
    
    class Config:
        env_file = ".env"
        case_sensitive = False

@lru_cache()
def get_settings():
    return Settings()
