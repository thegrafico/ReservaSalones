var express = require('express'); //server
var router = express.Router(); //router
var db = require("../helpers/mysqlConnection").mysql_pool; //pool connection


/* GET users listing. */
//shows the available bildings and hours available
router.get('/', function(req, res, next) {

  var building = "Building";
  var layoutRender = 'reservation';//cambiamos esto para cambiar el view

  let parms = {layout: layoutRender, title: 'Reservation'};
  //graba el username e email de los cookies que se grabaron en auth
  const userName = req.cookies.graph_user_name;
  const email = req.cookies.graph_user_email;

  // console.log("USER:", res);

  //if there are username then enter,
  //if not, then it is undefined
  if(userName){

    let query = `SELECT * FROM ${building} Natural Join Room`;
    db.getConnection(function(err, connection) {
      connection.query(query, function (error, results, fields) {

        //se encarga de darle la hora a cada salon
        results.forEach(function(e){
          //le doy valores antes de enviarlo por parametro.
          //lo puse en comments porque causa un error al regresar un valor indefinido
          // console.log(e.roomID, getHour(e.hourAvailable));
          // e.hourAvailable =  getHour(e.hourAvailable);
          // console.log(e.roomID, e.hourAvailable);
        });

        //parameters that go to be sending
        parms.results = results;
        parms.user = userName;

        res.render('reservation', parms);

        //close the connection
        if (error){
          console.log(err);
          res.sendStatus(500);
          return;
        }
        connection.release();

      });
      if(err){
        console.log(err);
        res.sendStatus(500);
        return;
      }
    });
  }else{
    res.redirect('/');
  }
});

router.post('/', function(req, res, next) {

  let parms = {layout: 'reservation', title: 'Reservation'};
  let query = '';
  const userName = req.cookies.graph_user_name;
  //
  // if(req.body.Time == undefined){
  //   req.flash('error', 'Need to check reserve room');
  //   res.redirect('/home/reservation');
  // }
  // else if(req.body.TimeRoom == undefined){
  //   req.flash('error', 'You mush choose a hour!');
  //   res.redirect('/home/reservation');
  // }

  var stringRequest = generarString(req.body.buildingOption);
  console.log(stringRequest);
  console.log(req.body);

  if(stringRequest == "" || stringRequest == undefined){
    query = `SELECT * FROM ${building} Natural Join Room`;
  }else{
    query = `SELECT * FROM ${building} NATURAL JOIN Room WHERE ${stringRequest}`;
  }

  if(userName){
    db.getConnection(function(err, connection) {
      connection.query(query, function (error, results, fields) {

        //se encarga de darle la hora a cada salon
        results.forEach(function(e){
          //le doy valores antes de enviarlo por parametro.
          e.hourAvailable =  getHour(e.hourAvailable);
          // console.log(e.roomID, e.hourAvailable);
        });

        parms.results = results;
        parms.user = userName;


        stringRequest = undefined;
        res.render(layoutRender, parms);

        //close the connection
        if (error){
          console.log(err);
          res.sendStatus(500);
          return;
        }
        connection.release();
      });
      if(err){
        console.log(err);
        res.sendStatus(500);
        return;
      }
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

module.exports = router;
