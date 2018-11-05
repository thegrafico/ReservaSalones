var express = require('express'); //server
var router = express.Router(); //router
var db = require("../helpers/mysqlConnection").mysql_pool; //pool connection

/* GET users listing. */
router.get('/', function(req, res, next) {

  let parms = {layout: 'reservation', title: 'Reservation'};
  const userName = req.cookies.graph_user_name;
  const email = req.cookies.graph_user_email;

  //if there are username
  if(userName){

    let query = `SELECT * FROM Building Natural Join Room`;
    db.getConnection(function(err, connection) {
      connection.query(query, function (error, results, fields) {

        results.forEach(function(e){
          e.hourAvailable =  getHour(e.hourAvailable);
          console.log(e.roomID, e.hourAvailable);
        });

        parms.results = results;
        parms.user = userName;

        // results.forEach(function(e){
        //   letras.push(getHour(e.hourAvailable));
        // });

        res.render('reservation', parms, );

        //close the connection
        if (error) throw error;
        connection.release();
      });
      if(err) throw err;
    });
  }else{
    res.redirect('/');
  }
});

router.post('/', function(req, res, next) {

  let parms = {layout: 'reservation', title: 'Reservation'};
  let query = '';
  const userName = req.cookies.graph_user_name;

  // console.log("Result", req.body.buildingOption);
  var stringRequest = generarString(req.body.buildingOption);
  console.log(stringRequest);

  if(stringRequest == "" || stringRequest == undefined){
    query = `SELECT * FROM Building Natural Join Room`;
  }else{
    query = `SELECT * FROM Building NATURAL JOIN Room WHERE ${stringRequest}`;
  }

  if(userName){
    db.getConnection(function(err, connection) {
      connection.query(query, function (error, results, fields) {
        parms.results = results;
        parms.user = userName;

        stringRequest = undefined;
        res.render('reservation', parms);

        if (error) throw error;
        connection.release();
      });
      if(err) throw err;
    });
  }else{
    res.redirect('/');
  }
});

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

module.exports = router;
