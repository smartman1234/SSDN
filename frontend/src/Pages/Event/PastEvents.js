import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import Utils from "../../Utils/Utils";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function PastEvents({ pastEventList }) {
  return (
    <div className="row">
    {pastEventList?.length &&
      pastEventList.map((v, i) => (
        <div className="col-md-6 mb--30" key={i}>
          <div className="edu-card card-type-3 radius">
            <div className="inner inner-ssdn">
              <div className="thumbnail1">
                <Link to="#">
                  <LazyLoadImage  src={v.image} alt={v.image_alt_tag} 
                                height="100%"
                                width="100%"/>
                </Link>
                <span className="badge badge-pill1">Registration Closed</span>
              </div>
              <div className="content">
                <h6 className="title">
                  <Link to="#">{Utils.titleCase(v.title)}</Link>
                </h6>
                <div className="card-bottom pb--10">
                  <ul className="blog-meta">
                    <li>
                      <i className="icon-calendar-2-line me-2"></i>
                      {moment(v.date).format("ll")}
                    </li>
                  </ul>
                  <ul className="blog-meta">
                    <li>
                      <i className="icon-time-line me-2"></i>
                      {moment(v.date + " " + v.start_time).format("LT")}-{" "}
                      {moment(v.date + " " + v.end_time).format("LT")}
                    </li>
                  </ul>
                </div>
                <div className="card-bottom pb--10">
                  <div className="read-more-btn leading-tight1">
                    <i className="icon-map-pin-line"></i>{" "}
                    {Utils.titleCase(v.location)}
                  </div>
                </div>
                <div className="card-bottom justify-content-center">
                  <div className="read-more-btn">
                    <Link className="btn-transparent text-danger w-600" to="#">
                      Registration Closed
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
