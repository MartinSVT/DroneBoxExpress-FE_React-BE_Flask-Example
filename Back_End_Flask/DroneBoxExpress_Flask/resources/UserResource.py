from flask import request
from flask_restful import Resource

from managers.UserManager import UserManager
from managers.auth import auth
from schemas.request.UserSchema import (
    RegisterUserSchema,
    RegisterStaffSchema,
    LoginUserSchema,
    UpdateUserSchema,
    PasswordChangeSchema,
)
from schemas.response.UserResponseSchema import (
    ResponseRegisterUser,
    ResponseUserDetails,
    ResponseUserUpdate,
)
from utils.decorators import validate_schema, permission_required


class RegisterUser(Resource):
    @validate_schema(RegisterUserSchema)
    def post(self):
        data = request.get_json()
        user = UserManager.register_user(data)
        return ResponseRegisterUser().dump(user), 201


class RegisterStaff(Resource):
    @auth.login_required
    @permission_required()
    @validate_schema(RegisterStaffSchema)
    def post(self):
        data = request.get_json()
        user = UserManager.register_staff(data)
        return ResponseRegisterUser().dump(user), 201


class Login(Resource):
    @validate_schema(LoginUserSchema)
    def post(self):
        data = request.get_json()
        token = UserManager.login_user(data)
        return {"token": token}


class UserDetails(Resource):
    @auth.login_required
    def get(self):
        user = UserManager.user_details()
        return ResponseUserDetails().dump(user), 200


class UserUpdate(Resource):
    @auth.login_required
    @validate_schema(UpdateUserSchema)
    def put(self, id_):
        user = auth.current_user()
        data = request.get_json()
        if user.id == id_:
            new_user_data = UserManager.update_user(data)
            return ResponseUserUpdate().dump(new_user_data), 201
        else:
            return "Not Authorized"


class DeleteUser(Resource):
    @auth.login_required
    def delete(self, id_):
        user = auth.current_user()
        if user.id == id_:
            UserManager.delete_user(id_)
            return 204
        else:
            return "Not Authorized"


class ChangePassword(Resource):
    @auth.login_required
    @validate_schema(PasswordChangeSchema)
    def post(self):
        data = request.get_json()
        UserManager.change_password(data)
        return 204
