import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Get current user
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  useEffect(() => {
    if (user) {
      fetchNotifications()
      // Poll for new notifications every 30 seconds
      const interval = setInterval(fetchNotifications, 30000)
      return () => clearInterval(interval)
    }
  }, [user])

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`/api/notifications?userId=${user._id}&unreadOnly=true`)
      if (response.ok) {
        const data = await response.json()
        setNotifications(data)
        setUnreadCount(data.length)
      }
    } catch (error) {
      console.log('Failed to fetch notifications:', error)
    }
  }

  const markAsRead = async (notificationId) => {
    try {
      const response = await fetch(`/api/notifications/${notificationId}/read`, {
        method: 'PUT'
      })
      if (response.ok) {
        fetchNotifications() // Refresh notifications
      }
    } catch (error) {
      console.log('Failed to mark notification as read:', error)
    }
  }

  const markAllAsRead = async () => {
    try {
      const response = await fetch('/api/notifications/mark-all-read', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: user._id })
      })
      if (response.ok) {
        fetchNotifications() // Refresh notifications
      }
    } catch (error) {
      console.log('Failed to mark all notifications as read:', error)
    }
  }

  if (!user) return null

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-300 hover:text-white transition-colors"
      >
        <span className="text-xl">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50">
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Mark all as read
                </button>
              )}
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-400">
                <span className="text-2xl mb-2 block">📭</span>
                <p>No new notifications</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification._id}
                  className="p-4 border-b border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer"
                  onClick={() => {
                    markAsRead(notification._id)
                    // Navigate based on notification type
                    if (notification.type === 'new_recipe') {
                      navigate('/home')
                    } else if (notification.type === 'recipe_added') {
                      navigate('/add-recipe')
                    }
                    setIsOpen(false)
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {notification.type === 'new_recipe' && <span className="text-xl">🍳</span>}
                      {notification.type === 'recipe_added' && <span className="text-xl">✅</span>}
                      {notification.type === 'general' && <span className="text-xl">📢</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm">
                        {notification.title}
                      </p>
                      <p className="text-gray-300 text-xs mt-1">
                        {notification.message}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationBell
