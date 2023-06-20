import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import StaticpageService from "../../../Services/StaticPageService/StaticePageService";

export default function BannerImage({ pageName, slug }) {
  const [imageUrl, setImageurl] = useState("");
  const staticeService = new StaticpageService();
  const [logo, setLogo] = useState();
  const [values, setValues] = useState({
    logo: "",
    logo_alt_tag: "",
  });
  const onSubmit = (values) => {
    const formData = new FormData();

    formData.set("page_name", pageName);
    formData.set("page_slug", slug);
    formData.set("description[logo]", values.logo);
    formData.set("description[logo_alt_tag]", values.logo_alt_tag);

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
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function (e) {
      var image = new Image();
      image.src = e.target.result;
      image.onload = function () {
        var height = this.height;
        var width = this.width;

        if (height > 170 || width > 1464) {
          alert(
            "Height should not exceed from 170 px and width should not exceed from 1464 px"
          );
        } else if (height < 170 || width < 1464) {
          alert(
            "Height should not less than from 170 px and width should not less than from 170 px"
          );
        } else {
            getBase64(file)
              .then((result) => {
                file["base64"] = result;
                setLogo(result);
                props.setFieldValue("logo", file);
              })
              .catch((err) => {});
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
                  Logo <span className="text-danger">1464*170</span>
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
