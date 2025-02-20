import React from "react";
import Footer from "../footer/Footer";
import { useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <div className="bg-[#F2F4F6]">
      <div>
        <main className={`${isLoginPage ? "px-10 py-8" : ""}`}>{children}</main>
      </div>

      <div className="mt-14">
        <Footer />
      </div>
    </div>
  );
}
