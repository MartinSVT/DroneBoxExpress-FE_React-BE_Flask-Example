from unittest.mock import patch

from models.OrdersModel import OrdersModel
from models.RoutesModel import RoutesModel
from test.base import BaseTestCase, generate_token
from test.factories import UserFactory, RouteFactory, AirportFactory, OrderFactory
from test.mock_functions import mock_email


class TestOrder(BaseTestCase):
    correct_order_data = {"weight": 80, "cost": 200, "order_route": 0, "order_user": 0}

    @patch("ThirdPartyServices.mailtrap.client.send", mock_email)
    def test_order_creation(self):
        user = UserFactory(is_staff=False)
        token = generate_token(user)
        headers = {"Authorization": f"TOKEN {token}"}
        airport_1 = AirportFactory()
        airport_2 = AirportFactory()
        route_1 = RouteFactory(
            origin_airport=airport_1.id, destination_airport=airport_2.id
        )
        data = self.correct_order_data.copy()
        data["order_route"] = route_1.id
        data["order_user"] = user.id
        response = self.client.post("/orders", headers=headers, json=data)
        self.assertEqual(response.status_code, 201)
        news = RoutesModel.query.all()
        self.assertEqual(len(news), 1)

    def test_order_creation_with_wrong_route(self):
        user = UserFactory(is_staff=False)
        token = generate_token(user)
        headers = {"Authorization": f"TOKEN {token}"}
        data = self.correct_order_data.copy()
        data["order_route"] = 8
        data["order_user"] = user.id
        response = self.client.post("/orders", headers=headers, json=data)
        self.assertEqual(response.status_code, 400)
        expected_msg = "Invalid fields {'order_route': ['No Such Route Exists']}"
        self.assertEqual(response.json["message"], expected_msg)
        orders = OrdersModel.query.all()
        self.assertEqual(len(orders), 0)

    def test_order_creation_with_wrong_user(self):
        user = UserFactory(is_staff=False)
        token = generate_token(user)
        headers = {"Authorization": f"TOKEN {token}"}
        airport_1 = AirportFactory()
        airport_2 = AirportFactory()
        route_1 = RouteFactory(
            origin_airport=airport_1.id, destination_airport=airport_2.id
        )
        data = self.correct_order_data.copy()
        data["order_route"] = route_1.id
        data["order_user"] = 6
        response = self.client.post("/orders", headers=headers, json=data)
        self.assertEqual(response.status_code, 400)
        expected_msg = "Invalid fields {'order_user': ['Logged in User is different than the Order User']}"
        self.assertEqual(response.json["message"], expected_msg)
        orders = OrdersModel.query.all()
        self.assertEqual(len(orders), 0)

    def test_list_orders(self):
        user = UserFactory(is_staff=False)
        token = generate_token(user)
        headers = {"Authorization": f"TOKEN {token}"}
        airport_1 = AirportFactory()
        airport_2 = AirportFactory()
        route_1 = RouteFactory(
            origin_airport=airport_1.id, destination_airport=airport_2.id
        )
        OrderFactory(order_route=route_1.id, order_user=user.id)
        OrderFactory(order_route=route_1.id, order_user=user.id)
        response = self.client.get("/orders", headers=headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json), 2)
        orders = OrdersModel.query.all()
        self.assertEqual(len(orders), 2)

    def test_get_order_by_pk(self):
        user = UserFactory(is_staff=False)
        token = generate_token(user)
        headers = {"Authorization": f"TOKEN {token}"}
        airport_1 = AirportFactory()
        airport_2 = AirportFactory()
        route_1 = RouteFactory(
            origin_airport=airport_1.id, destination_airport=airport_2.id
        )
        order_1 = OrderFactory(order_route=route_1.id, order_user=user.id)
        response = self.client.get(f"/orders/{order_1.id}/", headers=headers)
        self.assertEqual(response.json["weight"], order_1.weight)

    def test_update_order(self):
        user = UserFactory(is_staff=False)
        token = generate_token(user)
        headers = {"Authorization": f"TOKEN {token}"}
        airport_1 = AirportFactory()
        airport_2 = AirportFactory()
        route_1 = RouteFactory(
            origin_airport=airport_1.id, destination_airport=airport_2.id
        )
        order_1 = OrderFactory(order_route=route_1.id, order_user=user.id)
        data = self.correct_order_data.copy()
        data["order_route"] = route_1.id
        data["order_user"] = user.id
        response = self.client.put(f"/orders/{order_1.id}/", headers=headers, json=data)
        self.assertEqual(response.json["weight"], self.correct_order_data["weight"])

    def test_delete_order(self):
        user = UserFactory(is_staff=True)
        token = generate_token(user)
        headers = {"Authorization": f"TOKEN {token}"}
        airport_1 = AirportFactory()
        airport_2 = AirportFactory()
        route_1 = RouteFactory(
            origin_airport=airport_1.id, destination_airport=airport_2.id
        )
        order_1 = OrderFactory(order_route=route_1.id, order_user=user.id)
        orders = OrdersModel.query.all()
        self.assertEqual(len(orders), 1)
        self.client.delete(f"/orders/{order_1.id}/", headers=headers)
        orders = OrdersModel.query.all()
        self.assertEqual(len(orders), 0)
