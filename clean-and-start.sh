#!/bin/bash

echo "🧹 Cleaning Next.js cache..."
rm -rf .next

echo "📦 Installing dependencies..."
npm install

echo "🏗️ Building project..."
npm run build

echo "🚀 Starting development server..."
npm run dev 