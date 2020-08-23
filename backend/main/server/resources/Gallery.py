from flask_restful import Resource
from flask import request
from main.server import db, cache, app
from main.server.models import Gallery, GallerySchema

artwork_schema = GallerySchema()
gallery_schema = GallerySchema(many=True)

@app.after_request
def add_header(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Allow-Methods'] = 'GET,HEAD,OPTIONS,POST,PUT'
    response.headers['Access-Control-Allow-Headers'] = 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    return response

class GalleryCount(Resource):
    @cache.cached(timeout=100)
    def get(self):
        """Gets the number of messages available on the server"""
        return {'status': 'success', 'count': Gallery.query.count()}, 200

class GalleryListResource(Resource):
    @cache.cached(timeout=100)
    def get(self):
        """Gets all Artwork on the server"""
        gallery = Gallery.query.all()
        gallery = gallery_schema.dump(gallery)

        print(gallery)
        
        if not gallery:
            return {'status': 'success', 'gallery': gallery}, 206 #Partial Content Served

        return {'status': 'success', 'messages': gallery}, 200

    def post(self):
        """Add Artwork"""
        json_data = request.get_json(force=True)

        if not json_data:
            return {'status': 'fail', 'message': 'No input data'}, 400

        errors = gallery_schema.validate(json_data)

        if errors:
            return {'status': 'fail', 'message': 'Error handling request'}, 422

        data = gallery_schema.load(json_data)

        message = Message.query.filter_by(orig_msg=data.get('artworkLink')).first()

        if message:
            return {'status': 'fail', 'message': 'Artwork already exists'}, 400

        message = Message(artworkLink=data.get('artworkLink'),
                          artistLink=data.get('artistLink'),
                          username=data.get('username'),
                          title=data.get('title'))

        db.session.add(message)
        db.session.commit()

        return {'status': 'success', 'message': 'Message successfully created'}, 201

