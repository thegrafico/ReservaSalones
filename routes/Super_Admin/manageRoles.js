var express = require('express')											 //requirements for the code
var router = express.Router()													 //requirements for the code
var roleCheckHelper = require('../../helpers/roleCheck'); //path for the roleCheck
var db = require("../../helpers/mysqlConnection").mysql_pool;

router.get('/', function (req, res) {	//requirements for the code

	const userName = req.cookies.graph_user_name;
	const email = req.cookies.graph_user_email;

	roleCheckHelper.roleCheck('A', email, userName, function(pass){					//checks if the roleID matches the dbRoleID

		if(pass == true){																											//if the roleID's matches run the indexProf

			getUsers(function(results){
				var layout = './Super_Admin/manageRoles';
		  	let parms = { title: 'adminRoom/ManageRole'};

		 		parms.user = userName;
				parms.results = results;
				res.render(layout, parms);
			});
		}

		else{
			res.redirect('/home');				//if the roleID's don't match redirects to indexStud
		}

	});
});

router.post('/', function (req, res) {	//requirements for the code
	const userName = req.cookies.graph_user_name;
	const email = req.cookies.graph_user_email;

	roleCheckHelper.roleCheck('A', email, userName, function(pass){					//checks if the roleID matches the dbRoleID

		if(pass == true){

			getUsers(function(results){
				console.log("POSTO");

				var layout = './Super_Admin/manageRoles';
		  	let parms = { title: 'adminRoom/ManageRole'};

				parms.results = results;

				if(req.body.addButton != undefined){
					console.log("Added Button");

					if(req.body.nName != "" && req.body.nEmail != "" && req.body.nRole != ""){

						var nName = req.body.nName;
						var nEmail = req.body.nEmail;
						var nRole = req.body.nRole;

						console.log(nName);
						console.log(nEmail);
						console.log(nRole);

						let addNewUser = `INSERT INTO Users (name, email)
            SELECT * FROM (SELECT '${nName}', '${nEmail}') as nUser
          	WHERE NOT EXISTS (SELECT email FROM Users where email = '${nEmail}');`

						let getUserID = `Select userID
					  from Users
					  where email = '${nEmail}';`

						db.getConnection(function(err, connection){
							if(err) throw err;
							connection.query(addNewUser, function(error, results, fields){
								connection.query(getUserID, function(error, results, fields){
									var userID = results[0].userID;

									let addUserRole = `insert into UserRoles (userID, roleID)
									Select * from(Select ${userID}, '${nRole}') as NUserRoles
									where not exists (Select * from UserRoles where userID = ${userID} and roleID = '${nRole}');`
									connection.query(addUserRole, function(error, results, fields){
									})
								})
							})
							connection.release();
						})

					}
				}

				if(req.body.editButton != undefined){
					console.log("Edit Button");


				}

				parms.user = userName;

				res.render(layout, parms);
			});

		}
		else{
			res.redirect('/home');
		}
	})
});


function getUsers(callback){
	let qGetUsers = `Select name, email, role
	from Users natural join UserRoles natural join Roles
	order by name;`

	db.getConnection(function(err, connection){
		if(err) throw err;
		connection.query(qGetUsers, function(error, results, fields){
			callback(results);
		})
		connection.release();
	})
}

module.exports = router;						//requirements for the code
