from flask_restful import Resource
from flask import request
from main.server import db
from main.server.models import Message, MessageSchema

messages_schema = MessageSchema(many=True)
message_schema = MessageSchema()


class MessageListResource(Resource):
    def get(self):
        """Gets all messages on the server"""
        messages = Message.query.all()
        messages = messages_schema.dump(messages)

        return {'status': 'success', 'messages': messages}, 200


class MessageResource(Resource):
    def get(self, messageID):
        """"Get a message by message ID"""
        message = Message.query.filter_by(messageID=messageID).first()

        if not message:
            return {'status': 'fail', 'message': 'No message with ID ' + str(messageID) + ' exists'}, 404

        message = message_schema.dump(message)
        return {'status': 'success', 'message': message}, 200