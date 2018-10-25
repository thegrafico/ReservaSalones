//
// var passFormySql = require('./passmySql');

//--------------ESTOS SON IMPORTS, COMO EN JAVA
var createError   = require('http-errors');
var express       = require('express');
var path          = require('path');
var cookieParser  = require('cookie-parser');
var logger        = require('morgan');
require('dotenv').config();
var loginRoute    = require('./routes/login');
var indexRouter   = require('./routes/index');
var authorize     = require('./routes/authorize');
// var sql           = require('mysql');
//-------------END IMPORTS
//var usersRouter = require('./routes/users');

//ESTO ES LO QUE NOS PERMITE USER EL SERVIDOR
var app = express();

// //--------TESTING DATABASE
// var connection = sql.createConnection({
// host     : 'localhost',  //THIS IS THE SAME FOR YOUR
// user     : 'root',      //THIS IS THE SAME FOR YOUR
// password : passFormySql,        //HERE GO YOUR PASSWORD TO ENTER IN YOUR DB
// database : 'COEN4420'   //HERE GO THE DATABASE THAT WE ARE GONNA USED
// });
//
// connection.connect();
//
// connection.query('SELECT * FROM Apply', function (error, results, fields) {
//   if (error) throw error;
//
//   for (var i = 0; i < results.length; i++) {
//     console.log('The solution is: ', results[i]);
//   }
// });
//
// connection.end();
// //--------END TESTING


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//AQUI ESTAN NUESTRAS RUTAS WEB, HASTA AHORA SOLO HAY 2 CREADAS
app.use("/", loginRoute);
app.use('/home', indexRouter);
app.use('/authorize', authorize);

//PAGE NOT FOUND ERROR catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//EXPORTAMOS TODAS LAS FUNCIONALIDADES PARA USARLA CUANDO INICIEMOS EL APP
module.exports = app;
