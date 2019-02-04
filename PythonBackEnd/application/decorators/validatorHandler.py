from functools import wraps
from flask import abort, Response, json
from application.decorators.customSchema import validatorForMoreRoute
from application.cerberus_v_12 import Validator

# validation for the added custom route in application.__init__.py


def validatorWrapper(func=None, ressource=None):
    def decorated(func):
        @wraps(func)
        def wrapper(engine, element):
            schema = validatorForMoreRoute[ressource]['schema']
            validationObj = Validator(schema)
            valid_element = validationObj.validated(element)
            if (valid_element):
                return func(engine, valid_element)
            else:
                abort(422, validationObj.errors)
        return wrapper
    if func is None:
        def decorator(func):
            return decorated(func)
        return decorator
    return decorated(func)
