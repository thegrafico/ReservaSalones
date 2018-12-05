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

//Get hour le da la hora segun los parametros que hay en la base de dato
//va desde la letra a hasta la i, cada letra significa una hora.
function getHour(str){

  var hour = [];
  for(var i = 0; i < str.length; i++){
    switch(str[i]){
      case 'a': hour.push({time: "8:00 - 9:00 am"});
      break;
      case 'b': hour.push({time: "9:00 - 10:00 am"});
      break;
      case 'c': hour.push({time: "10:00 - 11:00 am"});
      break;
      case 'd': hour.push({time: "11:00 - 12:00 midday"});
      break;
      case 'e': hour.push({time: "12:00 - 1:00 pm"});
      break;
      case 'f': hour.push({time: "1:00 - 2:00 pm"});
      break;
      case 'g': hour.push({time: "2:00 - 3:00 pm"});
      break;
      case 'h': hour.push({time: "3:00 - 4:00pm"});
      break;
      case 'i': hour.push({time: "4:00 - 5:00 pm"});
      break;
      default:
        //do nothing
    }
  }

  return hour;
}
//genera el string para la query
function generarString(str){

  var result = "";

  if(str != undefined){


    for(var i = 0; i < str.length ; i++){

        if(i == str.length - 1)
          result += "edifName = \'" + str[i] + "\'";
        else
          result += "edifName = \'" + str[i] + "\' or ";
    }
    return result;
  }else{
    return undefined;
  }
}

function removeDuplicateUsingFilter(arr){
    let unique_array = arr.filter(function(elem, index, self) {
        return index == self.indexOf(elem);
    });
    return unique_array
}

module.exports = router;
