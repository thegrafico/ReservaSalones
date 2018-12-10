var express         = require ('express');
var router          = express.Router ()
var roleCheckHelper = require ('../../helpers/roleCheck');
var db = require("../../helpers/mysqlConnection").mysql_pool;

router.get('/', function (req, res){

  var layName = './Admin/editRoom'
  const userName = req.cookies.graph_user_name;
  const userEmail = req.cookies.graph_user_email;
  const role = 'S';

  roleCheckHelper.roleCheck(role, userEmail, userName, function(pass){					//checks if the roleID matches the dbRoleID

      if (pass){

        let parms = { title: 'editRoom'};
        parms.user = userName;

        //function that returns the roomID that the person has the clearance to manipulate
        roomID(userEmail, function (pass2, roomID){
          //If, the results of the query didnt come back empty
          if (pass2){
            parms.id = roomID;
            res.render (layName, parms);
          }else{
            res.render(layName, parms);
          }
        })
      }else{
      res.redirect ('/home');
      }
    });
  });

  router.post ('/', function (req, res){
    const userName = req.cookies.graph_user_name;
    const userEmail = req.cookies.graph_user_email;
    const role = 'S';


    roleCheckHelper.roleCheck(role, userEmail, userName, function(pass){					//checks if the roleID matches the dbRoleID

      //Checks if the user passed the check
      if (pass){

        var layName = './Admin/editRoom';
        var parms = {title: 'editRoom'};
        var arr = []
        var id = req.body.optionID;

        parms.user = userName;

        //function that returns the roomID that the person has the clearance to manipulate
        roomID(userEmail, function (pass2, roomID){
          //If, the results of the query didnt come back empty
          if (pass2){
            //then record results
            parms.id = roomID;
            console.log ("id: " + id[0]);

            if (id != ""){

              db.getConnection (function (err, connection){
                let selectRoomHours = `SELECT *
                                       FROM RoomHours
                                       WHERE roomID = '${id[0]}'`;

                connection.query (selectRoomHours, function (err,results,fields){
                  parms.results = results;
                  console.log(results);

                  res.render (layName, parms);

                })

              })
            }else{
              res.render (layName, parms);
            }
          }else{
            res.render(layName, parms);
          }
        });
    }else{
      res.redirect('/home');
    }
  });
});


function roomID (userEmail, callback){
  //Query that selects Department ID of the user
  let selectDepID = `SELECT deptID
                     FROM DeptManagers NATURAL JOIN Users
                     WHERE email = '${userEmail}'`;
  db.getConnection(function (err, connection) {
  if (err) throw error;

  //Query execution
  connection.query (selectDepID, function (err, results, fields){

    if (err) throw error;

    //First checks if query came back empty before doing anything
    if (results != ""){
      //Will store the part of the query that specifies the condition
      //which is "where deptID = '1' OR ... etc."
      let queryRoomIDPT1 = 'WHERE ';

      for (var i = 0; i < results.length; i++){

        //Checks for start and end of the loop, to add an OR in between
        if (i != 0 && i < results.length)
        queryRoomIDPT1 += ' OR ';

        queryRoomIDPT1 += 'deptID = ' + results[i].deptID;
      }


      let selectRoomID = `SELECT DISTINCT roomID
                          FROM Rooms `
                          + queryRoomIDPT1;

      connection.query (selectRoomID, function (err, results, fields){
      callback(true, results);
      })
  }else{
    callback(false, results);
    }
  })
  connection.release();
  })
}




module.exports = router;			//requirements for the code
