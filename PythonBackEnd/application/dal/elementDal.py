from sqlalchemy.sql import text

query18 = text('INSERT INTO RessourceHardwareConfigurationElement (ID_RessourceHardwareConfiguration,ID_RessourceHardware,Position) VALUES (:e1,:e2,0)')

query18bis = text('SELECT ID_RessourceHardwareConfigurationElement FROM RessourceHardwareConfigurationElement WHERE ID_RessourceHardwareConfiguration=:e1 AND ID_RessourceHardware=:e2')

query19bis = text(
    "DELETE FROM RessourceHardwareConfigurationElement WHERE ID_RessourceHardwareConfigurationElement =:e1")


querySelectList = text('''SELECT ID_RessourceHardwareConfigurationElement, RessourceHardwareConfigurationElement.ID_RessourceHardware, Position
	FROM RessourceHardwareConfigurationElement INNER JOIN RessourceHardware ON RessourceHardwareConfigurationElement.ID_RessourceHardware = RessourceHardware.ID_RessourceHardware
	WHERE ID_RessourceHardwareConfiguration=:e1
	ORDER BY Position''')

query20 = text(
    "UPDATE RessourceHardwareConfiguration SET ID_RessourceHardwarePlayer=:e1 WHERE ID_RessourceHardwareConfiguration =:e2")

query21 = text(
    "SELECT * FROM RessourceHardware WHERE ID_RessourceHardware=:e1"
)


query22 = text(
    "UPDATE RessourceHardwareConfigurationElement SET ID_RessourceHardware=:e1 WHERE ID_RessourceHardwareConfigurationElement=:e2")

query23 = text(
    "SELECT ID_RessourceHardwareConfiguration FROM RessourceHardwareConfiguration WHERE ID_RessourceHardwarePlayer=:e1"
)

query23 = text(
    "SELECT ID_RessourceHardwareConfiguration FROM RessourceHardwareConfiguration WHERE ID_RessourceHardwarePlayer=:e1"
)

query24 = text(
    "SELECT ID_RessourceHardwareConfiguration FROM RessourceHardwareConfigurationElement WHERE ID_RessourceHardwareConfigurationElement=:e1"
)

def savePositionElements(connection, element):
    query_parametersPositionElt = {}
    counter = 0
    for elt in element:
        query_parametersPositionElt.update(
            {'ID_element'+str(counter+1): elt['ID_RessourceHardwareConfigurationElement']})
        query_parametersPositionElt.update(
            {'Position'+str(counter+1): counter})
        counter += 1
    print(query_parametersPositionElt)
    queryString17 = "UPDATE RessourceHardwareConfigurationElement SET Position = updates.Position FROM ( SELECT :ID_element1 AS id, :Position1 AS Position "
    counter = 2
    for elt in element[1:]:
        queryString17 += "UNION ALL SELECT :ID_element" + \
            str(counter)+", :Position"+str(counter)+" "
        counter += 1
    queryString17 += " ) AS updates WHERE RessourceHardwareConfigurationElement.ID_RessourceHardwareConfigurationElement = updates.id"
    print(queryString17)
    query17 = text(queryString17)
    connection.execute(query17, **query_parametersPositionElt)

def addElement(connection, element):
    connection.execute(query18, e1=element['RessourceHardwareConfiguration'],
                        e2=element['RessourceHardware']['ID_RessourceHardware'])
    return connection.execute(
        query18bis, e1=element['RessourceHardwareConfiguration'], e2=element['RessourceHardware']['ID_RessourceHardware']).first()[0]

def getIDConfigurationViaIDElement(connection, element):
    result = connection.execute(query24, e1=element)
    return result.first()[0]

def getListEltViaIdConfiguration(connection, element):
    result = connection.execute(querySelectList, e1=element)
    return result.fetchall()

def removeElt(connection, element):
    connection.execute(query19bis, e1=element)

def getIdDigitlinePlayerInUse(connection, idPlayer):
    return connection.execute(query23, e1=idPlayer)

def changePlayerNotInUse(connection, id_NewPlayer, id_Digitline):
    connection.execute(query20, e1=id_NewPlayer, e2=id_Digitline)
    return connection.execute(query21, e1=id_NewPlayer)

def changePlayerInUse(connection, id_NewPlayer, id_Digitline, idStandbyRH, id_DigitlinePlayerInUse):
    connection.execute(
        query20, e1=idStandbyRH, e2=id_DigitlinePlayerInUse)
    connection.execute(query20, e1=id_NewPlayer, e2=id_Digitline)
    return connection.execute(query21, e1=id_NewPlayer)

def removePlayerDal(connection, id_Digitline, idRhInStandby):
    connection.execute(
        query20, e1=idRhInStandby, e2=id_Digitline)
    result = connection.execute(
        query21, e1=idRhInStandby)
    return result

def changeElementDal(connection, ID_element, ID_hardware):
    connection.execute(
        query22, e1=ID_hardware, e2=ID_element)
    result = connection.execute(
        query21, e1=ID_hardware)
    return result
