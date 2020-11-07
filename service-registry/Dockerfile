FROM openjdk:14-alpine

COPY . /service-registry
WORKDIR /service-registry
RUN ./gradlew build

EXPOSE 8090
CMD ["java", "-Dcom.sun.management.jmxremote", "-Xmx128m", "-jar", "build/libs/service-registry.jar"]
