/* Deletes Table if it already exists */

drop table if exists Roles;
drop table if exists Users;
drop table if exists Rooms;
drop table if exists Department;
drop table if exists ProfHours;
drop table if exists Reservation;
drop table if exists Appointment;
drop table if exists RoomHours;
drop table if exists ResDecline;
drop table if exists AppDecline;
drop table if exists UserRoles;
drop table if exists DeptManagers;

/* Creating the Tables*/

create table Roles(roleID varchar(10), role varchar(15), Primary key(roleID));
create table Users(userID MediumInt NOT NULL auto_increment, name varchar(30) NOT NULL, email varchar(30) NOT NULL, Primary Key(userID));
create table Rooms(roomID varchar(10), capacity tinyInt, deptID tinyInt, Primary key(roomID, deptID));
create table Department(deptID tinyInt NOT NULL auto_increment, deptName varchar(50), Primary Key(deptID));
create table ProfHours(profHoursID mediumInt NOT NULL auto_increment, userID mediumInt, start time, end time, day varchar(10), description varchar(255), Primary key(profHoursID));
create table Reservation(resID mediumInt NOT NULL auto_increment, userID mediumInt, start time, end time, date varchar(30), status varchar(10), roomID varchar(10), description varchar(255), Primary Key(resID));
create table Appointment(appID mediumInt NOT NULL auto_increment, userID mediumInt, start time, end time, date varchar(30), status varchar(10), profID varchar(10), description varchar(255), Primary Key(appID));
create table RoomHours(roomHoursID mediumInt NOT NULL auto_increment, roomID varchar(10), start time, end time, day varchar(10), description varchar(255), primary key(roomHoursID));                                          /*Hours Not Available*/
create table ResDecline(resID mediumInt NOT NULL, userID mediumInt, start time, end time, date date, status varchar(10), roomID varchar(10), description varchar(255), Primary Key(resID));
create table AppDecline(appID mediumInt NOT NULL, userID mediumInt, start time, end time, date date, status varchar(10), profID varchar(10), description varchar(255), Primary Key(appID));
create table UserRoles(userID mediumInt, roleID varchar(10), Primary key(userID, roleID));
create table DeptManagers(userID mediumInt, deptID tinyInt, Primary Key(userID, deptID));

/* === Entering data to Roles === */

insert into Roles values('A', 'Admin');                                                                            /* Can add people to the database and change roles*/
insert into Roles values('S', 'Secretary');
insert into Roles values('D', 'Director');
insert into Roles values('P', 'Professor');

/* === Entering data to Users === */

insert into Users values( 1, 'Theresa Lopez', 'tlopez@bayamon.inter.edu');
insert into Users values( 2, 'Wilson Lozano', 'wlozano@interbayamon.edu');
insert into Users values( 3, 'Omar Meza Castillo', 'omeza@bayamon.inter.edu');
insert into Users values( 4, 'Heriberto Barriera Viruet', 'hbarriera@bayamon.inter.edu');
insert into Users values( 5, 'Miguel A. Muniz Perea', 'mmuniz@bayamon.inter.edu');
insert into Users values( 6, 'Otoniel Diaz Nevarez', 'odiaz@bayamon.inter.edu');
insert into Users values( 7, 'Francisco C. Parra Rojas', 'fparra@bayamon.inter.edu');
insert into Users values( 8, 'Ruben Flores', 'rflores@bayamon.inter.edu');
insert into Users values( 9, 'Amilcar Rincon Charris', 'arincon@bayamon.inter.edu');
insert into Users values( 10, 'Caroline Gonzalez Rivera', 'cgonzalezr@bayamon.inter.edu');
insert into Users values( 11, 'Rafael Salgado Mangual', 'rsalgado@bayamon.inter.edu');
insert into Users values( 12, 'Eduardo Lay Lay', 'elay@bayamon.inter.edu');
insert into Users values( 13, 'Nedim Vardar Ergin', 'nvardar@bayamon.inter.edu');
insert into Users values( 14, 'Jaime Yeckle Sanchez', 'jyeckle@bayamon.inter.edu');
insert into Users values( 15, 'Eduardo Perez Diaz', 'eperezd@bayamon.inter.edu');
insert into Users values( 16, 'Catherine Aguilar Ramos','caguilar@bayamon.inter.edu');
insert into Users values( 17, 'Javier Quintana Mendez', 'jquintana@bayamon.inter.edu');

/* Example of adding Users */
/*
insert into Users (name, email) values('Name', 'email@interbayamon.edu');
*/

/* === Entering data to Rooms === */

/* Department F First Floor*/

insert into Rooms values('F102B', 30, '4');
insert into Rooms values('F104', 30, '4');

/* Department F Second Floor*/

insert into Rooms values('F201A', 30,'4');
insert into Rooms values('F201B', 30,'4');
insert into Rooms values('F203', 30, '4');
insert into Rooms values('F209', 30,'4');
insert into Rooms values('F210', 30,'4');
insert into Rooms values('F214', 30, '4');
insert into Rooms values('F219', 30,'4');

/* Department G First Floor */

insert into Rooms values('G120', 25, '1');
insert into Rooms values('G121', 25, '2');
insert into Rooms values('G123', 25, '3');
insert into Rooms values('G126', 25, '3');
insert into Rooms values('G141A', 25, '2');
insert into Rooms values('G141B', 25, '1');
insert into Rooms values('G142A', 25, '3');
insert into Rooms values('G142B', 25, '3');
insert into Rooms values('G143', 25, '3');
insert into Rooms values('G148', 25, '3');
insert into Rooms values('G149', 25, '1');
insert into Rooms values('G149', 25, '2');
insert into Rooms values('G149', 25, '3');

