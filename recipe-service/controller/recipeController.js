const Recipe = require('../models/recipeModel');
const axios = require('axios');

// Notification service URL
const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:5004';

exports.createRecipe = async (req, res) => {
  try {
    const recipeData = req.body;
    
    // Add current user as creator if available
    if (req.user && req.user.id) {
      recipeData.createdBy = req.user.id;
    }
    
    const recipe = await Recipe.create(recipeData);
    
    // Update user's created recipes if user is logged in
    if (req.user && req.user.id) {
      const User = require('../user-service/models/userModel');
      await User.findByIdAndUpdate(req.user.id, {
        $push: { createdRecipes: recipe._id },
        $inc: { 'stats.recipesCreated': 1 }
      });
    }
    
    // Send notifications asynchronously (non-blocking)
    setImmediate(async () => {
      try {
        // Notify the recipe author
        await axios.post(`${NOTIFICATION_SERVICE_URL}/api/notifications/notify-recipe-author`, {
          recipe: recipe,
          authorId: recipe.createdBy
        });
        
        // Notify other users about new recipe
        await axios.post(`${NOTIFICATION_SERVICE_URL}/api/notifications/notify-new-recipe`, {
          recipe: recipe,
          authorId: recipe.createdBy
        });
        
        console.log('Notifications sent for new recipe:', recipe.title);
      } catch (notificationError) {
        console.log('Failed to send notifications:', notificationError.message);
      }
    });
    
    res.status(201).json(recipe);
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    
    // Remove from users' saved recipes
    const User = require('../user-service/models/userModel');
    await User.updateMany(
      { savedRecipes: req.params.id },
      { $pull: { savedRecipes: req.params.id } }
    );
    
    // Remove from creator's created recipes
    if (recipe.createdBy) {
      await User.findByIdAndUpdate(recipe.createdBy, {
        $pull: { createdRecipes: req.params.id },
        $inc: { 'stats.recipesCreated': -1 }
      });
    }
    
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.saveRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const userId = req.user && req.user.id;
    
    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    
    const User = require('../user-service/models/userModel');
    const user = await User.findByIdAndUpdate(
      userId,
      { 
        $addToSet: { savedRecipes: recipeId },
        $inc: { 'stats.recipesSaved': 1 }
      },
      { new: true }
    );
    
    res.json({ message: 'Recipe saved successfully', savedRecipes: user.savedRecipes });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.unsaveRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const userId = req.user && req.user.id;
    
    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    
    const User = require('../user-service/models/userModel');
    const user = await User.findByIdAndUpdate(
      userId,
      { 
        $pull: { savedRecipes: recipeId },
        $inc: { 'stats.recipesSaved': -1 }
      },
      { new: true }
    );
    
    res.json({ message: 'Recipe unsaved successfully', savedRecipes: user.savedRecipes });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserRecipes = async (req, res) => {
  try {
    const userId = req.params.userId || (req.user && req.user.id);
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID required' });
    }
    
    const recipes = await Recipe.find({ createdBy: userId });
    res.json(recipes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getSavedRecipes = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    
    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    
    const User = require('../user-service/models/userModel');
    const user = await User.findById(userId).populate('savedRecipes');
    
    res.json(user.savedRecipes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
