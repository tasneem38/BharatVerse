import os
import json
from typing import List, Dict, Any
from groq import Groq
from ..config import get_settings
from .rag_service import rag_service

settings = get_settings()

class AIService:
    def __init__(self):
        # Initialize Groq Client
        api_key = os.getenv("GROQ_API_KEY") or settings.groq_api_key
        if not api_key:
            print("CRITICAL WARNING: GROQ_API_KEY not found.")
            self.client = None
        else:
            self.client = Groq(api_key=api_key)
            print("Groq (Llama 3.1) Client Initialized.")
            
        # Initialize RAG (Simple Loader)
        try:
             # Assuming structure is backend/app/services/ai_service.py -> backend/data/knowledge
             kb_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "data", "knowledge")
             rag_service.load_knowledge_base(kb_path)
        except Exception as e:
             print(f"RAG Init Error: {e}")

    def get_cultural_response(self, message: str, history: List[Dict] = None, language: str = "en") -> str:
        """Get AI response using Groq + Simple Context"""
        if not self.client:
            return "AI Service is not configured (Missing API Key)."

        # 1. Get Context (Simple Keyword Search)
        # Check if "context: " prefix exists in message
        user_query = message
        context_str = ""
        
        if "Context: " in message:
            # Extract passed context from frontend
            # e.g. "Context: User is looking at Taj Mahal. How tall is it?"
             parts = message.split("Context: ")
             if len(parts) > 1:
                 # It might be at the start or end. Usually "Context: ... . User query" or "query. Context:"
                 # Let's just use the full string for keyword search in RAG
                 pass

        # Retrieve text from loaded files based on keywords in message
        rag_context = rag_service.get_context(message)
        
        # 2. Build Prompt
        lang_instruction = "Answer in English."
        if language == 'hi':
            lang_instruction = "Answer in Hindi (Devanagari script). Be culturally respectful."
        elif language == 'ta':
            lang_instruction = "Answer in Tamil."
        
        system_prompt = f"""You are an expert Indian Heritage Guide.
        
        CONTEXT FROM ARCHIVES:
        {rag_context}
        
        INSTRUCTIONS:
        1. Use the Context above if relevant.
        2. If the answer is not in context, use your general knowledge (Llama 3.1) but mention you are using general knowledge.
        3. Be polite, educational, and concise.
        4. {lang_instruction}
        """
        
        messages = [{"role": "system", "content": system_prompt}]
        
        # History
        if history:
            for msg in history:
                messages.append({"role": msg['role'], "content": msg['content']})
        
        # Current Message
        messages.append({"role": "user", "content": message})
        
        try:
            completion = self.client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=messages,
                temperature=0.7,
                max_tokens=1024
            )
            return completion.choices[0].message.content
        except Exception as e:
            print(f"Groq Error: {e}")
            return "I'm having trouble connecting to the AI guide right now."

    def generate_itinerary(self, interests: str, location: str, days: int) -> Dict:
        """Generate itinerary using Groq JSON mode"""
        if not self.client:
            return {"error": "AI Offline"}

        prompt = f"""Create a detailed {days}-day cultural itinerary for {location}, India.
        Focus on: {interests}
        
        Return STRICT JSON with structure:
        {{
            "title": "...",
            "days": [
                {{ "day": 1, "theme": "...", "activities": [ {{ "time": "...", "activity": "...", "description": "..." }} ] }}
            ],
            "budget_estimate": "..."
        }}
        """
        
        try:
            completion = self.client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=[{"role": "user", "content": prompt}],
                response_format={"type": "json_object"}
            )
            return json.loads(completion.choices[0].message.content)
        except Exception as e:
            print(f"Itinerary Error: {e}")
            return {"title": "Error", "days": []}
            
    def generate_art_description(self, style: str, prompt: str) -> str:
        """Generate art description using Groq"""
        if not self.client:
            return "AI Offline"
            
        full_prompt = f"Describe {prompt} in the style of Indian {style} art. Vivid visual details."
        
        try:
            completion = self.client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=[{"role": "user", "content": full_prompt}]
            )
            return completion.choices[0].message.content
        except Exception as e:
            return f"Error: {e}"

# Singleton
ai_service = AIService()
