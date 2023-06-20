import React from "react";
import { Link } from "react-router-dom";

import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import AssessmentCoursesAddForm from "./AssessmentCoursesAddForm";

function AssessmentCoursesAdd() {
  const name = (
    <Link to="/assessment-courses">
      <button className="btn btn-primary" id="nextBtn" type="button">
        Back
      </button>
    </Link>
  );
  return (
    <div className="page-body">
      <Breadcrumb heading="Assessment Course" subheading="Assessment Course" add={name}/>
      <div className="container-fluid support-ticket">
        <div className="row">
          <div className="col-sm-12">
            <AssessmentCoursesAddForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssessmentCoursesAdd;
