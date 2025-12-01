package congngheweb.f1.formula1.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

// Disabled for Supabase - database already exists
// @Component
public class DatabaseInitializer implements CommandLineRunner {

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;

    private static final String DATABASE_NAME = "formula1";
    private static final String MASTER_URL = "jdbc:postgresql://localhost:5432/postgres";

    @Override
    public void run(String... args) {
        try {
            createDatabaseIfNotExists();
        } catch (Exception e) {
            System.err.println("Error during database initialization: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private void createDatabaseIfNotExists() {
        try (Connection connection = DriverManager.getConnection(MASTER_URL, username, password);
                Statement statement = connection.createStatement()) {

            // Check if database exists
            String checkDbQuery = String.format(
                    "SELECT database_id FROM sys.databases WHERE name = '%s'", DATABASE_NAME);

            ResultSet resultSet = statement.executeQuery(checkDbQuery);

            if (!resultSet.next()) {
                // Database doesn't exist, create it
                String createDbQuery = String.format("CREATE DATABASE [%s]", DATABASE_NAME);
                statement.executeUpdate(createDbQuery);
                System.out.println("✅ Database '" + DATABASE_NAME + "' created successfully!");
            } else {
                System.out.println("ℹ️ Database '" + DATABASE_NAME + "' already exists.");
            }

            resultSet.close();

        } catch (Exception e) {
            System.err.println("❌ Failed to create database: " + e.getMessage());
            throw new RuntimeException("Database initialization failed", e);
        }
    }
}
