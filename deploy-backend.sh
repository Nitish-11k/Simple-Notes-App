#!/bin/bash

echo "🚀 Deploying Notes App Backend to Render..."

# Build the application
echo "📦 Building application..."
cd backend
mvn clean package -DskipTests

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 JAR file created: target/notes-app-0.0.1-SNAPSHOT.jar"
    echo ""
    echo "🌐 To deploy to Render:"
    echo "1. Go to https://render.com"
    echo "2. Create a new Web Service"
    echo "3. Connect your GitHub repository"
    echo "4. Use these settings:"
    echo "   - Build Command: cd backend && mvn clean package -DskipTests"
    echo "   - Start Command: cd backend && java -jar target/notes-app-0.0.1-SNAPSHOT.jar"
    echo "   - Environment Variables:"
    echo "     * DATABASE_PASSWORD: Nope2@13"
    echo "     * FRONTEND_URL: https://simple-notes-app-inky.vercel.app"
    echo "     * SPRING_PROFILES_ACTIVE: prod"
    echo ""
    echo "🔗 After deployment, update your Vercel environment variable:"
    echo "   REACT_APP_API_URL=https://your-render-app-url.onrender.com"
else
    echo "❌ Build failed!"
    exit 1
fi
