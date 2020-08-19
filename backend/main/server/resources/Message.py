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

    def post(self):
        """Add message"""
        json_data = request.get_json(force=True)

        if not json_data:
            return {'status': 'fail', 'message': 'No input data'}, 400

        errors = message_schema.validate(json_data)

        if errors:
            return {'status': 'fail', 'message': 'Error handling request'}, 422

        data = message_schema.load(json_data)

        message = Message.query.filter_by(original_message=data.get('original_message'),
                                          username=data.get('username')).first()

        if message:
            return {'status': 'fail', 'message': 'Message already exists'}, 400

        message = Message(original_message=data.get('original_message'),
                          translated_japanese_message=data.get('translated_japanese_message'),
                          translated_english_message=data.get('translated_english_message'), region=data.get('region'),
                          username=data.get('username'))

        db.session.add(message)
        db.session.commit()

        return {'status': 'success', 'message': 'Message successfully created'}, 201


class MessageResource(Resource):
    def get(self, messageID):
        """"Get a message by message ID"""
        message = Message.query.filter_by(messageID=messageID).first()

        if not message:
            return {'status': 'fail', 'message': 'No message with ID ' + str(messageID) + ' exists'}, 404

        message = message_schema.dump(message)
        return {'status': 'success', 'message': message}, 200

    def delete(self, messageID):
        """delete a message by ID"""

        message = Message.query.filter_by(messageID=messageID)

        if not message.first():
            return {'status': 'fail', 'message': 'No message with ID ' + str(messageID) + ' exists'}, 404

        message.delete()
        db.session.commit()
        return {'status': 'sucess', 'message': 'Message Deleted'}, 200
