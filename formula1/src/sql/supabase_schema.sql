-- Formula1 Database Schema for PostgreSQL (Supabase)
-- Run this in Supabase SQL Editor

-- Drop tables if they exist (in correct order due to foreign keys)
DROP TABLE IF EXISTS team_standings CASCADE;
DROP TABLE IF EXISTS driver_standings CASCADE;
DROP TABLE IF EXISTS race_results CASCADE;
DROP TABLE IF EXISTS races CASCADE;
DROP TABLE IF EXISTS circuits CASCADE;
DROP TABLE IF EXISTS seasons CASCADE;
DROP TABLE IF EXISTS drivers CASCADE;
DROP TABLE IF EXISTS teams CASCADE;
DROP TABLE IF EXISTS news CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- News table
CREATE TABLE news (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,    
    content TEXT,
    image_url VARCHAR(255),
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    author_id BIGINT,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Teams table
CREATE TABLE teams (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    base_country VARCHAR(100),
    logo_url VARCHAR(255),
    principal VARCHAR(100),
    power_unit VARCHAR(100)
);

-- Drivers table
CREATE TABLE drivers (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    nationality VARCHAR(50),
    date_of_birth DATE,
    team_id BIGINT,
    image_url VARCHAR(255),
    number INTEGER,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE SET NULL
);

-- Seasons table
CREATE TABLE seasons (
    id BIGSERIAL PRIMARY KEY,
    year INTEGER UNIQUE NOT NULL,
    champion_driver_id BIGINT,
    champion_team_id BIGINT,
    FOREIGN KEY (champion_driver_id) REFERENCES drivers(id) ON DELETE SET NULL,
    FOREIGN KEY (champion_team_id) REFERENCES teams(id) ON DELETE SET NULL
);

-- Circuits table
CREATE TABLE circuits (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    country VARCHAR(100),
    length_km DECIMAL(5,2),
    laps INTEGER,
    image_url VARCHAR(255)
);

-- Races table
CREATE TABLE races (
    id BIGSERIAL PRIMARY KEY,
    season_id BIGINT NOT NULL,
    circuit_id BIGINT NOT NULL,
    race_name VARCHAR(100) NOT NULL,
    race_date DATE,
    round_number INTEGER,
    FOREIGN KEY (season_id) REFERENCES seasons(id) ON DELETE CASCADE,
    FOREIGN KEY (circuit_id) REFERENCES circuits(id) ON DELETE CASCADE
);

-- Race Results table
CREATE TABLE race_results (
    id BIGSERIAL PRIMARY KEY,
    race_id BIGINT NOT NULL,
    driver_id BIGINT NOT NULL,
    team_id BIGINT NOT NULL,
    position INTEGER,
    points DECIMAL(4,1),
    time VARCHAR(50),
    fastest_lap BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (race_id) REFERENCES races(id) ON DELETE CASCADE,
    FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE CASCADE,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);

-- Driver Standings table
CREATE TABLE driver_standings (
    id BIGSERIAL PRIMARY KEY,
    season_id BIGINT NOT NULL,
    driver_id BIGINT NOT NULL,
    points DECIMAL(5,1),
    position INTEGER,
    FOREIGN KEY (season_id) REFERENCES seasons(id) ON DELETE CASCADE,
    FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE CASCADE
);

-- Team Standings table
CREATE TABLE team_standings (
    id BIGSERIAL PRIMARY KEY,
    season_id BIGINT NOT NULL,
    team_id BIGINT NOT NULL,
    points DECIMAL(5,1),
    position INTEGER,
    FOREIGN KEY (season_id) REFERENCES seasons(id) ON DELETE CASCADE,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX idx_drivers_team_id ON drivers(team_id);
CREATE INDEX idx_drivers_nationality ON drivers(nationality);
CREATE INDEX idx_races_season_id ON races(season_id);
CREATE INDEX idx_races_circuit_id ON races(circuit_id);
CREATE INDEX idx_race_results_race_id ON race_results(race_id);
CREATE INDEX idx_race_results_driver_id ON race_results(driver_id);
CREATE INDEX idx_driver_standings_season_id ON driver_standings(season_id);
CREATE INDEX idx_team_standings_season_id ON team_standings(season_id);

-- Grant permissions (Supabase handles this automatically, but included for reference)
-- GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres;
-- GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres;

COMMENT ON TABLE users IS 'User accounts for the F1 application';
COMMENT ON TABLE teams IS 'Formula 1 teams';
COMMENT ON TABLE drivers IS 'Formula 1 drivers';
COMMENT ON TABLE seasons IS 'F1 seasons with champions';
COMMENT ON TABLE circuits IS 'F1 racing circuits';
COMMENT ON TABLE races IS 'Individual races in a season';
COMMENT ON TABLE race_results IS 'Results for each race';
COMMENT ON TABLE driver_standings IS 'Driver championship standings';
COMMENT ON TABLE team_standings IS 'Constructor championship standings';
