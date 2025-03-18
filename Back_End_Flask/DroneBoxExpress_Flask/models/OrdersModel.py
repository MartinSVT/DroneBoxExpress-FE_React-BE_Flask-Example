from sqlalchemy.orm import Mapped, mapped_column, relationship

from DataBase import db
from models import UserModel, RoutesModel
from models.enums import OrderStatus


class OrdersModel(db.Model):
    __tablename__ = "Orders"
    id: Mapped[int] = mapped_column(primary_key=True)
    weight: Mapped[float] = mapped_column(db.Float, nullable=False)
    cost: Mapped[float] = mapped_column(db.Float, nullable=False)
    order_status: Mapped[OrderStatus] = mapped_column(
        db.Enum(OrderStatus), default=OrderStatus.Scheduled, nullable=False
    )
    order_route: Mapped[int] = mapped_column(
        db.Integer, db.ForeignKey("Routes.id", ondelete="CASCADE")
    )
    order_user: Mapped[int] = mapped_column(
        db.Integer, db.ForeignKey("users.id", ondelete="CASCADE")
    )

    o_user: Mapped["UserModel"] = relationship(
        "UserModel", foreign_keys=[order_user], back_populates="user_orders"
    )

    o_route: Mapped["RoutesModel"] = relationship(
        "RoutesModel", foreign_keys=[order_route], back_populates="route_orders"
    )
