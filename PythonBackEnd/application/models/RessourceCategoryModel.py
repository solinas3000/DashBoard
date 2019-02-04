from sqlalchemy import Column, Integer, Unicode, text
from sqlalchemy.dialects.mssql.base import BIT
from .BaseDefinition import Base

class RessourceCategory(Base):
    __tablename__ = 'RessourceCategory'
    ID_Category = Column(Integer, primary_key=True)
    Category = Column(Unicode(100), nullable=False)
    AllowMultipleLineDigit = Column(BIT, nullable=False, server_default=text("((1))"))