import { useState, useEffect } from 'react'
import RecipeCard from '../components/RecipeCard'

const Home = () => {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    fetchRecipes()
    // Show content immediately for better UX
    setTimeout(() => setShowContent(true), 3000)
  }, [])

  const fetchRecipes = async () => {
    try {
      const response = await fetch('/api/recipes')
      const data = await response.json()
      // Use database recipes directly
      setRecipes(data)
      console.log(`Loaded ${data.length} recipes from database`)
    } catch (error) {
      console.error('Error fetching recipes:', error)
      // Show sample recipes if API fails
      setRecipes(getSampleRecipes())
    } finally {
      setLoading(false)
    }
  }

  // Refresh recipes every 30 seconds to show new additions
  useEffect(() => {
    const interval = setInterval(() => {
      fetchRecipes()
    }, 30000)
    
    return () => clearInterval(interval)
  }, [])

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
      difficulty: 'medium',
      createdBy: { name: 'Chef Raj' }
    },
    {
      _id: '3',
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
      difficulty: 'easy',
      createdBy: { name: 'Chef Julia' }
    },
    {
      _id: '4',
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
      difficulty: 'easy',
      createdBy: { name: 'Chef Maria' }
    },
    {
      _id: '5',
      title: 'Mushroom Risotto',
      description: 'Creamy Italian rice dish with earthy mushrooms, parmesan, and white wine. A sophisticated and comforting meal.',
      image: 'https://th.bing.com/th/id/OIP.2ddYD5V53_XGyu12TshQmwHaKX?w=186&h=260&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
      ingredients: [
        { name: 'Arborio Rice', quantity: '300g' },
        { name: 'Mixed Mushrooms', quantity: '200g' },
        { name: 'White Wine', quantity: '100ml' },
        { name: 'Parmesan', quantity: '100g' },
        { name: 'Butter', quantity: '50g' }
      ],
      instructions: [
        'Sauté mushrooms until golden',
        'Toast rice in pan',
        'Add wine and stir until absorbed',
        'Gradually add stock, stirring constantly',
        'Finish with butter and parmesan'
      ],
      cookingTime: 35,
      difficulty: 'hard',
      createdBy: { name: 'Chef Giovanni' }
    },
    {
      _id: '6',
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
      difficulty: 'medium',
      createdBy: { name: 'Chef Somchai' }
    },
    {
      _id: '7',
      title: 'Sushi Bowl',
      description: 'Fresh and healthy Japanese-inspired bowl with seasoned sushi rice, fresh fish, and vibrant vegetables. A perfect balance of flavors and textures.',
      image: 'https://th.bing.com/th/id/OIP.gJU8C9CvvnaD71O9Yp_ROQHaLH?w=186&h=279&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
      ingredients: [
        { name: 'Sushi Rice', quantity: '300g' },
        { name: 'Fresh Salmon', quantity: '200g' },
        { name: 'Avocado', quantity: '1' },
        { name: 'Cucumber', quantity: '1' },
        { name: 'Nori', quantity: '2 sheets' }
      ],
      instructions: [
        'Cook and season sushi rice',
        'Slice fresh salmon into sashimi pieces',
        'Cut vegetables into thin strips',
        'Arrange ingredients in bowl over rice',
        'Garnish with nori and sesame seeds'
      ],
      cookingTime: 30,
      difficulty: 'medium',
      createdBy: { name: 'Chef Kenji' }
    },
    {
      _id: '8',
      title: 'Greek Moussaka',
      description: 'Traditional Greek casserole with layers of eggplant, seasoned meat sauce, and creamy béchamel. A hearty Mediterranean comfort food.',
      image: 'https://th.bing.com/th/id/OIP.Jyj_a0-2Zy0oeGCA4uZzCQHaFl?w=281&h=211&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
      ingredients: [
        { name: 'Eggplant', quantity: '2 large' },
        { name: 'Ground Lamb', quantity: '500g' },
        { name: 'Tomato Sauce', quantity: '400ml' },
        { name: 'Béchamel Sauce', quantity: '300ml' },
        { name: 'Parmesan', quantity: '150g' }
      ],
      instructions: [
        'Slice and salt eggplant, let drain',
        'Fry eggplant until golden',
        'Cook meat with onions and spices',
        'Layer eggplant and meat in dish',
        'Top with béchamel and bake until golden'
      ],
      cookingTime: 90,
      difficulty: 'hard',
      createdBy: { name: 'Chef Elena' }
    },
    {
      _id: '9',
      title: 'Korean Bibimbap',
      description: 'Colorful Korean rice bowl with assorted vegetables, marinated beef, and a perfectly fried egg. A complete meal in a bowl.',
      image: 'https://mealshine.com/wp-content/uploads/2025/09/019-Korean-Beef-Bibimbap-Bowl.png',
      ingredients: [
        { name: 'Steamed Rice', quantity: '400g' },
        { name: 'Beef Bulgogi', quantity: '300g' },
        { name: 'Spinach', quantity: '200g' },
        { name: 'Bean Sprouts', quantity: '200g' },
        { name: 'Gochujang', quantity: '2 tbsp' }
      ],
      instructions: [
        'Prepare and season vegetables separately',
        'Cook marinated beef until caramelized',
        'Fry egg sunny-side up',
        'Arrange rice in bowl with vegetables',
        'Top with beef and fried egg, add gochujang'
      ],
      cookingTime: 40,
      difficulty: 'medium',
      createdBy: { name: 'Chef Min-jun' }
    },
    {
      _id: '10',
      title: 'French Croissants',
      description: 'Buttery, flaky French pastries with hundreds of layers. A breakfast favorite that\'s worth the effort.',
      image: 'https://th.bing.com/th/id/OIP.z0eh_e4CsePm9TIVsHnbDwHaNK?w=186&h=331&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
      ingredients: [
        { name: 'Flour', quantity: '500g' },
        { name: 'Butter', quantity: '250g' },
        { name: 'Yeast', quantity: '7g' },
        { name: 'Milk', quantity: '100ml' },
        { name: 'Sugar', quantity: '50g' }
      ],
      instructions: [
        'Make dough with flour, yeast, milk and sugar',
        'Laminate dough with cold butter',
        'Fold and roll dough multiple times',
        'Cut into triangles and roll into crescents',
        'Proof and bake until golden and flaky'
      ],
      cookingTime: 180,
      difficulty: 'hard',
      createdBy: { name: 'Chef Pierre' }
    },
    {
      _id: '11',
      title: 'Mexican Street Corn',
      description: 'Grilled corn on the cob coated with creamy mayo, cheese, and spices. A popular street food that\'s addictive and delicious.',
      image: 'https://th.bing.com/th/id/OIP.R0xcx3aH3AiNbzHaaDm4KwHaLH?w=186&h=279&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
      ingredients: [
        { name: 'Corn on Cob', quantity: '4 ears' },
        { name: 'Mayonnaise', quantity: '4 tbsp' },
        { name: 'Cotija Cheese', quantity: '100g' },
        { name: 'Chili Powder', quantity: '2 tsp' },
        { name: 'Lime', quantity: '2 wedges' }
      ],
      instructions: [
        'Grill corn until charred and tender',
        'Brush with mayonnaise while hot',
        'Sprinkle with cotija cheese',
        'Dust with chili powder',
        'Serve with lime wedges'
      ],
      cookingTime: 20,
      difficulty: 'easy',
      createdBy: { name: 'Chef Carlos' }
    },
    {
      _id: '12',
      title: 'Indian Butter Chicken',
      description: 'Rich and creamy tomato-based curry with tender chicken pieces. A restaurant favorite that\'s surprisingly easy to make at home.',
      image: 'https://th.bing.com/th/id/OIP.W1I7K9y_k-kV6VZj4PaHPgHaHa?w=186&h=186&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
      ingredients: [
        { name: 'Chicken', quantity: '600g' },
        { name: 'Butter', quantity: '100g' },
        { name: 'Heavy Cream', quantity: '200ml' },
        { name: 'Tomato Puree', quantity: '400ml' },
        { name: 'Garam Masala', quantity: '2 tbsp' }
      ],
      instructions: [
        'Marinate chicken in yogurt and spices',
        'Grill or pan-fry chicken pieces',
        'Make tomato gravy with butter and spices',
        'Add chicken to gravy and simmer',
        'Finish with cream and serve with naan'
      ],
      cookingTime: 50,
      difficulty: 'medium',
      createdBy: { name: 'Chef Priya' }
    },
    {
      _id: '13',
      title: 'Japanese Ramen',
      description: 'Hearty and comforting Japanese noodle soup with rich pork broth, springy noodles, and savory toppings. A popular dish that\'s easy to customize.',
      image: 'https://th.bing.com/th/id/OIP.1TObFHpSZmGM3KdnF23kmQHaE7?w=248&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
      ingredients: [
        { name: 'Pork Bones', quantity: '2 kg' },
        { name: 'Ramen Noodles', quantity: '400g' },
        { name: 'Vegetables', quantity: '200g' },
        { name: 'Pork Slices', quantity: '200g' },
        { name: 'Boiled Egg', quantity: '2' }
      ],
      instructions: [
        'Simmer pork bones for rich broth',
        'Cook ramen noodles according to package',
        'Prepare vegetables and pork slices',
        'Assemble ramen bowls with broth, noodles, and toppings',
        'Serve with boiled egg and green onions'
      ],
      cookingTime: 120,
      difficulty: 'hard',
      createdBy: { name: 'Chef Taro' }
    },
    {
      _id: '14',
      title: 'Thai Pad Thai',
      description: 'Stir-fried rice noodles with shrimp, tofu, and a sweet and sour sauce. A classic Thai dish that\'s quick and easy to make.',
      image: 'https://tse2.mm.bing.net/th/id/OIP.1vTFpLnn3Yguw-KhE-SN0wHaJh?rs=1&pid=ImgDetMain&o=7&rm=3',
      ingredients: [
        { name: 'Rice Noodles', quantity: '400g' },
        { name: 'Shrimp', quantity: '200g' },
        { name: 'Tofu', quantity: '200g' },
        { name: 'Pad Thai Sauce', quantity: '200ml' },
        { name: 'Vegetables', quantity: '200g' }
      ],
      instructions: [
        'Cook rice noodles according to package',
        'Stir-fry shrimp and tofu with vegetables',
        'Add Pad Thai sauce and stir-fry until combined',
        'Combine cooked noodles with sauce and toppings',
        'Serve with peanuts and lime wedges'
      ],
      cookingTime: 30,
      difficulty: 'medium',
      createdBy: { name: 'Chef Nong' }
    },
    {
      _id: '15',
      title: 'Korean Japchae',
      description: 'Stir-fried glass noodles with vegetables and sometimes meat. A popular Korean dish that\'s easy to make and fun to eat.',
      image: 'https://tse2.mm.bing.net/th/id/OIP.1vTFpLnn3Yguw-KhE-SN0wHaJh?rs=1&pid=ImgDetMain&o=7&rm=3',
      ingredients: [
        { name: 'Glass Noodles', quantity: '400g' },
        { name: 'Vegetables', quantity: '200g' },
        { name: 'Beef', quantity: '200g' },
        { name: 'Soy Sauce', quantity: '2 tbsp' },
        { name: 'Sugar', quantity: '1 tsp' }
      ],
      instructions: [
        'Cook glass noodles according to package',
        'Stir-fry vegetables and beef with soy sauce and sugar',
        'Combine cooked noodles with sauce and toppings',
        'Serve with sesame seeds and chopped green onions'
      ],
      cookingTime: 30,
      difficulty: 'medium',
      createdBy: { name: 'Chef Min-ji' }
    },
    {
      _id: '16',
      title: 'Chinese Kung Pao Chicken',
      description: 'Spicy Sichuan dish with marinated chicken, peanuts, and vegetables. A classic Chinese recipe that\'s easy to make and fun to eat.',
      image: 'https://th.bing.com/th/id/OIP.6m76DSREAc_wvTfVHXtUQQHaJQ?w=186&h=232&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
      ingredients: [
        { name: 'Chicken', quantity: '400g' },
        { name: 'Peanuts', quantity: '100g' },
        { name: 'Vegetables', quantity: '200g' },
        { name: 'Soy Sauce', quantity: '2 tbsp' },
        { name: 'Chili Peppers', quantity: '2' }
      ],
      instructions: [
        'Marinate chicken in soy sauce and spices',
        'Stir-fry chicken and peanuts with vegetables',
        'Add chili peppers and stir-fry until combined',
        'Serve with steamed rice'
      ],
      cookingTime: 30,
      difficulty: 'medium',
      createdBy: { name: 'Chef Wei' }
    },
    {
      _id: '17',
      title: 'Indian Palak Paneer',
      description: 'Creamy spinach curry with paneer cheese and spices. A popular Indian dish that\'s easy to make and delicious to eat.',
      image: 'https://th.bing.com/th/id/OIP.U851zaQ3cSvb8BuVWahhsgHaEJ?w=320&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
      ingredients: [
        { name: 'Spinach', quantity: '200g' },
        { name: 'Paneer Cheese', quantity: '200g' },
        { name: 'Ginger', quantity: '2 inches' },
        { name: 'Garlic', quantity: '3 cloves' },
        { name: 'Heavy Cream', quantity: '200ml' }
      ],
      instructions: [
        'Blend spinach with ginger and garlic',
        'Cook paneer cheese with spices',
        'Combine spinach sauce with paneer cheese',
        'Add heavy cream and simmer until combined',
        'Serve with naan or rice'
      ],
      cookingTime: 30,
      difficulty: 'medium',
      createdBy: { name: 'Chef Rohan' }
    },
    {
      _id: '18',
      title: 'Japanese Teriyaki Chicken',
      description: 'Sweet and savory Japanese dish with marinated chicken and teriyaki sauce. A popular recipe that\'s easy to make and fun to eat.',
      image: 'https://th.bing.com/th/id/OIP.LtJOnPgL1wWfRO6-0HR45QHaHa?w=186&h=186&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
      ingredients: [
        { name: 'Chicken', quantity: '400g' },
        { name: 'Teriyaki Sauce', quantity: '200ml' },
        { name: 'Soy Sauce', quantity: '2 tbsp' },
        { name: 'Sugar', quantity: '1 tsp' },
        { name: 'Ginger', quantity: '2 inches' }
      ],
      instructions: [
        'Marinate chicken in teriyaki sauce and spices',
        'Grill or pan-fry chicken until cooked',
        'Serve with steamed rice and stir-fried vegetables'
      ],
      cookingTime: 30,
      difficulty: 'medium',
      createdBy: { name: 'Chef Yui' }
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">🍳</div>
          <div className="text-white text-xl">Loading amazing recipes...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Animated Background Food Sparks */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          >
            <div className="text-4xl opacity-20 animate-spin-slow">
              {['🍝', '🍗', '🥗', '🌮', '🍛', '🍚', '🍱', '🥙', '🍲', '🍰', '🍳', '🍕', '🌮', '🥘', '🍜'][i % 15]}
            </div>
          </div>
        ))}
      </div>

      {/* Hero Section with Moving Text */}
      {!showContent ? (
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="overflow-hidden mb-8">
              <h1 className="text-6xl md:text-8xl font-bold gradient-text animate-slide-in-text">
                Recipe Sharing App
              </h1>
            </div>
            <div className="overflow-hidden">
              <p className="text-xl md:text-2xl text-gray-300 animate-slide-in-text-delayed">
                Discover • Create • Share Amazing Recipes
              </p>
            </div>
            <div className="mt-12 animate-bounce-in">
              <div className="inline-flex items-center space-x-2 text-purple-400">
                <span className="text-lg">Loading delicious recipes...</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-100"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-200"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Main Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center py-12 animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-4 animate-slide-in-text">
                Featured Recipes 2026
              </h1>
              <p className="text-xl text-gray-300 animate-slide-in-text-delayed">
                Culinary masterpieces from around the world
              </p>
            </div>
            
            {/* Recipe Grid with Sliding Animation */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {recipes.map((recipe, index) => (
                  <div 
                    key={recipe._id} 
                    className="animate-slide-up-card"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <RecipeCard recipe={recipe} />
                  </div>
                ))}
              </div>
              
              {recipes.length === 0 && (
                <div className="text-center text-gray-400 mt-12 animate-fade-in">
                  <div className="text-6xl mb-4">🍳</div>
                  <p className="text-xl mb-2">No recipes found</p>
                  <p className="text-sm">Be the first to add a delicious recipe!</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Home