/* Department G Second Floor*/

insert into Rooms values('G220', 25, '2');
insert into Rooms values('G224', 25, '2');
insert into Rooms values('G225A', 25, '1');
insert into Rooms values('G225B', 25, '1');
insert into Rooms values('G227', 25, '1');
insert into Rooms values('G240', 25, '1');
insert into Rooms values('G240', 25, '2');
insert into Rooms values('G240', 25, '3');
insert into Rooms values('G247A', 25, '1');
insert into Rooms values('G247B', 25, '1');

/* === Entering data to ProfHours === */
/* = Available Hours = */

insert into ProfHours (userID, start, end, day, description) values(2, null, null, 'Mon', 'Normal Hours'),
                                                                   (2, null, null, 'Wed', 'Normal Hours'),
                                                                   (2, null, null, 'Fri', 'Normal Hours'),
                                                                   (2, '11:00:00', '11:30:00', 'Tue', 'Normal Hours'),             /*Wilson*/
                                                                   (2, '11:30:00', '12:00:00', 'Tue', 'Normal Hours'),             /*Wilson*/
                                                                   (2, '13:00:00', '13:30:00', 'Tue', 'Normal Hours'),             /*Wilson*/
                                                                   (2, '13:30:00', '14:00:00', 'Tue', 'Normal Hours'),             /*Wilson*/
                                                                   (2, '14:00:00', '14:30:00', 'Tue', 'Normal Hours'),             /*Wilson*/
                                                                   (2, '14:30:00', '15:00:00', 'Tue', 'Normal Hours'),             /*Wilson*/
                                                                   (2, '11:00:00', '12:00:00', 'Thu', 'Normal Hours'),             /*Wilson*/
                                                                   (2, '11:00:00', '11:30:00', 'Thu', 'Normal Hours'),             /*Wilson*/
                                                                   (2, '11:30:00', '12:00:00', 'Thu', 'Normal Hours'),             /*Wilson*/
                                                                   (2, '13:00:00', '15:00:00', 'Thu', 'Normal Hours'),             /*Wilson*/
                                                                   (2, '13:00:00', '13:30:00', 'Thu', 'Normal Hours'),             /*Wilson*/
                                                                   (2, '13:30:00', '14:00:00', 'Thu', 'Normal Hours'),             /*Wilson*/
                                                                   (2, '14:00:00', '14:30:00', 'Thu', 'Normal Hours'),             /*Wilson*/
                                                                   (2, '14:30:00', '15:00:00', 'Thu', 'Normal Hours');             /*Wilson*/


insert into ProfHours (userID, start, end, day, description) values(3, null, null, 'Tue', 'Normal Hours'),
                                                                   (3, null, null, 'Thu', 'Normal Hours'),
                                                                   (3, null, null, 'Fri', 'Normal Hours'),
                                                                   (3, '10:00:00', '10:30:00', 'Mon', 'Normal Hours'),             /*Omar Meza*/
                                                                   (3, '10:30:00', '11:00:00', 'Mon', 'Normal Hours'),             /*Omar Meza*/
                                                                   (3, '11:00:00', '11:30:00', 'Mon', 'Normal Hours'),             /*Omar Meza*/
                                                                   (3, '11:30:00', '12:00:00', 'Mon', 'Normal Hours'),             /*Omar Meza*/
                                                                   (3, '10:00:00', '10:30:00', 'Wed', 'Normal Hours'),             /*Omar Meza*/
                                                                   (3, '10:30:00', '11:00:00', 'Wed', 'Normal Hours'),             /*Omar Meza*/
                                                                   (3, '11:00:00', '11:30:00', 'Wed', 'Normal Hours'),             /*Omar Meza*/
                                                                   (3, '11:30:00', '12:00:00', 'Wed', 'Normal Hours');             /*Omar Meza*/

insert into ProfHours (userID, start, end, day, description) values(4, null, null, 'Mon', 'Normal Hours'),
                                                                   (4, null, null, 'Tue', 'Normal Hours'),
                                                                   (4, null, null, 'Fri', 'Normal Hours'),
                                                                   (4, '10:00:00', '10:30:00', 'Tue', 'Normal Hours'),             /*Heriberto*/
                                                                   (4, '10:30:00', '11:00:00', 'Tue', 'Normal Hours'),             /*Heriberto*/
                                                                   (4, '11:00:00', '11:30:00', 'Tue', 'Normal Hours'),             /*Heriberto*/
                                                                   (4, '11:30:00', '12:00:00', 'Tue', 'Normal Hours'),             /*Heriberto*/
                                                                   (4, '12:00:00', '12:30:00', 'Tue', 'Normal Hours'),             /*Heriberto*/
                                                                   (4, '12:30:00', '13:00:00', 'Tue', 'Normal Hours'),             /*Heriberto*/
                                                                   (4, '11:00:00', '11:30:00', 'Wed', 'Normal Hours'),             /*Heriberto*/
                                                                   (4, '11:30:00', '12:00:00', 'Wed', 'Normal Hours'),             /*Heriberto*/
                                                                   (4, '12:00:00', '12:30:00', 'Wed', 'Normal Hours'),             /*Heriberto*/
                                                                   (4, '12:30:00', '13:00:00', 'Wed', 'Normal Hours'),             /*Heriberto*/
                                                                   (4, '13:00:00', '13:30:00', 'Wed', 'Normal Hours'),             /*Heriberto*/
                                                                   (4, '13:30:00', '14:00:00', 'Wed', 'Normal Hours');             /*Heriberto*/

