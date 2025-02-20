import React from "react";
import logo from "../../assets/logo.jpeg";
export default function Navbar() {
  return (
    <nav className="bg-white p-3  shadow-sm flex items-center justify-between">
      <div className="flex items-center">
        {/* Left side menu items can go here */}
      </div>

      <div className="cursor-pointer">
        <img className="w-[50px] object-contain" src={logo} alt="Logo" />
      </div>

      <button className=" text-gray-600 hover:text-gray-800">Logout</button>
    </nav>
  );
}
