#!/bin/bash

echo "🧪 Testing Pacify App"
echo "===================="

# Quick cleanup
rm -rf .next 2>/dev/null || true

echo "🚀 Starting test server..."
echo "   Testing on http://localhost:5174"
echo "   Looking for JavaScript errors..."
echo ""

# Start in background
npm run dev &
SERVER_PID=$!

# Wait for server to start
sleep 5

# Test basic response
echo "📡 Testing server response..."
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5174)

if [ "$RESPONSE" = "200" ]; then
    echo "✅ Server responding successfully (HTTP $RESPONSE)"
    echo "🎯 App should be ready at: http://localhost:5174"
    echo ""
    echo "🔍 Test the new features:"
    echo "   • 🧠 Kind verstehen Button"
    echo "   • 🤗 Für mich da sein Button" 
    echo "   • 👶 Kinderperspektive Button"
    echo "   • 💡 Konkrete Lösung Button"
    echo ""
    echo "⏹️  Press Ctrl+C to stop the server"
    
    # Keep server running
    wait $SERVER_PID
else
    echo "❌ Server error (HTTP $RESPONSE)"
    echo "🔍 Check the terminal output above for errors"
    kill $SERVER_PID 2>/dev/null || true
    exit 1
fi 