insert into ProfHours (userID, start, end, day, description) values(5, null, null, 'Wed', 'Normal Hours'),
                                                                   (5, null, null, 'Fri', 'Normal Hours'),
                                                                   (5, null, null, 'Thu', 'Normal Hours'),
                                                                   (5, '14:00:00', '14:30:00', 'Mon', 'Normal Hours'),             /*Muniz*/
                                                                   (5, '14:30:00', '15:00:00', 'Mon', 'Normal Hours'),             /*Muniz*/
                                                                   (5, '10:00:00', '10:30:00', 'Tue', 'Normal Hours'),             /*Muniz*/
                                                                   (5, '10:30:00', '11:00:00', 'Tue', 'Normal Hours'),             /*Muniz*/
                                                                   (5, '11:00:00', '11:30:00', 'Tue', 'Normal Hours');             /*Muniz*/

insert into ProfHours (userID, start, end, day, description) values(6, null, null, 'Mon', 'Normal Hours'),
                                                                   (6, null, null, 'Tue', 'Normal Hours'),
                                                                   (6, null, null, 'Wed', 'Normal Hours'),
                                                                   (6, null, null, 'Fri', 'Normal Hours'),
                                                                   (6, '10:00:00', '10:30:00', 'Thu', 'Normal Hours'),             /*Otoniel Diaz*/
                                                                   (6, '10:30:00', '11:00:00', 'Thu', 'Normal Hours'),             /*Otoniel Diaz*/
                                                                   (6, '11:00:00', '11:30:00', 'Thu', 'Normal Hours');             /*Otoniel Diaz*/

insert into ProfHours (userID, start, end, day, description) values(7, null, null, 'Mon', 'Normal Hours'),
                                                                   (7, null, null, 'Tue', 'Normal Hours'),
                                                                   (7, null, null, 'Thu', 'Normal Hours'),
                                                                   (7, null, null, 'Fri', 'Normal Hours'),
                                                                   (7, '10:00:00', '10:30:00', 'Wed', 'Normal Hours'),             /*Francisco Parra*/
                                                                   (7, '10:30:00', '11:00:00', 'Wed', 'Normal Hours');

insert into ProfHours (userID, start, end, day, description) values(8, null, null, 'Fri', 'Normal Hours'),
                                                                   (8, '13:50:00', '14:20:00', 'Mon', 'Normal Hours'),             /* Ruben Flores*/
                                                                   (8, '14:20:00', '14:50:00', 'Mon', 'Normal Hours'),
                                                                   (8, '13:50:00', '14:20:00', 'Tue', 'Normal Hours'),             /* Ruben Flores*/
                                                                   (8, '14:20:00', '14:50:00', 'Tue', 'Normal Hours'),
                                                                   (8, '10:30:00', '11:00:00', 'Tue', 'Normal Hours'),             /* Ruben Flores*/
                                                                   (8, '11:00:00', '11:30:00', 'Tue', 'Normal Hours'),
                                                                   (8, '10:30:00', '11:00:00', 'Wed', 'Normal Hours'),             /* Ruben Flores*/
                                                                   (8, '11:00:00', '11:30:00', 'Wed', 'Normal Hours'),
                                                                   (8, '10:30:00', '11:00:00', 'Thu', 'Normal Hours'),
                                                                   (8, '11:00:00', '11:30:00', 'Thu', 'Normal Hours');             /* Ruben Flores*/

insert into ProfHours (userID, start, end, day, description) values(9, null, null, 'Mon', 'Normal Hours'),
                                                                   (9, null, null, 'Wed', 'Normal Hours'),
                                                                   (9, null, null, 'Fri', 'Normal Hours'),
                                                                   (9, '9:00:00', '9:30:00', 'Tue', 'Normal Hours'),                /*Amilcar*/
                                                                   (9, '10:00:00', '10:30:00', 'Tue', 'Normal Hours'),              /*Amilcar*/
                                                                   (9, '9:00:00', '9:30:00', 'Thu', 'Normal Hours'),                /*Amilcar*/
                                                                   (9, '10:00:00', '10:30:00', 'Thu', 'Normal Hours');              /*Amilcar*/

insert into ProfHours (userID, start, end, day, description) values(10, null, null, 'Fri', 'Normal Hours'),
                                                                   (10, '8:00:00', '8:30:00', 'Mon', 'Normal Hours'),              /*Caroline*/
                                                                   (10, '9:00:00', '9:30:00', 'Mon', 'Normal Hours'),              /*Caroline*/
                                                                   (10, '10:00:00', '10:30:00', 'Mon', 'Normal Hours'),            /*Caroline*/
                                                                   (10, '8:00:00', '8:30:00',  'Tue', 'Normal Hours'),             /*Caroline*/
                                                                   (10, '13:50:00','14:20:00','Tue', 'Normal Hours'),              /*Caroline*/
                                                                   (10, '14:20:00','14:50:00','Tue', 'Normal Hours'),              /*Caroline*/
                                                                   (10, '8:00:00', '8:30:00',  'Wed', 'Normal Hours'),             /*Caroline*/
                                                                   (10, '13:50:00','14:20:00','Wed', 'Normal Hours'),              /*Caroline*/
                                                                   (10, '14:20:00','14:50:00','Wed', 'Normal Hours'),              /*Caroline*/
                                                                   (10, '8:00:00', '8:30:00', 'Thu', 'Normal Hours');              /*Caroline*/


