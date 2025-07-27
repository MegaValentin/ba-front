import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ProtectedRoute from './routes/ProtectedRoute'
import Dashboard from './components/Dashboard'
import UserManagment from './pages/UserManagment'
import Owners from './pages/Owners'
import NewOwners from './pages/NewOwner'
import NewProperty from './pages/NewProperty'
import Properties from './pages/Properties'
import PropertyId from './pages/PropertyId'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute><Dashboard/></ProtectedRoute>}>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/propietarios' element={<Owners/>}/>
          <Route path='/propietarios/nuevo' element={<NewOwners/>}/>
          <Route path='/propiedades/nueva' element={<NewProperty/>}/>
          <Route path='/propiedades' element={<Properties/>}/>
          <Route path='/usuarios' element={<UserManagment/>}/>    
          <Route path='/propiedades/:id' element={<PropertyId/>}      />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
