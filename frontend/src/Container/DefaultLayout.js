import React, { useState, useEffect } from "react";
import {  useLocation } from "react-router-dom";
import Header from "../Pages/Header/Header";

const HomeHeader = React.lazy(() => import("../Pages/Home/HomeHeader"));

const Footer = React.lazy(() => import("../Pages/Footer/Footer"));

export default function DefaultLayout({ children, handleAuthState }) {
  const [enableHeader, setEnableHeader] = useState(true);
  const [enableFooter, setEnableFooter] = useState(true);
  const location = useLocation();
  useEffect(() => {
    if (
      location.pathname === "/login" ||
      location.pathname === "/signup" ||
      location.pathname === "/404"
    ) {
      setEnableFooter(false);
    } else {
      setEnableFooter(true);
    }
    if (location.pathname === "/" || location.pathname === "/") {
      setEnableHeader(false);
    } else {
      setEnableHeader(true);
    }
  }, [location.pathname]);
  return (
    <>
      {/* <div className="main-wrapper"> */}
        {enableHeader ? (
          <Header />
        ) : (
          <React.Suspense fallback="">
          <HomeHeader handleAuthState={handleAuthState} />
        </React.Suspense>
         
        )}
        {children}

        {enableFooter === false ? null :    <React.Suspense fallback="">
        <Footer />
        </React.Suspense>}
      {/* </div> */}
    </>
  );
}
