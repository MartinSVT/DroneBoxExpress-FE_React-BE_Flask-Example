from marshmallow import Schema, fields, ValidationError, validates

from models.AirportModel import AirportModel
from utils.schema_validators import must_not_be_blank


class BaseAirportSchema(Schema):
    airport_name = fields.Str(required=True, validate=must_not_be_blank)
    longitude = fields.Float(required=True, validate=must_not_be_blank)
    latitude = fields.Float(required=True, validate=must_not_be_blank)


class CreateAirportSchema(BaseAirportSchema):
    @validates("airport_name")
    def validates_airport_name(self, airport_name):
        if AirportModel.query.filter(AirportModel.airport_name == airport_name).first():
            raise ValidationError(
                "That airport name is taken",
                field_names=["airport_name"],
            )
