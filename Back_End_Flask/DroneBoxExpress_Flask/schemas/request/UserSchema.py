import re

from marshmallow import (
    Schema,
    fields,
    validates_schema,
    ValidationError,
    validate,
    validates,
)

from managers.auth import auth
from models.UserModel import UserModel
from utils.schema_validators import must_not_be_blank


def validate_password(value):
    if len(value) < 6:
        raise ValidationError("Password must be at least 6 characters long.")

    if len(re.findall(r"\d", value)) < 2:
        raise ValidationError("Password must contain at least 2 digits.")

    if len(re.findall(r"[a-zA-Z]", value)) < 2:
        raise ValidationError("Password must contain at least 2 letters.")


class RegisterUserSchema(Schema):
    username = fields.Str(required=True, validate=must_not_be_blank)
    password = fields.String(required=True, validate=validate_password)
    password2 = fields.String(required=True, validate=validate_password)
    email = fields.Email(required=True, validate=must_not_be_blank)
    first_name = fields.String(
        validate=validate.Length(min=2, max=30),
        error="First Name must be between 2 and 30 characters",
        required=True,
    )
    last_name = fields.String(
        validate=validate.Length(min=2, max=30),
        error="Last Name must be between 2 and 30 characters",
        required=True,
    )

    @validates_schema
    def validate_password(self, data, **kwargs):
        if data["password"] != data["password2"]:
            raise ValidationError(
                "Password fields must be the same",
                field_names=["password"],
            )

    @validates("username")
    def validates_username(self, username):
        if UserModel.query.filter(UserModel.username == username).first():
            raise ValidationError(
                "That username is taken",
                field_names=["username"],
            )

    @validates("email")
    def validates_email(self, email):
        if UserModel.query.filter(UserModel.email == email).first():
            raise ValidationError(
                "That email is taken",
                field_names=["email"],
            )


class RegisterStaffSchema(RegisterUserSchema):
    is_staff = fields.Boolean(required=True)


class LoginUserSchema(Schema):
    username = fields.String(required=True)
    password = fields.String(required=True)


class UpdateUserSchema(Schema):
    username = fields.Str(required=True, validate=must_not_be_blank)
    email = fields.Email(required=True, validate=must_not_be_blank)
    first_name = fields.String(
        validate=validate.Length(min=2, max=30),
        error="First Name must be between 2 and 30 characters",
        required=True,
    )
    last_name = fields.String(
        validate=validate.Length(min=2, max=30),
        error="Last Name must be between 2 and 30 characters",
        required=True,
    )

    @validates("username")
    def validates_username(self, username):
        user = auth.current_user()
        if username != user.username:
            if UserModel.query.filter(UserModel.username == username).first():
                raise ValidationError(
                    "That username is taken",
                    field_names=["username"],
                )

    @validates("email")
    def validates_email(self, email):
        user = auth.current_user()
        if email != user.email:
            if UserModel.query.filter(UserModel.email == email).first():
                raise ValidationError(
                    "That email is taken",
                    field_names=["email"],
                )


class PasswordChangeSchema(Schema):
    old_password = fields.String(required=True)
    new_password1 = fields.String(required=True, validate=validate_password)
    new_password2 = fields.String(required=True, validate=validate_password)

    @validates_schema
    def validate_new_passwords(self, data, **kwargs):
        if data["new_password1"] != data["new_password2"]:
            raise ValidationError(
                "Password fields must be the same",
                field_names=["new_password1"],
            )

    @validates_schema
    def validate_old_password_is_not_the_same(self, data, **kwargs):
        if data["old_password"] == data["new_password1"]:
            raise ValidationError(
                "New password cannot be the same as the old password.",
                field_names=["new_password1"],
            )
