@echo off
echo Starting RecipeHub Services...

echo Starting User Service...
cd /d "%~dp0user-service"
start "User Service" cmd /k "npm run dev"

echo Starting Recipe Service...
cd /d "%~dp0recipe-service"
start "Recipe Service" cmd /k "npm run dev"

echo Starting Notification Service...
cd /d "%~dp0notification-service"
start "Notification Service" cmd /k "npm run dev"

echo Starting API Gateway...
cd /d "%~dp0api-gateway"
start "API Gateway" cmd /k "npm run dev"

echo Starting Frontend...
cd /d "%~dp0frontend"
start "Frontend" cmd /k "npm run dev"

echo All services started!
echo Access your app at: http://localhost:5173
echo Press any key to exit...
pause
