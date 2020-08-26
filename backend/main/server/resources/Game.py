from flask_restful import Resource
from flask import request
from main.server import db, cache, app
from main.server.models import Games, GameSchema
from flask_jwt import jwt_required


games_schema = GameSchema(many=True)
game_schema = GameSchema()


@app.after_request
def add_header(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Allow-Methods'] = 'GET,POST'
    response.headers[
        'Access-Control-Allow-Headers'] = 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    return response


class GameListResource(Resource):
    @cache.cached(timeout=100)
    def get(self):
        """Gets all Artwork on the server"""
        games = Games.query.all()
        games = games_schema.dump(games)

        if not games:
            return {'status': 'success', 'games': games}, 206  # Partial Content Served

        return {'status': 'success', 'games': games}, 200

    @jwt_required()
    def post(self):
        """Add Game"""
        json_data = request.get_json(force=True)

        if not json_data:
            return {'status': 'fail', 'message': 'No input data'}, 400

        errors = game_schema.validate(json_data)

        if errors:
            return {'status': 'fail', 'message': 'Error handling request'}, 422

        data = game_schema.load(json_data)

        message = Games.query.filter_by(gameLink=data.get('gameLink')).first()

        if message:
            return {'status': 'fail', 'message': 'Game already exists'}, 400

        message = Games(gameLink=data.get('gameLink'),
                        gitLink=data.get('gitLink'),
                        description=data.get('description'),
                        title=data.get('title'))

        db.session.add(message)
        db.session.commit()

        return {'status': 'success', 'message': 'Game entry successfully created'}, 201


class GameCount(Resource):
    @cache.cached(timeout=100)
    def get(self):
        """Gets the number of games available on the server"""
        return {'status': 'success', 'count': Games.query.count()}, 200
