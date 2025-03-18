from models.RoutesModel import RoutesModel
from test.base import BaseTestCase, generate_token
from test.factories import UserFactory, RouteFactory, AirportFactory


class TestRoutes(BaseTestCase):
    correct_route_data = {
        "cost_per_kg": 8,
        "origin_airport": 0,
        "destination_airport": 0,
    }

    def test_route_creation(self):
        user = UserFactory(is_staff=True)
        token = generate_token(user)
        headers = {"Authorization": f"TOKEN {token}"}
        data = self.correct_route_data.copy()
        airport_1 = AirportFactory()
        airport_2 = AirportFactory()
        data["origin_airport"] = airport_1.id
        data["destination_airport"] = airport_2.id
        response = self.client.post("/routes", headers=headers, json=data)
        self.assertEqual(response.status_code, 201)
        news = RoutesModel.query.all()
        self.assertEqual(len(news), 1)

    def test_route_creation_with_same_airport(self):
        user = UserFactory(is_staff=True)
        token = generate_token(user)
        headers = {"Authorization": f"TOKEN {token}"}
        data = self.correct_route_data.copy()
        airport_1 = AirportFactory()
        data["origin_airport"] = airport_1.id
        data["destination_airport"] = airport_1.id
        response = self.client.post("/routes", headers=headers, json=data)
        self.assertEqual(response.status_code, 400)
        expected_msg = "Invalid fields {'_schema': ['Origin Airport Cannot be the same as Destination Airport']}"
        self.assertEqual(response.json["message"], expected_msg)
        news = RoutesModel.query.all()
        self.assertEqual(len(news), 0)

    def test_route_creation_with_wrong_airport(self):
        user = UserFactory(is_staff=True)
        token = generate_token(user)
        headers = {"Authorization": f"TOKEN {token}"}
        data = self.correct_route_data.copy()
        airport_1 = AirportFactory()
        data["origin_airport"] = airport_1.id
        data["destination_airport"] = 8
        response = self.client.post("/routes", headers=headers, json=data)
        self.assertEqual(response.status_code, 400)
        expected_msg = "Invalid fields {'destination_airport': ['No such Airport']}"
        self.assertEqual(response.json["message"], expected_msg)
        news = RoutesModel.query.all()
        self.assertEqual(len(news), 0)

    def test_list_routes(self):
        user = UserFactory(is_staff=True)
        token = generate_token(user)
        headers = {"Authorization": f"TOKEN {token}"}
        airport_1 = AirportFactory()
        airport_2 = AirportFactory()
        airport_3 = AirportFactory()
        RouteFactory(origin_airport=airport_1.id, destination_airport=airport_2.id)
        RouteFactory(origin_airport=airport_1.id, destination_airport=airport_3.id)
        response = self.client.get("/routes", headers=headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json), 2)
        news = RoutesModel.query.all()
        self.assertEqual(len(news), 2)

    def test_get_route_by_pk(self):
        user = UserFactory(is_staff=True)
        token = generate_token(user)
        headers = {"Authorization": f"TOKEN {token}"}
        airport_1 = AirportFactory()
        airport_2 = AirportFactory()
        route_1 = RouteFactory(
            origin_airport=airport_1.id, destination_airport=airport_2.id
        )
        response = self.client.get(f"/routes/{route_1.id}/", headers=headers)
        self.assertEqual(response.json["cost_per_kg"], route_1.cost_per_kg)

    def test_update_route(self):
        user = UserFactory(is_staff=True)
        token = generate_token(user)
        headers = {"Authorization": f"TOKEN {token}"}
        airport_1 = AirportFactory()
        airport_2 = AirportFactory()
        airport_3 = AirportFactory()
        route_1 = RouteFactory(
            origin_airport=airport_1.id, destination_airport=airport_2.id
        )
        data = self.correct_route_data.copy()
        data["origin_airport"] = airport_1.id
        data["destination_airport"] = airport_3.id
        response = self.client.put(f"/routes/{route_1.id}/", headers=headers, json=data)
        self.assertEqual(
            response.json["cost_per_kg"], self.correct_route_data["cost_per_kg"]
        )

    def test_delete_route(self):
        user = UserFactory(is_staff=True)
        token = generate_token(user)
        headers = {"Authorization": f"TOKEN {token}"}
        airport_1 = AirportFactory()
        airport_2 = AirportFactory()
        route_1 = RouteFactory(
            origin_airport=airport_1.id, destination_airport=airport_2.id
        )
        routes = RoutesModel.query.all()
        self.assertEqual(len(routes), 1)
        self.client.delete(f"/routes/{route_1.id}/", headers=headers)
        routes = RoutesModel.query.all()
        self.assertEqual(len(routes), 0)
