import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
   const { isAuthenticated, loading } = useAuth()

  if (loading) return <p className="p-4">Cargando sesión...</p>

  if (!isAuthenticated) return <Navigate to="/login" />

  return children
}