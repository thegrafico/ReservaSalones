//-----------------------------------
/*
Code still can't handle two cases:
3. Also, does not check if appointment is taken to make the request
4.Does not make appointment if the user does not reselect the day
*/
//-----------------------------------

var express = require('express')
var router = express.Router()
// Initial connection with database.
var roleCheckHelper = require('../../helpers/roleCheck'); //path for the roleCheck
var dataB = require("../../helpers/mysqlConnection").mysql_pool;

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
  var role        = "";

  // If a value exists in the username variable
  roleCheckHelper.roleCheck (role, userEmail, userName, function (pass){

    if (pass){

    // Object that will be sent to the hbs fie for the variables to be displayed
      parms.user = userName;

      getProfCred(profEmail, function (filled, profCred){
        //checks if query for name and email came back filled
        if (filled){

          parms.profName  = profCred[0]["name"];
          parms.profEmail = profCred[0]["email"];
          parms.layout    = layName;

          res.render(layName, parms);

        }else{
          res.send("Oops, no professor name or email");
        }

      })
    }else{
      res.redirect('/home');
    }
  })
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
  var role        = "";


  roleCheckHelper.roleCheck (role, userEmail, userName, function (pass){

    if (pass){

    /* ======== VARAIBLES ======= */

      var date;                         // Stores datepicker where we retireve the day (Ex. Mon, Tue, Wed, etc.) This is used for the first query.
      var dateSearch = req.body.search; // Stores datepicker value where we extract the day ^ for the query.
      var id;                           // Stores the professor email chosen by student. Used to find the professor hours.
      var myID;                         // Stores user's table "userID". This is the result of "query_1".
      var profID;                       // Stores professor's table "userID". This is the result of "query_2". We also use this in the Insert query(query_3).
      var timeChoice = req.body.hourChoice;// Stores user's choice of hours for appointment.
      var dateChoice;                   // Stores datepicker value used for the Appointment request.
      var arr = [];                     // Array used to store the day.
      var time = [];                    // Array used to store the hours chosen by the user.
      var submit = req.body.btnSt;

      parms.user = userName;


      console.log(req.body);
      console.log("Button State: " + submit);
      console.log(dateSearch);

      getUserID(userEmail, function (filled, id){
        if (filled){
          userID = id[0]["userID"];
        }else{
          res.redirect('/home')
        }
      })
      getProfCred(profEmail, function (filled, profCred){
        //checks if query for name and email came back filled
        if (filled){

          parms.profName  = profCred[0]["name"];
          parms.profEmail = profCred[0]["email"];
          parms.layout    = layName;
          profID = profCred[0]["userID"];


          //if the search button has been pressed
          if (dateSearch && dateSearch != undefined){

            date = req.body.date;

            //check if the user did press the button without entering a date
            if (date != ''){

              arr.push(date.split(","));
              let day = arr[0][0].trim();

              getProfHour (profID, day, function (filled, profHour){

                parms.results   = profHour;
                res.render(layName, parms);
              })

              console.log("Inside date not empty")

            //else, the user pressed the button empty, render normal page
            }else{
              console.log("Inside date is empty")
              res.render(layName, parms);
            }

          //else the submit button has been pressed
          }else{
            //if runs in here, then submit button has been pressed
            date = req.body.date;
            //if date isnt empty
            if (date != '' && timeChoice != undefined){

              timeChoice = String(req.body.hourChoice);

              time.push(timeChoice.split(","));
              console.log(time[0][0]);
              //userID start end date status profID description

              makeAppointment(userID, time, date, profID);
              res.render(layName, parms);

            //else, render page as normal
            }else{
              res.render(layName, parms);
            }


            console.log("Undefined");
          }

        }else{
          res.send("Oops, no professor name or email");
        }
      })

      //checks if the  search for available was clicked
  }
    /*

the submit button has been pressed
      dateChoice= req.body.btnSt;
      //console.log(dateChoice);
      timeChoice = String(req.body.hourChoice);

      //console.log(timeChoice);
      time.push(timeChoice.split(","));
      //console.log(time[0]);


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

          connection.query(query_2, function(error, results, fields){

            profID = results[0]['userID'];

            //console.log("Values1 are: " + myID + " " + time[0][1] + " " + time[0][2] + " " + dateChoice + " " + profID);

            //Adds new appointments to the Database
            for (var i = 0; i < time[0].length; i += 2) {
              //console.log(i);
              //console.log(time[0][i] + ' && ' + time[0][i+1]);

              // Query which inserts the appointment.
              let query_3 = `INSERT INTO Appointment(userID, start, end, date, status, profID) VALUES('${myID}','${time[0][i]}','${time[0][i+1]}','${dateChoice}','Pending','${profID}');`;

              connection.query(query_3, function(error, results, fields){
                //console.log(results);

                console.log("Values2 are: " + myID + " " + time[0][0] + " " + time[0][1] + " " + dateChoice + " " + profID);

              });
            }
          });
        });
        connection.release();
      });
      res.redirect('/home/appointment/${profEmail}');
  }
  */
  });
});


//gets name, email and ID of the Professor
function getProfCred(profEmail, callback){

  let selectProfCred = `SELECT userID, name, email
                        FROM Users
                        WHERE email = '${profEmail}'`;

  dataB.getConnection(function (err,connection){

    connection.query(selectProfCred, function (err, results, field){

      if (err) throw error;

      if (results != ""){

        callback (true, results);
      }else{
        callback(false, results);
      }
    })

    connection.release();
  })
}



function getProfHour (profID, day, callback){

  // Query which returns all of the hours of a selected day.
  let selectHours = `SELECT name, email, start, end, Day
               FROM Users NATURAL JOIN ProfHours
               WHERE userID = '${profID}' AND day = '${day}'`;

  dataB.getConnection(function(err, connection){

    if(err) throw err;

    connection.query(selectHours, function(error, results, fields) {

      if (results != ""){

        callback (true, results);
      }else{
        callback(false, results);
      }
    })
    connection.release();
  })
}



function getUserID (userEmail, callback){
  let selectUserID = `SELECT userID
                      FROM Users
                      WHERE email = '${userEmail}'`;

  dataB.getConnection (function (err, connection){
    if (err) throw error;
    connection.query(selectUserID, function(error, results, fields) {;
      if (results != ""){

        callback (true, results);
      }else{
        callback(false, results);
      }
    })
    connection.release()
  })
}



function makeAppointment (userID, time, date, profID){

    dataB.getConnection(function(err, connection){

    for (var i = 0; i < time[0].length; i += 2) {
      //console.log(i);
      //console.log(time[0][i] + ' && ' + time[0][i+1]);

      // Query which inserts the appointment.
      let query_3 = `INSERT INTO Appointment(userID, start, end, date, status, profID) VALUES('${userID}','${time[0][i]}','${time[0][i+1]}','${date}','Pending','${profID}');`;
      connection.query(query_3, function(error, results, fields){
        console.log(results);
      });
    }
    connection.release();
  })

}

module.exports = router
