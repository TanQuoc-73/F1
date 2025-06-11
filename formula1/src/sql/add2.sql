USE formula1;

-- Thêm người dùng mới
INSERT INTO users (username, password_hash, email, role)
VALUES 
('janedoe', 'hashed_password_jane', 'jane@example.com', 'user'),
('f1fan', 'hashed_password_fan', 'fan@f1.com', 'user'),
('editor1', 'hashed_password_editor', 'editor@f1.com', 'admin');

-- Thêm tin tức mới
INSERT INTO news (title, content, image_url, author_id)
VALUES 
('Verstappen Dominates in Spa', 'Max Verstappen takes a commanding win at the Belgian GP...', 'https://f1.com/images/news2.jpg', 3),
('Mercedes Unveils New Car Design', 'Mercedes reveals their 2025 challenger with bold livery...', 'https://f1.com/images/news3.jpg', 1),
('Hamilton Signs New Contract', 'Lewis Hamilton extends his contract with Mercedes...', 'https://f1.com/images/news4.jpg', 3);

-- Thêm đội đua mới
INSERT INTO teams (name, base_country, logo_url, principal, power_unit)
VALUES 
('Mercedes-AMG Petronas', 'United Kingdom', 'https://f1.com/logos/mercedes.png', 'Toto Wolff', 'Mercedes'),
('McLaren F1 Team', 'United Kingdom', 'https://f1.com/logos/mclaren.png', 'Zak Brown', 'Mercedes'),
('Aston Martin', 'United Kingdom', 'https://f1.com/logos/astonmartin.png', 'Mike Krack', 'Mercedes');

-- Thêm tay đua mới
INSERT INTO drivers (first_name, last_name, nationality, date_of_birth, team_id, image_url, number)
VALUES 
('Lewis', 'Hamilton', 'United Kingdom', '1985-01-07', 3, 'https://f1.com/drivers/hamilton.jpg', 44),
('Lando', 'Norris', 'United Kingdom', '1999-11-13', 4, 'https://f1.com/drivers/norris.jpg', 4),
('Fernando', 'Alonso', 'Spain', '1981-07-29', 5, 'https://f1.com/drivers/alonso.jpg', 14);

-- Thêm mùa giải mới
INSERT INTO seasons (year)
VALUES 
(2024),
(2023);

-- Thêm đường đua mới
INSERT INTO circuits (name, location, country, length_km, laps, image_url)
VALUES 
('Circuit de Spa-Francorchamps', 'Spa', 'Belgium', 7.00, 44, 'https://f1.com/circuits/spa.jpg'),
('Silverstone Circuit', 'Silverstone', 'United Kingdom', 5.89, 52, 'https://f1.com/circuits/silverstone.jpg'),
('Suzuka International Racing Course', 'Suzuka', 'Japan', 5.81, 53, 'https://f1.com/circuits/suzuka.jpg');

-- Thêm cuộc đua mới
INSERT INTO races (season_id, circuit_id, race_name, race_date, round_number)
VALUES 
(1, 2, 'Belgian Grand Prix', '2025-07-27', 12),
(1, 3, 'British Grand Prix', '2025-07-06', 10),
(2, 4, 'Japanese Grand Prix', '2024-04-07', 4);

-- Thêm kết quả cuộc đua mới
INSERT INTO race_results (race_id, driver_id, team_id, position, points, time, fastest_lap)
VALUES 
(2, 2, 2, 1, 25.0, '1:45:12.345', TRUE),
(2, 3, 3, 2, 18.0, '1:45:18.901', FALSE),
(2, 4, 4, 3, 15.0, '1:45:25.123', FALSE),
(3, 3, 3, 1, 25.0, '1:30:10.567', TRUE),
(3, 4, 4, 2, 18.0, '1:30:15.890', FALSE),
(3, 5, 5, 3, 15.0, '1:30:20.456', FALSE),
(4, 2, 2, 1, 25.0, '1:27:45.678', FALSE),
(4, 1, 1, 2, 18.0, '1:27:50.123', TRUE);

-- Thêm bảng xếp hạng tay đua
INSERT INTO driver_standings (season_id, driver_id, points, position)
VALUES 
(1, 3, 110.0, 3),
(1, 4, 95.0, 4),
(1, 5, 80.0, 5),
(2, 2, 300.0, 1),
(2, 1, 250.0, 2);

-- Thêm bảng xếp hạng đội đua
INSERT INTO team_standings (season_id, team_id, points, position)
VALUES 
(1, 3, 190.0, 3),
(1, 4, 170.0, 4),
(1, 5, 140.0, 5),
(2, 2, 450.0, 1),
(2, 1, 400.0, 2);



