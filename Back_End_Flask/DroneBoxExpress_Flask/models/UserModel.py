from datetime import datetime
from typing import List

from sqlalchemy import func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from DataBase import db
from models import NewsArticleModel
from models import OrdersModel


class UserModel(db.Model):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(db.String(255), nullable=False, unique=True)
    email: Mapped[str] = mapped_column(db.String(255), nullable=False, unique=True)
    password: Mapped[str] = mapped_column(db.String(255), nullable=False)
    first_name: Mapped[str] = mapped_column(db.String(255), nullable=True)
    last_name: Mapped[str] = mapped_column(db.String(255), nullable=True)
    is_staff: Mapped[bool] = mapped_column(unique=False, default=False)
    date_joined: Mapped[datetime] = mapped_column(
        db.DateTime(timezone=True), server_default=func.now()
    )

    news_articles: Mapped[List["NewsArticleModel"]] = relationship(
        "NewsArticleModel",
        foreign_keys="[NewsArticleModel.article_user]",
        back_populates="user",
        cascade="all, delete",
        passive_deletes=True,
    )

    user_orders: Mapped[List["OrdersModel"]] = relationship(
        "OrdersModel",
        foreign_keys="[OrdersModel.order_user]",
        back_populates="o_user",
        cascade="all, delete",
        passive_deletes=True,
    )
