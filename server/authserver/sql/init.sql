
#Users Database
DROP USER IF EXISTS 'dbuser'@'localhost';
CREATE USER IF NOT EXISTS 'dbuser'@'localhost' IDENTIFIED BY 'MyPasswordIsMoreSecureThanYoursBET';

DROP DATABASE IF EXISTS account;
CREATE DATABASE IF NOT EXISTS account;
USE account;

CREATE TABLE account(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    token VARCHAR(1024) NOT NULL,
    admin TINYINT NOT NULL DEFAULT 0,
    super_admin TINYINT NOT NULL DEFAULT 0,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    insurance_company VARCHAR(255) NOT NULL,
    dashcam TINYINT NOT NULL
);
CREATE TABLE quizData(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    score INT NOT NULL DEFAULT 0
);

#Quiz Database
DROP DATABASE IF EXISTS quiz;
CREATE DATABASE IF NOT EXISTS quiz;
USE quiz;

CREATE TABLE question(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    question VARCHAR(1024) NOT NULL,
    answer1 VARCHAR(1024) NOT NULL,
    answer2 VARCHAR(1024) NOT NULL,
    answer3 VARCHAR(1024) NOT NULL,
    answer4 VARCHAR(1024) NOT NULL,
    correct_answer INT NOT NULL DEFAULT 0,
    state VARCHAR(25) NOT NULL
);

INSERT INTO question (question, answer1, answer2, answer3, answer4, correct_answer, state) VALUES ("Which of the following are allowed on expressways?","Motor scooters with more than 150 cubic centimeter displacement", "Motor-driven cycles", "Bicycles", "All of the above", "0", "all"); 
INSERT INTO question (question, answer1, answer2, answer3, answer4, correct_answer, state) VALUES ("All trucks and buses have:","Large front and side blindspots", "Large front, side, and rear blindspots", "Large front and rear blindspots", "None of the above", "1", "all");
INSERT INTO question (question, answer1, answer2, answer3, answer4, correct_answer, state) VALUES ("Before passing another vehicle you should:","Drive off the paved or traveled portion of the road", "Look ahead for road conditions or traffic", "Pass on the left if the driver is signaling a left turn", "Do all of the above", "1", "all");
INSERT INTO question (question, answer1, answer2, answer3, answer4, correct_answer, state) VALUES ("If you are making a left turn, you must start the turn:","In the rightmost lane", "In the leftmost lane", "In the intersection", "In a middle lane", "1", "all"); 
INSERT INTO question (question, answer1, answer2, answer3, answer4, correct_answer, state) VALUES ("To enter an expressway you should: ","Enter the expressway at a minimum speed", "Stop before merging into expressway traffic", "Enter the expressway at or near the speed of expressway traffic", "Stop and yield to the traffic on the expresswayI", "2", "all");
INSERT INTO question (question, answer1, answer2, answer3, answer4, correct_answer, state) VALUES ("Drivers may not cross ____ unless turning left when it is safe to do so","Double solid yellow lines", "Red lines", "Broken yellow lines", "Double solid white linesI", "0", "all");
INSERT INTO question (question, answer1, answer2, answer3, answer4, correct_answer, state) VALUES ("When approaching any intersection or driveway, drivers should:","Change lanes", "Pass other vehicles and then stop", "Drive at the fastest speed just before entering the intersection", "Look both ways and be ready to stop", "3", "all");
INSERT INTO question (question, answer1, answer2, answer3, answer4, correct_answer, state) VALUES ("When passing a truck, drivers should:","Decrease their speed if passing the truck on a downgrade", "Pass on the right", "Pull in front of the truck before they can see the cab", "Let the truck driver know they are passing by blinking their headlights", "3", "all");
INSERT INTO question (question, answer1, answer2, answer3, answer4, correct_answer, state) VALUES ("People who drive after drinking risk:","Higher insurance rates, jail sentences", "Heavy fines, loss of license ", "Injuries and fatalities ", "All of the aboveI", "3", "all");
INSERT INTO question (question, answer1, answer2, answer3, answer4, correct_answer, state) VALUES ("At 40 mph, the average driver's reaction time accounts for ___ feet travelled","111", "88", "44", "22", "2", "all");
INSERT INTO question (question, answer1, answer2, answer3, answer4, correct_answer, state) VALUES ("Ramp signals:","Control the speed of vehicles entering a freeway", "Are not considered traffic control devices", "Control the weight of trucks entering a freeway", "Control the rate of vehicles entering a freeway", "3", "all"); 
INSERT INTO question (question, answer1, answer2, answer3, answer4, correct_answer, state) VALUES ("Which of the following is NOT a defensive driving tip:","It is better to drive off the road than skid off when avoiding a crash", "Hitting a car moving in the same direction as you are is better than hitting a car head on", "Hitting a post is better than hitting a bush", "undefined", "2", "all");
INSERT INTO question (question, answer1, answer2, answer3, answer4, correct_answer, state) VALUES ("When you are driving on a multi-lane road, if another vehicle moves into your lane right in front of you, cutting you off, you should:","Brake only if necessary to avoid a crash, and follow the other vehicle closely for a while", "Honk your horn and brake firmly, to quickly drop back from the other vehicle", "Stay calm. Slow down if necessary to avoid a crash, and gently drop back to a safe following distance", "Brake sharply", "2", "all");
INSERT INTO question (question, answer1, answer2, answer3, answer4, correct_answer, state) VALUES ("Drinking alcohol while taking other drugs could cause","Serious health problems", "The effects of alcohol to be multiplied", "Death", "All of the above", "3", "all"); 
INSERT INTO question (question, answer1, answer2, answer3, answer4, correct_answer, state) VALUES ("When a public transit bus traveling in the same direction has signaled and is re-entering the traffic flow, drivers should","Yield the right of way to the bus", "Pass the bus on the right", "Pass the bus on the left", "None of the above", "0", "all"); 
INSERT INTO question (question, answer1, answer2, answer3, answer4, correct_answer, state) VALUES ("What does 'overdriving your headlights' mean?","Driving so slow that your headlights go into standby mode", "Driving over a bridge with your headlights on", "Driving so fast that you cannot stop within the range of the headlights", "Driving so fast that you could break your headlights", "2", "all"); 
INSERT INTO question (question, answer1, answer2, answer3, answer4, correct_answer, state) VALUES ("Overdriving your headlights is dangerous because:","you can't see upcoming road hazards", "your stopping distance is greater than the effective illumination of your headlights", "your stopping distance is too short", "All of the above", "3", "all");
INSERT INTO question (question, answer1, answer2, answer3, answer4, correct_answer, state) VALUES ("An ____ pavement marking may be painted on the paved approach to a railroad crossing:","TXC", "SXS", "RXR", "RXR", "3", "all");
INSERT INTO question (question, answer1, answer2, answer3, answer4, correct_answer, state) VALUES ("Florida law requires that motorists give cyclists a minimum of ______ feet of clearance and reduce their speed","Nine", "Three", "Fifteen", "Ten", "1", "all");
INSERT INTO question (question, answer1, answer2, answer3, answer4, correct_answer, state) VALUES ("When following motorcycles, drivers should:","keep more space in front of their vehicle", "reduce the minimum following distance", "keep less space in front of their vehicle", "try to pass them as they have different braking capabilities than other motor vehicles", "0", "all");
INSERT INTO question (question, answer1, answer2, answer3, answer4, correct_answer, state) VALUES ("On a two-way roadway with a center lane, drivers from either direction can make ______ on the center lane","Right turns", "Sudden turns", "Left turns", "U-turns", "2", "all");
INSERT INTO question (question, answer1, answer2, answer3, answer4, correct_answer, state) VALUES ("_________ are required by law when changing lanes or overtaking a vehicle","Turn signals", "Four-way emergency flashers", "Traffic signals", "High beam headlights", "0", "all");
INSERT INTO question (question, answer1, answer2, answer3, answer4, correct_answer, state) VALUES ("Under what conditions are drivers allowed to turn right on a red light?","After a complete stop", "After yielding to pedestrians in crosswalks and to vehicles still in the intersection", "At most intersections, after stopping, if the way is clear", "All of the above", "3", "all");
INSERT INTO question (question, answer1, answer2, answer3, answer4, correct_answer, state) VALUES ("An emergency vehicle is approaching with flashing lights on. You must:","pull over immediately and stop until the emergency vehicle has passed", "slow down and stop at the next intersection", "stop and block the intersection if necessary", "increase your speed and stop at the next parking area", "0", "all");
INSERT INTO question (question, answer1, answer2, answer3, answer4, correct_answer, state) VALUES ("Any driver under 21 with a breath or blood alcohol level of __ or higher is required to attend a substance abuse course.","0.08", "0.2", "0.5", "0.05", "3", "all");


