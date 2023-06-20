import React from "react";
import { useState, useContext } from "react";
import { useEffect } from "react";
import UserService from "../../Services/UserService";
import DiscountedCoupon from "./DiscountedCoupon";
import TopCard from "./TopCard";
import VoucherList from "./VoucherList";
import { Context } from "../../container/Context";

function Home() {
  const { login, permissions, pages } = useContext(Context);
  const [rolePermission, setRolePermission] = permissions;
  const [pagesData, setPagesData] = pages;
  const [loginData, setLoginData] = login;
  const [type, setType] = useState("all");
  const [data, setData] = useState([]);
  const serve = new UserService();

  useEffect(() => {
    dashboard();
  }, []);

  const apiCall = async (activity) => {
    try {
      let response = await serve.dashboard(activity);
      if (response) {
        setData(response.data);
      } else {
      }
    } catch (err) {
      throw err;
    }
  };
  const dashboard = async () => {
    let activity = {
      type: type,
    };
    await apiCall(activity);
  };
  const typeChangeHanlder = async (value) => {
    setType(value);
    let activity = {
      type: value,
    };
    if (value === "custom") {
      return;
    } else {
      await dashboard(activity);
    }
  };

  useEffect(() => {
    setLoginData(JSON.parse(localStorage.getItem("user")));
  }, []);
 
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
      {rolePermission.is_view==1?  <div className="page-body">
        <div className="container-fluid support-ticket">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <TopCard
                  data={data}
                  typeChangeHanlder={typeChangeHanlder}
                  type={type}
                  dashboard={apiCall}
                />
                <VoucherList data={data} />
                <DiscountedCoupon data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>:""}
    
    </>
  );
}

export default Home;
