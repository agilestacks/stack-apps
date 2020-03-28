from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

application = Flask(__name__)
application.config.from_object(Config)

db = SQLAlchemy(application)
migrate = Migrate(application, db)

if application.config.get('PTVSD_ENABLED'):
    import ptvsd
    # pylint: disable=maybe-no-member
    application.logger.info("Starting `ptvs` on port: 3000")
    ptvsd.enable_attach(address=('0.0.0.0', 3000))

from models import Word
db.create_all()
db.session.commit()

# Workaround for circular dependency issue
import routes

if __name__ == "__main__":
    application.run()
