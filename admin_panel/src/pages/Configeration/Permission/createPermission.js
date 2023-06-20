import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import axios from "axios";
import Select from "react-select";
import PermissionService from "../../../Services/ConfigerationService/PermissionService";

export default function CreatePermission() {
  const [allCategoryList, setAllCategoryList] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const serve = new PermissionService();
  const [parent, setCategory] = useState([]);
  const [values, setValues] = useState({
    name: "",
    slug: "",
    parent: "",
    menu: "",
  });

  const VoucherSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    slug: Yup.string().required("Required"),
    menu: Yup.string().required("Required"),
  });

  const onSubmit = async (values) => {
    const formData = new FormData();
    if (values.id) {
      formData.set("id", values.id);
    }
    formData.set("name", values.name);
    formData.set("slug", values.slug);
    formData.set("parent_id", values?.parent?.value);
    formData.set("is_menu", values.menu);
    const config = {
      headers: {
        content: "multipart/form-data",
        AUTHTOKEN: window.user?.data?.auth_token,
      },
    };
    if (values.id) {
      try {
        const response = await axios.post(
          process.env.REACT_APP_API_BASEURL + `admin/update-permission`,
          formData,
          config
        );
        if (response.data?.status === "success") {
          toast.success("Record update successfully");
          setTimeout(() => {
            navigate("/permissions");
          }, [1000]);
        } else {
          toast.error(response.data?.message);
        }
      } catch (err) {
        throw err;
      }
    } else {
      axios
        .post(
          process.env.REACT_APP_API_BASEURL + "admin/create-permission",
          formData,
          config
        )
        .then((res) => {
          if (res.data?.status === "success") {
            toast.success("Record created successfully");
            setTimeout(() => {
              navigate("/permissions");
            }, [1000]);
          } else if (res.data?.status === "fail") {
            toast.error("Name has been already taken !");
          }
        })
        .catch((err) => {
          throw err;
        });
    }
  };

  const getDetail = async () => {
    try {
      let response = await serve.detail(params.id);
      const parent={}
      parent["value"]=response.data?.parent?.id
      parent["label"]=response.data?.parent?.name
      if (response.status === "success") {
        setValues({
          id: response.data.id,
          name: response.data.name,
          parent: parent,
          slug:response.data.slug,
          menu:response.data.is_menu
        });
      } else {
      }
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    if (params.id) {
      getDetail();
    }
    PermissionsApi();
  }, []);

  const PermissionsApi = async () => {
    try {
      let response = await serve.permissionlist();
      if (response) {
        setCategory(response.data);
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
  return (
    <>
      <div className="page-body">
        <Breadcrumb
          heading={params.id ? "Edit Permission Page" : "Add Permission Page"}
          add={name}
        />
        <div className="container-fluid support-ticket">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>{params.id ? "Edit Permission Page" : "Add Permission Page"}</h5>
                </div>
                <Formik
                  initialValues={values}
                  validationSchema={VoucherSchema}
                  onSubmit={onSubmit}
                  enableReinitialize={true}
                >
                  {(props) => (
                    <form className="" onSubmit={props.handleSubmit}>
                      <div className="card-body">
                        <div className="row">
                          <div className="form-group col-md-12">
                            <label>
                              Menu Name <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              value={props.values.name}
                              onChange={(event) => {
                                props.setFieldValue("name", event.target.value);
                              }}
                              onBlur={props.handleBlur}
                              name="name"
                              type="text"
                              placeholder="Enter menu role name"
                            />
                            {props.touched.name && props.errors.name ? (
                              <div className="formik-errors bg-error">
                                {props.errors.name}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="lname">
                              Menu Slug <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              id="lname"
                              type="text"
                              name="slug"
                              placeholder="Enter slug"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.slug}
                            />
                            {props.touched.slug && props.errors.slug ? (
                              <div className="formik-errors bg-error">
                                {props.errors.slug}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="contact">
                              Parent <span className="text-danger">*</span>
                            </label>
                            <Select
                              onChange={(value) =>
                                props.setFieldValue("parent", value)
                              }
                              options={parent}
                              name="parent"
                              value={props.values.parent}
                            />
                            {props.touched.parent && props.errors.parent ? (
                              <div className="formik-errors bg-error">
                                {props.errors.parent}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group m-t-15 m-checkbox-inline mb-0 col-md-4">
                            <label htmlFor="contact">
                              Menu <span className="text-danger">*</span>
                            </label>
                            <div>
                              {" "}
                              <div className="checkbox checkbox-dark">
                                <input
                                  id="inline-1"
                                  type="checkbox"
                                  name="menu"
                                  value="1"
                                  onChange={(e) => {
                                    props.setFieldValue("menu", e.target.value);
                                  }}
                                  checked={"1" == props.values.menu}
                                  onBlur={props.handleBlur}
                                />
                                <label htmlFor="inline-1">Yes</label>
                              </div>
                              <div className="checkbox checkbox-dark">
                                <input
                                  id="inline-2"
                                  type="checkbox"
                                  name="menu"
                                  value="0"
                                  onChange={(e) => {
                                    props.setFieldValue("menu", e.target.value);
                                  }}
                                  onBlur={props.handleBlur}
                                />
                                <label htmlFor="inline-2">No</label>
                              </div>{" "}
                              {props.touched.menu && props.errors.menu ? (
                                <div className="formik-errors bg-error">
                                  {props.errors.menu}
                                </div>
                              ) : null}
                            </div>
                          </div>

                          <div className="card-footer text-end">
                            <button className="btn btn-primary" type="submit">
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>

    <ToastContainer autoClose={1000} />
    </>
  );
}
