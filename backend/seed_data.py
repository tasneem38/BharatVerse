"""
Seed database with sample Indian heritage data
"""

from sqlalchemy.orm import Session
from app.database import SessionLocal, engine, Base
from app.models.heritage import State, Festival, Monument, ArtForm
from app.services.auth_service import get_password_hash
from app.models.user import User

def seed_states(db: Session):
    """Seed Indian states"""
    states_data = [
        {"name": "Rajasthan", "region": "North", "primary_language": "Hindi", "description": "Land of Kings"},
        {"name": "Kerala", "region": "South", "primary_language": "Malayalam", "description": "God's Own Country"},
        {"name": "Tamil Nadu", "region": "South", "primary_language": "Tamil", "description": "Land of Temples"},
        {"name": "Maharashtra", "region": "West", "primary_language": "Marathi", "description": "Gateway of India"},
        {"name": "Uttar Pradesh", "region": "North", "primary_language": "Hindi", "description": "Heartland of India"},
    ]
    
    for state_data in states_data:
        state = State(**state_data)
        db.add(state)
    
    db.commit()
    print("✅ States seeded")

def seed_festivals(db: Session):
    """Seed Indian festivals"""
    festivals_data = [
        {
            "name": "Diwali",
            "month": "October-November",
            "state": "All India",
            "location": "Pan India",
            "description": "Festival of Lights celebrating the victory of light over darkness",
            "significance": "Celebrates Lord Rama's return to Ayodhya",
            "image_url": ""
        },
        {
            "name": "Holi",
            "month": "March",
            "state": "All India",
            "location": "Pan India",
            "description": "Festival of Colors celebrating spring and love",
            "significance": "Celebrates the victory of good over evil",
            "image_url": ""
        },
        {
            "name": "Onam",
            "month": "August-September",
            "state": "Kerala",
            "location": "Kerala",
            "description": "Harvest festival of Kerala",
            "significance": "Celebrates the return of King Mahabali",
            "image_url": ""
        },
        {
            "name": "Durga Puja",
            "month": "September-October",
            "state": "West Bengal",
            "location": "Kolkata",
            "description": "Worship of Goddess Durga",
            "significance": "Celebrates victory of good over evil",
            "image_url": ""
        },
    ]
    
    for festival_data in festivals_data:
        festival = Festival(**festival_data)
        db.add(festival)
    
    db.commit()
    print("✅ Festivals seeded")

def seed_monuments(db: Session):
    """Seed Indian monuments"""
    monuments_data = [
        {
            "name": "Taj Mahal",
            "state": "Uttar Pradesh",
            "city": "Agra",
            "era": "Mughal",
            "built_year": "1653",
            "description": "Iconic white marble mausoleum built by Shah Jahan",
            "significance": "Symbol of love and Mughal architecture",
            "latitude": 27.1751,
            "longitude": 78.0421,
            "unesco_site": "Yes"
        },
        {
            "name": "Red Fort",
            "state": "Delhi",
            "city": "Delhi",
            "era": "Mughal",
            "built_year": "1648",
            "description": "Historic fortification in Old Delhi",
            "significance": "Main residence of Mughal emperors",
            "latitude": 28.6562,
            "longitude": 77.2410,
            "unesco_site": "Yes"
        },
        {
            "name": "Hawa Mahal",
            "state": "Rajasthan",
            "city": "Jaipur",
            "era": "Rajput",
            "built_year": "1799",
            "description": "Palace of Winds with 953 windows",
            "significance": "Allowed royal ladies to observe street life",
            "latitude": 26.9239,
            "longitude": 75.8267,
            "unesco_site": "No"
        },
        {
            "name": "Gateway of India",
            "state": "Maharashtra",
            "city": "Mumbai",
            "era": "British",
            "built_year": "1924",
            "description": "Iconic arch monument overlooking Arabian Sea",
            "significance": "Built to commemorate King George V's visit",
            "latitude": 18.9220,
            "longitude": 72.8347,
            "unesco_site": "No"
        },
    ]
    
    for monument_data in monuments_data:
        monument = Monument(**monument_data)
        db.add(monument)
    
    db.commit()
    print("✅ Monuments seeded")

def seed_art_forms(db: Session):
    """Seed Indian art forms"""
    art_forms_data = [
        {
            "name": "Madhubani",
            "type": "painting",
            "state": "Bihar",
            "description": "Traditional folk art with intricate patterns and nature motifs",
            "image_url": ""
        },
        {
            "name": "Warli",
            "type": "painting",
            "state": "Maharashtra",
            "description": "Ancient tribal art using simple geometric shapes",
            "image_url": ""
        },
        {
            "name": "Bharatanatyam",
            "type": "dance",
            "state": "Tamil Nadu",
            "description": "Classical dance form with spiritual themes",
            "image_url": ""
        },
        {
            "name": "Kathakali",
            "type": "dance",
            "state": "Kerala",
            "description": "Classical dance-drama known for elaborate costumes",
            "image_url": ""
        },
    ]
    
    for art_form_data in art_forms_data:
        art_form = ArtForm(**art_form_data)
        db.add(art_form)
    
    db.commit()
    print("✅ Art forms seeded")

def seed_test_user(db: Session):
    """Create a test user"""
    # Check if test user already exists
    existing_user = db.query(User).filter(User.email == "test@bharatverse.com").first()
    if existing_user:
        print("✅ Test user already exists (email: test@bharatverse.com, password: password123)")
        return
    
    test_user = User(
        email="test@bharatverse.com",
        username="testuser",
        hashed_password=get_password_hash("password123"),
        preferred_language="en",
        interests="heritage,temples,food"
    )
    db.add(test_user)
    db.commit()
    print("✅ Test user created (email: test@bharatverse.com, password: password123)")

def main():
    """Run all seed functions"""
    print("🌱 Seeding database with sample data...")
    
    # Create tables first
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        seed_states(db)
        seed_festivals(db)
        seed_monuments(db)
        seed_art_forms(db)
        seed_test_user(db)
        print("\n🎉 Database seeding completed successfully!")
    except Exception as e:
        print(f"❌ Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    main()
