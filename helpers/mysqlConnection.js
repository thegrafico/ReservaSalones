var mysql = require('mysql');
<<<<<<< HEAD
// const pass = require('./pass');
// const database = require('./database');
=======
const pass = require('./pass');
const database = require('./database');
var config;
>>>>>>> da18e9c37ff14a7530eca72572db00552d0ddde8


//forma estandar de conectarse a mysql utilizando nodejs
//se cambia el database, user y password, dependiendo de las necesidades

config = {
    mysql_pool : mysql.createPool({

      //establece limite de personas conectadas a la base de datos
      connectionLimit : 15,

      //establece el route basico donde se ouede accessar
<<<<<<< HEAD
      host     : '192.168.1.11',           //THIS IS THE SAME FOR YOUR
      user     : 'root',               //THIS IS THE SAME FOR YOUR
<<<<<<< HEAD
      password : 'radames121',               //HERE GO YOUR PASSWORD TO ENTER IN YOUR DB
      database : 'Inter Reservation'            //HERE GO THE DATABASE THAT WE ARE GONNA USED
=======
      password : 'robolab',            //HERE GO YOUR PASSWORD TO ENTER IN YOUR DB
      database : 'InterReservations'    //HERE GO THE DATABASE THAT WE ARE GONNA USED
>>>>>>> e1da8a17152f3d6288f5be9089c4e9a6ef327d03
    })
=======
      host     : 'localhost',  //THIS IS THE SAME FOR YOUR
      user     : 'root',      //THIS IS THE SAME FOR YOUR
      password : pass,        //HERE GO YOUR PASSWORD TO ENTER IN YOUR DB
      database : 'DB_project_Reservation_Appoitment'   //HERE GO THE DATABASE THAT WE ARE GONNA USED
  })
>>>>>>> da18e9c37ff14a7530eca72572db00552d0ddde8
};

//parte de node js que deja que esta funcion
//se pueda utilizar en otro codigo
module.exports = config;
