# Build stage
FROM maven:3.9-eclipse-temurin-17 AS builder

WORKDIR /build
COPY . .

RUN mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

COPY --from=builder /build/target/*.jar app.jar

RUN mkdir -p /opt/render/project/uploads /tmp/uploads

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=30s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:${PORT:-8080}/api/health || exit 1

CMD ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-Dspring.profiles.active=prod", "-jar", "app.jar"]
