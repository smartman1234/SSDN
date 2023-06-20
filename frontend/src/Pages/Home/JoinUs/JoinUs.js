import React, { useState } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
const EnqueryNow = React.lazy(() => import("../EnqueryNow/EnqueryNow"));

export default function JoinUs({ data }) {
  const [active, setActive] = useState({});
  return (
    <div className="home-one-cat edu-service-area service-wrapper-1 edu-section-gap bg-image">
      <div className="container eduvibe-animated-shape">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title text-center">
              <span className="pre-title">
                {data?.page_description?.get_in_touch_title}
              </span>
              <h3 className="title">
                {data?.page_description?.suitable_title}
              </h3>
            </div>
          </div>
        </div>
        <div className="row mt--30">
          <div className="col-xl-6">
            <div className="tp-suit mb--30 position-relative">
              <h4 className="tp-suit__title">
                {data?.page_description?.suitable_card_1_title}
              </h4>
              <div className="row mt--30">
                <div className="col-xl-6">
                  <p
                    dangerouslySetInnerHTML={{
                      __html:
                        data?.page_description?.suitable_card_1_description,
                    }}
                  />
                </div>
                <div className="col-xl-6">
                  <div className="tp-suit__img">
                     <LazyLoadImage
                      loading="lazy"
                      src="/assets/images/imgpsh_fullsize_anim.jpeg"
                      alt="suitable-img"
                      height="100%"
                      width="100%"
                    />
                  </div>
                </div>
              </div>
              <div className="tp-suit__btn mt-3 text-center">
                <button
                  className="edu-btn"
                  style={{ height: "40px", lineHeight: "40px" }}
                  onClick={() => setActive({ [1]: true })}
                >
                  Join Now
                </button>
              </div>
              {active[1] ? (
                <React.Suspense fallback="">
                  <EnqueryNow active={active} setActive={setActive} />
                </React.Suspense>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-xl-6">
            <div className="tp-suit mb--30 position-relative">
              <h4 className="tp-suit__title">
                {data?.page_description?.suitable_card_2_title}
              </h4>
              <div className="row mt--30">
                <div className="col-xl-6">
                  <p
                    dangerouslySetInnerHTML={{
                      __html:
                        data?.page_description?.suitable_card_2_description,
                    }}
                  />
                </div>
                <div className="col-xl-6">
                  <div className="tp-suit__img">
                     <LazyLoadImage
                      src="/assets/images/student.png"
                      alt="suitable-img"
                      height="100%"
                      width="100%"
                    />
                  </div>
                </div>
                <div className="tp-suit__btn mt-3 text-center">
                  <button
                    className="edu-btn"
                    style={{ height: "40px", lineHeight: "40px" }}
                    onClick={() => setActive({ [2]: true })}
                  >
                    Join Now
                  </button>
                </div>{" "}
                {active[2] ? (
                <React.Suspense fallback="">
                  <EnqueryNow active={active} setActive={setActive} />
                </React.Suspense>
              ) : (
                ""
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
