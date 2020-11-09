#!/usr/bin/env bash

set -e
set -u
: "$APP_REGISTRY_URL"
: "$S3_URL"

echo "Using app registry with url $APP_REGISTRY_URL."
echo "Using s3 storage with url $S3_URL."

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

# TODO: Build as docker container.
# TODO: Push docker container into registry
# TODO: Register at service registry

