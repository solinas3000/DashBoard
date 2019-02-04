from sqlalchemy.sql import text

query = text("""UPDATE RessourceHardware SET Brand=:e2,
    Model=:e3,SerialNumber=:e4,DateIn=:e5,Price=:e6,Owner=:e7,Status=:e8,Origin=:e9,Category=:e10,Type=:e11,TechnicalInfo=:e12,Comments=:e13,
    DateImport=:e14,BarCode=:e15,Configuration=:e16,ModuleCommand=:e17,ModuleSpecific=:e18 WHERE ID_RessourceHardware =:e1;""")

query2 = text(
    "SELECT * FROM RessourceHardware WHERE ID_RessourceHardware =:e1;")

query3 = text("SELECT MAX(ID_RessourceHardware) FROM RessourceHardware")

query4 = text("""INSERT INTO RessourceHardware  (ID_RessourceHardware,Brand,
    Model,SerialNumber,DateIn,Price,Owner,Status,Origin,Category,Type,TechnicalInfo,Comments,
    DateImport,BarCode,Configuration,ModuleCommand,ModuleSpecific) VALUES (:e1,:e2,:e3,:e4,:e5,:e6,:e7,:e8,:e9,:e10,:e11,:e12,:e13,:e14,:e15,:e16,:e17,:e18)""")

query5 = text(
    "SELECT * FROM RessourceHardware WHERE ID_RessourceHardware =:e1;")

query6 = text(
    "SELECT ID_RessourceHardware FROM RessourceHardware WHERE BarCode='STANDBY'")

query7 = text("SELECT MAX(ID_RessourceHardware) FROM RessourceHardware")

query8 = text(
    "INSERT INTO RessourceHardware (ID_RessourceHardware,BarCode) VALUES (:e1,'STANDBY')")


def updateRessourceHardwareDal(connection, element):
    old = connection.execute(
        query2, e1=element['ID_RessourceHardware']).fetchall()
    connection.execute(query, e1=element['ID_RessourceHardware'],
                       e2=element['Brand'],
                       e3=element['Model'],
                       e4=element['SerialNumber'],
                       e5=element['DateIn'],
                       e6=element['Price'],
                       e7=element['Owner'],
                       e8=element['Status'],
                       e9=element['Origin'],
                       e10=element['Category'],
                       e11=element['Type'],
                       e12=element['TechnicalInfo'],
                       e13=element['Comments'],
                       e14=element['DateImport'],
                       e15=element['BarCode'],
                       e16=element['Configuration'],
                       e17=element['ModuleCommand'],
                       e18=element['ModuleSpecific'])
    new = connection.execute(query2, e1=element['ID_RessourceHardware'])
    return old, new


def createRessourceHardwareDal(connection, element):

    newID = connection.execute(query3).first()[0]+1
    connection.execute(query4, e1=newID,
                       e2=element['Brand'],
                       e3=element['Model'],
                       e4=element['SerialNumber'],
                       e5=element['DateIn'],
                       e6=element['Price'],
                       e7=element['Owner'],
                       e8=element['Status'],
                       e9=element['Origin'],
                       e10=element['Category'],
                       e11=element['Type'],
                       e12=element['TechnicalInfo'],
                       e13=element['Comments'],
                       e14=element['DateImport'],
                       e15=element['BarCode'],
                       e16=element['Configuration'],
                       e17=element['ModuleCommand'],
                       e18=element['ModuleSpecific'])

    result = connection.execute(query5, e1=newID)
    return result


def getStandByIdRH(connection):
    resultQ3 = connection.execute(query6)
    resFirstQ3 = resultQ3.first()
    if(resFirstQ3 == None):
        newID = connection.execute(query7).first()[0]+1
        connection.execute(query8, e1=newID)
        return connection.execute(query6).first()[0]
    else:
        return resFirstQ3[0]
