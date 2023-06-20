import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TrustedPartnersService from "../../../Services/TrustedParnersService/TrustedPartnersService";
import moment from "moment";
import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import { Context } from "../../../container/Context";

export default function TrustedPartnersList() {
  const partnerServe = new TrustedPartnersService();
  const [partnersList, setPartnersList] = useState([]);
  const { login, permissions } = useContext(Context);
  const [loginData, setLoginData] = login;
  const [pagesData, setPagesData] = useState([]);
  const [rolePermission, setRolePermission] = permissions;

  useEffect(() => {
    partnerslistApi();
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

  const partnerslistApi = async () => {
    try {
      let response = await partnerServe.partnerslist();
      if (response) {
        setPartnersList(response.data);
      }
    } catch (err) {
      throw err;
    }
  };

  const deleteHandle = async (dataId) => {
    try {
      if (window.confirm("Are you sure you want to delete this record?")) {
        let response = await partnerServe.deletepartner(dataId);
        if (response) {
          toast.success(response.message);
          let dataTemp = [...partnersList];

          const remainingData = dataTemp.filter((v) => {
            return v._id !== dataId;
          });
          partnerslistApi();
          setPartnersList(remainingData);
        } else {
          toast.error("Some went wrong!");
        }
      }
    } catch (err) {
      throw err;
    }
  };

 

  const name = (
    <Link to="/create-partner" className="btn btn-primary">
      <i className="fa-solid fa-plus me-2"></i>Add Partner
    </Link>
  );
  return (
    <>
      <div className="page-body">
        <Breadcrumb
          heading="Our Partners "
          add={rolePermission.is_add == 1 && name}
        />
        <div className="container-fluid support-ticket">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Our Partners List</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="card o-hidden border-0">
                        <div
                          id="basic-1_wrapper"
                          className="dataTables_wrapper no-footer"
                        >
                          <table className="table display dataTable">
                            <thead>
                              <tr>
                                <th scope="col" className="text-center">
                                  Sr. No.
                                </th>
                                <th scope="col" className="text-center">
                                  Action
                                </th>
                                <th scope="col">Image</th>
                                <th scope="col">Image Alt Tag</th>
                                <th scope="col" className="text-center">
                                  Last Modified By
                                </th>
                                <th scope="col" className="text-center">
                                  Last Modified Date
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {partnersList?.length > 0 &&
                                partnersList?.map((v, i) => (
                                  <tr key={i}>
                                    <th scope="row" className="text-center">
                                      {i + 1}
                                    </th>

                                    <td className="text-center">
                                      {rolePermission.is_edit == 1 && (
                                        <Link
                                          to={`/edit-partner/${v.id}`}
                                          className="btn btn-outline-primary btn-sm me-2"
                                          title="Edit Course Category"
                                        >
                                          <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                      )}
                                      {rolePermission.is_delete == 1 && (
                                        <Link
                                          onClick={() => deleteHandle(v.id)}
                                          to="#"
                                          className="btn btn-outline-danger btn-sm"
                                          title="Delete Course Category"
                                        >
                                          <i className="fa-solid fa-trash-can"></i>
                                        </Link>
                                      )}
                                    </td>
                                    <td>
                                      <img src={v.image} />
                                    </td>
                                    <td>{v.image_alt_tag}</td>
                                    <td className="text-center">
                                      {v.admin ? v.admin.name : "-"}
                                    </td>
                                    <td className="text-center">
                                      {moment(v.updated_at).format("L")}
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              <ToastContainer autoClose={1000} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
