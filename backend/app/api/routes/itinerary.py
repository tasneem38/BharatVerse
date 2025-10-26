from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
import json

from ...database import get_db
from ...models.itinerary import Itinerary
from ...schemas.itinerary import ItineraryCreate, ItineraryResponse

router = APIRouter(prefix="/api/itinerary", tags=["Itinerary"])

ALLOWED_STATES = [
    "Delhi", "Uttar Pradesh", "Maharashtra", "Odisha",
    "Tamil Nadu", "Karnataka", "Rajasthan", "West Bengal"
]

STATE_ITINERARIES = {
    "maharashtra": {
        "monuments": [
            {
                "name": "Gateway of India",
                "description": "A monumental arch built in 1911 to commemorate King George V's visit; a major Mumbai landmark.",
                "image_url": "https://upload.wikimedia.org/wikipedia/commons/3/3d/Gateway_Of_India_Mumbai.jpg"
            },
            {
                "name": "Ajanta & Ellora Caves",
                "description": "Rock-cut Buddhist, Hindu, and Jain caves near Aurangabad; UNESCO World Heritage sites.",
                "image_url": "https://upload.wikimedia.org/wikipedia/commons/3/34/Ajanta_Caves_View.jpg"
            }
        ],
        "festivals": [
            {
                "name": "Ganesh Chaturthi",
                "description": "The grand celebration of Lord Ganesha with huge idols, processions, and devotion across Maharashtra.",
                "image_url": "https://upload.wikimedia.org/wikipedia/commons/b/b6/Ganesh_Chaturthi_Mumbai.jpg"
            },
            {
                "name": "Ellora Ajanta Festival",
                "description": "A cultural festival showcasing classical dance and music at the Ellora Caves backdrop.",
                "image_url": "https://upload.wikimedia.org/wikipedia/commons/0/0b/Ellora_Caves_Festival.jpg"
            }
        ],
        "food": [
            {
                "name": "Vada Pav",
                "description": "Mumbai’s iconic street snack — spicy potato fritter sandwiched in a soft bun with chutneys.",
                "image_url": "https://upload.wikimedia.org/wikipedia/commons/2/2f/Vada_Pav.JPG"
            },
            {
                "name": "Puran Poli",
                "description": "A traditional sweet flatbread stuffed with jaggery and lentil filling, made during festivals.",
                "image_url": "https://upload.wikimedia.org/wikipedia/commons/d/d5/Puran_Poli.jpg"
            }
        ]
    },
    "uttar pradesh": {
        "monuments": [
            {
                "name": "Taj Mahal",
                "description": "World-famous white marble mausoleum, symbol of love and a UNESCO World Heritage site.",
                "image_url": "images/TajMahal.jpg"
            },
            {
                "name": "Fatehpur Sikri",
                "description": "Historic Mughal capital built by Emperor Akbar, known for its red sandstone architecture.",
                "image_url": "https://upload.wikimedia.org/wikipedia/commons/2/21/Fatehpur_Sikri.jpg"
            }
        ],
        "festivals": [
            {
                "name": "Holi, Mathura-Vrindavan",
                "description": "The festival of colors celebrated vibrantly in Lord Krishna’s birthplace.",
                "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8f/Holi_Mathura.jpg"
            },
            {
                "name": "Diwali in Ayodhya",
                "description": "Known for record-breaking diya (lamp) celebrations on the banks of the Saryu River.",
                "image_url": "https://upload.wikimedia.org/wikipedia/commons/7/7f/Ayodhya_Diwali_Celebration.jpg"
            }
        ],
        "food": [
            {
                "name": "Tunday Kababi",
                "description": "Famous Lucknow delicacy of minced meat kebabs, seasoned with aromatic spices.",
                "image_url": "https://upload.wikimedia.org/wikipedia/commons/2/2a/Tunday_Kababi.jpg"
            },
            {
                "name": "Banarasi Paan",
                "description": "A sweet, aromatic betel leaf delicacy from Varanasi, enjoyed after meals.",
                "image_url": "https://upload.wikimedia.org/wikipedia/commons/f/fb/Banarasi_Paan.jpg"
            }
        ]
    }
    # Add other states as needed following the same pattern with lowercase keys for states and interest categories
}

@router.post("/generate", response_model=ItineraryResponse)
async def generate_itinerary(
    request: ItineraryCreate,
    db: Session = Depends(get_db)
):
    location = request.location.lower()
    interest = request.interests.lower()
    if location not in STATE_ITINERARIES:
        raise HTTPException(status_code=400, detail=f"Location {location} is not supported.")
    activities = STATE_ITINERARIES[location].get(interest, [])
    itinerary_data = {
        "title": f"Top {interest.title()} places to visit in {request.location.title()}",
        "activities": activities
    }
    new_itinerary = Itinerary(
        user_id=None,
        title=itinerary_data["title"],
        interests=request.interests,
        location=request.location,
        days=None,
        plan=json.dumps(itinerary_data)
    )
    db.add(new_itinerary)
    db.commit()
    db.refresh(new_itinerary)
    return {
        "id": new_itinerary.id,
        "user_id": new_itinerary.user_id,
        "title": new_itinerary.title,
        "interests": new_itinerary.interests,
        "location": new_itinerary.location,
        "plan": itinerary_data,  # or json.loads(new_itinerary.plan)
        "created_at": new_itinerary.created_at
    }
