import React, { useState, useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import VoucherService from "../../../Services/VoucherService/VoucherService";
import ReactPaginate from "react-paginate";
import { Context } from "../../../container/Context";
const ListList = () => {
  const voucherServe = new VoucherService();
  const [voucherlist, setVoucherList] = useState([]);
  const { login, permissions } = useContext(Context);
  const [loginData, setLoginData] = login;
  const [pagesData, setPagesData] = useState([]);
  const [rolePermission, setRolePermission] = permissions;
  const [offset, setOffset] = useState(0);
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
  const modifiedDate = (d) => {
    let date = d.split(" ");
    return date[0];
  };

  const apiCall = async (activity) => {
    try {
      let response = await voucherServe.voucherList(activity);
      if (response) {
        setVoucherList(response.data);
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

  const deleteHandle = async (dataId) => {
    try {
      if (window.confirm("Are you sure you want to delete this record?")) {
        let response = await voucherServe.deleteVoucher(dataId);
        if (response.status === "success") {
      
          toast.success(response.message);
          let dataTemp = [...voucherlist];

          const remainingData = dataTemp.filter((v) => {
            return v._id !== dataId;
          });
          setVoucherList(remainingData);
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
      vouchers_id: data.id,
    };
    if (type === "status") {
      obj["status"] = data.status === "inactive" ? 1 : 0;
    } else {
      obj["is_front"] = data.is_front == 0 ? 1 : 0;
    }
    try {
      const res = await voucherServe.toggleVoucher(obj);
      if (res.status === "success") {
        let items = [];
        voucherlist.map((v) => {
          if (v.id === data.id) {
            items.push(res.data);
          } else {
            items.push(v);
          }
        });

        setVoucherList(items);
      } else {
        toast.error("something went wrong!");
      }
    } catch (err) {
      toast.error("something went wrong!");
      throw err;
    }
  };

  const isOutOfStock = async (data) => {
    const obj = {
      vouchers_id: data.id,
      is_stock: data.is_stock ? 0 : 1,
    };
    try {
      const res = await voucherServe.toggleVoucher(obj);
      if (res.status === "success") {
        let items = [];
        voucherlist.map((v) => {
          if (v.id === data.id) {
            items.push(res.data);
          } else {
            items.push(v);
          }
        });

        setVoucherList(items);
      } else {
        toast.error("something went wrong!");
      }
    } catch (err) {
      toast.error("something went wrong!");
      throw err;
    }
  };

  function searchVoucherList(e) {
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
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h5>Voucher List</h5>
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
                        className=""
                        placeholder="Search..."
                        aria-controls="basic-1"
                        data-bs-original-title=""
                        onChange={(e) => searchVoucherList(e)}
                        title=""
                      />
                    </label>
                  </div>
                  <table className="table display dataTable no-footer table-responsive text-nowrap">
                    <thead>
                      <tr>
                        <th scope="col" className="text-center">
                          Sr. No.
                        </th>
                        <th scope="col" className="text-center">
                          Action
                        </th>
                        <th scope="col">Name</th>
                        <th scope="col">Parent</th>
                        <th scope="col" className="text-center">
                          Active
                        </th>
                        <th scope="col" className="text-center">
                         Trending certificate in  Home Page
                        </th>
                        <th scope="col" className="text-center">
                          Out of stock is display
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
                      {voucherlist &&
                        voucherlist.map((v, i) => (
                          <tr>
                            <th scope="row" className="text-center">
                              {i + offset + 1}
                            </th>
                            <td className="text-center">
                            {rolePermission.is_edit == 1 && (
                              <Link
                                to={`/voucher-list-edit/${v.id}`}
                                className="btn btn-outline-primary btn-sm me-2"
                                title="Edit Voucher"
                              >
                                <i className="fa-solid fa-pen-to-square"></i>
                              </Link>)}
                              {rolePermission.is_delete == 1 && (
                              <Link
                                to="#"
                                className="btn btn-outline-danger btn-sm"
                                title="Delete Voucher"
                                onClick={() => deleteHandle(v.id)}
                              >
                                <i className="fa-solid fa-trash-can"></i>
                              </Link>)}
                            </td>
                            <td>{v.name}</td>
                            <td>{v.category?.name}</td>
                            <td className="text-center">
                              <div className="checkbox checkbox-primary">
                                <input
                                  id={v.id}
                                  type="checkbox"
                                  checked={v.status === "active"}
                                  onChange={(e) => toggleHandler(v, "status")}
                                />
                              </div>
                            </td>{" "}
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
                            <td className="text-center">
                              <div className="checkbox checkbox-primary">
                                <input
                                  id={v.id}
                                  type="checkbox"
                                  checked={v.is_stock === 1}
                                  onChange={(e) => isOutOfStock(v)}
                                />
                              </div>
                            </td>
                            <td className="text-center">{v.admin?.name}</td>
                            <td className="text-center">
                              {modifiedDate(v.updated_at)}
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
                    Showing {offset + 1} to {offset + voucherlist?.length} of{" "}
                    {totalCount} entries
                  </div>
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

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                className="btn-close"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                type="button"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button className="btn btn-secondary" type="button">
                Save changes
              </button>
            </div>
          </div>
        </div>
      <ToastContainer autoClose={1000} />
      </div>
    </>
  );
};

export default ListList;
