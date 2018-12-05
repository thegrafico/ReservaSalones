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

    let query = `SELECT * FROM Rooms NATURAL JOIN RoomHours`;
    let allID = [];

    db.getConnection(function(err, connection) {

      if(err) throw err;

      connection.query(query, function (error, results, fields) {
        if (error) throw error;

        results.forEach(function (e){
          allID.push(e.roomID);
        });

        allID = removeDuplicateUsingFilter(allID);
        // console.log("ID: ", allID);
        parms.id = allID;

        res.render('reservation', parms);
      });
    });
  }else{
    res.redirect('/');
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
  let allID = [];
  let arrDate = [];
  //know the data
  console.log(req.body);
  /*
    Remember error handle
  */
  let rID = req.body.searchRoom.id;
  let rDate = req.body.searchRoom.date;

  arrDate = rDate.split(',');
  let day = arrDate[0];
  console.log(day);
  let query = `SELECT * FROM Rooms NATURAL JOIN RoomHours WHERE roomID = '${rID}'`;

  if(userName){
    db.getConnection(function(err, connection) {

      //error
      if(err) throw err;

      connection.query(query, function (error, results, fields) {

        //Error
        if (error) throw error;

        results.forEach(function (e){
          allID.push(e.roomID);
        });

        allID = removeDuplicateUsingFilter(allID);
        // console.log("ID: ", allID);
        parms.id = allID;

        parms.results = results;

        console.log(results);
        //render the html
        res.render(layoutRender, parms);
      });
    });
  }else{
    res.redirect('/');
  }
});

function removeDuplicateUsingFilter(arr){
    let unique_array = arr.filter(function(elem, index, self) {
        return index == self.indexOf(elem);
    });
    return unique_array
}

module.exports = router;
