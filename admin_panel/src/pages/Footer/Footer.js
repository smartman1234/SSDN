import React from "react";
import { Link } from "react-router-dom";
function Footer() {
  const today = new Date();
  const year = today.getFullYear();
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 footer-copyright">
            <p className="mb-0">
              Copyright {year} © <Link to="/home"> SSDN Technologies</Link> All
              rights reserved.
            </p>
          </div>
          <div className="col-md-6">
            <p className="pull-right mb-0">
              Developed by <Link to="/home">Ezdat Technology Pvt. Ltd.</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
