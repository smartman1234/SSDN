import React, { useEffect, useState } from "react";
import AllRoutes from "./Route/AllRoutes";
import { HelmetProvider } from "react-helmet-async";
import TimeoutLogic from "./Pages/Login/TimeoutLogic";

function App() {
  const helmetContext = {};
  return (
    <React.Fragment>
      <HelmetProvider context={helmetContext}>
        <AllRoutes />
      </HelmetProvider>
      <TimeoutLogic />
    </React.Fragment>
  );
}

export default App;
