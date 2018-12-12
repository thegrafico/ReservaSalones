// Checks the role of the graph_refresh_token
var db = require("../helpers/mysqlConnection").mysql_pool;

function roleCheck(reqRoleID, email, userName, callback){            //creates the function

  if(userName){
    let query =`select roleID` +                                     //checks if the user role
                ` from Users natural join UserRoles` +               //is on the database
                ` where email = '${email}'`;                         //database query using his email

    db.getConnection(function(err, connection) {                     //connects to the database
      if (err) throw error;                                            //checks for connection error

      connection.query(query, function (error, results, fields) {    //does the database query
        // console.log(results);
        var dbRoleID = null;                                          //ini the database role to null

        // console.log(dbRoleID);

        // console.log("outside if");
        if (results [0] != undefined){                                           //checks if the result from the database is empty
        dbRoleID = results[0].roleID;                                //iguala el roleID de la db a la variable de dbRoleID
        //console.log(dbEmail);
        // console.log("Results isnt undefined")
      }else{
        if (reqRoleID == ""){

          dbRoleID = '';
        }
      }

        if (error) throw error;                                      //checks for error
        // console.log (reqRoleID);
        // console.log(dbRoleID);

        if (dbRoleID == reqRoleID)  callback(true);                  //if the user roleID matches the dbRoleID sends true to the function
        else{
          callback(false);                                           //if the user roleID dosen't matches the dbRoleID sends false to the function
        }
      });
      connection.release();

    });
  }
}

exports.roleCheck = roleCheck;                                       //allow the function to be called in another JS file
