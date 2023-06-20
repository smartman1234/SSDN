import React from "react";
import { Link } from "react-router-dom";
import Footer from "../pages/Footer/Footer";
import Sidebar from "../pages/Sidebar/Sidebar";
import UserService from "../Services/UserService";

function DefaultLayout({ children, handleAuthState }) {
  const userService = new UserService();

  const logoutHandler = async () => {
    try {
      let response = await userService.logout();
      if (response) {
        window.user = null;
        localStorage.clear();
        handleAuthState(false);
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <div className="page-wrapper null compact-wrapper" id="pageWrapper">
      <div className="page-main-header">
        <div className="main-header-right row m-0">
          <div className="main-header-left">
            <div className="logo-wrapper">
              <Link to="/home">
                <img
                  className="img-fluid"
                  src="/assets/images/logo/logo.png"
                  alt=""
                  height={{}}
                  width={{}}
                />
              </Link>
            </div>
            <div className="dark-logo-wrapper">
              <Link to="/home">
                <img
                  className="img-fluid"
                  src="/assets/images/logo/dark-logo.png"
                  alt=""
                  height={{}}
                  width={{}}
                />
              </Link>
            </div>
            <div className="toggle-sidebar">
              <i
                className="status_toggle middle"
                data-feather="align-center"
                id="sidebar-toggle"
              ></i>
            </div>
          </div>
          <div className="nav-right col pull-right right-menu p-0">
            <ul className="nav-menus">
              <li className="onhover-dropdown">
                <div className="notification-box">
                  <i className="far fa-bell"></i>
                  <span className="dot-animated"></span>
                </div>
                <ul className="notification-dropdown onhover-show-div">
                  <li>
                    <p className="f-w-700 mb-0">
                      You have 3 Notifications
                      <span className="pull-right badge badge-primary badge-pill">
                        4
                      </span>
                    </p>
                  </li>
                  <li className="noti-primary">
                    <div className="media">
                      <span className="notification-bg bg-light-primary">
                        <i data-feather="activity"> </i>
                      </span>
                      <div className="media-body">
                        <p>Delivery processing </p>
                        <span>10 minutes ago</span>
                      </div>
                    </div>
                  </li>
                  <li className="noti-secondary">
                    <div className="media">
                      <span className="notification-bg bg-light-secondary">
                        <i data-feather="check-circle"> </i>
                      </span>
                      <div className="media-body">
                        <p>Order Complete</p>
                        <span>1 hour ago</span>
                      </div>
                    </div>
                  </li>
                  <li className="noti-success">
                    <div className="media">
                      <i data-feather="file-text"> </i>
                      <div className="media-body">
                        <p>Tickets Generated</p>
                        <span>3 hour ago</span>
                      </div>
                    </div>
                  </li>
                  <li className="noti-danger">
                    <div className="media">
                      <i data-feather="user-check"> </i>
                      <div className="media-body">
                        <p>Delivery Complete</p>
                        <span>6 hour ago</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
              <li className="onhover-dropdown p-0">
                <button
                  className="btn btn-primary-light"
                  type="button"
                  onClick={logoutHandler}
                >
                  <Link to="#">
                    <i className="fa fa-sign-out me-2"></i>Log out
                  </Link>
                </button>
              </li>
            </ul>
          </div>
          <div className="d-lg-none mobile-toggle pull-right w-auto">
            <i data-feather="more-horizontal"></i>
          </div>
        </div>
      </div>
      <div className="page-body-wrapper null">
        <Sidebar />
        {children}
        <Footer />
      </div>
    </div>
  );
}

export default DefaultLayout;
