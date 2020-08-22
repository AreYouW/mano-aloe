from flask import Blueprint
from flask_restful import Api


from main.server.resources.Message import MessageListResource, MessageResource, MessageListRangeResource, MessageCount, GalleryCount, GameCount

# Api Blueprint
api_bp = Blueprint('api', __name__)
api = Api(api_bp)

# Routes

## Messages
api.add_resource(MessageListResource, '/messages')
api.add_resource(MessageResource, '/messages/<messageID>')
api.add_resource(MessageListRangeResource, '/messages/range/<lower>/<upper>')
api.add_resource(MessageCount, '/messages/count')

## Games
api.add_resource(GameCount, '/games/count')

## Gallery
api.add_resource(GalleryCount, '/gallery/count')
