import re
from datetime import datetime
from sqlalchemy.sql import text

query = text("""UPDATE RessourceHardwareConfiguration SET ID_RessourceStudio=:e2,
    Position=:e3,Installed=:e4,InstalledDate=:e5,RemovedDate=:e6
    WHERE ID_RessourceHardwareConfiguration =:e1;""")

query2 = text("SELECT BarCode, ID_RessourceHardwareConfiguration FROM RessourceHardware, RessourceHardwareConfiguration WHERE ID_RessourceHardwareRack = ID_RessourceHardware AND ID_RessourceHardware IN (SELECT ID_RessourceHardwareRack FROM RessourceHardwareConfiguration WHERE ID_RessourceHardwareConfiguration =:e1)")

query7 = text("""SELECT ID_RessourceHardwareConfiguration FROM RessourceHardwareConfiguration WHERE Installed=0
        AND ID_RessourceStudio IN (SELECT ID_RessourceStudio FROM RessourceStudio WHERE RessourceStudio_Name='STANDBY')
        AND ID_RessourceHardwareRack IN (SELECT ID_RessourceHardware FROM RessourceHardware WHERE BarCode='STANDBY')
        AND ID_RessourceHardwarePlayer IN (SELECT ID_RessourceHardware FROM RessourceHardware WHERE BarCode='STANDBY')
        """)

query8 = text("""INSERT INTO RessourceHardwareConfiguration (ID_RessourceStudio,ID_RessourceHardwareRack,ID_RessourceHardwarePlayer,InstalledDate,Position,Installed)
                VALUES (:e1,:e2,:e3,:e4,1,0)""")


query9 = text("""UPDATE RessourceHardwareConfigurationElement SET ID_RessourceHardwareConfiguration=:e1 WHERE ID_RessourceHardwareConfiguration=:e2 """)

query10 = text("""UPDATE RessourceHardwareConfiguration SET ID_RessourceHardwareRack=:e1, ID_RessourceHardwarePlayer=:e2 WHERE ID_RessourceHardwareConfiguration=:e3 """)


query11 = text(
    "DELETE FROM RessourceHardwareConfiguration WHERE ID_RessourceHardwareConfiguration=:e1")

query11B = text(
    "SELECT count(BarCode) FROM RessourceHardware WHERE BarCode LIKE :e1")

query11C = text(
    "UPDATE RessourceHardware SET BarCode=:e1 WHERE ID_RessourceHardware=:e2")

query14 = text("""UPDATE RessourceHardwareConfiguration SET ID_RessourceStudio=:e2,
    Position=:e3,Installed=1,InstalledDate=:e4
    WHERE ID_RessourceHardwareConfiguration =:e1;""")

query14bis = text(
    "UPDATE RessourceHardware SET BarCode=:e1 WHERE ID_RessourceHardware=:e2")

query15 = text("""INSERT INTO RessourceHardwareConfiguration (ID_RessourceStudio,ID_RessourceHardwareRack,ID_RessourceHardwarePlayer,InstalledDate,Position,Installed)
                VALUES (:e1,:e2,:e3,:e4,:e5,1)""")

query16 = text("""SELECT ID_RessourceHardwareConfiguration FROM  RessourceHardwareConfiguration
                    WHERE ID_RessourceStudio=:e1 AND ID_RessourceHardwareRack=:e2 AND ID_RessourceHardwarePlayer=:e3""")

query16B = text(
    "UPDATE RessourceHardwareConfiguration SET ID_RessourceHardwareRack=:e1 WHERE ID_RessourceHardwareConfiguration=:e2")
query16C = text(
    "UPDATE RessourceHardwareConfiguration SET ID_RessourceHardwarePlayer=:e1 WHERE ID_RessourceHardwareConfiguration=:e2")


def getDigitlineBarCodeRack(connection, id_Digitline):
    return connection.execute(query2, e1=id_Digitline)


def updateLineDigitDal(connection, element):
    connection.execute(query, e1=element['ID_RessourceHardwareConfiguration'],
                       e2=element['ID_RessourceStudio'],
                       e3=element['Position'],
                       e4=element['Installed'],
                       e5=element['InstalledDate'],
                       e6=element['RemovedDate'])

    result = getDigitlineBarCodeRack(
        connection, element['ID_RessourceHardwareConfiguration'])
    return result


def removeLineDigitDal(connection, id_Digitline):
    connection.execute(
        query11, e1=id_Digitline)


def putDigitlineBarCodeRackInStandbyMode(connection, ID_Rack, barCodeRack):
    nbInStandBy = connection.execute(
        query11B, e1='%STANDBY'+barCodeRack).first()[0]
    preBarcode = 'STANDBY'
    print(nbInStandBy)
    for i in range(0, nbInStandBy):
        preBarcode += 'STANDBY'
    connection.execute(query11C, e1=preBarcode+barCodeRack, e2=ID_Rack)


def getIdDigitlineRack(connection, ID_Digitline):
    return connection.execute(text("SELECT ID_RessourceHardwareRack FROM RessourceHardwareConfiguration WHERE ID_RessourceHardwareConfiguration=:e1"),
                              e1=ID_Digitline).first()[0]


def getIdDigitlinePlayer(connection, ID_Digitline):
    return connection.execute(text("SELECT ID_RessourceHardwarePlayer FROM RessourceHardwareConfiguration WHERE ID_RessourceHardwareConfiguration=:e1"),
                              e1=ID_Digitline).first()[0]


