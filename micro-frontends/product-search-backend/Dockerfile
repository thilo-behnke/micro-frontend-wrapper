FROM openjdk:14-alpine
COPY build/libs/product-search-backend-*-all.jar product-search-backend.jar
EXPOSE 8080
CMD ["java", "-Dcom.sun.management.jmxremote", "-Xmx128m", "-jar", "product-search-backend.jar"]