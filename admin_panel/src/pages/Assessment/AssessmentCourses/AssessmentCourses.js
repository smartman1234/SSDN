import React,{useState,useEffect,useContext} from "react";
import { Link,useLocation } from "react-router-dom";
import { Context } from "../../../container/Context";
import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import AssessmentCoursesList from "./AssessmentCoursesList";

function AssessmentCourses() {
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
  const location=useLocation()
  const name = (
    <Link to="/assessment-courses-add" className="btn btn-primary">
      <i className="fa-solid fa-plus me-2"></i>Add Assessment Course
    </Link>
  );
  return (
    <div className="page-body">

      <Breadcrumb heading="Add Assessment Course" add={rolePermission.is_add == 1 && name}/>
      <div className="container-fluid support-ticket">
        <div className="row">
          <div className="col-sm-12">
            <AssessmentCoursesList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssessmentCourses;