insert into ProfHours (userID, start, end, day, description) values(11, null, null, 'Tue', 'Normal Hours'),
                                                                   (11, null, null, 'Thu', 'Normal Hours'),
                                                                   (11, '9:00:00', '9:30:00', 'Mon', 'Normal Hours'),              /*Rafael Salgado*/
                                                                   (11, '9:30:00', '10:00:00', 'Mon', 'Normal Hours'),             /*Rafael Salgado*/
                                                                   (11, '9:00:00', '9:30:00', 'Wed', 'Normal Hours'),              /*Rafael Salgado*/
                                                                   (11, '9:30:00', '10:00:00', 'Wed', 'Normal Hours'),             /*Rafael Salgado*/
                                                                   (11, '16:00:00', '16:30:00', 'Mon', 'Normal Hours'),            /*Rafael Salgado*/
                                                                   (11, '16:30:00', '17:00:00', 'Mon', 'Normal Hours'),            /*Rafael Salgado*/
                                                                   (11, '16:00:00', '16:30:00', 'Wed', 'Normal Hours'),            /*Rafael Salgado*/
                                                                   (11, '16:30:00', '17:00:00', 'Wed', 'Normal Hours'),            /*Rafael Salgado*/
                                                                   (11, '10:00:00', '10:30:00', 'Fri', 'Normal Hours'),            /*Rafael Salgado*/
                                                                   (11, '10:30:00', '11:00:00', 'Fri', 'Normal Hours');            /*Rafael Salgado*/

insert into ProfHours (userID, start, end, day, description) values(12,'9:00:00', '9:30:00', 'Mon', 'Normal Hours'),               /*Eduardo Lay*/
                                                                   (12,'9:30:00', '10:00:00', 'Mon', 'Normal Hours'),              /*Eduardo Lay*/
                                                                   (12, '13:00:00', '13:30:00', 'Tue', 'Normal Hours'),            /*Eduardo Lay*/
                                                                   (12, '13:30:00', '14:00:00', 'Tue', 'Normal Hours'),            /*Eduardo Lay*/
                                                                   (12, '11:30:00', '12:00:00', 'Wed', 'Normal Hours'),            /*Eduardo Lay*/
                                                                   (12, '12:00:00', '12:30:00', 'Wed', 'Normal Hours'),            /*Eduardo Lay*/
                                                                   (12, '10:00:00', '11:00:00', 'Thu', 'Normal Hours'),            /*Eduardo Lay*/
                                                                   (12, '10:00:00', '10:30:00', 'Thu', 'Normal Hours'),            /*Eduardo Lay*/
                                                                   (12, '12:00:00', '12:30:00', 'Fri', 'Normal Hours');            /*Eduardo Lay*/

insert into ProfHours (userID, start, end, day, description) values(13, null, null, 'Mon', 'Normal Hours'),
                                                                   (13, null, null, 'Fri', 'Normal Hours'),
                                                                   (13, '10:00:00', '10:30:00', 'Tue', 'Normal Hours'),            /*Nedim Vardar*/
                                                                   (13, '10:30:00', '11:00:00', 'Tue', 'Normal Hours'),            /*Nedim Vardar*/
                                                                   (13, '14:30:00','15:00:00', 'Wed', 'Normal Hours'),             /*Nedim Vardar*/
                                                                   (13, '15:00:00','15:30:00', 'Wed', 'Normal Hours'),             /*Nedim Vardar*/
                                                                   (13, '13:00:00', '13:30:00', 'Thu', 'Normal Hours'),            /*Nedim Vardar*/
                                                                   (13, '14:00:00', '14:30:00', 'Thu', 'Normal Hours'),            /*Nedim Vardar*/
                                                                   (13, '14:30:00', '15:00:00', 'Thu', 'Normal Hours');            /*Nedim Vardar*/

insert into ProfHours (userID, start, end, day, description) values(14, null, null, 'Mon', 'Normal Hours'),
                                                                   (14, null, null, 'Fri', 'Normal Hours'),
                                                                   (14, '8:00:00', '8:30:00', 'Tue', 'Normal Hours'),              /*Jaime Yeckle*/
                                                                   (14, '10:10:00', '10:40:00', 'Tue', 'Normal Hours'),            /*Jaime Yeckle*/
                                                                   (14, '11:10:00', '11:30:00', 'Tue', 'Normal Hours'),            /*Jaime Yeckle*/
                                                                   (14, '13:00:00', '13:30:00', 'Wed', 'Normal Hours'),            /*Jaime Yeckle*/
                                                                   (14, '14:00:00', '14:30:00', 'Wed', 'Normal Hours'),            /*Jaime Yeckle*/
                                                                   (14, '14:30:00', '15:00:00', 'Wed', 'Normal Hours'),            /*Jaime Yeckle*/
                                                                   (14, '8:00:00', '8:30:00', 'Thu', 'Normal Hours'),              /*Jaime Yeckle*/
                                                                   (14, '11:00:00', '11:40:00', 'Thu', 'Normal Hours');	           /*Jaime Yeckle*/

/* === Entering data to RoomHours === */
/* = NOT Available Hours =*/


/* Department F First Floor*/

insert into RoomHours (roomID, start, end, day, description) values('F102B', '8:00:00', '15:00:00', 'all', 'Class');
insert into RoomHours (roomID, start, end, day, description) values('F104', '8:00:00', '15:00:00', 'all', 'Class');

