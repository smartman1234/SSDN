import React, { useState, useContext, useEffect } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Context } from "../../../container/Context";
import MetaTagsService from "../../../Services/SitePanelServices/MetaTagsService";

const MetaTagList = (props) => {
  const { login, permissions } = useContext(Context);
  const [loginData, setLoginData] = login;
  const [pagesData, setPagesData] = useState([]);
  const [rolePermission, setRolePermission] = permissions;
  const [values, setValues] = useState({
    page_name: "",
    slug: "",
    title: "",
    Keywords: "",
    description: "",
    breadcrumb: "",
  });
  const pages = [
    { label: "Assessment", value: "assessment" },
    { label: "Voucher", value: "voucher" },
    { label: "Home", value: "home" },
    { label: "Our Services", value: "service" },
    { label: "About Us", value: "about" },
    { label: "Cart", value: "cart" },
    { label: "My Assessment", value: "myAssessment" },
    { label: "Exam Result", value: "exam-result" },
    { label: "Login", value: "login" },
    { label: "Sign Up", value: "signup" },
    { label: "Forget Password", value: "forget-password" },
    { label: "E-Learning", value: "e-learning" },
    { label: "404", value: "404" },
    { label: "Privacy Policy", value: "privacy-policy" },
    { label: "Placement", value: "placement" },
    { label: "Franchise", value: "franchise" },
    { label: "International", value: "international" },
    { label: "Payment", value: "payment" },
    { label: "Contact", value: "contact-us" },
    { label: "Event", value: "event" },
    { label: "Upcoming Batches", value: "upcoming-batches" },
    { label: "Blogs", value: "blogs" },
    { label: "Testimonials", value: "testimonials" },
    { label: "terms & Condition", value: "term-conditions" },
    { label: "Course", value: "course" },
    { label: "Profile", value: "profile" },
  ];
  const metaService = new MetaTagsService();
  const onSubmit = async (values, { resetForm }) => {
    let obj = {
      page_name: values.page_name,
      page_slug: values.slug,
      meta_title: values.title,
      meta_keywords: values.Keywords,
      meta_description: values.description,
      breadcrumb: values.breadcrumb,
    };

    try {
      let response = await metaService.createmeta(obj);
      if (response) {
        toast.success("Record updated Successfully");
        resetForm();
        setValues({
          title: "",
          Keywords: "",
          description: "",
          breadcrumb: "",
        });
      }
    } catch (err) {
      throw err;
    }
  };

  const ValidateSchema = Yup.object().shape({
    page_name: Yup.string().required("Required"),
    slug: Yup.string().required("Required"),
    title: Yup.string().required("Required"),
    Keywords: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    breadcrumb: Yup.string().required("Required"),
  });

  const getMetaDataDetail = async (id) => {
    try {
      let response = await metaService.getMetadetail(id);
      if (response.status === "success") {
        setValues({
          page_name: response.data?.page_name,
          slug: response.data?.page_slug,
          title: response.data?.meta_title,
          Keywords: response.data?.meta_keywords,
          description: response.data?.meta_description,
          breadcrumb: response.data.breadcrumb,
        });
      }
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
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
          <h5>Meta Tags</h5>
        </div>
        <Formik
          initialValues={values}
          onSubmit={onSubmit}
          enableReinitialize={true}
          validationSchema={ValidateSchema}
        >
          {(props) => (
            <form className="form theme-form" onSubmit={props.handleSubmit}>
              <div className="card-body">
                <div className="row">
                  <div className="form-group col-md-12">
                    <label className="form-label">
                      Page / Block <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select"
                      name="page_name"
                      onChange={(e) => {
                        props.setFieldValue("page_name", e.target.value);
                        props.setFieldValue("slug", e.target.value);
                        getMetaDataDetail(e.target.value);
                      }}
                      value={props.values.page_name}
                    >
                      <option value={0}>Select page / block</option>
                      {pages.map((v, i) => {
                        return (
                          <option
                            value={v.value}
                            key={i}
                            selected={v.value === props.values.slug}
                          >
                            {v.label}
                          </option>
                        );
                      })}
                    </select>
                    {props.touched.page && props.errors.page ? (
                      <div className="formik-errors bg-error">
                        {props.errors.page}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-group col-md-12">
                    <label className="form-label">
                      Slug <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="slug"
                      type="text"
                      placeholder="Enter slug"
                      disabled
                      value={props.values.slug}
                    />
                    {props.touched.slug && props.errors.slug ? (
                      <div className="formik-errors bg-error">
                        {props.errors.slug}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-group col-md-6">
                    <label className="form-label">
                      Title <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="title"
                      onChange={props.handleChange}
                      value={props.values.title}
                      type="text"
                      placeholder="Enter title"
                    />
                    {props.touched.title && props.errors.title ? (
                      <div className="formik-errors bg-error">
                        {props.errors.title}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-group col-md-6">
                    <label className="form-label">
                      Keywords <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="Keywords"
                      type="text"
                      onChange={props.handleChange}
                      value={props.values.Keywords}
                      placeholder="Enter keywords"
                    />
                    {props.touched.Keywords && props.errors.Keywords ? (
                      <div className="formik-errors bg-error">
                        {props.errors.Keywords}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-group col-md-6">
                    <label className="form-label">
                      Description <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      name="description"
                      onChange={props.handleChange}
                      value={props.values.description}
                      placeholder="Enter description"
                    />
                    {props.touched.description && props.errors.description ? (
                      <div className="formik-errors bg-error">
                        {props.errors.description}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-group col-md-6">
                    <label className="form-label">
                      BreadCrumb <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      name="breadcrumb"
                      onChange={props.handleChange}
                      value={props.values.breadcrumb}
                      placeholder="Enter breadcrumb"
                    />
                    {props.touched.breadcrumb && props.errors.breadcrumb ? (
                      <div className="formik-errors bg-error">
                        {props.errors.breadcrumb}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-group col-md-12 text-end">
                    {rolePermission.is_add == 1 ? (
                      <button className="btn btn-primary me-2" type="submit">
                        Submit
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary me-2"
                        type="submit"
                        disabled
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
      <ToastContainer autoClose={1000} />
    </>
  );
};

export default MetaTagList;
