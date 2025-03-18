from typing import List

from sqlalchemy.orm import Mapped, mapped_column, relationship

from DataBase import db
from models import RoutesModel


class AirportModel(db.Model):
    __tablename__ = "Airports"
    id: Mapped[int] = mapped_column(primary_key=True)
    airport_name: Mapped[str] = mapped_column(
        db.String(50), nullable=False, unique=True
    )
    longitude: Mapped[float] = mapped_column(db.Float, nullable=False)
    latitude: Mapped[float] = mapped_column(db.Float, nullable=False)

    route_origin: Mapped[List["RoutesModel"]] = relationship(
        "RoutesModel",
        foreign_keys="[RoutesModel.origin_airport]",
        back_populates="origin",
        cascade="all, delete",
        passive_deletes=True,
    )

    route_destination: Mapped[List["RoutesModel"]] = relationship(
        "RoutesModel",
        foreign_keys="[RoutesModel.destination_airport]",
        back_populates="destination",
        cascade="all, delete",
        passive_deletes=True,
    )
