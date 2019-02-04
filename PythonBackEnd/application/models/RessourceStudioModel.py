from sqlalchemy import Column, DateTime, ForeignKey, Index, Integer, String, Text, Unicode, text
from sqlalchemy.dialects.mssql.base import BIT, MONEY
from sqlalchemy.orm import relationship, backref
from sqlalchemy.orm.collections import attribute_mapped_collection
from .BaseDefinition import Base

class RessourceStudio(Base):
    __tablename__ = 'RessourceStudio'

    ID_RessourceStudio = Column(Integer, primary_key=True)
    RessourceStudio_CreationDate = Column(DateTime, nullable=False, server_default=text("(getdate())"))
    RessourceStudio_LastModificationDate = Column(DateTime)
    RessourceStudio_Code = Column(Unicode(10), nullable=False)
    RessourceStudio_Name = Column(Unicode(100), nullable=False)
    RessourceStudio_Active = Column(BIT, nullable=False, server_default=text("((1))"))
    lineDigits = relationship("RessourceHardwareConfiguration")