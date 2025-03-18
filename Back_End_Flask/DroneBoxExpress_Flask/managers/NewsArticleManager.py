from werkzeug.exceptions import BadRequest, NotFound, Unauthorized

from DataBase import db
from managers.auth import auth
from models.NewsArticleModel import NewsArticleModel


class NewsArticleManager:
    @staticmethod
    def get_all_news():
        news = db.session.execute(db.select(NewsArticleModel)).scalars()
        if news:
            return news
        else:
            raise NotFound("Resource Does Not Exist")

    @staticmethod
    def get_single_article(id_):
        user = auth.current_user()
        current_article = db.session.execute(
            db.select(NewsArticleModel).filter_by(id=id_)
        ).scalar()
        if current_article:
            if user.id == current_article.article_user:
                return current_article
            else:
                raise Unauthorized("Not Authorized")
        else:
            raise NotFound("Resource Does Not Exist")

    @staticmethod
    def create_news_article(data):
        article = NewsArticleModel(**data)
        try:
            db.session.add(article)
            db.session.flush()
            return article
        except Exception as ex:
            raise BadRequest(str(ex))

    @staticmethod
    def update_article(data, id_):
        current_article = NewsArticleManager.get_single_article(id_)
        if data["article_user"] == current_article.article_user:
            if data["article_title"] != current_article.article_title:
                current_article.article_title = data["article_title"]
            if data["article_content"] != current_article.article_content:
                current_article.article_content = data["article_content"]
            db.session.add(current_article)
            db.session.flush()
            return current_article
        else:
            raise Unauthorized("Not Authorized")

    @staticmethod
    def delete_article(id_):
        NewsArticleManager.get_single_article(id_)
        db.session.execute(db.delete(NewsArticleModel).filter_by(id=id_))
