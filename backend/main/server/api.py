from flask import Blueprint
from flask_restful import Api

# Api Blueprint
api_bp = Blueprint('api', __name__)
api = Api(api_bp)
