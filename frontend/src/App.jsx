import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Landing from './pages/Landing'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AddRecipe from './pages/AddRecipe'
import RecipeDetails from './pages/RecipeDetails'
import SavedRecipes from './pages/SavedRecipes'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/saved-recipes" element={
            <ProtectedRoute>
              <SavedRecipes />
            </ProtectedRoute>
          } />
          <Route path="/add-recipe" element={
            <ProtectedRoute>
              <AddRecipe />
            </ProtectedRoute>
          } />
          <Route path="/recipe/:id" element={
            <ProtectedRoute>
              <RecipeDetails />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
