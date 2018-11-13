var express = require('express');
var router = express.Router();
var authHelper = require('../helpers/auth');
var db = require("../helpers/mysqlConnection").mysql_pool; //database path

/* GET /authorize. */
router.get('/', async function(req, res, next) {
  // Get auth code
  const code = req.query.code;

  // If code is present, use it
  if (code) {
    let token;

    try {
      token = await authHelper.getTokenFromCode(code, res);
    } 
    catch (error) {
      res.render('error', { title: 'Error', message: 'Error exchanging code for token', error: error });
    }

    var user = 'users';
    const accessToken = await authHelper.getAccessToken(req.cookies, res);
    const userName = req.cookies.graph_user_name;
    var email = req.cookies.graph_user_email;

    console.log("email: ",req.cookies);
    // Redirect to home
    //res.redirect('/home');

    //if(userName){

    // let query =`INSERT INTO ${user} (emailID, name, privilege)` +
    //   ` SELECT * FROM (SELECT '${email}', '${userName}', ${0}) as nUser`  +
    //   ` WHERE NOT EXISTS (SELECT emailID FROM ${user} where emailID = '${email}')`;

    let query =`select profesorEmail` +
                ` from professor` +
                ` where profesorEmail = '${email}'`;

    db.getConnection(function(err, connection) {


      if (err) throw error;


      connection.query(query, function (error, results, fields) {
        console.log(results);
        var dbEmail = null;

        //console.log(results[0].profesorEmail);
        console.log(dbEmail);

        if (results != "") dbEmail = results[0].profesorEmail;
        console.log(dbEmail);

        if (error) throw error;
        if (dbEmail == email) res.redirect('/professor');
        //res.redirect('/professor');

        else{
          res.redirect('/home');
        }
      


        /*=if (accessToken && userName) {
          parms.user = userName;
          parms.debug = `User: ${userName}\nEmail: ${email}\nAccess Token: ${accessToken}`;
        } 
        else {
          parms.signInUrl = authHelper.getAuthUrl();
          parms.debug = parms.signInUrl;
        }
          res.render('index', parms);
      });*/


      });
    });
  //}


}
  else {
    // Otherwise complain
    res.render('error', { title: 'Error', message: 'Authorization error', error: { status: 'Missing code parameter' } });
  }
});

/* GET /authorize/signout */
router.get('/signout', function(req, res, next) {
  authHelper.clearCookies(res);

  // Redirect to home
  res.redirect('/')
});

module.exports = router;
