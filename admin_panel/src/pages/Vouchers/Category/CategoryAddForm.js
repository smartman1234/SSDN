import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import VoucherCategoryService from "../../../Services/VoucherService/VoucherCategoryService";
import { useNavigate } from "react-router";
import Breadcrumb from "../../BreadCrumb/Breadcrumb";

const CategoryAddForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [parentCategory, setParentCategory] = useState([]);
  const [loader, setLoader] = useState(false);
  const [value, setValue] = useState({
    name: "",
    category: 0,
    slug: "",
    heading: "",
    meta_title: "",
    meta_keyword: "",
    description: "",
  });

  const voucherCategoryServe = new VoucherCategoryService();

  useEffect(() => {
    getParentCategory();
    if (params.id) {
      VoucherCategoryByIdApi();
    }
  }, []);

  const VoucherCategoryByIdApi = async () => {
    try {
      let response = await voucherCategoryServe.getVoucherCategoryDetails(
        params?.id
      );
      if (response) {
        setValue({
          id: response.data.id,
          name: response.data?.name,
          slug: response.data.slug,
          heading: response.data.heading,
          category: response.data.parent_id,
          meta_keyword: response.data.meta_keyword,
          meta_title: response.data.meta_title,
          description: response.data.meta_description,
        });
      } else {
        toast.error(response?.error);
      }
    } catch (err) {
      throw err;
    }
  };

  const getParentCategory = async () => {
    let activity = {
      parent_id: 0,
    };
    try {
      let response = await voucherCategoryServe.parentCategory(activity);
      if (response) {
        setParentCategory(response.data);
      }
    } catch (err) {
      throw err;
    }
  };

  const onSubmit = async (values) => {
    let activity = {
      name: values.name,
      slug: values.slug.replaceAll(" ", "-").toLowerCase(),
      id: values.id,
    };
    let obj = {
      name: values.name,
      slug: values.slug.replaceAll(" ", "-").toLowerCase(),
      parent_id: values.category,
       heading: values.heading,
      meta_title: values.meta_title,
      meta_keyword: values.meta_keyword,
      meta_description: values.description,
    };
    try {
      setLoader(true);
      let response = await voucherCategoryServe.uniqueName(activity);
      if (response.status === "success") {
        if (values.id) {
          obj.id = values.id;
          let response = await voucherCategoryServe.updateVoucherCategory(obj);
          if (response.status === "success") {
            setLoader(false);
            toast.success(response.message);
            setTimeout(() => {
              navigate("/vouchers-category");
            }, [2000]);
          } else {

            toast.error(response.message);
            setLoader(false);
          }
        } else {
          let response = await voucherCategoryServe.createVoucherCategory(obj);
          if (response.status === "success") {
            setLoader(false);
            toast.success("Category added successfully");
            setTimeout(() => {
              navigate("/vouchers-category");
            }, [2000]);
          } else {
            toast.error(response.message);
            setLoader(false);
          }
        }
      } else {
        toast.error(response.data?.name || response.data?.slug);
      }
    } catch (err) {
      throw err;
    }
  };

  const ValidateSchema = Yup.object().shape({
    name: Yup.string().required(),
    slug: Yup.string().required(),
    heading: Yup.string().required(),
    description: Yup.string().required(),
    meta_title: Yup.string().required(),
    meta_keyword: Yup.string().required(),
  });

  const ResetForm = () => {
    window.location.reload();
    setValue({
      name: "",
      slug: "",
      description: "",
      meta_keyword: "",
      meta_title: "",
      heading: "",
      category: "",
    });
  };

  const name = (
    <Link to="/vouchers-category">
      <button className="btn btn-primary" id="nextBtn" type="button">
        Back
      </button>
    </Link>
  );

  return (
    <>
      <div className="page-body">
        <Breadcrumb heading=" Voucher Category" params={params.id} add={name} />
        <div
          className="container-fluid support-ticket"
          style={loader ? { opacity: "0.4" } : {}}
        >
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>
                    {params.id
                      ? "Edit Voucher Category"
                      : "Add Voucher Category"}
                  </h5>
                </div>
                <Formik
                  initialValues={value}
                  onSubmit={onSubmit}
                  enableReinitialize={true}
                  validationSchema={ValidateSchema}
                >
                  {(props) => (
                    <form
                      className="form theme-form"
                      onSubmit={props.handleSubmit}
                    >
                      <div className="card-body">
                        <div className="row">
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Name <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              name="name"
                              type="text"
                              autoComplete="false"
                              placeholder="Enter voucher category name"
                              onChange={(event) => {
                                props.setFieldValue("name", event.target.value);
                                if(!params.id){
                                  props.setFieldValue("slug", event.target.value);
                                }
                               
                              }}
                              onBlur={props.handleBlur}
                              value={props.values.name}
                            />
                            {props.touched.name && props.errors.name ? (
                              <div className="formik-errors bg-error">
                                {props.errors.name}
                              </div>
                            ) : null}
                          </div>
                          {params.id ? (
                            <div className="form-group col-md-6">
                              <label className="form-label">
                                Parent Category
                              </label>
                              <select
                                className="form-select"
                                autoComplete="false"
                                name="category"
                                disabled
                                onChange={(e) => {
                                  props.setFieldValue(
                                    "category",
                                    e.target.value
                                  );
                                }}
                                value={props.values.parent_id}
                              >
                                <option value={0}>
                                  Select parent category
                                </option>
                                {parentCategory?.map((v, i) => (
                                  <option key={i} value={v.id}>
                                    {v.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          ) : (
                            <div className="form-group col-md-6">
                              <label className="form-label">
                                Parent Category
                              </label>
                              <select
                                className="form-select"
                                autoComplete="false"
                                name="category"
                                onChange={(e) => {
                                  props.setFieldValue(
                                    "category",
                                    e.target.value
                                  );
                                }}
                                value={props.values.parent_id}
                              >
                                <option value={0}>
                                  Select parent category
                                </option>
                                {parentCategory?.map((v, i) => (
                                  <option key={i} value={v.id}>
                                    {v.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}

                          <div className="form-group col-md-6">
                            <label className="form-label">Slug</label>
                            <input
                              className="form-control"
                              name="slug"
                              type="text"
                              autoComplete="false"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.slug
                                .replaceAll(" ", "-")
                                .toLowerCase()}
                                placeholder="Enter slug"
                            />
                            {props.touched.slug && props.errors.slug ? (
                              <div className="formik-errors bg-error">
                                {props.errors.slug}
                              </div>
                            ) : null}
                          </div>

                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Heading <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              name="heading"
                              autoComplete="false"
                              type="text"
                              placeholder="Enter voucher category heading"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.heading}
                            />
                            {props.touched.heading && props.errors.heading ? (
                              <div className="formik-errors bg-error">
                                {props.errors.heading}
                              </div>
                            ) : null}
                          </div>

                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Meta Tag Title
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              name="meta_title"
                              type="text"
                              autoComplete="false"
                              placeholder="Enter meta tag title"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.meta_title}
                            />
                            {props.touched.meta_title &&
                            props.errors.meta_title ? (
                              <div className="formik-errors bg-error">
                                {props.errors.meta_title}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Keywords <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              name="meta_keyword"
                              type="text"
                              autoComplete="false"
                              placeholder="Enter voucher category keywords"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.meta_keyword}
                            />
                            {props.touched.meta_keyword &&
                            props.errors.meta_keyword ? (
                              <div className="formik-errors bg-error">
                                {props.errors.meta_keyword}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-12">
                            <label className="form-label">
                              Description <span className="text-danger">*</span>
                            </label>
                            <textarea
                              className="form-control"
                              name="description"
                              autoComplete="false"
                              placeholder="Enter meta tag description"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.description}
                            />
                            {props.touched.description &&
                            props.errors.description ? (
                              <div className="formik-errors bg-error">
                                {props.errors.description}
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
              <ToastContainer autoClose={1000} />
              </div>
            </div>
          </div>
        </div>
        {loader && <div className="loaders"></div>}
      </div>
    </>
  );
};

export default CategoryAddForm;
