/*Reservation Trigger*/

DELIMITER //
CREATE TRIGGER Move_to_ResDecline
AFTER DELETE ON Reservation
FOR EACH ROW
BEGIN
IF old.status = 'Pending'
THEN insert into ResDecline values(old.resID, old.userID, old.start, old.end, old.date, 'Decline', old.roomID, old.description);
END IF;
END//
DELIMITER ;


/*Appointment Trigger*/

DELIMITER //
CREATE TRIGGER Move_to_AppDecline
AFTER DELETE ON Appointment
FOR EACH ROW
BEGIN
IF old.status = 'Pending'
THEN insert into AppDecline values(old.appID, old.userID, old.start, old.end, old.date, 'Decline', old.profID, old.description);
END IF;
END//
DELIMITER ;
