import { createContext, useContext, useEffect, useState } from 'react'
import { loginRequest, getMeRequest } from '../api/auth.js'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const login = async (credentials) => {
    
    await loginRequest(credentials)
  
    const res = await getMeRequest()
    console.log('Respuesta de /me:', res)
    if(!res || !res.data) throw new Error("No se pudo obtener el usuario")

      setUser(res.data.user)
  }

  const logout = () => {
    setUser(null)
    
  }

  const getCurrentUser = async () => {
    try {
      const { data } = await getMeRequest()
      setUser(data.user)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
