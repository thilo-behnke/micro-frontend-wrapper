#!/usr/bin/env bash

set -e

cd micro-frontends/product-search-client
npm install
npm run build
aws s3 cp public/build/product-search-app__*.js s3://micro-frontend-app-assets
