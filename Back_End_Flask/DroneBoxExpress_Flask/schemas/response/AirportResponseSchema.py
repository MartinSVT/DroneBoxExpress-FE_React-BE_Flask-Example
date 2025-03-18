from marshmallow import Schema, fields


class AirportResponseSchema(Schema):
    id = fields.Int(required=True)
    airport_name = fields.Str(required=True)
    longitude = fields.Float(required=True)
    latitude = fields.Float(required=True)
