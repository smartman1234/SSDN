import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import MetaService from "../../Services/MetaServices/MetaService";

const EnqueryNow = React.lazy(() => import("../Home/EnqueryNow/EnqueryNow"));

const Subscriber = React.lazy(() => import("./Subscriber"));

export default function Footer() {
  const [active, setActive] = useState(false);
  const [menu1, setMenu1] = useState([]);
  const [menu2, setMenu2] = useState([]);
  const [menu3, setMenu3] = useState([]);
  const [menu4, setMenu4] = useState([]);
  const [follow, setFollow] = useState([]);
  const [trendingMenu, setTrendingMenu] = useState([]);
  const [date, setDate] = useState(new Date().getFullYear());
  const [footer, setFooter] = useState({});
  useEffect(() => {
    window.scrollTo(0, 0);
    getPageBlock();
  }, []);
  const metaService = new MetaService();

  const upArrowHandler = () => {
    window.scroll(0, 0);
  };
  const getPageBlock = async () => {
    try {
      let response = await metaService.service("footer");
      if (response.status === "success") {
        setFooter(response.data);
        setMenu1(JSON.parse(response.data?.page_description?.menu_1 || "[]"));
        setMenu2(JSON.parse(response.data?.page_description?.menu_2 || "[]"));
        setMenu3(JSON.parse(response.data?.page_description?.menu_3 || "[]"));
        setMenu4(JSON.parse(response.data?.page_description?.menu_4 || "[]"));
        setFollow(JSON.parse(response.data?.page_description?.follow || "[]"));

        setTrendingMenu(
          JSON.parse(response.data?.page_description?.trending_menu || "[]")
        );
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <>
      <footer className="eduvibe-footer-one edu-footer footer-style-default footer-top">
        <div className="container eduvibe-animated-shape">
          <div className="row align-items-center mb-5">
            <div className="col-md-3">
              <div className="edu-footer-widget">
                <div className="logo">
                  <Link to="/" aria-label="logo">
                    <LazyLoadImage
                      className="logo-light"
                      src={
                        `${footer?.page_description?.image_url}` +
                        `${footer?.page_description?.logo}`
                      }
                      height="86px"
                      width="258px"
                      alt="Site Logo"
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div
                className="edu-footer-widget ssdn-editor-font1"
                dangerouslySetInnerHTML={{
                  __html: footer?.page_description?.footer_description,
                }}
              ></div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="edu-footer-widget explore-widget">
                <h5 className="widget-title">
                  {footer?.page_description?.menu_1_title}
                </h5>
                <div className="footer-link link-hover">
                  {menu1.length > 0 &&
                    menu1.map((v, i) => (
                      <Link to={v.link} key={i}>
                        <i className="icon-Double-arrow"></i>
                        {v.title}
                      </Link>
                    ))}
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="edu-footer-widget explore-widget">
                <h5 className="widget-title">
                  {footer?.page_description?.menu_2_title}
                </h5>
                <div className="footer-link link-hover">
                  {menu2.length > 0 &&
                    menu2.map((v, i) => (
                      <Link to={v.link} key={i}>
                        <i className="icon-Double-arrow"></i>
                        {v.title}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="edu-footer-widget explore-widget">
                <h5 className="widget-title">
                  {footer?.page_description?.menu_3_title}
                </h5>
                <div className="footer-link link-hover">
                  {menu3.length > 0 &&
                    menu3.map((v, i) => (
                      <Link to={v.link} key={i}>
                        <i className="icon-Double-arrow"></i>
                        {v.title}
                      </Link>
                    ))}
                </div>
              </div>
            </div>

            <div className="col-lg-2 col-md-6 col-sm-6">
              <div className="edu-footer-widget explore-widget">
                <h5 className="widget-title">
                  {footer?.page_description?.menu_4_title}
                </h5>
                <div className="footer-link link-hover">
                  {menu4.length > 0 &&
                    menu4.map((v, i) => (
                      <Link to={v.link} key={i}>
                        <i className="icon-Double-arrow"></i>
                        {v.title}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <footer
        className="eduvibe-footer-one edu-footer footer-style-default footer-top"
        style={{ background: "#061c30" }}
      >
        <div className="container eduvibe-animated-shape">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="edu-footer-widget explore-widget">
                <h5 className="widget-title">FOLLOW US</h5>
                <div className="social-share">
                  {follow.length > 0 &&
                    follow.map((v, i) => (
                      <a href={v.link} key={i} aria-label="Socail Media Link">
                        <i className={`icon-${v.icon}`}></i>
                      </a>
                    ))}
                </div>
              </div>
            </div>

            <React.Suspense fallback="">
              <Subscriber />
            </React.Suspense>

            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="edu-footer-widget explore-widget">
                <h5 className="widget-title text-center">
                  WE ACCEPT ONLINE PAYMENTS
                </h5>
                <div className="footer-icon1 text-center">
                  <LazyLoadImage
                    src={
                      `${footer?.page_description?.image_url}` +
                      `${footer?.page_description?.payment_1}`
                    }
                    height="27px"
                    width="27px"
                    alt="pe"
                  />
                  <LazyLoadImage
                    src={
                      `${footer?.page_description?.image_url}` +
                      `${footer?.page_description?.payment_2}`
                    }
                    height="27px"
                    width="27px"
                    alt="gpay"
                  />
                  <LazyLoadImage
                    src={
                      `${footer?.page_description?.image_url}` +
                      `${footer?.page_description?.payment_3}`
                    }
                    height="27px"
                    width="27px"
                    alt="paytm"
                  />
                  <LazyLoadImage
                    src={
                      `${footer?.page_description?.image_url}` +
                      `${footer?.page_description?.payment_4}`
                    }
                    height="27px"
                    width="27px"
                    alt="visa"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="shape-dot-wrapper shape-wrapper d-md-block d-none">
            <div className="shape-image shape-image-1">
              <LazyLoadImage
                src="/assets/images/shapes/shape-21-01.png"
                alt="Shape Thumb"
                height="100%"
                width="100%"
              />
            </div>
            <div className="shape-image shape-image-2">
              <LazyLoadImage
                src="/assets/images/shapes/shape-35.png"
                alt="Shape Thumb"
                height="100%"
                width="100%"
              />
            </div>
          </div>
        </div>
      </footer>

      <footer className="eduvibe-footer-one edu-footer footer-style-default footer-top">
        <div className="container eduvibe-animated-shape">
          <div className="row">
            {trendingMenu.length > 1 &&
              trendingMenu.map((v, i) => (
                <div className="col-lg-12 mb-5" key={i}>
                  <div className="edu-footer-widget explore-widget">
                    <h5 className="widget-title">{v.heading}</h5>
                    <div className="footer-new-all-course-list">
                      {v.detail?.length > 0 &&
                        v.detail.map((v, i) => (
                          <React.Fragment key={i}>
                            {" "}
                            <Link to={v.link} title={v.title} key={i}>
                              {v.title}
                            </Link>{" "}
                            |
                          </React.Fragment>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="shape-dot-wrapper shape-wrapper d-md-block d-none">
            <div className="shape-image shape-image-1">
              <LazyLoadImage
                src="/assets/images/shapes/shape-21-01.png"
                alt="Shape Thumb"
                height="100%"
                width="100%"
              />
            </div>
            <div className="shape-image shape-image-2">
              <LazyLoadImage
                src="/assets/images/shapes/shape-35.png"
                alt="Shape Thumb"
                height="100%"
                width="100%"
              />
            </div>
          </div>
        </div>
        <div className="copyright-area copyright-default">
          <div className="container">
            <div className="row">
              <p className="text-center">
                Copyright {date} | Designed By
                <Link to="#" className="text-primary">
                  {" "}
                  Ezdat Technology Pvt. Ltd.{" "}
                </Link>
                . All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
      <div className="rn-progress-parent" onClick={upArrowHandler}></div>
      <div className="enquiery-now-button">
        <button className="edu-btn btn-small" onClick={() => setActive(true)}>
          Enquiry Now
        </button>
      </div>
      {active ? (
        <React.Suspense fallback="">
          <EnqueryNow active={active} setActive={setActive} />
        </React.Suspense>
      ) : null}
    </>
  );
}
