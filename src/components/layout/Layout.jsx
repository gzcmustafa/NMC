import React from "react";
import Footer from "../footer/Footer";

export default function Layout({ children }) {
  return (
    <div className="bg-[#F2F4F6]  px-10 py-8 ">
      <div>
        <main className=" ">{children}</main>
      </div>

      <div className="mt-14">
        <Footer />
      </div>
    </div>
  );
}
