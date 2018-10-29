var passFormySql = require('../passmySql');
var express = require('express');
var router = express.Router();
var authHelper = require('../helpers/auth');

var mysql = require('mysql');

var connection = mysql.createConnection({
host     : 'localhost',  //THIS IS THE SAME FOR YOUR
user     : 'root',      //THIS IS THE SAME FOR YOUR
password : passFormySql,        //HERE GO YOUR PASSWORD TO ENTER IN YOUR DB
database : 'Room_Reservation'   //HERE GO THE DATABASE THAT WE ARE GONNA USED
});


/* GET users listing. */
router.get('/', function(req, res, next) {

  let parms = {layout: 'reservation', title: 'Reservation'};
  const userName = req.cookies.graph_user_name;
  const email = req.cookies.graph_user_email;

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
