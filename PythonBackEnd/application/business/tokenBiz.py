import datetime as dt
from application.config import SECRET_KEY
import jwt
import os
from flask import abort


def encode_auth_token(user_name):
    print(SECRET_KEY)
    """
    Generates the Auth Token
    :return: string
    """
    try:
        payload = {
            'exp': dt.datetime.utcnow() + dt.timedelta(days=1, seconds=10),
            'iat': dt.datetime.utcnow(),
            'sub': user_name
        }
        return jwt.encode(
            payload,
            SECRET_KEY,
            algorithm='HS256'
        )
    except Exception as e:
        return e


def decode_auth_token(auth_token):
    """
    Decodes the auth token
    :param auth_token:
    :return: integer|string
    """
    try:
        username = jwt.decode(auth_token, SECRET_KEY)
        print('DECODE TOKEN')
        return True, username
    except jwt.ExpiredSignatureError:
        abort(401, description='Signature expired. Please log in again.')
    except jwt.InvalidTokenError:
        abort(401, description='Invalid token. Please log in again.')
