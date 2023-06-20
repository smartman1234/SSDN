import React, { useState, useEffect, useRef, useContext } from "react";
import { FieldArray, Formik, insert } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import { Link, useParams } from "react-router";
import * as Yup from "yup";
import Select from "react-select";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Context } from "../../../container/Context";
import VoucherCategoryService from "../../../Services/VoucherService/VoucherCategoryService";
import AssessmentService from "../../../Services/AssessmentService";
import VoucherService from "../../../Services/VoucherService/VoucherService";
const VoucherAdd = ({
  voucherValue,
  voucherDetailForm,
  setMetaValues,
  setVoucherValue,
  setpriceValues,
  gettingId,
  setCatId,
  catId,
  parentCategory,
  parentCategoryHandler,
  childCategory,
  getChildCategory,
  image,
  setImage,
}) => {
  const { voucherValues } = useContext(Context);
  const [voucher, setVoucher] = voucherValues;
  const params = useParams();

  const assessmentServe = new AssessmentService();
  const voucherCategoryServe = new VoucherCategoryService();
  const voucherServe = new VoucherService();
  const editorRef = useRef(null);
  const [categoryid, setCategoryId] = useState("");

  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];
  const ValidateSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    slug: Yup.string().required("Required"),
    title: Yup.string().required("Required"),
    overview_heading: Yup.string().required("Required"),
    overview: Yup.string().required("Required"),

    exam_preparation_heading: Yup.string().required("Required"),
    exam_preparation: Yup.string().required("Required"),
    logo: Yup.mixed().required("You need to provide a file"),

    logo_alt_tag: Yup.string().required("Required"),
    voucher_category_id: Yup.string().required("Required"),
  });

  useEffect(() => {
    voucherListApi();
    if (params.id) {
      getVoucherByIdApi();
    }
  }, []);

  const voucherListApi = async () => {
    try {
      let response = await assessmentServe.assessmentList();
      if (response) {
        let items = [];
        for (const i in response.data) {
          items.push({
            value: response.data[i].id,
            label: response.data[i].name,
          });
        }
        setVoucher(response.data);
      }
    } catch (err) {
      throw err;
    }
  };

  const imageApi = async (image, params, props, type, flag = 0) => {
    try {
      let images = [];
      images.push(image);
      const imageData = new FormData();
      imageData.append("image", image);
      imageData.append("type", type);

      const config = {
        headers: {
          content: "multipart/form-data",
          AUTHTOKEN: window.user?.data?.auth_token,
        },
      };
      let loading = false;
      const res = await axios.post(
        process.env.REACT_APP_API_BASEURL + "upload-image",
        imageData,
        config
      );
      if (res.data?.status === "success") {
        props.setFieldValue(params, res.data.data);
        setImage(res.data.path);
        toast.success("Image uploaded successfully");
        if (flag === 1) {
          return res.data.path;
        }
      } else if (res.data?.status === "fail") {
        toast.error(res?.data?.data?.image || "image size is too large");
      }
    } catch (error) {
      toast.error("image not uploaded");
    }
  };

  const getVoucherByIdApi = async () => {
    try {
      let response = await voucherServe.getVoucherDetails(params.id);
      if (response) {
        getChildCategory(response.data.voucher_category_id || catId);
        setVoucherValue({
          id: response.data?.id,
          name: response.data?.name,
          slug: response.data?.slug,
          voucher_category_id: response.data?.voucher_category_id,
          voucher_child_category_id: response.data?.voucher_child_category_id,
          title: response.data?.title,
          recommended_knowledge_heading: response.data
            ?.recommended_knowledge_heading
            ? response.data?.recommended_knowledge_heading
            : "",
          recommended_knowledge: response.data?.recommended_knowledge
            ? response.data?.recommended_knowledge
            : "",
          exam_overview_heading: response.data?.exam_overview_heading
            ? response.data?.exam_overview_heading
            : "",
          exam_overview: response.data?.exam_overview
            ? response.data?.exam_overview
            : "",
          exam_preparation_heading: response.data?.exam_preparation_heading,
          exam_preparation: response.data?.exam_preparation,
          faq: response.data?.faq === null ? "" : response.data?.faq,
          overview_heading: response.data?.overview_heading,
          overview: response.data?.overview,
          related_voucher: response.data?.related_voucher,
          categories_id: response.data?.categories_id,
          logo: response.data?.logo,
          logo_alt_tag: response.data?.logo_alt_tag,
          description: response.data?.description,
          exam_instruction: response.data?.exam_instruction,
          related_assessment: JSON.parse(response.data.related_assessment),
        });
        setpriceValues({
          inr_price: response.data.inr_price,
          is_inr_discount:
            response.data.is_inr_discount &&
            response.data.is_inr_discount.toString(),
          inr_discount_price: response.data.inr_discount_price,
          usd_price: response.data.usd_price ? response.data.usd_price : "",
          sgd_price: response.data.sgd_price ? response.data.sgd_price : "",
          eur_price: response.data.eur_price ? response.data.eur_price : "",
          is_usd_discount:
            response.data.is_usd_discount &&
            response.data.is_usd_discount.toString(),
          is_sgd_discount:
            response.data.is_sgd_discount &&
            response.data.is_sgd_discount.toString(),
          is_eur_discount:
            response.data.is_eur_discount &&
            response.data.is_eur_discount.toString(),
          usd_discount_price: response.data.usd_discount_price,
          sgd_discount_price: response.data.sgd_discount_price,
          eur_discount_price: response.data.eur_discount_price,
          inr_min_discount_price: response.data.inr_min_discount_price
            ? response.data.inr_min_discount_price
            : "",
          usd_min_discount_price: response.data.usd_min_discount_price
            ? response.data.usd_min_discount_price
            : "",
          sgd_min_discount_price: response.data.sgd_min_discount_price
            ? response.data.sgd_min_discount_price
            : "",
          eur_min_discount_price: response.data.eur_min_discount_price
            ? response.data.eur_min_discount_price
            : "",
        });
        setMetaValues({
          meta_title: response.data.meta_title,
          meta_keyword: response.data.meta_keyword,
          meta_description: response.data.meta_description,
          breadcrumb:
            response.data.breadcrumb === null ? "" : response.data.breadcrumb,
          related_voucher:
            response.data.voucher_valid_for === null
              ? ""
              : response.data.voucher_valid_for,
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
      <Formik
        initialValues={voucherValue}
        onSubmit={voucherDetailForm}
        enableReinitialize={true}
        validationSchema={ValidateSchema}
      >
        {(props) => (
          <form className="form theme-form" onSubmit={props.handleSubmit}>
            <div className="row">
              <div className="form-group col-md-6">
                <label className="form-label">
                  Category <span className="text-danger">*</span>
                </label>

                <select
                  className="form-select"
                  name="voucher_category_id"
                  value={props.values.voucher_category_id}
                  onChange={(e) => {
                    setCatId(e.target.value);
                    parentCategoryHandler(props, e, categoryid);
                  }}
                >
                  <option selected={false} disabled value="">
                    Select category
                  </option>
                  {parentCategory?.map((v, i) => (
                    <option key={i} value={v.id}>
                      {v.name}
                    </option>
                  ))}
                </select>
                {props.touched.voucher_category_id &&
                props.errors.voucher_category_id ? (
                  <div className="formik-errors bg-error">
                    {props.errors.voucher_category_id}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">Child Category</label>
                <select
                  className="form-select"
                  value={props.values?.voucher_child_category_id}
                  name="voucher_child_category_id"
                  onChange={(e) => {
                    props.setFieldValue(
                      "voucher_child_category_id",
                      e.target.value
                    );
                  }}
                >
                  <option value={0}>Select category</option>
                  {childCategory.length > 0 &&
                    childCategory?.map((v, i) => (
                      <option
                        key={i}
                        value={v.id}
                        selected={
                          v.id == props.values?.voucher_child_category_id
                        }
                      >
                        {v.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Name <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="name"
                  type="text"
                  onChange={(event) => {
                    props.setFieldValue("name", event.target.value);
                    if (!params.id) {
                      props.setFieldValue("slug", event.target.value);
                    }
                  }}
                  onBlur={props.handleBlur}
                  value={props.values.name}
                  placeholder="Enter voucher name"
                />
                {props.touched.name && props.errors.name ? (
                  <div className="formik-errors bg-error">
                    {props.errors.name}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Slug <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="slug"
                  type="text"
                  placeholder="Enter voucher url"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.slug.replaceAll(" ", "-").toLowerCase()}
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
                  type="text"
                  placeholder="Enter voucher title"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.title}
                />
                {props.touched.title && props.errors.title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.title}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Logo Image <span className="text-danger">*</span>
                </label>

                <input
                  className="form-control"
                  name="logo"
                  type="file"
                  accept="image/*"
                  placeholder="Enter voucher title"
                  onChange={(event) => {
                    imageApi(event.target.files[0], "logo", props, "voucher");
                  }}
                />
                {props.touched.logo && props.errors.logo ? (
                  <div className="formik-errors bg-error">
                    {props.errors.logo}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Logo alt tag <span className="text-danger">*</span>
                </label>

                <input
                  className="form-control"
                  name="logo_alt_tag"
                  type="text"
                  placeholder="logo_alt_tag"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.logo_alt_tag}
                />
                {props.touched.logo_alt_tag && props.errors.logo_alt_tag ? (
                  <div className="formik-errors bg-error">
                    {props.errors.logo_alt_tag}
                  </div>
                ) : null}
              </div>
              <div
                className="input-group-append col-md-2"
                style={{
                  top: "25px",
                  paddingLeft: "0px",
                  height: "49px",
                  width: "55px",
                }}
              >
                {(image || voucherValue?.logo) && (
                  <img
                    src={image || voucherValue?.logo}
                    alt="image"
                    style={{
                      padding: "0",
                      width: "100%",
                      height: "72%",
                    }}
                  />
                )}
              </div>
              <div
                className="input-group-append col-md-2"
                style={{
                  top: "25px",
                  paddingLeft: "0px",
                  height: "49px",
                  width: "55px",
                }}
              >
                {voucherValue?.image && (
                  <img
                    src={voucherValue?.image}
                    alt="image"
                    style={{
                      padding: "0",
                      width: "100%",
                      height: "72%",
                    }}
                  />
                )}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Overview Heading <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="overview_heading"
                  type="text"
                  placeholder="Enter voucher overview heading"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.overview_heading}
                />
                {props.touched.overview_heading &&
                props.errors.overview_heading ? (
                  <div className="formik-errors bg-error">
                    {props.errors.overview_heading}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Exam Preparation Heading
                  <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="exam_preparation_heading"
                  type="text"
                  placeholder="Enter voucher preparation heading"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.exam_preparation_heading}
                />
                {props.touched.exam_preparation_heading &&
                props.errors.exam_preparation_heading ? (
                  <div className="formik-errors bg-error">
                    {props.errors.exam_preparation_heading}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Overview Description
                  <span className="text-danger"> *</span>
                </label>
                <Editor
                  selector="textarea"
                  apiKey="j1g23ad6n3ra8f5lbnbe3nldrui85ygcv9zwc1ao74848kmj"
                  onInit={(evt, editor) => {
                    editorRef.current = editor;
                  }}
                  init={{
                    image_title: true,
                    automatic_uploads: true,
                    file_browser_callback_types: "file image media",
                    default_link_target: "_blank",
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "insert",
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
                    file_picker_callback: function (cb, value, meta) {
                      var input = document.createElement("input");
                      input.setAttribute("type", "file");
                      input.setAttribute("accept", "image/*");
                      input.onchange = async function () {
                        var file = this.files[0];
                        const imagePathApi = await imageApi(
                          file,
                          "image",
                          props,
                          "voucher",
                          1
                        );

                        cb(imagePathApi, {
                          text: "My text",
                        });
                      };
                      input.click();
                    },
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                  onEditorChange={(e) =>
                    props.handleChange({
                      target: {
                        name: "overview",
                        value: e,
                      },
                    })
                  }
                  value={props.values.overview}
                />
                {props.touched.overview && props.errors.overview ? (
                  <div className="formik-errors bg-error">
                    {props.errors.overview}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Exam preparation Description
                  <span className="text-danger"> *</span>
                </label>
                <Editor
                  textareaName="content"
                  apiKey="j1g23ad6n3ra8f5lbnbe3nldrui85ygcv9zwc1ao74848kmj"
                  onInit={(evt, editor) => {
                    editorRef.current = editor;
                  }}
                  init={{
                    image_title: true,
                    automatic_uploads: true,
                    file_browser_callback_types: "file image media",
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
                    file_picker_callback: function (cb, value, meta) {
                      var input = document.createElement("input");
                      input.setAttribute("type", "file");
                      input.setAttribute("accept", "image/*");
                      input.onchange = async function () {
                        var file = this.files[0];
                        const imagePathApi = await imageApi(
                          file,
                          "image",
                          props,
                          "voucher",
                          1
                        );

                        cb(imagePathApi, {
                          text: "My text",
                        });
                      };
                      input.click();
                    },
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                  onEditorChange={(e) =>
                    props.handleChange({
                      target: {
                        name: "exam_preparation",
                        value: e,
                      },
                    })
                  }
                  value={props.values.exam_preparation}
                />
                {props.touched.exam_preparation &&
                props.errors.exam_preparation ? (
                  <div className="formik-errors bg-error">
                    {props.errors.exam_preparation}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">Exam Overview Heading</label>
                <input
                  className="form-control"
                  name="exam_overview_heading"
                  type="text"
                  placeholder="Enter voucher exam overview heading"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.exam_overview_heading}
                />
                {props.touched.exam_overview_heading &&
                props.errors.exam_overview_heading ? (
                  <div className="formik-errors bg-error">
                    {props.errors.exam_overview_heading}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Recommended Knowledge Heading
                </label>
                <input
                  className="form-control"
                  name="recommended_knowledge_heading"
                  type="text"
                  placeholder="Enter voucher knowledge heading"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.recommended_knowledge_heading}
                />
                {props.touched.recommended_knowledge_heading &&
                props.errors.recommended_knowledge_heading ? (
                  <div className="formik-errors bg-error">
                    {props.errors.recommended_knowledge_heading}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">Exam Overview Description</label>
                <Editor
                  textareaName="content"
                  apiKey="j1g23ad6n3ra8f5lbnbe3nldrui85ygcv9zwc1ao74848kmj"
                  onInit={(evt, editor) => {
                    editorRef.current = editor;
                  }}
                  init={{
                    image_title: true,
                    automatic_uploads: true,
                    file_browser_callback_types: "file image media",
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
                    file_picker_callback: function (cb, value, meta) {
                      var input = document.createElement("input");
                      input.setAttribute("type", "file");
                      input.setAttribute("accept", "image/*");
                      input.onchange = async function () {
                        var file = this.files[0];
                        const imagePathApi = await imageApi(
                          file,
                          "image",
                          props,
                          "voucher",
                          1
                        );

                        cb(imagePathApi, {
                          text: "My text",
                        });
                      };
                      input.click();
                    },
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                  value={props.values.exam_overview}
                  onEditorChange={(e) =>
                    props.handleChange({
                      target: {
                        name: "exam_overview",
                        value: e,
                      },
                    })
                  }
                />
                {props.touched.exam_overview && props.errors.exam_overview ? (
                  <div className="formik-errors bg-error">
                    {props.errors.exam_overview}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Recommended Knowledge Description
                </label>
                <Editor
                  textareaName="content"
                  apiKey="j1g23ad6n3ra8f5lbnbe3nldrui85ygcv9zwc1ao74848kmj"
                  onInit={(evt, editor) => {
                    editorRef.current = editor;
                  }}
                  init={{
                    image_title: true,
                    automatic_uploads: true,
                    file_browser_callback_types: "file image media",
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
                    file_picker_callback: function (cb, value, meta) {
                      var input = document.createElement("input");
                      input.setAttribute("type", "file");
                      input.setAttribute("accept", "image/*");
                      input.onchange = async function () {
                        var file = this.files[0];
                        const imagePathApi = await imageApi(
                          file,
                          "image",
                          props,
                          "voucher",
                          1
                        );

                        cb(imagePathApi, {
                          text: "My text",
                        });
                      };
                      input.click();
                    },
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                  value={props.values.recommended_knowledge}
                  onEditorChange={(e) =>
                    props.handleChange({
                      target: {
                        name: "recommended_knowledge",
                        value: e,
                      },
                    })
                  }
                />
                {props.touched.recommended_knowledge &&
                props.errors.recommended_knowledge ? (
                  <div className="formik-errors bg-error">
                    {props.errors.recommended_knowledge}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">FAQ's</label>
                <Editor
                  textareaName="content"
                  apiKey="j1g23ad6n3ra8f5lbnbe3nldrui85ygcv9zwc1ao74848kmj"
                  onInit={(evt, editor) => {
                    editorRef.current = editor;
                  }}
                  init={{
                    image_title: true,
                    automatic_uploads: true,
                    file_browser_callback_types: "file image media",
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "insert",
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
                      " undo redo | blocks | image code | formatselect | bold italic backcolor | insert \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help ",
                    file_picker_callback: function (cb, value, meta) {
                      var input = document.createElement("input");
                      input.setAttribute("type", "file");
                      input.setAttribute("accept", "image/*");
                      input.onchange = async function () {
                        var file = this.files[0];
                        const imagePathApi = await imageApi(
                          file,
                          "image",
                          props,
                          "voucher",
                          1
                        );

                        cb(imagePathApi, {
                          text: "My text",
                        });
                      };
                      input.click();
                    },
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                  value={props.values.faq}
                  onEditorChange={(e) =>
                    props.handleChange({
                      target: {
                        name: "faq",
                        value: e,
                      },
                    })
                  }
                />
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">Related Assessment Product</label>
                <Select
                  onChange={(value) =>
                    props.setFieldValue("related_assessment", value)
                  }
                  options={voucher}
                  value={props.values?.related_assessment}
                  name="related_voucher"
                  isMulti
                />
              </div>
              <div className="text-end btn-mb">
                <button
                  className="btn btn-primary"
                  type="submit"
                  style={{ display: "inline" }}
                >
                  Next <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default VoucherAdd;
