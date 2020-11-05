FROM openjdk:14-alpine

COPY . /app
WORKDIR /app
RUN ./gradlew build

COPY build/libs/server-*-all.jar server.jar
EXPOSE 8080
CMD ["java", "-Dcom.sun.management.jmxremote", "-Xmx128m", "-jar", "server.jar"]
