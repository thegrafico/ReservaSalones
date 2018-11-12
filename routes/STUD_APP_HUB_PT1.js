/*
//THIS PART HANDLES ALL THE LOGIC
//OF THE PAGE WHERE THE USER WILL SELECT THE PROFESSOR HE WANTS

//https://expressjs.com/en/guide/routing.html
var express = require ('express');  //Sets up Server
var router = express.Router();      //To use for routing and webpage purposes

//para utilizar todas las funciones relacionadas a acceso de la
//base de datos en mysql. Hace referencia la funcion en el folder "helpers"
//en my sql connection que es donde se guardo la funcion
var db = require("../helpers/mysqlConnection").mysql_pool;

//sets a variable to replace the name
//of the table being used for the query
var appointment = 'Appointment';


//this is the communication with the middleware
//that makes the software be able to connect to the DATABASE
//https://expressjs.com/en/guide/writing-middleware.html
//shows list of profesors
router.get('/',function (req,res, next){

  //once running, we set the visual layout
  //which is governed by an hbs file written in HTML
  //some parts left in commentary since the file has not been made yet

  //define a local object named parms
  //contains layout and title of this page
  let pageLay = {layout: 'STUB_APP_HUB_PT1' , title: 'Appointment'};

  // gets the user's name and email from the auth js file
  const userName = req.cookies.graph_user_name;
  const email = req.cookies.graph_user_email;

function str(){
    console.log (userName + ", You're in");
  }

    //res.render (pageLay)
var express = require ('express');  //Sets up Server
const seatingRouter = express.Router()
seatingRouter.use(function (req, res, next){
  console.log("Yaaayy");
  next()
})



})
*/
var express = require('express')
var router = express.Router()

// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

// define the home page route
//basically page response as in the layout, buttons, all html stuff, etc
router.get('/', function (req, res) {

  //saves name of the layout being used
  //the hbd file that will be presented in the webpage
  

res.send('Birds home page')
})
// // define the about route
// router.get('/about', function (req, res) {
//   res.send('About birds')
// })

module.exports = router
