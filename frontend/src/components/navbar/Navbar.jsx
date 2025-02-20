import React from "react";
import logo from "../../assets/logo.jpeg";
import { IoIosSearch } from "react-icons/io";
import { AiOutlinePoweroff } from "react-icons/ai";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-white p-3 shadow-sm grid grid-cols-3 items-center">
     
      <div></div>

    
      <div className="flex justify-center">
        <img className="w-[50px] object-contain" src={logo} alt="Logo" />
      </div>

     
      <div className="flex items-center justify-end space-x-4">
        <div className="cursor-pointer">
          <IoIosSearch className="text-xl" />
        </div>
        <div className="flex flex-col items-center ">
          <p className="text-sm font-bold text-blue-600">Active Customer</p>
          <p className="text-sm font-thin">NMC Lab</p>
        </div>
        <div 
          onClick={handleLogout}
          className="cursor-pointer hover:text-red-600 transition-colors flex items-center gap-2"
        >
          <AiOutlinePoweroff className="text-xl" />
        </div>
        <div className="bg-blue-600 p-1 px-2 rounded-lg text-white cursor-pointer">O</div>
      </div>
    </nav>
  );
}
