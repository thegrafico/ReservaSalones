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
var reservationRouter = require('./routes/reservation');
var bodyParser = require('body-parser');

var db = require("./helpers/mysqlConnection").mysql_pool;

//-------------END IMPORTS

//ESTO ES LO QUE NOS PERMITE USER EL SERVIDOR
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//this is a midleware tha run in every route.
app.use(function(req, res, next){

  db.getConnection(function(err, connection) {
    if (err) throw err;
    connection.query('SELECT * FROM  admin', function (error, results, fields) {
      if(results != undefined)
      res.cookie('admini', results, {maxAge: 3600000, httpOnly: true});
    });
  });
	//move to the next function
	next();
});

//AQUI ESTAN NUESTRAS RUTAS WEB, HASTA AHORA SOLO HAY 2 CREADAS
app.use("/", loginRoute);
app.use('/home', indexRouter);
app.use("/home/reservation", reservationRouter)
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
