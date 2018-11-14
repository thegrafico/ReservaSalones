var express = require('express')	//requirements for the code
var router = express.Router()		//requirements for the code




router.get('/', function (req, res) {	//requirements for the code

	const userName = req.cookies.graph_user_name;

	if(userName){
  	const userName = req.cookies.graph_user_name; //gets the username from the email
  	var layout = 'InterHub';
  	let parms ={tittle: 'ProfessorHome', urlProfRev: '/professor-home/view-reservation', urlProfApp: '/professor-home/view-appointment'}



	//res.send('Testing Professor Home');
	parms.user = userName;
	res.render(layout, parms);
	}

	else{
		res.redirect('/');
	}
})








module.exports = router;			//requirements for the code
