from sqlalchemy import Column, DateTime, ForeignKey, Index, Integer, String, Text, Unicode, text
from sqlalchemy.dialects.mssql.base import BIT, MONEY, NUMERIC, FLOAT
from .BaseDefinition import Base
from sqlalchemy.orm import relationship, backref, column_property, deferred
from application.models.RessourceHardwareConfigurationModel import RessourceHardwareConfiguration


class RessourceHardware(Base):
    column_default_sort = ('Brand', True)
    __tablename__ = 'RessourceHardware'

    ID_RessourceHardware = Column(Integer, primary_key=True)
    Brand = Column(Unicode(255))
    Model = Column(Unicode(255))
    SerialNumber = Column(Unicode(255))
    DateIn = Column(DateTime)
    Price = Column(FLOAT)
    Owner = Column(Unicode(255))
    Status = Column(Unicode(255))
    Origin = Column(Unicode(255))
    Category = Column(Unicode(255))
    Type = Column(Unicode(255))
    TechnicalInfo = Column(Unicode)
    Comments = Column(Unicode)
    DateImport = Column(DateTime)
    BarCode = Column(String(255, 'French_CI_AS'), unique=True)
    ModuleCommand = Column(Unicode)
    ModuleSpecific = Column(Unicode)
    RessourceConfigurationRack = relationship(
        "RessourceHardwareConfiguration", foreign_keys="RessourceHardwareConfiguration.ID_RessourceHardwareRack", back_populates="RessourceHardwareRack")
    RessourceConfigurationPlayer = relationship(
        "RessourceHardwareConfiguration", foreign_keys="RessourceHardwareConfiguration.ID_RessourceHardwarePlayer", back_populates="RessourceHardwarePlayer")
    Elements = relationship("RessourceHardwareConfigurationElement",
                            foreign_keys="RessourceHardwareConfigurationElement.ID_RessourceHardware", back_populates="RessourceHardware")
