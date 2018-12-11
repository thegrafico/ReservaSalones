var express         = require ('express');
var router          = express.Router ()
var roleCheckHelper = require ('../../helpers/roleCheck');
var db = require("../../helpers/mysqlConnection").mysql_pool;


router.get('/', function (req, res){
  var layName = './Admin/addRoom'
  const userName = req.cookies.graph_user_name;
  const email = req.cookies.graph_user_email;

  let parms = { title: 'addRoom'};

  roleCheckHelper.roleCheck('S', email, userName, function(pass){

    if(pass){
      getRooms(email,function(results){

        var loop = [1,2,3,4,5,6,7];

        parms.loop = loop;
        parms.user = userName;
        parms.id = results;
        res.render(layName, parms);
        console.log(results);

        console.log("roomID: ",req.body.roomID);

      });
    }
    else{
      res.redirect ('/home');
    }
  });
});

router.post ('/', function (req, res){
  const userName = req.cookies.graph_user_name;
  const userEmail = req.cookies.graph_user_email;


  roleCheckHelper.roleCheck('S', userEmail, userName, function(pass){
    if(pass){
      getRooms(userEmail,function(results){
        var layName = './Admin/addRoom';
        var parms = {title: 'addRoom'};
        var loop = [1,2,3,4,5,6,7];

        console.log("POST");

        console.log(req.body);

        parms.loop = loop;
        parms.user = userName;
        parms.id   = results;

        for (var i = 0; i < loop.length; i++){
          // console.log(i);
          if(req.body.roomID[i] != undefined && req.body.start[i] != "" && req.body.end[i] != "" && req.body.day[i] != ""){
            var roomID      = req.body.roomID[i];
            var start       = req.body.start[i];
            var end         = req.body.end[i];
            var day         = req.body.day[i];
            var description = req.body.description[i];

            // console.log(roomID);
            // console.log(start);
            // console.log(end);
            // console.log(day);
            // console.log(description);
            // console.log("inside");
            let addRoomHours = `insert into RoomHours (start, end, roomID, day, description)
            Select *
            from (Select '${start}', '${end}', '${roomID}', '${day}', '${description}') as NRoomHours
            where not exists(select * from RoomHours where end > '${start}' and start < '${end}' and roomID = '${roomID}' and (day = '${day}' or day = 'all'))`

            db.getConnection(function (err, connection) {
              if(err) throw err;
              connection.query(addRoomHours, function (err, results, fields){
              })
              connection.release();
            })
          }
        }

        res.render(layName, parms);
      })
    }
    else{
      res.redirect('/home');
    }
  });
});

function getRooms(email, callback){

  let getUserID = `Select userID
  from Users
  where email = '${email}';`

  db.getConnection(function (err, connection) {
    if(err) throw err;
    connection.query(getUserID, function (err, results, fields){
      // if (error) throw error;

console.log('results',results);
      var userID = results[0].userID;
      console.log("userID", userID);

      let qGetRooms = `select roomID
      from Rooms natural join (select userID, deptID from Users natural join DeptManagers) as DUsers
      where userID = ${userID};`

      connection.query (qGetRooms, function (err, results, fields){
        callback(results);
      })
      connection.release();
    })
  })
}

module.exports = router;			//requirements for the code
