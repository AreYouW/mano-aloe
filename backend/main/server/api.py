from flask import Blueprint
from flask_restful import Api


from main.server.resources.Message import MessageListResource, MessageResource, MessageListRangeResource

# Api Blueprint
api_bp = Blueprint('api', __name__)
api = Api(api_bp)

# Routes

api.add_resource(MessageListResource, '/messages')
api.add_resource(MessageResource, '/messages/<messageID>')
api.add_resource(MessageListRangeResource, '/messages/range/<lower>/<upper>')
