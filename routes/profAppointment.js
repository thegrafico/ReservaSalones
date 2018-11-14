var express = require('express')	//requirements for the code
var router = express.Router()		//requirements for the code



router.get('/', function (req, res) {	//requirements for the code

  const userName = req.cookies.graph_user_name; //gets the username from the email

  

res.send('Testing Professor Appointments')		//Display text
})






module.exports = router;			//requirements for the code