from eve.auth import TokenAuth
from .business.tokenBiz import decode_auth_token


class MyBasicAuth(TokenAuth):
    def check_auth(self, token, allowed_roles, resource,
                   method):
        return decode_auth_token(token)
