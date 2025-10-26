from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ...database import get_db
from ...models.itinerary import ChatHistory
from ...schemas.itinerary import ChatRequest, ChatResponse
from ...services.ai_service import ai_service
import uuid

router = APIRouter(prefix="/api/chat", tags=["Chat"])

@router.post("/", response_model=ChatResponse)
async def chat_with_ai(
    request: ChatRequest,
    db: Session = Depends(get_db)
):
    session_id = request.session_id or str(uuid.uuid4())

    history = db.query(ChatHistory).filter(
        ChatHistory.session_id == session_id
    ).order_by(ChatHistory.created_at.desc()).limit(5).all()

    conversation_history = []
    for chat in reversed(history):
        conversation_history.append({"role": "user", "content": chat.user_message})
        conversation_history.append({"role": "assistant", "content": chat.ai_response})

    ai_response = ai_service.get_cultural_response(request.message, conversation_history)

    chat_record = ChatHistory(
        user_id=None,  # Anonymous user
        session_id=session_id,
        user_message=request.message,
        ai_response=ai_response
    )
    db.add(chat_record)
    db.commit()

    return ChatResponse(response=ai_response, session_id=session_id)
