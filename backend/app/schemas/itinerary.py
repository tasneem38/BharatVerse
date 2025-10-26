from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class Activity(BaseModel):
    name: str
    description: str
    image_url: Optional[str]
class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None
    language: Optional[str] = "en"
class Plan(BaseModel):
    title: str
    activities: List[Activity]
class ChatResponse(BaseModel):
    response: str
    session_id: str
class ItineraryCreate(BaseModel):
    interests: str
    location: str
class TranslateRequest(BaseModel):
    text: str
    target_language: str

class ArtGenerateRequest(BaseModel):
    style: str
    prompt: str
class ItineraryResponse(BaseModel):
    id: int
    user_id: Optional[int]
    title: str
    interests: str
    location: str
    plan: Plan
    created_at: datetime

    class Config:
        orm_mode = True
