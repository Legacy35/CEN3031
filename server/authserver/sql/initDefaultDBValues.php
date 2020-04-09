<?php

    require_once('./include/DataManager.php');

    $dataManager = DataManager::getInstance();
    $conn = $dataManager->getConnection("quiz");
    $A1 = serialize(array("Motor scooters with more than 150 cubic centimeter displacement","Motor-driven cycles","Bicycles","All of the above"));
    $A2 = serialize(array("Large front and side blindspots","Large front, side, and rear blindspots","Large front and rear blindspots","None of the above"));
    $A3 = serialize(array("Drive off the paved or traveled portion of the road,Look ahead for road conditions or traffic,Pass on the left if the driver is signaling a left turn,Do all of the above"));
    $A4 = serialize(array("In the rightmost lane,In the leftmost lane,In the intersection,In a middle lane"));
    $A5 = serialize(array("Enter the expressway at a minimum speed,Stop before merging into expressway traffic,Enter the expressway at or near the speed of expressway traffic,Stop and yield to the traffic on the expresswayI"));
    $A6 = serialize(array("Double solid yellow lines,Red lines,Broken yellow lines,Double solid white lines"));
    $A7 = serialize(array("Change lanes,Pass other vehicles and then stop,Drive at the fastest speed just before entering the intersection,Look both ways and be ready to stop"));
    $A8 = serialize(array("Decrease their speed if passing the truck on a downgrade,Pass on the right,Pull in front of the truck before they can see the cab,Let the truck driver know they are passing by blinking their headlights"));
    $A9 = serialize(array("Higher insurance rates, jail sentences,Heavy fines, loss of license ,Injuries and fatalities ,All of the above"));
    $A10 = serialize(array("111,88,44,22"));
    $A11 = serialize(array("Control the speed of vehicles entering a freeway,Are not considered traffic control devices,Control the weight of trucks entering a freeway,Control the rate of vehicles entering a freeway"));
    $A12 = serialize(array("It is better to drive off the road than skid off when avoiding a crash,Hitting a car moving in the same direction as you are is better than hitting a car head on,Hitting a post is better than hitting a bush,"));
    $A13 = serialize(array("Brake only if necessary to avoid a crash, and follow the other vehicle closely for a while,Honk your horn and brake firmly, to quickly drop back from the other vehicle,Stay calm. Slow down if necessary to avoid a crash, and gently drop back to a safe following distance,Brake sharply"));
    $A14 = serialize(array("Serious health problems,The effects of alcohol to be multiplied,Death,All of the above"));
    $A15 = serialize(array("Yield the right of way to the bus,Pass the bus on the right,Pass the bus on the left,None of the above"));
    $A16 = serialize(array("Driving so slow that your headlights go into standby mode,Driving over a bridge with your headlights on,Driving so fast that you cannot stop within the range of the headlights,Driving so fast that you could break your headlights"));
    $A17 = serialize(array("you can't see upcoming road hazards,your stopping distance is greater than the effective illumination of your headlights,your stopping distance is too short,All of the above"));
    $A18 = serialize(array("TXC,SXS,RXR,RXR"));
    $A19 = serialize(array("Nine,Three,Fifteen,Ten"));
    $A20 = serialize(array("keep more space in front of their vehicle,reduce the minimum following distance,keep less space in front of their vehicle,try to pass them as they have different braking capabilities than other motor vehicles"));
    $A21 = serialize(array("Right turns,Sudden turns,Left turns,U-turns"));
    $A22 = serialize(array("Turn signals,Four-way emergency flashers,Traffic signals,High beam headlights"));
    $A23 = serialize(array("After a complete stop,After yielding to pedestrians in crosswalks and to vehicles still in the intersection,At most intersections, after stopping, if the way is clear,All of the above"));
    $A24 = serialize(array("pull over immediately and stop until the emergency vehicle has passed,slow down and stop at the next intersection,stop and block the intersection if necessary,increase your speed and stop at the next parking area"));
    $A25 = serialize(array("0.08,0.2,0.5,0.05"));


    $insertStatement = $conn->prepare('INSERT INTO authentication (question, answers, correctAnswer, state  ) VALUES
    ("Which of the following are allowed on expressways?",?,0,"Florida"),
    ("All trucks and buses have:",?,1,"Florida"),
    ("Before passing another vehicle you should:",?,1,"Florida"),
    ("If you are making a left turn, you must start the turn:",?,1,"Florida"),
    ("To enter an expressway you should:",?,2,"Florida"),
    ("Drivers may not cross ____ unless turning left when it is safe to do so",?,0,"Florida"),
    ("When approaching any intersection or driveway, drivers should:",?,3,"Florida"),
    ("When passing a truck, drivers should:",?,3,"Florida"),
    ("People who drive after drinking risk:",?,3,"Florida"),
    ("At 40 mph, the average driver’s reaction time accounts for ___ feet travelled",?,2,"Florida"),
    ("Ramp signals:",?,3,"Florida"),
    ("Which of the following is NOT a defensive driving tip:",?,2,"Florida"),
    ("When you are driving on a multi-lane road, if another vehicle moves into your lane right in front of you, cutting you off, you should:",?,2,"Florida"),
    ("Drinking alcohol while taking other drugs could cause,",?,3,"Florida"),
    ("When a public transit bus traveling in the same direction has signaled and is re-entering the traffic flow, drivers should",?,0,"Florida"),
    ("What does ‘overdriving your headlights’ mean?",?,2,"Florida"),
    ("Overdriving your headlights is dangerous because:",?,3,"Florida"),
    ("An ____ pavement marking may be painted on the paved approach to a railroad crossing:",?,3,"Florida"),
    ("Florida law requires that motorists give cyclists a minimum of ______ feet of clearance and reduce their speed",?,1,"Florida"),
    ("When following motorcycles drivers should:",?,0,"Florida"),
    ("On a two-way roadway with a center lane drivers from either direction can make ______ on the center lane",?,2,"Florida"),
    ("_________ are required by law when changing lanes or overtaking a vehicle",?,0,"Florida"),
    ("Under what conditions are drivers allowed to turn right on a red light?",?,3,"Florida"),
    ("An emergency vehicle is approaching with flashing lights on. You must:",?,0,"Florida"),
    ("Any driver under 21 with a breath or blood alcohol level of __ or higher is required to attend a substance abuse course.",?,3,"Florida")

    ;');
    if(!$statement->bindparam("ssssssssssssssssssssssss", $A1 ,$A2, $A3, $A4, $A5, $A6, $A7, $A8, $A9, $A10, $A11, $A12, $A13, $A14, $A15, $A16, $A17, $A18, $A19, $A20, $A21, $A22, $A23, $A24, $A25));
    if(!$insertStatement->execute()) error("Query failed. ¯_(ツ)/¯");

?>
