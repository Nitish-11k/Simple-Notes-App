FROM maven:3.8.6-openjdk-17 AS build

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:17-jre

WORKDIR /app

COPY --from=build /app/target/notes-app-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENV JAVA_OPTS="-Xmx512m -Xms256m"

CMD ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
