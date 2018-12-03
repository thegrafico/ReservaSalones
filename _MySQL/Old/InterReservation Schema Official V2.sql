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

/* Creating the Tables*/

create table Roles(roleID varchar(10), role varchar(15));
create table Users(userID MediumInt NOT NULL auto_increment, name varchar(30) NOT NULL, email varchar(30) NOT NULL, Primary Key(userID));
create table Rooms(roomID varchar(10), capacity tinyInt, deptID varchar(10));
create table Department(deptName varchar(30), userID varchar(10), deptID varchar(10));
create table ProfHours(userID varchar(10), officeHour varchar(10), day varchar(10), description varchar(255));
create table Reservation(resID mediumInt NOT NULL auto_increment, userID mediumInt, start time, end time, date date, status varchar(10), roomID varchar(10), description varchar(255), Primary Key(resID));
create table Appointment(appID mediumInt NOT NULL auto_increment, userID mediumInt, start time, end time, date date, status varchar(10), profID varchar(10), description varchar(255), Primary Key(appID));
create table RoomHours(roomID varchar(10), start time, end time, day varchar(10), description varchar(255));                                          /*Hours Not Available*/
create table ResDecline(roomID varchar(10), date date, hour varchar(10));
create table AppDecline(userID varchar(10), date date, hour varchar(10));
create table UserRoles(userID varchar(10), roleID varchar(10));

/* === Entering data to Roles === */

insert into Roles values('SA', 'Super Admin');                                                                            /* Can add people to the database and change roles*/
insert into Roles values('A', 'Admin');
insert into Roles values('D', 'Director');
insert into Roles values('P', 'Professor');

/* Example of adding Users */

/*
insert into Users (name, email) values('Carlos', 'IDK@interbayamon.edu');
insert into Users (name, email) values('Kemuel', 'IDK2@interbayamon.edu');
*/

/* === Entering data to Rooms === */

/* Department F First Floor*/

insert into Rooms values('F102B', 30, 'F');
insert into Rooms values('F104', 30, 'F');

/* Department F Second Floor*/

insert into Rooms values('F201A', 30,'F');
insert into Rooms values('F201B', 30,'F');
insert into Rooms values('F203', 30, 'F');
insert into Rooms values('F209', 30,'F');
insert into Rooms values('F210', 30,'F');
insert into Rooms values('F214', 30, 'F');
insert into Rooms values('F219', 30,'F');

/* Department G First Floor */

insert into Rooms values('G120', 25, 'G');
insert into Rooms values('G121', 25, 'G');
insert into Rooms values('G123', 25, 'G');
insert into Rooms values('G126', 25, 'G');
insert into Rooms values('G141A', 25, 'G');
insert into Rooms values('G141B', 25, 'G');
insert into Rooms values('G142A', 25, 'G');
insert into Rooms values('G142B', 25, 'G');
insert into Rooms values('G143', 25, 'G');
insert into Rooms values('G148', 25, 'G');
insert into Rooms values('G149', 25, 'G');

/* Department G Second Floor*/

insert into Rooms values('G220', 25, 'G');
insert into Rooms values('G224', 25, 'G');
insert into Rooms values('G225A', 25, 'G');
insert into Rooms values('G225B', 25, 'G');
insert into Rooms values('G227', 25, 'G');
insert into Rooms values('G240', 25, 'G');
insert into Rooms values('G241A', 25, 'G');
insert into Rooms values('G241B', 25, 'G');
insert into Rooms values('G247A', 25, 'G');
insert into Rooms values('G247B', 25, 'G');


/* === Entering data to Department === */

insert into Department values('Informatica', null,'F');
insert into Department values('Ingieneria', null,'G');

/* === Entering data to ProfHours === */

insert into ProfHours values(null, 'hour', 'day', 'description');

/* === Entering data to RoomHours === */

insert into RoomHours values('roomID', '', '', 'day', 'description');

/* Department F First Floor*/

insert into RoomHours values('F102B', '12:30', '13:00', '', '');
insert into RoomHours values('F104', '1:00', '2:30', '', '');

/* Department F Second Floor*/

insert into RoomHours values('F201A', '', '', '', '');
insert into RoomHours values('F201B', '', '', '', '');
insert into RoomHours values('F203', '', '', '', '');
insert into RoomHours values('F209', '', '', '', '');
insert into RoomHours values('F210', '', '', '', '');
insert into RoomHours values('F214', '', '', '', '');
insert into RoomHours values('F219', '', '', '', '');

/* Department G First Floor */

insert into RoomHours values('G120', '', '', '', '');
insert into RoomHours values('G121', '', '', '', '');
insert into RoomHours values('G123', '', '', '', '');
insert into RoomHours values('G126', '', '', '', '');
insert into RoomHours values('G141A', '', '', '', '');
insert into RoomHours values('G141B', '', '', '', '');
insert into RoomHours values('G142A', '', '', '', '');
insert into RoomHours values('G142B', '', '', '', '');
insert into RoomHours values('G143', '', '', '', '');
insert into RoomHours values('G148', '', '', '', '');
insert into RoomHours values('G149', '', '', '', '');

/* Department G Second Floor*/

insert into RoomHours values('G220', '', '', '', '');
insert into RoomHours values('G224', '', '', '', '');
insert into RoomHours values('G225A', '', '', '', '');
insert into RoomHours values('G225B', '', '', '', '');
insert into RoomHours values('G227', '', '', '', '');
insert into RoomHours values('G240', '', '', '', '');
insert into RoomHours values('G241A', '', '', '', '');
insert into RoomHours values('G241B', '', '', '', '');
insert into RoomHours values('G247A', '', '', '', '');
insert into RoomHours values('G247B', '', '', '', '');


/* === Entering data to UserRoles === */
