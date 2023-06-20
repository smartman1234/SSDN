import React from "react";
import { Link } from "react-router-dom";

import Breadcrumb from "../../../BreadCrumb/Breadcrumb";
import ComboList from "./ComboList";

function Combo() {
    const name = (
        <Link to="/course-combo-add" className="btn btn-primary">
          <i className="fa-solid fa-plus me-2"></i>Add Combo Course
        </Link>
    );
    return (
        <div className="page-body">
            <Breadcrumb heading="Combo Course" add={name}/>  
            <div className="container-fluid support-ticket">
                <div className="row">
                    <div className="col-sm-12">
                        <ComboList />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Combo;
