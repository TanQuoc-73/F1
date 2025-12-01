-- Formula1 Sample Data for PostgreSQL (Supabase)
-- Run this AFTER running supabase_schema.sql

-- Insert Users
INSERT INTO users (username, password_hash, email, role) VALUES
('admin', '$2a$10$dummyHashForAdmin123456789012345678901234567890', 'admin@f1.com', 'admin'),
('johndoe', '$2a$10$dummyHashForJohn1234567890123456789012345678901', 'john@example.com', 'user'),
('janedoe', '$2a$10$dummyHashForJane1234567890123456789012345678901', 'jane@example.com', 'user');

-- Insert Teams (2025 F1 Grid)
INSERT INTO teams (name, base_country, logo_url, principal, power_unit) VALUES
('Scuderia Ferrari', 'Italy', 'https://media.formula1.com/image/upload/f_auto/q_auto/v1684406592/fom-website/teams/Ferrari/logo.png', 'Frédéric Vasseur', 'Ferrari'),
('Red Bull Racing', 'Austria', 'https://media.formula1.com/image/upload/f_auto/q_auto/v1684406592/fom-website/teams/Red%20Bull/logo.png', 'Christian Horner', 'Honda RBPT'),
('Mercedes-AMG Petronas', 'United Kingdom', 'https://media.formula1.com/image/upload/f_auto/q_auto/v1684406592/fom-website/teams/Mercedes/logo.png', 'Toto Wolff', 'Mercedes'),
('McLaren F1 Team', 'United Kingdom', 'https://media.formula1.com/image/upload/f_auto/q_auto/v1684406592/fom-website/teams/McLaren/logo.png', 'Zak Brown', 'Mercedes'),
('Aston Martin', 'United Kingdom', 'https://media.formula1.com/image/upload/f_auto/q_auto/v1684406592/fom-website/teams/Aston%20Martin/logo.png', 'Mike Krack', 'Mercedes'),
('RB', 'Italy', 'https://media.formula1.com/image/upload/f_auto/q_auto/v1705500121/fom-website/teams/RB/logo.png', 'Laurent Mekies', 'Honda RBPT'),
('Alpine', 'France', 'https://media.formula1.com/image/upload/f_auto/q_auto/v1684406592/fom-website/teams/Alpine/logo.png', 'Bruno Famin', 'Renault'),
('Williams', 'United Kingdom', 'https://media.formula1.com/image/upload/f_auto/q_auto/v1684406592/fom-website/teams/Williams/logo.png', 'James Vowles', 'Mercedes'),
('Kick Sauber', 'Switzerland', 'https://media.formula1.com/image/upload/f_auto/q_auto/v1705500121/fom-website/teams/Kick%20Sauber/logo.png', 'Alessandro Alunni Bravi', 'Ferrari'),
('Haas F1 Team', 'United States', 'https://media.formula1.com/image/upload/f_auto/q_auto/v1684406592/fom-website/teams/Haas/logo.png', 'Ayao Komatsu', 'Ferrari');

