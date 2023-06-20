import React, { useState } from "react";
const EnqueryNow = React.lazy(() => import("../EnqueryNow/EnqueryNow"));
export default function BannerSection({ data }) {
  const [active, setActive] = useState(false);
  return (
    <>
      <div
        className="banner-style-1 bg-image height-940 d-flex align-items-end"
        style={{
          backgroundImage: `url(${
            data?.page_description?.image_url +
            data?.page_description?.banner_image
          })`,
        }}
      >
        <div className="container eduvibe-animated-shape">
          <div className="row align-items-end">
            <div className="col-lg-12 col-xl-6 mb-5">
              <span className="pre-title">
                {data?.page_description?.banner_title_1}
              </span>
              <h1 className="title">{data.page_description?.banner_title_2}</h1>
              <p
                className="description "
                dangerouslySetInnerHTML={{
                  __html: data?.page_description?.banner_description,
                }}
              />

              <button className="edu-btn" onClick={() => setActive(true)}>
                Get Started Today
              </button>
            </div>
          </div>
          <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
            <div className="shape shape-3">
              <img
                srcSet="/assets/images/shapes/bulb.png 480w, /assets/images/shapes/bulb.png 800w"
                alt="Shape Thumb"
                src="/assets/images/shapes/bulb.png"
                sizes="(min-width: 600px) 480px,800px"
              />
            </div>
            <div className="shape shape-2">
              <img
                srcSet="/assets/images/shapes/pen.png 480w, /assets/images/shapes/pen.png 800w"
                alt="Shape Thumb"
                src="/assets/images/shapes/pen.png"
                sizes="(min-width: 600px) 480px,800px"
              />
            </div>
            <div className="shape shape-4">
              <img
                srcSet="/assets/images/shapes/hand.png 480w, /assets/images/shapes/hand.png 800w"
                alt="Shape Thumb"
                src="/assets/images/shapes/hand.png"
                sizes="(min-width: 600px) 480px,800px"
              />
            </div>
          </div>
        </div>
      </div>
      {active ? (
        <React.Suspense fallback="">
          <EnqueryNow active={active} setActive={setActive} />
        </React.Suspense>
      ) : (
        ""
      )}
    </>
  );
}
