from .ai_service import ai_service
from typing import Optional

class TranslationService:
    """Translation service using AI (Llama 3.1)"""
    
    def __init__(self):
        self.language_codes = {
            "hindi": "hi",
            "tamil": "ta",
            "telugu": "te",
            "bengali": "bn",
            "marathi": "mr",
            "gujarati": "gu",
            "kannada": "kn",
            "malayalam": "ml",
            "punjabi": "pa",
            "urdu": "ur",
            "english": "en"
        }
    
    def translate_text(self, text: str, target_language: str) -> Optional[str]:
        """Translate text to target language"""
        if not ai_service.client:
            return f"[Offline] {text}"
            
        lang_name = target_language
        # If code is passed, find name (not strictly necessary as LLM understands codes, but helpful)
        for name, code in self.language_codes.items():
            if code == target_language.lower():
                lang_name = name
                break
            
        prompt = f"""Translate the following text to {lang_name}.
        Text: "{text}"
        
        Return ONLY the translated text. No explanation."""
        
        try:
            completion = ai_service.client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.3
            )
            return completion.choices[0].message.content.strip()
        except Exception as e:
            print(f"Translation Error: {e}")
            return text

    def detect_language(self, text: str) -> str:
        """Detect language using AI"""
        # Simplification: return 'unknown' or verify via AI if needed. 
        # For now, let's keep it simple or implement via AI.
        return "unknown"

    def get_supported_languages(self) -> dict:
        return self.language_codes

# Create singleton instance
translation_service = TranslationService()
