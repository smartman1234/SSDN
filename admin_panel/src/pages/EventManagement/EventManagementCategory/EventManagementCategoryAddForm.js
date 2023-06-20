import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from "../../../container/Context";
import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import EventService from "../../../Services/EventService/EventService";
const TestimonialsAddForm = () => {
  const serve = new EventService();
  const navigate = useNavigate();
  const params = useParams();
  const { last, voucherValues } = useContext(Context);
  const [voucher, setVoucher] = voucherValues;
  const [image, setImage] = useState("");
  const [value, setValue] = useState({
    name: "",
    slug: "",
    heading: "",
    meta_title: "",
    meta_keyword: "",
    meta_description: "",
    breadcrumb: "",
  });

  const ValidateSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    slug: Yup.string().required("Required"),
    heading: Yup.string().required("Required"),
    meta_title: Yup.string().required("Required"),
    meta_keyword: Yup.string().required("Required"),
    meta_description: Yup.string().required("Required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    if (values.id) {
      formData.set("id", values.id);
    }
    formData.set("name", values.name);
    formData.set("slug", values.slug.replaceAll(" ", "-").toLowerCase());
    formData.set("heading", values.heading);

    formData.set("meta_title", values.meta_title);
    formData.set("meta_keyword", values.meta_keyword);
    formData.set("meta_description", values.meta_description);

    const config = {
      headers: {
        content: "multipart/form-data",
        AUTHTOKEN: window.user?.data?.auth_token,
      },
    };
    if (values.id) {
      try {
        const response = await axios.post(
          process.env.REACT_APP_API_BASEURL + "event/update-event-category",
          formData,
          config
        );
        if (response.data?.status === "success") {
          toast.success("Category updated successfully");
          setTimeout(() => {
            navigate("/event-management-category");
          }, [2000]);
        } else {
          toast.err("error");
        }
      } catch (err) {
        throw err;
      }
    } else {
      axios
        .post(
          process.env.REACT_APP_API_BASEURL + "event/create-event-category",
          formData,
          config
        )
        .then((res) => {
          if (res.data?.status === "success") {
            toast.success(res.data.message);
            setTimeout(() => {
              navigate("/event-management-category");
            }, [2000]);
          } else if (res.data?.status === "fail") {
            toast.error(res.data.data?.name || res.data.data?.message);
          }
        })
        .catch((err) => {
          throw err;
        });
    }
  };

  useEffect(() => {
    if (params?.id) {
      CategoryByIdApi();
    }
  }, []);

  const CategoryByIdApi = async () => {
    try {
      let response = await serve.detail(params?.id);
      if (response) {
        setValue({
          id: response.data.id,
          name: response.data?.name,
          slug: response.data.slug,
          heading: response.data.heading,
          meta_title: response.data.meta_keyword,
          meta_keyword: response.data.meta_keyword,
          meta_description: response.data.meta_description,
        });
      } else {
        toast.error(response?.error);
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <div className="page-body">
        <Breadcrumb heading={params.id?"Edit Event Category":"Add Event Category"} />
        <div className="container-fluid support-ticket">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>{params.id? "Edit Event":"Add Event"}</h5>
                </div>
                <Formik
                  initialValues={value}
                  onSubmit={onSubmit}
                  enableReinitialize={true}
                  validationSchema={ValidateSchema}
                >
                  {(props) => (
                    <form className="" onSubmit={props.handleSubmit}>
                      <div className="card-body">
                        <div className="row">
                          <div className="form-group col-md-6">
                            <label className="form-label">Heading</label>
                            <input
                              className="form-control"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.heading}
                              name="heading"
                              type="text"
                              placeholder="Enter heading"
                            />{" "}
                            {props.touched.heading && props.errors.heading ? (
                              <div className="formik-errors bg-error">
                                {props.errors.heading}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">Meta Title</label>
                            <input
                              className="form-control"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.meta_title}
                              name="meta_title"
                              type="text"
                              placeholder="Enter meta title"
                            />{" "}
                            {props.touched.meta_title &&
                            props.errors.meta_title ? (
                              <div className="formik-errors bg-error">
                                {props.errors.meta_title}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Name <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              onChange={(event) => {
                                props.setFieldValue("name", event.target.value);
                                props.setFieldValue("slug", event.target.value);
                              }}
                              onBlur={props.handleBlur}
                              value={props.values.name}
                              name="name"
                              type="text"
                              placeholder="Enter name"
                            />
                            {props.touched.name && props.errors.name ? (
                              <div className="formik-errors bg-error">
                                {props.errors.name}
                              </div>
                            ) : null}
                          </div>

                          <div className="form-group col-md-6">
                            <label className="form-label">Slug</label>
                            <input
                              className="form-control"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.slug
                                .replaceAll(" ", "-")
                                .toLowerCase()}
                              name="slug"
                              type="text"
                              placeholder="Enter slug"
                            />{" "}
                            {props.touched.slug && props.errors.slug ? (
                              <div className="formik-errors bg-error">
                                {props.errors.slug}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">Meta Keyword</label>
                            <input
                              className="form-control"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.meta_keyword}
                              name="meta_keyword"
                              type="text"
                              placeholder="Enter meta keyword"
                            />{" "}
                            {props.touched.meta_keyword &&
                            props.errors.meta_keyword ? (
                              <div className="formik-errors bg-error">
                                {props.errors.meta_keyword}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Meta Description
                            </label>
                            <textarea
                              className="form-control"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.meta_description}
                              name="meta_description"
                              type="text"
                              placeholder="Enter meta description"
                            />{" "}
                            {props.touched.meta_description &&
                            props.errors.meta_description ? (
                              <div className="formik-errors bg-error">
                                {props.errors.meta_description}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="card-footer text-end">
                        <button className="btn btn-primary me-2" type="submit">
                          Submit
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      <ToastContainer autoClose={1000} />
      </div>
    </>
  );
};

export default TestimonialsAddForm;
