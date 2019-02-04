from flask import json
from application.dal import updateWorkspaceDal, addWorkspaceDal, removeWorkspaceDal, getRackInsideStudio, putRackInStandByMode, getRackInsideWorkspace, getWorkspaceName
from application.decorators.transactionHandler import transactionWrapper
from application.decorators.validatorHandler import validatorWrapper


@validatorWrapper(ressource="PUT workspaces")
@transactionWrapper
def updateWorkspaceBiz(engine, element):
    result = updateWorkspaceDal(engine, element)
    res = json.dumps([dict(r) for r in result][0])
    return res


@validatorWrapper(ressource="POST workspaces")
@transactionWrapper
def addWorkspaceBiz(engine, element):
    result = addWorkspaceDal(engine, element)
    res = json.dumps([dict(r) for r in result][0])
    return res

@transactionWrapper
def removeWorkspacesBiz(engine,_listid):
    finalresult = []
    for idWorkspace in _listid:
        result = getWorkspaceName(engine,idWorkspace)
        res = getRackInsideWorkspace(engine,idWorkspace)
        res = [dict(r) for r in res]
        putRackInStandByMode(engine,res)
        removeWorkspaceDal(engine,idWorkspace)
        finalresult.append([dict(r) for r in result][0])
    res = json.dumps(finalresult)
    return res