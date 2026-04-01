const express = require('express');
const router = express.Router();
const { 
  createRecipe, 
  getRecipes, 
  getRecipeById, 
  updateRecipe, 
  deleteRecipe,
  saveRecipe,
  unsaveRecipe,
  getUserRecipes,
  getSavedRecipes
} = require('../controller/recipeController');

// Recipe routes
router.get('/', getRecipes);
router.post('/', createRecipe);
router.get('/:id', getRecipeById);
router.put('/:id', updateRecipe);
router.delete('/:id', deleteRecipe);

// User recipe management
router.post('/:recipeId/save', saveRecipe);
router.delete('/:recipeId/unsave', unsaveRecipe);
router.get('/user/:userId', getUserRecipes);
router.get('/saved/my-recipes', getSavedRecipes);

module.exports = router;
