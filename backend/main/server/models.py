from main.server import app, db, ma
from marshmallow import fields


class Message(db.Model):
    __tablename__ = 'MESSAGES'
    messageID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    orig_msg = db.Column(db.String(2048), nullable=False)
    tl_msg = db.Column(db.String(2048), nullable=True)
    country = db.Column(db.String(2), nullable=True)
    username = db.Column(db.String(64), nullable=True)

    def __init__(self, orig_msg, tl_msg, country, username):
        self.orig_msg = orig_msg
        self.tl_msg = tl_msg
        self.country = country 
        self.username = username


class MessageSchema(ma.Schema):
    messageID = fields.Integer()
    orig_msg = fields.String(required=True)
    tl_msg = fields.String(required=False)
    country = fields.String(required=False)
    username = fields.String(required=False)
