import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../BreadCrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import { Formik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import { Context } from "../../container/Context";
import DiscountCouponsService from "../../Services/DiscountCoupons/DiscountCouponsService";
import Utils from "../../utils/Utils";

export default function CouponsList() {
  const serve = new DiscountCouponsService();
  const [search, setSearch] = useState({
    start: 0,
    perPage: 10,
    searchTxt: "",
    searchField: "",
  });
  const [list, setList] = useState([]);
  const [offset, setOffset] = useState(0);
  const { login, permissions } = useContext(Context);
  const [loginData, setLoginData] = login;
  const [pagesData, setPagesData] = useState([]);
  const [rolePermission, setRolePermission] = permissions;
  const [admin, setAdmin] = useState("");
  const [type, setType] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [value, setValue] = useState({
    start: "",
    end: "",
  });

  const name = (
    <Link to="/add-coupons" className="btn btn-primary" id="nextBtn">
      <i className="fa-solid fa-plus me-2"></i>Create
    </Link>
  );

  useEffect(() => {
    ListApi();
  }, [search]);

  const apiCall = async (activity) => {
    try {
      let response = await serve.List(activity);
      if (response) {
        setList(response.data);
        setTotalPages(response.count / 10);
        setTotalCount(response.count);
      }
    } catch (err) {
      throw err;
    }
  };

  const ListApi = async () => {
    let activity = {
      limit: search.perPage,
      offset: search.start,
      query: search.searchTxt,
      type: "all",
    };
    await apiCall(activity);
  };

  function searchHandler(e) {
    search.searchTxt = e.target.value;
    search.start = 0;
    ListApi();
  }

  const handlePageClick = async (data) => {
    let currentPage = data.selected * search.perPage;
    setOffset(currentPage);
    let activity = {
      limit: search.perPage,
      offset: currentPage,
      query: search.searchTxt,
      type: "all",
    };
    await apiCall(activity);
  };

  const deleteHandle = async (dataId) => {
    try {
      if (window.confirm("Are you sure you want to delete this record?")) {
        let response = await serve.delete(dataId);
        if (response) {
          toast.success(response.message);
          let dataTemp = [...list];

          const remainingData = dataTemp.filter((v) => {
            return v._id !== dataId;
          });
          ListApi();
          setList(remainingData);
        } else {
          toast.error("Some went wrong!");
        }
      }
    } catch (err) {
      throw err;
    }
  };

  const ToggleHandle = async (data, typestatus) => {
    const obj = {
      type: typestatus,
      id: data.id,
    };
    if (typestatus === "status") {
      obj["status"] = data.status === "active" ? 0 : 1;
    } else {
      obj["is_public"] = data.is_public === 1 ? 0 : 1;
    }
    try {
      const res = await serve.changeStatus(obj);
      if (res.status === "success") {
        let items = [];

        list.map((v) => {
          if (v.id === data.id) {
            items.push(res.data);
          } else {
            items.push(v);
          }
        });
        setList(items);
        toast.success(res.message);
      } else {
        toast.error("something went wrong!");
      }
    } catch (err) {
      toast.error("something went wrong!");
      throw err;
    }
  };

  const typeChangeHanlder = async (value) => {
    setType(value);
    let activity = {
      limit: search.perPage,
      offset: search.start,
      query: search.searchTxt,
      type: value,
    };
    if (value === "custom") {
      return;
    } else {
      await apiCall(activity);
    }
  };

  const ValidateSchema = Yup.object().shape({
    start: Yup.string().required("Required"),
    end: Yup.string().required("Required"),
  });

  const onSubmit = async (values) => {
    let activity = {
      limit: search.perPage,
      offset: search.start,
      query: search.searchTxt,
      type: type,
      start_date: values.start,
      end_date: values.end,
    };
    await apiCall(activity);
  };

  useEffect(() => {
    const pages = loginData?.data?.role_permission;
    setAdmin(loginData?.data?.role?.name);
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
    <div className="page-body">
      <Breadcrumb
        heading="Discounted Coupons"
        add={rolePermission.is_add == 1 && name}
      />
      <div className="container-fluid support-ticket">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Coupons List</h5>
              </div>
              <div className="card-body">
                {type === "custom" && (
                  <div className="">
                    <Formik
                      initialValues={value}
                      onSubmit={onSubmit}
                      enableReinitialize={true}
                      validationSchema={ValidateSchema}
                    >
                      {(props) => (
                        <form onSubmit={props.handleSubmit}>
                          <div className="row">
                            <div className="form-group col-md-4">
                              <label className="form-label">From Date</label>
                              <input
                                className="form-control"
                                name="start"
                                type="date"
                                onChange={props.handleChange}
                                value={props.values.start}
                              />
                              {props.touched.start && props.errors.start ? (
                                <div className="formik-errors bg-error">
                                  {props.errors.start}
                                </div>
                              ) : null}
                            </div>
                            <div className="form-group col-md-4">
                              <label className="form-label">To Date</label>
                              <input
                                className="form-control"
                                name="end"
                                type="date"
                                onChange={props.handleChange}
                                value={props.values.end}
                              />
                              {props.touched.end && props.errors.end ? (
                                <div className="formik-errors bg-error">
                                  {props.errors.end}
                                </div>
                              ) : null}
                            </div>
                            <div className="form-group col-md-4 open-button">
                              <button type="submit" className="btn btn-primary">
                                Apply
                              </button>
                            </div>
                          </div>
                        </form>
                      )}
                    </Formik>
                  </div>
                )}

                <button
                  type="button"
                  className="btn btn-primary me-3"
                  onClick={() => {
                    typeChangeHanlder("today");
                  }}
                >
                  Today
                </button>
                <button
                  type="button"
                  className="btn btn-info  me-3"
                  onClick={() => {
                    typeChangeHanlder("yesterday");
                  }}
                >
                  Yesterday
                </button>
                <button
                  type="button"
                  className="btn btn-warning  me-3"
                  onClick={() => {
                    typeChangeHanlder("month");
                  }}
                >
                  Month
                </button>
                <button
                  type="button"
                  className="btn btn-success  me-3"
                  onClick={() => {
                    typeChangeHanlder("custom");
                  }}
                >
                  Custom
                </button>
                <div className="">
                  <div
                    id="basic-1_wrapper"
                    className="dataTables_wrapper no-footer"
                  >
                    <div id="basic-1_filter" className="dataTables_filter">
                      <label>
                        Search:
                        <input
                          type="search"
                          className=""
                          placeholder="Search..."
                          aria-controls="basic-1"
                          data-bs-original-title=""
                          onChange={(e) => searchHandler(e)}
                          title=""
                        />
                      </label>
                    </div>
                    <table
                      className="display dataTable no-footer table-responsive text-nowrap"
                      id="basic-1"
                      role="grid"
                      aria-describedby="basic-1_info"
                    >
                      <thead>
                        <tr role="row">
                          <th className="text-center">Sr. No.</th>
                          <th
                            style={{ width: "150px" }}
                            className="text-center"
                          >
                            Action
                          </th>
                          <th style={{ width: "250.938px" }}>Coupon Title</th>
                          <th style={{ width: "172.725px" }}>Coupon User</th>
                          <th style={{ width: "250.938px" }}>Coupon Owner</th>
                          <th
                            style={{ width: "130.2px" }}
                            className="text-center"
                          >
                            Valid From
                          </th>
                          <th
                            style={{ width: "100.5625px" }}
                            className="text-center"
                          >
                            Expire On
                          </th>
                          <th
                            style={{ width: "130.812px" }}
                            className="text-center"
                          >
                            Swipe Limit
                          </th>
                          <th
                            style={{ width: "130.812px" }}
                            className="text-center"
                          >
                            User Limit
                          </th>
                          <th style={{ width: "70px" }} className="text-center">
                            Amount
                          </th>
                          <th style={{ width: "130.812px" }}>Used</th>
                          <th style={{ width: "130.812px" }}>Public Display</th>
                          <th
                            style={{ width: "130.812px" }}
                            className="text-center"
                          >
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {list?.length > 0 ? (
                          list?.map((v, i) => {
                            return (
                              <tr role="row" className="odd" key={i}>
                                <td className="text-center">
                                  {i + offset + 1}
                                </td>
                                <td className="text-center">
                                  {admin==="Super Administrator"? <Link
                                      to={`/edit-coupons/${v.id}`}
                                      className="btn btn-outline-primary btn-sm me-2"
                                      title="Edit Assessment Category"
                                    >
                                      <i className="fa-solid fa-pen-to-square"></i>
                                    </Link>:rolePermission.is_edit == 1 &&<Link
                                      to={`/edit-coupons/${v.id}`}
                                      className="btn btn-outline-primary btn-sm me-2"
                                      title="Edit Assessment Category"
                                    >
                                      <i className="fa-solid fa-pen-to-square"></i>
                                    </Link>}
                                  {admin==="Super Administrator"?<Link
                                      to="#"
                                      onClick={() => deleteHandle(v.id)}
                                      className="btn btn-outline-danger btn-sm"
                                      title="Delete Assessment Category"
                                    >
                                      <i className="fa-solid fa-trash-can"></i>
                                    </Link>:rolePermission.is_delete == 1 && (
                                    <Link
                                      to="#"
                                      onClick={() => deleteHandle(v.id)}
                                      className="btn btn-outline-danger btn-sm"
                                      title="Delete Assessment Category"
                                    >
                                      <i className="fa-solid fa-trash-can"></i>
                                    </Link>
                                  )}
                                </td>
                                <td>
                                  {v?.title}({v.code})
                                </td>
                                <td>
                                  {Utils?.titleCase(JSON?.parse(v?.user)?.[0])}
                                </td>
                                <td>{v?.owner}</td>
                                <td className="text-center">
                                  {moment(v?.start_date).format("DD-MM-YYYY")}
                                </td>
                                <td className="text-center">
                                  {moment(v?.end_date).format("DD-MM-YYYY")}
                                </td>
                                <td className="text-center">
                                  {v.number_of_time}
                                </td>
                                <td className="text-center">{v.user_limit}</td>
                                <td className="text-center">
                                  {v.discount_coupon_amount}
                                </td>
                                <td>{v.users_list_count}</td>

                                <td className="text-center">
                                  <div className="media-body text-center switch-sm">
                                    <label className="switch">
                                      <input
                                        id={v.id}
                                        type="checkbox"
                                        checked={v.is_public === 1}
                                        onChange={(e) =>
                                          ToggleHandle(v, "public")
                                        }
                                      />
                                      <span className="switch-state"></span>
                                    </label>
                                  </div>
                                </td>
                                <td className="text-center">
                                  <div className="media-body text-center switch-sm">
                                    <label className="switch">
                                      <input
                                        id={v.id}
                                        type="checkbox"
                                        checked={v.status === "active"}
                                        onChange={(e) =>
                                          ToggleHandle(v, "status")
                                        }
                                      />
                                      <span className="switch-state"></span>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <p className="text-center">No data availale</p>
                        )}
                      </tbody>
                    </table>
                    <div
                      className="dataTables_paginate paging_simple_numbers"
                      id="basic-1_paginate"
                    >
                      <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        pageCount={totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination justify-content-center"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        activeClassName={"active"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <ToastContainer autoClose={1000} />
    </div>
  );
}
