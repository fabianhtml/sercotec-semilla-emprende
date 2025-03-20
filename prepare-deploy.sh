#!/bin/bash

# Clean the deployment directory
rm -rf .cloudflare-deploy/*

# Create necessary directories
mkdir -p .cloudflare-deploy/static

# Copy static assets
cp -r .next/static/* .cloudflare-deploy/static/

# Copy the index.html file
cp .cloudflare/index.html .cloudflare-deploy/

# Copy the _headers file
cp .cloudflare/_headers .cloudflare-deploy/

# Copy the _routes.json file
cp .cloudflare/_routes.json .cloudflare-deploy/

echo "Deployment files prepared successfully!"
