import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard'

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([])
  const [allRecipes, setAllRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user')
    if (!userData) {
      window.location.href = '/login'
      return
    }
    
    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)
    
    // Fetch all recipes from API
    fetchAllRecipes()
  }, [])

  const fetchAllRecipes = async () => {
    try {
      const response = await fetch('/api/recipes')
      const data = await response.json()
      setAllRecipes(data)
      
      // Get saved recipes from localStorage
      const saved = JSON.parse(localStorage.getItem('savedRecipes') || '[]')
      
      // Filter recipes that are saved
      const savedRecipeDetails = saved.map(recipeId => 
        data.find(recipe => recipe._id === recipeId)
      ).filter(Boolean)
      
      setSavedRecipes(savedRecipeDetails)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching recipes:', error)
      // Fallback to sample recipes if API fails
      const saved = JSON.parse(localStorage.getItem('savedRecipes') || '[]')
      const allRecipes = getSampleRecipes()
      const savedRecipeDetails = saved.map(recipeId => 
        allRecipes.find(recipe => recipe._id === recipeId)
      ).filter(Boolean)
      
      setAllRecipes(allRecipes)
      setSavedRecipes(savedRecipeDetails)
      setLoading(false)
    }
  }

  const getSampleRecipes = () => [
    {
      _id: '1',
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
      difficulty: 'easy',
      createdBy: { name: 'Chef Mario' }
    },
    {
      _id: '2',
      title: 'Chicken Tikka Masala',
      description: 'Creamy and spicy Indian curry with tender chicken pieces in a rich tomato-based sauce. A restaurant-quality dish you can make at home.',
      image: 'https://th.bing.com/th/id/OIP.KoZAKMbPQenQN732504HvgHaLF?w=186&h=278&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
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
      difficulty: 'medium',
      createdBy: { name: 'Chef Raj' }
    },
    {
      _id: '3',
      title: 'Caesar Salad',
      description: 'Fresh and crisp romaine lettuce with homemade Caesar dressing, crunchy croutons, and shaved parmesan. A classic salad that never goes out of style.',
      image: 'https://th.bing.com/th/id/OIP.VHv8-5fSxIhVlv7zwTgkfwHaJQ?w=186&h=233&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
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
        'Serve with lemon wedges on the side'
      ],
      cookingTime: 15,
      difficulty: 'easy',
      createdBy: { name: 'Chef Julia' }
    }
  ]

  const handleUnsaveRecipe = (recipeId) => {
    const saved = JSON.parse(localStorage.getItem('savedRecipes') || '[]')
    const updatedSaved = saved.filter(id => id !== recipeId)
    localStorage.setItem('savedRecipes', JSON.stringify(updatedSaved))
    
    // Update the displayed recipes
    setSavedRecipes(savedRecipes.filter(recipe => recipe._id !== recipeId))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
          <p className="text-white text-lg">Loading your saved recipes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900">
      {/* Header */}
      <div className="bg-black bg-opacity-20 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/home" className="text-white hover:text-purple-400 transition-colors">
                ← Back to Home
              </Link>
              <h1 className="text-2xl font-bold text-white">💝 My Saved Recipes</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-white">Welcome, {user?.name}!</span>
              <button 
                onClick={() => {
                  localStorage.removeItem('user')
                  window.location.href = '/login'
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {savedRecipes.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">💔</div>
            <h2 className="text-2xl font-bold text-white mb-4">No saved recipes yet</h2>
            <p className="text-gray-300 mb-8">
              You haven't saved any recipes. Start exploring and save your favorites!
            </p>
            <Link 
              to="/home"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              Explore Recipes
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                You have {savedRecipes.length} saved recipe{savedRecipes.length !== 1 ? 's' : ''}
              </h2>
              <p className="text-gray-300">
                Your personal collection of favorite recipes
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedRecipes.map((recipe) => (
                <div key={recipe._id} className="relative">
                  <RecipeCard recipe={recipe} />
                  <button
                    onClick={() => handleUnsaveRecipe(recipe._id)}
                    className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors z-10"
                    title="Remove from saved"
                  >
                    💔
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default SavedRecipes