/* Department F Second Floor*/

insert into RoomHours (roomID, start, end, day, description) values('F201A', '8:00:00', '15:00:00', 'all', 'Class');
insert into RoomHours (roomID, start, end, day, description) values('F201B', '8:00:00', '15:00:00', 'all', 'Class');
insert into RoomHours (roomID, start, end, day, description) values('F203', '8:30:00', '11:20:00', 'Mon', 'Class: ENGR 2130, Prof: Roman Lopez'),
                                                                   ('F203', '13:00:00', '14:20:00', 'Mon', 'Class: LAB-MECN 3250, Prof: Eduardo Lay'),
                                                                   ('F203', '8:30:00', '9:20:00', 'Tue', 'Class: MECN 4110, Prof: Omar Meza'),
                                                                   ('F203', '9:30:00', '11:20:00', 'Tue', 'Class: LAB-MECN 4110, Prof: Omar Meza'),
                                                                   ('F203', '10:30:00', '11:50:00', 'Tue', 'Class: MECN 4610, Prof: Amilcar Rincon'),
                                                                   ('F203', '12:00:00', '13:50:00', 'Tue', 'Class: LAB-ELEN 3420, Prof: Ruben Flores'),
                                                                   ('F203', '14:30:00', '15:20:00', 'Tue', 'Class: LAB-MECN 4100, Prof: Eduardo Lay'),
                                                                   ('F203', '15:30:00', '16:20:00', 'Tue', 'Class: MECN 4100, Prof: Eduardo Lay'),
                                                                   ('F203', '17:00:00', '17:50:00', 'Tue', 'Class: LAB-MECN 4100, Prof: Eduardo Lay'),
                                                                   ('F203', '18:00:00', '20:50:00', 'Tue', 'Class: ENGR 2130, Prof: Jose Gonzalez'),
                                                                   ('F203', '8:00:00', '9:50:00', 'Wed', 'Class: LAB-ENGR 1100, Prof: Omar Meza'),
                                                                   ('F203', '13:00:00', '14:20:00', 'Wed', 'Class: LAB-ENGR 1100, Prof: Omar Meza'),
                                                                   ('F203', '18:00:00', '21:50:00', 'Wed', 'Class: INEN 4512, Prof: Victor Mundo'),
                                                                   ('F203', '8:30:00', '9:20:00', 'Thu', 'Class: MECN 4110, Prof: Omar Meza'),
                                                                   ('F203', '9:30:00', '11:20:00', 'Thu', 'Class: LAB-MECN 4110, Prof: Omar Meza'),
                                                                   ('F203', '10:30:00', '11:50:00', 'Thu', 'Class: MECN 4610, Prof: Amilcar Rincon'),
                                                                   ('F203', '12:00:00', '13:50:00', 'Thu', 'Class: LAB-ENGR 1100, Prof: Omar Meza'),
                                                                   ('F203', '14:30:00', '15:20:00', 'Thu', 'Class: LAB-MECN 4100, Prof: Eduardo Lay'),
                                                                   ('F203', '15:30:00', '16:20:00', 'Thu', 'Class: MECN 4100, Prof: Eduardo Lay'),
                                                                   ('F203', '17:00:00', '17:50:00', 'Thu', 'Class: LAB-MECN 4100, Prof: Eduardo Lay'),
                                                                   ('F203', '18:00:00', '19:20:00', 'Thu', 'Class: COEN 2220, Prof: Jaime Jeckle'),
                                                                   ('F203', '19:30:00', '20:30:00', 'Thu', 'Class: LAB-COEN 2220, Prof: Jaime Jeckle'),
                                                                   ('F203', '9:00:00', '11:50:00', 'Fri', 'Class: MECN 4405, Prof: Eduardo Lay');
insert into RoomHours (roomID, start, end, day, description) values('F209', '8:00:00', '15:00:00', 'all', 'Class');
insert into RoomHours (roomID, start, end, day, description) values('F210', '8:00:00', '15:00:00', 'all', 'Class');
insert into RoomHours (roomID, start, end, day, description) values('F214', '13:00:00', '14:20:00', 'Thu', 'Class: ENGR 1200, Prof: Nedim Vardar');
insert into RoomHours (roomID, start, end, day, description) values('F219', '8:00:00', '15:00:00', 'all', 'Class');

/* Department G First Floor */

insert into RoomHours (roomID, start, end, day, description) values('G120', '8:30:00', '11:20:00', 'Mon', 'Class: ELEN 4351, Prof: Ruben Flores'),
                                                                   ('G120', '12:00:00', '14:50:00', 'Mon', 'Class: ELEN 3312, Prof: Caroline Gonzalez'),
                                                                   ('G120', '8:30:00', '11:20:00', 'Tue', 'Class: ELEN 3311, Prof: Caroline Gonzalez'),
                                                                   ('G120', '12:00:00', '14:20:00', 'Tue', 'Class: 3302, Prof: Roman Lopez'),
                                                                   ('G120', '18:00:00', '19:50:00', 'Tue', 'Class: ELEN 4376, Prof: Ricardo Carrion'),
                                                                   ('G120', '8:30:00', '11:20:00', 'Wed', 'Class: ELEN 3301, Prof: Caroline Gonzalez'),
                                                                   ('G120', '12:00:00', '14:50:00', 'Wed', 'Class: ELEN 3320, Prof: Andres Diaz'),
                                                                   ('G120', '13:00:00', '15:50:00', 'Thu', 'Class: ELEN 3302, Prof: Roman Lopez'),
                                                                   ('G120', '12:00:00', '14:50:00', 'Thu', 'Class: ELEN 3420, Prof: Ruben Flores'),
                                                                   ('G120', '18:00:00', '19:50:00', 'Thu', 'Class: ELEN 4376, Prof: Ricardo Carrion');
