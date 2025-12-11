# Stage 1: Build
FROM gradle:8.5-jdk17 AS build

WORKDIR /app

# Copy gradle files
COPY build.gradle settings.gradle ./
COPY gradle ./gradle

# Copy source code
COPY src ./src

# Build the application
RUN gradle build -x test --no-daemon

# Stage 2: Run
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy the built jar from build stage
COPY --from=build /app/build/libs/*.jar app.jar

# Expose port
EXPOSE 8080

# Set environment variables
ENV JAVA_OPTS="-Xmx512m -Xms256m"

# Run the application
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
