import React from "react";
import { Link } from "react-router-dom";

function CourseList({ courseList, gettingCourseid }) {
  return (
    <div className="col-lg-4 col-md-6 mb--20">
      <div className="card bg-color mt--0">
        <div className="card-body pb--0">
          <div className="card-heading">
            <h5 className="widget-title mb--0">Courses</h5>
          </div>
        </div>
        <div className="card-body">
          {courseList.length > 0 &&
            courseList.map((v, i) => (
              <div
                className="service-card service-card-5 course-class-warpper-inner"
                key={i}
              >
                <div className="inner p-0">
                  <div className="icon data-image-color">
                    <i className="icon-Schoolbag"></i>
                  </div>
                  <Link to="#" className="leading-tight1" onClick={() => {
                    sessionStorage.setItem("testimonialcourseid", v);
                    gettingCourseid(v);
                  }}>{v}</Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default CourseList;
