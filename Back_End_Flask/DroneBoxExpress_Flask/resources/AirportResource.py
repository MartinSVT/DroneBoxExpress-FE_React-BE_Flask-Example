from flask import request
from flask_restful import Resource

from managers.AirportManager import AirportManager
from managers.auth import auth
from schemas.request.AirportsRequestSchema import CreateAirportSchema, BaseAirportSchema
from schemas.response.AirportResponseSchema import AirportResponseSchema
from utils.decorators import validate_schema, permission_required


class CreateListAirport(Resource):
    @auth.login_required
    def get(self):
        airports = AirportManager.list_airports()
        return AirportResponseSchema().dump(airports, many=True), 200

    @auth.login_required
    @permission_required()
    @validate_schema(CreateAirportSchema)
    def post(self):
        data = request.get_json()
        new_airport = AirportManager.create_airport(data)
        return AirportResponseSchema().dump(new_airport), 201


class AirportDetailsUpdateDelete(Resource):
    @auth.login_required
    def get(self, id_):
        current_airport = AirportManager.get_airport_details(id_)
        return AirportResponseSchema().dump(current_airport), 200

    @auth.login_required
    @permission_required()
    @validate_schema(BaseAirportSchema)
    def put(self, id_):
        data = request.get_json()
        updated_airport = AirportManager.update_airport(data, id_)
        return AirportResponseSchema().dump(updated_airport), 201

    @auth.login_required
    @permission_required()
    def delete(self, id_):
        AirportManager.delete_airport(id_)
        return 204
