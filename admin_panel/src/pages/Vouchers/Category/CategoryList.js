import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Context } from "../../../container/Context";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import VoucherCategoryService from "../../../Services/VoucherService/VoucherCategoryService";

const CategoryList = () => {
  const voucherServe = new VoucherCategoryService();
  const [voucherCategorylist, setVoucherCategoryList] = useState([]);
  const [offset, setOffset] = useState(0);
  const { login, permissions } = useContext(Context);
  const [loginData, setLoginData] = login;
  const [pagesData, setPagesData] = useState([]);
  const [rolePermission, setRolePermission] = permissions;
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState({
    start: 0,
    perPage: 10,
    searchTxt: "",
    searchField: "",
  });

  useEffect(() => {
    setLoginData(JSON.parse(localStorage.getItem("user")));
    voucherListApi();
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

  const apiCall = async (activity) => {
    try {
      let response = await voucherServe.voucherList(activity);
      if (response) {
        setVoucherCategoryList(response.data);
        setTotalPages(response.count / 10);
        setTotalCount(response.count);
      } 
    } catch (err) {
      throw err;
    }
  };

  const voucherListApi = async () => {
    let activity = {
      limit: search.perPage,
      offset: search.start,
      query: search.searchTxt,
    };
    await apiCall(activity);
  };

  function searchVoucherCategoryList(e) {
    search.searchTxt = e.target.value;
    search.start = 0;
    voucherListApi();
  }

  const handlePageClick = async (data) => {

    let currentPage = data.selected * search.perPage;
    setOffset(currentPage);
    let activity = {
      limit: search.perPage,
      offset: currentPage,
      query: search.searchTxt,
    };
    await apiCall(activity);
  };

  const modifiedDate = (d) => {
    let date = d.split(" ");
    return date[0];
  };

  const deleteHandle = async (dataId) => {
    try {
      if (window.confirm("Are you sure you want to delete this record?")) {
        let response = await voucherServe.deleteVoucherCategory(dataId);
        if (response.status === "success") {
          toast.success(response.message);
          let dataTemp = [...voucherCategorylist];

          const remainingData = dataTemp.filter((v) => {
            return v._id !== dataId;
          });
          setVoucherCategoryList(remainingData);
          await voucherListApi();
        } else {
          toast.error(response.message);
        }
      }
    } catch (err) {
      throw err;
    }
  };

  const toggleHandler = async (data, type) => {
    const obj = {
      vouchers_category_id: data.id,
    };
    const formData = new FormData();
    formData.append("vouchers_category_id", data.id);
    if (type === "status") {
      formData.append("status", data.status === "inactive" ? 1 : 0);
    } else {
      formData.append("is_front", data.is_front == 0 ? 1 : 0);
    }
    const config = {
      headers: {
        content: "multipart/form-data",
        AUTHTOKEN: window.user?.data?.auth_token,
      },
    };

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_BASEURL + `voucher/category-status-change`,
        formData,
        config
      );
      if (response) {
        voucherListApi();
      } else {
        toast.error(response.data?.message);
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h5>Vouchers Category List</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-lg-12">
              <div className="card o-hidden border-0">
                <div
                  id="basic-1_wrapper"
                  className="dataTables_wrapper no-footer"
                >
                  <div id="basic-1_filter" className="dataTables_filter">
                    <label>
                      Search:
                      <input
                        type="search"
                        className="Search..."
                        placeholder="Search..."
                        aria-controls="basic-1"
                        data-bs-original-title=""
                        onChange={(e) => searchVoucherCategoryList(e)}
                        title=""
                      />
                    </label>
                  </div>
                  <table className="table display dataTable no-footer">
                    <thead>
                      <tr>
                        <th scope="col" className="text-center">
                          Sr. No.
                        </th>
                        <th scope="col" className="text-center">
                          Action
                        </th>
                        <th scope="col">Category</th>
                        <th scope="col">Parent</th>
                        <th scope="col" className="text-center">
                          Status
                        </th>
                        <th scope="col" className="text-center">
                          Home Page
                        </th>
                        <th scope="col" className="text-center">
                          Last Modified By
                        </th>
                        <th scope="col" className="text-center">
                          Last Modified Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {voucherCategorylist?.map((v, i) => (
                        <tr key={i}>
                          <th scope="row" className="text-center">
                            {i + offset + 1}
                          </th>
                          <td className="text-center">
                            {rolePermission.is_edit == 1 && (
                              <Link
                                to={`/voucher-category-edit/${v.id}`}
                                className="btn btn-outline-primary btn-sm me-2"
                              >
                                <i className="fa-solid fa-pen-to-square"></i>
                              </Link>
                            )}
                            {rolePermission.is_delete == 1 && (
                              <Link
                                to="#"
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => deleteHandle(v.id)}
                              >
                                <i className="fa-solid fa-trash-can"></i>
                              </Link>
                            )}
                          </td>
                          <td>{v.name}</td>
                          <td>{v.parent_category?.name || "-"}</td>
                          <td className="text-center">
                            <div className="checkbox checkbox-primary">
                              <input
                                id={v.id}
                                type="checkbox"
                                checked={v.status === "active"}
                                onChange={(e) => toggleHandler(v, "status")}
                              />
                            </div>
                          </td>
                          <td className="text-center">
                            <div className="checkbox checkbox-primary">
                              <input
                                id={v.id}
                                type="checkbox"
                                checked={v.is_front == 1}
                                onChange={(e) => toggleHandler(v, "is_front")}
                              />
                            </div>
                          </td>
                          <td className="text-center">{v.admin?.name}</td>
                          <td className="text-center">
                            {modifiedDate(v.updated_at)}{" "}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div
                    className="dataTables_info"
                    id="basic-1_info"
                    role="status"
                    aria-live="polite"
                  >
                    Showing {offset + 1} to{" "}
                    {offset + voucherCategorylist?.length} of {totalCount}{" "}
                    entries
                  </div>
                  <div
                    className="dataTables_paginate paging_simple_numbers"
                    id="basic-1_paginate"
                  >
                    <ReactPaginate
                      previousLabel={"Previous"}
                      nextLabel={"Next"}
                      breakLabel={"..."}
                      pageCount={Math.ceil(totalPages)}
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
      <ToastContainer autoClose={1000} />
      </div>
    </>
  );
};

export default CategoryList;
