import React from "react";
import { Link } from "react-router-dom";

import Breadcrumb from "../../BreadCrumb/Breadcrumb";

const CompaniesList = React.lazy(() => import("./CompaniesList"));

function Companies() {
  const name = (
    <Link to="/companies/0" className="btn btn-primary">
      <i className="fa-solid fa-plus me-2"></i>Add Company
    </Link>
  );
  return (
    <div className="page-body">
      <Breadcrumb heading="Companies" add={name} />
      <div className="container-fluid support-ticket">
        <div className="row">
          <div className="col-sm-12">
            <React.Suspense fallback="Loading...">
              <CompaniesList />
            </React.Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Companies;
