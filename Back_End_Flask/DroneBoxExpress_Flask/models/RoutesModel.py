from typing import List

from sqlalchemy.orm import Mapped, mapped_column, relationship

from DataBase import db
from models import AirportModel, OrdersModel


class RoutesModel(db.Model):
    __tablename__ = "Routes"
    id: Mapped[int] = mapped_column(primary_key=True)
    origin_airport: Mapped[int] = mapped_column(
        db.Integer, db.ForeignKey("Airports.id", ondelete="CASCADE")
    )
    destination_airport: Mapped[int] = mapped_column(
        db.Integer, db.ForeignKey("Airports.id", ondelete="CASCADE")
    )
    cost_per_kg: Mapped[float] = mapped_column(db.Float, nullable=False)

    origin: Mapped["AirportModel"] = relationship(
        "AirportModel", foreign_keys=[origin_airport], back_populates="route_origin"
    )

    destination: Mapped["AirportModel"] = relationship(
        "AirportModel",
        foreign_keys=[destination_airport],
        back_populates="route_destination",
    )

    route_orders: Mapped[List["OrdersModel"]] = relationship(
        "OrdersModel",
        foreign_keys="[OrdersModel.order_route]",
        back_populates="o_route",
        cascade="all, delete",
        passive_deletes=True,
    )
