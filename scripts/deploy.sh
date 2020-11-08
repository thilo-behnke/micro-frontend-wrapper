#!/usr/bin/env bash

set -u
: "$SERVER_URL"
: "$SERVER_USER"
: "$DOCKER_REGISTRY"

echo "Deploying onto server $SERVER_URL with user $SERVER_USER"

scp .env-production $SERVER_USER@$SERVER_URL:/home/build/
if [ $? -eq 0 ]; then
    echo "Successfully copied environment file to server."
  else
    echo "Exit code: $?"
    echo "ERROR on copying env file"
    exit $?
fi

RESULT=$(ssh $SERVER_USER@$SERVER_URL DOCKER_REGISTRY=$DOCKER_REGISTRY 'bash -s' < scripts/redeploy-containers.sh)
echo $RESULT
echo $?
if [ $? -eq 0 ]; then
    echo "Successfully redeployed containers."
  else
    echo "Exit code: $?"
    echo "ERROR on redeploying containers"
    exit $?
fi
