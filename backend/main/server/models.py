from main.server import app, db, ma
from marshmallow import fields


class Message(db.Model):
    __tablename__ = 'MESSAGES'
    messageID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    original_message = db.Column(db.String(512), nullable=False)
    translated_message = db.Column(db.String(512), nullable=True)
    region = db.Column(db.String(16), nullable=False)
    username = db.Column(db.String(256), nullable=False)

    def __init__(self, original_message, translated_message, region, username):
        self.original_message = original_message
        self.translated_message = translated_message
        self.region = region
        self.username = username


class MessageSchema(ma.Schema):
    messageID = fields.Integer()
    original_message = fields.String(required=True)
    translated_message = fields.String(required=False)
    region = fields.String(required=True)
    username = fields.String(required=True)
