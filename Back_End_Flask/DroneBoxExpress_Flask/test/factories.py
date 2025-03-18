import random

import factory
from werkzeug.security import generate_password_hash

from DataBase import db
from models.AirportModel import AirportModel
from models.NewsArticleModel import NewsArticleModel
from models.OrdersModel import OrdersModel
from models.RoutesModel import RoutesModel
from models.UserModel import UserModel
from models.enums import OrderStatus


class BaseFactory(factory.Factory):
    @classmethod
    def create(cls, **kwargs):
        current_object = super().create(**kwargs)
        if hasattr(current_object, "password:"):
            clean_pass = current_object.password
            current_object.password = generate_password_hash(
                clean_pass, method="pbkdf2:sha256"
            )
        db.session.add(current_object)
        db.session.flush()
        return current_object


class UserFactory(BaseFactory):
    class Meta:
        model = UserModel

    username = factory.Sequence(lambda n: "valid_username_%d" % n)
    email = factory.LazyAttribute(lambda o: "%s@abv.bg" % o.username)
    password = factory.Faker("password")
    first_name = factory.Faker("first_name")
    last_name = factory.Faker("last_name")
    is_staff = False


class AirportFactory(BaseFactory):
    class Meta:
        model = AirportModel

    airport_name = factory.Sequence(lambda n: "Airport %d" % n)
    longitude = factory.Sequence(lambda n: random.randint(1, 300))
    latitude = factory.Sequence(lambda n: random.randint(1, 300))


class RouteFactory(BaseFactory):
    class Meta:
        model = RoutesModel

    cost_per_kg = factory.Sequence(lambda n: random.randint(1, 300))
    origin_airport = factory.SubFactory(AirportFactory)
    destination_airport = factory.SubFactory(AirportFactory)


class OrderFactory(BaseFactory):
    class Meta:
        model = OrdersModel

    weight = factory.Sequence(lambda n: random.randint(1, 300))
    cost = factory.Sequence(lambda n: random.randint(1, 300))
    order_status = OrderStatus.Scheduled
    order_route = factory.SubFactory(RouteFactory)
    order_user = factory.SubFactory(UserFactory)


class NewsArticlesFactory(BaseFactory):
    class Meta:
        model = NewsArticleModel

    article_title = factory.Sequence(lambda n: "Title %d" % n)
    article_content = factory.Sequence(lambda n: "Content %d" % n)
    created_date = factory.Faker("date_time")
    updated_date = factory.Faker("date_time")
    article_user = factory.SubFactory(UserFactory)
