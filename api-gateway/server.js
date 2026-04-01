const express = require('express');
const dotenv = require('dotenv');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Proxy middleware configuration
const userProxy = createProxyMiddleware('/api/users', {
  target: `http://localhost:${process.env.USER_SERVICE_PORT}`,
  changeOrigin: true,
});

const recipeProxy = createProxyMiddleware('/api/recipes', {
  target: `http://localhost:${process.env.RECIPE_SERVICE_PORT}`,
  changeOrigin: true,
});

const notificationProxy = createProxyMiddleware('/api/notifications', {
  target: `http://localhost:${process.env.NOTIFICATION_SERVICE_PORT}`,
  changeOrigin: true,
});

// Use proxies
app.use('/api/users', userProxy);
app.use('/api/recipes', recipeProxy);
app.use('/api/notifications', notificationProxy);

app.listen(process.env.PORT, () =>
  console.log(`API Gateway running on ${process.env.PORT}`)
);
