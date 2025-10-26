from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from ...database import get_db
from ...models.heritage import State, Festival, Monument, ArtForm
from ...schemas.heritage import StateSchema, FestivalSchema, MonumentSchema, ArtFormSchema

router = APIRouter(prefix="/api/heritage", tags=["Heritage"])

@router.get("/states", response_model=List[StateSchema])
def get_states(db: Session = Depends(get_db), skip: int = 0, limit: int = 50):
    """Get all Indian states"""
    states = db.query(State).offset(skip).limit(limit).all()
    return states

@router.get("/festivals", response_model=List[FestivalSchema])
def get_festivals(
    db: Session = Depends(get_db),
    state: Optional[str] = Query(None),
    month: Optional[str] = Query(None),
    skip: int = 0,
    limit: int = 50
):
    """Get festivals, optionally filtered by state or month"""
    query = db.query(Festival)
    if state:
        query = query.filter(Festival.state == state)
    if month:
        query = query.filter(Festival.month == month)
    festivals = query.offset(skip).limit(limit).all()
    return festivals

@router.get("/monuments", response_model=List[MonumentSchema])
def get_monuments(
    db: Session = Depends(get_db),
    state: Optional[str] = Query(None),
    unesco: Optional[bool] = Query(None),
    skip: int = 0,
    limit: int = 50
):
    """Get monuments, optionally filtered"""
    query = db.query(Monument)
    if state:
        query = query.filter(Monument.state == state)
    if unesco:
        query = query.filter(Monument.unesco_site == "Yes")
    monuments = query.offset(skip).limit(limit).all()
    return monuments

@router.get("/art-forms", response_model=List[ArtFormSchema])
def get_art_forms(
    db: Session = Depends(get_db),
    type: Optional[str] = Query(None),
    state: Optional[str] = Query(None),
    skip: int = 0,
    limit: int = 50
):
    """Get art forms, optionally filtered"""
    query = db.query(ArtForm)
    if type:
        query = query.filter(ArtForm.type == type)
    if state:
        query = query.filter(ArtForm.state == state)
    art_forms = query.offset(skip).limit(limit).all()
    return art_forms

@router.get("/search")
def search_heritage(q: str = Query(..., min_length=2), db: Session = Depends(get_db)):
    """Search across all heritage data"""
    search_term = f"%{q}%"
    
    festivals = db.query(Festival).filter(
        Festival.name.ilike(search_term) | Festival.description.ilike(search_term)
    ).limit(10).all()
    
    monuments = db.query(Monument).filter(
        Monument.name.ilike(search_term) | Monument.description.ilike(search_term)
    ).limit(10).all()
    
    art_forms = db.query(ArtForm).filter(
        ArtForm.name.ilike(search_term) | ArtForm.description.ilike(search_term)
    ).limit(10).all()
    
    return {
        "query": q,
        "results": {
            "festivals": [FestivalSchema.from_orm(f) for f in festivals],
            "monuments": [MonumentSchema.from_orm(m) for m in monuments],
            "art_forms": [ArtFormSchema.from_orm(a) for a in art_forms]
        }
    }
