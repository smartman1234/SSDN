import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from "../SEO/SEO";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import MetaService from "../../Services/MetaServices/MetaService";
import LetUsHelp from "../Home/LetUsHelp/LetUsHelp";
import HeadingName from "../HeadingName/HeadingName";

const Recruiters = React.lazy(() => import("./Recruiters"));

const Recentplacement = React.lazy(() => import("./Recentplacement"));

const UpcomingJobs = React.lazy(() => import("./UpcomingJobs"));

export default function Placement() {
  const metaService = new MetaService();
  const [data, setData] = useState({});
  const [meta, setMeta] = useState({
    title: "",
    keywords: "",
    description: "",
    breacrumb: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    getmetaData("placement");
    getPageBlock("placement");
  }, []);

  const getmetaData = async () => {
    try {
      let response = await metaService.service("placement");
      if (response.status === "success") {
        setData(response.data);
      }
    } catch (err) {
      throw err;
    }
  };
  const getPageBlock = async () => {
    try {
      let response = await metaService.getMetadetail("placement");
      if (response.status === "success") {
        setMeta({
          title: response.data.meta_title,
          Keywords: response.data.meta_keywords,
          description: response.data.meta_description,
          breacrumb: response.data.breadcrumb,
        });
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <>
      <SEO
        meta_title={meta?.title}
        meta_description={meta?.description}
        meta_keyword={meta?.Keywords}
        breacrumb={meta?.breacrumb}
      />
      <HeadingName
                name="Placement"
                home="Home"
                heading="Placement"
            />
      <div className="eduvibe-about-three-mission edu-mission-vision-area edu-section-gap border-bottom-1 bg-color-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="our-mission">
                <div className="section-title text-start">
                  <p
                    className=" mb--0"
                    dangerouslySetInnerHTML={{
                      __html: data?.block_description,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="eduvibe-about-three-mission edu-mission-vision-area edu-section-gap bg-color-white">
        <div className="wrapper">
          <div className="container eduvibe-animated-shape">
            <div className="row align-items-center">
              <div className="col-lg-12">
                <div className="section-title text-center">
                  <span className="pre-title">
                    {data.page_description?.journey_process_title}
                  </span>
                  <h3 className="title">
                    {" "}
                    {data.page_description?.traning_placement_title}
                  </h3>
                </div>
              </div>
            </div>
            <div className="row mt--30">
              <div className="col-lg-12">
                <div className="edu-blog blog-type-2 bg-white radius-small">
                  <div className="inner">
                    <div className="text-center">
                       <LazyLoadImage
                        src={
                          data.page_description?.image_url +
                          data.page_description?.traning_placement_image
                        }
                        height="100%"
                        width="100%"
                        alt="placement process work"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="counterup-style-2 bg-color-primary radius-small pt-5 pb-5">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6 line-separator">
              <div className="edu-counterup-2 text-center">
                <div className="inner">
                  <div className="icon">
                    <i className="icon-Bag"></i>
                  </div>
                  <div className="content">
                    <h3 className="counter">
                      <span
                        className="odometer odometer-auto-theme"
                      >
                        <div className="odometer-inside">
                          <span className="odometer-digit">
                            <span className="odometer-digit-spacer">
                              {data.page_description?.counter_1_number}
                            </span>
                          </span>
                        </div>
                      </span>
                    </h3>
                    <span className="subtitle">
                      {data.page_description?.counter_1_title}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 line-separator">
              <div className="edu-counterup-2 text-center">
                <div className="inner">
                  <div className="icon">
                    <i className="icon-trophy"></i>
                  </div>
                  <div className="content">
                    <h3 className="counter">
                      <span
                        className="odometer odometer-auto-theme"
                      >
                        <div className="odometer-inside">
                          <span className="odometer-digit">
                            <span className="odometer-digit-spacer">
                              {data.page_description?.counter_2_number}
                            </span>
                          </span>
                        </div>
                      </span>
                    </h3>
                    <span className="subtitle">
                      {data.page_description?.counter_2_title}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 line-separator">
              <div className="edu-counterup-2 text-center">
                <div className="inner">
                  <div className="icon">
                    <i className="icon-Open-book"></i>
                  </div>
                  <div className="content">
                    <h3 className="counter">
                      <span
                        className="odometer odometer-auto-theme"
                      >
                        <div className="odometer-inside">
                          <span className="odometer-digit">
                            <span className="odometer-digit-spacer">
                              {data.page_description?.counter_3_number}
                            </span>
                          </span>
                        </div>
                      </span>
                    </h3>
                    <span className="subtitle">
                      {data.page_description?.counter_3_title}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 line-separator">
              <div className="edu-counterup-2 text-center">
                <div className="inner">
                  <div className="icon">
                    <i className="icon-presentation"></i>
                  </div>
                  <div className="content">
                    <h3 className="counter">
                      <span
                        className="odometer odometer-auto-theme"
                      >
                        <div className="odometer-inside">
                          <span className="odometer-digit">
                            <span className="odometer-digit-spacer">
                              {data.page_description?.counter_4_number}
                            </span>
                          </span>
                        </div>
                      </span>
                    </h3>
                    <span className="subtitle">
                      {data.page_description?.counter_4_title}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <React.Suspense fallback="">
      <Recentplacement data={data} />
      </React.Suspense>

      <React.Suspense fallback="">
      <Recruiters />
      </React.Suspense>
     
    
      <div className="edu-contact-us-area eduvibe-contact-us edu-section-gap eduvibe-home-two-blog">
        <div className="container eduvibe-animated-shape">
          <div className="col-lg-12">
            <div className="section-title text-center">
              <h3 className="title">
                {data.page_description?.why_hired_title}
              </h3>
            </div>
          </div>
          <div className="row mt--20">
            <div className="col-lg-3 col-md-6">
              <div
                className="service-card service-card-2 card-bg-1"
                style={{ height: "270px" }}
              >
                <div className="inner">
                  <div className="icon">
                    <Link to="#">
                       <LazyLoadImage
                        src="/assets/images/icons/offer-icon-01.png"
                        alt="Service Images"
                        height="40px"
                        width="40px"
                      />
                    </Link>
                    <div className="shape-list">
                       <LazyLoadImage
                        className="shape shape-1"
                        src="/assets/images/icons/service-icon-01.png"
                        alt="Shape Images"
                        height="9px"
                        width="8px"
                      />
                       <LazyLoadImage
                        className="shape shape-2"
                        src="/assets/images/icons/service-icon-02.png"
                        alt="Shape Images"
                        height="9px"
                        width="8px"
                      />
                       <LazyLoadImage
                        className="shape shape-3"
                        src="/assets/images/icons/service-icon-03.png"
                        alt="Shape Images"
                        height="9px"
                        width="8px"
                      />
                    </div>
                  </div>
                  <div className="content">
                    <h6 className="title">
                      <Link to="#">{data.page_description?.card_1_title}</Link>
                    </h6>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: data.page_description?.card_1_description,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div
                className="service-card service-card-2 card-bg-2"
                style={{ height: "270px" }}
              >
                <div className="inner">
                  <div className="icon">
                    <Link to="#">
                       <LazyLoadImage
                        src="/assets/images/icons/offer-icon-02.png"
                        alt="Service Images"
                        height="40px"
                        width="40px"
                      />
                    </Link>
                    <div className="shape-list">
                       <LazyLoadImage
                        className="shape shape-1"
                        src="/assets/images/icons/service-icon-01.png"
                        alt="Shape Images"
                        height="9px"
                        width="8px"
                      />
                       <LazyLoadImage
                        className="shape shape-2"
                        src="/assets/images/icons/service-icon-02.png"
                        alt="Shape Images"
                        height="9px"
                        width="8px"
                      />
                       <LazyLoadImage
                        className="shape shape-3"
                        src="/assets/images/icons/service-icon-03.png"
                        alt="Shape Images"
                        height="9px"
                        width="8px"
                      />
                    </div>
                  </div>
                  <div className="content">
                    <h6 className="title">
                      <Link to="#">
                        {" "}
                        <Link to="#">
                          {data.page_description?.card_2_title}
                        </Link>
                      </Link>
                    </h6>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: data.page_description?.card_2_description,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div
                className="service-card service-card-2 card-bg-1"
                style={{ height: "270px" }}
              >
                <div className="inner">
                  <div className="icon">
                    <Link to="#">
                       <LazyLoadImage
                        src="/assets/images/icons/offer-icon-03.png"
                        alt="Service Images"
                        height="40px"
                        width="40px"
                      />
                    </Link>
                    <div className="shape-list">
                       <LazyLoadImage
                        className="shape shape-1"
                        src="/assets/images/icons/service-icon-01.png"
                        alt="Shape Images"
                        height="9px"
                        width="8px"
                      />
                       <LazyLoadImage
                        className="shape shape-2"
                        src="/assets/images/icons/service-icon-02.png"
                        alt="Shape Images"
                        height="9px"
                        width="8px"
                      />
                       <LazyLoadImage
                        className="shape shape-3"
                        src="/assets/images/icons/service-icon-03.png"
                        alt="Shape Images"
                        height="9px"
                        width="8px"
                      />
                    </div>
                  </div>
                  <div className="content">
                    <h6 className="title">
                      <Link to="#">
                        {" "}
                        <Link to="#">
                          {data.page_description?.card_3_title}
                        </Link>
                      </Link>
                    </h6>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: data.page_description?.card_3_description,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div
                className="service-card service-card-2 card-bg-4"
                style={{ height: "270px" }}
              >
                <div className="inner">
                  <div className="icon">
                    <Link to="#">
                       <LazyLoadImage
                        src="/assets/images/icons/offer-icon-04.png"
                        alt="Service Images"
                        height="40px"
                        width="40px"
                      />
                    </Link>
                    <div className="shape-list">
                       <LazyLoadImage
                        className="shape shape-1"
                        src="/assets/images/icons/service-icon-01.png"
                        alt="Shape Images"
                        height="9px"
                        width="8px"
                      />
                       <LazyLoadImage
                        className="shape shape-2"
                        src="/assets/images/icons/service-icon-02.png"
                        alt="Shape Images"
                        height="9px"
                        width="8px"
                      />
                       <LazyLoadImage
                        className="shape shape-3"
                        src="/assets/images/icons/service-icon-03.png"
                        alt="Shape Images"
                        height="9px"
                        width="8px"
                      />
                    </div>
                  </div>
                  <div className="content">
                    <h6 className="title">
                      <Link to="#">
                        {" "}
                        <Link to="#">
                          {data.page_description?.card_4_title}
                        </Link>
                      </Link>
                    </h6>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: data.page_description?.card_4_description,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
            <div
              className="shape-image scene shape-image-1"
              style={{
                transform: "translate3d(0px, 0px, 0px) rotate(0.0001deg)",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                pointerEvents: "none",
              }}
            >
              <span
                data-depth="-2.2"
                style={{
                  transform: "translate3d(-7.5px, 15.4px, 0px)",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  position: "relative",
                  display: "block",
                  left: "0px",
                  top: "0px",
                }}
              >
                 <LazyLoadImage
                  src="/assets\images\shapes\shape-04-01.png"
                  alt="Shape Thumb"
                  height="116px"
                  width="87px"
                />
              </span>
            </div>
            <div className="shape-image shape-image-2">
               <LazyLoadImage
                src="assets\images\shapes\shape-02-08.png"
                alt="Shape Thumb"
                height="100%"
                width="100%"
              />
            </div>
            <div className="shape-image shape-image-3">
               <LazyLoadImage
                src="/assets\images\shapes\shape-15.png"
                alt="Shape Thumb"
                height="100%"
                width="100%"
              />
            </div>
          </div>
        </div>
      </div>
      <React.Suspense fallback="">
        <UpcomingJobs />
      </React.Suspense>
      <LetUsHelp />
    </>
  );
}
