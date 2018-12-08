var express = require('express')	//requirements for the code
var router = express.Router()		//requirements for the code
var roleCheckHelper = require('../helpers/roleCheck'); //path for the roleCheck

router.get('/', function (req, res) {	//requirements for the code

	const userName = req.cookies.graph_user_name;
	const email = req.cookies.graph_user_email;
	var pass = null;

	// roleCheckHelper.roleCheck('P', email, userName, function(pass2){
	// 	console.log('pass2: ', pass2);
	// 	console.log('pass: ', pass)
	// 	pass = pass2;
	// 	console.log('pass: ',pass);
	// });

	// let val = roleCheckHelper.roleCheck('P',email, userName);

	function roleCheckCallback(){
		roleCheckHelper.roleCheck('P', email, userName, function(pass2){
			// console.log('pass2: ', pass2);
			// console.log('pass: ', pass)
			pass = pass2;
			console.log('pass: ',pass);
			home();
		});
		console.log('rccb pass ', pass);
	}

function home (){
	// console.log('pass after function', roleCheckCallback());
	// var pass = await roleCheckHelper.pass('P', email, userName);
	// console.log(roleCheckHelper.roleCheck('P', email, userName));

	// console.log('pass: ',pass);
	// console.log('let:', val);
	// var pass3 = roleCheckCallback(email, userName);
	console.log('rccbif ', pass);

 if(pass==true){
		console.log("inside user if pass",pass);
		console.log('inside if user');
  	var layout = './Professor/indexProf';
  	let parms = { title: 'profHome', active: { home: true }, urlReservation: '/reservation', urlProfApp: '/Appointments'};

	//res.send('Testing Professor Home');
	parms.user = userName;
	res.render(layout, parms);
	}

	else{
		res.redirect('/');
	}
}

	roleCheckCallback();
})

module.exports = router;			//requirements for the code
