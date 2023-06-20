import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { CartContext } from "../../Container/Context";
import Currency from "../Currency/Currency";

import ExploreCourseCategory from "./ExploreCourseCategory";
import ExploreAssessmentCategory from "./ExploreAssessmentCategory";
import ExploreVoucherCategory from "./ExploreVoucherCategory";
import ExploreELearningCategory from "./ExploreELearningCategory";
import MetaService from "../../Services/MetaServices/MetaService";
import ExploreBlogsCategory from "./ExploreBlogsCategory";

const UserIcon = React.lazy(() => import("../UserIcon/UserIcon"));
export default function HomeHeader({ isActive, setActive }) {
  const metaService = new MetaService();
  const { numberInCart, search } = useContext(CartContext);
  const [SearchModal, setSearchModal] = search;
  const [data, setData] = useState([]);
  const [itemInCart, setItemInCart] = numberInCart;

  useEffect(() => {
    getPageBlockData();
  }, []);

  const getPageBlockData = async () => {
    try {
      let response = await metaService.service("website-menu");

      if (response.status === "success") {
        const arr = JSON.parse(response.data?.page_description?.menu || "[]");
        setData(arr);
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <div className="row align-items-center">
        <div className="col-lg-2 col-xl-2 col-md-6 col-6 logo">
          <Link to="/">
            <img
              srcSet="/assets/images/logo/ssdn-new-logo.png 480w, /assets/images/logo/ssdn-new-logo.png 800w"
              alt="Site Logo"
              src="/assets/images/logo/ssdn-new-logo.png"
              sizes="(max-width: 600px) 480px,800px"
            />
          </Link>
        </div>
        <div className="col-lg-2 col-xl-2 col-md-6 col-6 d-none d-lg-block">
          <nav className="mainmenu-nav">
            <ul className="mainmenu justify-content-start">
              <li className="has-droupdown">
                <Link
                  to="#"
                  className="edu-btn btn-medium left-icon header-button selft button"
                >
                  <i className="ri-grid-fill"></i>
                  Explore
                </Link>
                <ul className="submenu">
                  {data?.length > 0 &&
                    data.map((v, i) => (
                      <li className="has-droupdown" key={i}>
                        <Link to={`${v.link}`}>{v.title}</Link>
                        {/* {v.link === "/course" && <ExploreCourseCategory />}
                        {v.link === "/vouchers" && <ExploreVoucherCategory />}
                        {v.link === "/assessment" && (
                          <ExploreAssessmentCategory />
                        )}
                        {v.link === "/e-learning" && (
                          <ExploreELearningCategory />
                        )}
                        {v.link === "/blog/" && <ExploreBlogsCategory />} */}
                      </li>
                    ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
        <div className="col-lg-6 col-xl-5 d-none d-lg-block">
          <nav className="mainmenu-nav">
            <ul className="mainmenu">
              <li className="">
                <Link to="/">Home</Link>
              </li>
              <li className="">
                <Link to="/services">Our Services</Link>
              </li>
              <li className="">
                <Link to="/about-us">About Us</Link>
              </li>
              <li className="">
                <Link to="/course">Courses</Link>
              </li>
              <li className="">
                <Link to="/contact-us">Contact Us</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="col-lg-8 col-xl-3 col-md-6 col-6">
          <div className="header-right justify-content-end header-menu-bar">
            <Link to="/cart" className="white-box-icon" aria-label="cart">
              <i className="ri-shopping-cart-2-fill"></i>
              <span className={itemInCart ? "badge" : ""}>
                {itemInCart ? itemInCart : null}
              </span>
            </Link>
            <Link
              to="#"
              className="white-box-icon search-trigger header-search d-none d-md-block ml--8"
              aria-label="search"
              onClick={() => setSearchModal(true)}
            >
              <i className="ri-search-line"></i>
            </Link>
            <React.Suspense fallback="Loading...">
              <UserIcon />
            </React.Suspense>

            <div className="quote-icon quote-search d-none d-md-block ml--8">
              <Currency />
            </div>

            <div
              className="white-box-icon hamberger-button header-menu ml--8 d-block d-xl-none"
              //   aria-label="mobile open"
              onClick={() => setActive(!isActive)}
            >
              <i className="ri-menu-line"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
