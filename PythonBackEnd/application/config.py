import os

SECRET_KEY = os.getenv('SECRET_KEY', 'fsqdfsdfsdvxcmyfakesecretkeyincaseitisnotinenvsdfsdfsdfsf')
LDAPSTRING = 'test.local'
DATABASE_STRING = 'mssql+pyodbc://@mydb/?APP=RackMapping'