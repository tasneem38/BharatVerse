from app.database import Base, engine
from sqlalchemy import text

print("🔧 Recreating tables in public schema...")

# Drop and recreate public schema
with engine.connect() as conn:
    conn.execute(text('DROP SCHEMA IF EXISTS public CASCADE'))
    conn.execute(text('CREATE SCHEMA public'))
    conn.commit()

print("✅ Public schema recreated")

# Create all tables
Base.metadata.create_all(bind=engine)

print("✅ Tables created in public schema")
print("\nTables created:")
print("  - users")
print("  - states")
print("  - festivals")
print("  - monuments")
print("  - art_forms")
print("  - itineraries")
print("  - chat_history")
