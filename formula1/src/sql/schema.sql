create DATABASE IF NOT EXISTS formula1;
USE formula1;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    password_hash VARCHAR(255),
    email VARCHAR(100) UNIQUE,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    image_url VARCHAR(255),
    published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    author_id INT,
    FOREIGN KEY (author_id) REFERENCES users(id)
);

CREATE TABLE teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    base_country VARCHAR(100),
    logo_url VARCHAR(255),
    principal VARCHAR(100),
    power_unit VARCHAR(100)
);

CREATE TABLE drivers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    nationality VARCHAR(50),
    date_of_birth DATE,
    team_id INT,
    image_url VARCHAR(255),
    number INT,
    FOREIGN KEY (team_id) REFERENCES teams(id)
);

CREATE TABLE seasons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    year INT UNIQUE,
    champion_driver_id INT,
    champion_team_id INT,
    FOREIGN KEY (champion_driver_id) REFERENCES drivers(id),
    FOREIGN KEY (champion_team_id) REFERENCES teams(id)
);

CREATE TABLE circuits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    location VARCHAR(100),
    country VARCHAR(100),
    length_km DECIMAL(5,2),
    laps INT,
    image_url VARCHAR(255)
);

CREATE TABLE races (
    id INT AUTO_INCREMENT PRIMARY KEY,
    season_id INT,
    circuit_id INT,
    race_name VARCHAR(100),
    race_date DATE,
    round_number INT,
    FOREIGN KEY (season_id) REFERENCES seasons(id),
    FOREIGN KEY (circuit_id) REFERENCES circuits(id)
);

CREATE TABLE race_results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    race_id INT,
    driver_id INT,
    team_id INT,
    position INT,
    points DECIMAL(4,1),
    time VARCHAR(50),
    fastest_lap BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (race_id) REFERENCES races(id),
    FOREIGN KEY (driver_id) REFERENCES drivers(id),
    FOREIGN KEY (team_id) REFERENCES teams(id)
);

CREATE TABLE driver_standings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    season_id INT,
    driver_id INT,
    points DECIMAL(5,1),
    position INT,
    FOREIGN KEY (season_id) REFERENCES seasons(id),
    FOREIGN KEY (driver_id) REFERENCES drivers(id)
);

CREATE TABLE team_standings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    season_id INT,
    team_id INT,
    points DECIMAL(5,1),
    position INT,
    FOREIGN KEY (season_id) REFERENCES seasons(id),
    FOREIGN KEY (team_id) REFERENCES teams(id)
);