insert into RoomHours (roomID, start, end, day, description) values('G121', '10:00:00', '11:20:00', 'Mon', 'Class: ENGR 3300, Prof: Isvan Perez'),
                                                                   ('G121', '18:00:00', '20:50:00', 'Mon', 'Class: INEN 4560, Prof: Jose Lopez'),
                                                                   ('G121', '10:00:00', '11:50:00', 'Tue', 'Class: ENGR 1100, Prof: Miguel Cotto'),
                                                                   ('G121', '10:00:00', '11:20:00', 'Wed', 'Class: ENGR 3300, Prof: Isvan Perez'),
                                                                   ('G121', '10:00:00', '11:50:00', 'Thu', 'Class: ENGR 1100, Prof: Heriberto Barriera'),
                                                                   ('G121', '18:00:00', '21:50:00', 'Thu', 'Class: INEN 4959, Prof: Miguel Cotto');
insert into RoomHours (roomID, start, end, day, description) values('G123', '14:30:00', '15:20:00', 'Tue', 'Class: LAB-MECN 3110, Prof: Rafael Salgado'),
                                                                   ('G123', '14:30:00', '15:20:00', 'Thu', 'Class: LAB-MECN 3110, Prof: Rafael Salgado');
insert into RoomHours (roomID, start, end, day, description) values('G126', '10:30:00', '12:20:00', 'Mon', 'Class: LAB-MECN 3135, Prof: Otoniel Diaz'),
                                                                   ('G126', '10:30:00', '12:20:00', 'Wed', 'Class: LAB-MECN 3135, Prof: Otoniel Diaz');
insert into RoomHours (roomID, start, end, day, description) values('G141A', '8:00:00', '10:50:00', 'Tue', 'Class: INEN 4550, Prof: Segundo Castro'),
                                                                   ('G141A', '11:00:00', '10:20:00', 'Tue', 'Class: ENGR 1200, Prof: Nedim Vardar'),
                                                                   ('G141A', '13:00:00', '14:20:00', 'Tue', 'Class: ENGR 3200, Prof: Heriberto Barriera'),
                                                                   ('G141A', '15:00:00', '16:50:00', 'Tue', 'Class: INEN 3710, Prof: Heriberto Barriera'),
                                                                   ('G141A', '10:00:00', '12:50:00', 'Wed', 'Class: INEN 4810, Prof: Heriberto Barriera'),
                                                                   ('G141A', '11:00:00', '10:20:00', 'Thu', 'Class: ENGR 1200, Prof: Nedim Vardar'),
                                                                   ('G141A', '13:00:00', '14:20:00', 'Thu', 'Class: ENGR 3200, Prof: Heriberto Barriera'),
                                                                   ('G141A', '15:00:00', '16:50:00', 'Thu', 'Class: INEN 3710, Prof: Heriberto Barriera');
insert into RoomHours (roomID, start, end, day, description) values('G142A', '13:00:00', '14:20:00', 'Mon', 'Class: LAB-MECN 3250, Prof: Eduardo Lay'),
                                                                   ('G142A', '14:30:00', '15:50:00', 'Mon', 'Class: ENGR 2220, Prof: Eduardo Lay'),
                                                                   ('G142A', '10:30:00', '11:50:00', 'Tue', 'Class: ENGR 2220, Prof: Omar Meza'),
                                                                   ('G142A', '13:00:00', '14:20:00', 'Wed', 'Class: LAB-MECN 3250, Prof: Eduardo Lay'),
                                                                   ('G142A', '14:30:00', '15:50:00', 'Wed', 'Class: ENGR 2220, Prof: Eduardo Lay'),
                                                                   ('G142A', '10:30:00', '11:50:00', 'Thu', 'Class: ENGR 2220, Prof: Omar Meza'),
                                                                   ('G142A', '8:00:00', '11:00:00', 'Fri', 'Class, Prof: Omar Meza');
insert into RoomHours (roomID, start, end, day, description) values('G148', '8:00:00', '9:50:00', 'Mon', 'Class: ENGR 1100, Prof: Omar Meza'),
                                                                   ('G148', '10:00:00', '11:20:00', 'Mon', 'Class: MECN 3005, Prof: Rafael Salgado'),
                                                                   ('G148', '13:00:00', '14:20:00', 'Mon', 'Class: MECN 3600, Prof: Rafael Salgado'),
                                                                   ('G148', '14:30:00', '15:50:00', 'Mon', 'Class: MECN 4202, Prof: Rafael Salgado'),
                                                                   ('G148', '16:00:00', '17:20:00', 'Mon', 'Class: MECN 4122, Prof: Otoniel Diaz'),
                                                                   ('G148', '18:00:00', '20:50:00', 'Mon', 'Class: MECN 6210, Prof: Amilcar Rincon'),
                                                                   ('G148', '9:00:00', '10:20:00', 'Tue', 'Class: MECN 4240, Prof: Rafael Salgado'),
                                                                   ('G148', '13:00:00', '14:20:00', 'Tue', 'Class: MECN 3110, Prof: Rafael Salgado'),
                                                                   ('G148', '17:00:00', '18:20:00', 'Tue', 'Class: MECN 3005, Prof: Omar Meza'),
                                                                   ('G148', '10:00:00', '11:20:00', 'Wed', 'Class: MECN 3005, Prof: Rafael Salgado'),
                                                                   ('G148', '13:00:00', '14:20:00', 'Wed', 'Class: MECN 3600, Prof: Rafael Salgado'),
                                                                   ('G148', '14:30:00', '15:50:00', 'Wed', 'Class: MECN 4202, Prof: Rafael Salgado'),
                                                                   ('G148', '16:00:00', '17:20:00', 'Wed', 'Class: MECN 4122, Prof: Otoniel Diaz'),
                                                                   ('G148', '9:00:00', '10:20:00', 'Thu', 'Class: MECN 4240, Prof: Rafael Salgado'),
                                                                   ('G148', '13:00:00', '14:20:00', 'Thu', 'Class: MECN 3110, Prof: Rafael Salgado'),
                                                                   ('G148', '17:00:00', '18:20:00', 'Thu', 'Class: MECN 3005, Prof: Omar Meza');
