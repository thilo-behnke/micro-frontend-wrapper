FROM openjdk:14-alpine

COPY . /server
WORKDIR /server
RUN ./gradlew build

EXPOSE 8080
CMD ["java", "-Dcom.sun.management.jmxremote", "-Xmx128m", "-jar", "build/libs/server.jar"]
