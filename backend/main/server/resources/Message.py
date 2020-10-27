from flask_restful import Resource
from flask import request
from main.server import db, cache, app
from main.server.models import Message, MessageSchema
from flask_jwt import jwt_required

messages_schema = MessageSchema(many=True)
message_schema = MessageSchema()


@app.after_request
def add_header(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST'
    response.headers[
        'Access-Control-Allow-Headers'] = 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    return response


class MessageCount(Resource):
    @cache.cached(timeout=100)
    def get(self):
        """Gets the number of messages available on the server"""
        return {'status': 'success', 'count': Message.query.count()}, 200


class MessageListRangeResource(Resource):
    @cache.cached(timeout=100)
    def get(self, lower, upper):
        """Gets a range of messages on the server"""
        if int(lower) < 1:
            return {'status': 'fail', 'messages': 'Invalid index: ' + str(lower)}, 400
        if int(lower) > int(upper):
            return {'status': 'fail',
                    'messages': 'Upper range cannot be less than lower range: ' + str(lower) + '>' + str(upper)}, 400
        messages = Message.query.filter(Message.messageID >= int(lower)).filter(Message.messageID <= int(upper))

        if not messages:
            return {'status': 'fail',
                    'messages': 'Out of range: ' + str(lower) + ' - ' + str(upper) + ' does not exist'}, 404

        messages = messages_schema.dump(messages)

        if not Message.query.filter_by(messageID=upper).first():  # the last item in the range
            return {'status': 'success', 'messages': messages}, 206  # Partial Content Served
        return {'status': 'success', 'messages': messages}, 200


class MessageListResource(Resource):
    @cache.cached(timeout=100)
    def get(self):
        """Gets all messages on the server"""
        messages = Message.query.all()
        messages = messages_schema.dump(messages)

        if not messages:
            return {'status': 'success', 'messages': messages}, 206  # Partial Content Served

        return {'status': 'success', 'messages': messages}, 200

    @jwt_required()
    def post(self):
        """Add message"""
        json_data = request.get_json(force=True)

        if not json_data:
            return {'status': 'fail', 'message': 'No input data'}, 400

        errors = message_schema.validate(json_data)

        if errors:
            return {'status': 'fail', 'message': 'Error handling request'}, 422

        data = message_schema.load(json_data)

        message = Message.query.filter_by(orig_msg=data.get('orig_msg'),
                                          username=data.get('username')).first()

        if message:
            return {'status': 'fail', 'message': 'Message already exists'}, 400

        message = Message(orig_msg=data.get('orig_msg'),
                          tl_msg=data.get('tl_msg'),
                          region=data.get('region'),
                          username=data.get('username'))

        db.session.add(message)
        db.session.commit()

        return {'status': 'success', 'message': 'Message successfully created'}, 201


class MessageResource(Resource):
    @cache.cached(timeout=100)
    def get(self, messageID):
        """"Get a message by message ID"""
        message = Message.query.filter_by(messageID=messageID)

        if not message.first():
            return {'status': 'fail', 'message': 'No message with ID ' + str(messageID) + ' exists'}, 404

        message = messages_schema.dump(message)
        return {'status': 'success', 'messages': message}, 200

    @jwt_required()
    def delete(self, messageID):
        """delete a message by ID"""

        message = Message.query.filter_by(messageID=messageID)

        if not message.first():
            return {'status': 'fail', 'message': 'No message with ID ' + str(messageID) + ' exists'}, 404

        message.delete()
        db.session.commit()
        return {'status': 'sucess', 'message': 'Message Deleted'}, 200
