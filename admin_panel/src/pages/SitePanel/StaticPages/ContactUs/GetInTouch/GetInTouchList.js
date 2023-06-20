import React from "react";
import { useState,useContext } from "react";
import { useEffect } from "react";
import { json, Link } from "react-router-dom";
import moment from "moment";
import { Context } from "../../../../../container/Context";
import GetInTouchService from "../../../../../Services/SitePanelServices/GetInTouchService";

const GetInTouchList = () => {
  const [data, setData] = useState({});
  const [working, setWorking] = useState([]);
  const { login, permissions } = useContext(Context);
  const [loginData, setLoginData] = login;
  const [pagesData, setPagesData] = useState([]);
  const [rolePermission, setRolePermission] = permissions;
  const getInTouch = new GetInTouchService();
  useEffect(() => {
    getDataApi();
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

  const getDataApi = async () => {
    try {
      let response = await getInTouch.get();
      if (response) {
        sessionStorage.setItem("getintouch", JSON.stringify(response.data));
        let arr;
        arr = JSON.parse(response.data.working);
        setWorking(arr);
        setData(response.data);
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h5>Connect with us</h5>
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
                      <th scope="col">Heading</th>
                      <th scope="col">Phone No</th>
                      <th scope="col">Skype ID</th>
                      <th scope="col" className="text-center">Last Modified By</th>
                      <th scope="col" className="text-center">Last Modified Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="align-middle">
                      <th scope="row" className="text-center">1</th>
                      <td className="text-center">
                      {rolePermission.is_edit == 1 && (  <Link
                          to="/getin-touch-edit"
                          className="btn btn-outline-primary btn-sm me-2"
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </Link>)}
                      </td>
                      <td>{data.contact_title}</td>
                      <td>
                        {JSON?.parse(data.contact_numbers || "[]").map(
                          (v, i) => (
                            <p key={i}>{v}</p>
                          )
                        )}
                      </td>
                      <td>{data.skype_id}</td>
                      <td className="text-center">{data.admin?.name}</td>
                      <td className="text-center">{moment(data.updated_at).format("DD-MM-YYYY")}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5>Mail Us</h5>
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
                      <th scope="col">Heading</th>
                      <th scope="col">Email ID</th>
                      <th scope="col" className="text-center">Last Modified By</th>
                      <th scope="col" className="text-center">Last Modified Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="align-middle">
                      <th scope="row" className="text-center">1</th>
                      <td className="text-center">
                      {rolePermission.is_edit == 1 && (  <Link
                          to="/mailto-edit"
                          className="btn btn-outline-primary btn-sm me-2"
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </Link>)}
                      </td>
                      <td>{data.email_title}</td>
                      <td>
                        {JSON.parse(data.contact_emails || "[]").map((v, i) => (
                          <p key={i}>{v}</p>
                        ))}
                      </td>
                      <td className="text-center">{data.admin?.name}</td>
                      <td className="text-center">{moment(data.updated_at).format("DD-MM-YYYY")}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5>Working Information</h5>
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
                      <th scope="col">Heading</th>
                      <th scope="col">Working Time</th>
                      <th scope="col" className="text-center">Last Modified By</th>
                      <th scope="col" className="text-center">Last Modified Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="align-middle">
                      <th scope="row" className="text-center">1</th>
                      <td className="text-center">
                      {rolePermission.is_edit == 1 && (  <Link
                          to="/working-edit"
                          className="btn btn-outline-primary btn-sm me-2"
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </Link>)}
                       </td>
                      <td>{data.working_title}</td>
                      <td>
                        <p>
                         {working[0]}
                        
                        </p>
                      </td>
                      <td className="text-center">{data.admin?.name}</td>
                      <td className="text-center">{moment(data.updated_at).format("DD-MM-YYYY")}</td>
                    </tr>
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

export default GetInTouchList;
