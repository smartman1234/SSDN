import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "@tinymce/tinymce-react";
import Select from "react-select";
import AssessmentService from "../../../Services/AssessmentService";
import { Context } from "../../../container/Context";

function CategoryForm() {
  const assessmentServe = new AssessmentService();
  const navigate = useNavigate();
  const params = useParams();
  const [basicDetail, setBasicDetail] = useState(true);
  const [voucherForm, setVoucherForm] = useState(false);
  const { last, voucherValues } = useContext(Context);
  const [voucher, setVoucher] = voucherValues;
  const [parentList, setParentList] = useState([{}]);
  const [eventForm, setEventForm] = useState(false);
  const [allValues, setAllvalues] = useState({});
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [metaForm, setMetaForm] = useState(false);
  const [message, setMessage] = useState(null);
  const [value, setValue] = useState({
    name: "",
    slug: "",
    heading: "",
    parent: "",
    description: "",
    image: "",
    oldImage: "",
    image_alt_tag: "",
  });
  const [voucherIds, setVoucherIds] = useState({ voucher_ids: [] });
  const [metavalues, setMetaValues] = useState({
    meta_title: "",
    meta_keyword: "",
    meta_description: "",
  });
  const [eventvalues, setEventValues] = useState({
    breadcrumb: "",
  });

  const prevBtnHandle = () => {
    setBasicDetail(true);
    setVoucherForm(false);
  };

  const metaBackBtn = () => {
    setBasicDetail(true);
    setVoucherForm(false);
    setMetaForm(false);
    setEventForm(false);
  };

  const eventBackBtn = () => {
    setBasicDetail(false);
    setVoucherForm(false);
    setEventForm(false);
    setMetaForm(true);
  };
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];
  const ValidateSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    slug: Yup.string().required("Required"),
    heading: Yup.string().required("Required"),

    image: Yup.mixed().required("You need to provide a image").nullable(),
    image_alt_tag: Yup.string().required("Required"),
  });
  const MetaSchema = Yup.object().shape({
    meta_title: Yup.string().required("Required"),
    meta_keyword: Yup.string().required("Required"),
    meta_description: Yup.string().required("Required"),
  });

  const imageApi = async (props, name, file, type) => {
    const imageData = new FormData();
    imageData.append("image", file);
    imageData.append("type", type);

    const config = {
      headers: {
        content: "multipart/form-data",
        AUTHTOKEN: window.user?.data?.auth_token,
      },
    };
    axios
      .post(
        process.env.REACT_APP_API_BASEURL + "upload-image",
        imageData,
        config
      )
      .then((res) => {
        if (res.data?.status === "success") {
          props.setFieldValue(name, res.data.data);
          setImage(res.data.path);
          toast.success("Image uploaded successfully");
        } else if (res.data?.status === "fail") {
          toast.error("image size is too large");
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  const onSubmit = async (values) => {
    setValue(values);

    let obj = {
      name: values.name,
      slug: values.slug.replaceAll(" ", "-"),
      id: eventvalues.id,
    };
    try {
      let response = await assessmentServe.uniqueValues(obj);
      if (response.status === "success") {
        setBasicDetail(false);
        setVoucherForm(false);
        setMetaForm(true);
      } else {
        toast.error(response.data.name || response.data.slug);
        setBasicDetail(true);
        setVoucherForm(false);
      }
    } catch (err) {
      throw err;
    }
  };

  const onSubmitVoucher = async (values) => {
    setVoucherIds(values);
    setBasicDetail(false);
    setVoucherForm(false);
    setMetaForm(true);
  };

  const metaFormHandle = async (values) => {
    setMetaValues(values);
    setBasicDetail(false);
    setVoucherForm(false);
    setMetaForm(false);
    setEventForm(true);
  };

  const EventFormHandle = async (values, { resetForm }) => {
    setEventValues();
    const arr =
      voucherIds?.voucher_ids &&
      voucherIds?.voucher_ids.map((v) => ({
        value: v.value,
        label: v.label,
      }));

    setAllvalues({ ...value, ...voucherIds, ...metavalues, ...eventvalues });
    const formData = new FormData();
    if (values.id) {
      formData.set("id", values.id);
    }
    formData.set("name", value.name);
    formData.set("slug", value.slug.replaceAll(" ", "-").toLowerCase());
    formData.set("heading", value.heading);
    formData.set("parent_id", parseInt(value.parent));
    formData.set("description", value.description);
    if (typeof value.image === "undefined") {
    } else {
      formData.append("image", value.image);
    }
    formData.set("image_alt_tag", value.image_alt_tag);
    formData.set("voucher_ids", JSON.stringify(arr));
    formData.set("meta_title", metavalues.meta_title);
    formData.set("meta_keyword", metavalues.meta_keyword);
    formData.set("meta_description", metavalues.meta_description);
    formData.set(
      "breadcrumb",
      values.breadcrumb === "" ? "" : values.breadcrumb
    );

    const config = {
      headers: {
        content: "multipart/form-data",
        AUTHTOKEN: window.user?.data?.auth_token,
      },
    };
    if (values.id) {
      try {
        const response = await axios.post(
          process.env.REACT_APP_API_BASEURL + "update-category",
          formData,
          config
        );
        if (response.data?.status === "success") {
          toast.success("Category updated successfully");
          setTimeout(() => {
            navigate("/assessment-category");
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
          process.env.REACT_APP_API_BASEURL + "create-category",
          formData,
          config
        )
        .then((res) => {
          if (res.data?.status === "success") {
            toast.success(res.data.message);
            setMessage(res.data.message);
            setTimeout(() => {
              navigate("/assessment-category");
            }, [2000]);
          } else {
            toast.error(res?.data?.data?.message);
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
    voucherListApi();
    ParentListApi();
  }, []);

  const voucherListApi = async () => {
    try {
      let response = await assessmentServe.voucherList();
      if (response) {
        let items = [];
        for (const i in response.data) {
          items.push({
            value: response.data[i].id,
            label: response.data[i].name,
          });
        }
        setVoucher(items);
      }
    } catch (err) {
      throw err;
    }
  };

  const ParentListApi = async () => {
    let obj = {
      parent_id: 0,
    };
    try {
      let response = await assessmentServe.parentList(obj);
      if (response) {
        setParentList(response.data);
      }
    } catch (err) {
      throw err;
    }
  };

  const CategoryByIdApi = async () => {
    try {
      let response = await assessmentServe.getCategoryDetails(params?.id);
      if (response) {
        setValue({
          name: response.data?.name,
          slug: response.data.slug,
          heading: response.data.heading,
          parent: response.data.parent_id,
          image: response.data.image,
          image_alt_tag: response.data.image_alt_tag,
          description: response.data.description,
        });
        setVoucherIds({
          voucher_ids: JSON.parse(response.data.voucher_ids),
        });
        setMetaValues({
          meta_title: response.data.meta_title,
          meta_keyword: response.data.meta_keyword,
          meta_description: response.data.meta_description,
        });
        setEventValues({
          breadcrumb:
            response.data.breadcrumb === null ? "" : response.data.breadcrumb,
          id: response.data.id,
        });
      } else {
        toast.error(response?.error);
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className="page-body">
      <div className="container-fluid">
        <div className="page-header">
          <div className="row">
            <div className="col-sm-6">
              <h3>Assessment Categories</h3>
            </div>
            <div className="col-sm-6">
              <div className="text-end btn-mb">
                {message && <p>{message}</p>}
                <Link to="/assessment-category">
                  <button
                    className="btn btn-primary"
                    id="nextBtn"
                    type="button"
                  >
                    Back
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              {(basicDetail && (
                <div className="card-header">
                  <h5>
                    {eventvalues.id ? "Edit" : "Add"} Assessment Categories
                  </h5>
                </div>
              )) ||
                (voucherForm && (
                  <div className="card-header">
                    <h5>Voucher list</h5>
                  </div>
                )) ||
                (metaForm && (
                  <div className="card-header">
                    <h5>Meta Tag Options</h5>
                  </div>
                )) ||
                (eventForm && (
                  <div className="card-header">
                    <h5>Breadcrumb / Event Scheme</h5>
                  </div>
                ))}
              <div className="card-body">
                <Formik
                  initialValues={value}
                  onSubmit={onSubmit}
                  enableReinitialize={true}
                  validationSchema={ValidateSchema}
                >
                  {(props) => (
                    <form className="" onSubmit={props.handleSubmit}>
                      {basicDetail && (
                        <>
                          <div style={basicDetail && { display: "block" }}>
                            <div className="row">
                              <div className="form-group col-md-6">
                                <label htmlFor="name">
                                  Category Name{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  id="name"
                                  type="text"
                                  name="name"
                                  placeholder="Enter category name"
                                  onChange={(event) => {
                                    props.setFieldValue(
                                      "name",
                                      event.target.value
                                    );
                                    if (!params.id) {
                                      props.setFieldValue(
                                        "slug",
                                        event.target.value
                                      );
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
                              <div className="form-group col-md-6">
                                <label htmlFor="lname">
                                  Slug <span className="text-danger">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  id="lname"
                                  type="text"
                                  name="slug"
                                  placeholder="Enter slug"
                                  onChange={props.handleChange}
                                  onBlur={props.handleBlur}
                                  value={props.values.slug
                                    .replaceAll(" ", "-")
                                    .toLowerCase()}
                                />
                                {props.touched.slug && props.errors.slug ? (
                                  <div className="formik-errors bg-error">
                                    {props.errors.slug}
                                  </div>
                                ) : null}
                              </div>
                              <div className="form-group col-md-6">
                                <label htmlFor="contact">
                                  Category Heading{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  className="form-control digits"
                                  id="contact"
                                  type="text"
                                  name="heading"
                                  placeholder="Enter category heading"
                                  onChange={props.handleChange}
                                  onBlur={props.handleBlur}
                                  value={props.values.heading}
                                />
                                {props.touched.heading &&
                                props.errors.heading ? (
                                  <div className="formik-errors bg-error">
                                    {props.errors.heading}
                                  </div>
                                ) : null}
                              </div>
                              <div className="form-group  col-md-6">
                                <label htmlFor="contact">Parent </label>
                                <select
                                  name="parent"
                                  onChange={(e) => {
                                    props.setFieldValue(
                                      "parent",
                                      e.target.value
                                    );
                                  }}
                                  className="form-select digits"
                                  value={props.values.parent}
                                >
                                  <option value="0">
                                    Select parent category
                                  </option>
                                  {parentList &&
                                    parentList.map((v, index) => (
                                      <option key={index} value={v.id}>
                                        {v.name}
                                      </option>
                                    ))}
                                </select>
                              </div>
                              <div className="form-group col-md-12">
                                <label htmlFor="contact">Description</label>

                                <Editor
                                  textareaName="content"
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
                                    props.handleChange({
                                      target: { name: "description", value: e },
                                    })
                                  }
                                />
                                {props.touched.description &&
                                props.errors.description ? (
                                  <div className="formik-errors bg-error">
                                    {props.errors.description}
                                  </div>
                                ) : null}
                              </div>
                              <div className="form-group col-md-6">
                                <label htmlFor="contact">
                                  Image <span className="text-danger">*</span>
                                </label>
                                <input
                                  className="form-control digits"
                                  id="contact"
                                  type="file"
                                  accept="image/*"
                                  name="image"
                                  onChange={(event) => {
                                    imageApi(
                                      props,
                                      "image",
                                      event.target.files[0],
                                      "assessment_category"
                                    );
                                  }}
                                />
                                {props.touched.image && props.errors.image ? (
                                  <div className="formik-errors bg-error">
                                    {props.errors.image}
                                  </div>
                                ) : null}
                              </div>
                              <div className="form-group col-md-6">
                                <label htmlFor="contact">
                                  Image Alt Tag{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  className="form-control digits"
                                  id="contact"
                                  type="text"
                                  name="image_alt_tag"
                                  placeholder="Alt tag for Icon"
                                  onChange={props.handleChange}
                                  onBlur={props.handleBlur}
                                  value={props.values.image_alt_tag}
                                />
                                {props.touched.image_alt_tag &&
                                props.errors.image_alt_tag ? (
                                  <div className="formik-errors bg-error">
                                    {props.errors.image_alt_tag}
                                  </div>
                                ) : null}
                              </div>
                              {(props.values.image || image) && (
                                <div className="input-group-append col-md-6">
                                  <span
                                    className=""
                                    style={{
                                      height: "40px",
                                      padding: "0px",
                                      marginTop: "22px",
                                      marginLeft: "-6px",
                                    }}
                                  >
                                    {props.values.image && (
                                      <img
                                        src={image || props.values?.image}
                                        alt="image"
                                        width="50px"
                                      />
                                    )}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div>
                            <div className="text-end btn-mb">
                              <button
                                className="btn btn-primary"
                                type="submit"
                                style={basicDetail && { display: "inline" }}
                              >
                                Next
                                <i className="fa-solid fa-chevron-right"></i>
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </form>
                  )}
                </Formik>
                <Formik
                  initialValues={voucherIds}
                  onSubmit={onSubmitVoucher}
                  enableReinitialize={true}
                >
                  {(props) => (
                    <form className="" onSubmit={props.handleSubmit}>
                      {voucherForm && (
                        <>
                          <div
                            className="tab"
                            style={voucherForm && { display: "block" }}
                          >
                            <div className="form-group">
                              <label>Voucher List</label>
                            
                              <Select
                                onChange={(value) =>
                                  props.setFieldValue("voucher_ids", value)
                                }
                                options={voucher}
                                value={props.values?.voucher_ids}
                                name="voucher_ids"
                                isMulti
                              />
                            </div>
                          </div>
                          <div>
                            <div className="text-end btn-mb">
                              <button
                                className="btn btn-secondary me-3"
                                type="button"
                                onClick={prevBtnHandle}
                                style={voucherForm && { display: "inline" }}
                              >
                                <i className="fa-solid fa-chevron-left"></i>
                                Previous
                              </button>
                              <button className="btn btn-primary" type="submit">
                                Next
                                <i className="fa-solid fa-chevron-right"></i>
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </form>
                  )}
                </Formik>
                <Formik
                  initialValues={metavalues}
                  onSubmit={metaFormHandle}
                  enableReinitialize={true}
                  validationSchema={MetaSchema}
                >
                  {(props) => (
                    <form className="" onSubmit={props.handleSubmit}>
                      {metaForm && (
                        <>
                          <div
                            className="tab"
                            style={metaForm && { display: "block" }}
                          >
                            <div className="form-group">
                              <label htmlFor="exampleFormControlInput1">
                                Title <span className="text-danger">*</span>
                              </label>
                              <input
                                className="form-control digits"
                                type="text"
                                name="meta_title"
                                placeholder="Enter title"
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
                            <div className="form-group">
                              <label className="control-label">
                                Keywords <span className="text-danger">*</span>
                              </label>
                              <input
                                className="form-control digits"
                                placeholder="Enter meta keywords"
                                type="text"
                                name="meta_keyword"
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
                            <div className="form-group">
                              <label className="control-label">
                                Description{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <textarea
                                className="form-control digits"
                                placeholder="Enter meta description"
                                type="text"
                                name="meta_description"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.meta_description}
                              />
                              {props.touched.meta_description &&
                              props.errors.meta_description ? (
                                <div className="formik-errors bg-error">
                                  {props.errors.meta_description}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div>
                            <div className="text-end btn-mb">
                              <button
                                className="btn btn-secondary me-3"
                                id="activeForm"
                                type="button"
                                onClick={metaBackBtn}
                                style={
                                  metaForm
                                    ? { display: "inline" }
                                    : { display: "none" }
                                }
                              >
                                <i className="fa-solid fa-chevron-left"></i>
                                Previous
                              </button>
                              <button
                                className="btn btn-primary"
                                id="nextBtn"
                                type="submit"
                              >
                                Next
                                <i className="fa-solid fa-chevron-right"></i>
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </form>
                  )}
                </Formik>
                <Formik
                  initialValues={eventvalues}
                  onSubmit={EventFormHandle}
                  enableReinitialize={true}
                >
                  {(props) => (
                    <form className="" onSubmit={props.handleSubmit}>
                      {eventForm && (
                        <>
                          <div
                            className="tab"
                            style={eventForm && { display: "block" }}
                          >
                            <div className="form-group">
                              <label className="control-label">
                                Description
                              </label>
                              <textarea
                                className="form-control mt-1"
                                type="text"
                                placeholder="Scheme for Breadcrumb & Event"
                                name="breadcrumb"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values?.breadcrumb}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="text-end btn-mb">
                              <button
                                className="btn btn-secondary me-3"
                                id="activeForm"
                                type="button"
                                onClick={eventBackBtn}
                                style={eventForm && { display: "inline" }}
                              >
                                <i className="fa-solid fa-chevron-left"></i>
                                Previous
                              </button>
                              <button
                                className="btn btn-primary"
                                id="nextBtn"
                                type="submit"
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </form>
                  )}
                </Formik>
                <div className="text-center">
                  <span className="step"></span>
                  <span className="step"></span>
                  <span className="step"></span>
                  <span className="step"></span>
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

export default CategoryForm;
