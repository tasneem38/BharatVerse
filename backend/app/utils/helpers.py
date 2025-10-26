"""
Helper utility functions for BharatVerse
"""

from datetime import datetime
from typing import Optional
import re


def format_date(date: datetime, format_str: str = "%Y-%m-%d %H:%M:%S") -> str:
    """Format datetime object to string"""
    return date.strftime(format_str)


def sanitize_string(text: str) -> str:
    """Remove special characters from string"""
    return re.sub(r'[^\w\s-]', '', text)


def slugify(text: str) -> str:
    """Convert text to URL-friendly slug"""
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[-\s]+', '-', text)
    return text


def validate_indian_state(state: str) -> bool:
    """Validate if state is a valid Indian state/UT"""
    indian_states = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
        "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
        "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
        "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
        "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
        "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
    ]
    return state in indian_states


def get_indian_months() -> list:
    """Get list of Indian festival months"""
    return [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
        "Chaitra", "Vaisakha", "Jyeshtha", "Ashadha", "Shravana", "Bhadrapada",
        "Ashwin", "Kartik", "Margashirsha", "Pausha", "Magha", "Phalguna"
    ]


def truncate_text(text: str, max_length: int = 100, suffix: str = "...") -> str:
    """Truncate text to specified length"""
    if len(text) <= max_length:
        return text
    return text[:max_length].rsplit(' ', 1)[0] + suffix


def extract_keywords(text: str, max_keywords: int = 5) -> list:
    """Extract keywords from text (simple implementation)"""
    # Remove common words
    common_words = {'the', 'is', 'at', 'which', 'on', 'a', 'an', 'and', 'or', 'but', 'in', 'with', 'to', 'for', 'of'}
    words = re.findall(r'\w+', text.lower())
    keywords = [word for word in words if word not in common_words and len(word) > 3]
    return list(set(keywords))[:max_keywords]
