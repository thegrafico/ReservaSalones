//page for student user

var express = require('express');
var router = express.Router();
var authHelper = require('../helpers/auth');
var db = require("../helpers/mysqlConnection").mysql_pool;



/* GET home page. */
router.get('/', async function(req, res) {

  var user = 'users';
  const accessToken = await authHelper.getAccessToken(req.cookies, res);
  const userName = req.cookies.graph_user_name;
  const email = req.cookies.graph_user_email;
  let parms = { title: 'Home', active: { home: true }, urlReservation: '/reservation', urlAppoitment: '/appointment'};

  console.log(req.cookies);

  //here we can see the admin!
  // console.log(req.cookies.admini[0]);
  



  if(userName){
    let query =`select profesorEmail` +                              //checks if the user email
                ` from professor` +                                  //is on the database
                ` where profesorEmail = '${email}'`;                 //database query

    db.getConnection(function(err, connection) {                     //connects to the database


      if (err) throw error;                                          //checks for connection error


      connection.query(query, function (error, results, fields) {    //does the database query
        //console.log(results);
        var dbEmail = null;                                          //ini the database email to null

        //console.log(results[0].profesorEmail);
        //console.log(dbEmail);

        if (results != "")                                           //checks if the result from the database is empty
        dbEmail = results[0].profesorEmail;                          //iguala el email del usuario a la variable de dbEmail
        //console.log(dbEmail);

        if (error) throw error;                                      //checks for error
        if (dbEmail == email) res.redirect('/professor');            //if the email was on the db route to professor
        //res.redirect('/professor');

        else{
         let query =`INSERT INTO ${user} (emailID, name, privilege)` +
         ` SELECT * FROM (SELECT '${email}', '${userName}', ${0}) as nUser`  +
         ` WHERE NOT EXISTS (SELECT emailID FROM ${user} where emailID = '${email}')`;

         db.getConnection(function(err, connection) {

         if (err) throw error;

          connection.query(query, function (error, results, fields) {
          
            if (error) throw error;

            if (accessToken && userName) {
              parms.user = userName;
              parms.debug = `User: ${userName}\nEmail: ${email}\nAccess Token: ${accessToken}`;
            } 
            else {
              parms.signInUrl = authHelper.getAuthUrl();
              parms.debug = parms.signInUrl;
            }

            res.render('index', parms);
            });
          });
        }
      });
    });
  }

  else{ //enter here si no nadie se ha autentificado
    res.redirect('/');
  }
});


module.exports = router;
