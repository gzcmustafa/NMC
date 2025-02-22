import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/nmc-logo.png"; 
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loading, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

 
  useEffect(() => {
    const from = location.state?.from || "/dashboard";
    if (user) {
      navigate(from);
    }
  }, [user, location]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Formun default davranışını engeller
    try {
      setError("");
      await login(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  
  return (
    <div className="bg-white min-h-screen flex items-center justify-center dark:bg-gray-800">
      <div className="flex flex-col items-center gap-7 mb-12 w-[260px] ">
        <div className="flex flex-col items-center w-full">
          <img className="w-[90px]" src={logo} alt="" />
          <h2 className="text-sm mt-4 whitespace-nowrap">
            Networking - Monitoring - Configuration
          </h2>
        </div>
     
        <form onSubmit={handleSubmit} className="flex gap-2 flex-col items-center w-full">
          {error && <p className="text-red-500">{error}</p>}
          <input
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            disabled={loading}
            className="w-full border py-2 px-4 text-m bg-gray-50 text-gray-600 focus:outline-blue-700"
          />
          <input
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password"
            disabled={loading}
            className="w-full border py-2 px-4 text-m bg-gray-50 text-gray-500 focus:outline-blue-700"
          />
          <button
            type="submit"
            disabled={loading} 
            className={`px-4 py-2 text-white bg-blue-600 hover:bg-blue-800 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
