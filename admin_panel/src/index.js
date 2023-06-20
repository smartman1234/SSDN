import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ContextProvider } from "./container/Context";

window.tinyAPIKEY = "j1g23ad6n3ra8f5lbnbe3nldrui85ygcv9zwc1ao74848kmj";
window.user = JSON.parse(localStorage.getItem("user"))
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
      <ContextProvider>
        <App />
      </ContextProvider>
  </BrowserRouter>
);
