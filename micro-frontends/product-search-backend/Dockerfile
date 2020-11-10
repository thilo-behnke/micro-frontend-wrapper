FROM openjdk:14-alpine

COPY . /app
WORKDIR /app
RUN ./gradlew build

RUN ls build/libs/
COPY build/libs/product-search-backend-*-all.jar product-search-backend.jar
EXPOSE 9000
CMD ["java", "-Dcom.sun.management.jmxremote", "-Xmx128m", "-jar", "product-search-backend.jar"]
