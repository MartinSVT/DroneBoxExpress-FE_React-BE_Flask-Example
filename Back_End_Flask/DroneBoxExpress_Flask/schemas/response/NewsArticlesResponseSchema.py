from marshmallow import Schema, fields


class NewsResponseSchema(Schema):
    id = fields.Int(required=True)
    article_title = fields.Str(required=True)
    article_content = fields.Str(required=True)
    created_date = fields.DateTime(required=True)
    updated_date = fields.DateTime(required=True)
    article_user = fields.Int(required=True)
