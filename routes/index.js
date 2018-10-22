var passFormySql = require('../passmySql');

var express = require('express');
var router = express.Router();
var authHelper = require('../helpers/auth');

//to use the DBS
var mysql = require('mysql');

var connection = mysql.createConnection({
host     : 'localhost',  //THIS IS THE SAME FOR YOUR
user     : 'root',      //THIS IS THE SAME FOR YOUR
password : passFormySql,        //HERE GO YOUR PASSWORD TO ENTER IN YOUR DB
database : 'Room_Reservation'   //HERE GO THE DATABASE THAT WE ARE GONNA USED
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

/* GET home page. */
router.get('/', async function(req, res, next) {

  const accessToken = await authHelper.getAccessToken(req.cookies, res);
  const userName = req.cookies.graph_user_name;
  const email = req.cookies.graph_user_email;

  connection.query('SELECT * FROM Students', function (error, results, fields) {

    if (error) throw error;

    let parms = { title: 'Home', active: { home: true } };

    if (accessToken && userName) {
      parms.user = userName;
      parms.debug = `User: ${userName}\nEmail: ${email}\nAccess Token: ${results[1].email}`;
    } else {
      parms.signInUrl = authHelper.getAuthUrl();
      parms.debug = parms.signInUrl;
    }

    parms.results = results;

    for (var i = 0; i < results.length; i++) {
      console.log('The solution is: ', results[i]);
    }

    res.render('index', parms);
  });

});

module.exports = router;
