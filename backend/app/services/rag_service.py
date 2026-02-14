import os
import glob
from typing import List, Dict

class RAGService:
    def __init__(self):
        self.knowledge_base: Dict[str, str] = {}
        self.is_initialized = False
        
    def load_knowledge_base(self, directory_path: str):
        """Loads all .txt files into a simple dictionary keyed by filename stem."""
        if self.is_initialized:
            return

        print(f"Loading knowledge base from {directory_path}...")
        files = glob.glob(os.path.join(directory_path, "*.txt"))
        
        for file_path in files:
            try:
                base_name = os.path.splitext(os.path.basename(file_path))[0].lower() # e.g. "tajmahal"
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    self.knowledge_base[base_name] = content
                    print(f"Loaded {base_name}: {len(content)} chars")
            except Exception as e:
                print(f"Error reading {file_path}: {e}")
        
        self.is_initialized = True

    def get_context(self, message: str) -> str:
        """Simple keyword matching to retrieve context."""
        message_lower = message.lower()
        context_parts = []
        
        # Naive keyword search against loaded files
        for key, text in self.knowledge_base.items():
            # If the filename (e.g. tajmahal) is in the message, include it.
            # Split key by camelCase or just check inclusion
            if key in message_lower or key.replace(" ", "") in message_lower:
                # Limit context size to avoid token limits (approx 4000 chars ~ 1k tokens)
                context_parts.append(f"--- Information about {key} ---\n{text[:4000]}")
        
        if not context_parts:
             # Basic default if nothing matches but we want to be helpful?
             # For now, return empty if no keyword match
             return ""
             
        return "\n\n".join(context_parts)

rag_service = RAGService()
