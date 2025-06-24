#!/bin/bash

echo "🛠️  Fixing Internal Server Error..."

# Stop any running process on port 5174
echo "Stopping processes on port 5174..."
lsof -ti:5174 | xargs kill -9 2>/dev/null || true

# Clean everything
echo "Cleaning caches..."
rm -rf .next
rm -rf node_modules/.cache
rm -rf .turbo

# Install dependencies
echo "Installing dependencies..."
npm install

# Build once
echo "Building project..."
npm run build

echo "✅ Fixed! Starting development server..."
npm run dev 