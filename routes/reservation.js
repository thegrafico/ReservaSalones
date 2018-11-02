var express = require('express');
var router = express.Router();

var db = require("../helpers/mysqlConnection").mysql_pool;

/* GET users listing. */
router.get('/', function(req, res, next) {

  let parms = {layout: 'reservation', title: 'Reservation'};
  const userName = req.cookies.graph_user_name;
  const email = req.cookies.graph_user_email;


  if(userName){
    let query = `SELECT * FROM Building Natural Join Room`;
    db.getConnection(function(err, connection) {
      connection.query(query, function (error, results, fields) {
        parms.results = results;
        parms.user = userName;
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

router.post('/', function(req, res, next) {

  let parms = {layout: 'reservation', title: 'Reservation'};
  const userName = req.cookies.graph_user_name;
  const email = req.cookies.graph_user_email;

  console.log("Result", req.body.buildingOption);
  var stringRequest = generateString(req.body.buildingOption);

  console.log(stringRequest);

  if(userName){
    connection.query('SELECT * FROM  building', function (error, results, fields) {
      if (error) throw error;

      parms.results = results;
      parms.user = userName;

      res.render('reservation', parms);
    });
  }else{
    connection.end();
    res.redirect('/');
  }
});

function generateString(str){
  var result = "";

  for(var i = 0; i < str.length ; i++){

    if(str[i] == "*"){
      return "*";
    }
  }

  for(var i = 0; i < str.length ; i++){

    if(str[i] != undefined){

      if(i == str.length - 1){
        result += str[i];
      }else{
        result += str[i] + " and ";
      }
    }

  }
  console.log("RESULTADO: ", result);
  return result;
}

module.exports = router;
