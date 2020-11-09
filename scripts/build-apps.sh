#!/usr/bin/env bash

set -e
set -u
: "$APP_REGISTRY_URL"
: "$SERVICE_REGISTRY_URL"
: "$S3_URL"
: "$DOCKER_REGISTRY"

echo "Using docker registry: $DOCKER_REGISTRY"
echo "Using app registry: $APP_REGISTRY_URL."
echo "Using s3 storage: $S3_URL."

# Register micro frontend.

cd micro-frontends/product-search-client
npm install
npm run build

app_version=$(jq -r '.appVersion' public/build/app-manifest.json)
js_bundle_filename=public/build/product-search-app__$app_version.js
app_url="$S3_URL/micro-frontend-app-assets"
json=$(jq -r --arg app_url $app_url '. + {appUrl: $app_url}' public/build/app-manifest.json)

aws s3 cp js_bundle_filename s3://micro-frontend-app-assets
curl -X POST -H "Content-Type: application/json" -d json $APP_REGISTRY_URL/manifest-api/manifests

# Register micro frontend bff.

cd ../product-search-backend

docker build -t $DOCKER_REGISTRY/micro_frontend_wrapper_product_search_backend:$BUILD_NUMBER -t $DOCKER_REGISTRY/micro_frontend_wrapper_product_search_backend:latest .
docker push $DOCKER_REGISTRY/micro_frontend_wrapper_product_search_backend
# TODO: Deploy docker container onto server.
curl -X POST -H "Content-Type: application/json" -d service-manifest.json $SERVICE_REGISTRY_URL/service-registry-api/services

