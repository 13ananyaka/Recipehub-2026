const axios = require('axios');

const sampleRecipes = [
  {
    title: "Spaghetti Carbonara",
    description: "Classic Italian pasta dish with eggs, cheese, and pancetta",
    ingredients: [
      { name: "Spaghetti", quantity: "400g" },
      { name: "Pancetta", quantity: "100g" },
      { name: "Eggs", quantity: "2" },
      { name: "Parmesan", quantity: "50g" }
    ],
    instructions: [
      "Cook spaghetti according to package directions",
      "Fry pancetta until crispy",
      "Mix eggs and cheese",
      "Combine all ingredients",
      "Season with black pepper"
    ],
    cookingTime: 20,
    difficulty: "easy"
  },
  {
    title: "Chicken Tikka Masala",
    description: "Creamy and spicy Indian curry with tender chicken pieces",
    ingredients: [
      { name: "Chicken", quantity: "500g" },
      { name: "Yogurt", quantity: "200ml" },
      { name: "Tomatoes", quantity: "4" },
      { name: "Cream", quantity: "100ml" },
      { name: "Tikka Masala Spice", quantity: "2 tbsp" }
    ],
    instructions: [
      "Marinate chicken in yogurt and spices",
      "Grill chicken until charred",
      "Prepare tomato-based sauce",
      "Add grilled chicken to sauce",
      "Stir in cream and simmer",
      "Serve with rice or naan"
    ],
    cookingTime: 45,
    difficulty: "medium"
  },
  {
    title: "Caesar Salad",
    description: "Fresh romaine lettuce with Caesar dressing and croutons",
    ingredients: [
      { name: "Romaine Lettuce", quantity: "2 heads" },
      { name: "Parmesan", quantity: "100g" },
      { name: "Croutons", quantity: "1 cup" },
      { name: "Caesar Dressing", quantity: "100ml" },
      { name: "Lemon", quantity: "1" }
    ],
    instructions: [
      "Wash and chop romaine lettuce",
      "Prepare Caesar dressing",
      "Toss lettuce with dressing",
      "Add croutons and parmesan",
      "Serve with lemon wedges"
    ],
    cookingTime: 15,
    difficulty: "easy"
  },
  {
    title: "Beef Tacos",
    description: "Mexican-style tacos with seasoned ground beef and fresh toppings",
    ingredients: [
      { name: "Ground Beef", quantity: "500g" },
      { name: "Taco Shells", quantity: "8" },
      { name: "Lettuce", quantity: "1 cup" },
      { name: "Tomatoes", quantity: "2" },
      { name: "Cheese", quantity: "200g" },
      { name: "Sour Cream", quantity: "100ml" }
    ],
    instructions: [
      "Brown ground beef with taco seasoning",
      "Warm taco shells in oven",
      "Fill shells with beef",
      "Add fresh toppings",
      "Serve with salsa and sour cream"
    ],
    cookingTime: 25,
    difficulty: "easy"
  }
];

async function addSampleRecipes() {
  try {
    console.log('Adding sample recipes...');
    
    for (const recipe of sampleRecipes) {
      try {
        const response = await axios.post('http://localhost:3000/api/recipes', recipe);
        console.log(`✅ Added: ${recipe.title}`);
      } catch (error) {
        console.log(`❌ Failed to add ${recipe.title}:`, error.message);
      }
    }
    
    console.log('\n🎉 Sample recipes added successfully!');
    console.log('📱 Open http://localhost:5173 to see your recipes');
    
  } catch (error) {
    console.error('Error adding recipes:', error.message);
  }
}

addSampleRecipes();
