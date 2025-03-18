from flask import request
from flask_restful import Resource

from managers.NewsArticleManager import NewsArticleManager
from managers.auth import auth
from schemas.request.NewsArticleReqSchema import CreateNewsArticleSchema
from schemas.response.NewsArticlesResponseSchema import NewsResponseSchema
from utils.decorators import validate_schema, permission_required


class ListAllNews(Resource):
    def get(self):
        all_news_articles = NewsArticleManager.get_all_news()
        return NewsResponseSchema().dump(all_news_articles, many=True), 200


class CreateNewsArticle(Resource):
    @auth.login_required
    @permission_required()
    @validate_schema(CreateNewsArticleSchema)
    def post(self):
        data = request.get_json()
        new_news_article = NewsArticleManager.create_news_article(data)
        return NewsResponseSchema().dump(new_news_article), 201


class NewsArticleDetailsUpdateDelete(Resource):
    @auth.login_required
    @permission_required()
    def get(self, id_):
        current_news_article = NewsArticleManager.get_single_article(id_)
        return NewsResponseSchema().dump(current_news_article), 200

    @auth.login_required
    @permission_required()
    @validate_schema(CreateNewsArticleSchema)
    def put(self, id_):
        data = request.get_json()
        updated_news_article = NewsArticleManager.update_article(data, id_)
        return NewsResponseSchema().dump(updated_news_article), 201

    @auth.login_required
    @permission_required()
    def delete(self, id_):
        NewsArticleManager.delete_article(id_)
        return 204
