import React from "react";
import { Link } from "react-router-dom";

import Breadcrumb from "../../../../BreadCrumb/Breadcrumb";
import DepartmentWiseList from "./DepartmentWiseList";

function DepartmentWise() {
    
    return (
        <div className="page-body">
            <Breadcrumb heading="Department Wise"/>
            <div className="container-fluid support-ticket">
                <div className="row">
                    <div className="col-sm-12">
                        <DepartmentWiseList />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DepartmentWise;
