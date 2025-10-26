from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.routes import auth, chat, itinerary, art, heritage, translate
from .config import get_settings

settings = get_settings()

app = FastAPI(
    title="BharatVerse API",
    description="AI Cultural Companion",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(chat.router)
app.include_router(itinerary.router)
app.include_router(art.router)
app.include_router(heritage.router)
app.include_router(translate.router)

@app.get("/")
def root():
    backend = "Ollama" if settings.use_ollama else "Gemini 2.5 Pro"
    return {
        "message": f"Welcome to BharatVerse API ",
        "docs": "/docs",
        "version": "1.0.0"
    }

@app.get("/health")
def health_check():
    backend = "Ollama" if settings.use_ollama else "Gemini 2.5 Pro"
    return {
        "status": "healthy",
        "ai_provider": backend
    }
