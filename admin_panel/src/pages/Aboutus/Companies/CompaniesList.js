import React, { useEffect, useState,useContext } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Swal from "sweetalert2";
import { Context } from "../../../container/Context";
import Breadcrumb from "../../BreadCrumb/Breadcrumb";

const CompaniesList = () => {
  const [Companies, setCompanies] = useState([]);
  const { login, permissions } = useContext(Context);
  const [loginData, setLoginData] = login;
  const [pagesData, setPagesData] = useState([]);
  const [rolePermission, setRolePermission] = permissions;
  let auth_token = "";
  let local_storage,
    url = "";
  var localstorage_ = localStorage.getItem("user");
  if (localstorage_?.length > 0) {
    local_storage = JSON.parse(localstorage_);
    auth_token = local_storage.data.auth_token;
    url = process.env.REACT_APP_API_BASEURL;
  }

  const getCompaniesList = async () => {
    var myHeaders = new Headers();
    myHeaders.append("AUTHTOKEN", auth_token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(`${url}company/get-our-company-list`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          setCompanies(result.data);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const ShowAlert = async (e, id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(function (result) {
      if (result !== null) {
        var myHeaders = new Headers();
        myHeaders.append("AUTHTOKEN", auth_token);

        var requestOptions = {
          method: "DELETE",
          headers: myHeaders,
        };

        fetch(`${url}company/delete-our-company/${id}`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            if (data.status === "success") {
              if (result.isConfirmed) {
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
              }
              getCompaniesList();
            }
          })
          .catch((error) => console.log("error", error));
      }
    });
  };

  useEffect(() => {
    getCompaniesList();
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
    <Link to="/companies-add" className="btn btn-primary">
      <i className="fa-solid fa-plus me-2"></i>Add 
    </Link>
  );

  return (
    <>
      <div className="page-body">
        <Breadcrumb heading="Companies" add={rolePermission.is_add == 1 && name} />
        <div className="container-fluid support-ticket">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Companies List</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="card o-hidden border-0">
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
                            {Companies?.length > 0 &&
                              Companies?.map((value, key) => (
                                <tr className="align-middle" key={key}>
                                  <th scope="row" className="text-center">
                                    {key + 1}
                                  </th>
                                  <td className="text-center">
                                  {rolePermission.is_edit == 1 && ( <Link
                                      to={"/companies-edit/" + value?.id}
                                      className="btn btn-outline-primary btn-sm me-2"
                                    >
                                      <i className="fa-solid fa-pen-to-square"></i>
                                    </Link>)}
                                    {rolePermission.is_delete == 1 && ( <Link
                                      to="#"
                                      className="btn btn-outline-danger btn-sm"
                                      onClick={(e) => ShowAlert(e, value?.id)}
                                    >
                                      <i className="fa-solid fa-trash-can"></i>
                                    </Link>)}
                                  </td>
                                  <td>
                                    <img
                                      src={value?.image}
                                      className=""
                                      alt="image"
                                      style={{ maxWidth: "150px" }}
                                    />
                                  </td>
                                  <td>{value?.image_alt_tag}</td>

                                  <td className="text-center">Developer</td>
                                  <td className="text-center">
                                    {moment(value?.updated_at).format(
                                      "MMM Do YY"
                                    )}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompaniesList;
