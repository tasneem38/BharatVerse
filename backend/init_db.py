"""
Database initialization script
Run this to create all tables
"""

from app.database import engine, Base
from app.models.user import User
from app.models.heritage import State, Festival, Monument, ArtForm
from app.models.itinerary import Itinerary, ChatHistory

def init_database():
    """Create all database tables"""
    print("🗄️  Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created successfully!")
    print("\nTables created:")
    print("  - users")
    print("  - states")
    print("  - festivals")
    print("  - monuments")
    print("  - art_forms")
    print("  - itineraries")
    print("  - chat_history")

if __name__ == "__main__":
    init_database()
