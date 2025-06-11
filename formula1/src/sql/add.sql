use formula1;

INSERT INTO users (username, password_hash, email, role)
VALUES 
('admin', 'hashed_password_admin', 'admin@f1.com', 'admin'),
('johndoe', 'hashed_password_user', 'john@example.com', 'user');

INSERT INTO news (title, content, image_url, author_id)
VALUES 
('Leclerc Wins Monaco GP', 'Charles Leclerc claims his first home victory...', 'https://f1.com/images/news1.jpg', 1);

INSERT INTO teams (name, base_country, logo_url, principal, power_unit)
VALUES 
('Scuderia Ferrari', 'Italy', 'https://f1.com/logos/ferrari.png', 'Frédéric Vasseur', 'Ferrari'),
('Red Bull Racing', 'Austria', 'https://f1.com/logos/redbull.png', 'Christian Horner', 'Honda RBPT');

INSERT INTO drivers (first_name, last_name, nationality, date_of_birth, team_id, image_url, number)
VALUES 
('Charles', 'Leclerc', 'Monaco', '1997-10-16', 1, 'https://f1.com/drivers/leclerc.jpg', 16),
('Max', 'Verstappen', 'Netherlands', '1997-09-30', 2, 'https://f1.com/drivers/verstappen.jpg', 1);

INSERT INTO seasons (year)
VALUES (2025);

INSERT INTO circuits (name, location, country, length_km, laps, image_url)
VALUES 
('Circuit de Monaco', 'Monte Carlo', 'Monaco', 3.34, 78, 'https://f1.com/circuits/monaco.jpg');

INSERT INTO races (season_id, circuit_id, race_name, race_date, round_number)
VALUES 
(1, 1, 'Monaco Grand Prix', '2025-05-25', 7);

INSERT INTO race_results (race_id, driver_id, team_id, position, points, time, fastest_lap)
VALUES 
(1, 1, 1, 1, 25.0, '1:33:45.678', FALSE),
(1, 2, 2, 2, 18.0, '1:33:55.012', TRUE);

INSERT INTO driver_standings (season_id, driver_id, points, position)
VALUES 
(1, 1, 125.0, 1),
(1, 2, 119.0, 2);

INSERT INTO team_standings (season_id, team_id, points, position)
VALUES 
(1, 1, 220.0, 1),
(1, 2, 210.0, 2);

INSERT INTO drivers (first_name, last_name, nationality, date_of_birth, team_id, image_url, number) VALUES
('Oscar', 'Piastri', 'Australia', '2001-04-06', 4, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/oscar-piastri.png', 81),

('George', 'Russell', 'United Kingdom', '1998-02-15', 3, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/george-russell.png', 63),
('Kimi', 'Antonelli', 'Italy', '2006-08-25', 3, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/kimi-antonelli.png', 34),

('Yuki', 'Tsunoda', 'Japan', '2000-05-11', 2, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/yuki-tsunoda.png', 22),

('Alexander', 'Albon', 'Thailand', '1996-03-23', 5, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/alexander-albon.png', 23),
('Carlos', 'Sainz', 'Spain', '1994-09-01', 5, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/carlos-sainz.png', 55),

('Liam', 'Lawson', 'New Zealand', '2002-02-11', 6, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/liam-lawson.png', 40),
('Isack', 'Hadjar', 'France', '2004-09-28', 6, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/isack-hadjar.png', 20),

('Esteban', 'Ocon', 'France', '1996-09-17', 7, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/esteban-ocon.png', 31),
('Oliver', 'Bearman', 'United Kingdom', '2005-05-08', 7, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/oliver-bearman.png', 87),

('Nico', 'Hülkenberg', 'Germany', '1987-08-19', 8, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/nico-hulkenberg.png', 27),
('Gabriel', 'Bortoleto', 'Brazil', '2004-10-14', 8, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/gabriel-bortoleto.png', 42),

('Lance', 'Stroll', 'Canada', '1998-10-29', 9, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/lance-stroll.png', 18),

('Pierre', 'Gasly', 'France', '1996-02-07', 10, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/pierre-gasly.png', 10),
('Franco', 'Colapinto', 'Argentina', '2003-05-27', 10, 'https://media.formula1.com/image/upload/f_auto/q_auto/v1682501380/fom-website/drivers/franco-colapinto.png', 21);
