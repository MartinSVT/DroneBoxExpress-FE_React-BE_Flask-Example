from werkzeug.exceptions import BadRequest, NotFound

from DataBase import db
from models.RoutesModel import RoutesModel


class RoutesManager:
    @staticmethod
    def create_route(data):
        route = RoutesModel(**data)
        try:
            db.session.add(route)
            db.session.flush()
            return route
        except Exception as ex:
            raise BadRequest(str(ex))

    @staticmethod
    def list_routes():
        routes = db.session.execute(db.select(RoutesModel)).scalars()
        if routes:
            return routes
        else:
            raise NotFound("There Are No Available Routes")

    @staticmethod
    def get_route_details(id_):
        current_route = db.session.execute(
            db.select(RoutesModel).filter_by(id=id_)
        ).scalar()
        if current_route:
            return current_route
        else:
            raise NotFound("Route Resource Does Not Exist")

    @staticmethod
    def update_route(data, id_):
        current_route = RoutesManager.get_route_details(id_)
        if data["cost_per_kg"] != current_route.cost_per_kg:
            current_route.cost_per_kg = data["cost_per_kg"]
        if data["origin_airport"] != current_route.origin_airport:
            current_route.origin_airport = data["origin_airport"]
        if data["destination_airport"] != current_route.destination_airport:
            current_route.destination_airport = data["destination_airport"]
        db.session.add(current_route)
        db.session.flush()
        return current_route

    @staticmethod
    def delete_route(id_):
        RoutesManager.get_route_details(id_)
        db.session.execute(db.delete(RoutesModel).filter_by(id=id_))
