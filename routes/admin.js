var express = require('express'); //server
var router = express.Router(); //router
var roleCheckHelper = require('../helpers/roleCheck'); //path for the roleCheck

/* GET users listing. */
router.get('/', function(req, res, next) {

  const userName = req.cookies.graph_user_name; //gets the username from the email
<<<<<<< HEAD
  const email = req.cookies.graph_user_email;
  const title = 'Admin';

  roleCheckHelper.roleCheck('S', email, userName, function(pass){					//checks if the roleID matches the dbRoleID

    if(pass == true){                                                     //if the roleID's matches run the indexProf

      var layName = './Admin/admin';
      var parms = {title: title, user: userName };
      var userID;

      let query_1 = `SELECT userID
                     FROM Users
                     WHERE email = '${userEmail}'`;

=======
  const userEmail = req.cookies.graph_user_email;

  // roleCheckHelper.roleCheck('S', userEmail, userName, function(pass){					//checks if the roleID matches the dbRoleID
    if(userName){
      const title = 'admin';
      var parms = {title: title, user: userName } ;

      var userID;

      let query_1 = `SELECT userID
                     FROM Users
                     WHERE email = '${userEmail}'`;
>>>>>>> a2e90dee9b0ebc688242e1b68c0fe692ce4765cf
      dataB.getConnection(function (err, connection){

        connection.query(query_1, function(err, results){

          if (results[0] == undefined){
            // console.log("It is undefined1.");
          }
          else if (results[0] != undefined){
            // console.log ("It is not undefined1.");
            userID = results[0]["userID"];
          }
<<<<<<< HEAD
          let query_2 = `SELECT name, email, start, end, date
                         FROM Users NATURAL JOIN Reservation
                         WHERE userID = '${}' AND status = 'Pending'`;

          connection.query(query_2, function(err, results){

            // if (results[0] == undefined){
            //   console.log("It is undefined2.");
            // }
            // else if (results[0] != undefined){
            //   console.log ("It is not undefined2.");
            // }
=======
          let query_2 = `select *
                         from (Select distinct (roomID) from Rooms where (deptID = 1 or deptID = 2 or deptID = 3)) TRooms
                         natural join
                         (select * from Reservation natural join (Select userID, name, email from Users) TUsers where status = 'Pending') PReservation`;

          connection.query(query_2, function(err, results){

>>>>>>> a2e90dee9b0ebc688242e1b68c0fe692ce4765cf
            parms.appPending = results;

            res.render(layName, parms);
          })
<<<<<<< HEAD
        })
      })
      res.render(layName, parms);

    }

    else{
			res.redirect('/home');																							//if the roleID's don't match redirects to indexStud
		}

  });
});

router.post('/', function(req, res) {
  var layName = './Admin/admin';
=======
         })
       })
     }
    //  else{
 		// 	res.redirect('/');																							//if the roleID's don't match redirects to indexStud
 		// }

 	// });
})
    // else{
		// 	res.redirect('/home');																							//if the roleID's don't match redirects to indexStud
		// }

//   });
// });

router.post('/', function (req, res) {
  //-----Basic Variables-------------------
  var layName = './Admin/admin';  //sets up the name of the layout to be displayed
>>>>>>> a2e90dee9b0ebc688242e1b68c0fe692ce4765cf
  const userName = req.cookies.graph_user_name; //gets the username from the email
  const userEmail = req.cookies.graph_user_email;
  const title = 'admin';
  var parms = {title: title, user: userName };

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

  if (acceptID != undefined) {

   // Query changes the status of the appointment to Accept.
   let query_A = `UPDATE Reservation
                  SET status ='Accept'
                  WHERE appID = '${acceptID}'`;

    // Query that Updates the status of the appointment from.
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

              let query_2 = `SELECT name, email, start, end, date, resID
                             FROM Users NATURAL JOIN Reservation
                             WHERE profID = '${userID}' AND status = 'Pending'`;

              connection.query(query_2, function (err, results){
                console.log("In appPending");
                parms.appPending = results;
                res.render(layName, parms);
              })
            })

      })
    })

  } else if (declineID != undefined || cancelID != undefined ){

  } else if (searchFlag){
    if (date != ""){

    }

  }

});

module.exports = router;
