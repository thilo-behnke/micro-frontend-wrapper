#!/usr/bin/env bash

set -e

cd micro-frontends/product-search-client
npm install
npm run build
aws s3 cp public/build/product-search-app__*.js s3://micro-frontend-app-assets
# TODO: Insert version into app-manifest.json - not possible with rollup, just use gulp?
# TODO: Use manifest data to register frontend at ManifestController.
# TODO: How to handle the s3 url? Public get for the beginning I guess.
