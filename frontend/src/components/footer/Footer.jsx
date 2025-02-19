import React from "react";

export default function Footer() {
  return (
    <div>
      <div className=" grid grid-cols-6 gap-12">
        <div className="  flex flex-col gap-3 text-sm  text-gray-600">
          <h3 className="text-gray-400 font-bold text-sm">SITE MAP</h3>
          <p className="cursor-pointer">Dashboard</p>
          <p className="cursor-pointer">Monitoring</p>
          <p className="cursor-pointer">Edge Performance</p>
          <p className="cursor-pointer"> Help</p>
        </div>

        <div className="flex flex-col gap-3 text-sm  text-gray-600">
          <br />
          <p className="cursor-pointer">Detailed KPI</p>
          <p className="cursor-pointer">Widgets</p>
          <p className="cursor-pointer">News</p>
          <p className="cursor-pointer">Our Website</p>
        </div>

        <div className="flex flex-col gap-3 text-sm text-gray-600">
          <h3 className="text-gray-400 font-bold text-sm">CONTACT US</h3>
          <p className="cursor-pointer">support@com</p>
          <p className="cursor-pointer">Munich, Germany</p>
        </div>

        <div className="flex flex-col gap-3 col-span-3 text-sm  text-gray-500 ">
          <h3 >NEWSLETTER</h3>
          <p >Join our newsletter to get notification about the new features.</p>
          <div className="flex items-center bg-white rounded-xl py-1 px-2 w-full text-sm">
            <input
              type="email"
              placeholder="email address"
              className=" flex-1 border-none py-2 px-4 text-m text-gray-500 rounded-full focus:outline-none"
            />
            <button className="bg-gray-600 hover:bg-gray-700 text-white py-1 px-3 rounded-lg text-m focus:outline-none">
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
