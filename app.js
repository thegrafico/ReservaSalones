/* === All of the Imports === */
require('dotenv').config();
var createError       = require('http-errors');
var express           = require('express');
var path              = require('path');
var cookieParser      = require('cookie-parser');
var logger            = require('morgan');
var bodyParser        = require('body-parser');
var flash						  = require("connect-flash");
var db                = require("./helpers/mysqlConnection").mysql_pool; //pool connection
/* === END IMPORTS === */

/* ==== All of the Route pages === */
var loginRoute        = require('./routes/login');							// Login route, this is where the  user is  greeted.
var authorize         = require('./routes/authorize');					// Microsoft authentication page.
var indexStud         = require('./routes/indexStud');					// Index route, this route takes us to the student decision page.
var reservationRouter = require('./routes/reservation');				// Reservation route, takes the user to the Room Reservation Hub.
var studAppHubPT1			= require('./routes/STUD_APP_HUB_PT1');		// Student Appointment Hub Pt 1, Which Professor.
var studAppHubPT2 		= require('./routes/STUD_APP_HUB_PT2');		// Student Appointment Hub Pt 2, Shows Professor choosen hours.
var indexProf					= require('./routes/indexProf');					// Professor Home, this page displays students request and appoints already accepted.
var profAppointment 	= require('./routes/profAppointment');		//
var reservationAdmin	= require('./routes/reservationAdmin');							// Admin Home, this pages displays any room reservation.
var indexAdmin			  = require('./routes/indexAdmin');
var AddEdit           = require('./routes/AddEdit');
var addRoom						= require('./routes/addRoom');
var editRoom					= require('./routes/editRoom');
/* === Routes End Here === */

/* === Port === */
var port = 3000;

/*=== This is what allows us to use the server.  ===*/
var app = express();

/* === VIEWS Engine === */
app.set('views', path.join(__dirname, 'views'));

/* === Allows us to use the .hbs file type. === */
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* === Flash Message === */
app.use(flash());

/* === All of the Routes. === */
app.use("/", loginRoute);
app.use('/home', indexStud);
app.use("/home/reservation", reservationRouter)
app.use('/authorize', authorize);
app.use('/home/appointment', studAppHubPT1);
app.use('/home/appointment', studAppHubPT2);
app.use('/profHome', indexProf);
app.use('/profHome/Appointments', profAppointment);
app.use('/adminHome/Reservations', reservationAdmin);
app.use('/adminHome', indexAdmin);
app.use('/adminHome/addEdit', AddEdit);
app.use('/adminHome/addEdit/addRoom', addRoom);
app.use('/adminHome/addEdit/editRoom', editRoom);

// //PAGE NOT FOUND ERROR catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

/* === Export all of the functionality. === */
app.listen(port, process.env.IP, function(){
	console.log("Server Init on port " + port);
});
