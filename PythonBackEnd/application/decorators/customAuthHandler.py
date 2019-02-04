from functools import wraps
from flask import abort, g, request
from application.business.tokenBiz import decode_auth_token


def customAuthWrapper(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print("Pré-traitement.")
        if not 'Authorization' in request.headers:
            abort(401, description='No Authorization header in the request')
        try:
            data = request.headers['Authorization']
            token = str.replace(str(data), "Bearer ",'')
            valid, username = decode_auth_token(token)
            # storing username in global context / only relative to a unique request
            g.user = username
            print("Exécution de la fonction %s." % func.__name__)
            response = func(*args, **kwargs)
            print("Post-traitement.")
            return response
        except Exception as e:
            raise e
    return wrapper

