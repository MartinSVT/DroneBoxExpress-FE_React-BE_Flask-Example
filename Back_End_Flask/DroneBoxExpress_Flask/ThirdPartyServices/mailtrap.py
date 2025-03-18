import mailtrap as mt
from decouple import config

client = mt.MailtrapClient(token=config("MAILTRAP_API_KEY"))

# Mailtrap sandbox test

# url = "https://sandbox.api.mailtrap.io/api/send/3260526" payload = "{\"from\":{\"email\":\"hello@example.com\",
# \"name\":\"Mailtrap Test\"},\"to\":[{\"email\":\"martin1987bg@gmail.com\"}],\"subject\":\"You are awesome!\",
# \"text\":\"Congrats for sending test email with Mailtrap!\",\"category\":\"Integration Test\"}"
#
# headers = {
#   "Authorization": "Bearer 89bf0f682e6836745a353fea6858197a",
#   "Content-Type": "application/json"
# }
#
# response = requests.request("POST", url, headers=headers, data=payload)
