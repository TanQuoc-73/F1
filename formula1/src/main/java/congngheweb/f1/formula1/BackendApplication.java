package congngheweb.f1.formula1;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		// Load .env file if it exists
		try {
			Dotenv dotenv = Dotenv.configure()
					.ignoreIfMissing() // Don't fail if .env is missing (for production)
					.load();

			// Set environment variables from .env file
			dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));
		} catch (Exception e) {
			System.out.println("Warning: Could not load .env file - " + e.getMessage());
		}

		SpringApplication.run(BackendApplication.class, args);
	}

}