insert into RoomHours (roomID, start, end, day, description) values('G149', '9:00:00', '10:20:00', 'Mon', 'Class: MECN 3135, Prof: Otoniel Diaz'),
                                                                   ('G149', '15:00:00', '17:50:00', 'Mon', 'Class: ELEN 4509, Prof: Jose Gonzalez'),
                                                                   ('G149', '8:30:00', '10:20:00', 'Tue', 'Class: ELEN 3360, Prof: Ruben Flores'),
                                                                   ('G149', '16:00:00', '17:20:00', 'Tue', 'Class: ELEN 4810, Prof: Andres Diaz'),
                                                                   ('G149', '9:00:00', '10:20:00', 'Wed', 'Class: MECN 3135, Prof: Otoniel Diaz'),
                                                                   ('G149', '12:00:00', '14:50:00', 'Wed', 'Class: ELEN 4610, Prof: Ruben Flores'),
                                                                   ('G149', '18:00:00', '20:50:00', 'Wed', 'Class: COEN 3410, Prof: Eduardo Lay'),
                                                                   ('G149', '8:30:00', '10:20:00', 'Thu', 'Class: ELEN 3360, Prof: Ruben Flores'),
                                                                   ('G149', '12:00:00', '14:50:00', 'Thu', 'Class: ELEN 4327, Prof: Caroline Gonzalez'),
                                                                   ('G149', '16:00:00', '17:20:00', 'Thu', 'Class: ELEN 4810, Prof: Andres Diaz'),
                                                                   ('G149', '18:00:00', '20:50:00', 'Thu', 'Class: COEN 3410, Prof: Jaime Yeckle');

/* Department G Second Floor*/

insert into RoomHours (roomID, start, end, day, description) values('G220', '8:00:00', '9:50:00', 'Mon', 'Class: LAB-ENGR 1100, Prof: Miguel Cotto'),
                                                                   ('G220', '10:00:00', '11:20:00', 'Mon', 'Class: ENGR 1200, Prof: Nedim Vardar'),
                                                                   ('G220', '13:00:00', '14:20:00', 'Mon', 'Class: ENGR 1200, Prof: Nedim Vardar'),
                                                                   ('G220', '8:00:00', '9:50:00', 'Tue', 'Class: LAB-ENGR 1100, Prof: Miguel Cotto'),
                                                                   ('G220', '6:00:00', '8:50:00', 'Tue', 'Class: INEN 4610, Prof: Gema Morales'),
                                                                   ('G220', '8:00:00', '9:50:00', 'Wed', 'Class: ENGR 1100, Prof: Heriberto Barriera'),
                                                                   ('G220', '10:00:00', '11:20:00', 'Wed', 'Class: ENGR 1200, Prof: Nedim Vardar'),
                                                                   ('G220', '13:00:00', '14:20:00', 'Wed', 'Class: ENGR 1200, Prof: Nedim Vardar'),
                                                                   ('G220', '18:00:00', '19:50:00', 'Wed', 'Class: ENGR 1100, Prof: Heriberto Barriera'),
                                                                   ('G220', '20:00:00', '21:50:00', 'Wed', 'Class: LAB-1100, Prof: Miguel Cotto'),
                                                                   ('G220', '8:00:00', '9:50:00', 'Thu', 'Class: ENGR 1100, Prof: Catherine Aguilar'),
                                                                   ('G220', '14:00:00', '14:50:00', 'Thu', 'Class: ENGR 3500, Prof: Catherine Aguilar');
insert into RoomHours (roomID, start, end, day, description) values('G224', '8:30', '10:20:00', 'Mon', 'Class: LAB-ELEN 3301, Prof: Miguel Muniz'),
                                                                   ('G224', '12:00:00', '13:50:00', 'Mon', 'Class: LAB-ELEN 3320, Prof: Wilson Lozano'),
                                                                   ('G224', '10:00:00', '11:50:00', 'Tue', 'Class: LAB-ENGR 1100, Prof: Andres Diaz'),
                                                                   ('G224', '12:00:00', '13:50:00', 'Tue', 'Class: LAB-ELEN 4327, Prof: Caroline Gonzalez'),
                                                                   ('G224', '15:00:00', '17:50:00', 'Tue', 'Class: LAB-ELEN 4010, Prof: Jaime Yeckle'),
                                                                   ('G224', '12:00:00', '13:50:00', 'Wed', 'Class: LAB-ELEN 3312, Prof: Caroline Gonzalez'),
                                                                   ('G224', '8:30:00', '10:50:00', 'Thu', 'Class: LAB-ELEN 3311, Prof: Caroline Gonzalez'),
                                                                   ('G224', '12:00:00', '13:50:00', 'Thu', 'Class: LAB-ELEN 3302, Prof: Roman Lopez');
