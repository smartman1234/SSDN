import React, { useState } from "react";
import { Link, useNavigate,  } from "react-router-dom";
import UserService from "../../Services/UserService";
import Utils from "../../Utils/Utils";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { CartContext } from "../../Container/Context";
export default function UserIcon() {
  const navigate = useNavigate();
  const userServe = new UserService();
  const { user, numberInCart } = useContext(CartContext);
  const [userName, setUserName] = user;
  const [itemInCart, setItemInCart] = numberInCart;

  const [showList, setShowList] = useState(false);

  const showListHandle = () => {
    setShowList(!showList);
  };

  const logouthandle = async () => {
    try {
      let response = await userServe.logout();
      if (response.status === "success") {
        toast.success(response.message);
        localStorage.removeItem("user");
        localStorage.removeItem("username");
        window.user = null;
       
        setItemInCart(0);
        setTimeout(() => {
          navigate("/");
          window.location.reload(false);
        }, [1000]);
        localStorage.clear();
        setUserName("");
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <>
      {window.user?.data?.auth_token ? (
        <div
          className="quote-icon quote-user ml--8"
          onClick={showListHandle}
        >
          <Link
            className="white-box-icon user-name-data d-flex align-items-center"
            to="#" aria-label="User"
          >
            <span> {userName && Utils?.titleCase(userName)}</span>
            <i className="ri-user-line"></i>
          </Link>
          {showList ? (
            <ul className="my-profile-data">
              <li>
                <Link
                  className="text-white"
                  to="/my-profile"
                  onClick={() => {
                    localStorage.setItem("activeprofilebutton", 0);
                  }}
                  aria-label="My Profile"
                >
                  My Profile
                </Link>
              </li>

              {window.user?.data?.auth_token ? (
                <li
                  onClick={logouthandle}
                  className="logout-assessment text-white border-top"
                >
                  Logout
                </li>
              ) : (
                <Link to="/login" aria-label="Login">
                  Login
                </Link>
              )}
            </ul>
          ) : null}
        <ToastContainer autoClose={1000} />
        </div>
      ) : (
        <div
          className="quote-icon quote-user ml--8"
          onClick={showListHandle}
        >
          <Link className="white-box-icon" to="#" aria-label="user">
            <i className="ri-user-line"></i>
          </Link>
          {showList ? (
            <ul className="my-profile-data">
              {window?.user?.data?.auth_token ? (
                <li onClick={logouthandle} className="logout-assessment">
                  Logout
                </li>
              ) : (
                <Link to="/login" aria-label="Login">
                  Login
                </Link>
              )}
            </ul>
          ) : null}
        </div>
      )}
    </>
  );
}
