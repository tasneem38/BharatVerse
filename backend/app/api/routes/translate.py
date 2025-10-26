from fastapi import APIRouter
from ...schemas.itinerary import TranslateRequest
from ...services.translation_service import translation_service

router = APIRouter(prefix="/api/translate", tags=["Translation"])

@router.post("/")
async def translate_text(request: TranslateRequest):
    """Translate text to target language"""
    translated = translation_service.translate_text(
        text=request.text,
        target_language=request.target_language
    )
    
    return {
        "original": request.text,
        "translated": translated,
        "target_language": request.target_language
    }

@router.get("/languages")
async def get_supported_languages():
    """Get list of supported languages"""
    return {
        "languages": [
            {"code": "hi", "name": "Hindi"},
            {"code": "ta", "name": "Tamil"},
            {"code": "te", "name": "Telugu"},
            {"code": "bn", "name": "Bengali"},
            {"code": "mr", "name": "Marathi"},
            {"code": "gu", "name": "Gujarati"},
            {"code": "kn", "name": "Kannada"},
            {"code": "ml", "name": "Malayalam"},
            {"code": "pa", "name": "Punjabi"},
            {"code": "ur", "name": "Urdu"},
            {"code": "en", "name": "English"}
        ]
    }
