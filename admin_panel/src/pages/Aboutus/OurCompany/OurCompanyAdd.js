import React, { useState, useContext, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { Context } from "../../../container/Context";
import axios from "axios";
import AboutCompanyService from "../../../Services/AboutService/AboutCompanyService";

const OurCompanyAdd = () => {
  const serve = new AboutCompanyService();
  const navigate = useNavigate();
  const [mediaImage, setMediaImage] = useState("");
  const [thumbImage, setThumbImage] = useState("");
  const { login, permissions } = useContext(Context);
  const [loginData, setLoginData] = login;
  const [pagesData, setPagesData] = useState([]);
  const [rolePermission, setRolePermission] = permissions;
  const [values, setValues] = useState({
    sub_heading: "",
    heading: "",
    media_type: "",
    video_type: "",
    media: "",
    video: "",
    thumb_image: "",
    image_alt_tag: "",
    description: "",
  });
  const [AboutId, setAboutId] = useState(0);
  const [formData, setformData] = useState([]);
  const [formError, setformError] = useState([]);
  const error = {};
  let auth_token = "";
  let local_storage,
    url = "";
  var localstorage_ = localStorage.getItem("user");
  if (localstorage_.length > 0) {
    local_storage = JSON.parse(localstorage_);
    auth_token = local_storage.data.auth_token;
    url = process.env.REACT_APP_API_BASEURL;
  }
  const onSubmit = async (values) => {

    const formData = new FormData();
    if (values.id) {
      formData.set("id", values.id);
    }
    formData.set("heading", values.heading);
    formData.set("sub_heading", values.sub_heading);
    formData.set("long_description", values.description);
    formData.set("media_type", values.media_type);
    if (values.media_type === "video") {
      formData.set("video_type", values.video_type);
      formData.set("video", values.video);
      formData.set("image_alt_tag", values.image_alt_tag);
      formData.set("image", values.thumb_image);
    } else {
      formData.set("image", values.media);
      formData.set("image_alt_tag", values.image_alt_tag);
    }

    const config = {
      headers: {
        content: "multipart/form-data",
        AUTHTOKEN: window.user?.data?.auth_token,
      },
    };
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_BASEURL + `about/update-about-company`,
        formData,
        config
      );
      if (response.data?.status === "success") {
        toast.success("Record update successfully");
      } else {
        toast.error(response.data?.data?.image || response.data.message);
      }
    } catch (err) {
      throw err;
    }
  };
  const VoucherSchema = Yup.object().shape({
    media_type: Yup.string().required("Required"),
    media: Yup.string()
      .when("media_type", {
        is: (media_type) => media_type && media_type === "image",
        then: Yup.string().required(),
      })
      .nullable(),
    video_type: Yup.string()
      .when("media_type", {
        is: (media_type) => media_type && media_type === "video",
        then: Yup.string().required(),
      })
      .nullable(),
    video: Yup.mixed()
      .when("media_type", {
        is: (media_type) => media_type && media_type === "video",
        then: Yup.string().required(),
      })
      .nullable(),
    thumb_image: Yup.mixed().when("media_type", {
      is: (media_type) => media_type === "video",
      then: Yup.mixed().required("Required"),
    }),
    image_alt_tag: Yup.string().when("media_type", {
      is: (media_type) => media_type === "video",
      then: Yup.string().required("Required"),
    }),
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

  const getDetailApi = async () => {
    try {
      let response = await serve.companydetail();
      if (response.status === "success") {
        setValues({
          id: response.data.id,
          sub_heading: response.data.sub_heading,
          heading: response.data.heading,
          media_type: response.data.media_type,
          video_type: response.data.video_type,
          video: response.data.video && response.data.video,
          media: response.data.media,
          thumb_image: response.data.image,
          image_alt_tag: response.data.image_alt_tag,
          description: response.data.long_description,
        });
      } else {
      }
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    getDetailApi();
    setLoginData(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    const pages = loginData?.data?.role_permission;

    if (pages) {
      const items = [];
      for (const item of pages) {
        if (!item.parent_id) {
          items.push({
            ...item,
            child: pages.filter((v) => v.parent_id === item.id),
          });
        }
        if (item.slug === window.location.pathname.replace("/", "")) {
          setRolePermission(item.role_permission);
        }
      }
      setPagesData(items);
    }
  }, [loginData]);

  const thumbImagehandle = (e, props, name) => {
    
    let { file } = e.target.files[0];

    file = e.target.files[0];

    getBase64(file)
      .then((result) => {
        file["base64"] = result;
        
        if (name === "thumb_image") {
          setThumbImage(result);
        } else if (name === "media") {
          setMediaImage(result);
        }
      })
      .catch((err) => {
        
      });
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h5>Our Company Details</h5>
        </div>
        <Formik
          initialValues={values}
          validationSchema={VoucherSchema}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          {(props) => (
            <form className="form theme-form" onSubmit={props.handleSubmit}>
              <div className="card-body">
                <div className="row">
                  <div className="form-group col-md-6">
                    <label className="form-label">Sub Heading </label>
                    <input
                      className="form-control"
                      name="sub_heading"
                      value={props.values.sub_heading}
                      onChange={props.handleChange}
                      type="text"
                      placeholder="Enter sub heading"
                    />
                    {props.touched.sub_heading && props.errors.sub_heading ? (
                      <div className="formik-errors bg-error">
                        {props.errors.sub_heading}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-group col-md-6">
                    <label className="form-label">Heading </label>
                    <input
                      className="form-control"
                      name="heading"
                      value={props.values.heading}
                      onChange={props.handleChange}
                      type="text"
                      placeholder="Enter heading"
                    />
                    {props.touched.heading && props.errors.heading ? (
                      <div className="formik-errors bg-error">
                        {props.errors.heading}
                      </div>
                    ) : null}
                  </div>
                  <div className="row">
                    <div className="form-group col-md-4 p-0">
                      <label className="form-label">
                        Media Type <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select"
                        onChange={props.handleChange}
                        value={props.values.media_type}
                        name="media_type"
                      >
                        <option value="" select="false">
                          Select type
                        </option>
                        <option value="video">Video</option>
                        <option value="image">Image</option>
                      </select>
                      {props.touched.media_type && props.errors.media_type ? (
                        <div className="formik-errors bg-error">
                          {props.errors.media_type}
                        </div>
                      ) : null}
                    </div>
                    {props.values.media_type === "image" && (
                      <>
                        <div
                          className={
                            props.values.media
                              ? "form-group col-md-3"
                              : "form-group col-md-4"
                          }
                        >
                          <label className="form-label">Image</label>
                          <input
                            className="form-control"
                            name="media"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              props.setFieldValue("media", e.target.files[0]);
                              thumbImagehandle(e, props, "media");
                            }}
                            onBlur={props.handleBlur}
                            placeholder="Enter course overview heading"
                          />
                          {props.touched.media && props.errors.media ? (
                            <div className="formik-errors bg-error">
                              {props.errors.media}
                            </div>
                          ) : null}
                        </div>
                        {(mediaImage || props.values.media) && (
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
                              src={mediaImage || props.values.media}
                              alt="image"
                              style={{
                                padding: "0",
                                width: "100%",
                                height: "72%",
                              }}
                            />
                          </div>
                        )}
                        <div className="form-group col-md-4">
                          <label className="form-label">Image alt tag</label>
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
                      </>
                    )}
                    {props.values.media_type === "video" && (
                      <>
                        <div className="form-group col-md-6">
                          <label className="form-label">Video Type</label>
                          <select
                            className="form-select"
                            name="video_type"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.video_type}
                          >
                            <option value="" select="false">
                              Select type
                            </option>
                            <option value="media_file">Media file</option>
                            <option value="link">Link</option>
                          </select>

                          {props.touched.video_type &&
                          props.errors.video_type ? (
                            <div className="formik-errors bg-error">
                              {props.errors.video_type}
                            </div>
                          ) : null}
                        </div>{" "}
                        {props.values.video_type === "media_file" && (
                          <>
                            <div
                              className={
                                props.values.media
                                  ? "form-group col-md-5"
                                  : "form-group col-md-6"
                              }
                            >
                              <label className="form-label">Media</label>
                              <input
                                className="form-control"
                                name="video"
                                type="file"
                                accept="video/*"
                                onChange={(e) => {
                                  
                                  props.setFieldValue(
                                    "video",
                                    e.target.files[0]
                                  );
                                }}
                                onBlur={props.handleBlur}
                              />
                              {props.touched.video && props.errors.video ? (
                                <div className="formik-errors bg-error">
                                  {props.errors.video}
                                </div>
                              ) : null}
                            </div>
                            {props.values.video && (
                              <div
                                className="input-group-append col-md-1"
                                style={{
                                  top: "25px",
                                  paddingLeft: "0px",
                                  height: "49px",
                                  width: "55px",
                                }}
                              >
                                {props.values.video && (
                                  <img
                                    src="/assets/images/video-icon.webp"
                                    alt="image"
                                    style={{
                                      padding: "0",
                                      width: "100%",
                                      height: "72%",
                                    }}
                                  />
                                )}
                              </div>
                            )}
                            <div className="form-group col-md-6">
                              <label className="form-label">
                                {" "}
                                Image Alt tag
                              </label>
                              <input
                                className="form-control"
                                name="image_alt_tag"
                                type="text"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.image_alt_tag}
                                placeholder="Enter image_alt_tag"
                              />
                              {props.touched.image_alt_tag &&
                              props.errors.image_alt_tag ? (
                                <div className="formik-errors bg-error">
                                  {props.errors.image_alt_tag}
                                </div>
                              ) : null}
                            </div>
                            <div
                              className={
                                props.values.thumb_image
                                  ? "form-group col-md-5"
                                  : "form-group col-md-6"
                              }
                            >
                              <label className="form-label">Thumb Image</label>
                              <input
                                className="form-control"
                                name="thumb_image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  props.setFieldValue(
                                    "thumb_image",
                                    e.target.files[0]
                                  );
                                  thumbImagehandle(e, props, "thumb_image");
                                }}
                                onBlur={props.handleBlur}
                                placeholder="Enter course overview heading"
                              />
                              {props.touched.thumb_image &&
                              props.errors.thumb_image ? (
                                <div className="formik-errors bg-error">
                                  {props.errors.thumb_image}
                                </div>
                              ) : null}
                            </div>
                            {(thumbImage || props.values.thumb_image) && (
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
                                  src={thumbImage || props.values.thumb_image}
                                  alt="image"
                                  style={{
                                    padding: "0",
                                    width: "100%",
                                    height: "72%",
                                  }}
                                />
                              </div>
                            )}
                          </>
                        )}
                        {props.values.video_type === "link" && (
                          <>
                            <div className="form-group col-md-6">
                              <label className="form-label">Media</label>
                              <input
                                className="form-control"
                                name="video"
                                type="text"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.video}
                              />
                              {props.touched.video && props.errors.video ? (
                                <div className="formik-errors bg-error">
                                  {props.errors.video}
                                </div>
                              ) : null}
                            </div>
                            {/* <div className="form-group col-md-6">
                              <label className="form-label">
                                {" "}
                                Image Alt tag
                              </label>
                              <input
                                className="form-control"
                                name="img_alt_tag"
                                type="text"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.image_alt_tag}
                                placeholder="Enter img_alt_tag"
                              />
                              {props.touched.image_alt_tag &&
                              props.errors.image_alt_tag ? (
                                <div className="formik-errors bg-error">
                                  {props.errors.image_alt_tag}
                                </div>
                              ) : null}
                            </div>
                            <div
                              className={
                                props.values.thumb_image
                                  ? "form-group col-md-5"
                                  : "form-group col-md-6"
                              }
                            >
                              <label className="form-label">Thumb Image</label>
                              <input
                                className="form-control"
                                name="thumb_image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  props.setFieldValue(
                                    "thumb_image",
                                    e.target.files[0]
                                  );
                                  thumbImagehandle(e, props, "thumb_image");
                                }}
                                onBlur={props.handleBlur}
                                placeholder="Enter course overview heading"
                              />
                              {props.touched.thumb_image &&
                              props.errors.thumb_image ? (
                                <div className="formik-errors bg-error">
                                  {props.errors.thumb_image}
                                </div>
                              ) : null}
                            </div> */}

                            {/* {(thumbImage || props.values.thumb_image) && (
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
                                  src={thumbImage || props.values.thumb_image}
                                  alt="image"
                                  style={{
                                    padding: "0",
                                    width: "100%",
                                    height: "72%",
                                  }}
                                />
                              </div>
                            )} */}
                          </>
                        )}
                      </>
                    )}
                  </div>
                  <div className="form-group col-md-12">
                    <label className="form-label">Description</label>
                    <Editor
                      textareaName="long_description"
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
                    />
                    <p className="text-danger error_msg">
                      {formError.long_description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="card-footer text-end">
                {rolePermission.is_add == 1 ? (
                  <button className="btn btn-primary me-2" type="submit">
                    Submit
                  </button>
                ) : (
                  <button
                    className="btn btn-primary me-2"
                    type="submit"
                    disabled
                  >
                    Submit
                  </button>
                )}
              </div>
            </form>
          )}
        </Formik>
      <ToastContainer autoClose={1000} />
      </div>
    </>
  );
};

export default OurCompanyAdd;
