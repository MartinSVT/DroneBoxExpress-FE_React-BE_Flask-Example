from decouple import config
from flask import request, Response, jsonify

from DataBase import db
from config import create_app

environment = config("CONFIG_ENV")
app = create_app(environment)


@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        res = Response()
        res.headers["X-Content-Type-Options"] = "*"
        return res


@app.teardown_request
def commit_transaction_on_teardown(exception=None):
    if exception is None:
        try:
            db.session.commit()
        except Exception:
            db.session.rollback()
            return (
                jsonify(
                    {
                        "error": "An error occurred while saving data. Please try again later."
                    }
                ),
                500,
            )
    else:
        db.session.rollback()
        return (
            jsonify(
                {
                    "error": "An unexpected error occurred. Please contact support if the issue persists."
                }
            ),
            500,
        )


@app.teardown_appcontext
def shutdown_session(response):
    db.session.remove()
    return response


if __name__ == "__main__":
    app.run()
