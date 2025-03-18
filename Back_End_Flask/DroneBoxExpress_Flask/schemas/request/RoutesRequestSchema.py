from marshmallow import Schema, fields, validates_schema, ValidationError, validates

from models.AirportModel import AirportModel
from utils.schema_validators import must_not_be_blank


class CreateRoutesSchema(Schema):
    cost_per_kg = fields.Float(required=True, validate=must_not_be_blank)
    origin_airport = fields.Int(required=True, validate=must_not_be_blank)
    destination_airport = fields.Int(required=True, validate=must_not_be_blank)

    @validates("cost_per_kg")
    def validates_cost_per_kg(self, cost_per_kg):
        if cost_per_kg < 0:
            raise ValidationError(
                "Must be Positive Number",
                field_names=["cost_per_kg"],
            )

    @validates("origin_airport")
    def validates_origin_airport(self, origin_airport):
        if not AirportModel.query.filter(AirportModel.id == origin_airport).first():
            raise ValidationError(
                "No such Airport",
                field_names=["origin_airport"],
            )

    @validates("destination_airport")
    def validates_destination_airport(self, destination_airport):
        if not AirportModel.query.filter(
            AirportModel.id == destination_airport
        ).first():
            raise ValidationError(
                "No such Airport",
                field_names=["destination_airport"],
            )

    @validates_schema
    def validate_airports(self, data, **kwargs):
        if data["origin_airport"] == data["destination_airport"]:
            raise ValidationError(
                "Origin Airport Cannot be the same as Destination Airport",
                field_names=["origin_airport"],
            )
