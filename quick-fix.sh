#!/bin/bash

echo "🛠️ Quick Fix for Pacify Prototype"
echo "=================================="

# Kill any existing Next.js processes
echo "🔴 Stopping any running servers..."
killall node 2>/dev/null || true
killall next 2>/dev/null || true

# Clean build artifacts and caches
echo "🧹 Cleaning caches..."
rm -rf .next 2>/dev/null || true
rm -rf node_modules/.cache 2>/dev/null || true
rm -rf .turbo 2>/dev/null || true

# Clear npm cache
echo "📦 Clearing npm cache..."
npm cache clean --force

echo "✅ Cleanup complete!"
echo "🚀 Starting development server..."
echo "   This will open http://localhost:5174"
echo "   Press Ctrl+C to stop"
echo ""

npm run dev 