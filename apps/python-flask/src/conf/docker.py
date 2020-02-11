from os import environ

DEBUG           = True
JSON_ADD_STATUS = False
PTVSD_PORT      = environ.get('PTVSD_PORT', 3000)