def putElementInStandbyMode(connection, idRCinStandby, idRCtoDelete):
    connection.execute(query9, e1=idRCinStandby, e2=idRCtoDelete)
    ID_Rack = getIdDigitlineRack(connection, idRCtoDelete)
    ID_Player = getIdDigitlinePlayer(connection, idRCtoDelete)
    barCodeRack = getDigitlineBarCodeRack(connection, idRCtoDelete).first()[0]
    connection.execute(query10, e1=ID_Rack, e2=ID_Player, e3=idRCinStandby)
    putDigitlineBarCodeRackInStandbyMode(connection, ID_Rack, barCodeRack)


def getStandbyIdDigitline(connection, idRS, idRH):
    resultQ7 = connection.execute(query7)
    resFirstQ7 = resultQ7.first()
    idRC = 0
    if(resFirstQ7 == None):
        connection.execute(query8, e1=idRS,
                           e2=idRH,
                           e3=idRH,
                           e4=datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
        idRC = connection.execute(query7).first()[0]
    else:
        idRC = resFirstQ7[0]
    return idRC


def updatePositionsInRackDal(connection, element):
    query_parametersPosition = {}
    query_parametersRealName = {}
    counter = 0
    for elt in element:
        query_parametersPosition.update(
            {'ID_line'+str(counter+1): element[counter]['ID_line']})
        query_parametersPosition.update(
            {'position'+str(counter+1): element[counter]['position']})
        query_parametersRealName.update(
            {'ID_rack'+str(counter+1): element[counter]['ID_rack']})
        query_parametersRealName.update(
            {'nameRack'+str(counter+1): element[counter]['nameRack']})
        counter += 1

    # position change
    queryString1 = "UPDATE RessourceHardwareConfiguration SET Position = updates.position FROM ( SELECT :ID_line1 AS id, :position1 AS position "
    counter = 2
    for elt in element[1:]:
        queryString1 += "UNION ALL SELECT :ID_line" + \
            str(counter)+", :position"+str(counter)+" "
        counter += 1
    queryString1 += " ) AS updates WHERE RessourceHardwareConfiguration.ID_RessourceHardwareConfiguration = updates.id"
    query12 = text(queryString1)

    # real Barcode Change
    queryString3 = "UPDATE RessourceHardware SET BarCode = updates.name FROM ( SELECT :ID_rack1 AS id, :nameRack1 AS name "
    counter = 2
    for elt in element[1:]:
        queryString3 += "UNION ALL SELECT :ID_rack" + \
            str(counter)+", :nameRack"+str(counter)+" "
        counter += 1
    queryString3 += " ) AS updates WHERE RessourceHardware.ID_RessourceHardware = updates.id"
    query13 = text(queryString3)

    connection.execute(query12, **query_parametersPosition)
    connection.execute(query13, **query_parametersRealName)
    
    result = getDigitlineBarCodeRack(connection, element[0]['ID_line'])
    return result


def addStandByLineDal(connection, element):
    connection.execute(query14, e1=element['ID_RessourceHardwareConfiguration'],
                       e2=element['ID_RessourceStudio'],
                       e3=element['Position'],
                       e4=element['InstalledDate'])

    """  connection.execute(query14bis, e1=re.sub('STANDBY', '', element['RessourceHardwareRack']['BarCode']), e2=element['RessourceHardwareRack']['ID_RessourceHardware']) """
    result = getDigitlineBarCodeRack(
        connection, element['ID_RessourceHardwareConfiguration'])
    return result


def addNewLineDal(connection, element, idRHinStandby):
    if (element['type'] == "STANDBY"):
        return addStandByLineDal(connection, element['line'])
    elif (element['type'] == "NEWRPS"):
        connection.execute(query16B,
                            e1=idRHinStandby, e2=element['line']['Old_ID_RessourceHardwareConfiguration_Rack'])
        connection.execute(query16C,
                            e1=idRHinStandby, e2=element['line']['Old_ID_RessourceHardwareConfiguration_Player'])
    elif (element['type'] == "NEWPS"):
        connection.execute(query16C,
                            e1=idRHinStandby, e2=element['line']['Old_ID_RessourceHardwareConfiguration_Player'])
    elif (element['type'] == "NEWRS"):
        connection.execute(query16B,
                            e1=idRHinStandby, e2=element['line']['Old_ID_RessourceHardwareConfiguration_Rack'])

    connection.execute(query15, e1=element['line']['ID_RessourceStudio'],
                       e2=element['line']['RessourceHardwareRack']['ID_RessourceHardware'],
                       e3=element['line']['ID_RessourceHardwarePlayer'],
                       e4=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                       e5=element['line']['Position'])

    """     connection.execute(query14bis, e1=re.sub('STANDBY', '', element['line']['RessourceHardwareRack']['BarCode']), e2=element['line']['RessourceHardwareRack']['ID_RessourceHardware']) """

    idC = connection.execute(query16, e1=element['line']['ID_RessourceStudio'],
                             e2=element['line']['RessourceHardwareRack']['ID_RessourceHardware'],
                             e3=element['line']['ID_RessourceHardwarePlayer']).first()[0]

    result = getDigitlineBarCodeRack(connection, idC)
    return result
