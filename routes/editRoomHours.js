var express = require('express'); //server
var router = express.Router(); //router
var db = require("../helpers/mysqlConnection").mysql_pool; //pool connection

/* GET users listing. */
//shows the available bildings and hours available
router.get('/',  function(req, res, next) {

  var building = "Building";
  var layoutRender = 'reservation';//cambiamos esto para cambiar el view

  let parms = {layout: layoutRender, title: 'Reservation'};
  //graba el username e email de los cookies que se grabaron en auth
  const userName = req.cookies.graph_user_name;
  const email = req.cookies.graph_user_email;
  parms.user = userName;


  //if there are username then enter,
  //if not, then it is undefined
  if(userName){

    getRooms(function(results){

      parms.id = results;
      res.render('reservation', parms);
    });

  }else{
    res.redirect('/home');
  }
});

//====================================POST===================================
router.post('/', function(req, res, next) {

  var layoutRender = 'reservation';//cambiamos esto para cambiar el view

  let parms = {layout: layoutRender, title: 'Reservation'};
  //graba el username e email de los cookies que se grabaron en auth
  const userName = req.cookies.graph_user_name;
  const email = req.cookies.graph_user_email;
  parms.user = userName;
  //know the data
  console.log(req.body);
  /*
    Remember error handle
  */
  let rID    = req.body.searchRoom.id;
  let rDate  = req.body.searchRoom.date;      //full date
  var day    = "";                                 //half date
  let rStart = req.body.searchRoom.start;
  let rEnd   = req.body.searchRoom.end;

  // console.log("Start: ",rStart);
  // console.log("End: ",rEnd);

  if (rDate != ""){
    day = rDate.split(',');                                  //date desconstructor
    // console.log(rDate2);
  }

  console.log("rDate: ",rDate);
  console.log("day: ",day);
  console
  let query = `SELECT *
               FROM Rooms NATURAL JOIN RoomHours
               WHERE roomID = '${rID}'`;

console.log("test");
  // if(userName){
    getRooms2(email ,function(roomIDs, userID){
console.log("test3");
      db.getConnection(function(err, connection) {
console.log("test2");
        //error
        if(err) throw err;

        connection.query(query, function (error, results, fields) {

          //Error
          if (error) throw error;

          parms.id = roomIDs;

          parms.results = results;
          // console.log("UserID: ",userID);

          let query_2 = `insert into Reservation (userID, start, end, date, roomID, status)
                       SELECT *
                       FROM (Select ${userID}, '${rStart}','${rEnd}', '${rDate}', '${rID}', 'Pending' ) as NRoomHours
                       WHERE not exists (Select *
                       from (select roomID, start, end, day date, description
                       from RoomHours union all Select roomID, start, end, date, description from Reservation where status = 'Accepted') AllReservation
                       where end >= '${rStart}' and start <= '${rEnd}' and roomID = '${rID}' and (date = '${day[0]}' or date = '${rDate}'));`;

          if (rStart != "" && rEnd != "" && rID != "" && day[0] != "" && rDate != ""){
            db.getConnection(function(err, connection) {
              connection.query(query_2, function (error, results_2, fields) {

                if (error) throw error;
                if (results_2.insertId > 0){
                  // console.log(query_2);
                  console.log("SUUUUUUUUU");
                }
                else {
                  console.log("Can not make reservation, Date is not available");
                }

              });
            });
          }
          else{
            console.log("One of the Variables is blank");
          }
          // console.log(results);
          //render the html
          res.render(layoutRender, parms);
        });
      });
    });
  // }else{
  //   res.redirect('/');
  // }
});



function getRooms(callback){

  let query = `SELECT distinct(roomID)
               FROM Rooms`;

  db.getConnection(function(err, connection) {

    if(err) throw err;

    connection.query(query, function (error, results, fields) {
      if (error) throw error;

      callback(results);
    });
  });
}

function getRooms2(email, callback){

  let query = `SELECT distinct(roomID)
               FROM Rooms`;

  db.getConnection(function(err, connection) {

    if(err) throw err;

    connection.query(query, function (error, results, fields) {
      if (error) throw error;

      let query_2 =`select userID` +                                   //checks if the user role
                  ` from Users` +                                      //is on the database
                  ` where email = '${email}'`;                         //database query using his email

      db.getConnection(function(err, connection) {

        if(err) throw err;

        connection.query(query_2, function (error, results_2, fields) {
          if (error) throw error;

          userID = results_2[0].userID;
          // console.log("UserID-query: ",userID);

          callback(results, userID);
        });
      });
    });
  });
}

module.exports = router;
