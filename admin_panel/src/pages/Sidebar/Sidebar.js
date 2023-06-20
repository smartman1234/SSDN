import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../container/Context";

function Sidebar() {
  const { login, permissions ,pages} = useContext(Context);
  const [loginData, setLoginData] = login;
  const [pagesData, setPagesData] = pages;
  const [active, setActive] = useState({});
  const [rolePermission, setRolePermission] = permissions;

  const clickHandle = (i) => {
    setActive((prev) => ({ [i]: !prev?.[i] }));
  };
  useEffect(() => {
    setLoginData(JSON.parse(localStorage.getItem("user")));
  }, []);
  console.log(loginData.data?.role?.name)
  useEffect(() => {
    const pages = loginData?.data?.role_permission;
   
    if (pages) {
      const items = [];
      for (const item of pages) {
        if (!item.parent_id) {
          items.push({
            ...item,
            child: pages.filter((v) => v.parent_id === item.id),
          });
        }
        if (item.slug === window.location.pathname.replace("/", "")) {
          setRolePermission(item.role_permission);
        }
      }
      setPagesData(items);
    }

  }, [loginData]);



  return (
    <>
      <header className="main-nav">
        <div className="sidebar-user text-center">
          <img
            className="img-90 rounded-circle"
            src="/assets/images/dashboard/1.png"
            alt=""
          />
          <div className="badge-bottom">
            <span className="badge badge-primary">New</span>
          </div>
          <Link to="#">
            <h6 className="mt-3 f-14 f-w-600">{loginData.data?.role?.name}</h6>
          </Link>
        </div>
        <nav>
          <div className="main-navbar">
            <div className="left-arrow" id="left-arrow">
              <i data-feather="arrow-left"></i>
            </div>
            <div id="mainnav">
              <ul className="nav-menu custom-scrollbar">
                <li className="back-btn">
                  <div className="mobile-back text-end">
                    <span>Back</span>
                    <i
                      className="fa fa-angle-right ps-2"
                      aria-hidden="true"
                    ></i>
                  </div>
                </li>
                {pagesData &&
                  pagesData.map((v, i) => {
                    return (
                      v.role_permission?.is_view == 1 && (
                        <li
                          className="dropdown"
                          onClick={() => clickHandle(i)}
                          key={i}
                        >
                          <Link className="nav-link menu-title" to={`${v.slug}`}>
                            <i data-feather="layout"></i>
                            <span>
                              {(v.parent_id === null || v.parent_id == 0) &&
                                v.name}
                            </span>
                            {v.child?.length > 0 &&
                              (active[i] ? (
                                <div className="according-menu">
                                  <i className="fa fa-angle-down"></i>
                                </div>
                              ) : (
                                <div className="according-menu">
                                  <i className="fa fa-angle-right"></i>
                                </div>
                              ))}
                          </Link>

                          {v.child &&
                            v.child.map(
                              (child, childindex) =>
                                child.role_permission.is_view == 1 && (
                                  <ul
                                    className="nav-submenu menu-content"
                                    style={
                                      active[i] ? { display: "block" } : {}
                                    }
                                    onClick={() => setActive(active[1])}
                                    key={childindex}
                                  >
                                    <li>
                                      <Link to={child.slug}>{child.name}</Link>
                                    </li>
                                  </ul>
                                )
                            )}
                        </li>
                      )
                    );
                  })}

              </ul>
            </div>
            <div className="right-arrow" id="right-arrow">
              <i data-feather="arrow-right"></i>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Sidebar;
