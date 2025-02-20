import { useState } from "react";
import logo from "../assets/logo.jpeg"; 
import { Button } from "@/components/ui/button";
import { login } from "../lib/api";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const token = await login(email, password);
      localStorage.setItem("token", token); 
      window.location.href = "/dashboard"; 
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
            type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full border py-2 px-4 text-m bg-gray-50 text-gray-600 focus:outline-blue-700"
          />
          <input
            type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password"
            required
            className="w-full border py-2 px-4 text-m bg-gray-50 text-gray-500 focus:outline-blue-700"
          />
        </div>
        <div>
          <Button
           onClick={handleLogin} 
            variant="outline"
            className="text-white hover:text-white bg-blue-600 hover:bg-blue-800"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
