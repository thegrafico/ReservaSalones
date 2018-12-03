//page for student user

var express = require('express');
var router = express.Router();
var authHelper = require('../helpers/auth');
var db = require("../helpers/mysqlConnection").mysql_pool;

/* GET home page. */
router.get('/', async function(req, res) {
  var layName = './Student/indexStud';  //sets up the name of the layout to be displayed
  var user = 'Users';                   //variable to edit the users table of your database
  // var pTable = 'Professor';             //variable to edit the professor table of your database
  const accessToken = await authHelper.getAccessToken(req.cookies, res);
  const userName = req.cookies.graph_user_name;
  const email = req.cookies.graph_user_email;
  let parms = { title: 'Home', active: { home: true }, urlReservation: '/reservation', urlAppoitment: '/appointment'};

  console.log(req.cookies);

  parms.layout = layName;

  //here we can see the admin!
  // console.log(req.cookies.admini[0]);

  if(userName){
    let query =`select roleID` +                                     //checks if the user role
                ` from Users natural join UserRoles` +               //is on the database
                ` where email = '${email}'`;                         //database query using his email

    db.getConnection(function(err, connection) {                     //connects to the database

      if (err) throw err;                                          //checks for connection error

      connection.query(query, function (error, results, fields) {    //does the database query

        if (error) throw error;                                      //checks for error

        console.log(results);
        var dbRoleID = null;                                          //ini the database role to null

        //console.log(results[0].profEmail);
        console.log(dbRoleID);

        if (results != "")                                           //checks if the result from the database is empty
<<<<<<< HEAD
          dbRoleID = results[0].roleID;                                //iguala el roleID de la db a la variable de dbRoleID
=======
          dbRoleID = results[0].roleID;                              //iguala el roleID de la db a la variable de dbRoleID
>>>>>>> 836b8d70e90a2dc5a37e69c086160e7a8bebb6ee

        console.log(dbRoleID);
        // if (dbRoleID == 'A') res.redirect('/admin');              //if the role is admin on the db, route to admin
        if (dbRoleID == 'S') res.redirect('/admin');                 //if the role is admin on the db, route to scretary
        // if (dbRoleID == 'D') res.redirect('/director');           //if the role is admin on the db, route to director
        if (dbRoleID == 'P') res.redirect('/profHome');              //if the role is a Professor on the db, route to profHome

        else{
          var emailCarrier = email.split("@");                                          //spliting the email into 2 string to get the email carrier
          // console.log(emailCarrier[1]);

          if (emailCarrier[1] == 'INTERBAYAMON.EDU'){                                   //cheking if the email is from @INTERBAYAMON

            let query =`INSERT INTO ${user} (name, email)` +                            //query to check if the email
            ` SELECT * FROM (SELECT '${userName}', '${email}') as nUser`  +             //of the user is on the db
            ` WHERE NOT EXISTS (SELECT email FROM ${user} where email = '${email}')`;   //if he is not on db, add his credential to the db

            db.getConnection(function(err, connection) {                                //checks if there is a connection error with db

              if (err) throw error;                                                     //if there is a db error, display error

              connection.query(query, function (error, results, fields) {               //query that adds the email if it's not on the db

                if (error) throw error;                                                 //checks if there was an error if the query

                if (accessToken && userName) {
                  parms.user = userName;
                  parms.debug = `User: ${userName}\nEmail: ${email}\nAccess Token: ${accessToken}`;
                }
                else {
                  parms.signInUrl = authHelper.getAuthUrl();
                  parms.debug = parms.signInUrl;
                }

                res.render(layName, parms);
              });
            });
          }
          else {
            authHelper.clearCookies(res); //clears the user cookies
            res.redirect('/');            // if the email is not from @INTERBAYAMON it redirects to login
          }
        }
      });
    });
  }
});


module.exports = router;
