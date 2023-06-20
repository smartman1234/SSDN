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
import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import EventService from "../../../Services/EventService/EventService";
import moment from "moment";
const TestimonialsAddForm = () => {
  const serve = new EventService();
  const navigate = useNavigate();
  const params = useParams();
  const [categoryList, setCategoryList] = useState([]);
  const [relatedEvent, setRelatedEvent] = useState([]);
  const [image, setImage] = useState("");
  const [value, setValue] = useState({
    category_id: "",
    title: "",
    slug: "",
    heading: "",
    image: "",
    image_alt_tag: "",
    date: "",
    start_time: "",
    end_time: "",
    presenter_name: "",
    location: "",
    description: "",
    price_type: "",
    inr_price: "",
    is_inr_discount: "",
    inr_discount_price: "",
    meta_title: "",
    meta_keyword: "",
    meta_description: "",
    breadcrumb: "",
    related_event: "",
  });
  const isSameOrBefore = (startTime, endTime) => {
    return moment(startTime, 'HH:mm').isSameOrBefore(moment(endTime, 'HH:mm'));
  }
  const ValidateSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    slug: Yup.string().required("Required"),
    heading: Yup.string().required("Required"),
    price_type: Yup.string().required("Required"),
    category_id: Yup.mixed().required("Required"),
    inr_price: Yup.number()
      .when("price_type", {
        is: (price_type) => price_type && price_type === "paid",
        then: Yup.number().required("Please provide INR Price"),
      })
      .nullable(),
    is_inr_discount: Yup.number()
      .when("price_type", {
        is: (price_type) => price_type === "paid",
        then: Yup.number().required("Is INR Discount Required"),
      })
      .nullable(),
    inr_discount_price: Yup.number()
      .when("is_inr_discount", {
        is: (is_inr_discount) => is_inr_discount && is_inr_discount == "1",
        then: Yup.number()
          .min(0, "Min value 0.")
          .max(100, "Percentage can not be more than 100%.")
          .required(),
      })
      .nullable(),
    image: Yup.mixed().required("Required").nullable(),
    image_alt_tag: Yup.string().required("Required"),
    meta_title: Yup.string().required("Required"),
    meta_keyword: Yup.string().required("Required"),
    meta_description: Yup.string().required("Required"),
    date: Yup.string().required("Required"),
    start_time: Yup.string()
      .test("not empty", "Start time cant be empty", function (value) {
        return !!value;
      })
      .test(
        "start_time_test",
        "Start time must be before end time",
        function (value) {
          const { end_time } = this.parent;
          return isSameOrBefore(value, end_time);
        }
      ),
    end_time: Yup.string().required(),
    description: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
    presenter_name: Yup.string().required("Required"),
    related_event: Yup.mixed().required("Required"),
  });

  const onSubmit = async (values) => {
    const arr =
      values.related_event && values.related_event.map((v) => v.value);
    const formData = new FormData();
    if (values.id) {
      formData.set("id", values.id);
    }
    formData.set("title", values.title);
    formData.set("slug", values.slug.replaceAll(" ", "-").toLowerCase());
    formData.set("heading", values.heading);
    formData.set("category_id", values.category_id.value);
    formData.set("description", values.description);
    formData.set("image", values.image);
    formData.set("image_alt_tag", values.image_alt_tag);
    formData.set("price_type", values.price_type);
    if (values.price_type === "paid") {
      formData.set("inr_price", values.inr_price);
      formData.set("is_inr_discount", values.is_inr_discount);
      if (values.is_inr_discount == "1") {
        formData.set("inr_discount_price", values.inr_discount_price);
      }
    }
    formData.set("date", values.date);
    formData.set("start_time", values.start_time);
    formData.set("end_time", values.end_time);
    formData.set("presenter_name", values.presenter_name);
    formData.set("location", values.location);
    formData.set("meta_title", values.meta_title);
    formData.set("meta_keyword", values.meta_keyword);
    formData.set("meta_description", values.meta_description);
    formData.set("related_event", arr.join());
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
          process.env.REACT_APP_API_BASEURL + "event/update-event",
          formData,
          config
        );
        if (response.data?.status === "success") {
          toast.success("Report Updated successfully");
          setTimeout(() => {
            navigate("/event-management-list");
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
          process.env.REACT_APP_API_BASEURL + "event/create-event",
          formData,
          config
        )
        .then((res) => {
          if (res.data?.status === "success") {
            toast.success(res.data.message);
            setTimeout(() => {
              navigate("/event-management-list");
            }, [2000]);
          } else if (res.data?.status === "fail") {
            toast.error(res.data.message);
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
    categoryListApi();
    relatedEventListApi();
  }, []);

  const categoryListApi = async () => {
    try {
      let response = await serve.eventcategorydropdownlist();
      if (response) {
        setCategoryList(response.data);
      }
    } catch (err) {
      throw err;
    }
  };

  const relatedEventListApi = async () => {
    try {
      let response = await serve.relatedeventlist();
      if (response) {
        setRelatedEvent(response.data);
      }
    } catch (err) {
      throw err;
    }
  };

  const CategoryByIdApi = async () => {
    try {
      let response = await serve.eventlistdetail(params?.id);
      if (response) {
        const category = {};
        const relevent = {};
        category["value"] = response.data.category?.id;
        category["label"] = response.data.category?.name;
        setValue({
          id: response.data.id,
          title: response.data?.title,
          slug: response.data.slug,
          heading: response.data.heading,
          category_id: category,
          image: response.data.image,
          image_alt_tag: response.data.image_alt_tag,
          description: response.data.description,
          date: response.data.date,
          start_time: response.data.start_time,
          end_time: response.data.end_time,
          presenter_name: response.data.presenter_name,
          location: response.data.location,
          price_type: response.data.price_type,
          inr_price: response.data.inr_price,
          is_inr_discount: response.data.is_inr_discount,
          inr_discount_price: response.data.inr_discount_price,
          meta_title: response.data.meta_title,
          meta_keyword: response.data.meta_keyword,
          meta_description: response.data.meta_description,
          breadcrumb: response.data.breadcrumb,
          related_event: response.data.selected_related_event,
        });
      } else {
        toast.error(response?.error);
      }
    } catch (err) {
      throw err;
    }
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  const thumbImagehandle = (e, props, name) => {
    let { file } = e.target.files[0];

    file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function (e) {
      var image = new Image();
      image.src = e.target.result;
      image.onload = function () {
        var height = this.height;
        var width = this.width;
        
        if (name === "image") {
          if (height > 290 || width > 599) {
            alert(
              "Height should not exceed from 290px and width should not exceed from 599 px"
            );
          } else if (height < 290 || width < 599) {
            alert(
              "Height should not less than from 290px and width should not less than from 599 px"
            );
          } else {
            getBase64(file)
              .then((result) => {
                file["base64"] = result;
                setImage(result);
                props.setFieldValue("image", file);
              })
              .catch((err) => {
                throw err;
              });
          }
        }
      };
    };
  };

  return (
    <>
      <div className="page-body">
        <Breadcrumb heading="Add Event" />
        <div className="container-fluid support-ticket">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Add Event</h5>
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
                            <label className="form-label">
                              Heading <span className="text-danger">*</span>
                            </label>
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
                            <label className="form-label">
                              Title <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              onChange={(event) => {
                                props.setFieldValue(
                                  "title",
                                  event.target.value
                                );
                                props.setFieldValue("slug", event.target.value);
                              }}
                              onBlur={props.handleBlur}
                              value={props.values.title}
                              name="title"
                              type="text"
                              placeholder="Enter title"
                            />{" "}
                            {props.touched.title && props.errors.title ? (
                              <div className="formik-errors bg-error">
                                {props.errors.title}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Slug <span className="text-danger">*</span>
                            </label>
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
                          <div
                            className={
                              props.values.image
                                ? "form-group col-md-5"
                                : "form-group col-md-6"
                            }
                          >
                            <label className="form-label">Image</label>{" "}
                            <span className="text-danger">599*290</span>
                            <input
                              className="form-control"
                              name="image"
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                props.setFieldValue("image", e.target.files[0]);
                                thumbImagehandle(e, props, "image");
                              }}
                              onBlur={props.handleBlur}
                            />
                            {props.touched.image && props.errors.image ? (
                              <div className="formik-errors bg-error">
                                {props.errors.image}
                              </div>
                            ) : null}
                          </div>
                          {(image || props.values.image) && (
                            <div
                              className="input-group-append col-md-2"
                              style={{
                                top: "25px",
                                paddingLeft: "0px",
                                height: "49px",
                                width: "55px",
                              }}
                            >
                              <img
                                src={image || props.values.image}
                                alt="image"
                                style={{
                                  padding: "0",
                                  width: "100%",
                                  height: "72%",
                                }}
                              />
                            </div>
                          )}
                          <div className="form-group col-md-6">
                            <label className="form-label">Image alt tag</label>{" "}
                            <span className="text-danger">*</span>
                            <input
                              className="form-control"
                              name="image_alt_tag"
                              type="text"
                              value={props.values?.image_alt_tag}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              placeholder="Enter image alt tag"
                            />
                            {props.touched.image_alt_tag &&
                            props.errors.image_alt_tag ? (
                              <div className="formik-errors bg-error">
                                {props.errors.image_alt_tag}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">Date</label>{" "}
                            <span className="text-danger">*</span>
                            <input
                              className="form-control"
                              placeholder="Enter category heading"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.date}
                              name="date"
                              type="date"
                            />{" "}
                            {props.touched.date && props.errors.date ? (
                              <div className="formik-errors bg-error">
                                {props.errors.date}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">Start Time</label>{" "}
                            <span className="text-danger">*</span>
                            <input
                              className="form-control"
                              placeholder="Enter category heading"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.start_time}
                              name="start_time"
                              type="time"
                            />{" "}
                            {props.touched.start_time &&
                            props.errors.start_time ? (
                              <div className="formik-errors bg-error">
                                {props.errors.start_time}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">End Time</label>{" "}
                            <span className="text-danger">*</span>
                            <input
                              className="form-control"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.end_time}
                              name="end_time"
                              type="time"
                            />{" "}
                            {props.touched.end_time && props.errors.end_time ? (
                              <div className="formik-errors bg-error">
                                {props.errors.end_time}
                              </div>
                            ) : null}
                          </div>{" "}
                          <div className="form-group col-md-6">
                            <label className="form-label">Location</label>{" "}
                            <span className="text-danger">*</span>
                            <input
                              className="form-control"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.location}
                              name="location"
                              type="text"
                              placeholder="Enter location"
                            />{" "}
                            {props.touched.location && props.errors.location ? (
                              <div className="formik-errors bg-error">
                                {props.errors.location}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">Presenter Name <span className="text-danger">*</span></label>{" "}
                            
                            <input
                              className="form-control"
                              name="presenter_name"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.presenter_name}
                              type="text"
                              placeholder="Enter presenter name"
                            />{" "}
                            {props.touched.presenter_name &&
                            props.errors.presenter_name ? (
                              <div className="formik-errors bg-error">
                                {props.errors.presenter_name}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">Category</label>{" "}
                            <span className="text-danger">*</span>
                            <Select
                              onChange={(value) =>
                                props.setFieldValue("category_id", value)
                              }
                              options={categoryList}
                              value={props.values.category_id}
                              name="category_id"
                            />
                            {props.touched.category_id &&
                            props.errors.category_id ? (
                              <div className="formik-errors bg-error">
                                {props.errors.category_id}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">Related Event</label>{" "}
                            <span className="text-danger">*</span>
                            <Select
                              onChange={(value) =>
                                props.setFieldValue("related_event", value)
                              }
                              options={relatedEvent}
                              value={props.values.related_event}
                              name="category"
                              isMulti
                            />
                            {props.touched.related_event &&
                            props.errors.related_event ? (
                              <div className="formik-errors bg-error">
                                {props.errors.related_event}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-4">
                            <label htmlFor="contact" className="form-label">
                              Price Type <span className="text-danger">*</span>
                            </label>
                            <div className="col">
                              <div className="form-group m-t-10 m-checkbox-inline mb-0 custom-radio-ml">
                                <div
                                  className="radio radio-primary"
                                >
                                  <input
                                    id="free"
                                    type="radio"
                                    name="price_type"
                                    value="free"
                                    onChange={(e) => {
                                      props.setFieldValue(
                                        "price_type",
                                        e.target.value
                                      );
                                    }}
                                    checked={props.values.price_type === "free"}
                                  />
                                  <label
                                    className="form-label mb-0"
                                    htmlFor="free"
                                  >
                                    Free
                                  </label>
                                </div>
                                <div
                                  className="radio radio-primary"
                                >
                                  <input
                                    id="paid"
                                    type="radio"
                                    name="price_type"
                                    checked={props.values.price_type === "paid"}
                                    onChange={(e) => {
                                      props.setFieldValue(
                                        "price_type",
                                        e.target.value
                                      );
                                    }}
                                    value="paid"
                                  />
                                  <label
                                    className="form-label mb-0"
                                    htmlFor="paid"
                                  >
                                    Paid
                                  </label>
                                </div>
                              </div>
                              {props.touched.price_type &&
                              props.errors.price_type ? (
                                <div className="formik-errors bg-error">
                                  {props.errors.price_type}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className="row">
                            {" "}
                            {props.values.price_type === "paid" ? (
                              <>
                                <div className="row pl-0">
                                  <div className="form-group col-md-4">
                                    <label className="col-form-label">
                                      Actual Price (INR){" "}
                                      <span className="text-danger">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="actualprice"
                                      name="inr_price"
                                      placeholder="Actual price in INR"
                                      onChange={props.handleChange}
                                      onBlur={props.handleBlur}
                                      value={props.values.inr_price}
                                    />
                                    {props.touched.inr_price &&
                                    props.errors.inr_price ? (
                                      <div className="formik-errors bg-error">
                                        {props.errors.inr_price}
                                      </div>
                                    ) : null}
                                  </div>
                                  <div className="form-group col-md-3">
                                    <label htmlFor="contact">
                                      Discount (INR){" "}
                                      <span className="text-danger">*</span>
                                    </label>
                                    <div className="col">
                                      <div className="form-group m-t-10 m-checkbox-inline mb-0 custom-radio-ml">
                                        <div
                                          className="radio radio-primary"
                                        >
                                          <input
                                            id="is_inr"
                                            type="radio"
                                            name="is_inr_discount"
                                            value="1"
                                            checked={
                                              props.values.is_inr_discount ==
                                              "1"
                                            }
                                            onChange={(e) => {
                                              props.setFieldValue(
                                                "is_inr_discount",
                                                e.target.value
                                              );
                                            }}
                                          />
                                          <label
                                            className="mb-0"
                                            htmlFor="is_inr"
                                          >
                                            Yes
                                          </label>
                                        </div>
                                        <div
                                          className="radio radio-primary"
                                        >
                                          <input
                                            id="inr_discount"
                                            type="radio"
                                            name="is_inr_discount"
                                            onChange={(e) => {
                                              props.setFieldValue(
                                                "is_inr_discount",
                                                e.target.value
                                              );
                                            }}
                                            checked={
                                              props.values.is_inr_discount ==
                                              "0"
                                            }
                                            value="0"
                                          />
                                          <label
                                            className="mb-0"
                                            htmlFor="inr_discount"
                                          >
                                            No
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    {props.touched.is_inr_discount &&
                                    props.errors.is_inr_discount ? (
                                      <div className="formik-errors bg-error">
                                        {props.errors.is_inr_discount}
                                      </div>
                                    ) : null}
                                  </div>

                                  {props.values.is_inr_discount == "1" && (
                                    <div className="form-group col-md-3">
                                      <label className="col-form-label">
                                        INR Discount (%)
                                      </label>{" "}
                                      <span className="text-danger">*</span>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="actualprice"
                                        name="inr_discount_price"
                                        placeholder="INR Discount (%)"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.inr_discount_price}
                                      />
                                      {props.touched.inr_discount_price &&
                                      props.errors.inr_discount_price ? (
                                        <div className="formik-errors bg-error">
                                          {props.errors.inr_discount_price}
                                        </div>
                                      ) : null}
                                    </div>
                                  )}
                                </div>
                              </>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">Description</label>{" "}
                            <span className="text-danger">*</span>
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
                                props.setFieldValue("description", e)
                              }
                            />{" "}
                            {props.touched.description &&
                            props.errors.description ? (
                              <div className="formik-errors bg-error">
                                {props.errors.description}
                              </div>
                            ) : null}
                          </div>
                         
                          <div className="form-group col-md-6">
                            <div className="form-group col-md-12">
                              {" "}
                              <label className="form-label">
                                Meta Title
                              </label>{" "}
                              <span className="text-danger">*</span>
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
                            </div>{" "}
                            <div className="form-group col-md-12">
                              <label className="form-label">
                                Meta Keywords
                              </label>{" "}
                              <span className="text-danger">*</span>
                              <input
                                className="form-control"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.meta_keyword}
                                name="meta_keyword"
                                type="text"
                                placeholder="Enter meta keywords"
                              />{" "}
                              {props.touched.meta_keyword &&
                              props.errors.meta_keyword ? (
                                <div className="formik-errors bg-error">
                                  {props.errors.meta_keyword}
                                </div>
                              ) : null}
                            </div>
                            <div className="form-group col-md-12">
                              <label className="form-label">
                                Meta Description
                              </label>{" "}
                              <span className="text-danger">*</span>
                              <textarea
                                className="form-control"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.meta_description}
                                name="meta_description"
                                type="text"
                                placeholder="Enter meta description"
                              ></textarea>{" "}
                              {props.touched.meta_description &&
                              props.errors.meta_description ? (
                                <div className="formik-errors bg-error">
                                  {props.errors.meta_description}
                                </div>
                              ) : null}
                            </div>{" "}
                            <div className="form-group col-md-12">
                              <label className="form-label">
                                Breadcrumb / Event
                              </label>
                              <textarea
                                className="form-control"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.breadcrumb}
                                name="breadcrumb"
                                type="text"
                                placeholder="Enter breadcrumb / event"
                              ></textarea>
                            </div>
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
