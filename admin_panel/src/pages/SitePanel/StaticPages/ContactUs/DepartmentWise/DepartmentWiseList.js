import React, { useEffect, useState,useContext } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Context } from "../../../../../container/Context";
import DepartmentwiseService from "../../../../../Services/SitePanelServices/DepartmentwiseService";

const DepartmentWiseList = () => {
  const [Department, setDepartment] = useState([]);
  const { login, permissions } = useContext(Context);
  const [loginData, setLoginData] = login;
  const [pagesData, setPagesData] = useState([]);
  const [rolePermission, setRolePermission] = permissions;
  const department = new DepartmentwiseService();
  let auth_token = "";
  let local_storage,
    url = "";
  var localstorage_ = localStorage.getItem("user");
  if (localstorage_.length > 0) {
    local_storage = JSON.parse(localstorage_);
    auth_token = local_storage.data.auth_token;
    url = process.env.REACT_APP_API_BASEURL;
  }

  const getDepartmentList = async () => {
    try {
      let response = await department.list();
      if (response) {
        setDepartment(response.data.reverse());
      }
    } catch (err) {
      throw err;
    }
  };
  useEffect(() => {
    getDepartmentList();
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
      <div className="card">
        <div className="card-header">
          <h5>Department Wise</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-lg-12">
              <div className="card o-hidden border-0">
                <table className="table display dataTable">
                  <thead>
                    <tr>
                      <th scope="col" className="text-center">Sr. No.</th>
                      <th scope="col" className="text-center">Action</th>
                      <th scope="col" className="text-center">Heading</th>
                      <th scope="col" className="text-center">Email ID</th>
                      <th scope="col" className="text-center">Phone No</th>
                      <th scope="col" className="text-center">WhatsApp No.</th>
                      <th scope="col" className="text-center">Last Modified By</th>
                      <th scope="col" className="text-center">Last Modified Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Department.map((v, i) => (
                      <tr className="align-middle">
                        <th scope="row" className="text-center">{i + 1}</th>
                        <td className="text-center">
                        {rolePermission.is_edit == 1 && (
                          <Link
                            to={"/department-wise-edit/" + v.id}
                            className="btn btn-outline-primary btn-sm me-2"
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </Link>)}
                        </td>
                        <td className="text-center">{v.name}</td>
                        <td className="text-center">{v.email}</td>
                        <td className="text-center">{v.mobile_number}</td>
                        <td className="text-center">{v.whatsapp_number}</td>
                        <td className="text-center">Admin</td>
                        <td className="text-center">{moment(v.updated_at).format("MMM Do YY")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DepartmentWiseList;
