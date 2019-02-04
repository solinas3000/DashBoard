from sqlalchemy import Column, DateTime, ForeignKey, Index, Integer, String, Text, Unicode, text
from sqlalchemy.dialects.mssql.base import BIT, MONEY
from sqlalchemy.orm import relationship, backref
from .BaseDefinition import Base


class RessourceHardwareConfiguration(Base):
    __tablename__ = 'RessourceHardwareConfiguration'
    __table_args__ = (
        Index('UQ_RessourceHardwareConfiguration_Player',
              'ID_RessourceHardwarePlayer', 'InstalledDate', unique=True),
        Index('UQ_RessourceHardwareConfiguration_Key', 'ID_RessourceStudio',
              'ID_RessourceHardwareRack', 'Position', 'InstalledDate', unique=True)
    )

    ID_RessourceHardwareConfiguration = Column(Integer, primary_key=True)
    ID_RessourceStudio = Column(ForeignKey(
        'RessourceStudio.ID_RessourceStudio'), nullable=False)
    ID_RessourceHardwareRack = Column(ForeignKey(
        'RessourceHardware.ID_RessourceHardware'), nullable=False)
    Position = Column(Integer, nullable=False)
    ID_RessourceHardwarePlayer = Column(ForeignKey(
        'RessourceHardware.ID_RessourceHardware'), nullable=False)
    Installed = Column(BIT, nullable=False, server_default=text("((1))"))
    InstalledDate = Column(DateTime, nullable=False,
                           server_default=text("(getdate())"))
    RemovedDate = Column(DateTime)
    RessourceHardwarePlayer = relationship('RessourceHardware', back_populates="RessourceConfigurationPlayer",
                                           primaryjoin='RessourceHardwareConfiguration.ID_RessourceHardwarePlayer == RessourceHardware.ID_RessourceHardware')
    RessourceHardwareRack = relationship('RessourceHardware', back_populates="RessourceConfigurationRack",
                                         primaryjoin='RessourceHardwareConfiguration.ID_RessourceHardwareRack == RessourceHardware.ID_RessourceHardware')
    RessourceStudio = relationship('RessourceStudio')
    Elements = relationship('RessourceHardwareConfigurationElement')
