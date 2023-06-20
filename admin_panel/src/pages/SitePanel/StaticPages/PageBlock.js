import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import StaticpageService from "../../../Services/StaticPageService/StaticePageService";

export default function PageBlock({ pageName, slug }) {
  const staticeService = new StaticpageService();
  const [values, setValues] = useState({
    page_name: "",
    page_slug: "",
    title: "",
    description: "",
  });
  const onSubmit = (values) => {
    const formData = new FormData();

    formData.set("page_name", values.page_name);
    formData.set("page_slug", values.page_slug);
    formData.set("block_title", values.title);
    formData.set("block_description", values.description);

    const config = {
      headers: {
        content: "multipart/form-data",
        AUTHTOKEN: window.user?.data?.auth_token,
      },
    };
    axios
      .post(
        process.env.REACT_APP_API_BASEURL + "page/create-page-block",
        formData,
        config
      )
      .then((res) => {
        if (res.data?.status === "success") {
          toast.success("Record update successfully");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  const ValidateSchema = Yup.object().shape({
    title: Yup.mixed().required("Required"),
    description: Yup.string().required("Required"),
  });

  useEffect(() => {
    getPageBlockData();
  }, [slug]);

  const getPageBlockData = async () => {
    try {
      let response = await staticeService.getDetails(slug);

      if (response.status === "success") {

        setValues({
          page_name: response.data.page_name,
          page_slug: response.data.page_slug,
          title: response.data?.block_title,
          description: response.data.block_description,
        });
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <>
      <Formik
        initialValues={values}
        onSubmit={onSubmit}
        enableReinitialize={true}
        validationSchema={ValidateSchema}
      >
        {(props) => (
          <form className="form theme-form" onSubmit={props.handleSubmit}>
            <div className="row">
              <div className="form-group col-md-12"style={{ display: "none" }}>
                <label className="form-label">
                  Page / Blocks
                  <span className="text-danger">*</span>
                </label>

                <input
                  className="form-control"
                  name="page_name"
                  type="text"
                  placeholder="Enter slug"
                  disabled
                  defaultValue={props.values.page_name}
                />
                {props.touched.page_name && props.errors.page_name ? (
                  <div className="formik-errors bg-error">
                    {props.errors.page_name}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-12" style={{ display: "none" }}>
                <label className="form-label">
                  Slug <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="slug"
                  type="text"
                  placeholder="Enter slug"
                  disabled
                  defaultValue={props.values.page_slug}
                />
                {props.touched.slug && props.errors.slug ? (
                  <div className="formik-errors bg-error">
                    {props.errors.slug}
                  </div>
                ) : null}
              </div>

              <div className="form-group col-md-12">
                <label className="form-label">
                  Title <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="title"
                  type="text"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.title}
                  placeholder="Enter  title"
                />
                {props.touched.title && props.errors.title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.title}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-12">
                <label className="form-label">Description</label>
                <span className="text-danger">*</span>
                <textarea
                  className="form-control"
                  name="description"
                  type="text"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.description}
                  placeholder="Enter  description"
                />
                {props.touched.description && props.errors.description ? (
                  <div className="formik-errors bg-error">
                    {props.errors.description}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="form-group col-md-12 text-end">
              <button className="btn btn-primary me-2" type="submit">
                Submit
              </button>
            </div>
          </form>
        )}
      </Formik>
    <ToastContainer autoClose={1000} />
    </>
  );
}
