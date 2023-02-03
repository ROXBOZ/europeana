import React from "react";
import { Outlet } from "react-router-dom";

// Components
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

const RootLayout = () => {
  return (
    <div className="root-layout">
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
