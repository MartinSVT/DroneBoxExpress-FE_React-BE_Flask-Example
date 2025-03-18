from unittest.mock import patch

from managers.auth import verify_token
from models.UserModel import UserModel
from test.base import BaseTestCase, generate_token
from test.factories import UserFactory
from test.mock_functions import mock_email


class TestUsersRegister(BaseTestCase):
    correct_data = {
        "username": "martin",
        "email": "martin@abv.bg",
        "password": "123456bg",
        "password2": "123456bg",
        "first_name": "martin",
        "last_name": "martin",
    }

    @patch("ThirdPartyServices.mailtrap.client.send", mock_email)
    def test_register_user_correct(self):
        self.register_user()
        users = UserModel.query.all()
        self.assertEqual(len(users), 1)

    def test_register_missing_data(self):
        data = {}
        users = UserModel.query.all()
        self.assertEqual(len(users), 0)
        response = self.client.post("/register-user", json=data)
        self.assertEqual(response.status_code, 400)
        error_message = response.json["message"]

        for field in (
            "username",
            "email",
            "password",
            "password2",
            "first_name",
            "last_name",
        ):
            self.assertIn(field, error_message)

        users = UserModel.query.all()
        self.assertEqual(len(users), 0)

    def test_register_wrong_email(self):
        users = UserModel.query.all()
        self.assertEqual(len(users), 0)

        # Invalid email
        data_wrong_email = self.correct_data.copy()
        data_wrong_email["email"] = "martinabv.bg"
        response = self.client.post("/register-user", json=data_wrong_email)
        self.assertEqual(response.status_code, 400)
        expected_msg = "Invalid fields {'email': ['Not a valid email address.']}"
        self.assertEqual(response.json["message"], expected_msg)
        users = UserModel.query.all()
        self.assertEqual(len(users), 0)

        # Blank email
        data_blank_email = self.correct_data.copy()
        data_blank_email["email"] = ""
        response = self.client.post("/register-user", json=data_blank_email)
        self.assertEqual(response.status_code, 400)
        expected_msg = "Invalid fields {'email': ['Not a valid email address.', 'Data not provided.']}"
        self.assertEqual(response.json["message"], expected_msg)
        users = UserModel.query.all()
        self.assertEqual(len(users), 0)

    def test_register_wrong_username(self):
        users = UserModel.query.all()
        self.assertEqual(len(users), 0)

        # Blank username
        data_blank_username = self.correct_data.copy()
        data_blank_username["username"] = ""
        response = self.client.post("/register-user", json=data_blank_username)
        self.assertEqual(response.status_code, 400)
        expected_msg = "Invalid fields {'username': ['Data not provided.']}"
        self.assertEqual(response.json["message"], expected_msg)
        users = UserModel.query.all()
        self.assertEqual(len(users), 0)

    def test_register_wrong_first_name(self):
        users = UserModel.query.all()
        self.assertEqual(len(users), 0)

        # Too short first_name
        data = self.correct_data.copy()
        data["first_name"] = "m"
        response = self.client.post("/register-user", json=data)
        self.assertEqual(response.status_code, 400)
        expected_msg = (
            "Invalid fields {'first_name': ['Length must be between 2 and 30.']}"
        )
        self.assertEqual(response.json["message"], expected_msg)
        users = UserModel.query.all()
        self.assertEqual(len(users), 0)

        # Too long first_name
        data = self.correct_data.copy()
        data["first_name"] = "1234567890123456789012345678901"
        response = self.client.post("/register-user", json=data)
        self.assertEqual(response.status_code, 400)
        expected_msg = (
            "Invalid fields {'first_name': ['Length must be between 2 and 30.']}"
        )
        self.assertEqual(response.json["message"], expected_msg)
        users = UserModel.query.all()
        self.assertEqual(len(users), 0)

    def test_register_wrong_last_name(self):
        users = UserModel.query.all()
        self.assertEqual(len(users), 0)

        # Too short last_name
        data = self.correct_data.copy()
        data["last_name"] = "m"
        response = self.client.post("/register-user", json=data)
        self.assertEqual(response.status_code, 400)
        expected_msg = (
            "Invalid fields {'last_name': ['Length must be between 2 and 30.']}"
        )
        self.assertEqual(response.json["message"], expected_msg)
        users = UserModel.query.all()
        self.assertEqual(len(users), 0)

        # Too long last_name
        data = self.correct_data.copy()
        data["last_name"] = "1234567890123456789012345678901"
        response = self.client.post("/register-user", json=data)
        self.assertEqual(response.status_code, 400)
        expected_msg = (
            "Invalid fields {'last_name': ['Length must be between 2 and 30.']}"
        )
        self.assertEqual(response.json["message"], expected_msg)
        users = UserModel.query.all()
        self.assertEqual(len(users), 0)

    def test_user_details(self):
        user = UserFactory(is_staff=False)
        token = generate_token(user)
        headers = {"Authorization": f"TOKEN {token}"}
        response = self.client.get("/user-details", headers=headers)
        self.assertEqual(response.json["username"], user.username)

    def test_user_update(self):
        user = UserFactory(is_staff=False)
        token = generate_token(user)
        headers = {"Authorization": f"TOKEN {token}"}
        data = {
            "username": user.username,
            "email": user.email,
            "first_name": "martin2",
            "last_name": "martin2",
        }
        response = self.client.put(
            f"/user-update/{user.id}/", headers=headers, json=data
        )
        self.assertEqual(response.json["first_name"], data["first_name"])
        self.assertEqual(response.json["last_name"], data["last_name"])

    def test_user_delete(self):
        user = UserFactory(is_staff=False)
        token = generate_token(user)
        headers = {"Authorization": f"TOKEN {token}"}
        users = UserModel.query.all()
        self.assertEqual(len(users), 1)
        self.client.delete(f"/user-delete/{user.id}/", headers=headers)
        users = UserModel.query.all()
        self.assertEqual(len(users), 0)

    @patch("ThirdPartyServices.mailtrap.client.send", mock_email)
    def test_user_login(self):
        username, password = self.register_user()
        data = {"username": username, "password": password}
        response = self.client.post(f"/login", json=data)
        self.assertEqual(response.status_code, 200)
        answer = verify_token(response.json["token"])
        self.assertEqual(answer.username, username)


