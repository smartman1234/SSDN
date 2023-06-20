import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./Container/Context";
import ScrollToTop from "./Pages/ScrollToTop/ScrollToTop";

window.tinyAPIKEY = "j1g23ad6n3ra8f5lbnbe3nldrui85ygcv9zwc1ao74848kmj";
window.user = JSON.parse(localStorage.getItem("user"))
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <CartProvider>
    <ScrollToTop />
      <App />
    </CartProvider>
  </BrowserRouter>
);
