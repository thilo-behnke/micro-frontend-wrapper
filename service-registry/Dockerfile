FROM openjdk:14-alpine

COPY . /service-registry
WORKDIR /service-registry
RUN ./gradlew build

RUN cp build/libs/service-registry-*-all.jar service-registry.jar

EXPOSE 8090
CMD ["java", "-Dcom.sun.management.jmxremote", "-Xmx128m", "-jar", "service-registry.jar"]
