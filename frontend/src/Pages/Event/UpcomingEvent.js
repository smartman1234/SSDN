import React from "react";
import { useState, useEffect } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from "react-router-dom";
import EventService from "../../Services/EventService/EventService";
import Utils from "../../Utils/Utils";
import moment from "moment";

export default function UpcomingEvent() {
    const [event, setEvent] = useState([]);
    const serve = new EventService();
    const [search, setSearch] = useState({
        start: 0,
        perPage: 3,
    });

    const apiCall = async (activity) => {
        try {
            let response = await serve.eventlist(activity);
            if (response.status === "success") {
                setEvent(response.data);
            }
        } catch (err) {
            throw err;
        }
    };
    useEffect(() => {
        EventListApi();
    }, []);

    const EventListApi = async () => {
        let activity = {
            limit: search?.perPage,
            offset: search?.start,
            type: "upcoming",
        };
        await apiCall(activity);
    };

    return (
        <div className="edu-event-grid-area edu-section-gap bg-color-white">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title text-center">
                            <h3 className="title">Upcoming Events</h3>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="row">
                            {event?.length > 0 ? (
                                event.map((v, i) => (
                                    <div className="col-md-4" key={i}>
                                        <div className="edu-card card-type-3 radius">
                                            <div className="inner">
                                                <div className="thumbnail1">
                                                    <Link to={`/event/${v.slug}`}>
                                                         <LazyLoadImage loading="lazy" src={v.image} alt={v.image_alt_tag}
                                                            height="100%"
                                                            width="100%" />
                                                    </Link>
                                                </div>
                                                <div className="content">
                                                    <h6 className="title">
                                                        <Link to={`/event/${v.slug}`}>
                                                            {Utils.titleCase(v.title)}
                                                        </Link>
                                                    </h6>
                                                    <div className="card-bottom pb--10">
                                                        <p className="mb-0">
                                                            <i className="icon-calendar-2-line me-2"></i>
                                                            {moment(v.date).format("ll")}
                                                        </p>
                                                        <p className="mb-0">
                                                            <i className="icon-time-line me-2"></i>
                                                            {moment(v.date + " " + v.start_time).format(
                                                                "LT"
                                                            )}
                                                            -{" "}
                                                            {moment(v.date + " " + v.end_time).format("LT")}
                                                        </p>
                                                    </div>
                                                    <div className="card-bottom pb--10">
                                                        <div className="read-more-btn leading-tight1">
                                                            <i className="icon-map-pin-line"></i>{" "}
                                                            {Utils.titleCase(v.location)}
                                                        </div>
                                                    </div>
                                                    <div className="card-bottom">
                                                        {v.price_type === "free" ? (
                                                            <div className="price current-price">Free</div>
                                                        ) : (
                                                            <div className="">
                                                                {v.currency_symbol} {v.payable_price}
                                                                {v.is_inr_discount == 1 && (
                                                                    <div className="price old-price">
                                                                        {v.currency_symbol}
                                                                        {v.inr_price}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}

                                                        <Link
                                                            className="btn-transparent"
                                                            to={`/event/${v.slug}`} rel="nofollow"
                                                        >
                                                            Read More
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="d-flex justify-content-center">
                                    No Upcoming Event Available !
                                </div>
                            )}

                        </div>

                        <div className="row mt--40">
                            <div className="col-lg-12">
                                <div className="load-more-btn text-center">
                                    <Link className="edu-btn" to="/event-all">
                                        View All Event
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
