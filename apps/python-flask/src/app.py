from flask import Flask
from config import Config

application = Flask(__name__)
application.config.from_object(Config)

if application.config.get('PTVSD_ENABLED'):
    import ptvsd
    # pylint: disable=maybe-no-member
    application.logger.info("Starting `ptvs` on port: 3000")
    ptvsd.enable_attach(address=('0.0.0.0', 3000))

# Workaround for circular dependency issue
import routes

if __name__ == "__main__":
    application.run()
