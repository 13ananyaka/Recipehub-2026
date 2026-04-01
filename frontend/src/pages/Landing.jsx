import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is already logged in
    const userData = localStorage.getItem('user')
    if (userData) {
      navigate('/home')
    } else {
      navigate('/login')
    }
  }, [navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
        <p className="text-white text-lg">Redirecting...</p>
      </div>
    </div>
  )
}

export default Landing
