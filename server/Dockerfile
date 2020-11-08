FROM openjdk:14-alpine

COPY . /server
WORKDIR /server
RUN ./gradlew build

RUN cp build/libs/server-*-all.jar server.jar

EXPOSE 8080
CMD ["java", "-Dcom.sun.management.jmxremote", "-Xmx128m", "-jar", "server.jar"]
