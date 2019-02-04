from sqlalchemy import Column, DateTime, ForeignKey, Index, Integer, String, Text, Unicode, text
from sqlalchemy.dialects.mssql.base import BIT, MONEY
from sqlalchemy.orm import relationship
from .BaseDefinition import Base


class RessourceHardwareConfigurationElement(Base):
    __tablename__ = 'RessourceHardwareConfigurationElement'

    ID_RessourceHardwareConfigurationElement = Column(
        Integer, primary_key=True)
    ID_RessourceHardwareConfiguration = Column(ForeignKey(
        'RessourceHardwareConfiguration.ID_RessourceHardwareConfiguration'), nullable=False)
    Position = Column(Integer, nullable=False)
    ID_RessourceHardware = Column(ForeignKey(
        'RessourceHardware.ID_RessourceHardware'), nullable=False)
    RessourceHardware = relationship('RessourceHardware', back_populates="Elements",
                                     primaryjoin='RessourceHardwareConfigurationElement.ID_RessourceHardware == RessourceHardware.ID_RessourceHardware')
    RessourceHardwareConfiguration = relationship(
        'RessourceHardwareConfiguration')
