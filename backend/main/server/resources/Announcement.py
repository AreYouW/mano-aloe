from flask_restful import Resource
from flask import request
from main.server import db, cache, app
from main.server.models import Announcement, AnnouncementSchema
from flask_jwt import jwt_required

announcement_schema = AnnouncementSchema()
announcements_schema = AnnouncementSchema(many=True)

@app.after_request
def add_header(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST'
    response.headers[
        'Access-Control-Allow-Headers'] = 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    return response


class AnnouncementCount(Resource):
    @cache.cached(timeout=100)
    def get(self):
        """Gets the number of announcements on the server"""
        return {'status': 'success', 'count': Announcement.query.count()}, 200

class AnnouncementListResource(Resource):
    @cache.cached(timeout=100)
    def get(self):
        """Gets all announcements on the server"""
        announcements = Announcement.query.all()
        announcements = announcements_schema.dump(announcements)

        if not announcements:
            return {'status': 'success', 'announcements': announcements}, 206  # Partial Content Served

        return {'status': 'success', 'announcements': announcements}, 200

    @jwt_required()
    def post(self):
        """Add announcement"""
        json_data = request.get_json(force=True)

        if not json_data:
            return {'status': 'fail', 'message': 'No input data'}, 400

        errors = announcement_schema.validate(json_data)

        if errors:
            return {'status': 'fail', 'message': 'Error handling request'}, 422

        data = announcement_schema.load(json_data)

        announcement = Announcement.query.filter_by(message=data.get('message')).first()

        if announcement:
            return {'status': 'fail', 'message': 'Announcement already exists'}, 400

        announcement = Announcement(message=data.get('message'))

        db.session.add(announcement)
        db.session.commit()

        return {'status': 'success', 'message': 'Announcement successfully created'}, 201


class AnnouncementResource(Resource):
    @jwt_required()
    def delete(self, announcementID):
        """delete a announcement by ID"""

        announcement = Announcement.query.filter_by(announcementID=announcementID)

        if not announcement.first():
            return {'status': 'fail', 'message': 'No announcement with ID ' + str(announcementID) + ' exists'}, 404

        announcement.delete()
        db.session.commit()
        return {'status': 'sucess', 'message': 'Announcement Deleted'}, 200
