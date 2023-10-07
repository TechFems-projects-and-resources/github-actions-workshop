#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

target_environment=${1:-development}

echo "Simulating a deployment to environemnt: [${target_environment}]"
echo "Deployment started"
echo "Deploying following files:"
ls -R ./build
echo "Deployment in progress..."
sleep 10
echo "Deployment to environment [${target_environment}] completed successfully"
