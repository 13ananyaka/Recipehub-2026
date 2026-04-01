import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate login for demo purposes (no API call)
    setTimeout(() => {
      const mockUser = {
        _id: 'demo-user-' + Date.now(),
        name: formData.email.split('@')[0] || 'Demo User',
        email: formData.email,
        token: 'demo-token-' + Date.now(),
        lastLogin: new Date().toISOString()
      }
      localStorage.setItem('user', JSON.stringify(mockUser))
      
      setLoading(false)
      navigate('/')
    }, 1500) // Simulate network delay
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center py-8">
      <div className="max-w-md w-full mx-4">
        <div className="glass rounded-2xl overflow-hidden animate-fade-in">
          <div className="h-32 bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">👤</div>
              <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
              <p className="text-white text-opacity-80 text-sm">RecipeHub 2026</p>
            </div>
          </div>
          
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  📧 Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  🔒 Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500" />
                  <span className="ml-2 text-sm text-gray-300">Remember me</span>
                </label>
                <a href="#" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                  Forgot password?
                </a>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-xl font-semibold btn-glow hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  '🚀 Login to RecipeHub 2026'
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Don't have an account?{' '}
                <a href="/register" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                  Sign up for free
                </a>
              </p>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-gray-500 text-xs">
                Demo: Use any email/password to login
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
