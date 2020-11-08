#!/usr/bin/env bash

set -u
: "$SERVER_URL"
: "$SERVER_USER"

echo "Deploying onto server $SERVER_URL with user $SERVER_USER"

scp .env-production $SERVER_USER@$SERVER_URL:/home/build/
ssh $SERVER_USER@$SERVER_URL 'bash -s' < scripts/redeploy-containers.sh
