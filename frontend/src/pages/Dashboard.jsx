import { Outlet } from "react-router-dom";


import Navbar from "@/components/navbar/Navbar";
import SideBar from "@/components/sidebar/SideBar";


export default function Dashboard() {
  

  return (
    <div className="min-h-screen flex flex-col">
    {/* Navbar */}
    <Navbar/>

    <div className="flex flex-1">
      {/* Sidebar */}
      <SideBar/>

      {/* Main Content Area */}
      <main className="flex-1 p-7 bg-gray-50 dark:bg-gray-700">
      <Outlet/>
      </main>
    </div>
  </div> 
  );
}
