from flask import request
from flask_restful import Resource

from managers.OrdersManager import OrdersManager
from managers.auth import auth
from schemas.request.OrdersRequestSchema import CreateUpdateOrderSchema
from schemas.response.OrderResponseSchema import OrderResponseSchema
from utils.decorators import validate_schema


class CreateListOrders(Resource):
    @auth.login_required
    def get(self):
        user = auth.current_user()
        if user.is_staff:
            orders = OrdersManager.list_orders_staff()
        else:
            orders = OrdersManager.list_orders_user(user.id)
        return OrderResponseSchema().dump(orders, many=True), 200

    @auth.login_required
    @validate_schema(CreateUpdateOrderSchema)
    def post(self):
        data = request.get_json()
        new_order = OrdersManager.create_order(data)
        return OrderResponseSchema().dump(new_order), 201


class OrdersDetailsUpdateDelete(Resource):
    @auth.login_required
    def get(self, id_):
        current_order = OrdersManager.get_order_details(id_)
        return OrderResponseSchema().dump(current_order), 200

    @auth.login_required
    @validate_schema(CreateUpdateOrderSchema)
    def put(self, id_):
        data = request.get_json()
        updated_order = OrdersManager.update_order(data, id_)
        return OrderResponseSchema().dump(updated_order), 201

    @auth.login_required
    def delete(self, id_):
        OrdersManager.delete_order(id_)
        return 204
