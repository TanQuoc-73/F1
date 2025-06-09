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