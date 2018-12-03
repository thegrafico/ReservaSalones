var express = require('express'); //server
var router = express.Router(); //router
var roleCheckHelper = require('../helpers/roleCheck'); //path for the roleCheck

/* GET users listing. */
router.get('/', function(req, res, next) {

  const userName = req.cookies.graph_user_name; //gets the username from the email
  const email = req.cookies.graph_user_email;
  const title = 'Admin';

  roleCheckHelper.roleCheck('S', email, userName, function(pass){					//checks if the roleID matches the dbRoleID

    if(pass == true){                                                     //if the roleID's matches run the indexProf

      var layout = './Admin/admin';
      var parms = {title: title, user: userName , Name: 'George'} ;
      // Set a flash message by passing the key, followed by the value, to req.flash().
      // req.flash('error', 'Flash is back!')
      res.render(layout, parms);

    }

    else{
			res.redirect('/home');																							//if the roleID's don't match redirects to indexStud
		}

  });
});

module.exports = router;
