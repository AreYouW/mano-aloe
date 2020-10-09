from flask_restful import Resource
from flask import request
from main.server import db, cache, app
from main.server.models import ArchiveCoco, ArchiveHaachama, ArchiveSchema
from flask_jwt import jwt_required
import datetime

archives_schema = ArchiveSchema(many=True)
archive_schema = ArchiveSchema()


@app.after_request
def add_header(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST'
    response.headers[
        'Access-Control-Allow-Headers'] = 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    return response

def tableConversion(who):
    if who == "coco":
        return ArchiveCoco
    elif who == "haachama":
        return ArchiveHaachama
    else:
        return None

class ArchiveCount(Resource):
    @cache.cached(timeout=100)
    def get(self, who):
        """Gets the number of archives available"""
        archiveTable = tableConversion(who)
        if not archiveTable:
            return {'status': 'fail', 'message': 'No data for ' + str(who) + ' exists'}, 404

        return {'status': 'success', 'count': archiveTable.query.count()}, 200


class ArchiveListResource(Resource):
    @cache.cached(timeout=100)
    def get(self, who):
        """Gets all archive links"""
        archiveTable = tableConversion(who)
        if not archiveTable:
            return {'status': 'fail', 'message': 'No data for ' + str(who) + ' exists'}, 404

        archives = archiveTable.query.all()
        archives = archives_schema.dump(archives)

        if not archives:
            return {'status': 'success', 'archives': archives}, 206  # Partial Content Served

        return {'status': 'success', 'archives': archives}, 200

    @jwt_required()
    def post(self, who):
        """Add archive link"""
        archiveTable = tableConversion(who)
        if not archiveTable:
            return {'status': 'fail', 'message': 'No data for ' + str(who) + ' exists'}, 404

        json_data = request.get_json(force=True)

        if not json_data:
            return {'status': 'fail', 'message': 'No input data'}, 400

        errors = archive_schema.validate(json_data)

        if errors:
            return {'status': 'fail', 'message': 'Error handling request'}, 422

        data = archive_schema.load(json_data)

        archive = archiveTable.query.filter_by(archiveURL=data.get('archiveURL')).first()

        if archive:
            return {'status': 'fail', 'message': 'archive already exists'}, 400

        archive = archiveTable(archiveURL=data.get('archiveURL'))

        db.session.add(archive)
        db.session.commit()

        return {'status': 'success', 'message': 'Archive successfully created'}, 201


class ArchiveResource(Resource):
    @cache.cached(timeout=100)
    def get(self, who, archiveID):
        """Get an archive by archive ID"""
        archiveTable = tableConversion(who)
        if not archiveTable:
            return {'status': 'fail', 'message': 'No data for ' + str(who) + ' exists'}, 404

        archive = archiveTable.query.filter_by(archiveID=archiveID)

        if not archive.first():
            return {'status': 'fail', 'message': 'No archive with ID ' + str(archiveID) + ' exists'}, 404

        archive = archives_schema.dump(archive)
        return {'status': 'success', 'archives': archive}, 200

    @jwt_required()
    def delete(self, who, archiveID):
        """Delete an archive by ID"""
        archiveTable = tableConversion(who)
        if not archiveTable:
            return {'status': 'fail', 'message': 'No data for ' + str(who) + ' exists'}, 404

        archive = archiveTable.query.filter_by(archiveID=archiveID)

        if not archive.first():
            return {'status': 'fail', 'message': 'No archive with ID ' + str(archiveID) + ' exists'}, 404

        archive.delete()
        db.session.commit()
        return {'status': 'sucess', 'message': 'Archive Deleted'}, 200


class ArchiveRandomResource(Resource):
    @cache.cached(timeout=100)
    def get(self, who):
        """Get a random archive link."""
        # The source of randomness is the order of the database. The code only pulls consecutive IDs from the database.
        archiveTable = tableConversion(who)
        if not archiveTable:
            return {'status': 'fail', 'message': 'No data for ' + str(who) + ' exists'}, 404

        size = archiveTable.query.count()
        daysPassed = (datetime.date.today() - datetime.date(2020, 10, 4)).days
        if size == 0:
            return {'status': 'fail', 'message': 'No archives exist for ' + str(who) + ' exists'}, 404
        archiveID = daysPassed % size + 1   #modulus does not return negative, add one because sqlite index sucks and starts at 1

        archive = archiveTable.query.filter_by(archiveID=archiveID)
        archive = archives_schema.dump(archive)
        return {'status': 'success', 'archives': archive}, 200
