//-----------------------------------
/*
Code still can't handle two cases:
1. It crashes whenever the user tries to search for available without having entered any input
2. It crashes whenever the user enters submit too many times without choosing anything
*/
//-----------------------------------
var express = require('express')
var router = express.Router()
// Initial connection with database.
var dataB = require("../helpers/mysqlConnection").mysql_pool;

// Define the home page route
// Basically page response as in the layout, buttons, all html stuff, etc
router.get('/:id', function (req, res) {

  /* ================ VARIABLES ================ */
  var layName     = './Student/STUD_APP_HUB_PT2';       // Sets up the name of the layout to be
  var titleName   = 'Professor';  //sets up window
  const userName  = req.cookies.graph_user_name;        // Records user's Name.
  const userEmail = req.cookies.graph_user_email;       // Record user's Email.
  var profEmail   = req.params.id;
  var parms       = {title: titleName};                 // Sets up the names of the variables used in hbs


  // If a value exists in the username variable
  if(userName){

    // Object that will be sent to the hbs fie for the variables to be displayed
    parms.user = userName;

    // Defines the query i want to make
    let query = `SELECT name, email
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

        /* ==== Variables for frondEnd ==== */
        parms.profName  = results[0]["name"];
        parms.profEmail = results[0]["email"];
        parms.layout    = layName;

        res.render(layName, parms);
      });
    });
  } else {
    res.redirect('/');
  }

  //res.send('Birds home page')
});

//POST REQUEST
router.post('/:id', function (req, res) {

  /* ============= VARIABLES ================= */
  var layName     = './Student/STUD_APP_HUB_PT2';       // Sets up the name of the layout to be.
  var titleName   = 'Professor';                        // Sets up window.
  const userName  = req.cookies.graph_user_name;        // Records user's Name.
  const userEmail = req.cookies.graph_user_email;       // Records user's Email.
  var profEmail   = req.params.id;                      // Records professor Email.
  var parms       = {title: titleName};

  /* ======== VARAIBLES ======= */

  var date;                         // Stores datepicker where we retireve the day (Ex. Mon, Tue, Wed, etc.) This is used for the first query.
  var dateSearch;                   // Stores datepicker value where we extract the day ^ for the query.
  var id;                           // Stores the professor email chosen by student. Used to find the professor hours.
  var myID;                         // Stores user's table "userID". This is the result of "query_1".
  var profID;                       // Stores professor's table "userID". This is the result of "query_2". We also use this in the Insert query(query_3).
  var timeChoice;                   // Stores user's choice of hours for appointment.
  var dateChoice;                   // Stores datepicker value used for the Appointment request.
  var arr = [];                     // Array used to store the day.
  var time = [];                    // Array used to store the hours chosen by the user.


  if(req.body.button != undefined) {
    dateSearch = req.body.button;
  }

  //just get the day
  if (dateSearch != undefined) {

    //get date
    if(req.body.date != undefined) {
      date  = req.body.date;

      parms.date = date;

      //fill up the array with date
      arr.push(date.split(","));
    }

    let day = arr[0][0].trim();

    // Query which returns all of the hours of a selected day.
    let query = `SELECT name, email, start, end, Day
                 FROM Users NATURAL JOIN ProfHours
                 WHERE email = '${profEmail}' AND day = '${day}'`;

    dataB.getConnection(function(err, connection){

      if(err) throw err;

      connection.query(query, function(error, results, fields) {

        /*========= Variables for FrondEnd =========*/

        parms.results   = results;
        parms.user      = userName;
        parms.profName  = results[0]["name"];
        parms.profEmail = results[0]["email"];
        parms.layout    = layName;

        res.render(layName, parms);
      });
    });
    } else {

      dateChoice= req.body.btnSt;
      console.log(dateChoice);
      timeChoice = String(req.body.hourChoice);

      console.log(timeChoice);
      time.push(timeChoice.split(","));
      console.log(time[0]);


      // Query which returns userID
      let query_1 = `SELECT userID
                     FROM Users
                     WHERE email = '${userEmail}'`;

      // Query which returns profId (userID from Users Table)
      let query_2 = `SELECT userID
                      FROM Users
                      WHERE email = '${profEmail}'`;



      dataB.getConnection(function(err, connection){
        if(err) throw err;

        connection.query(query_1, function(error, results, fields){

          myID = results[0]['userID'];
          console.log(myID);

          connection.query(query_2, function(error, results, fields){

            profID = results[0]['userID'];
            console.log(profID);

            console.log("Values are: " + myID + " " + time[0][2] + " " + time[0][3] + " " + dateChoice + " " + profID);

            /*========== Trying to create the loop for multiple appointments ==========*/
            // var e;
            // for (int i = 0; i < time.length; i+2) {
            //   e = 1;
            //   console.log(time[0][i] + ' ' + time[0][e+i]);
            // }

            // Query which inserts the appointment.
            let query_3 = `INSERT INTO Appointment(userID, start, end, date, status, profID) VALUES('${myID}','${time[0][0]}','${time[0][1]}','${dateChoice}','Pending','${profID}');`;

            console.log(query_3);

            connection.query(query_3, function(error, results, fields){
              console.log(results);

              console.log("Values are: " + myID + " " + time[0][0] + " " + time[0][1] + " " + dateChoice + " " + profID);

            });

          });

        });

      });

      res.redirect(`/home/appointment/${profEmail}`);
  }
});


module.exports = router
