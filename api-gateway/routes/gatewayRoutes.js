const express = require('express');
const router = express.Router();
const { proxyRequest } = require('../config/gatewayConfig');

// User Service Routes
router.all('/users/*', (req, res) => {
  proxyRequest(req, res, process.env.USER_SERVICE_PORT);
});

// Recipe Service Routes
router.all('/recipes/*', (req, res) => {
  proxyRequest(req, res, process.env.RECIPE_SERVICE_PORT);
});

// Order Service Routes
router.all('/orders/*', (req, res) => {
  proxyRequest(req, res, process.env.ORDER_SERVICE_PORT);
});

// Notification Service Routes
router.all('/notifications/*', (req, res) => {
  proxyRequest(req, res, process.env.NOTIFICATION_SERVICE_PORT);
});

module.exports = router;
