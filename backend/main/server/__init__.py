from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt

from main.server.api import api_bp

import os


app = Flask(__name__)
app_config = os.getenv("APP_CONFIG", "main.server.config.DevelopmentConfig")
app.config.from_object(app_config)

db = SQLAlchemy(app)

ma = Marshmallow()
bcrypt = Bcrypt(app)


# Registering of the pai endpoint at "www.domain.xyz/api"
app.register_blueprint(api_bp, url_prefix="/api")
