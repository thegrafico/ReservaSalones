var express = require('express')	//requirements for the code
var router = express.Router()		//requirements for the code
var dataB = require("../helpers/mysqlConnection").mysql_pool;


router.get('/', function (req, res) {	//requirements for the code
  var layName = './Professor/profAppointment';  //sets up the name of the layout to be displayed
  const userName = req.cookies.graph_user_name; //gets the username from the email
  const title = 'profAppointment';
  var parms = {title: title, user: userName } ;

  res.render(layName, parms);
})
router.post('/', function (req, res) {
  var layName = './Professor/profAppointment';  //sets up the name of the layout to be displayed
  const userName = req.cookies.graph_user_name; //gets the username from the email
  const title = 'profAppointment';
  var parms = {title: title, user: userName } ;

  var dateButton;

  if (req.body.button != undefined){
    if (req.body.date != undefined){
      dateButton = req.body.date;
    }
  }
  console.log(dateButton);

  let query_1 = `SELECT *
                 FROM Appointment
                 WHERE status = 'accept'`;
  dataB.getConnection(function (err, connection){

    connection.query(query_1, function (err, results){
      console.log(results);
      if (results == null){
        console.log("It is null.");
      }

        res.render(layName, parms);
    })
  })





})
module.exports = router;			//requirements for the code
