const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Recipe = require('./recipe-service/models/recipeModel');
const User = require('./user-service/models/userModel');

// Sample recipes data
const sampleRecipes = [
  {
    title: 'Spaghetti Carbonara',
    description: 'Classic Italian pasta dish with eggs, cheese, and crispy pancetta. A creamy and satisfying meal that\'s perfect for any occasion.',
    image: 'https://inspirationseek.com/wp-content/uploads/2016/02/Spaghetti-Pictures.jpg',
    ingredients: [
      { name: 'Spaghetti', quantity: '400g' },
      { name: 'Pancetta', quantity: '100g' },
      { name: 'Eggs', quantity: '2' },
      { name: 'Parmesan', quantity: '50g' }
    ],
    instructions: [
      'Cook spaghetti according to package directions',
      'Fry pancetta until crispy',
      'Mix eggs and cheese',
      'Combine all ingredients',
      'Season with black pepper'
    ],
    cookingTime: 20,
    difficulty: 'easy'
  },
  {
    title: 'Chicken Tikka Masala',
    description: 'Creamy and spicy Indian curry with tender chicken pieces in a rich tomato-based sauce. A restaurant-quality dish you can make at home.',
    image: 'https://th.bing.com/th/id/OIP.gQSm2dX1mQDoDual0PCeEQHaHE?w=186&h=178&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    ingredients: [
      { name: 'Chicken', quantity: '500g' },
      { name: 'Yogurt', quantity: '200ml' },
      { name: 'Tomatoes', quantity: '4' },
      { name: 'Cream', quantity: '100ml' },
      { name: 'Tikka Masala Spice', quantity: '2 tbsp' }
    ],
    instructions: [
      'Marinate chicken in yogurt and spices for 30 minutes',
      'Grill chicken until charred on all sides',
      'Prepare tomato-based sauce with onions and spices',
      'Add grilled chicken to sauce and simmer',
      'Stir in cream and cook for 5 minutes',
      'Serve hot with basmati rice or naan bread'
    ],
    cookingTime: 45,
    difficulty: 'medium'
  },
  {
    title: 'Thai Green Curry',
    description: 'Aromatic and spicy Thai curry with coconut milk, fresh vegetables, and fragrant herbs. A burst of Southeast Asian flavors.',
    image: 'https://th.bing.com/th/id/OIP.bFWTjp7nHpaSGZLMvWME8gHaLH?w=186&h=279&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    ingredients: [
      { name: 'Coconut Milk', quantity: '400ml' },
      { name: 'Green Curry Paste', quantity: '2 tbsp' },
      { name: 'Chicken', quantity: '400g' },
      { name: 'Thai Basil', quantity: '1 cup' },
      { name: 'Vegetables', quantity: '200g' }
    ],
    instructions: [
      'Fry curry paste in oil',
      'Add chicken and cook through',
      'Pour in coconut milk',
      'Add vegetables and simmer',
      'Finish with Thai basil'
    ],
    cookingTime: 30,
    difficulty: 'medium'
  },
  {
    title: 'Beef Tacos',
    description: 'Authentic Mexican-style tacos with seasoned ground beef, fresh vegetables, and zesty toppings. Perfect for a fun and flavorful dinner.',
    image: 'https://th.bing.com/th/id/OIP.jtEPG1PndS3xHVVGImIb8gHaM9?w=186&h=326&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    ingredients: [
      { name: 'Ground Beef', quantity: '500g' },
      { name: 'Taco Shells', quantity: '8' },
      { name: 'Lettuce', quantity: '1 cup' },
      { name: 'Tomatoes', quantity: '2' },
      { name: 'Cheese', quantity: '200g' },
      { name: 'Sour Cream', quantity: '100ml' }
    ],
    instructions: [
      'Brown ground beef with taco seasoning',
      'Warm taco shells in oven',
      'Fill shells with beef',
      'Add fresh toppings',
      'Serve with salsa and sour cream'
    ],
    cookingTime: 25,
    difficulty: 'easy'
  },
  {
    title: 'Caesar Salad',
    description: 'Fresh and crisp romaine lettuce with homemade Caesar dressing, crunchy croutons, and shaved parmesan. A classic salad that never goes out of style.',
    image: 'https://th.bing.com/th/id/OIP.VHv8-5fSxIhVlv7zwTgkfwHaLH?w=186&h=233&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    ingredients: [
      { name: 'Romaine Lettuce', quantity: '2 heads' },
      { name: 'Parmesan', quantity: '100g' },
      { name: 'Croutons', quantity: '1 cup' },
      { name: 'Caesar Dressing', quantity: '100ml' },
      { name: 'Lemon', quantity: '1' }
    ],
    instructions: [
      'Wash and chop romaine lettuce into bite-sized pieces',
      'Prepare Caesar dressing with anchovies, garlic, and lemon',
      'Toss lettuce with dressing until well coated',
      'Add croutons and shaved parmesan',
      'Serve with lemon wedges on side'
    ],
    cookingTime: 15,
    difficulty: 'easy'
  }
];

async function addSampleRecipes() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/recipe_app');
    console.log('Connected to MongoDB');

    // Clear existing recipes
    await Recipe.deleteMany({});
    console.log('Cleared existing recipes');

    // Add sample recipes
    const insertedRecipes = await Recipe.insertMany(sampleRecipes);
    console.log(`Added ${insertedRecipes.length} sample recipes`);

    console.log('Sample recipes added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error adding sample recipes:', error);
    process.exit(1);
  }
}

addSampleRecipes();
