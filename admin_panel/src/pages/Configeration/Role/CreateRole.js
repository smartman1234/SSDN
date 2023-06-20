import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import axios from "axios";
import Select from "react-select";
import ELearningCategoryService from "../../../Services/ELearningService/ELearningService";
import RoleService from "../../../Services/ConfigerationService/RoleService";

export default function CreateRole() {
  const [allCategoryList, setAllCategoryList] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const serve = new RoleService();
  const [parent, setCategory] = useState([]);
  const [values, setValues] = useState({
    name: "",
    description: "",
    authority:null
  });

  const VoucherSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    authority:Yup.number().required("Required")
  });

  const onSubmit = async (values) => {
    const formData = new FormData();
    if (values.id) {
      formData.set("id", values.id);
    }
    formData.set("name", values.name);
    formData.set("description", values.description);
    formData.set("authority", values.authority);
    const config = {
      headers: {
        content: "multipart/form-data",
        AUTHTOKEN: window.user?.data?.auth_token,
      },
    };
    if (values.id) {
      try {
        const response = await axios.post(
          process.env.REACT_APP_API_BASEURL + `admin/update-role`,
          formData,
          config
        );
        if (response.data?.status === "success") {
          toast.success("Record update successfully");
          setTimeout(() => {
            navigate("/roles");
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
          process.env.REACT_APP_API_BASEURL + "admin/create-role",
          formData,
          config
        )
        .then((res) => {
          if (res.data?.status === "success") {
            toast.success("Record created successfully");
            setTimeout(() => {
              navigate("/roles");
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
      if (response.status === "success") {
        setValues({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          authority:response.data.authority
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
  }, []);

  const name = (
    <Link to="/roles" className="btn btn-primary">
      Back
    </Link>
  );
  return (
    <>
      <div className="page-body">
        <Breadcrumb heading={params.id ? "Edit Role" : "Add Role"} add={name} />
        <div className="container-fluid support-ticket">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>
                    {params.id ? "Edit Role" : "Add Role"}
                  </h5>
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
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Role Name <span className="text-danger">*</span>
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
                              placeholder="Enter Role name"
                            />
                            {props.touched.name && props.errors.name ? (
                              <div className="formik-errors bg-error">
                                {props.errors.name}
                              </div>
                            ) : null}
                          </div>

                          <div className="form-group col-md-6">
                            <label className="form-label">
                             Authority <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              value={props.values.authority}
                              onChange={(event) => {
                                props.setFieldValue("authority", event.target.value);
                              }}
                              onBlur={props.handleBlur}
                              name="authority"
                              type="number"
                              placeholder="Enter Role name"
                            />
                            {props.touched.authority && props.errors.authority ? (
                              <div className="formik-errors bg-error">
                                {props.errors.authority}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-12">
                            <label className="form-label">
                              Role Description{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <Editor
                              textareaName="long_description"
                              apiKey="j1g23ad6n3ra8f5lbnbe3nldrui85ygcv9zwc1ao74848kmj"
                              init={{
                                plugins: [
                                  "advlist",
                                  "autolink",
                                  "lists",
                                  "link",
                                  "image",
                                  "charmap",
                                  "preview",
                                  "anchor",
                                  "searchreplace",
                                  "visualblocks",
                                  "code",
                                  "fullscreen",
                                  "insertdatetime",
                                  "media",
                                  "table",
                                  "help",
                                  "wordcount",
                                ],
                                toolbar:
                                  " undo redo | blocks | image code | formatselect | bold italic backcolor | \
                                            alignleft aligncenter alignright alignjustify | \
                                            bullist numlist outdent indent | removeformat | help ",
                              }}
                              value={props.values.description}
                              onEditorChange={(e) =>
                                props.setFieldValue("description", e)
                              }
                            />
                            {props.touched.description &&
                            props.errors.description ? (
                              <div className="formik-errors bg-error">
                                {props.errors.description}
                              </div>
                            ) : null}
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
