from resources.AirportResource import CreateListAirport, AirportDetailsUpdateDelete
from resources.NewsArticleResource import (
    ListAllNews,
    CreateNewsArticle,
    NewsArticleDetailsUpdateDelete,
)
from resources.OrdersResource import CreateListOrders, OrdersDetailsUpdateDelete
from resources.RoutesResource import CreateListRoute, RouteDetailsUpdateDelete
from resources.UserResource import (
    RegisterUser,
    Login,
    RegisterStaff,
    UserDetails,
    UserUpdate,
    DeleteUser,
    ChangePassword,
)

routes = (
    (RegisterUser, "/register-user"),
    (Login, "/login"),
    (RegisterStaff, "/register-staff"),
    (UserDetails, "/user-details"),
    (UserUpdate, "/user-update/<int:id_>/"),
    (DeleteUser, "/user-delete/<int:id_>/"),
    (ChangePassword, "/user-change-password"),
    (ListAllNews, "/news"),
    (CreateNewsArticle, "/add-news"),
    (NewsArticleDetailsUpdateDelete, "/news/<int:id_>/"),
    (CreateListAirport, "/airports"),
    (AirportDetailsUpdateDelete, "/airports/<int:id_>/"),
    (CreateListRoute, "/routes"),
    (RouteDetailsUpdateDelete, "/routes/<int:id_>/"),
    (CreateListOrders, "/orders"),
    (OrdersDetailsUpdateDelete, "/orders/<int:id_>/"),
)
