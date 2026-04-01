const Footer = () => {
  return (
    <footer className="glass mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🍳</span>
              </div>
              <span className="gradient-text font-bold text-xl">RecipeHub 2026</span>
            </div>
            <p className="text-gray-400 text-sm">
              Discover culinary masterpieces from around the world. Your gateway to amazing recipes and cooking inspiration.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-purple-400 transition-colors">🏠 Home</a></li>
              <li><a href="/add-recipe" className="text-gray-400 hover:text-purple-400 transition-colors">➕ Add Recipe</a></li>
              <li><a href="/login" className="text-gray-400 hover:text-purple-400 transition-colors">👤 Login</a></li>
              <li><a href="/register" className="text-gray-400 hover:text-purple-400 transition-colors">🚀 Sign Up</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              &copy; 2026 RecipeHub 2026. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
