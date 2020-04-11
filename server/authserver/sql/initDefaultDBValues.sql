USE account;
INSERT INTO account(email, password_hash, token, admin, super_admin) VALUES
("joshuazimmerman17@gmail.com", "$2y$10$n7WxVlhSUI3fb5qgFCcqse2pN5uPTSbGnnjXuzj7Cwk9Ekk3Jn6CC", "d2d418ede4c238741691b1aef43782d784e0ce6d0a0a4563de58308bb3252bb3296d8c42c4b84ddb6eeda5f1827a5c469aa93ede715d40487f7aa2ea65413be61768ba96a289ceb741a32f3e4f3aba53f5d35c028274e0dab3cf08beb1dd2fc9b52e1ceacb281bfe8c13a95836f918ac80a207e6b9cdba5f0c191357e3800513", 1, 1),
("user@gmail.com", "$2y$10$nsvix29Xatj3mATb9vuIAeUNtfr.GccbM7Y45CVMN.9U45oFwgglW", "c24cb287de43b7d3a749d75b8cbc754cab8b146463e056048ecb5171556926382f758da5e79366fc0196b38b9914bf047a7b62a9742e7b3ce61611d3d33529b6b61bd626d269dee92f826345204451faf5f5fdec09674b305010289a8a5c5f07a5ff7a034c14d4ccc17790569147911c7ec7cbc894a6631e907ee91b03523e0d", 0, 0),
("user2@gmail.com", "$2y$10$CbgyusF2WE5jqMudzgnuBultNQgLtd2u13S.MEQhTH0IVep6aR3/m", "1fafe04e2772a7a95ee94d597dc974a850870db39870f0a6b4bd629e2ea2b654592deb39681f9fe8b55b8cc4628f15f5a8787bd75d8583abbc375299cbb4eae3c840b93e28b726fe6bdcb6a2237a5d1ff5bf016f1ebb34f0ea457319521ba7e59910e30d0855fb16f443feff577f53dd9b999d5e1ada39bd8b981de371a17147", 0, 0),
("user3@gmail.com", "$2y$10$TPsnm6VyERD.IzWoOcmcUey0KNPGTO0zAaRbieivKHeuHOgK3XIfu", "bb117b5a4a85df01845eb61b75a146e155031b449dbc660c0f6831d4a76748e798a4b4fe7c8cb3678510695ccc9a56dda7bfb932269cc963bba053154396dfd346aba6249904b2835e7274f5187ef25ce7b287c34f128e214ef81115dcd0264197f4c15d96b9a3798fad8eb2a562399c3e265f3035765d9cff4cb4d5525d8a37", 0, 0),
("admin@gmail.com", "$2y$10$sCvkhqiP2fgIS9GzOCWeQOGaQjh7d0fB/GgT8iVrc/r/uqDmlfc4G", "d81030a9efc69236e2fab1cf26a8c902ec88d3e73f1bb671432a9d7a9f8d8793b48bf5d8434f2394cb092ef06c6dda958427efc7d3aa356f0df376954118e772a04a3f29f0645f0cd84d76c1ae02470d94f826223897d4bcc1d45ffc4ded74d95e58cb4d25d818df1bcaa1b9a638aa005088b2c46cc2204ebd7239385f3aa3f0", 1, 0);

INSERT INTO quizData(user_id, score) VALUES
(1, 50), (1, 80), (2, 30), (2, 20), (2, 20), (3, 40), (3,100), (4, 100);

USE cities;
INSERT INTO cities(name, state, country, latitude, longitude, rank, climate, totalAccidents) VALUES
("Miami", "Florida", "United States", 10, 50, 0, 0, 2),
("Gainesville", "Florida", "United States", 10, 50, 0, 0, 2),
("Orlando", "Florida", "United States", 10, 50, 0, 0, 1),
("Tampa", "Florida", "United States", 10, 50, 0, 0, 1),
("Tallahassee", "Florida", "United States", 10, 50, 0, 0, 1),
("Atlanta", "Georgia", "United States", 10, 50, 0, 0, 1),
("Athens", "Georgia", "United States", 10, 50, 0, 0, 2),
("Macon", "Georgia", "United States", 10, 50, 0, 0, 2),
("Savannah", "Georgia", "United States", 10, 50, 0, 0, 1),
("Augusta", "Georgia", "United States", 10, 50, 0, 0, 1),
("Houston", "Texas", "United States", 10, 50, 0, 0, 2),
("Austin", "Texas", "United States", 10, 50, 0, 0, 2),
("Dallas", "Texas", "United States", 10, 50, 0, 0, 2);
/*add atleast 13 samples and some in diffrent states. Places Should actually exist*/

INSERT INTO accidentReport(city_id, accident_date, clear, rain, snow, hail, fog, high_winds) VALUES
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
