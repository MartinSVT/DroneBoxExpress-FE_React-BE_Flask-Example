from marshmallow import Schema, fields


class ResponseRegisterUser(Schema):
    username = fields.Str(required=True)
    email = fields.Email(required=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)


class ResponseUserUpdate(ResponseRegisterUser):
    id = fields.Int(required=True)


class ResponseUserDetails(ResponseUserUpdate):
    is_staff = fields.Bool(required=True)
