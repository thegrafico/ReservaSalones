/* Union Query */

insert into Reservation (userID, start, end, date, roomID, status)
SELECT *
FROM (Select 2, '21:00:00','22:00:00', 'Mon, Dec, 17,2018', 'G240', 'Pending' ) as NRoomHours
	  WHERE not exists (Select * from (select roomID, start, end, day date, description
	  from RoomHours union all Select roomID, start, end, date, description from Reservation where status = 'Accepted') AllReservation
where (end > '21:00:00' and start < '22:00:00') and roomID = 'G240' and (date = 'Mon, Dec, 17,2018' or date = 'Mon' or date = 'all'));
                       
/* Count Query */

Select count(status) Pending
FROM Reservation natural join (select distinct(roomID) from Rooms natural join 
(select userID, deptID from Users natural join DeptManagers) as DUsers
where userID = 1) UReservations
where status = 'Pending';

/*Group Query*/

Select *
FROM (Select count(status), status from ResDecline natural join 
(select distinct(roomID) from Rooms natural join  (select userID, deptID from Users natural join DeptManagers) as DUsers where userID = 1) UReservations
group by status) ResDecline2
union all
(select count(status),status from Reservation natural join 
(select distinct(roomID) from Rooms natural join  (select userID, deptID from Users natural join DeptManagers) as DUsers where userID = 1) UReservations
group by status)
order by status;

/*Sorting Query*/

Select name, email, role
from Users natural join UserRoles natural join Roles
order by name;
