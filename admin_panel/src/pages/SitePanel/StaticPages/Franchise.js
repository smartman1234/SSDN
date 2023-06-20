import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import FastestCard from "./FastestCard";
import StaticpageService from "../../../Services/StaticPageService/StaticePageService";
import Faq from "../../ELearning/Course/Faq";

export default function Franchise({ pageName, slug }) {
  const [imageUrl, setImageurl] = useState("");
  const staticeService = new StaticpageService();
  const [businessImage, setBusinessImage] = useState();
  const [deliverImage, setDeliverImage] = useState();
  const [values, setValues] = useState({
    page_name: "",
    page_slug: "",
    block_title: "",
    block_description: "",
    business_image: "",
    why_ssdn_title: "",
    why_ssdn_description: "",
    we_delvery_title: "",
    we_delvery_image: "",
    we_delvery_image_alt_tag: "",
    we_delvery_video_link: "",
    bussiness_type_1_title: "",
    bussiness_type_1_description: "",
    bussiness_type_2_title: "",
    bussiness_type_2_description: "",
    bussiness_type_3_title: "",
    bussiness_type_3_description: "",
    bussiness_type_4_title: "",
    bussiness_type_4_description: "",
    fastest_growing_title: "",
    fastest_growing_card: [{ title: "", description: "" }],
    partnership_call_us: "",
    partnership_title: "",
    partnership_description: "",
    contact_us_number: "",
    contact_us_email: "",
    contact_us_location: "",
    faqs: [{ title: "", description: "" }],
  });

  const onSubmit = (values) => {
    const formData = new FormData();

    formData.set("page_name", values.page_name);
    formData.set("page_slug", values.page_slug);
    formData.set("block_title", values.block_title);
    formData.set("block_description", values.block_description);
    formData.set("description[business_image]", values.business_image);
    formData.set("description[why_ssdn_title]", values.why_ssdn_title);
    formData.set(
      "description[why_ssdn_description]",
      values.why_ssdn_description
    );
    formData.set("description[we_delvery_title]", values.we_delvery_title);
    formData.set("description[we_delvery_image]", values.we_delvery_image);
    formData.set(
      "description[we_delvery_image_alt_tag]",
      values.we_delvery_image_alt_tag
    );
    formData.set(
      "description[we_delvery_video_link]",
      values.we_delvery_video_link
    );
    formData.set(
      "description[bussiness_type_1_title]",
      values.bussiness_type_1_title
    );
    formData.set(
      "description[bussiness_type_1_description]",
      values.bussiness_type_1_description
    );
    formData.set(
      "description[bussiness_type_2_title]",
      values.bussiness_type_2_title
    );
    formData.set(
      "description[bussiness_type_2_description]",
      values.bussiness_type_2_description
    );
    formData.set(
      "description[bussiness_type_3_title]",
      values.bussiness_type_3_title
    );
    formData.set(
      "description[bussiness_type_3_description]",
      values.bussiness_type_3_description
    );
    formData.set(
      "description[bussiness_type_4_title]",
      values.bussiness_type_4_title
    );
    formData.set(
      "description[bussiness_type_4_description]",
      values.bussiness_type_4_description
    );
    formData.set(
      "description[fastest_growing_title]",
      values.fastest_growing_title
    );
    formData.set(
      "description[fastest_growing_card]",
      JSON.stringify(values.fastest_growing_card)
    );
    formData.set(
      "description[partnership_call_us]",
      values.partnership_call_us
    );
    formData.set("description[partnership_title]", values.partnership_title);
    formData.set(
      "description[partnership_description]",
      values.partnership_description
    );
    formData.set("description[contact_us_number]", values.contact_us_number);
    formData.set("description[contact_us_email]", values.contact_us_email);
    formData.set(
      "description[contact_us_location]",
      values.contact_us_location
    );
    formData.set("description[faqs]", JSON.stringify(values.faqs));

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
    block_title: Yup.string().required("Required"),
    block_description: Yup.string().required("Required"),
    business_image: Yup.mixed().required("Required"),
    why_ssdn_title: Yup.string().required("Required"),
    why_ssdn_description: Yup.string().required("Required"),
    we_delvery_title: Yup.string().required("Required"),
    we_delvery_image: Yup.mixed().required("Required"),
    we_delvery_image_alt_tag: Yup.string().required("Required"),
    we_delvery_video_link: Yup.string().required("Required"),
    bussiness_type_1_title: Yup.string().required("Required"),
    bussiness_type_1_description: Yup.string().required("Required"),
    bussiness_type_2_title: Yup.string().required("Required"),
    bussiness_type_2_description: Yup.string().required("Required"),
    bussiness_type_3_title: Yup.string().required("Required"),
    bussiness_type_3_description: Yup.string().required("Required"),
    bussiness_type_4_title: Yup.string().required("Required"),
    bussiness_type_4_description: Yup.string().required("Required"),
    fastest_growing_title: Yup.string().required("Required"),
    fastest_growing_card: Yup.array(
      Yup.object().shape({
        title: Yup.string().required("Required"),
        description: Yup.string().required("Required"),
      })
    ),
    partnership_call_us: Yup.string().required("Required"),
    partnership_title: Yup.string().required("Required"),
    partnership_description: Yup.string().required("Required"),
    contact_us_number: Yup.string().required("Required"),
    contact_us_email: Yup.string().required("Required"),
    contact_us_location: Yup.string().required("Required"),
    faqs: Yup.array(
      Yup.object().shape({
        title: Yup.string().required("Required"),
        description: Yup.string().required("Required"),
      })
    ),
  });

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
        
        if (name === "business_image") {
          if (height > 460 || width > 1600) {
            alert(
              "Height should not exceed from 460 px and width should not exceed from 1600 px"
            );
          } else if (height < 335 || width < 1155) {
            alert(
              "Height should not less than from 335 px and width should not less than from 1155 px"
            );
          } else {
            getBase64(file)
              .then((result) => {
                file["base64"] = result;
                setBusinessImage(result);
                props.setFieldValue("business_image", file);
              })
              .catch((err) => {
                throw err;
              });
          }
        } else if (name === "we_delvery_image") {
          if (height > 598 || width > 632) {
            alert(
              "Height should not exceed from 598 px and width should not exceed from 632 px"
            );
          } else if (height < 598 || width < 632) {
            alert(
              "Height should not less than from 598 px and width should not less than from 632 px"
            );
          } else {
            getBase64(file)
              .then((result) => {
                file["base64"] = result;
                setDeliverImage(result);
                props.setFieldValue("we_delvery_image", file);
              })
              .catch((err) => {
                
              });
          }
        }
      };
    };
  };

  useEffect(() => {
    getPageBlockData();
  }, []);

  const getPageBlockData = async () => {
    try {
      let response = await staticeService.getDetails(slug);

      if (response.status === "success") {
        setImageurl(response.data?.page_description?.image_url);

        setValues({
          page_name: response.data?.page_name,
          page_slug: response.data?.page_slug,
          block_title: response.data?.block_title,
          block_description: response.data?.block_description,
          business_image: response.data?.page_description?.business_image,
          why_ssdn_title: response.data?.page_description?.why_ssdn_title,
          why_ssdn_description:
            response.data?.page_description?.why_ssdn_description,
          we_delvery_title: response.data?.page_description?.we_delvery_title,
          we_delvery_image: response.data?.page_description?.we_delvery_image,
          we_delvery_image_alt_tag:
            response.data?.page_description?.we_delvery_image_alt_tag,
          we_delvery_video_link:
            response.data?.page_description?.we_delvery_video_link,
          bussiness_type_1_title:
            response.data?.page_description?.bussiness_type_1_title,
          bussiness_type_1_description:
            response.data?.page_description?.bussiness_type_1_description,
          bussiness_type_2_title:
            response.data?.page_description?.bussiness_type_2_title,
          bussiness_type_2_description:
            response.data?.page_description?.bussiness_type_2_description,
          bussiness_type_3_title:
            response.data?.page_description?.bussiness_type_3_title,
          bussiness_type_3_description:
            response.data?.page_description?.bussiness_type_3_description,
          bussiness_type_4_title:
            response.data?.page_description?.bussiness_type_4_title,
          bussiness_type_4_description:
            response.data?.page_description?.bussiness_type_4_description,
          fastest_growing_title:
            response.data?.page_description?.fastest_growing_title,
          fastest_growing_card: JSON.parse(
            response.data?.page_description?.fastest_growing_card || "[]"
          ),
          partnership_call_us:
            response.data?.page_description?.partnership_call_us,
          partnership_title: response.data?.page_description?.partnership_title,
          partnership_description:
            response.data?.page_description?.partnership_description,
          contact_us_number: response.data?.page_description?.contact_us_number,
          contact_us_email: response.data?.page_description?.contact_us_email,
          contact_us_location:
            response.data?.page_description?.contact_us_location,
          faqs: JSON.parse(response.data?.page_description?.faqs || "[]"),
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
              <div className="form-group col-md-12">
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
                  defaultValue={pageName}
                />
                {props.touched.page_name && props.errors.page_name ? (
                  <div className="formik-errors bg-error">
                    {props.errors.page_name}
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
                  defaultValue={slug}
                />
                {props.touched.slug && props.errors.slug ? (
                  <div className="formik-errors bg-error">
                    {props.errors.slug}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-12">
                <label className="form-label fs-4">Franchise</label>
                <hr />
              </div>{" "}
              <div className="form-group col-md-6">
                <label className="form-label">
                  Title <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="block_title"
                  type="text"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.block_title}
                  placeholder="Enter block title"
                />
                {props.touched.block_title && props.errors.block_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.block_title}
                  </div>
                ) : null}
              </div>{" "}
              <div
                className={
                  props.values.business_image
                    ? "form-group col-md-5"
                    : "form-group col-md-5"
                }
              >
                <label className="form-label">
                  Business Image <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="business_image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    thumbImagehandle(e, props, "business_image");
                  }}
                />
                {props.touched.business_image && props.errors.business_image ? (
                  <div className="formik-errors bg-error">
                    {props.errors.business_image}
                  </div>
                ) : null}
              </div>
              {(businessImage || imageUrl + props.values.business_image) && (
                <div
                  className="input-group-append col-md-1"
                  style={{
                    top: "25px",
                    paddingLeft: "0px",
                    height: "49px",
                    width: "55px",
                  }}
                >
                  <img
                    src={
                      businessImage || imageUrl + props.values.business_image
                    }
                    alt="image"
                    style={{
                      padding: "0",
                      width: "100%",
                      height: "72%",
                    }}
                  />
                </div>
              )}
              <div className="form-group col-md-12">
                <label className="form-label">
                  Description <span className="text-danger">*</span>
                </label>
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
                  value={props.values.block_description}
                  onEditorChange={(e) =>
                    props.setFieldValue("block_description", e)
                  }
                />{" "}
                {props.touched.block_description &&
                props.errors.block_description ? (
                  <div className="formik-errors bg-error">
                    {props.errors.block_description}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-12">
                <label className="form-label fs-4">Why Ssdn</label>
                <hr />
              </div>{" "}
              <div className="form-group col-md-12">
                <label className="form-label">
                  Why Ssdn Title <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="why_ssdn_title"
                  type="text"
                  placeholder="Enter why ssdn title"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.why_ssdn_title}
                />
                {props.touched.why_ssdn_title && props.errors.why_ssdn_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.why_ssdn_title}
                  </div>
                ) : null}
              </div>{" "}
              <div className="form-group col-md-12">
                <label className="form-label">Why Ssdn Description</label>
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
                  value={props.values.why_ssdn_description}
                  onEditorChange={(e) =>
                    props.setFieldValue("why_ssdn_description", e)
                  }
                />{" "}
                {props.touched.why_ssdn_description &&
                props.errors.why_ssdn_description ? (
                  <div className="formik-errors bg-error">
                    {props.errors.why_ssdn_description}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-12">
                <label className="form-label fs-4">Quality Training</label>
                <hr />
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  We Deliver Title <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="we_delvery_title"
                  type="text"
                  placeholder="Enter we deliver title"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.we_delvery_title}
                />
                {props.touched.we_delvery_title &&
                props.errors.we_delvery_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.we_delvery_title}
                  </div>
                ) : null}
              </div>{" "}
              <div className="form-group col-md-6">
                <label className="form-label">
                  We Deliver video link <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="we_delvery_video_link"
                  type="text"
                  placeholder="Enter we deliver video link"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.we_delvery_video_link}
                />
                {props.touched.we_delvery_video_link &&
                props.errors.we_delvery_video_link ? (
                  <div className="formik-errors bg-error">
                    {props.errors.we_delvery_video_link}
                  </div>
                ) : null}
              </div>{" "}
              <div className="form-group col-md-5">
                <label className="form-label">
                  We Deliver Image <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="we_delvery_image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    thumbImagehandle(e, props, "we_delvery_image");
                  }}
                  placeholder="Enter slug"
                />
                {props.touched.we_delvery_image &&
                props.errors.we_delvery_image ? (
                  <div className="formik-errors bg-error">
                    {props.errors.we_delvery_image}
                  </div>
                ) : null}{" "}
              </div>{" "}
              {(deliverImage || imageUrl + props.values.we_delvery_image) && (
                <div
                  className="input-group-append col-md-1"
                >
                  <img
                    src={
                      deliverImage || imageUrl + props.values.we_delvery_image
                    }
                    alt="image"
                    style={{
                      padding: "0",
                      width: "100%",
                      height: "72%",
                    }}
                  />
                </div>
              )}{" "}
              <div className="form-group col-md-6">
                <label className="form-label">
                  We Deliver Image Alt Tag <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="we_delvery_image_alt_tag"
                  type="text"
                  placeholder="Enter we deliver image alt tag"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.we_delvery_image_alt_tag}
                />
                {props.touched.we_delvery_image_alt_tag &&
                props.errors.we_delvery_image_alt_tag ? (
                  <div className="formik-errors bg-error">
                    {props.errors.we_delvery_image_alt_tag}
                  </div>
                ) : null}
              </div>{" "}
              <div className="form-group col-md-6">
                <label className="form-label">
                  Bussiness Type 1 Title<span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="bussiness_type_1_title"
                  type="text"
                  placeholder="Enter bussiness type 1 title"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.bussiness_type_1_title}
                />
                {props.touched.bussiness_type_1_title &&
                props.errors.bussiness_type_1_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.bussiness_type_1_title}
                  </div>
                ) : null}
              </div>{" "}
              <div className="form-group col-md-6">
                <label className="form-label">
                  Bussiness Type 2 Title<span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="bussiness_type_2_title"
                  type="text"
                  placeholder="Enter bussiness type 2 title"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.bussiness_type_2_title}
                />
                {props.touched.bussiness_type_2_title &&
                props.errors.bussiness_type_2_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.bussiness_type_2_title}
                  </div>
                ) : null}
              </div>{" "}
              <div className="form-group col-md-6">
                <label className="form-label">
                  Bussiness Type1 Description{" "}
                  <span className="text-danger">*</span>
                </label>
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
                  value={props.values.bussiness_type_1_description}
                  onEditorChange={(e) =>
                    props.setFieldValue("bussiness_type_1_description", e)
                  }
                />
                {props.touched.bussiness_type_1_description &&
                props.errors.bussiness_type_1_description ? (
                  <div className="formik-errors bg-error">
                    {props.errors.bussiness_type_1_description}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Bussiness Type2 Description
                  <span className="text-danger">*</span>
                </label>
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
                  value={props.values.bussiness_type_2_description}
                  onEditorChange={(e) =>
                    props.setFieldValue("bussiness_type_2_description", e)
                  }
                />
                {props.touched.bussiness_type_2_description &&
                props.errors.bussiness_type_2_description ? (
                  <div className="formik-errors bg-error">
                    {props.errors.bussiness_type_2_description}
                  </div>
                ) : null}
              </div>{" "}
              <div className="form-group col-md-6">
                <label className="form-label">
                  Bussiness Type 3 Title<span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="bussiness_type_3_title"
                  type="text"
                  placeholder="Enter bussiness type 3 title"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.bussiness_type_3_title}
                />
                {props.touched.bussiness_type_3_title &&
                props.errors.bussiness_type_3_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.bussiness_type_3_title}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Bussiness Type 4 Title<span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="bussiness_type_4_title"
                  type="text"
                  placeholder="Enter bussiness type 4 title"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.bussiness_type_4_title}
                />
                {props.touched.bussiness_type_4_title &&
                props.errors.bussiness_type_4_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.bussiness_type_4_title}
                  </div>
                ) : null}
              </div>{" "}
              <div className="form-group col-md-6">
                <label className="form-label">
                  Bussiness Type 3 Description{" "}
                  <span className="text-danger">*</span>
                </label>
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
                  value={props.values.bussiness_type_3_description}
                  onEditorChange={(e) =>
                    props.setFieldValue("bussiness_type_3_description", e)
                  }
                />
                {props.touched.bussiness_type_3_description &&
                props.errors.bussiness_type_3_description ? (
                  <div className="formik-errors bg-error">
                    {props.errors.bussiness_type_3_description}
                  </div>
                ) : null}
              </div>{" "}
              <div className="form-group col-md-6">
                <label className="form-label">
                  Bussiness Type 4 Description{" "}
                  <span className="text-danger">*</span>
                </label>
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
                  value={props.values.bussiness_type_4_description}
                  onEditorChange={(e) =>
                    props.setFieldValue("bussiness_type_4_description", e)
                  }
                />
                {props.touched.bussiness_type_4_description &&
                props.errors.bussiness_type_4_description ? (
                  <div className="formik-errors bg-error">
                    {props.errors.bussiness_type_4_description}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-12">
                <label className="form-label fs-4">
                  FASTEST GROWING IT TRAINING & SERVICE COMPANY
                </label>
                <hr />
              </div>{" "}
              <div className="form-group col-md-6">
                <label className="form-label">
                  Fastest Growing Title <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="fastest_growing_title"
                  type="text"
                  placeholder="Enter fastest growing title"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.fastest_growing_title}
                />
                {props.touched.fastest_growing_title &&
                props.errors.fastest_growing_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.fastest_growing_title}
                  </div>
                ) : null}
              </div>
            </div>{" "}
            <FastestCard props={props} />
            <div className="form-group col-md-12">
                <label className="form-label fs-4">
                Partnership
                </label>
                <hr />
              </div>{" "}
            <div className="row">
              <div className="form-group col-md-6">
                <div className="form-group col-md-12">
                  <label className="form-label">
                    Partnership Title <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    name="partnership_title"
                    type="text"
                    placeholder="Enter partnership title"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.partnership_title}
                  />
                  {props.touched.partnership_title &&
                  props.errors.partnership_title ? (
                    <div className="formik-errors bg-error">
                      {props.errors.partnership_title}
                    </div>
                  ) : null}
                </div>
                <div className="form-group col-md-12">
                  <label className="form-label">
                    Partnership Call Us <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    name="partnership_call_us"
                    type="text"
                    placeholder="Enter partnership call us"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.partnership_call_us}
                  />
                  {props.touched.partnership_call_us &&
                  props.errors.partnership_call_us ? (
                    <div className="formik-errors bg-error">
                      {props.errors.partnership_call_us}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Partnership Description <span className="text-danger">*</span>
                </label>
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
                  value={props.values.partnership_description}
                  onEditorChange={(e) =>
                    props.setFieldValue("partnership_description", e)
                  }
                />
                {props.touched.partnership_description &&
                props.errors.partnership_description ? (
                  <div className="formik-errors bg-error">
                    {props.errors.partnership_description}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-12">
                <label className="form-label fs-4">
                Contact
                </label>
                <hr />
              </div>{" "}
              <div className="form-group col-md-6">
                <label className="form-label">
                  Contact Us Number
                  <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="contact_us_number"
                  type="text"
                  placeholder="Enter contact us number"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.contact_us_number}
                />
                {props.touched.contact_us_number &&
                props.errors.contact_us_number ? (
                  <div className="formik-errors bg-error">
                    {props.errors.contact_us_number}
                  </div>
                ) : null}
              </div>

              <div className="form-group col-md-6">
                <label className="form-label">
                  Contact Us Email <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="contact_us_email"
                  type="text"
                  placeholder="Enter contact us email"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.contact_us_email}
                />
                {props.touched.contact_us_email &&
                props.errors.contact_us_email ? (
                  <div className="formik-errors bg-error">
                    {props.errors.contact_us_email}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Contact Us Location <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="contact_us_location"
                  type="text"
                  placeholder="Enter contact us location"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.contact_us_location}
                />
                {props.touched.contact_us_location &&
                props.errors.contact_us_location ? (
                  <div className="formik-errors bg-error">
                    {props.errors.contact_us_location}
                  </div>
                ) : null}
              </div>
            </div>{" "}
            <div className="form-group col-md-6">
              <label className="form-label fs-4">
                FAQs <span className="text-danger">*</span>
              </label><hr/>
            </div>
            <Faq props={props} />
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
