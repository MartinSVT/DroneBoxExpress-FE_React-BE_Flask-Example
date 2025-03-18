from flask import request
from flask_restful import Resource

from managers.RoutesManager import RoutesManager
from managers.auth import auth
from schemas.request.RoutesRequestSchema import CreateRoutesSchema
from schemas.response.RoutesResponseSchema import RoutesResponseSchema
from utils.decorators import validate_schema, permission_required


class CreateListRoute(Resource):
    @auth.login_required
    def get(self):
        routes = RoutesManager.list_routes()
        return RoutesResponseSchema().dump(routes, many=True), 200

    @auth.login_required
    @permission_required()
    @validate_schema(CreateRoutesSchema)
    def post(self):
        data = request.get_json()
        new_route = RoutesManager.create_route(data)
        return RoutesResponseSchema().dump(new_route), 201


class RouteDetailsUpdateDelete(Resource):
    @auth.login_required
    def get(self, id_):
        current_route = RoutesManager.get_route_details(id_)
        return RoutesResponseSchema().dump(current_route), 200

    @auth.login_required
    @permission_required()
    @validate_schema(CreateRoutesSchema)
    def put(self, id_):
        data = request.get_json()
        updated_route = RoutesManager.update_route(data, id_)
        return RoutesResponseSchema().dump(updated_route), 201

    @auth.login_required
    @permission_required()
    def delete(self, id_):
        RoutesManager.delete_route(id_)
        return 204
