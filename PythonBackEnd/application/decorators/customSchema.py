# match Basic XML Schema standard based on the ISO 8601 standard
# format 2008-08-30T01:45:36.123Z
dateformat = '''^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\.[0-9]+)?(Z|[+-](?:2[0-3]|[01][0-9]):[0-5][0-9])?$'''

def datemod(v): return "%sZ" % v[0:23]


addWorkspace = {
    'schema': {
        'ID_RessourceStudio': {
            'required': True,
            'type': 'integer'
        },
        'RessourceStudio_CreationDate': {
            'nullable': True,
            'default': None,
            'type': 'string',
            'regex': dateformat,
            'coerce': datemod
        },
        'RessourceStudio_LastModificationDate': {
            'nullable': True,
            'default': None,
            'type': 'string',
            'regex': dateformat,
            'coerce': datemod
        },
        'RessourceStudio_Code': {
            'required': True,
            'type': 'string'
        },
        'RessourceStudio_Name': {
            'required': True,
            'type': 'string'
        },
        'RessourceStudio_Active': {
            'required': True,
            'type': 'boolean'
        }
    }
}

attemptAuth = {
    'schema': {
        'username': {
            'required': True,
            'type': 'string'
        },
        'password': {
            'required': True,
            'type': 'string'
        }
    }
}

