#!/bin/bash
set -euo pipefail

if [ "$1" == "help" ]; then
    echo "Available commands:"
    echo "  up                - Start the services using the docker-compose.yaml file."
    echo "  down              - Stop and remove all services."
    echo "  create-partition-topic - Run the partition.js script to create a Kafka topic with partitions."
    echo ""
    echo "Usage:"
    echo "  Use 'make <command>' to execute a specific command."
    echo "  Use 'up' for default setup or 'up:v2' for version 2 setup."
fi