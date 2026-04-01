@echo off
echo Testing RecipeHub Services...

echo.
echo Testing User Service (Direct)...
curl http://localhost:5001/api/users

echo.
echo Testing Recipe Service (Direct)...
curl http://localhost:5002/api/recipes

echo.
echo Testing Notification Service (Direct)...
curl http://localhost:5004/api/notifications

echo.
echo Testing User Service (via API Gateway)...
curl http://localhost:3000/api/users

echo.
echo Testing Recipe Service (via API Gateway)...
curl http://localhost:3000/api/recipes

echo.
echo Testing Notification Service (via API Gateway)...
curl http://localhost:3000/api/notifications

echo.
echo Test complete!
pause
