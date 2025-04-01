import mailtrap as mt
from werkzeug.exceptions import BadRequest, NotFound, Unauthorized

from DataBase import db
from ThirdPartyServices.mailtrap import client
from managers.auth import auth
from models.OrdersModel import OrdersModel
from models.enums import OrderStatus


class OrdersManager:
    @staticmethod
    def create_order(data):
        new_order = OrdersModel(**data)
        try:
            db.session.add(new_order)
            db.session.flush()
            print(new_order)
            # email_address to be replaced with user.email at production
            # order_mail = mt.Mail(
            #     sender=mt.Address(
            #         email="droneboxexpress@demomailtrap.com", name="DroneBoxExpress Team"
            #     ),
            #     to=[mt.Address(email="martin1987bg@gmail.com")],
            #     subject=f"Order Confirmation {new_order.id}",
            #     text=f"We Have Received Your Order with ID: {new_order.id}",
            # )
            #
            # client.send(order_mail)
            return new_order
        except Exception as ex:
            raise BadRequest(str(ex))

    @staticmethod
    def list_orders_staff():
        all_orders = db.session.execute(db.select(OrdersModel)).scalars()
        if all_orders:
            return all_orders
        else:
            raise NotFound("Orders Resources Do Not Exist")

    @staticmethod
    def list_orders_user(user_id):
        user_orders = db.session.execute(
            db.select(OrdersModel).filter_by(order_user=user_id)
        ).scalars()
        if user_orders:
            return user_orders
        else:
            raise NotFound("Current User Does Not Have Orders")

    @staticmethod
    def get_order_details(id_):
        current_order = db.session.execute(
            db.select(OrdersModel).filter_by(id=id_)
        ).scalar()
        user = auth.current_user()
        if current_order:
            if user.is_staff:
                return current_order
            else:
                if user.id == current_order.order_user:
                    return current_order
                else:
                    raise Unauthorized("Not Authorized")
        else:
            raise NotFound("Resource Does Not Exist")

    @staticmethod
    def update_order(data, id_):
        current_order = OrdersManager.get_order_details(id_)
        if data["weight"] != current_order.weight:
            current_order.weight = data["weight"]
        if data["cost"] != current_order.cost:
            current_order.cost = data["cost"]
        if data["order_route"] != current_order.order_route:
            current_order.order_route = data["order_route"]
        if "order_status" in data:
            if data["order_status"] == "Scheduled":
                current_order.order_status = OrderStatus.Scheduled
            elif data["order_status"] == "Completed":
                current_order.order_status = OrderStatus.Completed
        if data["order_user"] != current_order.order_user:
            current_order.order_user = data["order_user"]

        db.session.add(current_order)
        db.session.flush()
        return current_order

    @staticmethod
    def delete_order(id_):
        OrdersManager.get_order_details(id_)
        db.session.execute(db.delete(OrdersModel).filter_by(id=id_))
