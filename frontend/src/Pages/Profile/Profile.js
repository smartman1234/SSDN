import React, { useEffect } from "react";
import { useState } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useNavigate } from "react-router-dom";
import UserService from "../../Services/UserService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import Utils from "../../Utils/Utils";
import SEO from "../SEO/SEO";
import { CartContext } from "../../Container/Context";
import MetaService from "../../Services/MetaServices/MetaService";

export default function Profile({ loginData, value }) {
  const metaService = new MetaService();
  const { image, numberInCart } = useContext(CartContext);
  const [itemInCart, setItemInCart] = numberInCart;
  const [meta, setMeta] = useState({
    title: "",
    keywords: "",
    description: "",
    breadcrumb: ""
  });
  const [userImage, setUserImage] = image;
  const userServe = new UserService();
  const [activeIndex, setActiveIndex] = useState(
    parseInt(sessionStorage.getItem("activeIndex"))
  );
  const navigate = useNavigate();

  const pathChangehandler = (id) => {
    setActiveIndex(id);
    sessionStorage.setItem("activeIndex", id);
  };
  useEffect(() => {
    getPageBlock("profile");
    setActiveIndex(localStorage.getItem("activeprofilebutton"));
    window.scrollTo(0, 0);
    if (window.location.pathname === "/purchase-history") {
      parseInt(sessionStorage.getItem("activeIndex") || 4);
    }
    return () => {
      sessionStorage.removeItem("activeIndex");
    };
  }, []);
  const logouthandle = async () => {
    try {
      let response = await userServe.logout();
      if (response.status === "success") {
        window.user = null;
        localStorage.clear();
        toast.success(response.message);


        setItemInCart(0);

        setTimeout(() => {
          navigate("/");
          window.location.reload(false);
        }, [1000]);
      }
    } catch (err) {
      throw err;
    }
  };
  const getPageBlock = async () => {
    try {
      let response = await metaService.getMetadetail("profile");
      if (response.status === "success") {
        setMeta({
          title: response.data.meta_title,
          Keywords: response.data.meta_keywords,
          description: response.data.meta_description,
          breadcrumb: response.data.breadcrumb,
        });
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <> <SEO
      meta_title={meta?.title}
      meta_description={meta?.description}
      meta_keyword={meta?.Keywords}
      breacrumb={meta?.breadcrumb}
    /> <div className="col-lg-3 mb--20">
        <aside className="edu-course-sidebar">
          <div className="edu-course-widget widget-category">
            <div className="inner">
              <h5 className="widget-title">My Dashboard</h5>
              <div className="instructor-profile-left">
                <div className="inner">
                  {!userImage || userImage === "null" ? (
                    <div
                      className="thumbnail"
                      style={{
                        paddingTop: "10px",

                        fontSize: "32px",
                      }}
                    >
                      {Utils?.nameToInitials(window.user?.data?.name)}
                    </div>
                  ) : (
                    <div className="thumbnail">
                       <LazyLoadImage loading="lazy" src={userImage} alt="About Images"
                        height="100%"
                        width="100%" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </aside>
        <aside className="app-sidebar doc-sidebar my-dash open">
          <div className="app-sidebar__user clearfix is-expanded">
            <ul className="side-menu open">
              <li
                onClick={() => {
                  pathChangehandler(0);
                  localStorage.setItem("activeprofilebutton", 0);
                }}
                className={activeIndex == 0 ? "is-expanded" : ""}
              >
                <Link className="side-menu__item activeIndex" to="/my-profile">
                  <i className="ri-edit-box-line"></i>
                  <span className="side-menu__label">Edit Profile</span>
                </Link>
              </li>
              <li
                onClick={() => {
                  pathChangehandler(1);
                  localStorage.setItem("activeprofilebutton", 1);
                }}
                className={activeIndex == 1 ? "is-expanded" : ""}
              >
                <Link className="side-menu__item" to="/my-course">
                  <i className="ri-file-list-line"></i>
                  <span className="side-menu__label">My Courses</span>
                </Link>
              </li>
              <li
                onClick={() => {
                  pathChangehandler(2);
                  localStorage.setItem("activeprofilebutton", 2);
                }}
                className={activeIndex == 2 ? "is-expanded" : ""}
              >
                <Link className="side-menu__item" to="/my-voucher">
                  <i className="ri-file-list-line"></i>
                  <span className="side-menu__label">My Vouchers</span>
                </Link>
              </li>
              <li
                className={activeIndex == 3 ? "is-expanded" : ""}
                onClick={() => {
                  pathChangehandler(3);
                  localStorage.setItem("activeprofilebutton", 3);
                }}
              >
                <Link className="side-menu__item" to="/my-assessment">
                  <i className="ri-file-list-line"></i>
                  <span className="side-menu__label">My Assessment</span>
                </Link>
              </li>
              <li
                className={activeIndex == 6 ? "is-expanded" : ""}
                onClick={() => {
                  pathChangehandler(6);
                  localStorage.setItem("activeprofilebutton", 6);
                }}
              >
                <Link className="side-menu__item" to="/my-elearning">
                  <i className="ri-file-list-line"></i>
                  <span className="side-menu__label">My E-Learning Courses</span>
                </Link>
              </li>
              <li
                className={activeIndex == 7 ? "is-expanded" : ""}
                onClick={() => {
                  pathChangehandler(7);
                  localStorage.setItem("activeprofilebutton", 7);
                }}
              >
                <Link className="side-menu__item" to="/my-enroll">
                  <i className="ri-file-list-line"></i>
                  <span className="side-menu__label">My Enroll </span>
                </Link>
              </li>
              <li
                className={activeIndex == 4 ? "is-expanded" : ""}
                onClick={() => {
                  pathChangehandler(4);
                  localStorage.setItem("activeprofilebutton", 4);
                }}
              >
                <Link className="side-menu__item" to="/purchase-history">
                  <i className="ri-history-line"></i>
                  <span className="side-menu__label">Purchase History</span>
                </Link>
              </li>
              <li
                className={activeIndex == 5 ? "is-expanded" : ""}
                onClick={() => {
                  pathChangehandler(5);
                  localStorage.setItem("activeprofilebutton", 5);
                }}
              >
                <Link className="side-menu__item" to="/change-password">
                  <i className="ri-lock-line"></i>
                  <span className="side-menu__label">Change Password </span>
                </Link>
              </li>

              <li style={{ borderTop: "1px solid #e8ebf3" }}>
                {window.user?.data?.auth_token ? (
                  <button
                    onClick={logouthandle}
                    className="side-menu__item"
                    style={{ border: "none", backgroundColor: "transparent" }}
                  >
                    <i className="ri-shut-down-line"></i>
                    <span className="side-menu__label">Logout</span>
                  </button>
                ) : (
                  <Link to="/login">
                    <li>Login</li>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </aside>

        <ToastContainer autoClose={1000} />
      </div></>

  );
}
