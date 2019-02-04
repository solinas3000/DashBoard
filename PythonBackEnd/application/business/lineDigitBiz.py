from flask import json
from application.dal import updateLineDigitDal, removeLineDigitDal, updatePositionsInRackDal, getWorkspaceName, addStandByLineDal, addNewLineDal, getStandByIdRH, getStandByIdStudio
from application.dal import putDigitlineBarCodeRackInStandbyMode, getDigitlineBarCodeRack, putElementInStandbyMode, getStandbyIdDigitline
from application.decorators.transactionHandler import transactionWrapper
from application.decorators.validatorHandler import validatorWrapper


@validatorWrapper(ressource="PUT digitlines")
@transactionWrapper
def updateLineDigitBiz(engine, element):
    result = updateLineDigitDal(engine, element)
    res = json.dumps([dict(r) for r in result])
    return res

@transactionWrapper
def removeLineDigitBiz(engine,_listid):
    for idDigitline in _listid[:-1]:
        __removeLineDigit(engine, idDigitline)
    result = __removeLineDigit(engine, _listid[-1])
    res = [dict(r) for r in result][0]
    del res['ID_RessourceHardwareConfiguration']
    return json.dumps(res)

def __removeLineDigit(engine, idDigitline):
    idRHinStandby = getStandByIdRH(engine)
    idRSinStandby = getStandByIdStudio(engine)
    idRCinStandby = getStandbyIdDigitline(engine, idRSinStandby, idRHinStandby)
    putElementInStandbyMode(engine, idRCinStandby, idDigitline)
    removeLineDigitDal(engine, idDigitline)
    return getDigitlineBarCodeRack(engine, idRCinStandby)

@validatorWrapper(ressource="updatePositionsInRack")
@transactionWrapper
def updatePositionsInRackBiz(engine, element):
    result = updatePositionsInRackDal(engine, element['list'])
    res = json.dumps([dict(r) for r in result][0])
    return res


@validatorWrapper(ressource="createLineAndSavePosition")
@transactionWrapper
def createLineAndSavePositionBiz(engine, element):
    for idx, val in enumerate(element['lineToAdd']):
        trueID = val['line']['RessourceHardwareRack']['ID_RessourceHardware']
        idRHinStandby = getStandByIdRH(engine)
        resultat = addNewLineDal(engine, val, idRHinStandby).first()
        for elt in element['racksPosition']:
            if(elt['ID_rack'] == trueID):
                elt['ID_line'] = resultat[1]
    if element['racksPosition']:
        updatePositionsInRackDal(engine, element['racksPosition'])
    result = getWorkspaceName(engine,element['lineToAdd'][0]['line']['ID_RessourceStudio'])
    res = json.dumps([dict(r) for r in result][0])
    return res
