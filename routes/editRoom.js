var express         = require ('express');
var router          = express.Router ()
var roleCheckHelper = require ('../helpers/roleCheck');
var db = require("../helpers/mysqlConnection").mysql_pool;

router.get('/', function (req, res){
  var layName = './Admin/editRoom'
  const userName = req.cookies.graph_user_name;
  const userEmail = req.cookies.graph_user_email;

  roleCheckHelper.roleCheck('S', userEmail, userName, function(pass){					//checks if the roleID matches the dbRoleID

    if (pass){
    let parms = { title: 'editRoom'};
    parms.user = userName;

    //Query that selects Department ID of the user
    let selectDepID = `SELECT deptID
                       FROM DeptManagers NATURAL JOIN Users
                       WHERE email = '${userEmail}'`;
    db.getConnection(function (err, connection) {
    if (err) throw error;

    //Query execution
    connection.query (selectDepID, function (err, results, fields){

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

          console.log (queryRoomIDPT1);
        }


        let selectRoomID = `SELECT roomID
                            FROM Rooms
                            WHERE `

        console.log("DeptID:" + results[1].deptID);
        res.render(layName, parms);

    }else{
      res.render(layName, parms);
    }
    })
  })

      }else{
        	res.redirect('/home');
    }

    })

});

module.exports = router;			//requirements for the code
