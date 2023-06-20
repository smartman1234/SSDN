import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import Utils from "../../Utils/Utils";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function RecentEvents({ recentEventList }) {
  return (
    <div className="row">
      {recentEventList?.length &&
        recentEventList.map((v, i) => (
          <div className="col-md-6 mb--30" key={i}>
            <div className="edu-card card-type-3 radius">
              <div className="inner">
                <div className="thumbnail1">
                  <Link to={`/event/${v.slug}`}>
                    <LazyLoadImage
                      src={v.image}
                      alt={v.image_alt_tag}
                      height="100%"
                      width="100%"
                    />
                  </Link>
                </div>
                <div className="content">
                  <h6 className="title">
                    <Link to={`/event/${v.slug}`}>
                      {Utils.titleCase(v.title)}
                    </Link>
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
                  <div className="card-bottom">
                    {v.price_type === "free" ? (
                      <div className="price-list price-style-02">
                        <div className="price current-price">Free</div>
                      </div>
                    ) : (
                      <div className="price-list price-style-02">
                        <div className="price current-price">
                          {v.currency_symbol} {v.payable_price}
                        </div>
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
        ))}
    </div>
  );
}
