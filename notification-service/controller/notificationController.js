const mongoose = require('mongoose');
const Notification = require('../models/notificationModel');
const { sendEmail } = require('../services/emailService');

exports.createNotification = async (req, res) => {
  try {
    const notification = await Notification.create(req.body);
    res.status(201).json(notification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create notification when a new recipe is added
exports.notifyNewRecipe = async (req, res) => {
  try {
    const { recipe, authorId } = req.body;
    
    // Get all users except the recipe author
    const User = mongoose.model('User');
    const users = await User.find({ _id: { $ne: authorId } });
    
    const notifications = [];
    
    for (const user of users) {
      const notification = await Notification.create({
        user: user._id,
        type: 'new_recipe',
        title: 'New Recipe Added!',
        message: `${recipe.title} has been added by ${recipe.createdBy?.name || 'a chef'}. Check it out!`,
        isRead: false
      });
      
      notifications.push(notification);
      
      // Send email notification if user has email
      if (user.email) {
        try {
          await sendEmail(
            user.email,
            'New Recipe Added - RecipeHub 2026',
            `Hi ${user.name},\n\nA new recipe "${recipe.title}" has been added to RecipeHub 2026!\n\n${recipe.description}\n\nVisit RecipeHub to check it out!\n\nBest regards,\nRecipeHub Team`
          );
        } catch (emailError) {
          console.log('Failed to send email to user:', user.email, emailError.message);
        }
      }
    }
    
    res.status(201).json({
      message: 'Notifications sent successfully',
      count: notifications.length
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Notify recipe author when their recipe is added successfully
exports.notifyRecipeAuthor = async (req, res) => {
  try {
    const { recipe, authorId } = req.body;
    
    const notification = await Notification.create({
      user: authorId,
      type: 'recipe_added',
      title: 'Recipe Added Successfully!',
      message: `Your recipe "${recipe.title}" has been successfully added to RecipeHub 2026!`,
      isRead: false
    });
    
    // Send confirmation email to author
    const User = mongoose.model('User');
    const author = await User.findById(authorId);
    
    if (author && author.email) {
      try {
        await sendEmail(
          author.email,
          'Recipe Added Successfully - RecipeHub 2026',
          `Hi ${author.name},\n\nCongratulations! Your recipe "${recipe.title}" has been successfully added to RecipeHub 2026.\n\nYour recipe is now live and other users can view and save it.\n\nThank you for contributing to our community!\n\nBest regards,\nRecipeHub Team`
        );
      } catch (emailError) {
        console.log('Failed to send confirmation email to author:', author.email, emailError.message);
      }
    }
    
    res.status(201).json(notification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const { userId, unreadOnly } = req.query;
    let query = {};
    
    if (userId) {
      query.user = userId;
    }
    
    if (unreadOnly === 'true') {
      query.isRead = false;
    }
    
    const notifications = await Notification.find(query)
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(notifications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    
    res.json(notification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.markAllAsRead = async (req, res) => {
  try {
    const { userId } = req.body;
    
    await Notification.updateMany(
      { user: userId, isRead: false },
      { isRead: true }
    );
    
    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    
    res.json({ message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
