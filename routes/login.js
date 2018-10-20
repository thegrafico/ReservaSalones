var express = require('express');
var router = express.Router();
var authHelper = require('../helpers/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  let parms = { title: 'Home', active: { home: true } };
  parms.signInUrl = authHelper.getAuthUrl();

  res.render('login', parms);
});

module.exports = router;
