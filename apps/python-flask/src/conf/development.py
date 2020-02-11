from os import environ

DEBUG                  = environ.get('FLASK_DEBUG', True)
PTVSD_PORT             = 3000
TESTING                = True
JSON_ADD_STATUS        = True
JSON_STATUS_FIELD_NAME = 'code'
HOST                   = 'localhost'
PORT                   = 5000
