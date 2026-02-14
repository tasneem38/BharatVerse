from fastapi import APIRouter
from ...schemas.itinerary import ChatRequest, ChatResponse
from ...services.ai_service import ai_service
import uuid

router = APIRouter(prefix="/api/chat", tags=["Chat"])

@router.post("/", response_model=ChatResponse)
async def chat_with_ai(request: ChatRequest):
    session_id = request.session_id or str(uuid.uuid4())
    
    # Call AI service directly (no database dependency for now)
    ai_response = ai_service.get_cultural_response(
        request.message, 
        history=None,  # Simplified: no history for now
        language=request.language or "en"
    )

    return ChatResponse(response=ai_response, session_id=session_id)
