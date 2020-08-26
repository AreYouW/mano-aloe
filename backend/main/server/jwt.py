from flask_jwt import JWT
from main.server import app
from main.server.models import User
from passlib.hash import pbkdf2_sha256
from os import environ


def authenticate(username, password):
    user = User.query.filter_by(username=username).first()
    if user and pbkdf2_sha256.verify(password, user.password):
        return user


def identity(payload):
    user_id = payload['identity']
    return User.query.get(user_id)


app.config['SECRET_KEY'] = 'change_this_on_live'  # will change on upload
jwt = JWT(app, authenticate, identity)
