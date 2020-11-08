#!/usr/bin/env bash

set -u
: "$SERVER_URL"
: "$SERVER_USER"
: "$DOCKER_REGISTRY"

echo "Deploying onto server $SERVER_URL with user $SERVER_USER"

scp .env-production $SERVER_USER@$SERVER_URL:/home/build/
if [ $? -eq 0 ]; then
    echo "Exit code: $?"
    echo "ERROR on copying env file"
    exit $?
fi

ssh $SERVER_USER@$SERVER_URL DOCKER_REGISTRY=$DOCKER_REGISTRY 'bash -s' < scripts/redeploy-containers.sh
if [ $? -eq 0 ]; then
    echo "Exit code: $?"
    echo "ERROR on redeploying containers"
    exit $?
fi
