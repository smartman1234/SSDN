import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import MenuOne from "./MenuOne";
import MenuTwo from "./MenuTwo";
import MenuThree from "./MenuThree";
import MenuFour from "./MenuFour";
import TrendingMenuOne from "./TrendingMenuOne";
import TrendingMenuTwo from "./TrendingMenuTwo";
import Follow from "./Follow";
import StaticpageService from "../../../Services/StaticPageService/StaticePageService";
import TrendingMenu from "./TrendingMenu";

export default function FooterForm({ pageName, slug }) {
  const [imageUrl, setImageurl] = useState("");
  const staticeService = new StaticpageService();
  const [logo, setLogo] = useState();
  const [payment1, setPayment1] = useState();
  const [payment2, setPayment2] = useState();
  const [payment3, setPayment3] = useState();
  const [payment4, setPayment4] = useState();
  const [values, setValues] = useState({
    page_name: "",
    page_slug: "",
    logo: "",
    logo_alt_tag: "",
    footer_description: "",
    menu_1_title: "",
    menu_1: [{ title: "", link: "" }],
    menu_2_title: "",
    menu_2: [{ title: "", link: "" }],
    menu_3_title: "",
    menu_3: [{ title: "", link: "" }],
    menu_4_title: "",
    menu_4: [{ title: "", link: "" }],
    follow: [{ icon: "", link: "" }],
    payment_1: "",
    payment_2: "",
    payment_3: "",
    payment_4: "",
    trending_menu: [
      {
        heading: "",
        detail: [
          {
            title: "",
            link: "",
          },
        ],
      },
    ],
  });
  const onSubmit = (values) => {
    const formData = new FormData();

    formData.set("page_name", values.page_name);
    formData.set("page_slug", values.page_slug);
    formData.set("description[logo]", values.logo);
    formData.set("description[logo_alt_tag]", values.logo_alt_tag);
    formData.set("description[footer_description]", values.footer_description);
    formData.set("description[menu_1_title]", values.menu_1_title);
    formData.set("description[menu_1]", JSON.stringify(values.menu_1));
    formData.set("description[menu_2_title]", values.menu_2_title);
    formData.set("description[menu_2]", JSON.stringify(values.menu_2));
    formData.set("description[menu_3_title]", values.menu_3_title);
    formData.set("description[menu_3]", JSON.stringify(values.menu_3));
    formData.set("description[menu_4_title]", values.menu_4_title);
    formData.set("description[menu_4]", JSON.stringify(values.menu_4));
    formData.set("description[follow]", JSON.stringify(values.follow));
    formData.set("description[payment_1]", values.payment_1);
    formData.set("description[payment_2]", values.payment_2);
    formData.set("description[payment_3]", values.payment_3);
    formData.set("description[payment_4]", values.payment_4);
    formData.set(
      "description[trending_menu]",
      JSON.stringify(values.trending_menu)
    );

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
    logo: Yup.mixed().required("Required"),
    logo_alt_tag: Yup.string().required("Required"),
    footer_description: Yup.string().required("Required"),
    menu_1_title: Yup.string().required("Required"),
    menu_1: Yup.array(
      Yup.object().shape({
        title: Yup.string().required("Required"),
        link: Yup.string().required("Required"),
      })
    ),
    menu_2_title: Yup.string().required("Required"),
    menu_2: Yup.array(
      Yup.object().shape({
        title: Yup.string().required("Required"),
        link: Yup.string().required("Required"),
      })
    ),
    menu_3_title: Yup.string().required("Required"),
    menu_3: Yup.array(
      Yup.object().shape({
        title: Yup.string().required("Required"),
        link: Yup.string().required("Required"),
      })
    ),
    menu_4_title: Yup.string().required("Required"),
    menu_4: Yup.array(
      Yup.object().shape({
        title: Yup.string().required("Required"),
        link: Yup.string().required("Required"),
      })
    ),
    follow: Yup.array(
      Yup.object().shape({
        icon: Yup.string().required("Required"),
        link: Yup.string().required("Required"),
      })
    ),
    payment_1: Yup.mixed().required("Required"),
    payment_2: Yup.mixed().required("Required"),
    payment_3: Yup.mixed().required("Required"),
    payment_4: Yup.mixed().required("Required"),
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
        if (name === "logo") {
          getBase64(file)
            .then((result) => {
              file["base64"] = result;
              setLogo(result);
              props.setFieldValue("logo", file);
            })
            .catch((err) => {
              throw err;
            });
        }
        else if (name === "payment_1") {
          if (height > 30 || width > 30) {
            alert(
              "Height should not exceed from 30px and width should not exceed from 30 px"
            );
          } else if (height < 25 || width < 25) {
            alert(
              "Height should not less than from 25px and width should not less than from 25 px"
            );
          } else {
            getBase64(file)
              .then((result) => {
                file["base64"] = result;
                setPayment1(result);
                props.setFieldValue("payment_1", file);
              })
              .catch((err) => {
                
              });
          }
        } else if (name === "payment_2") {
          if (height > 30 || width > 30) {
            alert(
              "Height should not exceed from 30px and width should not exceed from 30 px"
            );
          } else if (height < 25 || width < 25) {
            alert(
              "Height should not less than from 25px and width should not less than from 25 px"
            );
          } else {
            getBase64(file)
              .then((result) => {
                file["base64"] = result;
                setPayment2(result);
                props.setFieldValue("payment_2", file);
              })
              .catch((err) => {
                
              });
          }
        } else if (name === "payment_3") {
          if (height > 30 || width > 30) {
            alert(
              "Height should not exceed from 30px and width should not exceed from 30 px"
            );
          } else if (height < 25 || width < 25) {
            alert(
              "Height should not less than from 25px and width should not less than from 25 px"
            );
          } else {
            getBase64(file)
              .then((result) => {
                file["base64"] = result;
                setPayment3(result);
                props.setFieldValue("payment_3", file);

              })
              .catch((err) => {
                
              });
          }
        } else if (name === "payment_4") {
          if (height > 30 || width > 30) {
            alert(
              "Height should not exceed from 30px and width should not exceed from 30 px"
            );
          } else if (height < 25 || width < 25) {
            alert(
              "Height should not less than from 25px and width should not less than from 25 px"
            );
          } else {
            getBase64(file)
              .then((result) => {
                file["base64"] = result;
                setPayment4(result);
                props.setFieldValue("payment_4", file);

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
          page_name: response.data.page_name,
          page_slug: response.data.page_slug,
          logo: response.data?.page_description?.logo,
          logo_alt_tag: response.data.page_name,
          footer_description:
            response.data?.page_description?.footer_description,
          menu_1_title: response.data?.page_description?.menu_1_title,
          menu_1: JSON.parse(response.data?.page_description?.menu_1),
          menu_2_title: response.data?.page_description?.menu_2_title,
          menu_2: JSON.parse(response.data?.page_description?.menu_2),
          menu_3_title: response.data?.page_description?.menu_3_title,
          menu_3: JSON.parse(response.data?.page_description?.menu_3),
          menu_4_title: response.data?.page_description?.menu_4_title,
          menu_4: JSON.parse(response.data?.page_description?.menu_4),
          follow: JSON.parse(response.data?.page_description?.follow),
          payment_1: response.data?.page_description?.payment_1,
          payment_2: response.data?.page_description?.payment_2,
          payment_3: response.data?.page_description?.payment_3,
          payment_4: response.data?.page_description?.payment_4,
          trending_menu: JSON.parse(
            response.data?.page_description?.trending_menu
          ),
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
              <div
                className={
                  props.values.logo
                    ? "form-group col-md-5"
                    : "form-group col-md-5"
                }
              >
                <label className="form-label">
                  Logo <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="logo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    thumbImagehandle(e, props, "logo");
                  }}
                  placeholder="Enter slug"
                />
                {props.touched.logo && props.errors.logo ? (
                  <div className="formik-errors bg-error">
                    {props.errors.logo}
                  </div>
                ) : null}
              </div>
              {(logo || imageUrl + props.values.logo) && (
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
                    src={logo || imageUrl + props.values.logo}
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
                <label className="form-label">
                  Logo Alt_tag <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="logo_alt_tag"
                  type="text"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.logo_alt_tag}
                  placeholder="Enter  solution1 alt_tag"
                />
                {props.touched.logo_alt_tag && props.errors.logo_alt_tag ? (
                  <div className="formik-errors bg-error">
                    {props.errors.logo_alt_tag}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-12">
                <label className="form-label">Description</label>
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
                  value={props.values.footer_description}
                  onEditorChange={(e) =>
                    props.setFieldValue("footer_description", e)
                  }
                />
                {props.touched.footer_description &&
                props.errors.footer_description ? (
                  <div className="formik-errors bg-error">
                    {props.errors.footer_description}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-12">
                <label className="form-label fs-4">
                  TRENDING CERTIFICATION COURSES
                </label>
                <hr />
              </div>{" "}
              <div className="form-group col-md-12">
                <label className="form-label">
                  Menu 1 Title <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="menu_1_title"
                  type="text"
                  placeholder="Enter skill title"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.menu_1_title}
                />
                {props.touched.menu_1_title && props.errors.menu_1_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.menu_1_title}
                  </div>
                ) : null}
              </div>
              <MenuOne props={props} values={values} />{" "}
              <div className="form-group col-md-12">
                <label className="form-label fs-4">
                  TRENDING MASTER COURSES
                </label>
                <hr />
              </div>
              <div className="form-group col-md-6">
                <label className="form-label ">
                  Menu 2 Title <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="menu_2_title"
                  type="text"
                  placeholder="Enter skill title"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.menu_2_title}
                />
                {props.touched.menu_2_title && props.errors.menu_2_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.menu_2_title}
                  </div>
                ) : null}
              </div>
              <MenuTwo props={props} />
              <div className="form-group col-md-12">
                <label className="form-label fs-4">COMPANY</label>
                <hr />
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Menu 3 Title <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="menu_3_title"
                  type="text"
                  placeholder="Enter skill title"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.menu_3_title}
                />
                {props.touched.menu_3_title && props.errors.menu_3_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.menu_3_title}
                  </div>
                ) : null}
              </div>
              <MenuThree props={props} />{" "}
              <div className="form-group col-md-12">
                <label className="form-label fs-4">WORK WITH US</label>
                <hr />
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Menu 4 Title <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="menu_4_title"
                  type="text"
                  placeholder="Enter skill title"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.menu_4_title}
                />
                {props.touched.menu_4_title && props.errors.menu_4_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.menu_4_title}
                  </div>
                ) : null}
              </div>
              <MenuFour props={props} />
              <div className="form-group col-md-12">
                <label className="form-label fs-4">Follow</label>
                <hr />
              </div>
              <Follow props={props} imageUrl={imageUrl} />
              <div className="form-group col-md-12">
                <label className="form-label fs-4">Payments</label>
                <hr />
              </div>
              <div
                className={
                  props.values.payment_1
                    ? "form-group col-md-5"
                    : "form-group col-md-5"
                }
              >
                <label className="form-label">
                  Payment Image 1{" "}
                  <span className="text-danger">size : 30*30</span>
                </label>
                <input
                  className="form-control"
                  name="payment_1"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    thumbImagehandle(e, props, "payment_1");
                  }}
                  placeholder="Enter slug"
                />
                {props.touched.payment_1 && props.errors.payment_1 ? (
                  <div className="formik-errors bg-error">
                    {props.errors.payment_1}
                  </div>
                ) : null}
              </div>
              {(payment1 || imageUrl + props.values.payment_1) && (
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
                    src={payment1 || imageUrl + props.values.payment_1}
                    alt="image"
                    style={{
                      padding: "0",
                      width: "100%",
                      height: "72%",
                    }}
                  />
                </div>
              )}
              <div
                className={
                  props.values.payment_2
                    ? "form-group col-md-5"
                    : "form-group col-md-5"
                }
              >
                <label className="form-label">
                  Payment Image 2{" "}
                  <span className="text-danger">size : 30*30</span>
                </label>
                <input
                  className="form-control"
                  name="payment_2"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    thumbImagehandle(e, props, "payment_2");
                  }}
                  placeholder="Enter slug"
                />
                {props.touched.payment_2 && props.errors.payment_2 ? (
                  <div className="formik-errors bg-error">
                    {props.errors.payment_2}
                  </div>
                ) : null}
              </div>
              {(payment2 || imageUrl + props.values.payment_2) && (
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
                    src={payment2 || imageUrl + props.values.payment_2}
                    alt="image"
                    style={{
                      padding: "0",
                      width: "100%",
                      height: "72%",
                    }}
                  />
                </div>
              )}
              <div
                className={
                  props.values.payment_3
                    ? "form-group col-md-5"
                    : "form-group col-md-5"
                }
              >
                <label className="form-label">
                  Payment Image 3{" "}
                  <span className="text-danger">size : 30*30</span>
                </label>
                <input
                  className="form-control"
                  name="payment_3"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    thumbImagehandle(e, props, "payment_3");
                  }}
                  placeholder="Enter slug"
                />
                {props.touched.payment_3 && props.errors.payment_3 ? (
                  <div className="formik-errors bg-error">
                    {props.errors.payment_3}
                  </div>
                ) : null}
              </div>
              {(payment3 || imageUrl + props.values.payment_3) && (
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
                    src={payment3 || imageUrl + props.values.payment_3}
                    alt="image"
                    style={{
                      padding: "0",
                      width: "100%",
                      height: "72%",
                    }}
                  />
                </div>
              )}
              <div
                className={
                  props.values.payment_4
                    ? "form-group col-md-5"
                    : "form-group col-md-5"
                }
              >
                <label className="form-label">
                  Payment Image 4{" "}
                  <span className="text-danger"> size : 30*30</span>
                </label>
                <input
                  className="form-control"
                  name="payment_4"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    thumbImagehandle(e, props, "payment_4");
                  }}
                  placeholder="Enter slug"
                />
                {props.touched.payment_4 && props.errors.payment_4 ? (
                  <div className="formik-errors bg-error">
                    {props.errors.payment_4}
                  </div>
                ) : null}
              </div>
              {(payment4 || imageUrl + props.values.payment_4) && (
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
                    src={payment4 || imageUrl + props.values.payment_4}
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
                <label className="form-label fs-4">Trending Menu</label>
                <hr />
              </div>
              <TrendingMenu props={props} />
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
