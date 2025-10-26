from googletrans import Translator
from typing import Optional

class TranslationService:
    """Free translation service using googletrans library"""
    
    def __init__(self):
        self.translator = Translator()
        
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
        """
        Translate text to target language
        
        Args:
            text: Text to translate
            target_language: Target language name or code
            
        Returns:
            Translated text or error message
        """
        try:
            lang_code = self.language_codes.get(target_language.lower(), target_language)
            result = self.translator.translate(text, dest=lang_code)
            return result.text
        except Exception as e:
            return f"Translation error: {str(e)}"
    
    def detect_language(self, text: str) -> str:
        """
        Detect the language of text
        
        Args:
            text: Text to detect language for
            
        Returns:
            Language code
        """
        try:
            result = self.translator.detect(text)
            return result.lang
        except:
            return "unknown"
    
    def get_supported_languages(self) -> dict:
        """Get list of supported languages"""
        return self.language_codes

# Create singleton instance
translation_service = TranslationService()