createLineAndSavePosition = {
    'schema': {
        'lineToAdd': {
            'required': True,
            'type': 'list',
            'schema': {
                'type': 'dict',
                'schema': {
                    'type': {
                        'required': True,
                        'type': 'string'
                    },
                    'line': {
                        'required': True,
                        'type': 'dict',
                        'schema': {
                            'Position': {
                                'required': True,
                                'type': 'integer'
                            },
                            'ID_RessourceHardwareConfiguration': {
                                'required': True,
                                'type': 'integer'
                            },
                            'ID_RessourceHardwarePlayer': {
                                'nullable': True,
                                'default': None,
                                'type': 'integer'
                            },
                            'Old_ID_RessourceHardwareConfiguration_Player': {
                                'nullable': True,
                                'default': None,
                                'type': 'integer'
                            },
                            'Old_ID_RessourceHardwareConfiguration_Rack': {
                                'nullable': True,
                                'default': None,
                                'type': 'integer'
                            },
                            'ID_RessourceStudio': {
                                'required': True,
                                'type': 'integer'
                            },
                            'InstalledDate': {
                                'required': True,
                                'type': 'string',
                                'regex': dateformat,
                                'coerce': datemod
                            },
                            'RessourceHardwareRack': {
                                'required': True,
                                'type': 'dict',
                                'schema': {
                                    'ID_RessourceHardware': {
                                        'required': True,
                                        'type': 'integer'
                                    },
                                    'BarCode': {
                                        'required': True,
                                        'type': 'string'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        'racksPosition': {
            'required': True,
            'type': 'list',
            'schema': {
                'type': 'dict',
                'schema': {
                    'ID_line': {
                        'required': True,
                        'type': 'integer'
                    },
                    'position': {
                        'required': True,
                        'type': 'integer'
                    },
                    'ID_rack': {
                        'required': True,
                        'type': 'integer'
                    },
                    'nameRack': {
                        'required': True,
                        'type': 'string'
                    }
                }
            }
        }
    }
}

createRessourceHardware = {
    'schema': {
        'ID_RessourceHardware': {
            'nullable': True,
            'default': None,
            'type': 'integer'
        },
        'Brand': {
            'nullable': True,
            'default': None,
            'type': 'string'
        },
        'Model': {
            'nullable': True,
            'default': None,
            'type': 'string'
        },
        'SerialNumber': {
            'nullable': True,
            'default': None,
            'type': 'string'
        },
        'DateIn': {
            'nullable': True,
            'default': None,
            'type': 'string',
            'regex': dateformat,
            'coerce': datemod
        },
        'Configuration': {
            'nullable': True,
            'default': None,
            'type': 'string'
        },
        'Price': {
            'nullable': True,
            'default': None,
            'type': 'string'
        },
        'Status': {
            'nullable': True,
            'default': None,
            'type': 'string'
        },
        'Origin': {
            'nullable': True,
            'default': None,
            'type': 'string'
        },
        'Category': {
            'required': True,
            'type': 'string'
        },
        'Type': {
            'nullable': True,
            'default': None,
            'type': 'string'
        },
        'TechnicalInfo': {
            'nullable': True,
            'default': None,
            'type': 'string'
        },
        'Owner': {
            'nullable': True,
            'default': None,
            'type': 'string'
        },
        'Comments': {
            'nullable': True,
            'default': None,
            'type': 'string'
        },
        'DateImport': {
            'nullable': True,
            'default': None,
            'type': 'string',
            'regex': dateformat,
            'coerce': datemod
        },
        'BarCode': {
            'required': True,
            'type': 'string'
        },
        'ModuleCommand': {
            'nullable': True,
            'default': None,
            'type': 'string'
        },
        'ModuleSpecific': {
            'nullable': True,
            'default': None,
            'type': 'string'
        }
    }
}

savePositionElements = {
    'schema': {
        'ID_RessourceHardwareConfiguration': {
            'required': True,
            'type': 'integer'
        },
        'elementList': {
            'type': 'list',
            'schema': {
                'type': 'dict',
                'schema': {
                    'ID_RessourceHardwareConfigurationElement': {
                        'required': True,
                        'type': 'integer'
                    },
                    'RessourceHardwareConfiguration': {
                        'required': True,
                        'type': 'integer'
                    },
                    'Position': {
                        'required': True,
                        'type': 'integer'
                    },
                    'RessourceHardware': {
                        'required': True,
                        'type': 'dict',
                        'schema': {
                            'ID_RessourceHardware': {
                                'required': True,
                                'type': 'integer'
                            }
                        }
                    }
                }
            }
        }
    }

}


updateLineDigit = {
    'schema': {
        'ID_RessourceHardwareConfiguration': {
            'required': True,
            'type': 'integer'
        },
        'Position': {
            'required': True,
            'type': 'integer'
        },
        'Installed': {
            'required': True,
            'type': 'boolean'
        },
        'InstalledDate': {
            'required': True,
            'type': 'string',
            'regex': dateformat,
            'coerce': datemod
        },
        'RemovedDate': {
            'nullable': True,
            'default': None,
            'type': 'string',
            'regex': dateformat,
            'coerce': datemod
        },
        'ID_RessourceStudio': {
            'required': True,
            'type': 'integer'
        }
    }
}

updatePositionsInRack = {
    'schema': {
        'list': {
            'type': 'list',
            'schema': {
                'type': 'dict',
                'schema': {
                    'ID_line': {
                        'required': True,
                        'type': 'integer'
                    },
                    'position': {
                        'required': True,
                        'type': 'integer'
                    },
                    'ID_rack': {
                        'required': True,
                        'type': 'integer'
                    },
                    'nameRack': {
                        'required': True,
                        'type': 'string'
                    }
                }
            }
        }
    }
}

updateWorkspace = {
    'schema': {
        'ID_RessourceStudio': {
            'required': True,
            'type': 'integer'
        },
        'RessourceStudio_CreationDate': {
            'required': True,
            'type': 'string',
            'regex': dateformat,
            'coerce': datemod
        },
        'RessourceStudio_LastModificationDate': {
            'nullable': True,
            'default': None,
            'type': 'string',
            'regex': dateformat,
            'coerce': datemod
        },
        'RessourceStudio_Code': {
            'required': True,
            'type': 'string'
        },
        'RessourceStudio_Name': {
            'required': True,
            'type': 'string'
        },
        'RessourceStudio_Active': {
            'required': True,
            'type': 'boolean'
        }
    }
}

updateRessourceHardware = {
    'schema': {
        'ID_RessourceHardware': {
            'required': True,
            'type': 'integer'
        },
        'Brand': {
            'nullable': True,
            'default': None,
            'type': 'string'
        },
        'Model': {
            'nullable': True,
            'default': None,
            'type': 'string'
        },
        'SerialNumber': {
            'nullable': True,
            'default': None,
            'type': 'string'
        },
        'DateIn': {
            'nullable': True,
            'default': None,
            'type': 'string',
            'regex': dateformat,
            'coerce': datemod
        },
        'Price': {
            'nullable': True,
            'default': None,
            'type': 'string'
        },
        'Status': {
            'nullable': True,
            'default': None,
            'type': 'string'
        },
        'Origin': {
            'nullable': True,
            'default': None,
            'type': 'string'
        },
        'Owner': {
            'nullable': True,
            'default': None,
            'type': 'string'
        },
        'Configuration': {
            'nullable': True,
            'default': None,
            'type': 'string'
        },
        'Category': {
            'required': True,
            'type': 'string'
        },
        'Type': {
            'nullable': True,
            'default': None,
            'type': 'string'
        },
        'TechnicalInfo': {
            'nullable': True,
            'default': None,
            'type': 'string'
        },
        'Comments': {
            'nullable': True,
            'default': None,
            'type': 'string'
        },
        'DateImport': {
            'nullable': True,
            'default': None,
            'type': 'string',
            'regex': dateformat,
            'coerce': datemod
        },
        'BarCode': {
            'required': True,
            'type': 'string'
        },
        'ModuleCommand': {
            'nullable': True,
            'default': None,
            'type': 'string'
        },
        'ModuleSpecific': {
            'nullable': True,
            'default': None,
            'type': 'string'
        }
    }
}

validatorForMoreRoute = {
    'POST workspaces': addWorkspace,
    'attemptAuth': attemptAuth,
    'createLineAndSavePosition': createLineAndSavePosition,
    'POST hardwares': createRessourceHardware,
    'savePositionElements': savePositionElements,
    'PUT digitlines': updateLineDigit,
    'updatePositionsInRack': updatePositionsInRack,
    'PUT workspaces': updateWorkspace,
    'PUT hardwares': updateRessourceHardware,
}
