from datetime import datetime, timedelta

import jwt
from decouple import config
from flask_httpauth import HTTPTokenAuth
from werkzeug.exceptions import Unauthorized

from DataBase import db
from models.UserModel import UserModel


class TokenManager:
    @staticmethod
    def encode_token(user):
        payload = {
            "sub": user.id,
            "exp": datetime.utcnow() + timedelta(days=30),
            "is_staff": user.is_staff,
        }
        return jwt.encode(payload, key=config("SECRET_KEY"), algorithm="HS256")

    @staticmethod
    def decode_token(token):
        try:
            info = jwt.decode(jwt=token, key=config("SECRET_KEY"), algorithms=["HS256"])
            return info["sub"], info["is_staff"]
        except Exception as ex:
            raise ex


auth = HTTPTokenAuth(scheme="TOKEN")


@auth.verify_token
def verify_token(token):
    try:
        user_id, is_user_staff = TokenManager.decode_token(token)
        return db.session.execute(db.select(UserModel).filter_by(id=user_id)).scalar()
    except Exception:
        raise Unauthorized("Invalid Token")
