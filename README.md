# Recipe App - Microservices Architecture

A full-stack recipe application built with microservices architecture, featuring user management, recipe sharing, order processing, and notification services.

## Architecture Overview

This application follows a microservices pattern with the following services:

- **Frontend**: React application with Vite
- **API Gateway**: Single entry point for all client requests
- **User Service**: Handles user authentication and management
- **Recipe Service**: Manages recipe CRUD operations
- **Order Service**: Handles recipe orders and status tracking
- **Notification Service**: Manages user notifications and email alerts

## Project Structure

```
foodapp/
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   ├── pages/             # Page components
│   │   ├── services/          # API service layer
│   │   └── assets/            # Static assets
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── api-gateway/               # API Gateway service
│   ├── routes/               # Gateway routing configuration
│   ├── config/               # Gateway configuration
│   ├── server.js
│   └── package.json
│
├── user-service/              # User management service
│   ├── routes/               # User routes
│   ├── controller/           # User controllers
│   ├── models/               # User models
│   ├── config/               # Database configuration
│   ├── server.js
│   └── package.json
│
├── recipe-service/            # Recipe management service
│   ├── routes/               # Recipe routes
│   ├── controller/           # Recipe controllers
│   ├── models/               # Recipe models
│   ├── config/               # Database configuration
│   ├── server.js
│   └── package.json
│
├── order-service/             # Order management service
│   ├── routes/               # Order routes
│   ├── controller/           # Order controllers
│   ├── models/               # Order models
│   ├── config/               # Database configuration
│   ├── server.js
│   └── package.json
│
├── notification-service/      # Notification service
│   ├── routes/               # Notification routes
│   ├── controller/           # Notification controllers
│   ├── models/               # Notification models
│   ├── services/             # Email service
│   ├── config/               # Notification configuration
│   ├── server.js
│   └── package.json
│
├── docker-compose.yml         # Docker orchestration
└── README.md                  # This file
```

## Technology Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework

### Backend Services
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **Nodemailer** - Email service

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Docker and Docker Compose
- MongoDB (if running locally without Docker)

### Environment Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd recipe-app
```

2. Set up environment variables:

For each service, create a `.env` file in the respective directory:

**User Service (.env):**
```
PORT=5001
MONGO_URI=mongodb://localhost:27017/recipe_app
```

**Recipe Service (.env):**
```
PORT=5002
MONGO_URI=mongodb://localhost:27017/recipe_app
```

**Order Service (.env):**
```
PORT=5003
MONGO_URI=mongodb://localhost:27017/recipe_app
```

**Notification Service (.env):**
```
PORT=5004
MONGO_URI=mongodb://localhost:27017/recipe_app
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

**API Gateway (.env):**
```
PORT=3000
USER_SERVICE_PORT=5001
RECIPE_SERVICE_PORT=5002
ORDER_SERVICE_PORT=5003
NOTIFICATION_SERVICE_PORT=5004
```

### Running the Application

#### Option 1: Using Docker Compose (Recommended)

1. Create a `.env` file in the root directory for email configuration:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

2. Run all services:
```bash
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:5173
- API Gateway: http://localhost:3000
- User Service: http://localhost:5001
- Recipe Service: http://localhost:5002
- Order Service: http://localhost:5003
- Notification Service: http://localhost:5004

#### Option 2: Local Development

1. Install dependencies for each service:
```bash
# Install dependencies for all services
npm install --prefix user-service
npm install --prefix recipe-service
npm install --prefix order-service
npm install --prefix notification-service
npm install --prefix api-gateway
npm install --prefix frontend
```

2. Start MongoDB (if not using Docker)

3. Start each service in separate terminals:
```bash
# Terminal 1 - User Service
cd user-service && npm run dev

# Terminal 2 - Recipe Service
cd recipe-service && npm run dev

# Terminal 3 - Order Service
cd order-service && npm run dev

# Terminal 4 - Notification Service
cd notification-service && npm run dev

# Terminal 5 - API Gateway
cd api-gateway && npm run dev

# Terminal 6 - Frontend
cd frontend && npm run dev
```

## API Endpoints

### User Service
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - User login

### Recipe Service
- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/:id` - Get recipe by ID
- `POST /api/recipes` - Create new recipe
- `PUT /api/recipes/:id` - Update recipe
- `DELETE /api/recipes/:id` - Delete recipe

### Order Service
- `GET /api/orders` - Get all orders (or by user ID)
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id/status` - Update order status
- `DELETE /api/orders/:id` - Cancel order

### Notification Service
- `GET /api/notifications` - Get notifications (with filters)
- `POST /api/notifications` - Create notification
- `PUT /api/notifications/:id/read` - Mark notification as read
- `PUT /api/notifications/mark-all-read` - Mark all as read
- `DELETE /api/notifications/:id` - Delete notification

## Features

- **User Authentication**: Register and login functionality
- **Recipe Management**: Create, view, update, and delete recipes
- **Order Processing**: Order recipes and track status
- **Notifications**: Real-time notifications and email alerts
- **Responsive Design**: Mobile-friendly interface
- **Microservices**: Scalable and maintainable architecture

## Development

### Adding New Services

1. Create a new service directory following the existing pattern
2. Set up Express server with routes, controllers, and models
3. Configure environment variables
4. Add service to API Gateway routing
5. Update Docker Compose configuration

### Database Schema

Each service has its own database models:
- **Users**: name, email, password
- **Recipes**: title, description, ingredients, instructions, cookingTime, difficulty, createdBy
- **Orders**: user, recipe, status, quantity, totalPrice, deliveryAddress
- **Notifications**: user, type, title, message, isRead, createdAt

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.
