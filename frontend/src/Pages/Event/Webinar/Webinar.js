import React from "react";
import { useEffect } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useState } from "react";
import { Link } from "react-router-dom";
import EventService from "../../../Services/EventService/EventService";
import Utils from "../../../Utils/Utils";
import moment from "moment";

const WebinarRegister = React.lazy(() => import("./WebinarRegister"));

export default function Webinar() {
  const serve = new EventService();
  const [list, setList] = useState([]);
  const [activeForm, setActiveForm] = useState({});
  const [active, setActive] = useState({});


  useEffect(() => {
    upcomimgWebinarApi();
  }, []);
  const upcomimgWebinarApi = async () => {
    try {
      let response = await serve.webinarlist();
      if (response) {
        setList(response.data);
      }
    } catch (err) {
      throw err;
    }
  };
  const activeHandler = (id) => {
    setActive((prev) => ({ [id]: !prev[id] }));
  };

  return (
    <div className="du-service-area service-wrapper-1 edu-section-gap bg-image home-one-cat">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title text-center">
              <h3 className="title">Upcoming Webinar</h3>
            </div>
          </div>
          <div className="edu-accordion-02" id="accordionExample1">
            {list?.length > 0 ?
              list.map((v, i) => (
                <div className="edu-accordion-item bg-active" key={i}>
                  <div className="edu-accordion-header" id="headingOne">
                    <button
                      className="edu-accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                      onClick={() => activeHandler(v.id)}
                    >
                      <div className="panel-heading">
                        <div className="heading_block">
                          <h3>{Utils.titleCase(v.title)}</h3>
                        </div>
                        <div className="date_register_block">
                          <div className="date_block">
                            <span className="date">
                              <i className="icon-calender"></i>
                              <span>{moment(v.date).format("Do MMM YY")}</span>
                            </span>
                            <span className="time">
                              {moment(v.date + " " + v.time).format("LT")}
                            </span>
                          </div>
                          <div
                            className="read-more-btn"
                          >
                            <Link className="edu-btn btn-dark" to="#">
                              Register Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                  {active[v.id] && (
                    <div
                      id="collapseOne"
                      className={
                        active[v.id]
                          ? "accordion-collapse collapse show"
                          : "accordion-collapse collapse"
                      }
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample1"
                    >
                      <div className="edu-accordion-body">
                        <div className="edu-event event-list radius-small">
                          <div className="row">
                            <div className="col-md-7">
                              <div
                                className="content-left width-button-wrapper data-webinar-rap1"
                                dangerouslySetInnerHTML={{
                                  __html: v.description,
                                }}
                              ></div>
                            </div>
                            <React.Suspense fallback="Loading...">
                            <WebinarRegister
                                activeForm={activeForm}
                                setActiveForm={setActiveForm}
                                id={v.id}
                              />
            </React.Suspense>
                             
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )): <div className="d-flex justify-content-center">
              No Upcoming Webinar Available !
            </div>}
          </div>
        </div>
        <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
          <div className="shape-image shape-image-1">
             <LazyLoadImage
              src="/assets/images/shapes/shape-03-01.png"
              alt="Shape Thumb"
              height="100%"
              width="100%"
            />
          </div>
          <div className="shape-image shape-image-3">
             <LazyLoadImage
              src="/assets/images/shapes/shape-04-01.png"
              alt="Shape Thumb"
              height="116px"
              width="87px"
            />
          </div>
          <div className="shape-image shape-image-4">
             <LazyLoadImage
              src="/assets/images/shapes/shape-03-02.png"
              alt="Shape Thumb"
              height="100%"
              width="100%"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
