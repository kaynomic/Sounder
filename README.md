# Soundcloud Clone Project
## by Kirlbert Mendez

Inspired by Soundcloud's aesthetic and functionality.
Deployed using Heroku: <a href="https://sc-project-aa.herokuapp.com/"> Website </a>

## SetUp to use this application
* Clone the repo using git
* Rename the ".example-env" file in the backend folder to just ".env" and create a JWT_SECRET environment variable, as well as a JWT_EXPIRES_IN with a number (in seconds)
* Open 2 terminals, use "cd" to change the current directory, one terminal should be in the project's backend folder, and the other in the frontend folder
* Run "npm install" in both the backend and frontend folders
* In the backend terminal make sure to run "npx sequelize db:migrate" and "npx sequelize db:seed:all". This sets up the database.
* Run "npm start" in both terminals to start servers and a window should open in your browser ready to use the app.

## Website Layout

<img src="https://res.cloudinary.com/dqqewlghx/image/upload/v1662925605/pics/flow_for_website_yiyfwd.png">

## Home Page

<img src="https://res.cloudinary.com/dqqewlghx/image/upload/v1662925808/pics/home-page_k6go22.png">

## Current User Page (Logged In)

<img src="https://res.cloudinary.com/dqqewlghx/image/upload/v1662925906/pics/logged-in-userpage_lrvdz8.png">

## All Songs Page

<img src="https://res.cloudinary.com/dqqewlghx/image/upload/v1662926005/pics/songs-page_wdc0ud.png">

## All Albums Page

<img src="https://res.cloudinary.com/dqqewlghx/image/upload/v1662926084/pics/albumpage_zj9uqz.png">

## Current and Future Functionality

### CREATE, READ, UPDATE, DELETE
* Songs: Create a Song, View Song Details, Update a Song, Delete a Song
* Albums: Create an Album, View Album Details, Edit an Album's Details, Delete an Album
* Authentification (SignUp a User, Login/Logout of any account)
* Don't want to make an account? Use the Demo User option in the Login Page to experience the application anyways!

### Future Functionality
* Add Music Player with full functionality
* Playlists and Comments full CRUD functionality
* Bigger Database with a search function
* Quality of life improvements and more styling

## Technologies

### Backend
* JavaScript
* Express.js
* Sequelize.js and PostgreSQL
* CSRF & Bcrypt.js for security and password protection

### Frontend
* JavaScript
* React/Redux
* Cascading Style Sheets
