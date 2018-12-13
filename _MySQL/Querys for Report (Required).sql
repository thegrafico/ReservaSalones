/* Union Query */

INSERT INTO Reservation (userID, start, end, date, roomID, status)
SELECT *
FROM (SELECT 2, '21:00:00','22:00:00', 'Mon, Dec, 17,2018', 'G240', 'Pending' ) AS NRoomHours
WHERE NOT EXISTS (SELECT *
									FROM (SELECT roomID, start, end, day date, description
	  										FROM RoomHours UNION ALL SELECT roomID, start, end, date, description
																								 FROM Reservation_Status
																								 WHERE status = 'Accepted') AllReservation
WHERE (end > '21:00:00' and start < '22:00:00') and roomID = 'G240' and (date = 'Mon, Dec, 17,2018' or date = 'Mon' or date = 'all'));

/* Count Query */

SELECT count(status) Pending
FROM Reservation NATURAL JOIN (SELECT DISTINCT(roomID)
															 FROM Rooms NATURAL JOIN (SELECT userID, deptID
																												FROM Users NATURAL JOIN DeptManagers) AS DUsers
															 WHERE userID = 1) UReservations
WHERE status = 'Pending';

/*Group Query*/

Select *
FROM (SELECT count(status) count, status
			FROM Reservation_Status NATURAL JOIN (SELECT DISTINCT(roomID)
																						FROM Rooms) Rooms
GROUP BY status) ResDecline2
UNION ALL
(SELECT count(status),status
 FROM Reservation NATURAL JOIN (SELECT DISTINCT(roomID)
 																FROM Rooms) Rooms
GROUP BY status)
ORDER BY status;

/*Sorting Query*/

SELECT name, email, role
FROM Users NATURAL JOIN UserRoles NATURAL JOIN Roles
ORDER BY name;
