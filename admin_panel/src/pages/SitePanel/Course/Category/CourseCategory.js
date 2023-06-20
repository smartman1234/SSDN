import React, { useContext,useState,useEffect } from "react";
import { Link } from "react-router-dom";

import Breadcrumb from "../../../BreadCrumb/Breadcrumb";
import CategoryList from "./CourseCategoryList";
import { Context } from "../../../../container/Context";

function Category() {
  const { login, permissions } = useContext(Context);
  const [loginData, setLoginData] = login;
  const [pagesData, setPagesData] = useState([]);
  const [rolePermission, setRolePermission] = permissions;

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
  const name = (
    <Link to="/course-category-add" className="btn btn-primary">
      <i className="fa-solid fa-plus me-2"></i>Add Course Category
    </Link>
  );
  return (
    <div className="page-body">
      <Breadcrumb
        heading="Course Category"
        add={rolePermission.is_add == 1 && name}
      />
      <div className="container-fluid support-ticket">
        <div className="row">
          <div className="col-sm-12">
            <CategoryList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
