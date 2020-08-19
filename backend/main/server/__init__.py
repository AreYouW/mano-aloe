from flask import Flask
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
import os


app = Flask(__name__, static_url_path='')
app_config = os.getenv("APP_CONFIG", "main.server.config.DevelopmentConfig")
app.config.from_object(app_config)

db = SQLAlchemy(app)

ma = Marshmallow()
bcrypt = Bcrypt(app)

from main.server.api import api_bp

# Registering of the pai endpoint at "www.domain.xyz/api"
app.register_blueprint(api_bp, url_prefix="/api")
