FROM openjdk:14-alpine

ARG MICRONAUT_ENVIRONMENTS
ENV MICRONAUT_ENVIRONMENTS=${MICRONAUT_ENVIRONMENTS}

WORKDIR /app

COPY ./gradlew /app
COPY ./gradle /app/gradle
RUN ./gradlew --version
COPY . /app
RUN ./gradlew build

RUN cp build/libs/product-search-backend-*-all.jar product-search-backend.jar
EXPOSE 9000
CMD ["java", "-Dcom.sun.management.jmxremote", "-Xmx128m", "-jar", "product-search-backend.jar"]
