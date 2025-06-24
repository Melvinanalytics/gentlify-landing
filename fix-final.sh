#!/bin/bash

echo "🔧 FINAL FIX: Switching to Tailwind CSS v3..."

# Kill any process on port 5174
lsof -ti:5174 | xargs kill -9 2>/dev/null || true

# Remove all caches and problematic files
echo "Cleaning everything..."
rm -rf .next
rm -rf .turbo  
rm -rf node_modules/.cache
rm -rf node_modules

# Fresh install with correct dependencies
echo "Fresh npm install..."
npm install

# Test build
echo "Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful! Starting dev server..."
    npm run dev
else
    echo "❌ Build failed. Check package.json dependencies."
fi 