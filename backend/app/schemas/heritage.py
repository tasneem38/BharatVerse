from pydantic import BaseModel
from typing import Optional
class StateSchema(BaseModel):
    id: int
    name: str
    region: Optional[str]
    primary_language: Optional[str]
    description: Optional[str]
class Config:
    from_attributes = True
class FestivalSchema(BaseModel):
    id: int
    name: str
    month: Optional[str]
    state: Optional[str]
    location: Optional[str]
    description: Optional[str]
    significance: Optional[str]
    image_url: Optional[str]
class Config:
    from_attributes = True
class MonumentSchema(BaseModel):
    id: int
    name: str
    state: Optional[str]
    city: Optional[str]
    era: Optional[str]
    built_year: Optional[str]
    description: Optional[str]
    significance: Optional[str]
    latitude: Optional[float]
    longitude: Optional[float]
    image_url: Optional[str]
    unesco_site: Optional[str]
class Config:
    from_attributes = True
class ArtFormSchema(BaseModel):
    id: int
    name: str
    type: Optional[str]
    state: Optional[str]
    description: Optional[str]
    image_url: Optional[str]
class Config:
    from_attributes = True