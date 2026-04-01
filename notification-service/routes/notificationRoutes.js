const express = require('express');
const router = express.Router();
const { 
  createNotification, 
  getNotifications, 
  markAsRead, 
  markAllAsRead, 
  deleteNotification,
  notifyNewRecipe,
  notifyRecipeAuthor
} = require('../controller/notificationController');

// Test route
router.get('/', (req, res) => {
  res.json({ message: 'Notification Service is working!' });
});

router.post('/', createNotification);
router.get('/', getNotifications);
router.put('/:id/read', markAsRead);
router.put('/mark-all-read', markAllAsRead);
router.delete('/:id', deleteNotification);

// Recipe notification endpoints
router.post('/notify-new-recipe', notifyNewRecipe);
router.post('/notify-recipe-author', notifyRecipeAuthor);

module.exports = router;
