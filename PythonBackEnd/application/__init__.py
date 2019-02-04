from eve import Eve
from eve_sqlalchemy import SQL as _SQL
from eve_sqlalchemy.validation import ValidatorSQL
from sqlalchemy.ext.declarative import declarative_base
from eve_sqlalchemy.config import DomainConfig, ResourceConfig
from sqlalchemy import create_engine
from .models.BaseDefinition import Base
from sqlalchemy.orm import sessionmaker
from flask import request, Response, g, abort
import json
from application.auth import MyBasicAuth
from application.business import updateRessourceHardwareBiz, createRessourceHardwareBiz, updateWorkspaceBiz, updateLineDigitBiz
from application.business import addWorkspaceBiz, removeWorkspacesBiz, removeLineDigitBiz, updatePositionsInRackBiz, savePositionElementsBiz
from application.business import removePlayerBiz, attemptAuthBiz
from application.business import changePlayerBiz, changeElementBiz, createLineAndSavePositionBiz, removeEltsBiz
from flask_cors import CORS
from functools import wraps
from application.business import decode_auth_token
from eve.auth import requires_auth
from application.decorators.customAuthHandler import customAuthWrapper
from application.decorators.transactionHandler import transactionWrapper
from application.business.historyBiz import logHistoryBiz
from application.settings import my_settings
from application.utils import ListConverter
from eve_sqlalchemy import SQL as _SQL
from flask_sqlalchemy import SQLAlchemy




# init engine __ route for get / select see setting.py

db = SQLAlchemy()


class SQL(_SQL):
    driver = db


app = Eve(settings=my_settings,validator=ValidatorSQL, data=SQL)

db = app.data.driver
Base.metadata.bind = db.engine
db.Model = Base
db.create_all()
CORS(app)
app.url_map.converters['list'] = ListConverter

# custom 500 error definition to match other error response, usage : abort(500,e)
@app.errorhandler(500)
def internalError(e):
    error = {
        'code': '500',
        'message': str(e)
    }
    data = {
        '_status': 'Internal Server Error',
        '_error': error
    }
    response = Response(
        response=json.dumps(data),
        status=500,
        mimetype='application/json'
    )
    return response

# custom 422 error definition to match other error response, usage : abort(422,e)
# used in application.decorators.validatorHandler.py
@app.errorhandler(422)
def internalError(e):
    error = {
        'code': '422',
        'message': e.description
    }
    data = {
        '_status': 'UNPROCESSABLE ENTITY',
        '_error': error
    }
    print(data)
    response = Response(
        response=json.dumps(data),
        status=422,
        mimetype='application/json'
    )
    return response

# after each custom request save the action into the database for traceability 
@app.after_request
def after_request(response):
    print('RESPONSE')
    print(request.method)
    print(request.path)

    if request.method in ['POST', 'PUT', 'DELETE'] and request.path != '/attemptAuth':
        # retrieve username from global context / stored in application.decorators.customAuthHandler.py
        auth_value = getattr(g, 'user', None)
        agent = (lambda v: v['sub'] if v else None)(auth_value)
        payloadIn = (lambda v: v.json if v.method != 'DELETE' else None)(request)
        payloadOut = (lambda v: json.loads(
            v) if v else None)(response.get_data())
        logHistoryBiz(db.engine, agent, request.method + ' ' + request.path, payloadIn, payloadOut)

    response.headers.add('Access-Control-Allow-Headers',
                         'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response


@app.route('/attemptAuth/', methods=['POST'])
def attemptAuthRoute():
    return attemptAuthBiz(request.json)

# more route for update / insert

# ------hardwares---------

@app.route('/hardwares/<int:_id>', methods=['PUT'])
@customAuthWrapper
def updateRessourceHardwareRoute(_id):
    return updateRessourceHardwareBiz(db.engine, request.json)

@app.route('/hardwares', methods=['POST'])
@customAuthWrapper
def createRessourceHardwareRoute():
    return createRessourceHardwareBiz(db.engine, request.json)

# ------workspaces---------

@app.route('/workspaces/<int:_id>', methods=['PUT'])
@customAuthWrapper
def updateWorkspaceRoute(_id):
    print(request.json)
    return updateWorkspaceBiz(db.engine, request.json)

@app.route('/workspaces', methods=['POST'])
@customAuthWrapper
def addWorkspaceRoute():
    print(request.json)
    return addWorkspaceBiz(db.engine, request.json)

@app.route('/workspaces/<list:_listid>', methods=['DELETE'])
@customAuthWrapper
def removeWorkspaceRoute(_listid):
    return removeWorkspacesBiz(db.engine,_listid)

@app.route('/workspaces/<int:_idWorkspace>/racks/<string:_nameRack>/digitlines', methods=['PUT'])
@customAuthWrapper
def updatePositionsInRackRoute(_idWorkspace,_nameRack):
    return updatePositionsInRackBiz(db.engine, request.json)

@app.route('/workspaces/<int:_idWorkspace>/racks/<string:_nameRack>/digitlines', methods=['POST'])
@customAuthWrapper
def createLineAndSavePositionRoute(_idWorkspace,_nameRack):
    print(request.json)
    return createLineAndSavePositionBiz(db.engine, request.json)

# ------digitlines---------

@app.route('/digitlines/<int:_id>', methods=['PUT'])
@customAuthWrapper
def updateLineDigitRoute(_id):
    print(request.json)
    return updateLineDigitBiz(db.engine, request.json)

@app.route('/digitlines/<list:_listid>', methods=['DELETE'])
@customAuthWrapper
def removeLineDigitRoute(_listid):
    return removeLineDigitBiz(db.engine,_listid)

@app.route('/digitlines/<int:_id>/player', methods=['DELETE'])
@customAuthWrapper
def removeLineDigitPlayerRoute(_id):
    return removePlayerBiz(db.engine,_id)

@app.route('/digitlines/<int:_idConfig>/player/<int:_idPlayer>', methods=['PUT'])
@customAuthWrapper
def changeLineDigitPlayerRoute(_idConfig,_idPlayer):
    element = {
        'player':_idPlayer,
        'config':_idConfig
    }
    return changePlayerBiz(db.engine,element)

@app.route('/digitlines/<int:_idConfig>/elements/', methods=['PUT'])
@customAuthWrapper
def savePositionElementsRoute(_idConfig):
    element = {
        'ID_RessourceHardwareConfiguration': _idConfig,
        'elementList': request.json['elementList']
    }
    return savePositionElementsBiz(db.engine, element)

# ------elements---------

@app.route('/elements/<int:_idElement>/hardware/<int:_idHardware>', methods=['PUT'])
@customAuthWrapper
def changeElementRoute(_idElement,_idHardware):
    element = {
        'ID_element':_idElement,
        'ID_hardware':_idHardware
    }
    return changeElementBiz(db.engine, element)

@app.route('/elements/<list:_listId>', methods=['DELETE'])
@customAuthWrapper
def removeEltsRoute(_listId):
    return removeEltsBiz(db.engine, _listId)


    







