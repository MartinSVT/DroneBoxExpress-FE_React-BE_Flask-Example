import mailtrap
from werkzeug.exceptions import BadRequest


def mock_email(data):
    if isinstance(data, mailtrap.mail.mail.Mail):
        return True
    else:
        raise BadRequest("error with mailtrap")
