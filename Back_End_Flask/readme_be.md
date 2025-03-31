REST API ENDPOINTS  
-------------------------------------------------------------------------------------------------------------------  
Description of User/Staff Functionality  
-------------------------------------------------------------------------------------------------------------------  
User Login  
POST -> http://127.0.0.1:5000/login  
request  
{  
$\hspace{1cm}$ "username": "exampleUser",  
$\hspace{1cm}$ "password": "12345567bg"  
}  
response  
{  
$\hspace{1cm}$ "token": "sadasd64d4f437asdsad051e42de#@$b84eb7asdsada@&^21353154d315350sad##$@#81aasdsadsad99eec"  
}  
  
User Register  
POST -> http://127.0.0.1:5000/register-user  
request  
{  
$\hspace{1cm}$ "username": "exampleUser",  
$\hspace{1cm}$ "email": "exampleUser@abv.bg",  
$\hspace{1cm}$ "password": "12345567bg",  
$\hspace{1cm}$ "password2": "12345567bg",  
$\hspace{1cm}$ "first_name": "exampleName",  
$\hspace{1cm}$ "last_name": "exampleLastName"  
}  
response  
{  
$\hspace{1cm}$ "username": "exampleUser",  
$\hspace{1cm}$ "email": "exampleUser@abv.bg",  
$\hspace{1cm}$ "first_name": "exampleName",  
$\hspace{1cm}$ "last_name": "exampleLastName"  
}  
  
Staff Register  
POST -> http://127.0.0.1:5000/register-staff  
Header  
{  
$\hspace{1cm}$ Authorization: TOKEN sadasd64d4f437asdsad051e42de#@$b84eb7asdsada@&^21353154d315350sad##$@#81aasdsadsad99eec  
}  
request  
{  
$\hspace{1cm}$ "username": "exampleUser",  
$\hspace{1cm}$ "email": "exampleUser@abv.bg",  
$\hspace{1cm}$ "password": "12345567bg",  
$\hspace{1cm}$ "password2": "12345567bg",  
$\hspace{1cm}$ "first_name": "exampleName",  
$\hspace{1cm}$ "last_name": "exampleLastName",  
$\hspace{1cm}$ "is_staff": true  
}  
response  
{  
$\hspace{1cm}$ "username": "exampleUser",  
$\hspace{1cm}$ "email": "exampleUser@abv.bg",  
$\hspace{1cm}$ "first_name": "exampleName",  
$\hspace{1cm}$ "last_name": "exampleLastName"  
}  
  
User Update  
PUT http://127.0.0.1:5000/user-update/<int>id/  
Header  
{  
$\hspace{1cm}$ Authorization: TOKEN sadasd64d4f437asdsad051e42de#@$b84eb7asdsada@&^21353154d315350sad##$@#81aasdsadsad99eec  
}  
request  
{  
$\hspace{1cm}$ "username": "exampleUser",  
$\hspace{1cm}$ "email": "exampleUser@abv.bg",  
$\hspace{1cm}$ "first_name": "exampleName",  
$\hspace{1cm}$ "last_name": "exampleLastName"  
}  
response  
{  
$\hspace{1cm}$ "id": 1,  
$\hspace{1cm}$ "username": "exampleUser",  
$\hspace{1cm}$ "email": "exampleUser@abv.bg",  
$\hspace{1cm}$ "first_name": "exampleName",  
$\hspace{1cm}$ "last_name": "exampleLastName"  
}  
  
User Details  
GET http://127.0.0.1:5000/user-details  
Header  
{  
$\hspace{1cm}$ Authorization: TOKEN sadasd64d4f437asdsad051e42de#@$b84eb7asdsada@&^21353154d315350sad##$@#81aasdsadsad99eec  
}  
response  
{  
$\hspace{1cm}$ "id": 1,  
$\hspace{1cm}$ "username": "exampleUser",  
$\hspace{1cm}$ "email": "exampleUser@abv.bg",  
$\hspace{1cm}$ "first_name": "exampleName",  
$\hspace{1cm}$ "last_name": "exampleLastName",  
$\hspace{1cm}$ "is_staff": false  
}  
  
Change Password  
POST http://127.0.0.1:5000/user-change-password  
Header  
{  
$\hspace{1cm}$ Authorization: TOKEN sadasd64d4f437asdsad051e42de#@$b84eb7asdsada@&^21353154d315350sad##$@#81aasdsadsad99eec  
}  
request  
{  
$\hspace{1cm}$ "old_password": "12345567bg",  
$\hspace{1cm}$ "new_password1": "new12345567bg",  
$\hspace{1cm}$ "new_password2": "new12345567bg"  
}  
  
