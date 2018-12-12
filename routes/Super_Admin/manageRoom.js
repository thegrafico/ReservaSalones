var express = require('express')											 //requirements for the code
var router = express.Router()													 //requirements for the code
var roleCheckHelper = require('../../helpers/roleCheck'); //path for the roleCheck
var dataB = require("../../helpers/mysqlConnection").mysql_pool;


router.get('/', function (req, res) {	//requirements for the code

	const userName = req.cookies.graph_user_name;
	const email = req.cookies.graph_user_email;

	roleCheckHelper.roleCheck('A', email, userName, function(pass){					//checks if the roleID matches the dbRoleID

		if(pass == true){																											//if the roleID's matches run the indexProf

			var layout = './Super_Admin/manageRoom';
		  let parms = { title: 'ManageRoom'};

			//defines the query i want to make
	    let query = `SELECT * FROM Department NATURAL JOIN Rooms`;
	    //establishes connection to database
	    dataB.getConnection(function(err, connection){

				if(err) throw err;

				connection.query(query, function(error, results, fields){
					if(error) throw error;

					parms.results = results;

				 	parms.user = userName;
					res.render(layout, parms);
				});

				connection.release();
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

		if(pass){																											//if the roleID's matches run the indexProf

			var layout = './Super_Admin/manageRoom';
		  let parms = { title: 'ManageRoom'};
			let redirectPath = "/superAdminHome/manageRoom";

			console.log("Manage Room, Body Data", req.body);

			//si el btn is pressed
			if(req.body.addRoom != undefined){
				// console.log("Presione el btn de agregar salon");
				if(req.body.roomID == '' || req.body.cap == '' || req.body.dept == undefined){
					req.flash("error", `Fill up Property the fields`);
					res.redirect(redirectPath);
				}else{
					let rID = req.body.roomID;
					let cap = req.body.cap;
					let dept = req.body.dept;
					let roomInfo = [rID, cap, dept ];
					console.log("ARRAY ROOM INFO: ", roomInfo);
					insertRoom(roomInfo, function(results){
						// console.log("Resultados del query:", results.affectedRows);
						if(results.affectedRows == 0)
							req.flash("error", `Room already exists`);
						else
							req.flash("success", `Room was Successuffy added`);

						res.redirect(redirectPath);
					});
				}
			}
			else if(req.body.dltBtn != undefined){
				// console.log(req.body.dltBtn);
				let idRoom = req.body.dltBtn;
				removeRoom(idRoom, function(results){
					console.log(results);

					req.flash("success", `Room was Successuffy removed`);
					res.redirect(redirectPath);
				});
			}else{

				//defines the query i want to make
		    let query = `SELECT * FROM Department NATURAL JOIN Rooms`;
		    //establishes connection to database
		    dataB.getConnection(function(err, connection){

					if(err) throw err;

					connection.query(query, function(error, results, fields){
						if(error) throw error;

						parms.results = results;

					 	parms.user = userName;
						res.redirect(redirectPath);
					});
				});
			}
		}
		else{
			res.redirect('/home');				//if the roleID's don't match redirects to indexStud
		}
	});
});

function insertRoom(roomInf, callback){

	let query =`INSERT INTO Rooms (roomID, capacity, deptID)` +                            //query to check if the email
	` SELECT * FROM (SELECT '${roomInf[0]}', '${roomInf[1]}', '${roomInf[2]}') as nRoom`  +             //of the user is on the db
	` WHERE NOT EXISTS (SELECT roomID FROM Rooms WHERE roomID = '${roomInf[0]}')`;

  dataB.getConnection(function(err, connection) {

    if(err) throw err;

    connection.query(query, function (error, results, fields) {
      if (error) throw error;

      callback(results);
    });
    connection.release();
  });
}

function removeRoom(roomID, callback){

	let query =`DELETE FROM Rooms WHERE roomID = '${roomID}'`;

  dataB.getConnection(function(err, connection) {

    if(err) throw err;

    connection.query(query, function (error, results, fields) {
      if (error) throw error;

      callback(results);
    });
    connection.release();
  });
}


module.exports = router;						//requirements for the code
