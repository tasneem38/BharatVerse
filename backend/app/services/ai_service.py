import google.generativeai as genai
from typing import List, Dict
from ..config import get_settings
from .ollama_service import ollama_service
import json

settings = get_settings()

class AIService:
    def __init__(self):
        self.use_ollama = settings.use_ollama
        
        if self.use_ollama:
            self.backend = "ollama"
            self.ollama_model = settings.ollama_model
            ollama_service.model = self.ollama_model
        else:
            self.backend = "gemini"
            genai.configure(api_key=settings.gemini_api_key)
            self.model = genai.GenerativeModel('gemini-2.5-pro')

    def get_cultural_response(self, message: str, history: List[Dict] = None) -> str:
        """Get AI response for cultural queries"""
        
        if self.backend == "ollama":
            # Format prompt with history for Ollama
            prompt = self._format_ollama_prompt(message, history)
            return ollama_service.chat(prompt)
        else:
            # Gemini 2.5 Pro
            system_prompt = """You are BharatVerse AI, an expert cultural guide on Indian heritage, 
            festivals, monuments, art forms, traditions, food, and history. 
            Provide accurate, engaging, and culturally sensitive information. 
            Keep responses informative but concise (2-3 paragraphs max)."""
            
            chat_history = []
            if history:
                for msg in history:
                    role = "user" if msg["role"] == "user" else "model"
                    chat_history.append({"role": role, "parts": [msg["content"]]})
            
            try:
                chat = self.model.start_chat(history=chat_history)
                full_prompt = f"{system_prompt}\n\nUser question: {message}"
                response = chat.send_message(full_prompt)
                return response.text
            except Exception as e:
                return f"I apologize, but I encountered an error: {str(e)}"

    def generate_itinerary(self, interests: str, location: str, days: int) -> Dict:
        """Generate personalized travel itinerary"""
        
        prompt = f"""Create a detailed {days}-day cultural itinerary for {location}, India.
        Focus on: {interests}
        
        Format as JSON with this structure:
        {{
            "title": "Cultural Journey through [Location]",
            "days": [
                {{
                    "day": 1,
                    "theme": "Heritage Exploration",
                    "activities": [
                        {{
                            "time": "9:00 AM",
                            "activity": "Visit [Monument]",
                            "description": "Brief description",
                            "duration": "2 hours"
                        }}
                    ],
                    "meals": ["Breakfast at X", "Lunch at Y"],
                    "tips": ["Tip 1", "Tip 2"]
                }}
            ],
            "budget_estimate": "INR X - Y per person",
            "best_season": "October to March"
        }}
        
        Return ONLY valid JSON, no markdown formatting."""
        
        if self.backend == "ollama":
            response_text = ollama_service.chat(prompt)
        else:
            try:
                response = self.model.generate_content(prompt)
                response_text = response.text.strip()
            except Exception as e:
                return {
                    "title": f"Cultural Journey through {location}",
                    "error": str(e),
                    "days": []
                }
        
        # Clean and parse JSON
        try:
            if response_text.startswith('```'):
                response_text = response_text[7:]
            if response_text.startswith('```'):
                response_text = response_text[3:]
            if response_text.endswith('```'):
                response_text = response_text[:-3]
            response_text = response_text.strip()
            
            return json.loads(response_text)
        except json.JSONDecodeError as e:
            return {
                "title": f"Cultural Journey through {location}",
                "error": f"JSON parsing error: {str(e)}",
                "days": []
            }

    def generate_art_description(self, style: str, prompt: str) -> str:
        """Generate art description"""
        
        art_styles = {
            "madhubani": "traditional Madhubani folk art from Bihar with intricate patterns",
            "warli": "ancient Warli tribal art from Maharashtra with geometric shapes",
            "tanjore": "classical Tanjore painting with gold foil and rich colors",
            "pattachitra": "traditional Pattachitra scroll painting from Odisha",
            "kalamkari": "hand-painted Kalamkari textile art from Andhra Pradesh"
        }
        
        style_desc = art_styles.get(style.lower(), "Indian traditional art")
        
        full_prompt = f"""Describe a beautiful artwork in {style_desc} style.
        Theme/Subject: {prompt}
        
        Include visual elements, color palette, cultural significance, and techniques.
        Keep it vivid and descriptive (2-3 paragraphs)."""
        
        if self.backend == "ollama":
            return ollama_service.chat(full_prompt)
        else:
            try:
                response = self.model.generate_content(full_prompt)
                return response.text
            except Exception as e:
                return f"Error generating art description: {str(e)}"

    def _format_ollama_prompt(self, message: str, history: List[Dict] = None) -> str:
        """Format prompt for Ollama with conversation history"""
        prompt = "You are BharatVerse AI, expert on Indian culture.\n\n"
        
        if history:
            for msg in history:
                role = msg.get("role", "user").capitalize()
                content = msg.get("content", "")
                prompt += f"{role}: {content}\n"
        
        prompt += f"User: {message}\nAssistant:"
        return prompt

# Singleton
ai_service = AIService()
