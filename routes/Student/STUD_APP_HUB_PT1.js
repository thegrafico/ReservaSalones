var express = require('express')
var router = express.Router()
//to interact with the databea and make queries
var dataB = require("../../helpers/mysqlConnection").mysql_pool;

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
    let query = `SELECT ${profName}, ${profEmail}, ${profID}
                 FROM Users NATURAL JOIN UserRoles
                 WHERE roleID = 'P'
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

        if (error) throw error;

        parms.results = results;
        parms.profName = results[0]["name"];
        parms.profEmail = results[0]["email"];
        parms.layout = layName;

        //it reanders the webpage visual and styling elements
        res.render(layName, parms);
      })

      connection.release();

    })
    // Defines a variable in the object parms and defines it as the userName
    parms.user = userName;
    // parms.profName = profName;
  }
  else {
    res.redirect('/home');
  }
})

module.exports = router