insert into RoomHours (roomID, start, end, day, description) values('G225A', '8:30:00', '10:20:00', 'Wed', 'Class: LAB-ELEN 4351, Prof: Ruben Flores');
insert into RoomHours (roomID, start, end, day, description) values('G225B', '15:00:00', '16:50:00', 'Wed', 'Class: LAB-ELEN 4509, Prof: Jose Gonzalez');
insert into RoomHours (roomID, start, end, day, description) values('G240', '10:00:00', '11:20:00', 'Mon', 'Class: ENGR 3300, Prof: Jose Gonzalez'),
                                                                   ('G240', '11:30:00', '12:50:00', 'Mon', 'Class: CJUS 1000, Prof: Carlos Boria'),
                                                                   ('G240', '13:00:00', '14:20:00', 'Mon', 'Class: GEMA 1000, Prof: Isidra Montanez'),
                                                                   ('G240', '14:30:00', '15:50:00', 'Mon', 'Class: CJUS 1000, Prof: Carmen Santos'),
                                                                   ('G240', '18:00:00', '20:50:00', 'Mon', 'Class , Prof: Tim Hendricks'),
                                                                   ('G240', '8:30:00', '9:50:00', 'Tue', 'Class: GEMA 1000, Prof: Gilda Diaz'),
                                                                   ('G240', '13:00:00', '14:20:00', 'Tue', 'Class: MATH 3250, Prof: David Rodrigez'),
                                                                   ('G240', '8:30:00', '9:50:00', 'Thu', 'Class: GEMA 1000, Prof: Gilda Diaz'),
                                                                   ('G240', '10:00:00', '11:50:00', 'Thu', 'Class: ENGR 1100, Prof: Andres Diaz'),
                                                                   ('G240', '13:00:00', '14:20:00', 'Thu', 'Class: MATH 3250, Prof: David Rodrigez'),
                                                                   ('G240', '15:00:00', '17:50:00', 'Thu', 'Class: ELEN 4010, Prof: Jaime Yeckle'),
                                                                   ('G240', '10:00:00', '11:20:00', 'Wed', 'Class: ENGR 3300, Prof: Jose Gonzalez'),
                                                                   ('G240', '11:30:00', '12:50:00', 'Wed', 'Class: CJUS 1000, Prof: Carlos Boria'),
                                                                   ('G240', '13:00:00', '14:20:00', 'Wed', 'Class: GEMA 1000, Prof: Isidra Montanez'),
                                                                   ('G240', '14:30:00', '15:50:00', 'Wed', 'Class: CJUS 1000, Prof: Carmen Santos');
insert into RoomHours (roomID, start, end, day, description) values('G247A', '12:00:00', '13:50:00', 'Mon', 'Class: LAB-ELEN 4610, Prof: Ruben Flores'),
                                                                   ('G247A', '8:30:00', '10:50:00', 'Thu', 'Class: COTN 2132, Prof: Ferdinan Cedeno');
insert into RoomHours (roomID, start, end, day, description) values('G247B', '9:00:00', '11:50:00', 'Mon', 'Class: COEN 4420, Prof: Wilson Lozano'),
                                                                   ('G247B', '8:30:00', '10:50:00', 'Tue', 'Class: LAB-ELEN 4410, Prof: Jaime Jeckle'),
                                                                   ('G247B', '15:00:00', '17:50:00', 'Tue', 'Class: COEN 2210, Prof: Wilson Lozano'),
                                                                   ('G247B', '18:00:00', '20:50:00', 'Tue', 'Class: COEN 3510, Prof: Winson Lozano'),
                                                                   ('G247B', '9:00:00', '10:50:00', 'Wed', 'Class: LAB-COEN 4420, Prof: Wilson Lozano'),
                                                                   ('G247B', '15:00:00', '16:50:00', 'Thu', 'Class: LAB-COEN 2210, Prof: Wilson Lozano'),
                                                                   ('G247B', '18:00:00', '19:50:00', 'Thu', 'Class: LAB-COEN 3510, Prof: Wilson Lozano');

/* === Entering data to UserRoles === */

insert into UserRoles values(1, 'S');
insert into UserRoles values(2, 'P');
insert into UserRoles values(3, 'P');
insert into UserRoles values(4, 'P');
insert into UserRoles values(5, 'P');
insert into UserRoles values(5, 'D');
insert into UserRoles values(6, 'P');
insert into UserRoles values(7, 'P');
insert into UserRoles values(8, 'P');
insert into UserRoles values(9, 'P');
insert into UserRoles values(10, 'P');
insert into UserRoles values(11, 'P');
insert into UserRoles values(12, 'P');
insert into UserRoles values(13, 'P');
insert into UserRoles values(14, 'P');
insert into UserRoles values(15, 'D');
insert into UserRoles values(16, 'D');
insert into UserRoles values(17, 'D');

  /* === Entering data to Department === */

insert into Department values( 1, 'Electrical and Computer Engineering'),
                             ( 2, 'Industrial Engineering'),
                             ( 3, 'Mechanical Engineering'),
                             ( 4, 'Informatica');

/* === Entering data to DeptManagers === */

insert into DeptManagers values( 1, 1);
insert into DeptManagers values( 5, 1);
insert into DeptManagers values( 15, 3);
insert into DeptManagers values( 16, 2);