User Delete  
DELETE http://127.0.0.1:5000/user-delete/<int>id/  
Header  
{  
$\hspace{1cm}$ Authorization: TOKEN sadasd64d4f437asdsad051e42de#@$b84eb7asdsada@&^21353154d315350sad##$@#81aasdsadsad99eec  
}  
  
Description of News Article Functionality  
-------------------------------------------------------------------------------------------------------------------  
List All News Articles  
GET http://127.0.0.1:5000/news  
response  
[  
$\hspace{1cm}$ {  
$\hspace{2cm}$ "id": 1,  
$\hspace{2cm}$ "article_title": "News1",  
$\hspace{2cm}$ "article_content": "Description1,  
$\hspace{2cm}$ "created_date": "2024-11-04",  
$\hspace{2cm}$ "updated_date": "2024-11-04",  
$\hspace{2cm}$ "article_user": 2  
$\hspace{1cm}$ },  
$\hspace{1cm}$ {  
$\hspace{2cm}$ "id": 2,  
$\hspace{2cm}$ "article_title": "News2",  
$\hspace{2cm}$ "article_content": "Description2",  
$\hspace{2cm}$ "created_date": "2024-11-04",  
$\hspace{2cm}$ "updated_date": "2024-11-04",  
$\hspace{2cm}$ "article_user": 3  
$\hspace{1cm}$ }  
]  
  
Create News Article  
POST http://127.0.0.1:5000/add-news  
Header  
{  
$\hspace{1cm}$ Authorization: TOKEN sadasd64d4f437asdsad051e42de#@$b84eb7asdsada@&^21353154d315350sad##$@#81aasdsadsad99eec  
}  
is_staff = True  
request  
{  
$\hspace{1cm}$ "article_title": "Test1",  
$\hspace{1cm}$ "article_content": "Test Content 1",  
$\hspace{1cm}$ "article_user": 2  
}  
response  
{  
$\hspace{1cm}$ "id": 1,  
$\hspace{1cm}$ "article_title": "Test1",  
$\hspace{1cm}$ "article_content": "Test Content 1",  
$\hspace{1cm}$ "created_date": "2024-11-04",  
$\hspace{1cm}$ "updated_date": "2024-11-04",  
$\hspace{1cm}$ "article_user": 2  
}  
  
Get Individual News Article  
GET http://127.0.0.1:5000/news/1/  
Header  
{  
$\hspace{1cm}$ Authorization: TOKEN sadasd64d4f437asdsad051e42de#@$b84eb7asdsada@&^21353154d315350sad##$@#81aasdsadsad99eec  
}  
is_staff = True  
response  
{  
$\hspace{1cm}$ "id": 1,  
$\hspace{1cm}$ "article_title": "Test1",  
$\hspace{1cm}$ "article_content": "Test Content 1",  
$\hspace{1cm}$ "created_date": "2024-11-04",  
$\hspace{1cm}$ "updated_date": "2024-11-04",  
$\hspace{1cm}$ "article_user": 2  
}  
  
Update News Article  
PUT http://127.0.0.1:5000/news/1/  
Header  
{  
$\hspace{1cm}$ Authorization: TOKEN sadasd64d4f437asdsad051e42de#@$b84eb7asdsada@&^21353154d315350sad##$@#81aasdsadsad99eec  
}  
is_staff = True  
request  
{  
$\hspace{1cm}$ "article_title": "Test1Changed",  
$\hspace{1cm}$ "article_content": "Test Content 1",  
$\hspace{1cm}$ "article_user": 2  
}  
response  
{  
$\hspace{1cm}$ "id": 1,  
$\hspace{1cm}$ "article_title": "Test1Changed",  
$\hspace{1cm}$ "article_content": "Test Content 1",  
$\hspace{1cm}$ "created_date": "2024-11-04",  
$\hspace{1cm}$ "updated_date": "2024-11-04",  
$\hspace{1cm}$ "article_user": 2  
}  
  
Delete News Article  
DELETE http://127.0.0.1:5000/news/1/  
Header  
{  
$\hspace{1cm}$ Authorization: TOKEN sadasd64d4f437asdsad051e42de#@$b84eb7asdsada@&^21353154d315350sad##$@#81aasdsadsad99eec  
}  
is_staff = True  
  
