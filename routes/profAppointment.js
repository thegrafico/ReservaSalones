/*
1. does not charge the accept and decline appointments when a button is pressed
2. accept and decline does not work
3. CANCEL DOES NOT work
4. Search for appointments does not work
*/

var express = require('express')	//requirements for the code
var router = express.Router()		//requirements for the code
var dataB = require("../helpers/mysqlConnection").mysql_pool;


router.get('/', function (req, res) {	//requirements for the code
  var layName = './Professor/profAppointment';  //sets up the name of the layout to be displayed
  const userName = req.cookies.graph_user_name; //gets the username from the email
  const userEmail = req.cookies.graph_user_email;
  const title = 'profAppointment';
  var parms = {title: title, user: userName } ;

  var userID;

  let query_1 = `SELECT userID
                 FROM Users
                 WHERE email = '${userEmail}'`;
  dataB.getConnection(function (err, connection){

    connection.query(query_1, function(err, results){

      if (results[0] == undefined){
        // console.log("It is undefined1.");
      }
      else if (results[0] != undefined){
        // console.log ("It is not undefined1.");
        userID = results[0]["userID"];
      }
      let query_2 = `SELECT name, email, start, end, date
                     FROM Users NATURAL JOIN Appointment
                     WHERE profID = '${userID}' AND status = 'Pending'`;

      connection.query(query_2, function(err, results){

        // if (results[0] == undefined){
        //   console.log("It is undefined2.");
        // }
        // else if (results[0] != undefined){
        //   console.log ("It is not undefined2.");
        // }

        console.log(results);

        parms.appPending = results;

        res.render(layName, parms);
        })


    })

  })
})

router.post('/', function (req, res) {
  //-----Basic Variables-------------------
  var layName = './Professor/profAppointment';  //sets up the name of the layout to be displayed
  const userName = req.cookies.graph_user_name; //gets the username from the email
  const userEmail = req.cookies.graph_user_email;
  const title = 'profAppointment';
  var parms = {title: title, user: userName } ;

  //----------Variables for functionaily---------------------
  var dateButton;
  var userID;

  if (req.body.button != undefined){
    if (req.body.date != undefined){
      dateButton = req.body.date;
    }
  }
  console.log(dateButton);

  let query_1 = `SELECT userID
                 FROM Users
                 WHERE email = '${userEmail}'`;

  dataB.getConnection(function (err, connection){

    connection.query(query_1, function (err, results){


      //console.log(results);
      if (results[0] == undefined){
        console.log("It is undefined.");
      }if (results[0] == undefined){
        console.log("It is undefined.");
      }
      else if (results[0] != undefined){
        console.log ("It is not undefined.");
        userID = results[0]["userID"];
      }
      console.log(userID);


      let query_2 = `SELECT userID, start, end, date
                     FROM Appointment
                     WHERE status = 'accept' AND date = '${dateButton}' AND profID = '${userID}'`;

      let query_3 = `SELECT name, email, start, end, date
                     FROM Users NATURAL JOIN Appointment
                     WHERE profID = '${userID}' AND status = 'Pending'`;
      console.log(query_2);

      connection.query(query_3, function (err, results){
        parms.appPending = results;

        res.render(layName, parms);


      })
    })
  })





})
module.exports = router;			//requirements for the code
