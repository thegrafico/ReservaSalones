//--------------ESTOS SON IMPORTS, COMO EN JAVA
var createError       = require('http-errors');
var express           = require('express');
var path              = require('path');
var cookieParser      = require('cookie-parser');
var logger            = require('morgan');
require('dotenv').config();
var loginRoute        = require('./routes/login');
var adminRoute        = require('./routes/admin');
var indexRouter       = require('./routes/index');
var authorize         = require('./routes/authorize');
var reservationRouter = require('./routes/reservation');
var studAppHubPT1			= require('./routes/STUD_APP_HUB_PT1');																										// I Was Here Biatch
var studAppHubPT2 		= require('./routes/STUD_APP_HUB_PT2');
var profHome					= require('./routes/profHome');
var admin							= require('./routes/admin');
var bodyParser        = require('body-parser');
var flash						  = require("connect-flash");
var db                = require("./helpers/mysqlConnection").mysql_pool; //pool connection

// Port Variable
var port = 3000;

//-------------END IMPORTS

//ESTO ES LO QUE NOS PERMITE USER EL SERVIDOR
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

//to use hbs
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//to use flash message
app.use(flash());

app.use(require("express-session")({
	secret: "Thegrafico is a cool guy",
	resave: false,
	saveUninitialized: false
}));

//this is a midleware tha run in every route.
// app.use(function(req, res, next){
//   db.getConnection(function(err, connection) {
//     if (err){
//       console.log(err);
//       res.sendStatus(500);
//       return;
//     }
//     connection.query('SELECT * FROM  admin', function (error, results, fields) {
//       if (error){
//         console.log(err);
//         res.sendStatus(500);
//         return;
//       }
//       connection.release();
//       res.locals.CurrentUser =  results;
//       res.locals.error = req.flash("error"); //error mesage go red
//       res.locals.success = req.flash("success"); //success message go green
//       //move to the next function
//       next();
//     });
//   });
// });

//AQUI ESTAN NUESTRAS RUTAS WEB, HASTA AHORA SOLO HAY 2 CREADAS
app.use("/", loginRoute);
app.use('/home', indexRouter);
app.use("/home/reservation", reservationRouter)
app.use('/authorize', authorize);
app.use("/", adminRoute);
app.use('/home/appointment', studAppHubPT1);
app.use('/home/appointment/professor', studAppHubPT2);
app.use('/profHome', profHome);
app.use('/admin', admin);

//
// //PAGE NOT FOUND ERROR catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });


//EXPORTAMOS TODAS LAS FUNCIONALIDADES PARA USARLA CUANDO INICIEMOS EL APP
app.listen(port, process.env.IP, function(){
	console.log("Server Init on port " + port);
});

app.timeout = 120000;
