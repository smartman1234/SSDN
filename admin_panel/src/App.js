import React, { useState } from "react";
import AllRoutes from "./routes/AllRoutes";
import  TimeoutLogic  from "./pages/Login/TimeoutLogic";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    window.user?.data?.auth_token ? true : false
  );

  return (
    <div className="App">
     
      <AllRoutes
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
        <TimeoutLogic/>
    </div>
  );
}

export default App;
