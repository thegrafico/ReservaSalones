/* Deletes Table if it already exists */
drop table if exists Building;
drop table if exists Room;
drop table if exists User;
drop table if exists Profesor;
drop table if exists Appointment;
drop table if exists Reservation;
drop table if exists Appointment;
drop table if exists Admin;
drop table if exists ReservationRequest;

/* Creating the Tables*/
create table Building(buildingName varchar(10), roomID varchar(10));
create table Room(roomID varchar(10), capacity int, description varchar(255), hourAvailabile varchar(10));
create table User(emailID varchar(30), name varchar(15));
create table Profesor(profesorEmail varchar(30), name varchar(15), horario varchar(10), descripcion varchar(255));
create table Appointment(emailID varchar(30), profesorEmail varchar(30), hour varchar(15), fecha date, appointmentID varchar(10));
create table Reservation(emailID varchar(30), roomID varchar(10), hour varchar(10), fecha date, reservationID varchar(10));
create table Admin(emailID varchar(30), name varchar(20));
create table ReservationRequest(emailID int, reservationID varchar(10), desicion boolean);


/* Entering data to the tables */

