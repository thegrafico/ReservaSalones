var express = require('express'); //server
var router = express.Router(); //router

/* GET users listing. */
router.get('/', function(req, res, next) {

  var layout = './Admin/admin';
  const userName = req.cookies.graph_user_name; //gets the username from the email
  const title = 'Admin';
  var parms = {title: title, user: userName , Name: 'George'} ;
    // Set a flash message by passing the key, followed by the value, to req.flash().
    // req.flash('error', 'Flash is back!')
    res.render(layout, parms);
});

module.exports = router;
