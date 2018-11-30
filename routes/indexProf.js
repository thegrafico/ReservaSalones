var express = require('express')	//requirements for the code
var router = express.Router()		//requirements for the code
var roleCheck = require('../helpers/roleCheck'); //path for the roleCheck




router.get('/', function (req, res) {	//requirements for the code

	const userName = req.cookies.graph_user_name;
	const email = req.cookies.graph_user_email;

	if(roleCheck.roleCheck('P', email, userName) == true){

  	var layout = './Professor/indexProf';
  	let parms = { title: 'profHome', active: { home: true }, urlReservation: '/reservation', urlProfApp: '/Appointments'};

	//res.send('Testing Professor Home');
	parms.user = userName;
	res.render(layout, parms);
	}

	else{
		res.redirect('/home');
	}
})

module.exports = router;			//requirements for the code
