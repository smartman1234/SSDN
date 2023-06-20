import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import StaticpageService from "../../../Services/StaticPageService/StaticePageService";

export default function Placement({ pageName, slug }) {
  const [imageUrl, setImageurl] = useState("");
  const staticeService = new StaticpageService();
  const [image, setImage] = useState();
  const [trainingPlacementImage, setTrainingPlacementImage] = useState();
  const [aboutImage, setAboutImage] = useState();
  const [card1Image, setCard1Image] = useState();
  const [card2Image, setCard2Image] = useState();
  const [values, setValues] = useState({
    page_name: "",
    page_slug: "",
    block_description: "",
    journey_process_title: "",
    traning_placement_title: "",
    traning_placement_image: "",
    traning_placement_image_alt_tag: "",
    counter_1_title: "",
    counter_1_number: "",
    counter_2_title: "",
    counter_2_number: "",
    counter_3_title: "",
    counter_3_number: "",
    counter_4_title: "",
    counter_4_number: "",
    our_placement_title: "",
    our_placement_description: "",
    why_hired_title: "",
    card_1_title: "",
    card_1_description: "",
    card_2_title: "",
    card_2_description: "",
    card_3_title: "",
    card_3_description: "",
    card_4_title: "",
    card_4_description: "",
  });

  const onSubmit = (values) => {
    const formData = new FormData();

    formData.set("page_name", values.page_name);
    formData.set("page_slug", values.page_slug);
    formData.set("block_description", values.block_description);
    formData.set(
      "description[journey_process_title]",
      values.journey_process_title
    );
    formData.set(
      "description[traning_placement_title]",
      values.traning_placement_title
    );
    formData.set(
      "description[traning_placement_image]",
      values.traning_placement_image
    );
    formData.set(
      "description[traning_placement_image_alt_tag]",
      values.traning_placement_image_alt_tag
    );
    formData.set("description[counter_1_title]", values.counter_1_title);
    formData.set("description[counter_1_number]", values.counter_1_number);
    formData.set("description[counter_2_title]", values.counter_2_title);
    formData.set("description[counter_2_number]", values.counter_2_number);
    formData.set("description[counter_3_title]", values.counter_3_title);
    formData.set("description[counter_3_number]", values.counter_3_number);
    formData.set("description[counter_4_title]", values.counter_4_title);
    formData.set("description[counter_4_number]", values.counter_4_number);
    formData.set(
      "description[our_placement_title]",
      values.our_placement_title
    );
    formData.set(
      "description[our_placement_description]",
      values.our_placement_description
    );
    formData.set("description[why_hired_title]", values.why_hired_title);
    formData.set("description[card_1_title]", values.card_1_title);
    formData.set("description[card_1_description]", values.card_1_description);
    formData.set("description[card_2_title]", values.card_2_title);
    formData.set("description[card_2_description]", values.card_2_description);
    formData.set("description[card_3_title]", values.card_3_title);
    formData.set("description[card_3_description]", values.card_3_description);
    formData.set("description[card_4_title]", values.card_4_title);
    formData.set("description[card_4_description]", values.card_4_description);

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
    page_name: Yup.string().required("Required"),
    page_slug: Yup.string().required("Required"),
    block_description: Yup.string().required("Required"),
    journey_process_title: Yup.string().required("Required"),
    traning_placement_title: Yup.string().required("Required"),
    traning_placement_image: Yup.mixed().required("Required"),
    traning_placement_image_alt_tag: Yup.string().required("Required"),
    counter_1_title: Yup.string().required("Required"),
    counter_1_number: Yup.string().required("Required"),
    counter_2_title: Yup.string().required("Required"),
    counter_2_number: Yup.string().required("Required"),
    counter_3_title: Yup.string().required("Required"),
    counter_3_number: Yup.string().required("Required"),
    counter_4_title: Yup.string().required("Required"),
    counter_4_number: Yup.string().required("Required"),
    our_placement_title: Yup.string().required("Required"),
    our_placement_description: Yup.string().required("Required"),
    why_hired_title: Yup.string().required("Required"),
    card_1_title: Yup.string().required("Required"),
    card_1_description: Yup.string().required("Required"),
    card_2_title: Yup.string().required("Required"),
    card_2_description: Yup.string().required("Required"),
    card_3_title: Yup.string().required("Required"),
    card_3_description: Yup.string().required("Required"),
    card_4_title: Yup.string().required("Required"),
    card_4_description: Yup.string().required("Required"),
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
        
        if (name === "traning_placement_image") {
          if (height > 335 || width > 1015) {
            alert(
              "Height should not exceed from 335px and width should not exceed from 1015 px"
            );
          } else if (height < 330 || width < 1010) {
            alert(
              "Height should not less than from 330px and width should not less than from 1010 px"
            );
          } else {
            getBase64(file)
              .then((result) => {
                file["base64"] = result;
                setTrainingPlacementImage(result);
                props.setFieldValue("traning_placement_image", file);
              })
              .catch((err) => {
                throw err;
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
          block_description: response.data?.block_description,
          journey_process_title:
            response.data?.page_description?.journey_process_title,
          traning_placement_title:
            response.data?.page_description?.traning_placement_title,
          traning_placement_image:
            response.data?.page_description?.traning_placement_image,
          traning_placement_image_alt_tag:
            response.data?.page_description?.traning_placement_image_alt_tag,
          counter_1_title: response.data?.page_description?.counter_1_title,
          counter_1_number: response.data?.page_description?.counter_1_number,
          counter_2_title: response.data?.page_description?.counter_2_title,
          counter_2_number: response.data?.page_description?.counter_2_number,
          counter_3_title: response.data?.page_description?.counter_3_title,
          counter_3_number: response.data?.page_description?.counter_3_number,
          counter_4_title: response.data?.page_description?.counter_4_title,
          counter_4_number: response.data?.page_description?.counter_4_number,
          our_placement_title:
            response.data?.page_description?.our_placement_title,
          our_placement_description:
            response.data?.page_description?.our_placement_description,
          why_hired_title: response.data?.page_description?.why_hired_title,
          card_1_title: response.data?.page_description?.card_1_title,
          card_1_description:
            response.data?.page_description?.card_1_description,
          card_2_title: response.data?.page_description?.card_2_title,
          card_2_description:
            response.data?.page_description?.card_2_description,
          card_3_title: response.data?.page_description?.card_3_title,
          card_3_description:
            response.data?.page_description?.card_3_description,
          card_4_title: response.data?.page_description?.card_4_title,
          card_4_description:
            response.data?.page_description?.card_4_description,
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
              <div className="form-group col-md-12" style={{ display: "none" }}>
                <label className="form-label">
                  Page / Blocks  <span className="text-danger">*</span>
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
                  defaultValue={slug}
                />
                {props.touched.slug && props.errors.slug ? (
                  <div className="formik-errors bg-error">
                    {props.errors.slug}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-12">
                <label className="form-label">
                  Placement Description <span className="text-danger">*</span>
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
                />
                {props.touched.block_description &&
                props.errors.block_description ? (
                  <div className="formik-errors bg-error">
                    {props.errors.block_description}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-12">
                <label className="form-label fs-4">TRAINING & PLACEMENT</label>
                <hr />
              </div>{" "}
              <div className="form-group col-md-6">
                <label className="form-label">
                  Journey Process Title <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="journey_process_title"
                  type="text"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.journey_process_title}
                  placeholder="Enter  journey_process_title"
                />
                {props.touched.journey_process_title &&
                props.errors.journey_process_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.journey_process_title}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Traning Placement Title <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="traning_placement_title"
                  type="text"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.traning_placement_title}
                  placeholder="Enter  traning_placement_title"
                />
                {props.touched.traning_placement_title &&
                props.errors.traning_placement_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.traning_placement_title}
                  </div>
                ) : null}
              </div>
              <div
                className={
                  props.values.traning_placement_image
                    ? "form-group col-md-5"
                    : "form-group col-md-5"
                }
              >
                <label className="form-label">
                  Traning Placement Image <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="traning_placement_image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    thumbImagehandle(e, props, "traning_placement_image");
                  }}
                  placeholder="Enter slug"
                />
                {props.touched.traning_placement_image &&
                props.errors.traning_placement_image ? (
                  <div className="formik-errors bg-error">
                    {props.errors.traning_placement_image}
                  </div>
                ) : null}
              </div>
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
                    trainingPlacementImage ||
                    imageUrl + props.values.traning_placement_image
                  }
                  alt="image"
                  style={{
                    padding: "0",
                    width: "100%",
                    height: "72%",
                  }}
                />
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Traning Placement Image Alt Tag
                </label>
                <span className="text-danger">*</span>
                <input
                  className="form-control"
                  name="traning_placement_image_alt_tag"
                  type="text"
                  placeholder="Enter skill traning_placement_image_alt_tag"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.traning_placement_image_alt_tag}
                />
                {props.touched.traning_placement_image_alt_tag &&
                props.errors.traning_placement_image_alt_tag ? (
                  <div className="formik-errors bg-error">
                    {props.errors.traning_placement_image_alt_tag}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-12">
                <label className="form-label fs-4">Counters</label>
                <hr />
              </div>{" "}
              <div className="form-group col-md-6">
                <label className="form-label">Counter 1 Title</label>
                <span className="text-danger">*</span>
                <input
                  className="form-control"
                  name="counter_1_title"
                  type="text"
                  placeholder="Enter skill counter_1_title"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.counter_1_title}
                />
                {props.touched.counter_1_title &&
                props.errors.counter_1_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.counter_1_title}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Counter 1 Number <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="counter_1_number"
                  type="text"
                  placeholder="Enter skill counter_1_number"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.counter_1_number}
                />
                {props.touched.counter_1_number &&
                props.errors.counter_1_number ? (
                  <div className="formik-errors bg-error">
                    {props.errors.counter_1_number}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">Counter 2 Title</label>
                <span className="text-danger">*</span>
                <input
                  className="form-control"
                  name="counter_2_title"
                  type="text"
                  placeholder="Enter skill counter_2_title"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.counter_2_title}
                />
                {props.touched.counter_2_title &&
                props.errors.counter_2_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.counter_2_title}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Counter 2 Number <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="counter_2_number"
                  type="text"
                  placeholder="Enter skill counter_2_number"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.counter_2_number}
                />
                {props.touched.counter_2_number &&
                props.errors.counter_2_number ? (
                  <div className="formik-errors bg-error">
                    {props.errors.counter_2_number}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">Counter 3 Title</label>
                <span className="text-danger">*</span>
                <input
                  className="form-control"
                  name="counter_3_title"
                  type="text"
                  placeholder="Enter skill counter_3_title"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.counter_3_title}
                />
                {props.touched.counter_3_title &&
                props.errors.counter_3_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.counter_3_title}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Counter 3 Number <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="counter_3_number"
                  type="text"
                  placeholder="Enter skill counter_3_number"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.counter_3_number}
                />
                {props.touched.counter_3_number &&
                props.errors.counter_3_number ? (
                  <div className="formik-errors bg-error">
                    {props.errors.counter_3_number}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">Counter 4 Title</label>
                <span className="text-danger">*</span>
                <input
                  className="form-control"
                  name="counter_4_title"
                  type="text"
                  placeholder="Enter skill counter_4_title"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.counter_4_title}
                />
                {props.touched.counter_4_title &&
                props.errors.counter_4_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.counter_4_title}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Counter 4 Number <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="counter_4_number"
                  type="text"
                  placeholder="Enter skill counter_4_number"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.counter_4_number}
                />
                {props.touched.counter_4_number &&
                props.errors.counter_4_number ? (
                  <div className="formik-errors bg-error">
                    {props.errors.counter_4_number}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-12">
                <label className="form-label fs-4">RECENT PLACEMENT</label>
                <hr />
              </div>{" "}
              <div className="form-group col-md-12">
                <label className="form-label">
                  Our Placement Title <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="our_placement_title"
                  type="text"
                  placeholder="Enter skill title"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.our_placement_title}
                />
                {props.touched.our_placement_title &&
                props.errors.our_placement_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.our_placement_title}
                  </div>
                ) : null}
              </div>{" "}
             
              <div className="form-group col-md-12">
                <label className="form-label">
                  Our Placement Description{" "}
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
                  value={props.values.our_placement_description}
                  onEditorChange={(e) =>
                    props.setFieldValue("our_placement_description", e)
                  }
                />
                {props.touched.our_placement_description &&
                props.errors.our_placement_description ? (
                  <div className="formik-errors bg-error">
                    {props.errors.our_placement_description}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-12">
                <label className="form-label fs-4">WHY HIRED OUR STUDENT</label>
                <hr />
              </div>{" "} <div className="form-group col-md-12">
                <label className="form-label">
                  Why Hired Title <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="why_hired_title"
                  type="text"
                  placeholder="Enter why_hired_title"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.why_hired_title}
                />
                {props.touched.why_hired_title &&
                props.errors.why_hired_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.why_hired_title}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Card 1 Title<span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="card_1_title"
                  type="text"
                  placeholder="Enter card_1_title"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.card_1_title}
                />
                {props.touched.card_1_title && props.errors.card_1_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.card_1_title}
                  </div>
                ) : null}
              </div>{" "}
              <div className="form-group col-md-6">
                <label className="form-label">
                  Card 2 Title<span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="card_2_title"
                  type="text"
                  placeholder="Enter card_2_title"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.card_2_title}
                />
                {props.touched.card_2_title && props.errors.card_2_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.card_2_title}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Card 1 Description <span className="text-danger">*</span>
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
                  value={props.values.card_1_description}
                  onEditorChange={(e) =>
                    props.setFieldValue("card_1_description", e)
                  }
                />
                {props.touched.card_1_description &&
                props.errors.card_1_description ? (
                  <div className="formik-errors bg-error">
                    {props.errors.card_1_description}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Card 2 Description <span className="text-danger">*</span>
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
                  value={props.values.card_2_description}
                  onEditorChange={(e) =>
                    props.setFieldValue("card_2_description", e)
                  }
                />
                {props.touched.card_2_description &&
                props.errors.card_2_description ? (
                  <div className="formik-errors bg-error">
                    {props.errors.card_2_description}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Card 3 Title<span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="card_3_title"
                  type="text"
                  placeholder="Enter card_3_title"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.card_3_title}
                />
                {props.touched.card_3_title && props.errors.card_3_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.card_3_title}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Card 4 Title<span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="card_4_title"
                  type="text"
                  placeholder="Enter card_4_title"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.card_4_title}
                />
                {props.touched.card_4_title && props.errors.card_4_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.card_4_title}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Card 3 Description <span className="text-danger">*</span>
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
                  value={props.values.card_3_description}
                  onEditorChange={(e) =>
                    props.setFieldValue("card_3_description", e)
                  }
                />
                {props.touched.card_3_description &&
                props.errors.card_3_description ? (
                  <div className="formik-errors bg-error">
                    {props.errors.card_3_description}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Card 4 Description <span className="text-danger">*</span>
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
                  value={props.values.card_4_description}
                  onEditorChange={(e) =>
                    props.setFieldValue("card_4_description", e)
                  }
                />
                {props.touched.card_4_description &&
                props.errors.card_4_description ? (
                  <div className="formik-errors bg-error">
                    {props.errors.card_4_description}
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
