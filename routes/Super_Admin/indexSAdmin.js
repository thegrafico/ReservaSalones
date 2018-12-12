var express = require('express')											 //requirements for the code
var router = express.Router()													 //requirements for the code
var roleCheckHelper = require('../../helpers/roleCheck'); //path for the roleCheck

router.get('/', function (req, res) {	//requirements for the code

	const userName = req.cookies.graph_user_name;
	const email = req.cookies.graph_user_email;

	roleCheckHelper.roleCheck('A', email, userName, function(pass){					//checks if the roleID matches the dbRoleID

		if(pass == true){																											//if the roleID's matches run the indexProf

			var layout = './Super_Admin/indexSAdmin'; /* ==== Missing! ==== */											/* === Missing! === */
		  let parms = { title: 'adminRoom	', active: { home: true }, urlManageRoom: '/superAdminHome/manageRoom', urlManageRole: '/superAdminHome/manageRole'};

		 	parms.user = userName;
			res.render(layout, parms);
		}

		else{
			res.redirect('/home');				//if the roleID's don't match redirects to indexStud
		}

	});
});

module.exports = router;						//requirements for the code
