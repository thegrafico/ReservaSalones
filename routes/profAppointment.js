var express = require('express')	//requirements for the code
var router = express.Router()		//requirements for the code

router.get('/', function (req, res) {	//requirements for the code
  var layName = './Professor/profAppointment';  //sets up the name of the layout to be displayed
  const userName = req.cookies.graph_user_name; //gets the username from the email
  const title = 'profAppointment';
  var parms = {title: title, user: userName } ;

  res.render(layName, parms);
})

module.exports = router;			//requirements for the code
