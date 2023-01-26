import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
// import { useContext } from "react";
// import { DarkModeContext } from "../store/DarkModeContext";

const RootLayout = () => {
  // className={{ darkMode ? "darkmode" : "lightmode"}} // actually on body
  return (
    <div className="root-layout">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
