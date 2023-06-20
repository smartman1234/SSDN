import React from "react";
import { Link } from "react-router-dom";

import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import CourseMenuList from "./CourseMenuList";

function CourseMenu() {
    const name = (
        <Link to="/course-menu-add" className="btn btn-primary">
        <i className="fa-solid fa-plus me-2"></i>Add Course Menu
        </Link>
    );
    return (
        <div className="page-body">
            <Breadcrumb heading="Course Menu" add={name}/>
            <div className="container-fluid support-ticket">
                <div className="row">
                    <div className="col-sm-12">
                        <CourseMenuList />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseMenu;
