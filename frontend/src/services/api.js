const API_BASE_URL = '/api'

export const api = {
  // User endpoints
  login: (userData) => 
    fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    }),

  register: (userData) => 
    fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    }),

  // Recipe endpoints
  getRecipes: () => fetch(`${API_BASE_URL}/recipes`),
  
  getRecipe: (id) => fetch(`${API_BASE_URL}/recipes/${id}`),
  
  createRecipe: (recipeData) => 
    fetch(`${API_BASE_URL}/recipes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipeData)
    }),

  updateRecipe: (id, recipeData) => 
    fetch(`${API_BASE_URL}/recipes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipeData)
    }),

  deleteRecipe: (id) => 
    fetch(`${API_BASE_URL}/recipes/${id}`, {
      method: 'DELETE'
    }),

  // Order endpoints
  getOrders: (userId) => 
    fetch(`${API_BASE_URL}/orders${userId ? `?userId=${userId}` : ''}`),
  
  createOrder: (orderData) => 
    fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    }),

  updateOrderStatus: (id, status) => 
    fetch(`${API_BASE_URL}/orders/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    }),

  // Notification endpoints
  getNotifications: (userId, unreadOnly = false) => 
    fetch(`${API_BASE_URL}/notifications?userId=${userId}&unreadOnly=${unreadOnly}`),
  
  markNotificationAsRead: (id) => 
    fetch(`${API_BASE_URL}/notifications/${id}/read`, {
      method: 'PUT'
    }),

  markAllNotificationsAsRead: (userId) => 
    fetch(`${API_BASE_URL}/notifications/mark-all-read`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    })
}
