import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import StaticpageService from "../../../Services/StaticPageService/StaticePageService";

export default function NotFound({
  pageName,
  slug,
 
  
}) {
  const[imageUrl,setImageurl]=useState("")
  const staticeService = new StaticpageService();
  const [notFound, setNotFound] = useState({
    page_name: "",
    page_slug: "",
    block_title: "",
    block_description: "",
    image: "",
  });
  const [image, setImage] = useState();

  const onSubmit = (values) => {
    const formData = new FormData();

    formData.set("page_name", values.page_name);
    formData.set("page_slug", values.slug);
    formData.set("block_title", values.block_title);
    formData.set("description[image]", values.image);
    formData.set("block_description", values.block_description);

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
    image: Yup.mixed().required("Required"),
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
        
        if (name === "image") {
          if (height > 460 || width > 715) {
            alert(
              "Height should not exceed from 460px and width should not exceed from 715 px"
            );
          } else if (height < 455 || width < 710) {
            alert(
              "Height should not less than from 455px and width should not less than from 710 px"
            );
          } else {
            getBase64(file)
              .then((result) => {
                file["base64"] = result;
                setImage(result);
                props.setFieldValue("image", file);
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

        setNotFound({
          page_name: response.data.page_name,
          slug: response.data.page_slug,
          block_title: response.data.block_title,
          block_description: response.data.block_description,
          image: response.data?.page_description?.image,
        });
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <>
      <Formik
        initialValues={notFound}
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
            
              <div className="form-group col-md-6">
                <label className="form-label">
                  Block Title <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="block_title"
                  type="text"
                  placeholder="Enter success title"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.block_title}
                />
                {props.touched.block_title && props.errors.block_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.block_title}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">Block Description</label>
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
              <div
                className={
                  props.values.image
                    ? "form-group col-md-5"
                    : "form-group col-md-6"
                }
              >
                <label className="form-label">
                  Image <span className="text-danger">size : 710*455</span>
                </label>
                <input
                  className="form-control"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    thumbImagehandle(e, props, "image");
                  }}
                  placeholder="Enter slug"
                />
                {props.touched.image && props.errors.image ? (
                  <div className="formik-errors bg-error">
                    {props.errors.image}
                  </div>
                ) : null}
              </div>
              {(image || imageUrl + props.values.image) && (
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
                    src={image || imageUrl + props.values.image}
                    alt="image"
                    style={{
                      padding: "0",
                      width: "100%",
                      height: "72%",
                    }}
                  />
                </div>
              )}
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