Description of Airports Functionality  
-------------------------------------------------------------------------------------------------------------------  
List Airports  
GET http://127.0.0.1:5000/airports  
Header  
{  
$\hspace{1cm}$ Authorization: TOKEN sadasd64d4f437asdsad051e42de#@$b84eb7asdsada@&^21353154d315350sad##$@#81aasdsadsad99eec  
}  
is_staff = False  
response  
[  
$\hspace{1cm}$ {  
$\hspace{2cm}$ "id": 1,  
$\hspace{2cm}$ "airport_name": "Sofia Airport",  
$\hspace{2cm}$ "longitude": 123.0,  
$\hspace{2cm}$ "latitude": 11.0  
$\hspace{1cm}$ },  
$\hspace{1cm}$ {  
$\hspace{2cm}$ "id": 2,  
$\hspace{2cm}$ "airport_name": "London Airport",  
$\hspace{2cm}$ "longitude": 1.0,  
$\hspace{2cm}$ "latitude": 23.0  
$\hspace{1cm}$ }  
]  
  
Create Airport  
POST http://127.0.0.1:5000/airports  
Header  
{  
$\hspace{1cm}$ Authorization: TOKEN sadasd64d4f437asdsad051e42de#@$b84eb7asdsada@&^21353154d315350sad##$@#81aasdsadsad99eec  
}  
is_staff = True  
request  
{  
$\hspace{1cm}$ "airport_name": "test1",  
$\hspace{1cm}$ "longitude": 6,  
$\hspace{1cm}$ "latitude": 3  
}  
response  
{  
$\hspace{1cm}$ "id": 3,  
$\hspace{1cm}$ "airport_name": "test1",  
$\hspace{1cm}$ "longitude": 6,  
$\hspace{1cm}$ "latitude": 3  
}  
  
Get Individual Airport  
GET http://127.0.0.1:5000/airports/id/  
Header  
{  
$\hspace{1cm}$ Authorization: TOKEN sadasd64d4f437asdsad051e42de#@$b84eb7asdsada@&^21353154d315350sad##$@#81aasdsadsad99eec  
}  
is_staff = False  
response  
{  
$\hspace{1cm}$ "id": 1,  
$\hspace{1cm}$ "airport_name": "Sofia Airport",  
$\hspace{1cm}$ "longitude": 123.0,  
$\hspace{1cm}$ "latitude": 11.0  
}  
  
Update Individual Airport  
PUT http://127.0.0.1:5000/airports/id/  
Header  
{  
$\hspace{1cm}$ Authorization: TOKEN sadasd64d4f437asdsad051e42de#@$b84eb7asdsada@&^21353154d315350sad##$@#81aasdsadsad99eec  
}  
is_staff = True  
request  
{  
$\hspace{1cm}$ "airport_name": "Sofia Airport Changed",  
$\hspace{1cm}$ "longitude": 1.0,  
$\hspace{1cm}$ "latitude": 7.0 
}  
response  
{  
$\hspace{1cm}$ "id": 1,  
$\hspace{1cm}$ "airport_name": "Sofia Airport Changed",  
$\hspace{1cm}$ "longitude": 1.0,  
$\hspace{1cm}$ "latitude": 7.0  
}  
  
Delete Individual Airport  
DELETE http://127.0.0.1:5000/airports/id/  
Header  
{  
$\hspace{1cm}$ Authorization: TOKEN sadasd64d4f437asdsad051e42de#@$b84eb7asdsada@&^21353154d315350sad##$@#81aasdsadsad99eec  
}  
is_staff = True  
  
Description of Routes Functionality  
-------------------------------------------------------------------------------------------------------------------  
List Routes  
GET http://127.0.0.1:5000/routes  
Header  
{  
$\hspace{1cm}$ Authorization: TOKEN sadasd64d4f437asdsad051e42de#@$b84eb7asdsada@&^21353154d315350sad##$@#81aasdsadsad99eec  
}  
is_staff = False  
response  
[  
$\hspace{1cm}$ {  
$\hspace{2cm}$ "id": 1,  
$\hspace{2cm}$ "cost_per_kg": 2.0,  
$\hspace{2cm}$ "origin_airport": 1,  
$\hspace{2cm}$ "destination_airport": 2  
$\hspace{1cm}$ },  
$\hspace{1cm}$ {  
$\hspace{2cm}$ "id": 2,  
$\hspace{2cm}$ "cost_per_kg": 1.0,  
$\hspace{2cm}$ "origin_airport": 2,  
$\hspace{2cm}$ "destination_airport": 1  
$\hspace{1cm}$ }  
]  
  
