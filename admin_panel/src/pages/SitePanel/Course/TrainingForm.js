import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import axios from "axios";
import CourseService from "../../../Services/CourseService/CourseService";
import ChooseTrainingService from "../../../Services/ChooseTrainingService/ChooseTrainingService";

export default function TrainingForm() {
  const training = new ChooseTrainingService();
  const [modeList, setModelist] = useState([]);
  const [course, setCourse] = useState([]);
  const [title1Icon, setTitle1Icon] = useState("");
  const [title2Icon, setTitle2Icon] = useState("");
  const [title3Icon, setTitle3Icon] = useState("");
  const [allCategoryList, setAllCategoryList] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const categoryServe = new CourseService();
  const [values, setValues] = useState({
    course: "",
    Mode_title_1: "",
    Mode_title_2: "",
    Mode_title_3: "",
    title_1_icon: "",
    title_2_icon: "",
    title_3_icon: "",
    icon_1_alt_tag: "",
    icon_2_alt_tag: "",
    icon_3_alt_tag: "",
    mode_1_feature_1: "",
    mode_1_feature_2: "",
    mode_1_feature_3: "",
    mode_1_feature_4: "",
    mode_1_feature_5: "",
    mode_2_feature_1: "",
    mode_2_feature_2: "",
    mode_2_feature_3: "",
    mode_2_feature_4: "",
    mode_2_feature_5: "",
    mode_3_feature_1: "",
    mode_3_feature_2: "",
    mode_3_feature_3: "",
    mode_3_feature_4: "",
    mode_3_feature_5: "",
  });
  useEffect(() => {
    getCourseListApi();
  }, []);

  const getCourseListApi = async () => {
    try {
      let response = await training.courseList();
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

  const VoucherSchema = Yup.object().shape({
    course: Yup.mixed().required("Required"),
     Mode_title_1: Yup.string().required("Required"),
  });

  const onSubmit = async (values) => {

    const formData = new FormData();
    if (values.id) {
      formData.set("id", values.id);
    }
    formData.set("course_id", values.course.value);
    formData.set("mode_1_title", values.Mode_title_1);
    formData.set("mode_1_icon", values.title_1_icon);
    formData.set("mode_1_icon_alt_tag", values.icon_1_alt_tag);
    formData.set("mode_1_feature_1", values.mode_1_feature_1);
    formData.set("mode_1_feature_2", values.mode_1_feature_2);
    formData.set("mode_1_feature_3", values.mode_1_feature_3);
    formData.set("mode_1_feature_4", values.mode_1_feature_4);
    formData.set("mode_1_feature_5", values.mode_1_feature_5);
    formData.set("mode_2_title", values.Mode_title_2);
    formData.set("mode_2_icon", values.title_2_icon);
    formData.set("mode_2_icon_alt_tag", values.icon_2_alt_tag);
    formData.set("mode_2_feature_1", values.mode_2_feature_1);
    formData.set("mode_2_feature_2", values.mode_2_feature_2);
    formData.set("mode_2_feature_3", values.mode_2_feature_3);
    formData.set("mode_2_feature_4", values.mode_2_feature_4);
    formData.set("mode_2_feature_5", values.mode_2_feature_5);
    formData.set("mode_3_title", values.Mode_title_3);
    formData.set("mode_3_icon", values.title_3_icon);
    formData.set("mode_3_icon_alt_tag", values.icon_3_alt_tag);
    formData.set("mode_3_feature_1", values.mode_3_feature_1);
    formData.set("mode_3_feature_2", values.mode_3_feature_2);
    formData.set("mode_3_feature_3", values.mode_3_feature_3);
    formData.set("mode_3_feature_4", values.mode_3_feature_4);
    formData.set("mode_3_feature_5", values.mode_3_feature_5);

    const config = {
      headers: {
        content: "multipart/form-data",
        AUTHTOKEN: window.user?.data?.auth_token,
      },
    };
    if (values.id) {
      try {
        const response = await axios.post(
          process.env.REACT_APP_API_BASEURL + `traning/update-mode`,
          formData,
          config
        );
        if (response.data?.status === "success") {
          toast.success("Record update successfully");
          setTimeout(() => {
            navigate("/training");
          }, [1000]);
        } else {
          toast.error(response.data?.message);
        }
      } catch (err) {
        throw err;
      }
    } else {
      axios
        .post(
          process.env.REACT_APP_API_BASEURL + "traning/add-mode",
          formData,
          config
        )
        .then((res) => {
          if (res.data?.status === "success") {
            toast.success("Record created successfully");
            setTimeout(() => {
              navigate("/training");
            }, [1000]);
          } else if (res.data?.status === "fail") {
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
      let response = await training.trainingDetail(params.id);
      if (response.status === "success") {
        setValues({
          id: response.data.id,
          course: response.data.course,
          Mode_title_1: response.data.mode_1_title,
          Mode_title_2: response.data.mode_2_title,
          Mode_title_3: response.data.mode_3_title,
          title_1_icon: response.data.image_url + response.data.mode_1_icon,
          title_2_icon: response.data.image_url + response.data.mode_2_icon,
          title_3_icon: response.data.image_url + response.data.mode_2_icon,
          icon_1_alt_tag: response.data.mode_1_icon_alt_tag,
          icon_2_alt_tag: response.data.mode_2_icon_alt_tag,
          icon_3_alt_tag: response.data.mode_3_icon_alt_tag,
          mode_1_feature_1: response.data.mode_1_feature_1,
          mode_1_feature_2: response.data.mode_1_feature_2,
          mode_1_feature_3: response.data.mode_1_feature_3,
          mode_1_feature_4: response.data.mode_1_feature_4,
          mode_1_feature_5: response.data.mode_1_feature_5,
          mode_2_feature_1: response.data.mode_2_feature_1,
          mode_2_feature_2: response.data.mode_2_feature_2,
          mode_2_feature_3: response.data.mode_2_feature_3,
          mode_2_feature_4: response.data.mode_2_feature_4,
          mode_2_feature_5: response.data.mode_2_feature_5,
          mode_3_feature_1: response.data.mode_3_feature_1,
          mode_3_feature_2: response.data.mode_3_feature_2,
          mode_3_feature_3: response.data.mode_3_feature_3,
          mode_3_feature_4: response.data.mode_3_feature_4,
          mode_3_feature_5: response.data.mode_3_feature_5,
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

  const handleFileInputChange = (e, props, type) => {
    
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
        if (height > 30 || width > 30) {
          alert(
            "Height should not exceed from 30px and width should not exceed from 30 px"
          );
        } else if (height < 30 || width < 30) {
          alert(
            "Height should not less than from 30px and width should not less than from 30 px"
          );
        } else {
          getBase64(file)
            .then((result) => {
              file["base64"] = result;
              if (type === "title_1_icon") {
                setTitle1Icon(result);
              } else if (type === "title_2_icon") {
                setTitle2Icon(result);
              } else {
                setTitle3Icon(result);
              }
            })
            .catch((err) => {
              
            });
        }
      };
    };
  };

  const name = (
    <Link to="/training" className="btn btn-primary">
      Back
    </Link>
  );
  return (
    <>
      <div className="page-body">
        <Breadcrumb heading="Choose Best Training" add={name} />
        <div className="container-fluid support-ticket">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>{params.id ? "Edit Training" : "Add Training"}</h5>
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
                          <div className="form-group col-md-12">
                            <label className="form-label">
                              Course <span className="text-danger">*</span>
                            </label>
                            <Select
                              onChange={(value) =>
                                props.setFieldValue("course", value)
                              }
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
                              Mode Title 1 <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              name="Mode_title_1"
                              type="text"
                              value={props.values.Mode_title_1}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              placeholder="Enter title"
                            />
                            {props.touched.Mode_title_1 &&
                              props.errors.Mode_title_1 ? (
                              <div className="formik-errors bg-error">
                                {props.errors.Mode_title_1}
                              </div>
                            ) : null}
                          </div>
                          <div
                            className={
                              props.values.title_1_icon
                                ? "form-group col-md-5"
                                : "form-group col-md-6"
                            }
                          >
                            <label className="form-label">
                              Title 1 Icon 
                            </label>
                            <input
                              className="form-control"
                              onChange={(e) => {
                                props.setFieldValue(
                                  "title_1_icon",
                                  e.target.files[0]
                                );
                                handleFileInputChange(e, props, "title_1_icon");
                              }}
                              accept="image/*"
                              name="title_1_icon"
                              type="file"
                            />
                            {props.touched.title_1_icon &&
                              props.errors.title_1_icon ? (
                              <div className="formik-errors bg-error">
                                {props.errors.title_1_icon}
                              </div>
                            ) : null}
                          </div>
                          {(title1Icon || props.values.title_1_icon) && (
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
                                src={title1Icon || props.values.title_1_icon}
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
                              Title 1 Icon Alt Tag 
                            </label>
                            <input
                              className="form-control"
                              value={props.values.icon_1_alt_tag}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              name="icon_1_alt_tag"
                              type="text"
                              placeholder="Enter icon alt tag"
                            />
                            {props.touched.icon_1_alt_tag &&
                              props.errors.icon_1_alt_tag ? (
                              <div className="formik-errors bg-error">
                                {props.errors.icon_1_alt_tag}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Title 1 Feature 1 
                            </label>
                            <input
                              className="form-control"
                              value={props.values.mode_1_feature_1}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              name="mode_1_feature_1"
                              type="text"
                            />
                            {props.touched.mode_1_feature_1 &&
                              props.errors.mode_1_feature_1 ? (
                              <div className="formik-errors bg-error">
                                {props.errors.mode_1_feature_1}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Title 1 Feature 2 
                            </label>
                            <input
                              className="form-control"
                              name="mode_1_feature_2"
                              value={props.values.mode_1_feature_2}
                              onChange={props.handleChange}
                            />
                            {props.touched.mode_1_feature_2 &&
                              props.errors.mode_1_feature_2 ? (
                              <div className="formik-errors bg-error">
                                {props.errors.mode_1_feature_2}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Title 1 Feature 3 
                            </label>
                            <input
                              className="form-control"
                              name="mode_1_feature_3"
                              onChange={props.handleChange}
                              value={props.values.mode_1_feature_3}
                            />
                            {props.touched.mode_1_feature_3 &&
                              props.errors.mode_1_feature_3 ? (
                              <div className="formik-errors bg-error">
                                {props.errors.mode_1_feature_3}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Title 1 Feature 4 
                            </label>
                            <input
                              className="form-control"
                              name="mode_1_feature_4"
                              onChange={props.handleChange}
                              value={props.values.mode_1_feature_4}
                            />
                            {props.touched.mode_1_feature_4 &&
                              props.errors.mode_1_feature_4 ? (
                              <div className="formik-errors bg-error">
                                {props.errors.mode_1_feature_4}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Title 1 Feature 5  
                            </label>
                            <input
                              className="form-control"
                              value={props.values.mode_1_feature_5}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              name="mode_1_feature_5"
                              type="text"
                            />
                            {props.touched.mode_1_feature_5 &&
                              props.errors.mode_1_feature_5 ? (
                              <div className="formik-errors bg-error">
                                {props.errors.mode_1_feature_5}
                              </div>
                            ) : null}
                          </div>
                          <hr />
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Mode Title 2 
                            </label>
                            <input
                              className="form-control"
                              name="Mode_title_2"
                              type="text"
                              value={props.values.Mode_title_2}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              placeholder="Enter title"
                            />
                            {props.touched.Mode_title_2 &&
                              props.errors.Mode_title_2 ? (
                              <div className="formik-errors bg-error">
                                {props.errors.Mode_title_2}
                              </div>
                            ) : null}
                          </div>
                          <div
                            className={
                              props.values.title_2_icon
                                ? "form-group col-md-5"
                                : "form-group col-md-6"
                            }
                          >
                            <label className="form-label">
                              Title 2 Icon 
                            </label>
                            <input
                              className="form-control"
                              onChange={(e) => {
                                props.setFieldValue(
                                  "title_2_icon",
                                  e.target.files[0]
                                );
                                handleFileInputChange(e, props, "title_2_icon");
                              }}
                              accept="image/*"
                              name="title_2_icon"
                              type="file"
                            />
                            {props.touched.title_2_icon &&
                              props.errors.title_2_icon ? (
                              <div className="formik-errors bg-error">
                                {props.errors.title_2_icon}
                              </div>
                            ) : null}
                          </div>
                          {(title2Icon || props.values.title_2_icon) && (
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
                                src={title2Icon || props.values.title_2_icon}
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
                              Title 2 Icon Alt Tag 
                            </label>
                            <input
                              className="form-control"
                              value={props.values.icon_2_alt_tag}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              name="icon_2_alt_tag"
                              type="text"
                              placeholder="Enter icon alt tag"
                            />
                            {props.touched.icon_2_alt_tag &&
                              props.errors.icon_2_alt_tag ? (
                              <div className="formik-errors bg-error">
                                {props.errors.icon_2_alt_tag}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Title 2 Feature 1 
                            </label>
                            <input
                              className="form-control"
                              value={props.values.mode_2_feature_1}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              name="mode_2_feature_1"
                              type="text"
                            />
                            {props.touched.mode_2_feature_1 &&
                              props.errors.mode_2_feature_1 ? (
                              <div className="formik-errors bg-error">
                                {props.errors.mode_2_feature_1}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Title 2 Feature 2 
                            </label>
                            <input
                              className="form-control"
                              name="mode_2_feature_2"
                              value={props.values.mode_2_feature_2}
                              onChange={props.handleChange}
                            />
                            {props.touched.mode_2_feature_2 &&
                              props.errors.mode_2_feature_2 ? (
                              <div className="formik-errors bg-error">
                                {props.errors.mode_2_feature_2}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Title 2 Feature 3 
                            </label>
                            <input
                              className="form-control"
                              name="mode_2_feature_3"
                              onChange={props.handleChange}
                              value={props.values.mode_2_feature_3}
                            />
                            {props.touched.mode_2_feature_3 &&
                              props.errors.mode_2_feature_3 ? (
                              <div className="formik-errors bg-error">
                                {props.errors.mode_2_feature_3}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Title 2 Feature 4 
                            </label>
                            <input
                              className="form-control"
                              name="mode_2_feature_4"
                              onChange={props.handleChange}
                              value={props.values.mode_2_feature_4}
                            />
                            {props.touched.mode_2_feature_4 &&
                              props.errors.mode_2_feature_4 ? (
                              <div className="formik-errors bg-error">
                                {props.errors.mode_2_feature_4}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Title 2 Feature 5 
                            </label>
                            <input
                              className="form-control"
                              value={props.values.mode_2_feature_5}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              name="mode_2_feature_5"
                              type="text"
                            />
                            {props.touched.mode_2_feature_5 &&
                              props.errors.mode_2_feature_5 ? (
                              <div className="formik-errors bg-error">
                                {props.errors.mode_2_feature_5}
                              </div>
                            ) : null}
                          </div>
                          <hr />
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Mode Title 3 
                            </label>
                            <input
                              className="form-control"
                              name="Mode_title_3"
                              type="text"
                              value={props.values.Mode_title_3}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              placeholder="Enter title"
                            />
                            {props.touched.Mode_title_3 &&
                              props.errors.Mode_title_3 ? (
                              <div className="formik-errors bg-error">
                                {props.errors.Mode_title_3}
                              </div>
                            ) : null}
                          </div>
                          <div
                            className={
                              props.values.title_3_icon
                                ? "form-group col-md-5"
                                : "form-group col-md-6"
                            }
                          >
                            <label className="form-label">
                              Title 3 Icon 
                            </label>
                            <input
                              className="form-control"
                              onChange={(e) => {
                                props.setFieldValue(
                                  "title_3_icon",
                                  e.target.files[0]
                                );
                                handleFileInputChange(e, props, "title_3_icon");
                              }}
                              accept="image/*"
                              name="title_3_icon"
                              type="file"
                            />
                            {props.touched.title_3_icon &&
                              props.errors.title_3_icon ? (
                              <div className="formik-errors bg-error">
                                {props.errors.title_3_icon}
                              </div>
                            ) : null}
                          </div>
                          {(title3Icon || props.values.title_3_icon) && (
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
                                src={title3Icon || props.values.title_3_icon}
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
                              Title 3 Icon Alt Tag 
                            </label>
                            <input
                              className="form-control"
                              value={props.values.icon_3_alt_tag}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              name="icon_3_alt_tag"
                              type="text"
                              placeholder="Enter icon alt tag"
                            />
                            {props.touched.icon_3_alt_tag &&
                              props.errors.icon_3_alt_tag ? (
                              <div className="formik-errors bg-error">
                                {props.errors.icon_3_alt_tag}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Title 3 Feature 1 
                            </label>
                            <input
                              className="form-control"
                              value={props.values.mode_3_feature_1}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              name="mode_3_feature_1"
                              type="text"
                            />
                            {props.touched.mode_3_feature_1 &&
                              props.errors.mode_3_feature_1 ? (
                              <div className="formik-errors bg-error">
                                {props.errors.mode_3_feature_1}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Title 3 Feature 2 
                            </label>
                            <input
                              className="form-control"
                              name="mode_3_feature_2"
                              value={props.values.mode_3_feature_2}
                              onChange={props.handleChange}
                            />
                            {props.touched.mode_3_feature_2 &&
                              props.errors.mode_3_feature_2 ? (
                              <div className="formik-errors bg-error">
                                {props.errors.mode_3_feature_2}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Title 3 Feature 3 
                            </label>
                            <input
                              className="form-control"
                              name="mode_3_feature_3"
                              onChange={props.handleChange}
                              value={props.values.mode_3_feature_3}
                            />
                            {props.touched.mode_3_feature_3 &&
                              props.errors.mode_3_feature_3 ? (
                              <div className="formik-errors bg-error">
                                {props.errors.mode_3_feature_3}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Title 3 Feature 4 
                            </label>
                            <input
                              className="form-control"
                              name="mode_3_feature_4"
                              onChange={props.handleChange}
                              value={props.values.mode_3_feature_4}
                            />
                            {props.touched.mode_3_feature_4 &&
                              props.errors.mode_3_feature_4 ? (
                              <div className="formik-errors bg-error">
                                {props.errors.mode_3_feature_4}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Title 3 Feature 5 
                            </label>
                            <input
                              className="form-control"
                              value={props.values.mode_3_feature_5}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              name="mode_3_feature_5"
                              type="text"
                            />
                            {props.touched.mode_3_feature_5 &&
                              props.errors.mode_3_feature_5 ? (
                              <div className="formik-errors bg-error">
                                {props.errors.mode_3_feature_5}
                              </div>
                            ) : null}
                          </div>
                          <div className="card-footer text-end">
                            <button
                              className="btn btn-primary"
                              type="submit"
                            >
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
}
