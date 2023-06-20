import React from "react";
import { Link } from "react-router-dom";

import Breadcrumb from "../../BreadCrumb/Breadcrumb";

const ClientList = React.lazy(() => import("./ClientList"));

function Client() {
  const name = (
    <Link to="/client-add/0" className="btn btn-primary">
      <i className="fa-solid fa-plus me-2"></i>Add Client
    </Link>
  );
  return (
    <div className="page-body">
      <Breadcrumb heading="Client" add={name} />
      <div className="container-fluid support-ticket">
        <div className="row">
          <div className="col-sm-12">
            <React.Suspense fallback="Loading...">
              <ClientList />
            </React.Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Client;
