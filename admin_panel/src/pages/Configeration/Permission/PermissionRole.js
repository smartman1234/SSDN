import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import axios from "axios";
import Select from "react-select";
import Utils from "../../../utils/Utils";
import PermissionService from "../../../Services/ConfigerationService/PermissionService";

export default function PermissionRole() {
  const [role, setRole] = useState("");
  const [roleList, setRoleList] = useState([]);
  const serve = new PermissionService();
  const [parent, setCategory] = useState([]);
  const [values, setValues] = useState({
    name: "",
    slug: "",
    parent: "",
    menu: "",
  });

  useEffect(() => {
    RolesList();
  }, []);

  const RolesList = async () => {
    try {
      let response = await serve.roles();
      if (response) {
        setCategory(response.data);
      }
    } catch (err) {
      throw err;
    }
  };
  const AssignRolesList = async (id) => {
    try {
      let response = await serve.assignpermissiontorole(id);
      if (response) {
        setRoleList(response.data);
      }
    } catch (err) {
      throw err;
    }
  };

  const name = (
    <Link to="/permissions" className="btn btn-primary">
      Back
    </Link>
  );

  const toggleHandler = async (data, clickedbutton) => {
    const obj = {
      roles_id: role.value,
      permissions_id: data.id,
      is_view:
        clickedbutton == 2
          ? data.role_permission?.is_view == 0
            ? 1
            : 0
          : data.role_permission.is_view,
      is_add:
        clickedbutton == 1
          ? data.role_permission?.is_add == 0
            ? 1
            : 0
          : data.role_permission.is_add,
      is_edit:
        clickedbutton == 3
          ? data.role_permission?.is_edit == 0
            ? 1
            : 0
          : data.role_permission?.is_edit,
      is_delete:
        clickedbutton == 4
          ? data.role_permission?.is_delete == 0
            ? 1
            : 0
          : data.role_permission?.is_delete,
    };
    try {
      const res = await serve.updateassignpermissiontorole(obj);
      if (res.status === "success") {
        AssignRolesList(role.value);
      }
    } catch (err) {
      toast.error("something went wrong!");
      throw err;
    }
  };
  return (
    <>
      <div className="page-body">
        <Breadcrumb heading="Permission-Role" add={name} />
        <div className="container-fluid support-ticket">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Permission-Role</h5>
                </div>

                <div className="card-body">
                  <div className="row">
                    <div className="form-group col-md-12">
                      <label htmlFor="contact">
                        Role <span className="text-danger">*</span>
                      </label>
                      <Select
                        onChange={(value) => {
                          setRole(value);
                          AssignRolesList(value.value);
                        }}
                        options={parent}
                        name="parent"
                        value={role}
                      />
                    </div>
                  </div>
                </div>
                {roleList.length > 0 && (
                  <table className="table display dataTable text-nowrap">
                    <thead>
                      <tr>
                        <th scope="col" className="text-center">
                          Sr. No.
                        </th>
                        <th scope="col" className="text-center">
                          Page Title
                        </th>
                        <th scope="col" className="text-center">
                          Add
                        </th>
                        <th scope="col" className="text-center">
                          View
                        </th>
                        <th scope="col" className="text-center">
                          Edit
                        </th>
                        <th scope="col" className="text-center">
                          Delete
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {roleList &&
                        roleList.map((v, i) => (
                          <tr>
                            <th scope="row" className="text-center">
                              {i + 1}
                            </th>
                            <td className="text-center">
                              {Utils.titleCase(v.name)}
                            </td>
                            {v.slug === "Coupons" ? (
                              <td className="text-center">
                                <div className="checkbox checkbox-primary">
                                  <input
                                    id={v.id}
                                    type="checkbox"
                                    checked={v.role_permission?.is_add == 1}
                                    onChange={(e) => toggleHandler(v, 1)}
                                  />
                                </div>
                              </td>
                            ) : v.parent_id === null ||
                              v.parent_id == 0 ||
                              v.slug === "event-management-registration" ? (
                              <td className="text-center">
                                <div className="checkbox checkbox-primary">
                                  <input
                                    id={v.id}
                                    type="checkbox"
                                    disabled
                                    checked={v.role_permission?.is_add == 1}
                                    onChange={(e) => toggleHandler(v, 1)}
                                  />
                                </div>
                              </td>
                            ) : (
                              <td className="text-center">
                                <div className="checkbox checkbox-primary">
                                  <input
                                    id={v.id}
                                    type="checkbox"
                                    checked={v.role_permission?.is_add == 1}
                                    onChange={(e) => toggleHandler(v, 1)}
                                  />
                                </div>
                              </td>
                            )}
                            {/* {v.parent_id === null ||
                            v.parent_id == 0 ||
                            v.slug === "event-management-registration" 
                            ? (
                              <td className="text-center">
                                <div className="checkbox checkbox-primary">
                                  <input
                                    id={v.id}
                                    type="checkbox"
                                    disabled
                                    checked={v.role_permission?.is_add == 1}
                                    onChange={(e) => toggleHandler(v, 1)}
                                  />
                                </div>
                              </td>
                            ) : (
                              
                              <td className="text-center">
                                <div className="checkbox checkbox-primary">
                                  <input
                                    id={v.id}
                                    type="checkbox"
                                    checked={v.role_permission?.is_add == 1}
                                    onChange={(e) => toggleHandler(v, 1)}
                                  />
                                </div>
                              </td>
                            )} */}

                            {v.parent_id === null || v.parent_id == 0 ? (
                              <td className="text-center">
                                <div className="checkbox checkbox-primary">
                                  <input
                                    id={v.id}
                                    type="checkbox"
                                    checked={v.role_permission?.is_view == 1}
                                    onChange={(e) => toggleHandler(v, 2)}
                                  />
                                </div>
                              </td>
                            ) : (
                              <td className="text-center">
                                <div className="checkbox checkbox-primary">
                                  <input
                                    id={v.id}
                                    type="checkbox"
                                    checked={v.role_permission?.is_view == 1}
                                    onChange={(e) => toggleHandler(v, 2)}
                                  />
                                </div>
                              </td>
                            )}
                            {v.slug === "Coupons" ? (
                              <td className="text-center">
                                <div className="checkbox checkbox-primary">
                                  <input
                                    id={v.id}
                                    type="checkbox"
                                    checked={v.role_permission?.is_edit == 1}
                                    onChange={(e) => toggleHandler(v, 3)}
                                  />
                                </div>
                              </td>
                            ) : v.parent_id === null ||
                              v.parent_id == 0 ||
                              v.slug === "event-management-registration" ? (
                              <td className="text-center">
                                <div className="checkbox checkbox-primary">
                                  <input
                                    id={v.id}
                                    type="checkbox"
                                    disabled
                                    checked={v.role_permission?.is_edit == 1}
                                    onChange={(e) => toggleHandler(v, 3)}
                                  />
                                </div>
                              </td>
                            ) : (
                              <td className="text-center">
                                <div className="checkbox checkbox-primary">
                                  <input
                                    id={v.id}
                                    type="checkbox"
                                    checked={v.role_permission?.is_edit == 1}
                                    onChange={(e) => toggleHandler(v, 3)}
                                  />
                                </div>
                              </td>
                            )}
                            {/* {v.parent_id === null ||
                            v.parent_id == 0 ||
                            v.slug === "event-management-registration" 
                           ? (
                              <td className="text-center">
                                <div className="checkbox checkbox-primary">
                                  <input
                                    id={v.id}
                                    type="checkbox"
                                    disabled
                                    checked={v.role_permission?.is_edit == 1}
                                    onChange={(e) => toggleHandler(v, 3)}
                                  />
                                </div>
                              </td>
                            ) : (
                              <td className="text-center">
                                <div className="checkbox checkbox-primary">
                                  <input
                                    id={v.id}
                                    type="checkbox"
                                    checked={v.role_permission?.is_edit == 1}
                                    onChange={(e) => toggleHandler(v, 3)}
                                  />
                                </div>
                              </td>
                            )} */}
                            {v.slug === "Coupons" ?<td className="text-center">
                                <div className="checkbox checkbox-primary">
                                  <input
                                    id={v.id}
                                    type="checkbox"
                                    
                                    checked={v.role_permission?.is_delete == 1}
                                    onChange={(e) => toggleHandler(v, 4)}
                                  />
                                </div>
                              </td>:v.parent_id === null ||
                            v.parent_id == 0 ||
                            v.slug === "event-management-registration" ? (
                              <td className="text-center">
                                <div className="checkbox checkbox-primary">
                                  <input
                                    id={v.id}
                                    type="checkbox"
                                    disabled
                                    checked={v.role_permission?.is_delete == 1}
                                    onChange={(e) => toggleHandler(v, 4)}
                                  />
                                </div>
                              </td>
                            ) : (
                              <td className="text-center">
                                <div className="checkbox checkbox-primary">
                                  <input
                                    id={v.id}
                                    type="checkbox"
                                    checked={v.role_permission?.is_delete == 1}
                                    onChange={(e) => toggleHandler(v, 4)}
                                  />
                                </div>
                              </td>
                            )}
                            {/* {v.parent_id === null ||
                            v.parent_id == 0 ||
                            v.slug === "event-management-registration" ? (
                              <td className="text-center">
                                <div className="checkbox checkbox-primary">
                                  <input
                                    id={v.id}
                                    type="checkbox"
                                    disabled
                                    checked={v.role_permission?.is_delete == 1}
                                    onChange={(e) => toggleHandler(v, 4)}
                                  />
                                </div>
                              </td>
                            ) : (
                              <td className="text-center">
                                <div className="checkbox checkbox-primary">
                                  <input
                                    id={v.id}
                                    type="checkbox"
                                    checked={v.role_permission?.is_delete == 1}
                                    onChange={(e) => toggleHandler(v, 4)}
                                  />
                                </div>
                              </td>
                            )} */}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

    <ToastContainer autoClose={1000} />
    </>
  );
}
