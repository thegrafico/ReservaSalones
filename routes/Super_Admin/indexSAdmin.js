var express = require('express')											 //requirements for the code
var router = express.Router()													 //requirements for the code
var roleCheckHelper = require('../../helpers/roleCheck'); //path for the roleCheck
var db = require("../../helpers/mysqlConnection").mysql_pool;

router.get('/', function (req, res) {	//requirements for the code

	const userName = req.cookies.graph_user_name;
	const email = req.cookies.graph_user_email;

	roleCheckHelper.roleCheck('A', email, userName, function(pass){					//checks if the roleID matches the dbRoleID

		if(pass == true){																											//if the roleID's matches run the indexProf

			var layout = './Super_Admin/indexSAdmin'; /* ==== Missing! ==== */											/* === Missing! === */
		  let parms = { title: 'adminRoom	', active: { home: true }, urlManageRoom: '/superAdminHome/manageRoom', urlManageRole: '/superAdminHome/manageRole'};

			let getStats = `Select *
			FROM (Select count(status) count, status from Reservation_Status natural join
			(select distinct(roomID) from Rooms) Rooms
			group by status) ResDecline2
			union all
			(select count(status),status from Reservation natural join
			(select distinct(roomID) from Rooms) Rooms
			group by status)
			order by status;`

			db.getConnection(function (err, connection) {
				if (err) throw error;
				connection.query (getStats, function (err, results, fields){

					console.log(results);
					if (results != undefined || results != ""){
						if(results[0] != undefined || results != ""){
							parms.accepted = results[0].count;
							parms.acceptedN = results[0].status;
						}
						if (results[1] != undefined){
							parms.decline	 = results[1].count;
							parms.declineN = results[1].status;
						}
						if (results[2] != undefined){
							parms.pending	 = results[2].count;
							parms.pendingN = results[2].status;
						}
					}

					parms.user = userName;
					res.render(layout, parms);
				})
				connection.release();
			})
		}

		else{
			res.redirect('/home');				//if the roleID's don't match redirects to indexStud
		}

	});
});

module.exports = router;						//requirements for the code