INSERT INTO teams (name, base_country, logo_url, principal, power_unit) VALUES
('Alpine', 'France', 'https://media.formula1.com/image/upload/f_auto/q_auto/v1684406592/fom-website/teams/Alpine/logo.png', 'Bruno Famin', 'Renault'),
('Williams', 'United Kingdom', 'https://media.formula1.com/image/upload/f_auto/q_auto/v1684406592/fom-website/teams/Williams/logo.png', 'James Vowles', 'Mercedes'),
('RB', 'Italy', 'https://media.formula1.com/image/upload/f_auto/q_auto/v1705500121/fom-website/teams/RB/logo.png', 'Laurent Mekies', 'Honda RBPT'),
('Kick Sauber', 'Switzerland', 'https://media.formula1.com/image/upload/f_auto/q_auto/v1705500121/fom-website/teams/Kick%20Sauber/logo.png', 'Alessandro Alunni Bravi', 'Ferrari'),
('Haas', 'United States', 'https://media.formula1.com/image/upload/f_auto/q_auto/v1684406592/fom-website/teams/Haas/logo.png', 'Ayao Komatsu', 'Ferrari');


INSERT INTO drivers (first_name, last_name, nationality, date_of_birth, team_id, image_url, number) VALUES
('Oscar', 'Piastri', 'Australia', '2001-04-06', 4, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/oscar-piastri.png', 81),
('George', 'Russell', 'United Kingdom', '1998-02-15', 3, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/george-russell.png', 63),
('Kimi', 'Antonelli', 'Italy', '2006-08-25', 3, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/kimi-antonelli.png', 34),
('Yuki', 'Tsunoda', 'Japan', '2000-05-11', 2, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/yuki-tsunoda.png', 22),
('Alexander', 'Albon', 'Thailand', '1996-03-23', 8, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/alexander-albon.png', 23),
('Carlos', 'Sainz', 'Spain', '1994-09-01', 8, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/carlos-sainz.png', 55),
('Liam', 'Lawson', 'New Zealand', '2002-02-11', 9, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/liam-lawson.png', 40),
('Isack', 'Hadjar', 'France', '2004-09-28', 9, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/isack-hadjar.png', 20),
('Esteban', 'Ocon', 'France', '1996-09-17', 7, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/esteban-ocon.png', 31),
('Oliver', 'Bearman', 'United Kingdom', '2005-05-08', 7, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/oliver-bearman.png', 87),
('Nico', 'Hülkenberg', 'Germany', '1987-08-19', 10, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/nico-hulkenberg.png', 27),
('Gabriel', 'Bortoleto', 'Brazil', '2004-10-14', 10, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/gabriel-bortoleto.png', 42),
('Lance', 'Stroll', 'Canada', '1998-10-29', 5, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/lance-stroll.png', 18),
('Pierre', 'Gasly', 'France', '1996-02-07', 7, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/pierre-gasly.png', 10),
('Franco', 'Colapinto', 'Argentina', '2003-05-27', 7, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/franco-colapinto.png', 21);


INSERT INTO drivers (first_name, last_name, nationality, date_of_birth, team_id, image_url, number) VALUES
('Oscar', 'Piastri', 'Australia', '2001-04-06', 4, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/oscar-piastri.png', 81),
('Yuki', 'Tsunoda', 'Japan', '2000-05-11', 2, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/yuki-tsunoda.png', 22),
('George', 'Russell', 'United Kingdom', '1998-02-15', 3, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/george-russell.png', 63),
('Kimi', 'Antonelli', 'Italy', '2006-08-25', 3, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/kimi-antonelli.png', 12),
('Alexander', 'Albon', 'Thailand', '1996-03-23', 8, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/alexander-albon.png', 23),
('Carlos', 'Sainz', 'Spain', '1994-09-01', 8, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/carlos-sainz.png', 55),
('Isack', 'Hadjar', 'France', '2004-09-28', 9, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/isack-hadjar.png', 6),
('Liam', 'Lawson', 'New Zealand', '2002-02-11', 9, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/liam-lawson.png', 20),
('Esteban', 'Ocon', 'France', '1996-09-17', 11, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/esteban-ocon.png', 31),
('Oliver', 'Bearman', 'United Kingdom', '2005-05-08', 11, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/oliver-bearman.png', 87),
('Nico', 'Hülkenberg', 'Germany', '1987-08-19', 10, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/nico-hulkenberg.png', 27),
('Gabriel', 'Bortoleto', 'Brazil', '2004-10-14', 10, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/gabriel-bortoleto.png', 5),
('Lance', 'Stroll', 'Canada', '1998-10-29', 5, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/lance-stroll.png', 18),
('Pierre', 'Gasly', 'France', '1996-02-07', 7, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/pierre-gasly.png', 10),
('Franco', 'Colapinto', 'Argentina', '2003-05-27', 7, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/franco-colapinto.png', 43);


INSERT INTO circuits (name, location, country, length_km, laps, image_url) VALUES
('Bahrain International Circuit', 'Sakhir', 'Bahrain', 5.41, 57, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/circuits/Bahrain.png'),
('Jeddah Street Circuit', 'Jeddah', 'Saudi Arabia', 6.17, 50, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/circuits/Jeddah.png'),
('Albert Park Circuit', 'Melbourne', 'Australia', 5.28, 58, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/circuits/Australia.png'),
('Shanghai International Circuit', 'Shanghai', 'China', 5.45, 56, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/circuits/China.png'),
('Miami International Autodrome', 'Miami', 'United States', 5.41, 57, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/circuits/Miami.png'),
('Imola Circuit', 'Imola', 'Italy', 4.91, 63, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/circuits/Imola.png'),
('Circuit de Barcelona-Catalunya', 'Barcelona', 'Spain', 4.67, 66, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/circuits/Spain.png'),
('Red Bull Ring', 'Spielberg', 'Austria', 4.32, 71, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/circuits/Austria.png'),
('Hungaroring', 'Budapest', 'Hungary', 4.38, 70, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/circuits/Hungary.png'),
('Circuit Zandvoort', 'Zandvoort', 'Netherlands', 4.26, 72, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/circuits/Netherlands.png'),
('Monza Circuit', 'Monza', 'Italy', 5.79, 53, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/circuits/Italy.png'),
('Marina Bay Street Circuit', 'Singapore', 'Singapore', 4.94, 62, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/circuits/Singapore.png'),
('Losail International Circuit', 'Lusail', 'Qatar', 5.38, 57, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/circuits/Qatar.png'),
('Circuit of the Americas', 'Austin', 'United States', 5.51, 56, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/circuits/USA.png'),
('Autódromo Hermanos Rodríguez', 'Mexico City', 'Mexico', 4.30, 71, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/circuits/Mexico.png'),
('Interlagos Circuit', 'São Paulo', 'Brazil', 4.31, 71, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/circuits/Brazil.png'),
('Yas Marina Circuit', 'Abu Dhabi', 'United Arab Emirates', 5.28, 58, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/circuits/AbuDhabi.png');



INSERT INTO races (season_id, circuit_id, race_name, race_date, round_number) VALUES
(1, 5, 'Australian Grand Prix', '2025-03-16', 1),
(1, 6, 'Chinese Grand Prix', '2025-03-23', 2),
(1, 7, 'Bahrain Grand Prix', '2025-04-13', 5),
(1, 8, 'Saudi Arabian Grand Prix', '2025-04-20', 6),
(1, 9, 'Miami Grand Prix', '2025-05-04', 8),
(1, 10, 'Emilia-Romagna Grand Prix', '2025-05-18', 9),
(1, 11, 'Spanish Grand Prix', '2025-06-01', 9),
(1, 12, 'Canadian Grand Prix', '2025-06-15', 10),
(1, 13, 'Austrian Grand Prix', '2025-06-29', 11),
(1, 14, 'Hungarian Grand Prix', '2025-08-03', 13),
(1, 15, 'Dutch Grand Prix', '2025-08-31', 14),
(1, 16, 'Italian Grand Prix', '2025-09-07', 15),
(1, 17, 'Azerbaijan Grand Prix', '2025-09-21', 16),
(1, 18, 'Singapore Grand Prix', '2025-10-05', 17),
(1, 19, 'United States Grand Prix', '2025-10-19', 18),
(1, 20, 'Mexico City Grand Prix', '2025-10-26', 19),
(1, 21, 'Brazilian Grand Prix', '2025-11-09', 20),
(1, 22, 'Las Vegas Grand Prix', '2025-11-22', 21),
(1, 23, 'Qatar Grand Prix', '2025-11-30', 22),
(1, 24, 'Abu Dhabi Grand Prix', '2025-12-07', 23),

(2, 5, 'Australian Grand Prix', '2024-03-17', 1),
(2, 6, 'Chinese Grand Prix', '2024-04-07', 3),
(2, 7, 'Bahrain Grand Prix', '2024-03-02', 2),
(2, 8, 'Saudi Arabian Grand Prix', '2024-03-09', 3),
(2, 10, 'Emilia-Romagna Grand Prix', '2024-05-19', 7),
(2, 12, 'Canadian Grand Prix', '2024-06-09', 9),
(2, 16, 'Italian Grand Prix', '2024-09-01', 15),

(3, 5, 'Australian Grand Prix', '2023-04-02', 3),
(3, 6, 'Chinese Grand Prix', '2023-04-16', 4),
(3, 7, 'Bahrain Grand Prix', '2023-03-05', 1),
(3, 8, 'Saudi Arabian Grand Prix', '2023-03-19', 2),
(3, 9, 'Miami Grand Prix', '2023-05-07', 5),
(3, 12, 'Canadian Grand Prix', '2023-06-18', 8),
(3, 14, 'Hungarian Grand Prix', '2023-07-23', 11),
(3, 15, 'Dutch Grand Prix', '2023-08-27', 13),
(3, 24, 'Abu Dhabi Grand Prix', '2023-11-26', 22);
