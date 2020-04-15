USE account;
INSERT INTO account(email, password_hash, token, admin, super_admin, first_name, last_name, address, phone_number, insurance_company, dashcam, hasValidatedEmail, emailValidation) VALUES
("joshuazimmerman17@gmail.com", "$2y$10$n7WxVlhSUI3fb5qgFCcqse2pN5uPTSbGnnjXuzj7Cwk9Ekk3Jn6CC", "d2d418ede4c238741691b1aef43782d784e0ce6d0a0a4563de58308bb3252bb3296d8c42c4b84ddb6eeda5f1827a5c469aa93ede715d40487f7aa2ea65413be61768ba96a289ceb741a32f3e4f3aba53f5d35c028274e0dab3cf08beb1dd2fc9b52e1ceacb281bfe8c13a95836f918ac80a207e6b9cdba5f0c191357e3800513", 1, 1, "Joshua", "Zimmerman", "0000 address city", "9540000000", "Geico", 0, 0, ""),
("user@gmail.com", "$2y$10$nsvix29Xatj3mATb9vuIAeUNtfr.GccbM7Y45CVMN.9U45oFwgglW", "c24cb287de43b7d3a749d75b8cbc754cab8b146463e056048ecb5171556926382f758da5e79366fc0196b38b9914bf047a7b62a9742e7b3ce61611d3d33529b6b61bd626d269dee92f826345204451faf5f5fdec09674b305010289a8a5c5f07a5ff7a034c14d4ccc17790569147911c7ec7cbc894a6631e907ee91b03523e0d", 0, 0, "Namey", "Namerson", "1111 address city", "9550000000", "Geico", 0, 0, ""),
("user2@gmail.com", "$2y$10$CbgyusF2WE5jqMudzgnuBultNQgLtd2u13S.MEQhTH0IVep6aR3/m", "1fafe04e2772a7a95ee94d597dc974a850870db39870f0a6b4bd629e2ea2b654592deb39681f9fe8b55b8cc4628f15f5a8787bd75d8583abbc375299cbb4eae3c840b93e28b726fe6bdcb6a2237a5d1ff5bf016f1ebb34f0ea457319521ba7e59910e30d0855fb16f443feff577f53dd9b999d5e1ada39bd8b981de371a17147", 0, 0, "hi", "ho", "2222 address city", "9560000000", "Geico", 0, 0, ""),
("user3@gmail.com", "$2y$10$TPsnm6VyERD.IzWoOcmcUey0KNPGTO0zAaRbieivKHeuHOgK3XIfu", "bb117b5a4a85df01845eb61b75a146e155031b449dbc660c0f6831d4a76748e798a4b4fe7c8cb3678510695ccc9a56dda7bfb932269cc963bba053154396dfd346aba6249904b2835e7274f5187ef25ce7b287c34f128e214ef81115dcd0264197f4c15d96b9a3798fad8eb2a562399c3e265f3035765d9cff4cb4d5525d8a37", 0, 0, "name", "lastname", "3333 address city", "9570000000", "Geico", 0, 0, ""),
("admin@gmail.com", "$2y$10$sCvkhqiP2fgIS9GzOCWeQOGaQjh7d0fB/GgT8iVrc/r/uqDmlfc4G", "d81030a9efc69236e2fab1cf26a8c902ec88d3e73f1bb671432a9d7a9f8d8793b48bf5d8434f2394cb092ef06c6dda958427efc7d3aa356f0df376954118e772a04a3f29f0645f0cd84d76c1ae02470d94f826223897d4bcc1d45ffc4ded74d95e58cb4d25d818df1bcaa1b9a638aa005088b2c46cc2204ebd7239385f3aa3f0", 1, 0, "Cameron", "Aaron", "4444 address city", "9580000000", "Geico", 0, 0, "");

INSERT INTO quizData(user_id, score) VALUES
(1, 50), (1, 80), (2, 30), (2, 20), (2, 20), (3, 40), (3,100), (4, 100);

USE cities;
INSERT INTO cities(name, state, country, latitude, longitude,  climate) VALUES
("Miami", "Florida", "United States", 10, 50,  0),
("Gainesville", "Florida", "United States", 10, 50,  0),
("Orlando", "Florida", "United States", 10, 50,  0),
("Tampa", "Florida", "United States", 10, 50,  0),
("Tallahassee", "Florida", "United States", 10, 50,  0),
("Atlanta", "Georgia", "United States", 10, 50,  0),
("Athens", "Georgia", "United States", 10, 50, 0),
("Macon", "Georgia", "United States", 10, 50, 0),
("Savannah", "Georgia", "United States", 10, 50, 0),
("Augusta", "Georgia", "United States", 10, 50, 0),
("Houston", "Texas", "United States", 10, 50, 0),
("Austin", "Texas", "United States", 10, 50, 0),
("Dallas", "Texas", "United States", 10, 50, 0);
/*add atleast 13 samples and some in diffrent states. Places Should actually exist*/

INSERT INTO accidentReport(city_id, date, clear, rain, snow, hail, fog, high_winds) VALUES
(1, 1586527168, 1, 0, 0, 0, 0, 0),
(1, 1586427168, 1, 0, 0, 0, 0, 1),
(2, 1586227168, 1, 0, 0, 0, 1, 1),
(2, 1586427168, 0, 1, 0, 0, 1, 0),
(3, 1585627168, 1, 0, 0, 0, 0, 0),
(4, 1586327168, 1, 0, 0, 0, 0, 0),
(5, 1586227168, 1, 0, 0, 0, 0, 1),
(6, 1586127168, 1, 0, 0, 0, 1, 1),
(7, 1586627168, 0, 1, 0, 0, 1, 0),
(7, 1586527168, 1, 0, 0, 0, 0, 0),
(8, 1586427168, 0, 1, 0, 0, 1, 0),
(8, 1586327168, 1, 0, 0, 0, 0, 0),
(9, 1586227168, 1, 0, 0, 0, 0, 0),
(10, 1586127168, 1, 0, 0, 0, 0, 1),
(11, 1586627168, 1, 0, 0, 0, 1, 1),
(12, 1586527168, 0, 1, 0, 0, 1, 0),
(13, 1586427168, 0, 0, 1, 0, 0, 0),
(11, 1586327168, 1, 0, 0, 0, 1, 1),
(12, 1586227168, 0, 1, 0, 0, 1, 1),
(13, 1586127168, 0, 0, 1, 0, 0, 1);
/*make like 20 samples of varying times and locations etc.*/

INSERT INTO rivalry(city_id1, city_id2) VALUES
(1,2), (3,4), (6,7), (12,13);
/*make like 4 samples that correspond to actual cities in the database as defined above.*/
USE quiz;
USE quiz;
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
INSERT INTO question (question, answer1, answer2, answer3, answer4, correct_answer, state) VALUES ("Which of the following is NOT a defensive driving tip:","It is better to drive off the road than skid off when avoiding a crash", "Hitting a car moving in the same direction as you are is better than hitting a car head on", "Hitting a post is better than hitting a bush", "Not relying on other drivers", "2", "all");
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
