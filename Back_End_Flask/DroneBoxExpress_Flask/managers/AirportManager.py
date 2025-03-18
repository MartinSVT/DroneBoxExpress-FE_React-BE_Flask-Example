from werkzeug.exceptions import BadRequest, NotFound, Unauthorized

from DataBase import db
from models.AirportModel import AirportModel


class AirportManager:
    @staticmethod
    def create_airport(data):
        airport = AirportModel(**data)
        try:
            db.session.add(airport)
            db.session.flush()
            return airport
        except Exception as ex:
            raise BadRequest(str(ex))

    @staticmethod
    def list_airports():
        airports = db.session.execute(db.select(AirportModel)).scalars()
        if airports:
            return airports
        else:
            raise NotFound("Resource Does Not Exist")

    @staticmethod
    def get_airport_details(id_):
        current_airport = db.session.execute(
            db.select(AirportModel).filter_by(id=id_)
        ).scalar()
        if current_airport:
            return current_airport
        else:
            raise NotFound("Resource Does Not Exist")

    @staticmethod
    def update_airport(data, id_):
        current_airport = AirportManager.get_airport_details(id_)
        if data["airport_name"] != current_airport.airport_name:
            if AirportModel.query.filter(
                AirportModel.airport_name == data["airport_name"]
            ).first():
                raise Unauthorized("That airport name is taken")
            else:
                current_airport.airport_name = data["airport_name"]
        if data["longitude"] != current_airport.longitude:
            current_airport.longitude = data["longitude"]
        if data["latitude"] != current_airport.latitude:
            current_airport.latitude = data["latitude"]
        db.session.add(current_airport)
        db.session.flush()
        return current_airport

    @staticmethod
    def delete_airport(id_):
        AirportManager.get_airport_details(id_)
        db.session.execute(db.delete(AirportModel).filter_by(id=id_))
