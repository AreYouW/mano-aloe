from flask_restful import Resource
from flask import request
from main.server import db, cache, app
from main.server.models import Animation, AnimationSchema
from flask_jwt import jwt_required

animation_schema = AnimationSchema()
animations_schema = AnimationSchema(many=True)


@app.after_request
def add_header(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Allow-Methods'] = 'GET,POST'
    response.headers[
        'Access-Control-Allow-Headers'] = 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    return response


class AnimationCount(Resource):
    @cache.cached(timeout=100)
    def get(self):
        """Gets the number of messages available on the server"""
        return {'status': 'success', 'count': Animation.query.count()}, 200


class AnimationListResource(Resource):
    @cache.cached(timeout=100)
    def get(self):
        """Gets all Animations on the server"""
        animations = Animation.query.all()
        animations = animations_schema.dump(animations)

        if not animations:
            return {'status': 'success',
                    'animations': animations}, 206  # Partial Content Served, the other status code never loads

        return {'status': 'success', 'animations': animations}, 200

    @jwt_required()
    def post(self):
        """Add Animation"""
        json_data = request.get_json(force=True)

        if not json_data:
            return {'status': 'fail', 'message': 'No input data'}, 400

        errors = animation_schema.validate(json_data)

        if errors:
            return {'status': 'fail', 'message': 'Error handling request'}, 422

        data = animation_schema.load(json_data)

        message = Animation.query.filter_by(
            animationLink=data.get('animationLink')).first()

        if message:
            return {'status': 'fail', 'message': 'Animation already exists'}, 400

        message = Animation(
            animationLink=data.get('animationLink'),
            artistLink=data.get('artistLink'),
            username=data.get('username'),
            title=data.get('title'))

        db.session.add(message)
        db.session.commit()

        return {'status': 'success', 'message': 'Animation entry successfully created'}, 201
