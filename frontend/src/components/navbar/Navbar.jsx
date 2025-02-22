import React, { useState } from "react";
import logo from "../../assets/nmc-logo.png";
import { IoIosSearch } from "react-icons/io";
import { AiOutlinePoweroff } from "react-icons/ai";
import { RiMenu3Line } from "react-icons/ri";
import { useAuth } from "../../context/AuthContext";
import { ModeToggle } from "./mode-toggle";

export default function Navbar() {
  const { logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-white shadow-sm dark:bg-gray-800">
      {/* Desktop Navbar */}
      <div className="hidden md:grid grid-cols-3 items-center p-3">
        <div><ModeToggle/></div>
        
        <div className="flex justify-center dark:bg-gray-800">
          <img className="w-[50px] object-contain " src={logo} alt="Logo" />
        </div>
        
        
        <div className="flex items-center justify-end space-x-4">
          <div className="cursor-pointer">
            <IoIosSearch className="text-xl" />
          </div>
          <div className="flex flex-col items-center">
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
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600"
            >
              <RiMenu3Line className="text-2xl" />
            </button>
            <img className="w-[40px] object-contain" src={logo} alt="Logo" />
          </div>

          <div className="flex items-center space-x-3">
            <IoIosSearch className="text-xl" />
            <div className="bg-blue-600 p-1 px-2 rounded-lg text-white cursor-pointer">O</div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="bg-white border-t py-2 px-3 space-y-3">
            <div className="flex items-center justify-between py-2">
              <div className="flex flex-col">
                <p className="text-sm font-bold text-blue-600">Active Customer</p>
                <p className="text-sm font-thin">NMC Lab</p>
              </div>
              <div 
                onClick={handleLogout}
                className="cursor-pointer hover:text-red-600 transition-colors flex items-center gap-2"
              >
                <AiOutlinePoweroff className="text-xl" />
                <span className="text-sm">Logout</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