-- Insert Drivers (2025 F1 Grid)
INSERT INTO drivers (first_name, last_name, nationality, date_of_birth, team_id, image_url, number) VALUES
-- Ferrari
('Charles', 'Leclerc', 'Monaco', '1997-10-16', 1, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/charles-leclerc.png', 16),
('Lewis', 'Hamilton', 'United Kingdom', '1985-01-07', 1, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/lewis-hamilton.png', 44),
-- Red Bull
('Max', 'Verstappen', 'Netherlands', '1997-09-30', 2, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/max-verstappen.png', 1),
('Yuki', 'Tsunoda', 'Japan', '2000-05-11', 2, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/yuki-tsunoda.png', 22),
-- Mercedes
('George', 'Russell', 'United Kingdom', '1998-02-15', 3, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/george-russell.png', 63),
('Kimi', 'Antonelli', 'Italy', '2006-08-25', 3, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/kimi-antonelli.png', 12),
-- McLaren
('Lando', 'Norris', 'United Kingdom', '1999-11-13', 4, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/lando-norris.png', 4),
('Oscar', 'Piastri', 'Australia', '2001-04-06', 4, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/oscar-piastri.png', 81),
-- Aston Martin
('Fernando', 'Alonso', 'Spain', '1981-07-29', 5, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/fernando-alonso.png', 14),
('Lance', 'Stroll', 'Canada', '1998-10-29', 5, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/lance-stroll.png', 18),
-- RB
('Liam', 'Lawson', 'New Zealand', '2002-02-11', 6, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/liam-lawson.png', 30),
('Isack', 'Hadjar', 'France', '2004-09-28', 6, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/isack-hadjar.png', 6),
-- Alpine
('Pierre', 'Gasly', 'France', '1996-02-07', 7, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/pierre-gasly.png', 10),
('Jack', 'Doohan', 'Australia', '2003-01-20', 7, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/jack-doohan.png', 7),
-- Williams
('Alexander', 'Albon', 'Thailand', '1996-03-23', 8, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/alexander-albon.png', 23),
('Carlos', 'Sainz', 'Spain', '1994-09-01', 8, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/carlos-sainz.png', 55),
-- Kick Sauber
('Nico', 'Hülkenberg', 'Germany', '1987-08-19', 9, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/nico-hulkenberg.png', 27),
('Gabriel', 'Bortoleto', 'Brazil', '2004-10-14', 9, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/gabriel-bortoleto.png', 5),
-- Haas
('Esteban', 'Ocon', 'France', '1996-09-17', 10, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/esteban-ocon.png', 31),
('Oliver', 'Bearman', 'United Kingdom', '2005-05-08', 10, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/oliver-bearman.png', 87);

-- Insert Seasons
INSERT INTO seasons (year) VALUES
(2025),
(2024),
(2023);

-- Insert Circuits
INSERT INTO circuits (name, location, country, length_km, laps, image_url) VALUES
('Bahrain International Circuit', 'Sakhir', 'Bahrain', 5.41, 57, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/circuits/Bahrain.png'),
('Jeddah Corniche Circuit', 'Jeddah', 'Saudi Arabia', 6.17, 50, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/circuits/Jeddah.png'),
('Albert Park Circuit', 'Melbourne', 'Australia', 5.28, 58, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/circuits/Australia.png'),
('Shanghai International Circuit', 'Shanghai', 'China', 5.45, 56, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/circuits/China.png'),
('Circuit de Monaco', 'Monte Carlo', 'Monaco', 3.34, 78, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/circuits/Monaco.png'),
('Circuit de Barcelona-Catalunya', 'Barcelona', 'Spain', 4.67, 66, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/circuits/Spain.png'),
('Circuit Gilles Villeneuve', 'Montreal', 'Canada', 4.36, 70, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/circuits/Canada.png'),
('Red Bull Ring', 'Spielberg', 'Austria', 4.32, 71, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/circuits/Austria.png'),
('Silverstone Circuit', 'Silverstone', 'United Kingdom', 5.89, 52, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/circuits/Silverstone.png'),
('Hungaroring', 'Budapest', 'Hungary', 4.38, 70, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/circuits/Hungary.png'),
('Circuit de Spa-Francorchamps', 'Spa', 'Belgium', 7.00, 44, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/circuits/Spa.png'),
('Circuit Zandvoort', 'Zandvoort', 'Netherlands', 4.26, 72, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/circuits/Netherlands.png'),
('Autodromo Nazionale di Monza', 'Monza', 'Italy', 5.79, 53, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/circuits/Italy.png'),
('Marina Bay Street Circuit', 'Singapore', 'Singapore', 4.94, 62, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/circuits/Singapore.png'),
('Suzuka International Racing Course', 'Suzuka', 'Japan', 5.81, 53, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/circuits/Japan.png'),
('Losail International Circuit', 'Lusail', 'Qatar', 5.38, 57, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/circuits/Qatar.png'),
('Circuit of the Americas', 'Austin', 'United States', 5.51, 56, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/circuits/USA.png'),
('Autódromo Hermanos Rodríguez', 'Mexico City', 'Mexico', 4.30, 71, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/circuits/Mexico.png'),
('Autódromo José Carlos Pace', 'São Paulo', 'Brazil', 4.31, 71, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/circuits/Brazil.png'),
('Las Vegas Street Circuit', 'Las Vegas', 'United States', 6.12, 50, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/circuits/LasVegas.png'),
('Yas Marina Circuit', 'Abu Dhabi', 'United Arab Emirates', 5.28, 58, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/circuits/AbuDhabi.png');

-- Insert Races for 2025 Season
INSERT INTO races (season_id, circuit_id, race_name, race_date, round_number) VALUES
(1, 3, 'Australian Grand Prix', '2025-03-16', 1),
(1, 4, 'Chinese Grand Prix', '2025-03-23', 2),
(1, 2, 'Saudi Arabian Grand Prix', '2025-04-06', 3),
(1, 1, 'Bahrain Grand Prix', '2025-04-13', 4),
(1, 5, 'Monaco Grand Prix', '2025-05-25', 5),
(1, 6, 'Spanish Grand Prix', '2025-06-01', 6),
(1, 7, 'Canadian Grand Prix', '2025-06-15', 7),
(1, 8, 'Austrian Grand Prix', '2025-06-29', 8),
(1, 9, 'British Grand Prix', '2025-07-06', 9),
(1, 11, 'Belgian Grand Prix', '2025-07-27', 10),
(1, 10, 'Hungarian Grand Prix', '2025-08-03', 11),
(1, 12, 'Dutch Grand Prix', '2025-08-31', 12),
(1, 13, 'Italian Grand Prix', '2025-09-07', 13),
(1, 15, 'Japanese Grand Prix', '2025-09-21', 14),
(1, 14, 'Singapore Grand Prix', '2025-10-05', 15),
(1, 17, 'United States Grand Prix', '2025-10-19', 16),
(1, 18, 'Mexico City Grand Prix', '2025-10-26', 17),
(1, 19, 'Brazilian Grand Prix', '2025-11-09', 18),
(1, 20, 'Las Vegas Grand Prix', '2025-11-22', 19),
(1, 16, 'Qatar Grand Prix', '2025-11-30', 20),
(1, 21, 'Abu Dhabi Grand Prix', '2025-12-07', 21);

-- Insert News
INSERT INTO news (title, content, image_url, author_id) VALUES
('Leclerc Wins Monaco GP', 'Charles Leclerc claims his first home victory at the Monaco Grand Prix in a thrilling race...', 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/news/monaco-2025.jpg', 1),
('Hamilton Joins Ferrari', 'Lewis Hamilton makes his debut for Scuderia Ferrari in the 2025 season...', 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/news/hamilton-ferrari.jpg', 1),
('Verstappen Extends Championship Lead', 'Max Verstappen dominates at Spa to extend his championship lead...', 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/news/verstappen-spa.jpg', 1);

-- Insert Sample Race Results (Monaco GP 2025)
INSERT INTO race_results (race_id, driver_id, team_id, position, points, time, fastest_lap) VALUES
(5, 1, 1, 1, 25.0, '1:33:45.678', FALSE),
(5, 3, 2, 2, 18.0, '1:33:55.012', TRUE),
(5, 7, 4, 3, 15.0, '1:34:05.234', FALSE);

-- Insert Sample Driver Standings (2025)
INSERT INTO driver_standings (season_id, driver_id, points, position) VALUES
(1, 3, 150.0, 1),
(1, 1, 125.0, 2),
(1, 7, 110.0, 3);

-- Insert Sample Team Standings (2025)
INSERT INTO team_standings (season_id, team_id, points, position) VALUES
(1, 2, 250.0, 1),
(1, 1, 220.0, 2),
(1, 4, 200.0, 3);
