import  { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { FiMonitor } from "react-icons/fi";
import { AiOutlineBars } from "react-icons/ai";
import { BsSend } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { LuWrench } from "react-icons/lu";
import { FaRegAddressCard } from "react-icons/fa";
import { GoLock } from "react-icons/go";
import { FaRegFolderOpen } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaChartLine } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { Link,useLocation } from "react-router-dom";



export default function SideBar() {
    const [isDeploymentOpen, setIsDeploymentOpen] = useState(false);

    const location = useLocation();
    const isOverview = location.pathname === "/dashboard";
    const isCustomerJourney = location.pathname.includes("customer-journey");

    useEffect(()=>{
        if(location.pathname ==="/dashboard") {
            setIsDeploymentOpen(false);
        }
    },[location.pathname])
    
  return (
    <aside className="text-sm bg-white w-[70px] hover:w-[220px] transition-all duration-300 shadow-sm p-4 group dark:bg-gray-800 ">
        <div className="space-y-6">
          <Link to="/dashboard">
          <div className={`flex items-center cursor-pointer hover:bg-gray-100  dark:hover:bg-gray-600 rounded p-1 relative ${isOverview ? 'text-blue-600' : ''}`}>
            {isOverview &&  <div className="absolute left-[-16px] w-1 h-6 bg-blue-600 rounded-r"></div> }
            <AiOutlineHome className="text-2xl" />
            <p className="ml-4 hidden group-hover:block">Overview</p>
            <MdKeyboardArrowDown className="ml-auto hidden group-hover:block" />
          </div>
          </Link>
          <div className="flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600  rounded p-1">
            <FiMonitor className="text-2xl" />
            <p className="ml-4 hidden group-hover:block">Monitoring</p>
            <MdKeyboardArrowDown className="ml-auto hidden group-hover:block" />
          </div>
          <div className="flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600  rounded p-1">
            <AiOutlineBars className="text-2xl" />
            <p className="ml-4 hidden group-hover:block">KPIs</p>
            <MdKeyboardArrowDown className="ml-auto hidden group-hover:block" />
          </div>
          <div>
            <div
              className={`flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600  rounded p-1 relative ${isDeploymentOpen ? 'text-blue-600' : '' }`}
              onClick={() => setIsDeploymentOpen(!isDeploymentOpen)}
            >
                {isDeploymentOpen &&  <div className="absolute left-[-16px] w-1 h-6 bg-blue-600 rounded-r"></div> }
              <BsSend className="text-2xl" />
              <p className="ml-4 hidden group-hover:block">Deployment</p>
              <MdKeyboardArrowDown
                className={`ml-auto hidden group-hover:block transform transition-transform ${
                  isDeploymentOpen ? "rotate-180" : ""
                }`}
              />
            </div>
            {isDeploymentOpen && (
              <div className=" hidden group-hover:block ml-8 mt-2 space-y-2">
                <div className=" flex items-center cursor-pointer  hover:bg-gray-100  dark:hover:bg-gray-600  rounded p-1">
                <RxDashboard />
                  <p className="ml-4">CoreNetwork Elements</p>
                </div>
                <Link to="/dashboard/customer-journey">
                <div className={`flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600  rounded p-1 ${isCustomerJourney ? 'text-blue-600' : ''}`}>
                <FaChartLine />
                  <p className="ml-4">Customer Journey</p>
                </div>
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600  rounded p-1">
            <CiSettings className="text-2xl" />
            <p className="ml-4 hidden group-hover:block">Configuration</p>
            <MdKeyboardArrowDown className="ml-auto hidden group-hover:block" />
          </div>
          <div className="flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600  rounded p-1">
            <LuWrench className="text-2xl" />
            <p className="ml-4 hidden group-hover:block">Device Management</p>
            <MdKeyboardArrowDown className="ml-auto hidden group-hover:block" />
          </div>
          <div className="flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600  rounded p-1">
            <FaRegAddressCard className="text-2xl" />
            <p className="ml-4 hidden group-hover:block">
              Customer Relations
            </p>
            <MdKeyboardArrowDown className="ml-auto hidden group-hover:block" />
          </div>
          <div className="flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600  rounded p-1">
            <GoLock className="text-2xl" />
            <p className="ml-4 hidden group-hover:block">Security</p>
            <MdKeyboardArrowDown className="ml-auto hidden group-hover:block" />
          </div>
          <div className="flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600  rounded p-1">
            <FaRegFolderOpen className="text-2xl" />
            <p className="ml-4 hidden group-hover:block">Repository</p>
            <MdKeyboardArrowDown className="ml-auto hidden group-hover:block" />
          </div>
        </div>
      </aside>
  )
}
