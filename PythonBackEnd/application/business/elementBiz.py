from flask import json
from application.dal import savePositionElements, changePlayerNotInUse, changePlayerInUse, removeElt, getListEltViaIdConfiguration
from application.dal import changeElementDal, removePlayerDal, getDigitlineBarCodeRack, getStandByIdRH, getIdDigitlinePlayerInUse, getIDConfigurationViaIDElement, addElement
from application.decorators.transactionHandler import transactionWrapper
from application.decorators.validatorHandler import validatorWrapper


def __getListEltAndBarCodeViaIDConfiguration(conn, element):
    listElt = getListEltViaIdConfiguration(conn, element)
    BarCode_Rack = getDigitlineBarCodeRack(conn, element).first()[0]
    print('list ELT', [dict(r) for r in listElt])
    result = {
        'BarCode': BarCode_Rack,
        'ID_RessourceHardwareConfiguration': element,
        'listElt': [dict(r) for r in listElt]
    }
    return result


@validatorWrapper(ressource="savePositionElements")
@transactionWrapper
def savePositionElementsBiz(engine, element):
    counter = 0
    for elt in element['elementList']:
        if (elt['ID_RessourceHardwareConfigurationElement'] == -1):
            element['elementList'][counter]['ID_RessourceHardwareConfigurationElement'] = addElement(engine,elt)
    savePositionElements(engine, element['elementList'])
    return json.dumps(__getListEltAndBarCodeViaIDConfiguration(engine, element['ID_RessourceHardwareConfiguration']))


@transactionWrapper
def removeEltsBiz(engine, listID):
    finalresult = []
    for idElt in listID:
        idConfiguration = getIDConfigurationViaIDElement(engine,idElt)
        removeElt(engine,idElt)
        digitlineToOrder = __getListEltAndBarCodeViaIDConfiguration(engine, idConfiguration)
        if digitlineToOrder['listElt']:
            savePositionElements(engine, digitlineToOrder['listElt'])
        finalresult.append(digitlineToOrder)
    return json.dumps(finalresult)


@transactionWrapper
def changePlayerBiz(engine, element):
    id_NewPlayer = element['player']
    id_Digitline = element['config']
    id_DigitlinePlayerInUse = getIdDigitlinePlayerInUse(engine,id_NewPlayer).first()
    if id_DigitlinePlayerInUse:
        idStandbyRH = getStandByIdRH(engine)
        result = changePlayerInUse(
            engine, id_NewPlayer, id_Digitline, idStandbyRH, id_DigitlinePlayerInUse[0])
    else:
        result = changePlayerNotInUse(engine, id_NewPlayer, id_Digitline)
    res = json.dumps([dict(r) for r in result][0])
    return res


@transactionWrapper
def removePlayerBiz(engine, idConfig):
    idRhInStandby = getStandByIdRH(engine)
    result = removePlayerDal(
        engine, idConfig, idRhInStandby)
    res = json.dumps([dict(r) for r in result][0])
    return res


@transactionWrapper
def changeElementBiz(engine, element):
    result = changeElementDal(engine, element['ID_element'], element['ID_hardware'])
    res = json.dumps([dict(r) for r in result][0])
    return res
