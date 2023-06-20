import React, { useEffect, useState ,useContext} from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Swal from "sweetalert2";
import { Context } from "../../../../../container/Context";

const BranchLocationList = () => {
  const [Location, setLocation] = useState([]);
  const { login, permissions } = useContext(Context);
  const [loginData, setLoginData] = login;
  const [pagesData, setPagesData] = useState([]);
  const [rolePermission, setRolePermission] = permissions;
  let auth_token = "";
  let mobile_no = [];
  let local_storage,
    url = "";
  var localstorage_ = localStorage.getItem("user");
  if (localstorage_.length > 0) {
    local_storage = JSON.parse(localstorage_);
    auth_token = local_storage.data.auth_token;
    url = process.env.REACT_APP_API_BASEURL;
  }

  const getLocationList = async () => {
    var myHeaders = new Headers();
    myHeaders.append("AUTHTOKEN", auth_token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(`${url}contact/get-location-list`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          setLocation(result.data);
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

        fetch(`${url}contact/delete-location/${id}`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            if (data.status === "success") {
              if (result.isConfirmed) {
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
              }
              getLocationList();
            }
          })
          .catch((error) => console.log("error", error));
      }
    });
  };

  useEffect(() => {
    getLocationList();
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
          <h5>Branch Location Wise</h5>
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
                      <th scope="col">Branch Name</th>
                      <th scope="col">Branch Address</th>
                      <th scope="col">Phone No</th>
                      <th scope="col" className="text-center">
                        Last Modified By
                      </th>
                      <th scope="col" className="text-center">
                        Last Modified Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Location?.length > 0 &&
                      Location?.map(
                        (value, key) => (
                          (mobile_no = JSON.parse(value.mobile_number)),
                          (
                            <tr className="align-middle" key={key}>
                              <th scope="row" className="text-center">
                                {key + 1}
                              </th>
                              <td className="text-center">
                              {rolePermission.is_edit == 1 && ( <Link
                                  to={"/branch-location-edit/" + value?.id}
                                  className="btn btn-outline-primary btn-sm me-2"
                                >
                                  <i className="fa-solid fa-pen-to-square"></i>
                                </Link>)}
                                {rolePermission.is_delete == 1 && (  <Link
                                  to="#"
                                  className="btn btn-outline-danger btn-sm"
                                  onClick={(e) => ShowAlert(e, value?.id)}
                                >
                                  <i className="fa-solid fa-trash-can"></i>
                                </Link>)}
                              </td>
                              <td>{value?.title}</td>
                              <td>{value?.address}</td>
                              <td>
                                {JSON.parse(value.mobile_number || "[]").map(
                                  (v) => (
                                    <p>{v}</p>
                                  )
                                )}
                              </td>
                              <td className="text-center">Developer</td>
                              <td className="text-center">
                                {moment(value?.updated_at).format("MMM Do YY")}
                              </td>
                            </tr>
                          )
                        )
                      )}
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

export default BranchLocationList;
