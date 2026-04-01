# Manual Startup Guide for RecipeHub

## Step 1: Install Dependencies (run once)
```bash
# In each service folder, run:
cd user-service && npm install
cd ../recipe-service && npm install
cd ../notification-service && npm install
cd ../api-gateway && npm install
cd ../frontend && npm install
```

## Step 2: Start Services Individually

Open 5 separate terminal windows and run:

### Terminal 1 - User Service
```bash
cd c:/recipe-app/user-service
npm run dev
```

### Terminal 2 - Recipe Service
```bash
cd c:/recipe-app/recipe-service
npm run dev
```

### Terminal 3 - Notification Service
```bash
cd c:/recipe-app/notification-service
npm run dev
```

### Terminal 4 - API Gateway
```bash
cd c:/recipe-app/api-gateway
npm run dev
```

### Terminal 5 - Frontend
```bash
cd c:/recipe-app/frontend
npm run dev
```

## Step 3: Access Your App
- Frontend: http://localhost:5173
- API Gateway: http://localhost:3000
- User Service: http://localhost:5001
- Recipe Service: http://localhost:5002
- Notification Service: http://localhost:5004

## Troubleshooting

### Error: "Missing script: dev"
- Run `npm install` in the service folder
- Check package.json has "dev" script

### Error: "Cannot find path"
- Make sure you're in the correct directory
- Use `cd c:/recipe-app` first

### Error: Port already in use
- Close other applications using the port
- Or change the port in .env files

### MongoDB Connection Error
- Make sure MongoDB is running locally
- Check connection string in .env files
- Use MongoDB Compass to verify connection
