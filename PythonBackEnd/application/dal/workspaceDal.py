from sqlalchemy.sql import text

query = text("""UPDATE RessourceStudio SET RessourceStudio_CreationDate=:e2,
    RessourceStudio_LastModificationDate=:e3,RessourceStudio_Code=:e4,RessourceStudio_Name=:e5,RessourceStudio_Active=:e6 
    WHERE ID_RessourceStudio =:e1;""")

query2 = text("SELECT * FROM RessourceStudio WHERE ID_RessourceStudio =:e1;")

query3 = text("""INSERT INTO RessourceStudio (RessourceStudio_CreationDate,RessourceStudio_LastModificationDate,RessourceStudio_Code,RessourceStudio_Name,RessourceStudio_Active) 
        VALUES (:e1,:e2,:e3,:e4,:e5)""")

query4 = text(
    "SELECT * FROM RessourceStudio WHERE RessourceStudio_Code =:e1 AND RessourceStudio_Name =:e2;")

query5 = text(
    "SELECT ID_RessourceStudio FROM RessourceStudio WHERE RessourceStudio_Name='STANDBY'")

query6 = text(
    "INSERT INTO RessourceStudio (RessourceStudio_Name,RessourceStudio_Code) VALUES ('STANDBY','STANDBY')")

query7 = text("UPDATE RessourceHardwareConfiguration SET ID_RessourceStudio=:e1, Installed=0 WHERE ID_RessourceStudio IN (SELECT ID_RessourceStudio FROM RessourceStudio WHERE RessourceStudio_Code=:e2)")

query7bis = text(
    "UPDATE RessourceHardware SET BarCode=:e1 WHERE ID_RessourceHardware=:e2")

query8 = text("DELETE FROM RessourceStudio WHERE RessourceStudio_Code=:e1")

query8bis = text("SELECT BarCode, ID_RessourceHardware FROM RessourceHardware WHERE ID_RessourceHardware IN (SELECT ID_RessourceHardwareRack FROM RessourceHardwareConfiguration  WHERE ID_RessourceStudio IN ( SELECT ID_RessourceStudio FROM RessourceStudio WHERE RessourceStudio_Code=:e1))")

query8tri = text("SELECT BarCode, ID_RessourceHardware FROM RessourceHardware WHERE ID_RessourceHardware IN (SELECT ID_RessourceHardwareRack FROM RessourceHardwareConfiguration  WHERE ID_RessourceStudio=:e1)")

query9 = text(
    "UPDATE RessourceHardware SET BarCode=:e1 WHERE ID_RessourceHardware=:e2")

query10 = text(
    "SELECT count(BarCode) FROM RessourceHardware WHERE BarCode LIKE :e1")

query11 = text(
    "UPDATE RessourceHardwareConfiguration SET ID_RessourceStudio=:e1, Installed=0 WHERE ID_RessourceStudio=:e2")

query12 = text("DELETE FROM RessourceStudio WHERE ID_RessourceStudio=:e1")

query13 = text(
    "UPDATE RessourceHardware SET BarCode=:e1 WHERE ID_RessourceHardware=:e2")

query14 = text(
    "SELECT RessourceStudio_Name FROM RessourceStudio WHERE ID_RessourceStudio=:e1")


def updateWorkspaceDal(connection, element):
    print(element)
    connection.execute(query, e1=element['ID_RessourceStudio'],
                       e2=element['RessourceStudio_CreationDate'],
                       e3=element['RessourceStudio_LastModificationDate'],
                       e4=element['RessourceStudio_Code'],
                       e5=element['RessourceStudio_Name'],
                       e6=element['RessourceStudio_Active'])

    result = connection.execute(query2, e1=element['ID_RessourceStudio'])
    return result


def addWorkspaceDal(connection, element):
    print(element)
    connection.execute(query3,
                       e1=element['RessourceStudio_CreationDate'],
                       e2=element['RessourceStudio_LastModificationDate'],
                       e3=element['RessourceStudio_Code'],
                       e4=element['RessourceStudio_Name'],
                       e5=element['RessourceStudio_Active'])

    result = connection.execute(query4, e1=element['RessourceStudio_Code'],
                                e2=element['RessourceStudio_Name'])
    return result


def getRackInsideStudio(connection, element):
    return connection.execute(query8bis, e1=element)


def getRackInsideWorkspace(connection, element):
    return connection.execute(query8tri, e1=element)


def getWorkspaceName(connection, element):
    print(element)
    return connection.execute(query14, e1=element).fetchall()


def getStandByIdStudio(connection):
    result = connection.execute(query5)
    resFirst = result.first()
    idR = 0
    if(resFirst == None):
        connection.execute(query6)
        idR = connection.execute(query5).first()[0]
    else:
        idR = resFirst[0]
    return idR


def preparePreBarCodeRackStandBy(connection, element):
    nbInStandBy = connection.execute(
        query10, e1='STANDBY%'+element).first()[0]
    preBarcode = 'STANDBY'
    print(nbInStandBy)
    for i in range(0, nbInStandBy):
        preBarcode += 'STANDBY'
    return preBarcode


def putRackInStandByMode(connection, element):
    for rack in element:
        if('BarCode' in rack):
            preBarcode = preparePreBarCodeRackStandBy(
                connection, rack['BarCode'])
            connection.execute(query9, e1=preBarcode +
                               rack['BarCode'], e2=rack['ID_RessourceHardware'])


def removeWorkspacesDal(connection, RessourceStudioName):
    idR = getStandByIdStudio(connection)
    connection.execute(query7,
                       e1=idR,
                       e2=RessourceStudioName)

    connection.execute(query8,
                       e1=RessourceStudioName)


def removeWorkspaceDal(connection, ID_Studio):
    idR = getStandByIdStudio(connection)
    connection.execute(query11,
                       e1=idR,
                       e2=ID_Studio)

    connection.execute(query12,
                       e1=ID_Studio)
