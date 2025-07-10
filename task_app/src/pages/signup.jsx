import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const { signup } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    signup(form);
    
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto m-20 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Sign Up</h2>

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        className="w-full mb-3 px-3 py-2 border rounded"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="w-full mb-4 px-3 py-2 border rounded"
        required
      />

      <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
        Sign Up
      </button>
    </form>
  );
}
