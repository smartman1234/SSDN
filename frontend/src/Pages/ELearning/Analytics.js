import React, { useState } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
export default function Analytics({ data }) {
  const analytics = data.analytic_skils && JSON.parse(data.analytic_skils);
  const [active, setActive] = useState({});
  const activeHandler = (id) => {
    setActive((prev) => ({ [id]: !prev[id] }));
  };
  return (
    <div className="edu-contact-us-area eduvibe-contact-us edu-section-gap">
      <div className="container eduvibe-animated-shape">
        <div className="row">
          <div className="col-lg-8">
            <div className="course-content">
              <div className="content-left width-button-wrapper data-webinar-rap1">
                <h5 className="title">{data?.analytic_skil_title}</h5>
                <ul className="list-style-1">
                  {analytics?.map((v, i) => (
                    <li key={i}>
                      <i className="icon-checkbox-circle-fill-solid"></i>
                      {v?.description}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="course-details-card mb--0">
              <div className="course-content">
                <h6 className="mb--20">What you will learn in {data.name}</h6>
              </div>
              <div className="height-match-section3">
                <div className="edu-accordion-02" id="accordionExample1">
                  {data?.section?.map((v, i) => (
                    <div
                      className={
                        active[i]
                          ? "edu-accordion-item bg-active"
                          : "edu-accordion-item"
                      }
                      key={i}
                    >
                      <div className="edu-accordion-header" id="headingOne123">
                        <button
                          className="edu-accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne123"
                          aria-expanded="true"
                          aria-controls="collapseOne123"
                          onClick={() => activeHandler(i)}
                        >
                          {v.title}
                        </button>
                      </div>
                      {active[i] && (
                        <div
                          className={
                            active[i]
                              ? "accordion-collapse collapse show"
                              : "accordion-collapse collapse"
                          }
                        >
                          {v?.lectures &&
                            v?.lectures.map((lecture,i_) => (
                              <div className="edu-accordion-body" key={i_}>
                                <p>{lecture.title}</p>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  ))}
                 
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt--30 mb--30">
          <div className="col-md-8">
            <div className="content-left width-button-wrapper data-webinar-rap1">
              <h5 className="title">{data?.certificate_title}</h5>
              <p
                dangerouslySetInnerHTML={{ __html: data?.certificate_overview }}
              ></p>
            </div>
            <div className="skill-certficate-wrapper">
              <div className="skill-certficate">
                 <LazyLoadImage
                  className="blend-mode"
                  src={data?.certificate_demo_image}
                  alt="Learn the Fundamentals of Business Analytics with Excel"
                  height="100%"
                  width="100%"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8">
            <div className="card">
              <div className="card-body">
                <div className="section-title text-center mb--20">
                  <h3 className="title">FAQ's</h3>
                </div>
                <div
                  className="edu-accordion-02 height-match-section3 mt--0"
                  id="accordionExample441"
                >
                  {data?.faqs?.map((v, i) => (
                    <div
                      className={
                        active[i]
                          ? "edu-accordion-item bg-active"
                          : "edu-accordion-item"
                      }
                    >
                      <div className="edu-accordion-header" id="headingOne123">
                        <button
                          className="edu-accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne123"
                          aria-expanded="true"
                          aria-controls="collapseOne123"
                          onClick={() => activeHandler(i)}
                        >
                          {v.title}
                        </button>
                      </div>
                      {active[i] && (
                        <div
                          className={
                            active[i]
                              ? "accordion-collapse collapse show"
                              : "accordion-collapse collapse"
                          }
                        >
                          <div className="edu-accordion-body">
                            <p>{v.description}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