Create Route  
POST http://127.0.0.1:5000/routes  
Header  
{  
$\hspace{1cm}$ Authorization: TOKEN sadasd64d4f437asdsad051e42de#@$b84eb7asdsada@&^21353154d315350sad##$@#81aasdsadsad99eec  
}  
is_staff = True  
request  
{  
$\hspace{1cm}$ "cost_per_kg": 5.2,  
$\hspace{1cm}$ "origin_airport": 3,  
$\hspace{1cm}$ "destination_airport": 1  
}  
response  
{  
$\hspace{1cm}$ "id": 2,  
$\hspace{1cm}$ "cost_per_kg": 5.2,  
$\hspace{1cm}$ "origin_airport": 3,  
$\hspace{1cm}$ "destination_airport": 1  
}  
  
Get Individual Route  
GET http://127.0.0.1:5000/routes/id/  
Header  
{  
$\hspace{1cm}$ Authorization: TOKEN sadasd64d4f437asdsad051e42de#@$b84eb7asdsada@&^21353154d315350sad##$@#81aasdsadsad99eec  
}  
is_staff = False  
response  
{  
$\hspace{1cm}$ "id": 3,  
$\hspace{1cm}$ "cost_per_kg": 2.0,  
$\hspace{1cm}$ "origin_airport": 6,  
$\hspace{1cm}$ "destination_airport": 2  
}  
  
Update Individual Route  
PUT http://127.0.0.1:5000/routes/id/  
Header  
{  
$\hspace{1cm}$ Authorization: TOKEN sadasd64d4f437asdsad051e42de#@$b84eb7asdsada@&^21353154d315350sad##$@#81aasdsadsad99eec  
}  
is_staff = True  
request  
{  
$\hspace{1cm}$ "cost_per_kg": 7.5,  
$\hspace{1cm}$ "origin_airport": 3,  
$\hspace{1cm}$ "destination_airport": 2  
}  
response  
{  
$\hspace{1cm}$ "id": 3,  
$\hspace{1cm}$ "cost_per_kg": 7.5,  
$\hspace{1cm}$ "origin_airport": 3,  
$\hspace{1cm}$ "destination_airport": 2  
}  
  
Delete Individual Route  
DELETE http://127.0.0.1:5000/routes/id/  
Header  
{  
$\hspace{1cm}$ Authorization: TOKEN sadasd64d4f437asdsad051e42de#@$b84eb7asdsada@&^21353154d315350sad##$@#81aasdsadsad99eec  
}  
is_staff = True  
  
Description of Orders Functionality  
-------------------------------------------------------------------------------------------------------------------  
List All Orders for a User  
GET http://127.0.0.1:5000/orders  
Header  
{  
$\hspace{1cm}$ Authorization: TOKEN sadasd64d4f437asdsad051e42de#@$b84eb7asdsada@&^21353154d315350sad##$@#81aasdsadsad99eec  
}  
is_staff = False  
user_id = 2  
response  
[  
$\hspace{1cm}$ {  
$\hspace{2cm}$ "id": 1,  
$\hspace{2cm}$ "weight": 23.0,  
$\hspace{2cm}$ "cost": 123.0,  
$\hspace{2cm}$ "order_status": "Scheduled",  
$\hspace{2cm}$ "order_route": 1,  
$\hspace{2cm}$ "order_user": 2  
$\hspace{1cm}$ },  
$\hspace{1cm}$ {  
$\hspace{2cm}$ "id": 2,  
$\hspace{2cm}$ "weight": 3.0,  
$\hspace{2cm}$ "cost": 32.0,  
$\hspace{2cm}$ "order_status": "Completed",  
$\hspace{2cm}$ "order_route": 2,  
$\hspace{2cm}$ "order_user": 2  
$\hspace{1cm}$ }  
]  
  
List All Orders for a Staff Member  
GET http://127.0.0.1:5000/orders  
Header  
{  
$\hspace{1cm}$ Authorization: TOKEN sadasd64d4f437asdsad051e42de#@$b84eb7asdsada@&^21353154d315350sad##$@#81aasdsadsad99eec  
}  
is_staff = True  
user_id = 1  
response  
[  
$\hspace{1cm}$ {  
$\hspace{2cm}$ "id": 1,  
$\hspace{2cm}$ "weight": 23.0,  
$\hspace{2cm}$ "cost": 123.0,  
$\hspace{2cm}$ "order_status": "Scheduled",  
$\hspace{2cm}$ "order_route": 1,  
$\hspace{2cm}$ "order_user": 2  
$\hspace{1cm}$ },  
$\hspace{1cm}$ {  
$\hspace{2cm}$ "id": 2,  
$\hspace{2cm}$ "weight": 3.0,  
$\hspace{2cm}$ "cost": 32.0,  
$\hspace{2cm}$ "order_status": "Completed",  
$\hspace{2cm}$ "order_route": 2,  
$\hspace{2cm}$ "order_user": 2  
$\hspace{1cm}$ },  
$\hspace{1cm}$ {  
$\hspace{2cm}$ "id": 3,  
$\hspace{2cm}$ "weight": 5.0,  
$\hspace{2cm}$ "cost": 12.52,  
$\hspace{2cm}$ "order_status": "Scheduled",  
$\hspace{2cm}$ "order_route": 1,  
$\hspace{2cm}$ "order_user": 3  
$\hspace{1cm}$ }  
]  
  
