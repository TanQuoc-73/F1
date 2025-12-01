-- Clear all data from Formula1 database tables
-- Run this in Supabase SQL Editor to delete all data while keeping table structure
-- CAUTION: This will delete ALL data! Make sure you have backups if needed.

-- Disable foreign key checks temporarily (PostgreSQL uses CASCADE instead)
-- Delete data in reverse order of dependencies

-- Delete child tables first (those with foreign keys)
TRUNCATE TABLE team_standings CASCADE;
TRUNCATE TABLE driver_standings CASCADE;
TRUNCATE TABLE race_results CASCADE;
TRUNCATE TABLE races CASCADE;
TRUNCATE TABLE news CASCADE;

-- Delete parent tables
TRUNCATE TABLE circuits CASCADE;
TRUNCATE TABLE drivers CASCADE;
TRUNCATE TABLE seasons CASCADE;
TRUNCATE TABLE teams CASCADE;
TRUNCATE TABLE users CASCADE;

-- Reset sequences (auto-increment counters) to start from 1 again
ALTER SEQUENCE team_standings_id_seq RESTART WITH 1;
ALTER SEQUENCE driver_standings_id_seq RESTART WITH 1;
ALTER SEQUENCE race_results_id_seq RESTART WITH 1;
ALTER SEQUENCE races_id_seq RESTART WITH 1;
ALTER SEQUENCE circuits_id_seq RESTART WITH 1;
ALTER SEQUENCE drivers_id_seq RESTART WITH 1;
ALTER SEQUENCE seasons_id_seq RESTART WITH 1;
ALTER SEQUENCE teams_id_seq RESTART WITH 1;
ALTER SEQUENCE news_id_seq RESTART WITH 1;
ALTER SEQUENCE users_id_seq RESTART WITH 1;

-- Verify all tables are empty
SELECT 'users' as table_name, COUNT(*) as row_count FROM users
UNION ALL
SELECT 'teams', COUNT(*) FROM teams
UNION ALL
SELECT 'drivers', COUNT(*) FROM drivers
UNION ALL
SELECT 'seasons', COUNT(*) FROM seasons
UNION ALL
SELECT 'circuits', COUNT(*) FROM circuits
UNION ALL
SELECT 'races', COUNT(*) FROM races
UNION ALL
SELECT 'race_results', COUNT(*) FROM race_results
UNION ALL
SELECT 'driver_standings', COUNT(*) FROM driver_standings
UNION ALL
SELECT 'team_standings', COUNT(*) FROM team_standings
UNION ALL
SELECT 'news', COUNT(*) FROM news;

-- Success message
SELECT 'All tables cleared successfully! You can now run supabase_data.sql to insert fresh data.' as status;
