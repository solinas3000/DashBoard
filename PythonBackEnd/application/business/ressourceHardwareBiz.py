from flask import json
from application.dal import updateRessourceHardwareDal, createRessourceHardwareDal
from application.decorators.transactionHandler import transactionWrapper
from application.decorators.validatorHandler import validatorWrapper

@validatorWrapper(ressource="PUT hardwares")
@transactionWrapper
def updateRessourceHardwareBiz(engine, element):
    old, new = updateRessourceHardwareDal(engine, element)
    res = {
        'oldRH': [dict(r) for r in old][0],
        'newRH': [dict(r) for r in new][0]
    }
    return json.dumps(res)


@validatorWrapper(ressource="POST hardwares")
@transactionWrapper
def createRessourceHardwareBiz(engine, element):
    result = createRessourceHardwareDal(engine, element)
    res = json.dumps([dict(r) for r in result][0])
    return res
