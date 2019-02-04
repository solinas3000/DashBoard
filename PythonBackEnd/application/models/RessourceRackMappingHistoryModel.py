from sqlalchemy import Column, DateTime, Integer, Unicode
from .BaseDefinition import Base

class RessourceRackMappingHistory(Base):
    __tablename__ = 'RessourceRackMappingHistory'

    ID_RessourceRackMappingHistory = Column(Integer, primary_key=True)
    Agent = Column(Unicode(50), nullable=False)
    LastModified = Column(DateTime, nullable=False)
    ActionPath = Column(Unicode(50), nullable=False)
    PayloadIn = Column(Unicode, nullable=False)
    PayloadOut = Column(Unicode, nullable=False)