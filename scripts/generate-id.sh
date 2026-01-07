#!/bin/bash
# Generate a short unique ID (similar to nanoid)
# Usage: ./generate-id.sh

cat /dev/urandom | tr -dc 'a-z0-9' | fold -w 8 | head -n 1
