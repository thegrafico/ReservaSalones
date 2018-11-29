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

var layName = './Student/STUD_APP_HUB_PT1';  //sets up the name of the layout to be displayed
var titleName = 'Appointment';  //sets up window title
const userName = req.cookies.graph_user_name;  //records userName again to display in the tab

//if a value exists in the username variable
if(userName){

  //sets up the names of the variables used in hbs
  var profName = "name";
  var profEmail = "email";
  var profID = "userID";
  var parms = {title: titleName}  //object that will be sent to the hbs fie for the variables to be displayed
  //initializes the different variables of parms that will be used in the hbs

  parms [profName] = new Object();
  parms [profEmail] = new Object();


  //defines the name of the professor table as a variable

  //defines the query i want to make
  let query = `SELECT ${profName}, ${profEmail}
               FROM Users, UserRoles
               WHERE Users.userID = UserRoles.userID AND roleID = 'P'
               ORDER BY name`;
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

      //check for each table entry
      // results.forEach(function (elements){
      //   //check for each table element
      //   for (var i = 0; i <elements.length; i++ ){
      //
      //   }
      // })

      console.log(results);
      console.log(results[0]["name"])
      if (error) throw error;

      // for(var i = 0; i < results.length; i++) {
      //   parms.profName = results[i]["name"];
      //   parms.profEmail = results[i]["email"];
      //   $(".row").append(" <div class='box0'> <div id='box' class='col s3 z-depth-3'> <div id='uno <h3 id='ini'><a href='/home/appointment/professor'> {{profName}} </a></h3> </div> <div class='profInfo> <p> {{profEmail}} </p> <p>Faculty Member</p> </div> </div> </div> ");
      // }
      parms.results = results;
      parms.profName = results[0]["name"];
      parms.profEmail = results[0]["email"];
      parms.layout = layName;

      //it reanders the webpage visual and styling elements
      res.render(layName, parms);
    })
  })

  // Defines a variable in the object parms and defines it as the userName
  parms.user = userName;
  // parms.profName = profName;

}
  else {
    res.redirect('/');
  }
})

//converts index number to an equivalent table name
function getColumn (index, name, email, description){
  return 0;
switch (index){
  case '0':
}

}
// // define the about route
// router.get('/about', function (req, res) {
//   res.send('About birds')
// })

module.exports = router
