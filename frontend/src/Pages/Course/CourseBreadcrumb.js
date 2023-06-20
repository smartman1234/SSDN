import React from "react";
import { Link } from "react-router-dom";

export default function CourseBreadcrumb({ detailData, banner }) {
  return (
    <div
      className="edu-breadcrumb-area breadcrumb-style-1 bg-image"
      style={{
        backgroundImage: `url(${banner?.image_url + banner?.logo}) `,
      }}
    >
      <div className="container eduvibe-animated-shape">
        <div className="row">
          <div className="col-lg-12">
            <div className="breadcrumb-inner text-center">
              <div className="page-title">
                <h1 className="title">
                  {" "}
                  {detailData?.city_name
                    ? detailData?.heading.replaceAll(
                        "{{in VARCITY}}",
                        detailData?.city_name
                      )
                    : detailData?.heading?.replaceAll("{{in VARCITY}}", "")}
                </h1>
              </div>
              <nav className="edu-breadcrumb-nav">
                <ol className="edu-breadcrumb d-flex justify-content-center">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="separator">
                    <i className="ri-arrow-drop-right-line"></i>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/course">Course</Link>
                  </li>
                  <li className="separator">
                    <i className="ri-arrow-drop-right-line"></i>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to={`/${detailData?.category?.slug}`}>
                      {detailData.category?.name}
                    </Link>
                  </li>
                  <li className="separator">
                    <i className="ri-arrow-drop-right-line"></i>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {detailData?.name
                      ?.replaceAll("{{in VARCITY}}", "")
                      .replaceAll("{{In VARCITY}}", "")}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
