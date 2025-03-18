from models.AirportModel import AirportModel
from test.base import BaseTestCase, generate_token
from test.factories import UserFactory, AirportFactory


class TestAirports(BaseTestCase):
    correct_airport_data = {
        "airport_name": "Test Airport",
        "longitude": 6,
        "latitude": 5,
    }

    def test_airport_creation(self):
        user = UserFactory(is_staff=True)
        token = generate_token(user)
        headers = {"Authorization": f"TOKEN {token}"}
        data = self.correct_airport_data.copy()
        response = self.client.post("/airports", headers=headers, json=data)
        self.assertEqual(response.status_code, 201)
        news = AirportModel.query.all()
        self.assertEqual(len(news), 1)

    def test_airport_creation_with_wrong_data(self):
        user = UserFactory(is_staff=True)
        token = generate_token(user)
        headers = {"Authorization": f"TOKEN {token}"}
        data = self.correct_airport_data.copy()
        data["airport_name"] = 6
        response = self.client.post("/airports", headers=headers, json=data)
        self.assertEqual(response.status_code, 400)
        expected_msg = "Invalid fields {'airport_name': ['Not a valid string.']}"
        self.assertEqual(response.json["message"], expected_msg)
        news = AirportModel.query.all()
        self.assertEqual(len(news), 0)

    def test_list_airports(self):
        user = UserFactory(is_staff=True)
        token = generate_token(user)
        headers = {"Authorization": f"TOKEN {token}"}
        AirportFactory()
        AirportFactory()
        response = self.client.get("/airports", headers=headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json), 2)
        news = AirportModel.query.all()
        self.assertEqual(len(news), 2)

    def test_get_airport_by_pk(self):
        user = UserFactory(is_staff=True)
        token = generate_token(user)
        headers = {"Authorization": f"TOKEN {token}"}
        airport = AirportFactory()
        response = self.client.get(f"/airports/{airport.id}/", headers=headers)
        self.assertEqual(response.json["airport_name"], airport.airport_name)

    def test_update_airport(self):
        user = UserFactory(is_staff=True)
        token = generate_token(user)
        headers = {"Authorization": f"TOKEN {token}"}
        airport = AirportFactory()
        response = self.client.put(
            f"/airports/{airport.id}/", headers=headers, json=self.correct_airport_data
        )
        self.assertEqual(
            response.json["airport_name"], self.correct_airport_data["airport_name"]
        )

    def test_delete_airport(self):
        user = UserFactory(is_staff=True)
        token = generate_token(user)
        headers = {"Authorization": f"TOKEN {token}"}
        airport = AirportFactory()
        airports = AirportModel.query.all()
        self.assertEqual(len(airports), 1)
        self.client.delete(f"/airports/{airport.id}/", headers=headers)
        airports = AirportModel.query.all()
        self.assertEqual(len(airports), 0)
