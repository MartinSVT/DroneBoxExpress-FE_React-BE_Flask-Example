from models.NewsArticleModel import NewsArticleModel
from test.base import BaseTestCase, generate_token
from test.factories import UserFactory, NewsArticlesFactory


class TestNews(BaseTestCase):
    correct_article_data = {
        "article_title": "Title Example 1",
        "article_content": "Content Example 1",
        "article_user": 0,
    }

    def test_news_creation(self):
        user = UserFactory(is_staff=True)
        token = generate_token(user)
        headers = {"Authorization": f"TOKEN {token}"}
        data = self.correct_article_data.copy()
        data["article_user"] = user.id
        response = self.client.post("/add-news", headers=headers, json=data)
        self.assertEqual(response.status_code, 201)
        news = NewsArticleModel.query.all()
        self.assertEqual(len(news), 1)

    def test_news_creation_with_wrong_user_id(self):
        user = UserFactory(is_staff=True)
        token = generate_token(user)
        headers = {"Authorization": f"TOKEN {token}"}
        data = self.correct_article_data.copy()
        data["article_user"] = 6
        response = self.client.post("/add-news", headers=headers, json=data)
        self.assertEqual(response.status_code, 400)
        expected_msg = (
            "Invalid fields {'article_user': ['Logged in User is different than the intended owner of the News "
            "Article']}"
        )
        self.assertEqual(response.json["message"], expected_msg)
        news = NewsArticleModel.query.all()
        self.assertEqual(len(news), 0)

    def test_list_news(self):
        user = UserFactory(is_staff=False)
        token = generate_token(user)
        headers = {"Authorization": f"TOKEN {token}"}
        NewsArticlesFactory(article_user=user.id)
        NewsArticlesFactory(article_user=user.id)
        response = self.client.get("/news", headers=headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json), 2)
        news = NewsArticleModel.query.all()
        self.assertEqual(len(news), 2)

    def test_get_news_article_by_pk(self):
        user = UserFactory(is_staff=True)
        token = generate_token(user)
        headers = {"Authorization": f"TOKEN {token}"}
        news_article = NewsArticlesFactory(article_user=user.id)
        response = self.client.get(f"/news/{news_article.id}/", headers=headers)
        self.assertEqual(response.json["article_title"], news_article.article_title)

    def test_update_news_article(self):
        user = UserFactory(is_staff=True)
        token = generate_token(user)
        headers = {"Authorization": f"TOKEN {token}"}
        news_article = NewsArticlesFactory(article_user=user.id)
        update_data = {
            "article_title": "updated title",
            "article_content": news_article.article_content,
            "article_user": user.id,
        }
        response = self.client.put(
            f"/news/{news_article.id}/", headers=headers, json=update_data
        )
        self.assertEqual(response.json["article_title"], "updated title")

    def test_delete_news_article(self):
        user = UserFactory(is_staff=True)
        token = generate_token(user)
        headers = {"Authorization": f"TOKEN {token}"}
        news_article = NewsArticlesFactory(article_user=user.id)
        news = NewsArticleModel.query.all()
        self.assertEqual(len(news), 1)
        self.client.delete(f"/news/{news_article.id}/", headers=headers)
        news = NewsArticleModel.query.all()
        self.assertEqual(len(news), 0)
