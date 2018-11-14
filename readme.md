# Reservacion de salones & citas con profesores

This is a project of the database class. It is in charge of reserving rooms of the buildings of the university and being able to make appointments with the professors. There are 3 types of users: students, professors, and those in charge of managing classrooms.

Users: They can request the reservation of the room or appointments with the teacher of their preference. this request if it is of appointments will be sent to the appointments database, if it is a reservation it is sent to the reservation database. Users can choose the reservation preference date for rooms, and the date available for teachers to make appointments.

Teacher: The teachers will have a unique ID, each teacher will be able to see the request of appointments they have. the teacher can delete the request or accept it. If he accepts this, a confirmation is send to the student for that appointments.

Classroom Manager: This will be responsible for managing the requests that students make, they can eliminate or accept the requests. also the administrators will be able to make room reservations.


## Getting Started

Clone the master Branch
```
git clone "https://github.com/thegrafico/ReservaSalones.git"
```

## Note:

This project validates users only with the office 365 email. Users that don't have office 365 can't enter to the web.

This project is done in Node JS.
