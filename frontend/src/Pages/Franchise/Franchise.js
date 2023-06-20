import React, { useEffect, useState } from "react";
import LetUsHelp from "../Home/LetUsHelp/LetUsHelp";
import MetaService from "../../Services/MetaServices/MetaService";
import SEO from "../SEO/SEO";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import YoutubePopup from "../Course/YoutubePopup";
import HeadingName from "../HeadingName/HeadingName";

const PartnershipForm = React.lazy(() => import("./PartnershipForm"));

export default function Franchise() {
  const [activebutton, setActiveButton] = useState(false);
  const [data, setData] = useState({});
  const [detailData, setDetailData] = useState({});
  const [cards, setCards] = useState([]);
  const [faq, setFaq] = useState([]);
  const [meta, setMeta] = useState({});
  const [active, setActive] = useState({});

  const activeHandler = (id) => {
    setActive((prev) => ({ [id]: !prev[id] }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getPageBlock();
    getMetaDataDetail();
  }, []);
  const metaService = new MetaService();

  const getPageBlock = async () => {
    try {
      let response = await metaService.service("franchise");
      if (response.status === "success") {
        setData(response.data);
        setDetailData(response.data?.page_description);
        setFaq(JSON.parse(response.data?.page_description?.faqs || "[]"));
        setCards(
          JSON.parse(
            response.data?.page_description?.fastest_growing_card || "[]"
          )
        );
      }
    } catch (err) {
      throw err;
    }
  };
  const getMetaDataDetail = async () => {
    try {
      let response = await metaService.getMetadetail("franchise");
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
      {" "}
      <SEO
        meta_title={meta?.title}
        meta_description={meta?.description}
        meta_keyword={meta?.Keywords}
        breacrumb={meta?.breacrumb}
      />
      <HeadingName name="Franchise" home="Home" heading="Franchise" />
      <div className="edu-contact-us-area eduvibe-contact-us edu-section-gap bg-color-white">
        <div className="container eduvibe-animated-shape">
          <div className="col-lg-12">
            <div className="section-title text-center">
              <h3 className="title mb--10">{data.block_title}</h3>
              <p dangerouslySetInnerHTML={{ __html: data.block_description }} />
               <LazyLoadImage
                alt="Banner"
                src={detailData.image_url + detailData.business_image}
                height="100%"
                width="100%"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="home-three-about edu-about-area edu-section-gap home-one-cat">
        <div className="container eduvibe-animated-shape">
          <div className="card">
            <div className="card-body hover">
              <div className="row">
                <div className="col-lg-12">
                  <div
                    className="section-title text-center pb--10 mb--10"
                    style={{ borderBottom: "1px solid #EEEEEE" }}
                  >
                    <h3 className="title">{detailData.why_ssdn_title}</h3>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div
                    className="course-content mt--10"
                    dangerouslySetInnerHTML={{
                      __html: detailData.why_ssdn_description,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="edu-feature-area eduvibe-home-one-video edu-section-gap">
        <div className="container eduvibe-animated-shape">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="inner mt_md--40 mt_sm--40">
                <div className="section-title text-start">
                  <h3 className="title">{detailData.we_delvery_title}</h3>
                </div>
                <div className="row mt--30">
                  <div className="col-md-6 mt--30">
                    <div className="service-card service-card-2 card-bg-1">
                      <div className="inner">
                        <div className="icon">
                          <a href="#">
                             <LazyLoadImage
                              src="/assets/images/icons/offer-icon-01.png"
                              alt="Service Images"
                              height="40px"
                              width="40px"
                            />
                          </a>
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
                            <a href="#">{detailData.bussiness_type_1_title}</a>
                          </h6>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: detailData.bussiness_type_1_description,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mt--30">
                    <div className="service-card service-card-2 card-bg-2">
                      <div className="inner">
                        <div className="icon">
                          <a href="#">
                             <LazyLoadImage
                              src="/assets/images/icons/offer-icon-02.png"
                              alt="Service Images"
                              height="40px"
                              width="40px"
                            />
                          </a>
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
                            <a href="#">{detailData.bussiness_type_2_title}</a>
                          </h6>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: detailData.bussiness_type_2_description,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mt--30">
                    <div className="service-card service-card-2 card-bg-2">
                      <div className="inner">
                        <div className="icon">
                          <a href="#">
                             <LazyLoadImage
                              src="/assets/images/icons/offer-icon-03.png"
                              alt="Service Images"
                              height="40px"
                              width="40px"
                            />
                          </a>
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
                            <a href="#">{detailData.bussiness_type_3_title}</a>
                          </h6>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: detailData.bussiness_type_3_description,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mt--30">
                    <div className="service-card service-card-2 card-bg-1">
                      <div className="inner">
                        <div className="icon">
                          <a href="#">
                             <LazyLoadImage
                              src="/assets/images/icons/offer-icon-04.png"
                              alt="Service Images"
                              height="40px"
                              width="40px"
                            />
                          </a>
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
                            <a href="#">{detailData.bussiness_type_4_title}</a>
                          </h6>
                          <p                            dangerouslySetInnerHTML={{
                              __html: detailData.bussiness_type_4_description,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="feature-thumbnail">
                <div className="main-image video-popup-wrapper video-popup-two">
                   <LazyLoadImage
                    src={detailData.image_url + detailData.we_delvery_image}
                    alt="Choose Us Images"
                    height="100%"
                    width="100%"
                  />
                  <a
                    href="#"
                    onClick={() => setActiveButton(true)}
                    className="video-play-btn with-animation position-to-top btn-large video-popup-activation eduvibe-video-play-icon color-secondary"
                  >
                    <span className="play-icon"></span>
                  </a>
                  {activebutton ? (
                    <YoutubePopup
                      activebutton={activebutton}
                      setActiveButton={setActiveButton}
                      detailData={detailData}
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div className="circle-image">
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>

          <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
            <div className="shape-image shape-image-1">
               <LazyLoadImage loading="lazy" src="/assets/images/shapes/shape-14.png" alt="Shape Thumb"
                                height="100%"
                                width="100%" />
            </div>
            <div className="shape-image shape-image-2">
               <LazyLoadImage
                src="/assets/images/shapes/shape-11-01.png"
                alt="Shape Thumb"
                height="100%"
                width="100%"
              />
            </div>
            <div className="shape-image shape-image-3">
               <LazyLoadImage loading="lazy" src="/assets/images/shapes/shape-15.png" alt="Shape Thumb"
                                height="100%"
                                width="100%" />
            </div>
          </div>
        </div>
      </div>
      <div className="home-one-cat edu-service-area edu-section-gap bg-image">
        <div className="container eduvibe-animated-shape">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center">
                <h3 className="title">{detailData.fastest_growing_title}</h3>
              </div>
            </div>
            <div className="row mt--30">
              {cards?.length > 0 &&
                cards.map((v, i) => (
                  <div className="col-lg-6 mb--20" key={i}>
                    <div className="edu-blog blog-type-1 bg-white radius-small">
                      <div className="inner">
                        <div className="content data-color-base">
                          <h6 className="title mb--0">
                            <a href="#">{v.title}</a>
                          </h6>
                        </div>

                        <div
                          className="content1"
                          style={{ height: "300px", overflow: "auto" }}
                          dangerouslySetInnerHTML={{ __html: v.description }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <section className="bg-blue edu-section-gap">
        <div className="container eduvibe-animated-shape">
          <div className="row align-items-center">
            <div className="col-md-7">
              <div className="vc_column-inner vc_custom_1646389627102">
                <div className="wpb_wrapper">
                  <div className="call-action">
                    <h5 className="pix-badge-element">
                      <span className="badge text-white bg-orange">
                        Asia's Most Promising Brand
                      </span>
                    </h5>
                    <h5 className="pix-badge-element">
                      <a
                        href={`tel:+${detailData.partnership_call_us}`}
                        className="badge text-white"
                      >
                        Call Us: +91 {detailData.partnership_call_us}
                      </a>
                    </h5>
                  </div>
                  <div className="pix-sliding-headline mt--20">
                    <h6 className="text-white ">
                      {detailData.partnership_title}
                    </h6>
                  </div>
                  <p
                    className="text-white"
                    dangerouslySetInnerHTML={{
                      __html: detailData.partnership_description,
                    }}
                  />
                </div>
              </div>
            </div>
            <React.Suspense fallback="Loading...">
            <PartnershipForm />
             </React.Suspense>
           
          </div>
        </div>
      </section>
      <div className="edu-service-area edu-section-gap">
        <div className="container eduvibe-animated-shape">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center">
                <h3 className="title">Contact us</h3>
              </div>
            </div>
            <div className="col-lg-4 mt--30">
              <div className="contact-address-card-1 location">
                <div className="inner">
                  <div className="icon">
                    <i className="icon-phone-fill"></i>
                  </div>
                  <div className="content mt--20 mb--23">
                    <a href={`tel:+${detailData.contact_us_number}`}>
                      Call Us: +91 {detailData.contact_us_number}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mt--30">
              <div className="contact-address-card-1 location">
                <div className="inner">
                  <div className="icon">
                    <i className="icon-mail-open-line"></i>
                  </div>
                  <div className="content mt--20 mb--23">
                    <a href={`mailto:${detailData.contact_us_email}`}>
                      {detailData.contact_us_email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mt--30">
              <div className="contact-address-card-1 location">
                <div className="inner">
                  <div className="icon">
                    <i className="icon-map-pin-line"></i>
                  </div>
                  <div className="content mt--20">
                    <p>{detailData.contact_us_location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home-one-cat edu-service-area edu-section-gap bg-image">
        <div className="container eduvibe-animated-shape">
          <div className="card">
            <div className="card-body">
              <div className="section-title text-center mb--20">
                <h3 className="title">FAQ's</h3>
              </div>
              <div className="faqs-wrapper height-match-section3 ">
                <div className="edu-accordion-02" id="accordionExample5">
                  {faq.length > 0 &&
                    faq.map((v, i) => (
                      <div
                        className={
                          active[i]
                            ? "edu-accordion-item bg-active"
                            : "edu-accordion-item"
                        }
                        key={i}
                      >
                        <div className="edu-accordion-header">
                          <button
                            className="edu-accordion-button"
                            type="button"
                            onClick={() => activeHandler(i)}
                          >
                            {i + 1}.{" "}
                            {data
                              ? v.title.replaceAll("{{in VARCITY}}", data)
                              : v.title.replaceAll("{{in VARCITY}}", "")}
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
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: data
                                    ? v.description.replaceAll(
                                        "{{in VARCITY}}",
                                        data
                                      )
                                    : v.description.replaceAll(
                                        "{{in VARCITY}}",
                                        ""
                                      ),
                                }}
                              ></p>
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
      <LetUsHelp />
    </>
  );
}
