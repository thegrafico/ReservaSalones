//--------------ESTOS SON IMPORTS, COMO EN JAVA
var createError   = require('http-errors'); //es para cuando quieres generar un error
var express       = require('express');     //import packets from nodejs-npm
var path          = require('path');        //para que su pueda mandejar las localizaciones de los files en la compu
var cookieParser  = require('cookie-parser');// para guardar cookies, datos del usuario
var logger        = require('morgan');      //Lib de Microsoft para que el usuario se quede logged in
require('dotenv').config();                 // Esto lo necesitan todas las aplicaciones que tengan autentificacin de Microsoft
// estas son las rutas del web, hace referencias a las carpetas que ya tenemos
var loginRoute        = require('./routes/login');//saves path to login js in routes folder
var adminRoute        = require('./routes/admin');// '' admin js in routes folder
var indexRouter       = require('./routes/index');
var authorize         = require('./routes/authorize');
var reservationRouter = require('./routes/reservation');
var profListRouter = require('./routes/STUD_APP_HUB_PT1');//saves path to the js file that will administrate the profesor selection window
var appointment = require ('./routes/STUD_APP_HUB_PT2');//Saves pathto the js file that will manage appoinment selection
var professorRouter   = require('./routes/profHome');
var profAppointmentRouter = require('./routes/profAppointment');

var bodyParser        = require('body-parser');
var flash						  = require("connect-flash");
// var db                = require("./helpers/mysqlConnection").mysql_pool; //pool connection

//-------------END IMPORTS
// specify which port it is going to run in
var port = 3000;
//ESTO ES LO QUE NOS PERMITE USER EL SERVIDOR
var app = express();  //se usa solamente en app

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

//AQUI ESTAN NUESTRAS RUTAS WEB, o sea las crea y llama a los
//"middleware"
app.use("/", loginRoute);
app.use('/home', indexRouter);
app.use("/home/reservation", reservationRouter);
app.use("/home/appointment", profListRouter);
app.use('/professor-home', professorRouter);
app.use('/professor-home/view-appointment', profAppointmentRouter);
app.use('/authorize', authorize);

app.use("/", adminRoute);

//
// //PAGE NOT FOUND ERROR catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });


//EXPORTAMOS TODAS LAS FUNCIONALIDADES PARA USARLA CUANDO INICIEMOS EL APP
app.listen(port, process.env.IP, function(){
	console.log("Server Init on port 3000");
	console.log("http://localhost:3000");
});
app.timeout = 120000;
