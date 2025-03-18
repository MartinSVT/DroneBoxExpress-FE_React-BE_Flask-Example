from marshmallow import Schema, fields
from marshmallow_enum import EnumField

from models.enums import OrderStatus


class OrderResponseSchema(Schema):
    id = fields.Int(required=True)
    weight = fields.Float(required=True)
    cost = fields.Float(required=True)
    order_status = EnumField(OrderStatus, by_value=True)
    order_route = fields.Int(required=True)
    order_user = fields.Int(required=True)