#Cities Database
DROP DATABASE IF EXISTS cities;
CREATE DATABASE IF NOT EXISTS cities;
USE cities;

CREATE TABLE cities( # Purpose means Data is here but not in use, Functionality means No Data and not in use.
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(100) NOT NULL,
state VARCHAR(100) NOT NULL,
country VARCHAR(100) NOT NULL, # No Purpose
latitude FLOAT NOT NULL , # No Purpose
longitude  FLOAT NOT NULL , # No Purpose
climate VARCHAR(256) NOT NULL DEFAULT 0 # No Functionality
);

CREATE TABLE accidentReport( # Purpose means Data is here but not in use, Functionality means No Data and not in use.
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
city_id INT NOT NULL,
date BIGINT NOT NULL,
clear TINYINT NOT NULL DEFAULT 0,
rain TINYINT NOT NULL DEFAULT 0,
snow TINYINT NOT NULL DEFAULT 0,
hail TINYINT NOT NULL DEFAULT 0,
fog TINYINT NOT NULL DEFAULT 0,
high_winds TINYINT NOT NULL DEFAULT 0
);

SELECT * FROM accidentReport WHERE rain = ?

CREATE TABLE rivalry(
    id INT NOT NULL AUTO_INCREMENT,
    city_id1 INT NOT NULL,
    city_id2 INT NOT NULL,
    PRIMARY KEY(id,city_id1 ,city_id2)
);

GRANT ALL PRIVILEGES ON cities.* TO 'dbuser'@'localhost';
GRANT ALL PRIVILEGES ON account.* TO 'dbuser'@'localhost';
GRANT ALL PRIVILEGES ON quiz.* TO 'dbuser'@'localhost';
