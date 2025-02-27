#!/bin/bash

# Check if .env file exists
if [ ! -f .env ]; then
  echo ".env file not found!"
  exit 1
fi

# Export all variables from .env
while IFS='=' read -r key value; do
  # Ignore commented and empty lines
  if [[ -n "$key" && "$key" != \#* ]]; then
    # Expand any command inside $()
    if [[ "$value" == *'$('*')'* ]]; then
      value=$(eval echo "$value")
    fi

    export "$key=$value"
    echo "Exported: $key=$value"
  fi
done < .env

