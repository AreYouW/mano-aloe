from main.server import db
from passlib.hash import pbkdf2_sha256
from main.server.models import User

usr = input("username?:")
pswd = input("passwrd?:")


def add_user(username, password):
    db.session.add(User(username, pbkdf2_sha256.hash(password)))
    db.session.commit()
    return


add_user(username=usr, password=pswd)
