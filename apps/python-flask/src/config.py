from os import environ

class Config(object):
    JSON_ADD_STATUS = environ.get('JSON_ADD_STATUS', False)
    JSON_STATUS_FIELD_NAME = environ.get('JSON_ADD_STATUS', 'code')
    FLASK_DEBUG = int(environ.get("FLASK_DEBUG", 0))
    FLASK_RUN_RELOAD = int(environ.get("FLASK_RUN_RELOAD", 0))
    PTVSD_ENABLED = (FLASK_DEBUG == 1 and FLASK_RUN_RELOAD == 0)
