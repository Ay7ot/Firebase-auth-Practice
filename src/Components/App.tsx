import { AuthProvider } from "../Contexts/AuthContext"
import Signup from "./Signup"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from "./DashBoard"
import Login from "./Login"
import UpdateProfile from "./UpdateProfile"
import ForgotPassword from "./ForgotPassword"

function App() {

  return (
    <div className="font-sourceSans">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/updateProfile' element={<UpdateProfile />} />
            <Route path='/forgotPassword' element={<ForgotPassword />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App
