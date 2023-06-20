import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import LetUsHelp from "../Home/LetUsHelp/LetUsHelp";
import EventService from "../../Services/EventService/EventService";
import Utils from "../../Utils/Utils";
import moment from "moment";
import { CartContext } from "../../Container/Context";

const RelatedEvents = React.lazy(() => import("./RelatedEvents"));
const RegisterEvent = React.lazy(() => import("./RegisterEvent"));

export default function Testimonials() {
  const { bannery } = useContext(CartContext);
  const [banner, setBannerImage] = bannery;
  const [eventdetail, setEventDetail] = useState({});
  const [id, setId] = useState("");
  const serve = new EventService();
  const params = useParams();
  useEffect(() => {
    window.scroll(0, 0);
    EventDetailApi();
  }, [id]);
  const EventDetailApi = async () => {
    try {
      let response = await serve.eventdetail(params.id);
      if (response.status === "success") {
        setEventDetail(response.data);
      }
    } catch (err) {
      throw err;
    }
  };

  const gettingSlugFromRelatedEvents = (id) => {
    setId(id);
  };

  var today = new Date();

  today = moment(today).format("ll");

  return (
    <>
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
                    {Utils.titleCase(eventdetail.heading)}
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
                      <Link to="/event">Event</Link>
                    </li>
                    <li className="separator">
                      <i className="ri-arrow-drop-right-line"></i>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      <Link to={`/event-details/${eventdetail.slug}`}>
                        {" "}
                        {Utils.titleCase(eventdetail.title)}
                      </Link>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="edu-event-details-area edu-event-details edu-section-gap bg-color-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="content content-blog-top">
                <h3 className="title">{Utils.titleCase(eventdetail.title)}</h3>
                <ul className="blog-meta data">
                  <li className="ml--0">
                    <i className="icon-calendar-2-line"></i>
                    {moment(eventdetail.date).format("ll")}
                  </li>
                  <li>
                    {" "}
                    {eventdetail.price_type === "free" ? (
                      "Free"
                    ) : (
                      <>
                        {" "}
                        {eventdetail.currency_symbol}{" "}
                        {eventdetail.payable_price}
                      </>
                    )}
                  </li>
                  <li>
                    <i className="icon-time-line"></i>{" "}
                    {moment(
                      eventdetail.date + " " + eventdetail.start_time
                    ).format("LT")}
                    -{" "}
                    {moment(
                      eventdetail.date + " " + eventdetail.end_time
                    ).format("LT")}
                  </li>
                  <li>
                    <i className="icon-user-line"></i>
                    {Utils.titleCase(eventdetail.presenter_name)}
                  </li>
                  <li>
                    <i className="icon-map-pin-line"></i>
                    {Utils.titleCase(eventdetail.location)}
                  </li>
                </ul>
                <div
                  dangerouslySetInnerHTML={{ __html: eventdetail.description }}
                />
              </div>
            </div>
            {today < moment(eventdetail.date).format("ll") ? (
               <React.Suspense fallback="">
              <RegisterEvent data={eventdetail} />
             </React.Suspense>
              
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      <React.Suspense fallback="">
        <RelatedEvents
          RelatedEvents={eventdetail.related_events}
          gettingSlugFromRelatedEvents={gettingSlugFromRelatedEvents}
        />
      </React.Suspense>

      <LetUsHelp />
    </>
  );
}
