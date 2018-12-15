# INTER-BC Reservation & Appointment Web Application

This is a project of the database class. It is in charge of reserving rooms of the buildings of the university and being able to make appointments with the professors. There are 3 types of users: students, professors, and those in charge of managing classrooms.

Users: They can request the reservation of the room or appointments with the teacher of their preference. this request if it is of appointments will be sent to the appointments database, if it is a reservation it is sent to the reservation database. Users can choose the reservation preference date for rooms, and the date available for teachers to make appointments.

Teacher: The teachers will have a unique ID, each teacher will be able to see the request of appointments they have. the teacher can delete the request or accept it. If he accepts this, a confirmation is send to the student for that appointments.

Classroom Manager: This will be responsible for managing the requests that students make, they can eliminate or accept the requests. also the administrators will be able to make room reservations.

Super admin: Managers to create and delete rooms. It is also who gives the privileges to users.

## Summary
A common issue known in many universities in Puerto Rico is the ability to reserve a classroom for any purpose, a study session, a workshop activity or a team meeting. It really doesn’t matter for what you want the classroom for, in the end it meets with the same problem. There’s no way of checking for the room availability or reserving a classroom with ease. A student or professor is taking the risk of conducting a meeting or activity for a specific day and room without knowing if the room is available for that date without going to the department to confirm availability. To be honest, we all know that’s not a practical way to do it. Due to this issue, a group of students taking the course COEN 4420 (Computer Information System Design) took the challenge to use all the knowledge from the course to create a web application, solving that issue as their final project.


## Clone this repository

```
git clone "https://github.com/thegrafico/ReservaSalones.git"
```

## Note:

This project validates users only with the office 365 email & the email must be property of Inter American university of Puerto Rico, Bayamon Campus. Users without office 365 will not be able to enter the web, in the same way as Users that not are at Inter Bayamon.

This project is made with Nodejs, mysql, Express, and other NPM packages. To test the application it is necessary to have installed NodeJS (V10 +) with the relevant packages.

## Developers:
  -Raul Pichardo Avalo
  -Carlos J. Alvarado Solís
  -Noah R. Almeda Sánchez
  -Kemuel Suárez Andino
  -Francisco J. Torres Cardona.

  Students of Inter American University of Puerto Rico, Bayamon Campus. 
