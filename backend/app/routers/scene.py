from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(
    prefix="/api/scene",
    tags=["Scene Interaction"]
)

# Configure Gemini
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    print("Warning: GEMINI_API_KEY not found in environment variables")
else:
    genai.configure(api_key=api_key)

class InteractionRequest(BaseModel):
    object_id: str
    query: str = "Explain this object"
    language: str = "en"

class InteractionResponse(BaseModel):
    title: str
    description: str
    cultural_significance: str

# Simulated Knowledge Base (RAG Source)
# in a real app, this would be a vector DB retrieval
KNOWLEDGE_BASE = {
    "taj_main_dome": {
        "name": "The Great Onion Dome",
        "context": "The central onion dome (amrudshaker) is the most recognizable feature of the Taj Mahal. It sits on a cylindrical drum and is topped by a lotus finial. The shape represents the vault of heaven."
    },
    "taj_minaret": {
        "name": "The Four Minarets",
        "context": "The four minarets frame the tomb. They are slightly tilted outwards so that in the event of an earthquake, they would fall away from the precious central mausoleum. They symbolize the four pillars of Islam."
    },
    "taj_pool": {
        "name": "The Reflecting Pool (Al-Hawd al-Kawthar)",
        "context": "The central reflecting pool aligns perfectly with the mausoleum. It represents the 'Tank of Abundance' promised to the Prophet Muhammad in Paradise. It mirrors the symmetry of the monument."
    },
    "taj_finial": {
        "name": "The Gold Finial",
        "context": "Originally made of gold (now bronze), the finial tops the main dome. It fuses Persian and Hindu elements, featuring a crescent moon pointing heavenward, a symbol of Islam."
    }
}

@router.post("/interact", response_model=InteractionResponse)
async def interact_with_scene(request: InteractionRequest):
    try:
        # 1. Retrieval (Simulated)
        context_data = KNOWLEDGE_BASE.get(request.object_id)
        
        if not context_data:
            # Fallback for unknown objects
            context_data = {
                "name": request.object_id.replace("_", " ").title(),
                "context": "A significant architectural element of the Indian heritage site, displaying traditional craftsmanship."
            }

        # 2. Generation (Gemini)
        model = genai.GenerativeModel('gemini-1.5-flash')
        
        prompt = f"""
        You are an expert Indian Heritage Guide.
        Context: {context_data['context']}
        Object: {context_data['name']}
        Query: {request.query}
        Output Language: {request.language} (If 'hi', use Hindi. If 'en', use English).
        
        Return valid JSON with the following structure (Keep keys in English, translate values):
        {{ "title": "...", "description": "...", "cultural_significance": "..." }}
        """
        
        try:
            response = model.generate_content(prompt)
             # Simple cleanup
            text = response.text.replace("```json", "").replace("```", "").strip()
            import json
            return InteractionResponse(**json.loads(text))
        except Exception as e:
            # Fallback for Rate Limit / Error
            print(f"Gemini Error: {e}")
            fallback_msg = "[Offline] AI unavailable."
            if request.language == 'hi':
                fallback_msg = "[Offline] AI उपलब्ध नहीं है."
                
            return InteractionResponse(
                title=context_data['name'],
                description=context_data['context'],
                cultural_significance=fallback_msg
            )
            
        except Exception as api_error:
            print(f"Ollama/Parsing Error: {api_error}")
            return InteractionResponse(
                title=context_data['name'],
                description=context_data['context'],
                cultural_significance="[Local Guide] " + context_data['context']
            )

    except Exception as e:
        print(f"General Error: {e}")
        # Ultimate fail-safe
        return InteractionResponse(
            title="Info Unavailable",
            description="Could not Retrieve data.",
            cultural_significance="N/A"
        )
