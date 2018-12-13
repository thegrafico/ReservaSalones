var mysql = require('mysql');
const pass = require('./pass');
const database = require('./database');


var config;
//forma estandar de conectarse a mysql utilizando nodejs
//se cambia el database, user y password, dependiendo de las necesidades

config = {
    mysql_pool : mysql.createPool({

      //establece limite de personas conectadas a la base de datos
      connectionLimit : 15,

      //establece el route basico donde se ouede accessar
      host     : 'localhost',           //THIS IS THE SAME FOR YOUR
      user     : 'root',               //THIS IS THE SAME FOR YOUR
<<<<<<< HEAD
      password : 'radames121',               //HERE GO YOUR PASSWORD TO ENTER IN YOUR DB
      database : 'Inter Reservation'            //HERE GO THE DATABASE THAT WE ARE GONNA USED
=======
      password :  pass,            //HERE GO YOUR PASSWORD TO ENTER IN YOUR DB
      database : database   //HERE GO THE DATABASE THAT WE ARE GONNA USED
>>>>>>> 968028f291f79ecc8b271fc3a785f014a0d9f967
    })
};

//parte de node js que deja que esta funcion
//se pueda utilizar en otro codigo
module.exports = config;
