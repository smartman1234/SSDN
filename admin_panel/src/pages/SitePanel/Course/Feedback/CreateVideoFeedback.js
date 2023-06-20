import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import Breadcrumb from "../../../BreadCrumb/Breadcrumb";
import axios from "axios";
import Select from "react-select";
import BatchService from "../../../../Services/BatchServices/BatchServices";
import CityService from "../../../../Services/CityService/CityService";
import FeedbackService from "../../../../Services/CourseFeedbackService/FeedbackService";

export default function CreateVideoFeedback() {
  const feedback = new FeedbackService();
  const [course, setCourse] = useState([]);
  const [thumbImage, setThumbImage] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    course: "",
    video: "",
    thumb_image: "",
    image_alt_tag: "",
    video_type: "",
  });

  const name = (
    <Link to="/video-feedback" className="btn btn-primary">
      Back
    </Link>
  );

  const onSubmit = async (values) => {
    const formData = new FormData();
    if (values.id) {
      formData.set("id", values.id);
    }
    formData.set("course_id", values.course?.value);
    formData.set("video", values.video);
    formData.set("video_type", values.video_type);
    if (values.video_type === "media_file") {
      formData.set("thumb_image", values.thumb_image);
      formData.set("image_alt_tag", values.image_alt_tag);
    }

    const config = {
      headers: {
        content: "multipart/form-data",
        AUTHTOKEN: window.user?.data?.auth_token,
      },
    };

    if (values.id) {
      try {
        const response = await axios.post(
          process.env.REACT_APP_API_BASEURL + "course-feedback/update",
          formData,
          config
        );
        if (response.data?.status === "success") {
          toast.success("Record updated successfully");
          setTimeout(() => {
            navigate("/video-feedback");
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
          process.env.REACT_APP_API_BASEURL + "course-feedback/create",
          formData,
          config
        )
        .then((res) => {
          if (res.data?.status === "success") {
            toast.success("Record created successfully");

            setTimeout(() => {
              navigate("/video-feedback");
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

  const VoucherSchema = Yup.object().shape({
    course: Yup.mixed().required("Required"),
    video: Yup.mixed().required("Required"),
    video_type: Yup.string().required("Required"),
    thumb_image: Yup.mixed()
      .when("video_type", {
        is: (video_type) => video_type && video_type === "media_file",
        then: Yup.mixed().required("Required"),
      })
      .nullable(),
    image_alt_tag: Yup.string()
      .when("video_type", {
        is: (video_type) => video_type && video_type === "media_file",
        then: Yup.string().required(),
      })
      .nullable("Required"),
  });

  const getCourseListApi = async () => {
    try {
      let response = await feedback.courseList();
      if (response) {
        const arr = response.data.map((v, i) => {
          return { value: v.value, label: v.label };
        });
        setCourse(arr);
      }
    } catch (err) {
      throw err;
    }
  };

  const getDetailApi = async () => {
    try {
      let response = await feedback.detailVideoFeedback(params.id);
      if (response.status === "success") {
        setValues({
          id: response.data.id,
          course: response.data.course,
          video: response.data.video,
          thumb_image: response.data.thumb_image,
          image_alt_tag: response.data.image_alt_tag,
          video_type: response.data.video_type,
        });
      } 
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    if (params.id) {
      getDetailApi();
    }
    getCourseListApi();
  }, []);

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

  const thumbImagehandle = (e, props) => {
    
    let { file } = e.target.files[0];

    file = e.target.files[0];

    getBase64(file)
      .then((result) => {
        file["base64"] = result;
        

        setThumbImage(result);
      })
      .catch((err) => {
        
      });
  };

  return (
    <div className="page-body">
      <Breadcrumb
        heading={params.id ? "Edit Review" : "Add Review"}
        add={name}
      />
      <div className="container-fluid support-ticket">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>{params.id ? "Edit Review" : "Add Review"}</h5>
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
                            Course <span className="text-danger">*</span>
                          </label>
                          <Select
                            onChange={(e) => {
                              props.setFieldValue("course", e);
                            }}
                            options={course}
                            value={props.values.course}
                            name="course"
                          />

                          {props.touched.course && props.errors.course ? (
                            <div className="formik-errors bg-error">
                              {props.errors.course}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group col-md-6">
                          <label className="form-label">
                            Video Type <span className="text-danger">*</span>
                          </label>
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
                        </div>
                        {props.values.video_type === "media_file" && (
                          <>
                            {" "}
                            <div
                              className={
                                props.values.video
                                  ? "form-group  col-md-3"
                                  : "form-group  col-md-4"
                              }
                            >
                              <label className="form-label">
                                Video <span className="text-danger">*</span>
                              </label>
                              <input
                                className="form-control"
                                name="video"
                                type="file"
                                onChange={(e) => {
                                  props.setFieldValue(
                                    "video",
                                    e.target.files[0]
                                  );
                                }}
                                onBlur={props.handleBlur}
                                accept="video/mp4,video/x-m4v,video/*"
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
                            )}{" "}
                            <div
                              className={
                                props.values.thumb_image
                                  ? "form-group col-md-3"
                                  : "form-group col-md-4"
                              }
                            >
                              <label className="form-label">
                                Thumb Image{" "}
                                <span className="text-danger">*</span>
                              </label>
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
                                  thumbImagehandle(e, props);
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
                            )}{" "}
                            <div className="form-group col-md-4">
                              <label className="form-label">
                                Image Alt Tag{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={props.values.image_alt_tag}
                                name="image_alt_tag"
                                onChange={props.handleChange}
                                placeholder="Enter image alt text"
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
                        {props.values.video_type === "link" && (
                          <>
                            {" "}
                            <div className="form-group  col-md-12">
                              <label className="form-label">
                                Link <span className="text-danger">*</span>
                              </label>
                              <textarea
                                className="form-control"
                                name="video"
                                type="text"
                                value={props.values.video}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                              />
                              {props.touched.video && props.errors.video ? (
                                <div className="formik-errors bg-error">
                                  {props.errors.video}
                                </div>
                              ) : null}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="card-footer text-end">
                      <button className="btn btn-primary" type="submit">
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
    </div>
  );
}
