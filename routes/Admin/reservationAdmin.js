//Things that need to be corrected:
// 1.Does not check for a specific secretary department id to display the different reservations

var express = require('express'); //server
var router = express.Router(); //router
var roleCheckHelper = require('../../helpers/roleCheck'); //path for the roleCheck
var dataB = require("../../helpers/mysqlConnection").mysql_pool;

/* GET users listing. */
router.get('/', function(req, res, next) {

  var layName = './Admin/reservationAdmin';  //sets up the name of the layout to be displayed
  const userName = req.cookies.graph_user_name; //gets the username from the email
  const userEmail = req.cookies.graph_user_email;

  // roleCheckHelper.roleCheck('S', userEmail, userName, function(pass){					//checks if the roleID matches the dbRoleID
    if(userName){
      const title = 'admin';
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
          let query_2 = `select *
                         from (Select distinct (roomID) from Rooms where (deptID = 1 or deptID = 2 or deptID = 3)) TRooms
                         natural join
                         (select * from Reservation natural join (Select userID, name, email from Users) TUsers where status = 'Pending') PReservation`;

          connection.query(query_2, function(err, results){

            parms.appPending = results;

            res.render(layName, parms);
          })
         })
       })
     }

})


router.post('/', function (req, res) {
  //-----Basic Variables-------------------
  var layName = './Admin/reservationAdmin';  //sets up the name of the layout to be displayed
  const userName = req.cookies.graph_user_name; //gets the username from the email
  const userEmail = req.cookies.graph_user_email;
  const title = 'admin';
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
  //depending on the functionality. If the button is not clicked, it returns undefined
   if (acceptID != undefined){

     //query changes the status of the appointment to Accept
    let query_A = `UPDATE Reservation
                   SET status ='Accepted'
                   WHERE resID = '${acceptID}'`;

                   console.log ("Inside Here");
    //query that Updates the status of the appointment from
    dataB.getConnection (function (err, connection){
      connection.query(query_A, function (err, results){

            connection.query(query_1, function (err, results){

              if (results[0] == undefined){
                // console.log("It is undefined.");
              }
              else if (results[0] != undefined){
                // console.log ("It is not undefined.");
                userID = results[0]["userID"];
              }
              let query_2 = `select *
                             from (Select distinct (roomID) from Rooms where (deptID = 1 or deptID = 2 or deptID = 3)) TRooms
                             natural join
                             (select * from Reservation natural join (Select userID, name, email from Users) TUsers where status = 'Pending') PReservation`;

              connection.query(query_2, function (err, results){
                parms.appPending = results;
                res.render(layName, parms);
              })
            })

      })
    })

  }else if (declineID != undefined || cancelID != undefined ){
    if (cancelID != undefined)
    {
      arr.push(cancelID.split(":"));
      declineID = arr[0][0];
      date = arr [0][1];
      parms.date = date;
    }
    let query_D = `UPDATE Reservation
                   SET status ='Decline'
                   WHERE resID = '${declineID}'`;
    let query_D2 = `SELECT *
                   FROM Reservation
                   Where resID = '${declineID}'`;


    dataB.getConnection (function (err, connection){

      connection.query(query_D,  function (err, results){

    })


    connection.query(query_D2,  function (err, results){

      let query_D3 = `INSERT
                      INTO ResDecline (resID, userID, start, end, date, status, roomID, description) values ('${results[0]["resID"]}', '${results[0]["userID"]}','${results[0]["start"]}', '${results[0]["end"]}', '${results[0]["date"]}', '${results[0]["status"]}', '${results[0]["roomID"]}', 'null')`;


      connection.query(query_D3,  function (err, results){
      })
      let query_D4 = `select *
                     from (Select distinct (roomID) from Rooms where (deptID = 1 or deptID = 2 or deptID = 3)) TRooms
                     natural join
                     (select * from Reservation natural join (Select userID, name, email from Users) TUsers where status = 'Accepted' and date = '${date}') PReservation`;

      connection.query(query_D4, function (err, results){
      parms.appAccept = results;
          connection.query(query_1, function (err, results){
            //console.log(results);Appointments
            if (results[0] == undefined){
              // console.log("It is undefined.");
            }
            else if (results[0] != undefined){
              // console.log ("It is not undefined.");
              userID = results[0]["userID"];
            }

            let query_2 = `select *
                           from (Select distinct (roomID) from Rooms where (deptID = 1 or deptID = 2 or deptID = 3)) TRooms
                           natural join
                           (select * from Reservation natural join (Select userID, name, email from Users) TUsers where status = 'Pending') PReservation`;

            connection.query(query_2, function (err, results){
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
      let query_S = `select *
                     from (Select distinct (roomID) from Rooms where (deptID = 1 or deptID = 2 or deptID = 3)) TRooms
                     natural join
                     (select * from Reservation natural join (Select userID, name, email from Users) TUsers where status = 'Accepted' and date = '${date}') PReservation;`

      dataB.getConnection (function (err, connection){
      connection.query(query_S, function (err, results){

      parms.appAccept = results;

          connection.query(query_1, function (err, results){

            //console.log(results);Appointments
            if (results[0] == undefined){
              // console.log("It is undefined.");
            }
            else if (results[0] != undefined){
              // console.log ("It is not undefined.");
              userID = results[0]["userID"];
            }

            let query_2 = `select *
                           from (Select distinct (roomID) from Rooms where (deptID = 1 or deptID = 2 or deptID = 3)) TRooms
                           natural join
                           (select * from Reservation natural join (Select userID, name, email from Users) TUsers where status = 'Pending') PReservation`;

            connection.query(query_2, function (err, results){
              parms.appPending = results;
              res.render(layName, parms);
            })
          })

        })
      })
    }else{
      res.render(layName, parms);
    }
  }
})

module.exports = router;
