import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpeg"; 
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loading, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Eğer kullanıcı zaten giriş yapmışsa ve state'te bir yönlendirme varsa
  useEffect(() => {
    const from = location.state?.from || "/dashboard";
    if (user) {
      navigate(from);
    }
  }, [user, location]);

  const handleLogin = async () => {
    try {
      setError("");
      await login(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-7 mb-12 w-[260px] ">
        <div className="flex flex-col items-center w-full">
          <img className="w-[90px]" src={logo} alt="" />
          <h2 className="text-sm mt-4 whitespace-nowrap">
            Networking - Monitoring - Configuration
          </h2>
        </div>
        <div className="flex gap-2 flex-col items-center w-full">
          {error && <p className="text-red-500">{error}</p>}
          <input
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            disabled={loading}
            className="w-full border py-2 px-4 text-m bg-gray-50 text-gray-600 focus:outline-blue-700"
          />
          <input
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password"
            required
            disabled={loading}
            className="w-full border py-2 px-4 text-m bg-gray-50 text-gray-500 focus:outline-blue-700"
          />
        </div>
        <div>
          <button
            onClick={handleLogin}
            disabled={loading} 
            className={`px-4 py-2 text-white bg-blue-600 hover:bg-blue-800 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
}
