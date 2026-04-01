import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetchRecipe()
    checkIfSaved()
  }, [id])

  const fetchRecipe = async () => {
    try {
      const response = await fetch(`/api/recipes/${id}`)
      const data = await response.json()
      setRecipe(data)
    } catch (error) {
      console.error('Error fetching recipe:', error)
      // Show sample recipe if API fails
      setRecipe(getSampleRecipe(id))
    } finally {
      setLoading(false)
    }
  }

  const checkIfSaved = () => {
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]')
    setSaved(savedRecipes.includes(id))
  }

  const handleSaveRecipe = () => {
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]')
    
    if (saved) {
      // Remove from saved
      const newSaved = savedRecipes.filter(recipeId => recipeId !== id)
      localStorage.setItem('savedRecipes', JSON.stringify(newSaved))
      setSaved(false)
    } else {
      // Add to saved
      savedRecipes.push(id)
      localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes))
      setSaved(true)
    }
  }

  const getSampleRecipe = (recipeId) => {
    const sampleRecipes = {
      '1': {
        _id: '1',
        title: 'Spaghetti Carbonara',
        description: 'Classic Italian pasta dish with eggs, cheese, and crispy pancetta. A creamy and satisfying meal that\'s perfect for any occasion. This traditional Roman dish is made with just a few simple ingredients but packs incredible flavor.',
        ingredients: [
          { name: 'Spaghetti', quantity: '400g', notes: 'Use high-quality durum wheat pasta' },
          { name: 'Pancetta', quantity: '100g', notes: 'Cured pork belly, diced small' },
          { name: 'Eggs', quantity: '2', notes: 'Large, room temperature eggs' },
          { name: 'Parmesan', quantity: '50g', notes: 'Freshly grated, plus extra for serving' },
          { name: 'Black Pepper', quantity: '1 tsp', notes: 'Freshly ground' },
          { name: 'Salt', quantity: 'To taste', notes: 'For pasta water' }
        ],
        instructions: [
          'Bring a large pot of salted water to boil and cook spaghetti according to package directions until al dente',
          'While pasta cooks, dice pancetta and fry in a large skillet until crispy and golden, about 5-7 minutes',
          'In a bowl, whisk together eggs and grated parmesan cheese with black pepper',
          'Reserve 1 cup of pasta water, then drain the spaghetti',
          'Add hot pasta to the skillet with pancetta (heat off)',
          'Quickly stir in egg mixture, tossing constantly to create a creamy sauce',
          'Add pasta water as needed to achieve desired consistency',
          'Season with additional black pepper and serve immediately with extra parmesan'
        ],
        cookingTime: 20,
        prepTime: 10,
        totalTime: 30,
        difficulty: 'easy',
        servings: 4,
        calories: 450,
        cuisine: 'Italian',
        category: 'Main Course',
        dietary: ['Vegetarian Option Available'],
        createdBy: { name: 'Chef Mario', bio: 'Roman chef specializing in traditional Italian cuisine' },
        nutrition: {
          protein: '18g',
          carbs: '52g',
          fat: '22g',
          fiber: '3g'
        },
        tips: [
          'The key is to work quickly when adding the eggs to avoid scrambling',
          'Use the starchy pasta water to create a silky sauce',
          'Never add cream - authentic carbonara doesn\'t need it!',
          'Serve immediately as the sauce thickens quickly'
        ],
        storage: 'Best served fresh, but can be refrigerated for up to 2 days',
        equipment: ['Large pot', 'Skillet', 'Tongs', 'Cheese grater', 'Whisk']
      },
      '2': {
        _id: '2',
        title: 'Chicken Tikka Masala',
        description: 'Creamy and spicy Indian curry with tender chicken pieces in a rich tomato-based sauce. A restaurant-quality dish you can make at home. This beloved curry combines marinated chicken with a velvety sauce that\'s both comforting and exciting.',
        ingredients: [
          { name: 'Chicken', quantity: '500g', notes: 'Boneless, cut into 1-inch cubes' },
          { name: 'Yogurt', quantity: '200ml', notes: 'Full-fat plain yogurt' },
          { name: 'Tomatoes', quantity: '4', notes: 'Canned or fresh, pureed' },
          { name: 'Heavy Cream', quantity: '100ml', notes: 'For rich, creamy texture' },
          { name: 'Tikka Masala Spice', quantity: '2 tbsp', notes: 'Store-bought or homemade blend' },
          { name: 'Ginger-Garlic Paste', quantity: '2 tbsp', notes: 'Fresh is best' },
          { name: 'Onion', quantity: '1 large', notes: 'Finely chopped' },
          { name: 'Butter', quantity: '2 tbsp', notes: 'For richness' }
        ],
        instructions: [
          'Marinate chicken in yogurt, half the tikka masala spice, and ginger-garlic paste for 30 minutes',
          'Grill or pan-fry marinated chicken until charred on all sides, about 8-10 minutes',
          'In the same pan, sauté onions in butter until soft and golden',
          'Add remaining spices and cook for 1 minute until fragrant',
          'Add tomato puree and simmer for 10 minutes',
          'Stir in cream and return chicken to the sauce',
          'Simmer for 5 minutes until chicken is cooked through',
          'Garnish with cilantro and serve with naan or basmati rice'
        ],
        cookingTime: 45,
        prepTime: 40,
        totalTime: 85,
        difficulty: 'medium',
        servings: 6,
        calories: 380,
        cuisine: 'Indian',
        category: 'Main Course',
        dietary: ['Gluten-Free Option Available'],
        createdBy: { name: 'Chef Raj', bio: 'Expert in North Indian cuisine with 20 years experience' },
        nutrition: {
          protein: '32g',
          carbs: '12g',
          fat: '24g',
          fiber: '2g'
        },
        tips: [
          'Don\'t skip the marination - it makes the chicken tender and flavorful',
          'For extra smoky flavor, grill the chicken over charcoal',
          'Adjust cream amount for desired richness',
          'Make it spicier by adding fresh green chilies'
        ],
        storage: 'Refrigerate for up to 3 days, freezes well for 1 month',
        equipment: ['Mixing bowl', 'Skillet', 'Grill pan', 'Blender', 'Wooden spoon']
      },
      '3': {
        _id: '3',
        title: 'Caesar Salad',
        description: 'Fresh and crisp romaine lettuce with homemade Caesar dressing, crunchy croutons, and shaved parmesan. A classic salad that never goes out of style. This American classic was invented in Tijuana, Mexico, but has become a worldwide favorite.',
        ingredients: [
          { name: 'Romaine Lettuce', quantity: '2 heads', notes: 'Crisp, fresh hearts' },
          { name: 'Parmesan', quantity: '100g', notes: 'Aged, for shaving and dressing' },
          { name: 'Croutons', quantity: '1 cup', notes: 'Homemade or store-bought' },
          { name: 'Caesar Dressing', quantity: '100ml', notes: 'See dressing ingredients below' },
          { name: 'Lemon', quantity: '1', notes: 'Fresh juice and wedges' },
          { name: 'Anchovies', quantity: '4', notes: 'Optional but traditional' },
          { name: 'Garlic', quantity: '2 cloves', notes: 'Minced' },
          { name: 'Egg Yolk', quantity: '1', notes: 'For authentic dressing' }
        ],
        instructions: [
          'Wash and chop romaine lettuce into bite-sized pieces, dry thoroughly',
          'Make dressing: whisk egg yolk with lemon juice, garlic, and anchovies',
          'Slowly drizzle in olive oil while whisking to emulsify',
          'Add grated parmesan and season with black pepper',
          'Toss lettuce with dressing until well coated',
          'Add croutons and shaved parmesan',
          'Serve immediately with lemon wedges on the side'
        ],
        cookingTime: 15,
        prepTime: 20,
        totalTime: 35,
        difficulty: 'easy',
        servings: 4,
        calories: 280,
        cuisine: 'American',
        category: 'Salad',
        dietary: ['Vegetarian Without Anchovies'],
        createdBy: { name: 'Chef Julia', bio: 'Salad specialist and farm-to-table advocate' },
        nutrition: {
          protein: '12g',
          carbs: '8g',
          fat: '22g',
          fiber: '4g'
        },
        tips: [
          'Crisp the lettuce in ice water for extra crunch',
          'Make croutons from day-old bread for best texture',
          'Use a wooden bowl for authentic flavor',
          'Dress just before serving to prevent wilting'
        ],
        storage: 'Dressing can be refrigerated for 1 week, salad best served fresh',
        equipment: ['Salad spinner', 'Wooden bowl', 'Whisk', 'Cheese shaver', 'Cutting board']
      }
    }
    return sampleRecipes[recipeId] || sampleRecipes['1']
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading recipe...</div>
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-6">
        <div className="text-center text-gray-500">
          Recipe not found.
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-2xl overflow-hidden animate-fade-in">
          {/* Hero Section */}
          <div className="h-80 bg-gradient-to-br from-purple-600 to-pink-600 relative">
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm text-white">
                  {recipe.difficulty === 'easy' ? '🟢 Easy' : 
                   recipe.difficulty === 'medium' ? '🟡 Medium' : '🔴 Hard'}
                </span>
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm text-white">
                  ⏱️ {recipe.cookingTime} mins
                </span>
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm text-white">
                   {recipe.calories} cal
                </span>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">{recipe.title}</h1>
              <div className="flex items-center space-x-4 text-white">
                <span className="text-sm">🍽️ {recipe.cuisine} • {recipe.category}</span>
                <span className="text-sm">👨‍🍳 {recipe.createdBy?.name || 'Chef Unknown'}</span>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl animate-pulse opacity-20">
              {recipe.title?.toLowerCase().includes('pasta') ? '🍝' :
               recipe.title?.toLowerCase().includes('chicken') ? '🍗' :
               recipe.title?.toLowerCase().includes('salad') ? '🥗' :
               recipe.title?.toLowerCase().includes('taco') ? '🌮' :
               recipe.title?.toLowerCase().includes('curry') ? '🍛' :
               recipe.title?.toLowerCase().includes('rice') ? '🍚' : '🍳'}
            </div>
          </div>
          
          <div className="p-8">
            {/* Description and Chef Info */}
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold text-white mb-4">Description</h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">{recipe.description}</p>
                
                {/* Chef Bio */}
                {recipe.createdBy?.bio && (
                  <div className="glass rounded-xl p-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-lg">👨‍🍳</span>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{recipe.createdBy.name}</h3>
                        <p className="text-gray-400 text-sm">{recipe.createdBy.bio}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Dietary Info */}
                {recipe.dietary && recipe.dietary.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-2">Dietary Information</h3>
                    <div className="flex flex-wrap gap-2">
                      {recipe.dietary.map((diet, index) => (
                        <span key={index} className="bg-green-500 bg-opacity-20 text-green-300 px-3 py-1 rounded-full text-sm">
                          🌱 {diet}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Quick Stats */}
              <div className="space-y-4">
                <div className="glass rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Quick Stats</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-300">
                      <span>Prep Time:</span>
                      <span className="font-medium">{recipe.prepTime || 10} mins</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Cook Time:</span>
                      <span className="font-medium">{recipe.cookingTime} mins</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Total Time:</span>
                      <span className="font-medium">{recipe.totalTime || (recipe.cookingTime + 10)} mins</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Calories:</span>
                      <span className="font-medium">{recipe.calories} per serving</span>
                    </div>
                  </div>
                </div>

                {/* Nutrition */}
                {recipe.nutrition && (
                  <div className="glass rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-white mb-3">Nutrition per Serving</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-gray-300">
                        <span>Protein:</span>
                        <span className="font-medium">{recipe.nutrition.protein}</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Carbs:</span>
                        <span className="font-medium">{recipe.nutrition.carbs}</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Fat:</span>
                        <span className="font-medium">{recipe.nutrition.fat}</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Fiber:</span>
                        <span className="font-medium">{recipe.nutrition.fiber}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Ingredients and Instructions */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="glass rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                  <span className="mr-2">🛒</span> Ingredients
                </h2>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start text-gray-300">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2"></span>
                      <div>
                        <span className="font-medium">{ingredient.quantity}</span>
                        <span className="ml-2">{ingredient.name}</span>
                        {ingredient.notes && (
                          <p className="text-sm text-gray-400 mt-1">💡 {ingredient.notes}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                  <span className="mr-2">📝</span> Instructions
                </h2>
                <ol className="space-y-3">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start text-gray-300">
                      <span className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                        {index + 1}
                      </span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Tips and Storage */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {recipe.tips && recipe.tips.length > 0 && (
                <div className="glass rounded-xl p-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                    <span className="mr-2">💡</span> Pro Tips
                  </h2>
                  <ul className="space-y-2">
                    {recipe.tips.map((tip, index) => (
                      <li key={index} className="flex items-start text-gray-300">
                        <span className="text-yellow-400 mr-2">⭐</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="space-y-4">
                {recipe.storage && (
                  <div className="glass rounded-xl p-6">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                      <span className="mr-2">📦</span> Storage
                    </h2>
                    <p className="text-gray-300">{recipe.storage}</p>
                  </div>
                )}

                {recipe.equipment && recipe.equipment.length > 0 && (
                  <div className="glass rounded-xl p-6">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                      <span className="mr-2">🔧</span> Equipment Needed
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {recipe.equipment.map((item, index) => (
                        <span key={index} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleSaveRecipe}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center ${
                  saved 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <span className="mr-2">{saved ? '💚' : '❤️'}</span> 
                {saved ? 'Recipe Saved!' : 'Save Recipe'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetails
