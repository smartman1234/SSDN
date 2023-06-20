import React from "react";
import LeftSide from "./LeftSide";
import Login from "./Login";

function LoginPage(props, isOpen, onRequestClose) {
  return (
    <section>
      <div className="container-fluid">
        <div className="row">
          <LeftSide />
          <div className="col-xl-5 p-0">
            <Login {...props} isOpen={isOpen} onRequestClose={onRequestClose} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
