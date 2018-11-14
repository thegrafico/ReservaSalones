var express = require('express')
var router = express.Router()
//to interact with the databea and make queries
var dataB = require("../helpers/mysqlConnection").mysql_pool;

// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

// define the home page route
//basically page response as in the layout, buttons, all html stuff, etc
router.get('/', function (req, res) {

  //sets up the name of the layout to be displayed
  var layName = 'STUD_APP_HUB_PT1';
  //sets up window title
  var titleName = 'Appointment';
  //records userName again to display in the tab
  const userName = req.cookies.graph_user_name;
  //object that will be sent to the hbs fie for the variables to be displayed
  let parms = {title: titleName}

  //console.log("userName: " + userName);
//if a value exists in the username variable
if(userName){

  //defines the name of the professor table as a variable
  var professor = 'Professor';

  //sets up the different indexes to be used for
  //the result of the query array
  var name = 0;
  var email = 1;
  var description = 2;


  //defines the query i want to make
  let query = `SELECT * FROM ${professor}`;

  //establishes connection to database
  dataB.getConnection(function(err, connection){

    //to make the query to the dataBase
    connection.query(query, function(error, results, fields){

      //result of query is called results,
      //it is an array,
      //which the first index is given by numbers
      //and the second is given by name,
      // an example of how to call a similar array would be like this
      // var array1 = {once: "once", twice: "twice"};
      // var array2 = [array1];
      // console.log(array2[0]["once"]);
      //example using the results array
      //console.log(results[0]["profName"]);

      if (error) throw error;

    })
  })

  parms.initial = "Initial";
  parms.professorName = "name";
  parms.professorEmail = "Email";
  parms.Department = "department";
  //devines a variable in the object parms and defines it as the userName
  parms.user = userName;

//it reanders the webpage visual and styling elements
  res.render(layName, parms);
}
else {
  res.redirect('/');
}

//res.send('Birds home page')
})
// // define the about route
// router.get('/about', function (req, res) {
//   res.send('About birds')
// })

module.exports = router
