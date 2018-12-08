// var passFormySql = require('../passmySql');
var mysql = require('mysql');
var config;
//forma estandar de conectarse a mysql utilizando nodejs
//se cambia el database, user y password, dependiendo de las necesidades

config = {
    mysql_pool : mysql.createPool({

      //establece limite de personas conectadas a la base de datos
      connectionLimit : 15,

      //establece el route basico donde se ouede accessar
      host     : 'localhost',          //THIS IS THE SAME FOR YOUR
      user     : 'root',               //THIS IS THE SAME FOR YOUR
<<<<<<< HEAD
      password : '6197',         //HERE GO YOUR PASSWORD TO ENTER IN YOUR DB
=======
      password : 'Monmonkey78',         //HERE GO YOUR PASSWORD TO ENTER IN YOUR DB
>>>>>>> 9b6d31e2804372f5fc935c8510726bc2e5e31f63
      database : 'InterReservations'   //HERE GO THE DATABASE THAT WE ARE GONNA USED
    })
};

//parte de node js que deja que esta funcion
//se pueda utilizar en otro codigo
module.exports = config;
