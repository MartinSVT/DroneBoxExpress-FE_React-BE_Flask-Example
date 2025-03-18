from datetime import datetime

from sqlalchemy import func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from DataBase import db
from models import UserModel


class NewsArticleModel(db.Model):
    __tablename__ = "News"
    id: Mapped[int] = mapped_column(primary_key=True)
    article_title: Mapped[str] = mapped_column(db.String(30), nullable=False)
    article_content: Mapped[str] = mapped_column(db.Text, nullable=False)
    created_date: Mapped[datetime] = mapped_column(
        db.DateTime, server_default=func.now()
    )
    updated_date = db.Column(db.DateTime, onupdate=func.now())
    article_user: Mapped[int] = mapped_column(
        db.Integer, db.ForeignKey("users.id", ondelete="CASCADE")
    )

    user: Mapped["UserModel"] = relationship(
        "UserModel", back_populates="news_articles"
    )
