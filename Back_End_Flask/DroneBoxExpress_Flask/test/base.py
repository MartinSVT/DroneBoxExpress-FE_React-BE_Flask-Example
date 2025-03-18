from flask_testing import TestCase

from DataBase import db
from config import create_app
from managers.auth import TokenManager
from models.UserModel import UserModel


def generate_token(user):
    return TokenManager.encode_token(user)


def make_user_for_request(user):
    dict_user = {
        "username": user.username,
        "email": user.email,
        "password": user.password,
        "password2": user.password,
        "first_name": "martin22",
        "last_name": "martin22",
        "is_staff": False,
    }
    return dict_user


class BaseTestCase(TestCase):
    def create_app(self):
        return create_app("config.TestingConfig")

    def setUp(self):
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def register_user(self):
        data = {
            "username": "martin",
            "email": "martin@abv.bg",
            "password": "123456bg",
            "password2": "123456bg",
            "first_name": "martin",
            "last_name": "martin",
        }
        users = UserModel.query.all()
        self.assertEqual(len(users), 0)
        resp = self.client.post("/register-user", json=data)
        self.assertEqual(resp.status_code, 201)
        self.assertEqual(
            resp.json,
            {
                "username": "martin",
                "email": "martin@abv.bg",
                "first_name": "martin",
                "last_name": "martin",
            },
        )
        return data["username"], data["password"]
