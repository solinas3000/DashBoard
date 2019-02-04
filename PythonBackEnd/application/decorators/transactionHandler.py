from functools import wraps
from flask import abort

# decorator to englobe biz method into a transaction
# be aware that engine is transformed to connection for the decorated method
def transactionWrapper(func=None):
    def decorated(func):
        @wraps(func)
        def wrapper(engine,element):
            print ("Pré-traitement.")
            try:
                connection = engine.connect()
                trans = connection.begin()
                print ("Exécution de la fonction %s." % func.__name__)
                # engine as connection
                response = func(connection,element)
                print ("Post-traitement.")
                trans.commit()
                return response
            except Exception as e:
                trans.rollback()
                print(str(e))
                abort(500,e)
            finally:
                trans.close()
        return wrapper
    if func is None:
        def decorator(func):
            return decorated(func)
        return decorator
    return decorated(func)