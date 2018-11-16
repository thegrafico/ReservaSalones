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

  var layName = 'STUD_APP_HUB_PT1';  //sets up the name of the layout to be displayed
  var titleName = 'Appointment';  //sets up window title
  const userName = req.cookies.graph_user_name;  //records userName again to display in the tab


  //console.log("userName: " + userName);
//if a value exists in the username variable
if(userName){
  //sets up the names of the variables used in hbs
  var initial = "initial";
  var name = "professorName";
  var email = "professorEmail";
  var description = "Department";
  var parms = {title: titleName}  //object that will be sent to the hbs fie for the variables to be displayed
  //initializes the different variables of parms that will be used in the hbs

  var a = "00000";
  parms [initial] = new Object();
  parms [name] = new Object();
  parms [email] = new Object();
  parms [description] = new Object();


  //defines the name of the professor table as a variable
  var professor = 'Professor';

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

      //check for each table entry
      results.forEach(function (elements){

        console.log(elements.length);

        //check for each table element
        for (var i = 0; i <elements.length; i++ ){

        }

      })

      if (error) throw error;
        //console.log(a);
      a = "hey";
      console.log(a);
      parms[initial] = results[0]["profName"] ;
      parms[name] = results[0]["profName"];
      parms[email] = results[0]["profEmail"];
      parms[description] = results[0]["description"];
      parms.layout = 'STUD_APP_HUB_PT1';
      //it reanders the webpage visual and styling elements
      res.render(layName, parms);
    })
  })

  console.log(a);



  //devines a variab    console.log(elements);le in the object parms and defines it as the userName
  parms.user = userName;


}
else {
  res.redirect('/');
}

//res.send('Birds home page')
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
