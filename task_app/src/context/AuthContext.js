import { createContext, useContext, useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import API from '../api/api';
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

   useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded.sub);
    }
  }, []);

  const login = async (credentials) => {
    try {
      const res = await API.post('/auth/login', credentials);
      const token = res.data.token;
      localStorage.setItem('token', res.data.token);
      const decoded = jwtDecode(token);
      setUser(decoded.sub);
      // setUser(res.data.token);
      toast.success("Login successful!");
      navigate('/home');
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Invalid username or password!");
    }
  };

  const signup = async (data) => {
    try {
      await API.post('/auth/register', data);
      toast.success("Signup successful!");
      navigate('/login');
    } catch (error) {
      toast.error("Signup Failed User already exist!");
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success("Logout successful!");
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
