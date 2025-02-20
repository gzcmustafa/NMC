import  { useState } from "react";
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


export default function SideBar() {
    const [isDeploymentOpen, setIsDeploymentOpen] = useState(false);
  return (
    <aside className="text-sm bg-white w-[70px] hover:w-[220px] transition-all duration-300 shadow-sm p-4 group">
        <div className="space-y-6">
          <div className="flex items-center cursor-pointer hover:bg-gray-100 rounded p-1">
            <AiOutlineHome className="text-2xl" />
            <p className="ml-4 hidden group-hover:block">Overview</p>
          </div>
          <div className="flex items-center cursor-pointer hover:bg-gray-100 rounded p-1">
            <FiMonitor className="text-2xl" />
            <p className="ml-4 hidden group-hover:block">Monitoring</p>
            <MdKeyboardArrowDown className="ml-auto hidden group-hover:block" />
          </div>
          <div className="flex items-center cursor-pointer hover:bg-gray-100 rounded p-1">
            <AiOutlineBars className="text-2xl" />
            <p className="ml-4 hidden group-hover:block">KPIs</p>
            <MdKeyboardArrowDown className="ml-auto hidden group-hover:block" />
          </div>
          <div>
            <div
              className="flex items-center cursor-pointer hover:bg-gray-100 rounded p-1"
              onClick={() => setIsDeploymentOpen(!isDeploymentOpen)}
            >
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
                <div className=" flex items-center cursor-pointer  hover:bg-gray-100 rounded p-1">
                <RxDashboard />
                  <p className="ml-4">CoreNetwork Elements</p>
                </div>
                <div className=" flex items-center cursor-pointer  hover:bg-gray-100 rounded p-1">
                <FaChartLine />
                  <p className="ml-4">Customer Journey</p>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center cursor-pointer hover:bg-gray-100 rounded p-1">
            <CiSettings className="text-2xl" />
            <p className="ml-4 hidden group-hover:block">Configuration</p>
            <MdKeyboardArrowDown className="ml-auto hidden group-hover:block" />
          </div>
          <div className="flex items-center cursor-pointer hover:bg-gray-100 rounded p-1">
            <LuWrench className="text-2xl" />
            <p className="ml-4 hidden group-hover:block">Device Management</p>
            <MdKeyboardArrowDown className="ml-auto hidden group-hover:block" />
          </div>
          <div className="flex items-center cursor-pointer hover:bg-gray-100 rounded p-1">
            <FaRegAddressCard className="text-2xl" />
            <p className="ml-4 hidden group-hover:block">
              Customer Relations
            </p>
            <MdKeyboardArrowDown className="ml-auto hidden group-hover:block" />
          </div>
          <div className="flex items-center cursor-pointer hover:bg-gray-100 rounded p-1">
            <GoLock className="text-2xl" />
            <p className="ml-4 hidden group-hover:block">Security</p>
            <MdKeyboardArrowDown className="ml-auto hidden group-hover:block" />
          </div>
          <div className="flex items-center cursor-pointer hover:bg-gray-100 rounded p-1">
            <FaRegFolderOpen className="text-2xl" />
            <p className="ml-4 hidden group-hover:block">Repository</p>
            <MdKeyboardArrowDown className="ml-auto hidden group-hover:block" />
          </div>
        </div>
      </aside>
  )
}
