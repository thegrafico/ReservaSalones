var express = require('express')
var router = express.Router()
//to interact with the databea and make queries
var dataB = require("../helpers/mysqlConnection").mysql_pool;

// define the home page route
//basically page response as in the layout, buttons, all html stuff, etc
router.get('/:id', function (req, res) {

  // ================= VARIABLES ==================
  var layName     = './Student/STUD_APP_HUB_PT2';  //sets up the name of the layout to be
  var titleName   = 'Professor';  //sets up window
  const userName  = req.cookies.graph_user_name;  //records userName again to display in the tab
  var profEmail   = req.params.id;
  var parms       = {title: titleName};    //sets up the names of the variables used in hbs


  //if a value exists in the username variable
  if(userName){

    //object that will be sent to the hbs fie for the variables to be displayed
    parms.user = userName;

    //defines the query i want to make
    let query = `SELECT name, email, start, end, Day
                 FROM Users NATURAL JOIN ProfHours
                 WHERE email = '${profEmail}'`;

    // establishes connection to database
    dataB.getConnection(function(err, connection){

      //to make the query to the dataBase
      connection.query(query, function(error, results, fields){

        if (error) throw error;

        // result of query is called results
        // it is an array
        // which the first index is given by
        // and the second is given by name
        // an example of how to call a similar array would be like
        // var array1 = {once: "once", twice: "twice"}
        // var array2 = [array1];
        // console.log(array2[0]["once"]);
        // example using the results array
        // console.log(results[0]["profName"]);

        // ==== Variables for frondEnd ====
        parms.profName  = results[0]["name"];
        parms.profEmail = results[0]["email"];
        parms.layout    = layName;

        res.render(layName, parms);
      });
    });
      //devines a variable in the object parms and defines it as the userName
  } else {
    res.redirect('/');
  }

  //res.send('Birds home page')
});

//POST REQUEST
router.post('/:id', function (req, res) {

  //===============VARIABLES====================
  var titleName  = 'Professor';  //sets up window

  var layName    = './Student/STUD_APP_HUB_PT2';  //sets up the name of the layout to be
  var titleName  = 'Professor';  //sets up window
  const userName = req.cookies.graph_user_name;  //records userName again to display in the tab
  var profEmail  = req.params.id;
  var parms      = {title: titleName};    //sets u

  //===============VARAIBLES====================
  var date;
  var id;
  var arr = [];

  //get date
  if(req.body.date != undefined)
    date  = req.body.date;

  //fill up the array with date
  arr.push(date.split(","));

  //just get the day
  let day = arr[0][0].trim();

  // //query for
  let query = `SELECT name, email, start, end, Day
               FROM Users NATURAL JOIN ProfHours
               WHERE email = '${profEmail}' AND day = '${day}'`;

  dataB.getConnection(function(err, connection){

    if(err) throw err;

    connection.query(query, function(error, results, fields){

      //print data
      results.forEach(function (e){
        console.log(e);
      });

      /*========= Variables for FrondEnd =========*/

      parms.results   = results;
      parms.user      = userName;
      parms.profName  = results[0]["name"];
      parms.profEmail = results[0]["email"];
      parms.layout    = layName;

      res.render(layName, parms);
    });
  });
});


module.exports = router
