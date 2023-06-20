import React from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function InfrastructureCategoryCourse({ infrastructure }) {
  return (
    <div className="home-three-about edu-about-area edu-section-gap">
      <div className="container eduvibe-animated-shape">
        <div className="col-lg-12">
          <div className="section-title text-center">
            <h3 className="title">
              IT <span className="down-mark-line">Infrastructure</span>
            </h3>
          </div>
        </div>
        <div className="row mt--20">
          {infrastructure?.length > 0 &&
            infrastructure.map((v, i) => (
              <Link className="col-md-3 mt--0" key={i} to={`/${v.slug}`}>
                <div className="feature-box text-center">
                  <div className="feature-bg" style={{ height: "250px" }}>
                    <div className="feature-icon">
                      <LazyLoadImage  src={v.icon} alt="image"
                        height="100%"
                        width="100%" />
                    </div>
                      <div className="feature-text leading-tight2">{v.name}</div>
                    <p>
                      {v.total_course}{" "}
                      {v.total_course === 0 || v.total_course === 1
                        ? "Course"
                        : "Courses"}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
