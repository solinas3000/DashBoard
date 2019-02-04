from eve_sqlalchemy.config import DomainConfig, ResourceConfig
from application.models import RessourceHardwareModel, RessourceHardwareConfigurationElementModel, RessourceHardwareConfigurationModel
from application.models import RessourceRackMappingHistoryModel, RessourceStudioModel, RessourceCategoryModel
from application.auth import MyBasicAuth
from application.config import DATABASE_STRING

DOMAIN = DomainConfig({
    'hardwares': ResourceConfig(RessourceHardwareModel.RessourceHardware),
    'elements': ResourceConfig(RessourceHardwareConfigurationElementModel.RessourceHardwareConfigurationElement),
    'digitlines': ResourceConfig(RessourceHardwareConfigurationModel.RessourceHardwareConfiguration),
    'workspaces': ResourceConfig(RessourceStudioModel.RessourceStudio),
    'categories': ResourceConfig(RessourceCategoryModel.RessourceCategory),
    'histories': ResourceConfig(RessourceRackMappingHistoryModel.RessourceRackMappingHistory)
}).render()

DOMAIN['hardwares']['pagination'] = True
DOMAIN['histories']['pagination'] = True

DOMAIN['workspaces']['schema']['lineDigits']['schema']['data_relation']['embeddable'] = True
DOMAIN['digitlines']['schema']['RessourceHardwarePlayer']['data_relation']['embeddable'] = True
DOMAIN['digitlines']['schema']['RessourceHardwareRack']['data_relation']['embeddable'] = True
DOMAIN['digitlines']['schema']['RessourceStudio']['data_relation']['embeddable'] = True
DOMAIN['digitlines']['schema']['Elements']['schema']['data_relation']['embeddable'] = True
DOMAIN['elements']['schema']['RessourceHardwareConfiguration']['data_relation']['embeddable'] = True
DOMAIN['elements']['schema']['RessourceHardware']['data_relation']['embeddable'] = True
DOMAIN['hardwares']['schema']['RessourceConfigurationRack']['schema']['data_relation']['embeddable'] = True
DOMAIN['hardwares']['schema']['RessourceConfigurationPlayer']['schema']['data_relation']['embeddable'] = True

DOMAIN['workspaces']['authentication'] = MyBasicAuth
DOMAIN['digitlines']['authentication'] = MyBasicAuth
DOMAIN['elements']['authentication'] = MyBasicAuth
DOMAIN['hardwares']['authentication'] = MyBasicAuth
DOMAIN['categories']['authentication'] = MyBasicAuth
DOMAIN['histories']['authentication'] = MyBasicAuth

my_settings = {
    'DEBUG' : True,
    'SQLALCHEMY_DATABASE_URI' : DATABASE_STRING,
    'SQLALCHEMY_TRACK_MODIFICATIONS' : False,
    'RESOURCE_METHODS' : ['GET'],
    'ITEM_METHODS' : ['GET'],
    'EMBEDDING' : True,
    'PAGINATION' : False,
    'PAGINATION_LIMIT' : 1000,
    'DATE_FORMAT' : "%Y-%m-%dT%H:%M:%S.%fZ",
    'DOMAIN': DOMAIN
}