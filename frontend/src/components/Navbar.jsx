import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NotificationBell from './NotificationBell'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    navigate('/login')
  }

  return (
    <nav className="glass sticky top-0 z-50 animate-slide-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/home" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🍳</span>
              </div>
              <span className="gradient-text font-bold text-xl">RecipeHub 2026</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {user ? (
                <>
                  <Link 
                    to="/home" 
                    className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
                  >
                    🏠 Home
                  </Link>
                  <Link 
                    to="/saved-recipes" 
                    className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
                  >
                    💝 Saved Recipes
                  </Link>
                  <Link 
                    to="/add-recipe" 
                    className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
                  >
                    ➕ Add Recipe
                  </Link>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-300 text-sm">
                      👋 {user.name}
                    </span>
                    <NotificationBell />
                    <button
                      onClick={handleLogout}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
                    >
                      🚪 Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
                  >
                    👤 Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-md text-sm font-medium btn-glow"
                  >
                    🚀 Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2 transition-colors duration-300"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {user ? (
                <>
                  <Link 
                    to="/home" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-gray-300 hover:text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium transition-all duration-300"
                  >
                    🏠 Home
                  </Link>
                  <Link 
                    to="/saved-recipes" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-gray-300 hover:text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium transition-all duration-300"
                  >
                    💝 Saved Recipes
                  </Link>
                  <Link 
                    to="/add-recipe" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-gray-300 hover:text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium transition-all duration-300"
                  >
                    ➕ Add Recipe
                  </Link>
                  <div className="border-t border-gray-700 pt-2">
                    <div className="px-3 py-2 text-gray-300 text-sm">
                      👋 {user.name}
                    </div>
                    <div className="px-3 py-2">
                      <NotificationBell />
                    </div>
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsMobileMenuOpen(false)
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 w-full"
                    >
                      🚪 Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-gray-300 hover:text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium transition-all duration-300"
                  >
                    👤 Login
                  </Link>
                  <Link 
                    to="/register" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white block px-3 py-2 rounded-md text-base font-medium btn-glow"
                  >
                    🚀 Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
