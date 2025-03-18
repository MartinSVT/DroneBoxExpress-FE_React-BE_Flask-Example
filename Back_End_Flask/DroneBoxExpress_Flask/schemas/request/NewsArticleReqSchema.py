from marshmallow import Schema, fields, ValidationError, validates

from managers.auth import auth
from utils.schema_validators import must_not_be_blank


class CreateNewsArticleSchema(Schema):
    article_title = fields.Str(required=True, validate=must_not_be_blank)
    article_content = fields.Str(required=True, validate=must_not_be_blank)
    article_user = fields.Int(required=True, validate=must_not_be_blank)

    @validates("article_user")
    def validates_article_user(self, article_user):
        user = auth.current_user()
        if article_user != user.id:
            raise ValidationError(
                "Logged in User is different than the intended owner of the News Article",
                field_names=["article_user"],
            )
