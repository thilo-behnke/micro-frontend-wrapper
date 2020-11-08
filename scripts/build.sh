#!/usr/bin/env bash

set -u
: "$DOCKER_REGISTRY"

echo "Using docker registry: $DOCKER_REGISTRY"

export $(cat .env-production | xargs) && docker-compose build client server service-registry

docker tag microfrontend_server $DOCKER_REGISTRY/micro_frontend_wrapper_server:latest
docker tag microfrontend_server $DOCKER_REGISTRY/micro_frontend_wrapper_server:$BUILD_NUMBER
docker push $DOCKER_REGISTRY/micro_frontend_wrapper_server

docker tag microfrontend_service-registry $DOCKER_REGISTRY/micro_frontend_wrapper_service_registry:latest
docker tag microfrontend_service-registry $DOCKER_REGISTRY/micro_frontend_wrapper_service_registry:$BUILD_NUMBER
docker push $DOCKER_REGISTRY/micro_frontend_wrapper_service_registry

docker tag microfrontend_service-registry-mongo $DOCKER_REGISTRY/micro_frontend_wrapper_service_registry_mongo:latest
docker tag microfrontend_service-registry-mongo $DOCKER_REGISTRY/micro_frontend_wrapper_service_registry_mongo:$BUILD_NUMBER
docker push $DOCKER_REGISTRY/micro_frontend_wrapper_service_registry_mongo

docker tag microfrontend_client $DOCKER_REGISTRY/micro_frontend_wrapper_client:latest
docker tag microfrontend_client $DOCKER_REGISTRY/micro_frontend_wrapper_client:$BUILD_NUMBER
docker push $DOCKER_REGISTRY/micro_frontend_wrapper_client