Create Order  
POST http://127.0.0.1:5000/orders  
Header  
{  
$\hspace{1cm}$ Authorization: TOKEN sadasd64d4f437asdsad051e42de#@$b84eb7asdsada@&^21353154d315350sad##$@#81aasdsadsad99eec  
}  
is_staff = False  
user_id = 3  
request  
{  
$\hspace{1cm}$ "weight": 5,  
$\hspace{1cm}$ "cost": 10,  
$\hspace{1cm}$ "order_route": 1,  
$\hspace{1cm}$ "order_user": 3  
}  
response  
{  
$\hspace{1cm}$ "id": 4,  
$\hspace{1cm}$ "weight": 5.0,  
$\hspace{1cm}$ "cost": 10.0,  
$\hspace{1cm}$ "order_status": "Scheduled",  
$\hspace{1cm}$ "order_route": 1,  
$\hspace{1cm}$ "order_user": 3  
}  
  
Details Individual Order User  
GET http://127.0.0.1:5000/orders/id/  
Header  
{  
$\hspace{1cm}$ Authorization: TOKEN sadasd64d4f437asdsad051e42de#@$b84eb7asdsada@&^21353154d315350sad##$@#81aasdsadsad99eec  
}  
is_staff = False  
user_id = 3  
response  
{  
$\hspace{1cm}$ "id": 4,  
$\hspace{1cm}$ "weight": 5.0,  
$\hspace{1cm}$ "cost": 10.0,  
$\hspace{1cm}$ "order_status": "Scheduled",  
$\hspace{1cm}$ "order_route": 1,  
$\hspace{1cm}$ "order_user": 3  
}  
  
Details Individual Order Staff Member  
GET http://127.0.0.1:5000/orders/id/  
Header  
{  
$\hspace{1cm}$ Authorization: TOKEN sadasd64d4f437asdsad051e42de#@$b84eb7asdsada@&^21353154d315350sad##$@#81aasdsadsad99eec  
}  
is_staff = True  
user_id = 1  
response  
{  
$\hspace{1cm}$ "id": 2,  
$\hspace{1cm}$ "weight": 3.0,  
$\hspace{1cm}$ "cost": 32.0,  
$\hspace{1cm}$ "order_status": "Completed",  
$\hspace{1cm}$ "order_route": 2,  
$\hspace{1cm}$ "order_user": 2  
}  
  
Update Individual Order  
PUT http://127.0.0.1:5000/orders/id/  
Header  
{  
$\hspace{1cm}$ Authorization: TOKEN sadasd64d4f437asdsad051e42de#@$b84eb7asdsada@&^21353154d315350sad##$@#81aasdsadsad99eec  
}  
is_staff = False (if is_staff=True then it can update any Order)  
user_id = 3  (Can Update Only Its Own Order)  
request  
{  
$\hspace{1cm}$ "weight": 50  
$\hspace{1cm}$ "cost": 100,  
$\hspace{1cm}$ "order_route": 1,  
$\hspace{1cm}$ "order_user": 3  
}  
response  
{  
$\hspace{1cm}$ "id": 4,  
$\hspace{1cm}$ "weight": 50.0,  
$\hspace{1cm}$ "cost": 100.0,  
$\hspace{1cm}$ "order_status": "Scheduled",  
$\hspace{1cm}$ "order_route": 1,  
$\hspace{1cm}$ "order_user": 3  
}  
  
Delete Individual Order  
Header  
{  
$\hspace{1cm}$ Authorization: TOKEN sadasd64d4f437asdsad051e42de#@$b84eb7asdsada@&^21353154d315350sad##$@#81aasdsadsad99eec  
}  
is_staff = False (if is_staff=True then it can delete any Order)  
user_id = 3 (Can Delete Only Its Own Order)  
  
