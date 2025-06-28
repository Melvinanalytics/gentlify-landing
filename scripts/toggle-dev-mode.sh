#!/bin/bash

# Script to toggle development mode

if [ "$1" = "on" ]; then
  echo "Enabling development mode..."
  if [ -f .env.local ]; then
    # Update existing .env.local
    if grep -q "NEXT_PUBLIC_DEV_MODE=" .env.local; then
      sed -i '' 's/NEXT_PUBLIC_DEV_MODE=.*/NEXT_PUBLIC_DEV_MODE=true/' .env.local
    else
      echo -e "\n# Development Mode\nNEXT_PUBLIC_DEV_MODE=true" >> .env.local
    fi
  else
    # Create new .env.local
    cp .env.local.example .env.local
    sed -i '' 's/NEXT_PUBLIC_DEV_MODE=.*/NEXT_PUBLIC_DEV_MODE=true/' .env.local
  fi
  echo "✅ Development mode enabled!"
  echo "🚀 Start the app with: npm run dev"
  
elif [ "$1" = "off" ]; then
  echo "Disabling development mode..."
  if [ -f .env.local ]; then
    sed -i '' 's/NEXT_PUBLIC_DEV_MODE=.*/NEXT_PUBLIC_DEV_MODE=false/' .env.local
    echo "✅ Development mode disabled!"
  else
    echo "❌ No .env.local file found"
  fi
  
else
  echo "Usage: $0 [on|off]"
  echo "  on  - Enable development mode (bypass auth)"
  echo "  off - Disable development mode (normal auth)"
fi