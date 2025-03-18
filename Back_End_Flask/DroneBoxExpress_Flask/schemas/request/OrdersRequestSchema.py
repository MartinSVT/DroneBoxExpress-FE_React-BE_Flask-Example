from marshmallow import Schema, fields, ValidationError, validates
from marshmallow.validate import OneOf

from managers.auth import auth
from models.RoutesModel import RoutesModel
from models.UserModel import UserModel
from utils.schema_validators import must_not_be_blank


class CreateUpdateOrderSchema(Schema):
    weight = fields.Float(required=True, validate=must_not_be_blank)
    cost = fields.Float(required=True, validate=must_not_be_blank)
    order_route = fields.Int(required=True, validate=must_not_be_blank)
    order_user = fields.Int(required=True, validate=must_not_be_blank)
    order_status = fields.String(
        required=False, validate=OneOf(["Completed", "Scheduled"])
    )

    @validates("weight")
    def validates_weight(self, weight):
        if weight < 0:
            raise ValidationError(
                "Must be Positive Number",
                field_names=["weight"],
            )

    @validates("cost")
    def validates_cost(self, cost):
        if cost < 0:
            raise ValidationError(
                "Must be Positive Number",
                field_names=["cost"],
            )

    @validates("order_route")
    def validates_order_route(self, order_route):
        if not RoutesModel.query.filter(RoutesModel.id == order_route).first():
            raise ValidationError(
                "No Such Route Exists",
                field_names=["order_route"],
            )

    @validates("order_user")
    def validates_order_user(self, order_user):
        user = auth.current_user()
        if not user.is_staff:
            if order_user != user.id:
                raise ValidationError(
                    "Logged in User is different than the Order User",
                    field_names=["order_user"],
                )
        else:
            if not UserModel.query.filter(UserModel.id == order_user).first():
                raise ValidationError(
                    "No Such User",
                    field_names=["order_user"],
                )
