from datetime import datetime
from flask import abort, json
from application.dal.historyDal import logHistoryDal


def logHistoryBiz(engine, agent, actionpath, payloadIn, payloadOut):
    try:
        connection = engine.connect()
        trans = connection.begin()
        date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        logHistoryDal(connection, agent, actionpath, date,
                      json.dumps(payloadIn), json.dumps(payloadOut))
        trans.commit()
    except Exception as e:
        trans.rollback()
        abort(500, e)
    finally:
        trans.close()
    return None
