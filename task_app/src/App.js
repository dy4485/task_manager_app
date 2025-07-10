import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/signup';
import Home from './pages/Home'
import Dashboard from './pages/Dashboard';

function App() {
  return (
    
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <AuthProvider>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/home" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </AuthProvider>
    </Router>

  );
}

export default App;
