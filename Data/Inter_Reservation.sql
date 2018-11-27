
/* Deletes Table if it already exists */

drop table if exists Building;
drop table if exists Room;
drop table if exists User;
drop table if exists Profesor;
drop table if exists Appointment;
drop table if exists Reservation;
drop table if exists Admin;
drop table if exists ReservationRequest;

/* Creating the Tables*/

create table Building(buildingName varchar(10), roomID varchar(10));
create table Room(roomID varchar(10), capacity int, description varchar(255), hourAvailabile varchar(10));
create table Users(emailID varchar(30), userName varchar(15));
create table Professor(profesorEmail varchar(30), profName varchar(15), descripcion varchar(255));
create table ProfHour(profesorEmail varchar(30), day , hour varchar(10));
create table Appointment(emailID varchar(30), profesorEmail varchar(30), appHour varchar(15), fecha date, appointmentID varchar(10));
create table Reservation(emailID varchar(30), roomID varchar(10), revHour varchar(10), fecha date, reservationID varchar(10));
create table Admin(emailID varchar(30), adminName varchar(20));
create table ReservationRequest(emailID varchar(30), reservationID varchar(10), desicionRS boolean);
create table AppointmentRequest(emailID varchar(30), appointmentID varchar(10), desicionAP boolean);

/* Entering data to Building */

/* Building F */

insert into Building values('F', 'F104');
insert into Building values('F', 'F102B');
insert into Building values('F', 'F219');
insert into Building values('F', 'F210');
insert into Building values('F', 'F210A');
insert into Building values('F', 'F210B');
insert into Building values('F', 'F209');

/* Building E*/

insert into Building values('E', 'E249A');
insert into Building values('E', 'E249B');
insert into Building values('E', 'E230');
insert into Building values('E', 'E231');
insert into Building values('E', 'E240');

/* Building C */

insert into Building values('C', 'C001');
insert into Building values('C', 'C002');
insert into Building values('C', 'C003');
insert into Building values('C', 'C004');
insert into Building values('C', 'C005');
insert into Building values('C', 'B224');
insert into Building values('C', 'B225');
insert into Building values('C', 'B230');

/* Building G */

insert into Building values('G', 'G240');
insert into Building values('G', 'G247');
insert into Building values('G', 'G120');
insert into Building values('G', 'G124');
insert into Building values('G', 'G130');
insert into Building values('G', 'G246');

/* Entering data to Room */

/* Building F */ 

insert into Room values('F104', 20, 'TV || Computers', 'g');
insert into Room values('F102B', 20, 'TV || Computers', 'efg');
insert into Room values('F219', 25, 'TV || Computers', 'hi');
insert into Room values('F210', 30, 'TV || Computers', 'hi');
insert into Room values('F210A', 30, 'TV || Computers', 'gh');
insert into Room values('F210B', 30, 'TV || Computers', 'gh');
insert into Room values('F209', 20, 'TV || Computers', 'cd');

/* Buidling E */

insert into Room values('E249A', 20, 'TV', 'ef');
insert into Room values('E249B', 20, 'TV', 'hi');
insert into Room values('E230', 15, 'TV', 'i');
insert into Room values('E231', 25, 'TV', 'i');
insert into Room values('E240', 30, 'TV', 'i');

/* Building C */

insert into Room values('C001', 5, 'Board', 'abcdefghi');
insert into Room values('C002', 5, 'Board', 'abcdefghi');
insert into Room values('C003', 5, 'Board', 'abcdefghi');
insert into Room values('C004', 5, 'Board', 'abcdefghi');
insert into Room values('C005', 5, 'Board', 'abcdefghi');
insert into Room values('B224', 25, 'TV || Projector', 'abcdefghi');
insert into Room values('B225', 30, 'TV || Projector', 'abcdefghi');
insert into Room values('B230', 35, 'TV || Projector', 'abcdefghi');

/* Building G */

insert into Room values('G240', 40, 'TV || Projector', 'ghi');
insert into Room values('G247', 20, 'TV || Computers', 'edf');
insert into Room values('G120', 25, 'TV || Computers', 'cd');
insert into Room values('G124', 25, 'TV || Computers', 'fgh');
insert into Room values('G130', 30, 'TV || Computers', 'hi');
insert into Room values('G246', 25, 'TV || Computers', 'efg');



/* Entering data to Professor */

insert into Professor values('Wilson Lozano', 'wlozano@inter.bayamon.edu', 'Computer Engineer Professor');
insert into Professor values('Jaime Yeckle', 'jyeckle@inter.bayamon.edu', 'Computer Engineer Professor');


/* Entering data to ProfHour */

insert into ProfHour values('wlozano@inter.bayamon.edu', 'Mon', 'ade');
insert into ProfHour values('wlozano@inter.bayamon.edu', 'Tue', 'dcf');
insert into ProfHour values('wlozano@inter.bayamon.edu', 'Wed', 'ade');
insert into ProfHour values('wlozano@inter.bayamon.edu', 'Thu', 'dcf');
insert into ProfHour values('jyeckle@inter.bayamon.edu', 'Mon', 'ade');
insert into ProfHour values('jyeckle@inter.bayamon.edu', 'Tue', 'dcf');
insert into ProfHour values('jyeckle@inter.bayamon.edu', 'Wed', 'ade');
insert into ProfHour values('jyeckle@inter.bayamon.edu', 'Thu', 'dcf');

/* Entering data to Appointment */



/* Entering data to Reservation */



/* Entering data to Admin */



/* Entering data to ReservationRequest */


