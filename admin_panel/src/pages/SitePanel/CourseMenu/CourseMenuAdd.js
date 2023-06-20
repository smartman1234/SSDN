import React from "react";

import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import CourseMenuAddForm from "./CourseMenuAddForm";

function CourseMenuAdd() {
    return (
        <div className="page-body">
            <Breadcrumb heading="Add Course Menu" /> 
            <div className="container-fluid support-ticket">
                <div className="row">
                    <div className="col-sm-12">
                        <CourseMenuAddForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseMenuAdd;
