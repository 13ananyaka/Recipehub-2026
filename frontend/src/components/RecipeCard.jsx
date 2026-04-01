import { Link } from 'react-router-dom'

const RecipeCard = ({ recipe }) => {
  const getDifficultyColor = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'easy': return 'bg-green-500'
      case 'medium': return 'bg-yellow-500'
      case 'hard': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getDifficultyEmoji = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'easy': return '🟢'
      case 'medium': return '🟡'
      case 'hard': return '🔴'
      default: return '⚪'
    }
  }

  return (
    <div className="glass rounded-xl overflow-hidden card-hover animate-fade-in">
      <div className="h-48 bg-gradient-to-br from-purple-600 to-pink-600 relative overflow-hidden">
        {recipe.image ? (
          <>
            <img 
              src={recipe.image} 
              alt={recipe.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = `
                  <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl animate-pulse">
                    ${recipe.title?.toLowerCase().includes('pasta') ? '🍝' :
                      recipe.title?.toLowerCase().includes('chicken') ? '🍗' :
                      recipe.title?.toLowerCase().includes('salad') ? '🥗' :
                      recipe.title?.toLowerCase().includes('taco') ? '🌮' :
                      recipe.title?.toLowerCase().includes('curry') ? '🍛' :
                      recipe.title?.toLowerCase().includes('rice') ? '🍚' : '🍳'}
                  </div>
                `;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent bg-opacity-30"></div>
          </>
        ) : (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl animate-pulse">
            {recipe.title?.toLowerCase().includes('pasta') ? '🍝' :
             recipe.title?.toLowerCase().includes('chicken') ? '🍗' :
             recipe.title?.toLowerCase().includes('salad') ? '🥗' :
             recipe.title?.toLowerCase().includes('taco') ? '🌮' :
             recipe.title?.toLowerCase().includes('curry') ? '🍛' :
             recipe.title?.toLowerCase().includes('rice') ? '🍚' : '🍳'}
          </div>
        )}
        <div className="absolute top-4 right-4">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getDifficultyColor(recipe.difficulty)}`}>
            {getDifficultyEmoji(recipe.difficulty)} {recipe.difficulty}
          </span>
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center space-x-2 text-white">
            <span className="text-sm">⏱️ {recipe.cookingTime} mins</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
          {recipe.title}
        </h3>
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {recipe.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">👨‍🍳</span>
            </div>
            <span className="text-xs text-gray-400">
              {recipe.createdBy?.name || 'Chef Unknown'}
            </span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Link 
            to={`/recipe/${recipe._id}`}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-2 px-4 rounded-lg font-medium text-sm btn-glow hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
          >
            👁️ View Recipe
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard
