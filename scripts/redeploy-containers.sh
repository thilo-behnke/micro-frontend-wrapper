#!/usr/bin/env bash

set -u
: "$DOCKER_REGISTRY"

echo "Using docker registry: $DOCKER_REGISTRY"

(docker stop server && docker rm server && false) || (docker stop service_registry && docker rm service_registry && false) || (docker stop service_registry_mongo && docker rm service_registry_mongo && false) || (docker stop client && docker rm client && false) || true

docker network create 'app-net' || true

docker pull $DOCKER_REGISTRY/micro_frontend_wrapper_server:latest
docker pull $DOCKER_REGISTRY/micro_frontend_wrapper_service_registry:latest
docker pull $DOCKER_REGISTRY/micro_frontend_wrapper_service_registry_mongo:latest
docker pull $DOCKER_REGISTRY/micro_frontend_wrapper_client:latest

docker run -d --env-file .env-production --name server --network "app-net" $DOCKER_REGISTRY/micro_frontend_wrapper_server:latest
docker run -d --env-file .env-production --name service_registry --network "app-net" $DOCKER_REGISTRY/micro_frontend_wrapper_service_registry:latest
docker run -d --env-file .env-production --name service_registry_mongo --network "app-net" $DOCKER_REGISTRY/micro_frontend_wrapper_service_registry_mongo:latest
docker run -d --env-file .env-production --name client --network "app-net" -p "80:80" $DOCKER_REGISTRY/micro_frontend_wrapper_client:latest
