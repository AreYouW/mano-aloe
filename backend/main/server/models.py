from main.server import app, db, ma
from marshmallow import fields


class Message(db.Model):
    __tablename__ = 'MESSAGES'
    messageID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    orig_msg = db.Column(db.String(512), nullable=False)
    jp_msg = db.Column(db.String(512), nullable=True)
    region = db.Column(db.String(16), nullable=False)
    username = db.Column(db.String(256), nullable=False)

    def __init__(self, orig_msg, jp_msg, region, username):
        self.orig_msg = orig_msg
        self.jp_msg = jp_msg
        self.region = region
        self.username = username


class MessageSchema(ma.Schema):
    messageID = fields.Integer()
    orig_msg = fields.String(required=True)
    jp_msg = fields.String(required=False)
    region = fields.String(required=True)
    username = fields.String(required=True)