class TestStaffRegister(BaseTestCase):
    correct_data = {
        "username": "martin",
        "email": "martin@abv.bg",
        "password": "123456bg",
        "password2": "123456bg",
        "first_name": "martin",
        "last_name": "martin",
        "is_staff": True,
    }

    @patch("ThirdPartyServices.mailtrap.client.send", mock_email)
    def test_register_staff(self):
        user = UserFactory(is_staff=True)
        token = generate_token(user)
        headers = {"Authorization": f"TOKEN {token}"}
        users = UserModel.query.all()
        self.assertEqual(len(users), 1)
        response = self.client.post(
            "/register-staff", headers=headers, json=self.correct_data
        )
        self.assertEqual(response.status_code, 201)
        users = UserModel.query.all()
        self.assertEqual(len(users), 2)
        new_staff_member = UserModel.query.filter_by(
            username=self.correct_data["username"]
        ).all()
        self.assertEqual(len(new_staff_member), 1)
        self.assertEqual(new_staff_member[0].is_staff, True)

    @patch("ThirdPartyServices.mailtrap.client.send", mock_email)
    def test_register_user_via_staff_access(self):
        user = UserFactory(is_staff=True)
        token = generate_token(user)
        headers = {"Authorization": f"TOKEN {token}"}
        users = UserModel.query.all()
        self.assertEqual(len(users), 1)
        data = self.correct_data.copy()
        data["is_staff"] = False
        response = self.client.post("/register-staff", headers=headers, json=data)
        self.assertEqual(response.status_code, 201)
        users = UserModel.query.all()
        self.assertEqual(len(users), 2)
        new_staff_member = UserModel.query.filter_by(
            username=self.correct_data["username"]
        ).all()
        self.assertEqual(len(new_staff_member), 1)
        self.assertEqual(new_staff_member[0].is_staff, False)
