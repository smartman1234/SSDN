import React, { useState, useEffect } from "react";
import { json, Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
import Breadcrumb from "../../../BreadCrumb/Breadcrumb";
import axios from "axios";
import CourseService from "../../../../Services/CourseService/CourseService";

const CategoryAdd = () => {
  const [file, setFile] = useState(null);
  const [base64URL, setBase64URL] = useState("");
  const [allCategoryList, setAllCategoryList] = useState([]);
  const [icon, setIcon] = useState("");
  const [detailImage, setDetailImage] = useState("");
  const [blogImage1, setBlogImage1] = useState();
  const [blogImage2, setBlogImage2] = useState();
  const [blogImage3, setBlogImage3] = useState();
  const params = useParams();
  const navigate = useNavigate();
  const categoryServe = new CourseService();
  const [values, setValues] = useState({
    heading: "",
    name: "",
    slug: "",
    headline: "",
    type: "",
    parent: "",
    description: "",
    icon: "",
    detail_image: "",
    image_alt_tag: "",
    tag: "",
    title: "",
    keyword: "",
    meta_description: "",
    breadcrumb: "",
    label1: "",
    link1: "",
    label1_image: "",
    date1: "",
    label2: "",
    link2: "",
    image2: "",
    date2: "",
    label3: "",
    link3: "",
    label3_image: "",
    date3: "",
  });

  const VoucherSchema = Yup.object().shape({
    heading: Yup.string().required("Required"),
    headline: Yup.string().required("Required"),
    type: Yup.string().required("Required"),
    name: Yup.string().required("Required"),
    detail_image: Yup.mixed().required("Required"),
    image_alt_tag: Yup.string().required("Required"),
    slug: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    tag: Yup.string().required("Required"),
    title: Yup.string().required("Required"),
    keyword: Yup.string().required("Required"),
    meta_description: Yup.string().required("Required"),
    icon: Yup.mixed().required("Required"),
  });

  const onSubmit = async (values) => {
    const blogData = [
      {
        title: values.label1,
        link: values.link1,
        image: values.label1_image,
        date: values.date1,
      },
      {
        title: values.label2,
        link: values.link2,
        image: values.image2,
        date: values.date2,
      },
      {
        title: values.label3,
        link: values.link3,
        image: values.label3_image,
        date: values.date3,
      },
    ];
    const formData = new FormData();
    if (values.id) {
      formData.set("id", values.id);
    }
    formData.set("name", values.name);
    formData.set("slug", values.slug.replaceAll(" ", "-").toLowerCase());
    formData.set("heading", values.heading);
    formData.set("headline", values.headline);
    formData.set("description", values.description);
    formData.set("type", values.type);
    formData.set("icon", values.icon);
    formData.set("icone_alt_tag", values.tag);
    formData.set("parent_id", parseInt(values.parent ? values.parent : "0"));
    formData.set("meta_title", values.title);
    formData.set("meta_keyword", values.keyword);
    formData.set("meta_description", values.meta_description);
    formData.set("blogs", JSON.stringify(blogData));
    formData.set("breadcrumb", values.breadcrumb);
    formData.set("image", values.detail_image);
    formData.set("image_alt_tag", values.image_alt_tag);

    const config = {
      headers: {
        content: "multipart/form-data",
        AUTHTOKEN: window.user?.data?.auth_token,
      },
    };
    if (values.id) {
      try {
        const response = await axios.post(
          process.env.REACT_APP_API_BASEURL + `course/update-category`,
          formData,
          config
        );
        if (response.data?.status === "success") {
          toast.success("Record update successfully");
          setTimeout(() => {
            navigate("/course-category");
          }, [1000]);
        } else {
          toast.error(response.data?.name);
        }
      } catch (err) {
        throw err;
      }
    } else {
      axios
        .post(
          process.env.REACT_APP_API_BASEURL + "course/category-create",
          formData,
          config
        )
        .then((res) => {
          if (res.data?.status === "success") {
            toast.success("Course created successfully");
            setTimeout(() => {
              navigate("/course-category");
            }, [1000]);
          } else if (
            res?.data?.data?.name === "The name has already been taken."
          ) {
            toast.error("Name has been already taken!");
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          throw err;
        });
    }
  };

  const getDepartmentDetail = async () => {
    try {
      let response = await categoryServe.getCourseCategorydata(params.id);
      if (response.status === "success") {
        setValues({
          id: response.data.id,
          heading: response.data.heading,
          name: response.data.name,
          slug: response.data.slug,
          headline: response.data.headline,
          type: response.data.type,
          parent: response.data?.parent_category?.value,
          description: response.data.description,
          icon: response.data.icon,
          tag: response.data.icone_alt_tag,
          title: response.data.meta_title,
          keyword: response.data.meta_keyword,
          meta_description: response.data.meta_description,
          breadcrumb: response.data.breadcrumb ? response.data.breadcrumb : "",
          label1: response.data.blogs?.[0]?.title,
          link1: response.data.blogs?.[0]?.link,
          label1_image: response.data.blogs?.[0]?.image,
          date1: response.data.blogs?.[0]?.date,
          label3_image: response.data.blogs?.[2]?.image,
          label2: response.data.blogs?.[1]?.title,
          link2: response.data.blogs?.[1]?.link,
          image2: response.data.blogs?.[1]?.image,
          date2: response.data.blogs?.[1]?.date,
          label3: response.data.blogs?.[2]?.title,
          link3: response.data.blogs?.[2]?.link,
          date3: response.data.blogs?.[2]?.date,
          detail_image: response.data.image,
          image_alt_tag: response.data.image_alt_tag,
        });
      } else {
      }
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    if (params.id) {
      getDepartmentDetail();
    }
    getParentCategory();
  }, []);

  const getParentCategory = async () => {
    let obj = { parent_id: "-1" };
    try {
      let response = await categoryServe.parentcategory(obj);
      if (response) {
        setAllCategoryList(response.data);
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

  const handleFileInputChange = (e, name) => {
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
        if (name === "icon") {
          if (height > 90 || width > 90) {
            alert(
              "Height should not exceed from 90px and width should not exceed from 90 px"
            );
          } else if (height < 90 || width < 90) {
            alert(
              "Height should not less than from 90px and width should not less than from 90 px"
            );
          } else {
            getBase64(file)
              .then((result) => {
                file["base64"] = result;

                setIcon(result);
              })
              .catch((err) => {});
          }
        } else if (name === "detail_image") {
          if (height > 360 || width > 360) {
            alert(
              "Height should not exceed from 360px and width should not exceed from 360 px"
            );
          } else if (height < 360 || width < 360) {
            alert(
              "Height should not less than from 360px and width should not less than from 360 px"
            );
          } else {
            getBase64(file)
              .then((result) => {
                file["base64"] = result;
                setDetailImage(result);
              })
              .catch((err) => {});
          }
        } else if (name === "label1_image") {
          getBase64(file)
            .then((result) => {
              file["base64"] = result;
              setBlogImage1(result);
            })
            .catch((err) => {});
        } else if (name === "image2") {
          getBase64(file)
            .then((result) => {
              file["base64"] = result;

              setBlogImage2(result);
            })
            .catch((err) => {});
        } else if (name === "label3_image") {
          getBase64(file)
            .then((result) => {
              file["base64"] = result;

              setBlogImage3(result);
            })
            .catch((err) => {});
        }
      };
    };
  };

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
          if (name === "label1_image") {
            props.setFieldValue(name, res.data.data);
            setBlogImage1(res.data.path);
          } else if (name === "image2") {
            props.setFieldValue(name, res.data.data);
            setBlogImage2(res.data.path);
          } else {
            props.setFieldValue(name, res.data.data);
            setBlogImage3(res.data.path);
          }

          toast.success("Image uploaded successfully");
        } else if (res.data?.status === "fail") {
          toast.error("image size is too large");
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  const name = (
    <Link to="/course-category" className="btn btn-primary">
      Back
    </Link>
  );
  return (
    <>
      <div className="page-body">
        <Breadcrumb
          heading={params.id ? "Edit Course Category" : "Add Course Category"}
          add={name}
        />
        <div className="container-fluid support-ticket">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>
                    {params.id ? "Edit Course Category" : "Add Course Category"}
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
                              Heading <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              name="heading"
                              type="text"
                              value={props.values.heading}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              placeholder="Enter category heading"
                            />
                            {props.touched.heading && props.errors.heading ? (
                              <div className="formik-errors bg-error">
                                {props.errors.heading}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Name <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              value={props.values.name}
                              onChange={(event) => {
                                props.setFieldValue("name", event.target.value);
                                if (!params.id) {
                                  props.setFieldValue(
                                    "slug",
                                    event.target.value
                                  );
                                }
                              }}
                              onBlur={props.handleBlur}
                              name="name"
                              type="text"
                              placeholder="Enter category name"
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
                              value={props.values.slug
                                .replaceAll(" ", "-")
                                .toLowerCase()}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              name="slug"
                              type="text"
                              placeholder="Enter category slug"
                            />
                            {props.touched.slug && props.errors.slug ? (
                              <div className="formik-errors bg-error">
                                {props.errors.slug}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Headline <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              value={props.values.headline}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              name="headline"
                              type="text"
                              placeholder="Enter headline"
                            />{" "}
                            {props.touched.headline && props.errors.headline ? (
                              <div className="formik-errors bg-error">
                                {props.errors.headline}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Type <span className="text-danger">*</span>
                            </label>
                            <select
                              className="form-select"
                              name="type"
                              value={props.values.type}
                              onChange={props.handleChange}
                            >
                              <option value="">Select type</option>
                              <option value="infrastructure">
                                IT Infrastructure
                              </option>
                              <option value="software">Software Course</option>
                            </select>{" "}
                            {props.touched.type && props.errors.type ? (
                              <div className="formik-errors bg-error">
                                {props.errors.type}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">Parent</label>
                            <select
                              className="form-select"
                              name="parent"
                              onChange={(e) => {
                                props.setFieldValue("parent", e.target.value);
                              }}
                              value={props.values.parent}
                            >
                              <option value="0">Select parent</option>
                              {allCategoryList?.length > 0 &&
                                allCategoryList.map((v, i) => (
                                  <option key={i} value={v.value}>
                                    {v.label}
                                  </option>
                                ))}
                            </select>
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Description <span className="text-danger">*</span>
                            </label>
                            <Editor
                              textareaName="content"
                              apiKey="j1g23ad6n3ra8f5lbnbe3nldrui85ygcv9zwc1ao74848kmj"
                              value={props.values.description}
                              onEditorChange={(e) =>
                                props.setFieldValue("description", e)
                              }
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
                            />
                            {props.touched.description &&
                            props.errors.description ? (
                              <div className="formik-errors bg-error">
                                {props.errors.description}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <div className="row">
                              <div className="form-group col-md-12">
                                <label className="form-label">
                                  Icon <span className="text-danger">*</span>
                                </label>
                                <span className="text-danger image-data">
                                  Image Size: 90 X 90
                                </span>
                                <input
                                  className="form-control"
                                  onChange={(e) => {
                                    props.setFieldValue(
                                      "icon",
                                      e.target.files[0]
                                    );
                                    handleFileInputChange(e, "icon");
                                  }}
                                  onBlur={props.handleBlur}
                                  name="icon"
                                  type="file"
                                  accept="image/*"
                                  placeholder="Enter voucher title"
                                />
                                {props.touched.icon && props.errors.icon ? (
                                  <div className="formik-errors bg-error">
                                    {props.errors.icon}
                                  </div>
                                ) : null}
                                <div
                                  className="input-group-append col-md-2"
                                  style={{
                                    top: "25px",
                                    paddingLeft: "0px",
                                    height: "49px",
                                    width: "55px",
                                  }}
                                >
                                  {(icon || props.values.icon) && (
                                    <img
                                      src={icon || props.values.icon}
                                      alt="image"
                                      style={{
                                        padding: "0",
                                        width: "100%",
                                        height: "72%",
                                      }}
                                    />
                                  )}
                                </div>
                              </div>
                              <div className="form-group col-md-12">
                                <label className="form-label">
                                  Icon Alt Text{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  value={props.values.tag}
                                  onChange={props.handleChange}
                                  onBlur={props.handleBlur}
                                  name="tag"
                                  type="text"
                                  placeholder="Enter Icon Alt Text"
                                />
                                {props.touched.tag && props.errors.tag ? (
                                  <div className="formik-errors bg-error">
                                    {props.errors.tag}
                                  </div>
                                ) : null}
                              </div>
                              <div className="form-group col-md-12">
                                <label className="form-label">
                                  Detail Image{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <span className="text-danger image-data">
                                  Image Size: 360 X 360
                                </span>
                                <input
                                  className="form-control"
                                  onChange={(e) => {
                                    props.setFieldValue(
                                      "detail_image",
                                      e.target.files[0]
                                    );
                                    handleFileInputChange(e, "detail_image");
                                  }}
                                  onBlur={props.handleBlur}
                                  name="detail_image"
                                  accept="image/*"
                                  type="file"
                                />
                                {props.touched.detail_image &&
                                props.errors.detail_image ? (
                                  <div className="formik-errors bg-error">
                                    {props.errors.detail_image}
                                  </div>
                                ) : null}
                                <div
                                  className="input-group-append col-md-2"
                                  style={{
                                    top: "25px",
                                    paddingLeft: "0px",
                                    height: "49px",
                                    width: "55px",
                                  }}
                                >
                                  {(detailImage ||
                                    props.values.detail_image) && (
                                    <img
                                      src={
                                        detailImage || props.values.detail_image
                                      }
                                      alt="image"
                                      style={{
                                        padding: "0",
                                        width: "100%",
                                        height: "72%",
                                      }}
                                    />
                                  )}
                                </div>
                              </div>
                              <div className="form-group col-md-12">
                                <label className="form-label">
                                  Image Alt Text{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  value={props.values.image_alt_tag}
                                  onChange={props.handleChange}
                                  onBlur={props.handleBlur}
                                  name="image_alt_tag"
                                  type="text"
                                  placeholder="Enter image alt text"
                                />
                                {props.touched.image_alt_tag &&
                                props.errors.image_alt_tag ? (
                                  <div className="formik-errors bg-error">
                                    {props.errors.image_alt_tag}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <hr />
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Meta Tag Title{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              value={props.values.title}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              name="title"
                              type="text"
                              placeholder="Enter meta tag title"
                            />
                            {props.touched.title && props.errors.title ? (
                              <div className="formik-errors bg-error">
                                {props.errors.title}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Meta Tag Keywords{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              value={props.values.keyword}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              name="keyword"
                              type="text"
                              placeholder="Enter meta tag keywords"
                            />
                            {props.touched.keyword && props.errors.keyword ? (
                              <div className="formik-errors bg-error">
                                {props.errors.keyword}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Meta Tag Description{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <textarea
                              className="form-control"
                              value={props.values.meta_description}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              name="meta_description"
                              placeholder="Enter  meta tag description"
                            ></textarea>
                            {props.touched.meta_description &&
                            props.errors.meta_description ? (
                              <div className="formik-errors bg-error">
                                {props.errors.meta_description}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Breadcrumb / Event Scheme Description
                            </label>
                            <textarea
                              className="form-control"
                              value={props.values.breadcrumb}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              name="breadcrumb"
                              placeholder="Enter  Breadcrumb / Event Scheme description"
                            ></textarea>
                          </div>
                          <h5 className="form-label">Blog</h5>
                          <hr />
                          <div className="form-group col-md-6">
                            <label className="form-label">Label 1</label>
                            <input
                              className="form-control"
                              value={props.values.label1}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              name="label1"
                              type="text"
                              placeholder="Enter label 1"
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">Link 1</label>
                            <input
                              className="form-control"
                              value={props.values.link1}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              name="link1"
                              type="text"
                              placeholder="Enter link 1"
                            />{" "}
                          </div>
                          <div className="form-group col-md-5">
                            <label className="form-label">Image</label>

                            <input
                              className="form-control"
                              onChange={(event) => {
                                imageApi(
                                  props,
                                  "label1_image",
                                  event.target.files[0],
                                  "course_category_blog"
                                );
                              }}
                              onBlur={props.handleBlur}
                              name="label1_image"
                              accept="image/*"
                              type="file"
                            />
                          </div>
                          <div className="form-group col-md-1">
                            {(blogImage1 || props.values.label1_image) && (
                              <img
                                src={blogImage1 || props.values.label1_image}
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
                            <label className="form-label">Date</label>
                            <input
                              className="form-control"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              name="date1"
                              value={props.values.date1}
                              type="date"
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">Label 2</label>
                            <input
                              className="form-control"
                              value={props.values.label2}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              name="label2"
                              type="text"
                              placeholder="Enter label 2"
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">Link 2</label>
                            <input
                              className="form-control"
                              value={props.values.link2}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              name="link2"
                              type="text"
                              placeholder="Enter link 2"
                            />{" "}
                          </div>
                          <div className="form-group col-md-5">
                            <label className="form-label">Image</label>

                            <input
                              className="form-control"
                              onChange={(event) => {
                                imageApi(
                                  props,
                                  "image2",
                                  event.target.files[0],
                                  "course_category_blog"
                                );
                              }}
                              onBlur={props.handleBlur}
                              name="image2"
                              accept="image/*"
                              type="file"
                            />
                          </div>
                          <div className="form-group col-md-1">
                            {(blogImage2 || props.values.image2) && (
                              <img
                                src={blogImage2 || props.values.image2}
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
                            <label className="form-label">Date</label>
                            <input
                              className="form-control"
                              value={props.values.date2}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              name="date2"
                              type="date"
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">Label 3</label>
                            <input
                              className="form-control"
                              value={props.values.label3}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              name="label3"
                              type="text"
                              placeholder="Enter label 3"
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">Link 3</label>
                            <input
                              className="form-control"
                              value={props.values.link3}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              name="link3"
                              type="text"
                              placeholder="Enter link 3"
                            />{" "}
                          </div>
                          <div className="form-group col-md-5">
                            <label className="form-label">Image</label>

                            <input
                              className="form-control"
                              onChange={(event) => {
                                imageApi(
                                  props,
                                  "label3_image",
                                  event.target.files[0],
                                  "course_category_blog"
                                );
                              }}
                              accept="image/*"
                              onBlur={props.handleBlur}
                              name="label3_image"
                              type="file"
                            />
                          </div>
                          <div className="form-group col-md-1">
                            {(blogImage3 || props.values.label3_image) && (
                              <img
                                src={blogImage3 || props.values.label3_image}
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
                            <label className="form-label">Date</label>
                            <input
                              className="form-control"
                              value={props.values.date3}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              name="date3"
                              type="date"
                            />
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
};

export default CategoryAdd;
