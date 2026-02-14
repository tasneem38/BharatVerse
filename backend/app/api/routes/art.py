from fastapi import APIRouter
from ...schemas.itinerary import ArtGenerateRequest
from ...services.ai_service import ai_service

router = APIRouter(prefix="/api/art", tags=["Art"])

@router.post("/generate")
async def generate_art(
    request: ArtGenerateRequest,
    #current_user: User = Depends(get_current_user)
):
    """Generate AI art in traditional Indian styles using Gemini"""
    result = ai_service.generate_art_description(
        style=request.style,
        prompt=request.prompt
    )
    
    return {
        "style": request.style,
        "prompt": request.prompt,
        "result": result,
        "message": "Art generation successful"
    }

@router.get("/styles")
async def get_art_styles():
    """Get available Indian art styles"""
    styles = [
        {"id": "madhubani", "name": "Madhubani", "origin": "Bihar"},
        {"id": "warli", "name": "Warli", "origin": "Maharashtra"},
        {"id": "tanjore", "name": "Tanjore", "origin": "Tamil Nadu"},
        {"id": "pattachitra", "name": "Pattachitra", "origin": "Odisha"},
        {"id": "kalamkari", "name": "Kalamkari", "origin": "Andhra Pradesh"}
    ]
    return {"styles": styles}
