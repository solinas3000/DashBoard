from ldap3 import Server, Connection, ALL
from flask import Response
from flask import json
from flask import Response
from .tokenBiz import encode_auth_token
from application.config import LDAPSTRING

s = Server(LDAPSTRING, get_info=ALL)


def attemptAuthBiz(element):
    username = element['username']
    password = element['password']
    try:
        '''         if not __check_ldap(username, password):
            return __failedAuth()
        else: '''
        token = encode_auth_token(username)
        print(token)
        data = {
            'status': 'success',
            'message': 'Successfully registered.',
            'auth_token': token
        }
        response = Response(
            response=json.dumps(data),
            status=200,
            mimetype='application/json'
        )
        return response
    except Exception as e:
        error = {
            'code': '401',
            'message': 'Some error occurred. Please try again.'
        }
        data = {
            '_status': 'fail',
            '_error': error
        }
        response = Response(
            response=json.dumps(data),
            status=401,
            mimetype='application/json'
        )
        return response


def __check_ldap(username, password):
    c = Connection(s, user=username+'@'+LDAPSTRING, password=password)
    return c.bind()


def __failedAuth():
    error = {
        'code': '401',
        'message': 'Username or password is not valid. Please try again, username : jdupont / password : azerty'
    }
    data = {
        '_status': 'fail',
        '_error': error
    }
    response = Response(
        response=json.dumps(data),
        status=401,
        mimetype='application/json'
    )
    return response
