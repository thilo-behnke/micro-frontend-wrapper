FROM openjdk:14-alpine

ARG MICRONAUT_ENVIRONMENTS

COPY . /app
WORKDIR /app
RUN ./gradlew build

RUN cp build/libs/product-search-backend-*-all.jar product-search-backend.jar
EXPOSE 9000
CMD ["java", "-Dcom.sun.management.jmxremote", "-Xmx128m", "-jar", "product-search-backend.jar"]
