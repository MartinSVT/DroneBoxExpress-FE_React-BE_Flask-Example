from marshmallow import Schema, fields


class RoutesResponseSchema(Schema):
    id = fields.Int(required=True)
    cost_per_kg = fields.Float(required=True)
    origin_airport = fields.Int(required=True)
    destination_airport = fields.Int(required=True)
