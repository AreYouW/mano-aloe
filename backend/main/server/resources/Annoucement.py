from flask_restful import Resource
from flask import request
from main.server import db, cache, app
from main.server.models import Annoucement, AnnoucementSchema
from flask_jwt import jwt_required

annoucement_schema = AnnoucementSchema()
annoucements_schema = AnnoucementSchema(many=True)

@app.after_request
def add_header(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST'
    response.headers[
        'Access-Control-Allow-Headers'] = 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    return response


class AnnoucementCount(Resource):
    @cache.cached(timeout=100)
    def get(self):
        """Gets the number of annoucements on the server"""
        return {'status': 'success', 'count': Annoucement.query.count()}, 200

class AnnoucementListResource(Resource):
    @cache.cached(timeout=100)
    def get(self):
        """Gets all annoucements on the server"""
        annoucements = Annoucement.query.all()
        annoucements = annoucements_schema.dump(annoucements)

        if not annoucements:
            return {'status': 'success', 'annoucements': annoucements}, 206  # Partial Content Served

        return {'status': 'success', 'annoucements': annoucements}, 200

    @jwt_required()
    def post(self):
        """Add annoucement"""
        json_data = request.get_json(force=True)

        if not json_data:
            return {'status': 'fail', 'message': 'No input data'}, 400

        errors = annoucement_schema.validate(json_data)

        if errors:
            return {'status': 'fail', 'message': 'Error handling request'}, 422

        data = annoucement_schema.load(json_data)

        annoucement = Annoucement.query.filter_by(message=data.get('message')).first()

        if annoucement:
            return {'status': 'fail', 'message': 'Annoucement already exists'}, 400

        annoucement = Annoucement(message=data.get('message'))

        db.session.add(annoucement)
        db.session.commit()

        return {'status': 'success', 'message': 'Annoucement successfully created'}, 201


class AnnoucementResource(Resource):
    @jwt_required()
    def delete(self, annoucementID):
        """delete a annoucement by ID"""

        annoucement = Annoucement.query.filter_by(annoucementID=annoucementID)

        if not annoucement.first():
            return {'status': 'fail', 'message': 'No annoucement with ID ' + str(annoucementID) + ' exists'}, 404

        annoucement.delete()
        db.session.commit()
        return {'status': 'sucess', 'message': 'Annoucement Deleted'}, 200
