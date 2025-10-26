from sqlalchemy import Column, Integer, String, Text, Float
from ..database import Base

class State(Base):
    __tablename__ = "states"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    region = Column(String)
    primary_language = Column(String)
    description = Column(Text)

class Festival(Base):
    __tablename__ = "festivals"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    month = Column(String)
    state = Column(String)
    location = Column(String)
    description = Column(Text)
    significance = Column(Text)
    image_url = Column(String)

class Monument(Base):
    __tablename__ = "monuments"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    state = Column(String)
    city = Column(String)
    era = Column(String)
    built_year = Column(String)
    description = Column(Text)
    significance = Column(Text)
    latitude = Column(Float)
    longitude = Column(Float)
    image_url = Column(String)
    unesco_site = Column(String, default="No")

class ArtForm(Base):
    __tablename__ = "art_forms"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    type = Column(String)
    state = Column(String)
    description = Column(Text)
    image_url = Column(String)
