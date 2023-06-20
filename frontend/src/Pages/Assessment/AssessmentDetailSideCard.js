import React, { useEffect } from "react";
import { ShareSocial } from "react-share-social";
import moment from 'moment'
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function AssessmentDetailSideCard({ assessmentdata }) {


  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

  const isSticky = (e) => {
    const header = document.querySelector(".menu-sticky");
    const scrollTop = window.scrollY;
    if (scrollTop >= 300) {
      header?.classList?.add("sticky");
    } else {
      header?.classList.remove("sticky");
    }
    if (scrollTop >= 1800) {
      header?.classList.remove("sticky");
    } else {
    }
  };
  const style = {
    copyContainer: {
        display: "none",
    },
    root: {
        border: 0,
        padding: 0,
    },
    title: {
        color: 'aquamarine',
        fontStyle: 'italic'
    }
};
  return (
    <div className="col-xl-4 col-lg-5">
      <div className="eduvibe-sidebar course-details-sidebar ">
        <div className="inner">
          <div className="eduvibe-widget">
            <div className="video-area">
              <div className="thumbnail video-popup-wrapper text-center">
                {assessmentdata?.is_inr_discount === 1 && (
                  <span className="badge badge-pill percentage-card">
                    {assessmentdata?.inr_discount_price} % off
                  </span>
                )}
                 <LazyLoadImage
                  className="radius-small w-100"
                  src={assessmentdata.image}
                  alt={assessmentdata.image_alt_tag}
                  style={{ height: "124px", maxWidth: "150px" }}
                  height="100%"
                  width="100%"
                />
              </div>
            </div>
            <div className="eduvibe-widget-details mt--35">
              <div className="widget-content">
                <ul>
                  <li>
                    <span>Total Marks</span>
                    <span className="design-data">-</span>
                    <span>{assessmentdata.total_marks}</span>
                  </li>

                  <li>
                    <span>Level </span>
                    <span className="design-data">-</span>
                    <span>
                      {assessmentdata.level?.charAt(0)?.toUpperCase() +
                        assessmentdata.level?.slice(1)}
                    </span>
                  </li>

                  <li>
                    <span>Re-attempt </span>
                    <span className="design-data">-</span>
                    <span>
                      {assessmentdata.is_re_attempt === 1 && "Yes"}
                      {assessmentdata.is_re_attempt === 0 && "No"}
                    </span>
                  </li>

                  <li>
                    <span>Certificate </span>
                    <span className="design-data">-</span>
                    <span>
                      {assessmentdata.is_certificate === 1 && "Yes"}
                      {assessmentdata.is_certificate === 0 && "No"}
                    </span>
                  </li>

                  <li>
                    <span>Result Declaration </span>
                    <span className="design-data">-</span>
                    <span>{assessmentdata.result_declaration}</span>
                  </li>
                  <li>
                    <span>Last Update </span>
                    <span className="design-data">-</span>
                    <span>{(moment(assessmentdata.updated_at).format("DD-MM-YYYY"))}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="read-more-btn mt--0 text-center">
                <div className="eduvibe-post-share">
                  <span>Share: </span>
                  <div>
                    <ShareSocial
                      url={window.location.href}
                      socialTypes={["facebook", "twitter", "linkedin"]}
                      style={style}
                    />
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
