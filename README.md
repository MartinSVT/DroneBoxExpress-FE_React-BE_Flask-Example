# DroneBoxExpress-FE_React-BE_Flask-Example  
A repository for an example website for airplane deliveries using Flask as Back End and React as Front End  
  
The project is currently being developed and it’s not in its finished state  
  
* Back-End Status: Completed on 90%  [Complete Testing Coverage, Reformant Files and Tables Naming, Move User validation to Mangares instead of Schemas]  
    
  [Commands for Starting the Backend]  
  - Python 3.10 or latest and PostgreSQL database are required  
  - cd to the directory where requirements.txt is located  
  - activate your virtualenv  
  - run: "pip install -r requirements.txt" in your shell  
  - create .env file in the directory where requirements.txt is located  
  - setup the following environment variables in order to start the backend:  
      -->   SECRET_KEY=[type "string" requried for encrypting]  
      -->   DB_USER=[type "string"]  
      -->   DB_PASS=[type "string"]  
      -->   DB_HOST=[type "string"]  
      -->   DB_PORT=[type "string"]  
      -->   DB_NAME=[type "string"]  
      -->   MAILTRAP_API_KEY=[type "string" required for the backend email service its free upon registration with mailtrap]  
      -->   TEST_DB_NAME=[type "string"]  
      -->   CONFIG_ENV='config.DevelopmentConfig'  
  - run: "flask db upgrade" in your shell (if it does not work run: "flask db init", then "flask db migrate -m "Initial migration."" and try again)   
  - run: "flask run" in your shell (the server should start on "http://127.0.0.1:5000")  
  - Further documentation for the rest API endpoints and postman collection within the Backend folder readme_be.md  
  
* Front-End Status: Completed on 90%  [Add "Staff User" Register functionality, Add Profile Picture Functionality, Add Unit Testing]  
    
  [Commands for Starting the Frontend]  
  - cd to the directory where package.json is located [dbe-fe folder]  
  - run: "npm install"  
  - run: "npm run dev"  
    
The web project is of an imaginary company for delivering packages using drones and predetermined routes, the idea is that the web application has multiple functionalities and acts as both customer platform and staff platform. Depending on the user profile type that is currently logged in, the web application either acts as a platform to create/update airports, routes and company news articles etc.. or acts as a customer platform where order information can be viewed and individual orders can be placed, modified and deleted. The web application notifies the user for changes to his/her orders status via email. There are 2 user profile types in the application staff member and platform user. The front end is developed with React 19 while the backend is developed using Flask.  
  
User Profiles Types:  
* Staff  
* Customer  
  
These are the following sections the Web application has:  
  
* Home Section – Displaying recently added articles, news and events from the company staff, if a staff user is logged in it allows it to create new articles and modify and delete articles, he/she has created.

* Contacts and about us – Displaying company information

* Profile Section – Allows a logged user to view, edit and delete his/her profile

* Operations Section – Allows a user with a profile of "Staff" to make CRUD operation over the existing Airport and Routes.

* Orders Section – Allows a user with a profile of "Customer" to generate, modify and delete orders. If user is "Staff" this section allows further functionality to adjust price ranges, view all orders and do CRUD operations over them.
  
Database Models:
* User Model
* News Article Model
* Orders Model
* Route Model
* Airport Model
  
