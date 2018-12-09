/*
1. does not charge the accept and decline appointments when a button is pressed
2. accept and decline does not work
3. CANCEL DOES NOT work
4. Search for appointments does not work
5.Falta el Cancel
*/

var express = require('express')	//requirements for the code
var router = express.Router()		//requirements for the code
var dataB = require("../helpers/mysqlConnection").mysql_pool;
var roleCheckHelper = require('../helpers/roleCheck'); //path for the roleCheck


router.get('/', function (req, res) {	//requirements for the code
  var layName = './Professor/profAppointment';  //sets up the name of the layout to be displayed
  const userName = req.cookies.graph_user_name; //gets the username from the email
  const userEmail = req.cookies.graph_user_email;

  roleCheckHelper.roleCheck('P', userEmail, userName, function(pass){					//checks if the roleID matches the dbRoleID
    if(pass==true){
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
            parms.appPending = results;

            res.render(layName, parms);
            })


        })

      })
    }
    else{
			res.redirect('/home');																							//if the roleID's don't match redirects to indexStud
		}

	});
})

router.post('/', function (req, res) {
  //-----Basic Variables-------------------
  var layName = './Professor/profAppointment';  //sets up the name of the layout to be displayed
  const userName = req.cookies.graph_user_name; //gets the username from the email
  const userEmail = req.cookies.graph_user_email;
  const title = 'profAppointment';
  var parms = {title: title, user: userName } ;

  //----------Variables for functionaily---------------------
  var date = req.body.date;
  var userID;
  var acceptID  = req.body.Abutton;   //ID of appointment that got accepted (appID)
  var declineID = req.body.Dbutton;   //ID og appointment that fot declined
  var searchFlag = req.body.button;   //boolean the identifies if the button has been pressed
  var cancelID = req.body.Cbutton;
  var arr = [];
  parms.date = date;

  let query_1 = `SELECT userID
                 FROM Users
                 WHERE email = '${userEmail}'`;

  //checks which button has been clicked and excecutes different queries
  //depending on the functionality. If the button is not clicked, it resturns undefined
   if (acceptID != undefined){

     //query changes the status of the appointment to Accept
    let query_A = `UPDATE Appointment
                   SET status ='Accept'
                   WHERE appID = '${acceptID}'`;

    //query that Updates the status of the appointment from
    dataB.getConnection (function (err, connection){
      connection.query(query_A, function (err, results){

            connection.query(query_1, function (err, results){

              console.log ("In last query for table");
              //console.log(results);Appointments
              if (results[0] == undefined){
                // console.log("It is undefined.");
              }
              else if (results[0] != undefined){
                // console.log ("It is not undefined.");
                userID = results[0]["userID"];
              }

              let query_2 = `SELECT name, email, start, end, date, appID
                             FROM Users NATURAL JOIN Appointment
                             WHERE profID = '${userID}' AND status = 'Pending'`;

              connection.query(query_2, function (err, results){
        console.log("In appPending");
                parms.appPending = results;
                res.render(layName, parms);
              })
            })

      })
    })

  }else if (declineID != undefined || cancelID != undefined ){
    console.log("Declined!");

    if (cancelID != undefined)
    {
          arr.push(cancelID.split(":"));
      declineID = arr[0][0];
      date = arr [0][1];
      parms.date = date;
    }
    let query_D = `UPDATE Appointment
                   SET status ='Decline'
                   WHERE appID = '${declineID}'`;
    let query_D2 = `SELECT *
                   FROM Appointment
                   Where appID = '${declineID}'`;


    dataB.getConnection (function (err, connection){

      connection.query(query_D,  function (err, results){

    })


    connection.query(query_D2,  function (err, results){

      let query_D3 = `INSERT
                      INTO AppDecline (appID, userID, start, end, date, status, profID, description) values ('${results[0]["appID"]}', '${results[0]["userID"]}','${results[0]["start"]}', '${results[0]["end"]}', '${results[0]["date"]}', '${results[0]["status"]}', '${results[0]["profID"]}', 'null')`;


      connection.query(query_D3,  function (err, results){
      })
      let query_D4 = `SELECT name, email, start, end, appID
                     FROM Appointment NATURAL JOIN Users
                     WHERE date = '${date}' and status = 'Accept';`

      console.log("here2");

      connection.query(query_D4, function (err, results){

        console.log(results);

      parms.appAccept = results;
      console.log(parms.appAccept);

          connection.query(query_1, function (err, results){

            console.log ("In last query for table");
            //console.log(results);Appointments
            if (results[0] == undefined){
              // console.log("It is undefined.");
            }
            else if (results[0] != undefined){
              // console.log ("It is not undefined.");
              userID = results[0]["userID"];
            }

            let query_2 = `SELECT name, email, start, end, date, appID
                           FROM Users NATURAL JOIN Appointment
                           WHERE profID = '${userID}' AND status = 'Pending'`;

            connection.query(query_2, function (err, results){
      console.log("In appPending");
              parms.appPending = results;
              res.render(layName, parms);
            })
          })

        })
    })
  })
}else if (searchFlag){
    if (date != ""){

      parms.date = date;
      console.log("In searchFlag");
      console.log(date);

      let query_S = `SELECT name, email, start, end, appID
                     FROM Appointment NATURAL JOIN Users
                     WHERE date = '${date}' and status = 'Accept';`

      dataB.getConnection (function (err, connection){
      connection.query(query_S, function (err, results){

        console.log(results);

      parms.appAccept = results;

          connection.query(query_1, function (err, results){

            console.log ("In last query for table");
            //console.log(results);Appointments
            if (results[0] == undefined){
              // console.log("It is undefined.");
            }
            else if (results[0] != undefined){
              // console.log ("It is not undefined.");
              userID = results[0]["userID"];
            }

            let query_2 = `SELECT name, email, start, end, date, appID
                           FROM Users NATURAL JOIN Appointment
                           WHERE profID = '${userID}' AND status = 'Pending'`;

            connection.query(query_2, function (err, results){
      console.log("In appPending");
              parms.appPending = results;
              res.render(layName, parms);
            })
          })

        })
      })
    }
}



})
module.exports = router;			//requirements for the code
