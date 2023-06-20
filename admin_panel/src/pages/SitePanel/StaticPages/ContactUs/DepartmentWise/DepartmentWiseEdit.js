import React from "react";

import Breadcrumb from "../../../../BreadCrumb/Breadcrumb";
import DepartmentWiseEditForm from "./DepartmentWiseEditForm";

function DepartmentWiseEdit() {
    return (
        <div className="page-body">
            <Breadcrumb heading="Edit Department Wise" /> 
            <div className="container-fluid support-ticket">
                <div className="row">
                    <div className="col-sm-12">
                        <DepartmentWiseEditForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DepartmentWiseEdit;
