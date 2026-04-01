@echo off
echo Installing all dependencies for RecipeHub...

echo Installing User Service dependencies...
cd /d "%~dp0user-service"
npm install
npm install nodemon

echo Installing Recipe Service dependencies...
cd /d "%~dp0recipe-service"
npm install

echo Installing Notification Service dependencies...
cd /d "%~dp0notification-service"
npm install

echo Installing API Gateway dependencies...
cd /d "%~dp0api-gateway"
npm install

echo Installing Frontend dependencies...
cd /d "%~dp0frontend"
npm install

echo All dependencies installed!
echo Now you can run start-services.bat
pause
