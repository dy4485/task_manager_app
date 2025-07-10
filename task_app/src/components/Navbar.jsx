import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="flex justify-between p-4 bg-indigo-600 text-white  fixed top-0 w-full z-50">
      <h1 className="text-xl font-bold">📝 Task Manager</h1>
      <div className="space-x-4">
        {user ? (
          <>
             <span className="text-white-700">👋 Welcome, <strong>{user}</strong></span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
