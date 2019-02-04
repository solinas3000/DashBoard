from sqlalchemy.sql import text

query = text("INSERT INTO RessourceRackMappingHistory (Agent,LastModified,ActionPath,PayloadIn,PayloadOut) VALUES (:e1,:e2,:e3,:e4,:e5)")


def logHistoryDal(connection, agent, actionpath, date, payloadIn, payloadOut):
    connection.execute(query, e1=agent,
                       e2=date,
                       e3=actionpath,
                       e4=payloadIn,
                       e5=payloadOut)

