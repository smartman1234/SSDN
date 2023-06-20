import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import * as Yup from "yup";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, FieldArray } from "formik";
import moment from "moment";
import ElearningVideoService from "../../../Services/ELearningService/ElearningVideoService";

export default function Section({
  param,
  sectionId,
  sectionList,
  SectionlistApi,
  sectionHeadingForm,
  setSectionHeadingForm,
  getSectionDetailApi,
  setSectionList,
}) {
  const serve = new ElearningVideoService();
  const [videoDuration, setVideoduration] = useState("");
  const [previewDuration, setPreviewDuration] = useState("");
  const [data, setData] = useState([]);
  const [sectionListid, setSectionListId] = useState(null);
  const [active, setActive] = useState({});
  const [fileName, setFileName] = useState("");
  const [previewFileName, setPreviewFileName] = useState("");
  const [values, setValues] = useState({
    subheadline: "",
    uploadvideo: "",
    is_preview: "",
    previewVideo: "",
  });
  const VoucherSchema = Yup.object().shape({
    subheadline: Yup.string().required("Required"),
    uploadvideo: Yup.mixed().required("Required"),
    is_preview: Yup.string().required("Required"),
    previewVideo: Yup.mixed()
      .when("is_preview", {
        is: (is_preview) => is_preview && is_preview == "1",
        then: Yup.mixed().required("Required"),
      })
      .nullable(),
  });

  const onSubmit = async (values) => {

    const formData = new FormData();
    if (values.id) {
      formData.set("id", values.id);
    }
    formData.set("course_id", param.id);

    formData.set("section_id", sectionListid);
    formData.set("title", values.subheadline);
    formData.set("video", values.uploadvideo);
    formData.set("file_name", fileName);
    formData.set("duration", videoDuration);
    formData.set("is_preview", values.is_preview);
    if (values.is_preview == "1") {
      formData.set("preview_video", values.previewVideo);

      formData.set("preview_file_name", previewFileName);
      formData.set("preview_duration", previewDuration);
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
          process.env.REACT_APP_API_BASEURL + `e-learning/update-lecture`,
          formData,
          config
        );
        if (response.data?.status === "success") {
          toast.success("Record update successfully");
          SectionlistApi(param.id);

          setActive((prev) => ({ [sectionListid]: !prev[sectionListid] }));
        } else {
          toast.error(response.data?.message);
        }
      } catch (err) {
        throw err;
      }
    } else {
      axios
        .post(
          process.env.REACT_APP_API_BASEURL + "e-learning/create-lecture",
          formData,
          config
        )
        .then((res) => {
          if (res.data?.status === "success") {
            toast.success("Video created successfully");
            SectionlistApi(param.id);

            setActive((prev) => ({ [sectionListid]: false }));
            setValues({
              subheadline: "",
              uploadvideo: "",
              is_preview: "",
              previewVideo: "",
            });
          } else if (res.data?.status === "fail") {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          throw err;
        });
    }
  };

  const getVideoDuration = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const media = new Audio(reader.result);
        media.onloadedmetadata = () => resolve(media.duration);
      };
      reader.readAsDataURL(file);
      reader.onerror = (error) => reject(error);
    });

  const handleChange = async (e, name) => {
    const duration = await getVideoDuration(e.target.files[0]);
    if (name === "uploadvideo") {
      setVideoduration(duration);
    } else if (name === "previewVideo") {
      setPreviewDuration(duration);
    }
  };

  useEffect(() => {
    if (sectionId) {
      getDetailData();
    }
  }, []);

  const getDetailData = async () => {
    try {
      let response = await serve.sectiondetail(sectionId);
      if (response) {
        let title = "";
        let video = "";
        let preview_video = "";
        let is_preview = "";
        for (const i of response.data.lectures) {
          title = i.title;
          preview_video = i.preview_video;
          is_preview = i.is_preview;
        }
        setValues({
          id: response.data.id,
          subheadline: title,
          uploadvideo: "",
          is_preview: is_preview,
          previewVideo: preview_video,
        });
      }
    } catch (err) {
      throw err;
    }
  };

  const deleteHandle = async (dataId) => {
    try {
      if (window.confirm("Are you sure you want to delete this record?")) {
        let response = await serve.delete(dataId);
        if (response) {
          toast.success(response.message);
          let dataTemp = [...sectionList];

          const remainingData = dataTemp.filter((v) => {
            return v._id !== dataId;
          });
          setSectionList(remainingData);
          SectionlistApi(param.id);
        } else {
          toast.error("Some went wrong!");
        }
      }
    } catch (err) {
      throw err;
    }
  };

  const activeHandler = async (id, lectureId) => {
    try {
      let response = await serve.editvideo(lectureId);
      if (response) {
        setValues({
          id: response.data.id,
          subheadline: response.data.title,
          uploadvideo: response.data.video,
          is_preview: response.data.is_preview,
          previewVideo: response.data.preview_video,
        });
      }
    } catch (err) {
      throw err;
    }
    setSectionListId(id);
    setActive((prev) => ({ [id]: true }));
  };

  const deleteSectionHandle = async (dataId) => {
    try {
      if (window.confirm("Are you sure you want to delete this record?")) {
        let response = await serve.deletesection(dataId);
        if (response) {
          toast.success(response.message);
          let dataTemp = [...sectionList];

          const remainingData = dataTemp.filter((v) => {
            return v._id !== dataId;
          });
          setSectionList(remainingData);
          SectionlistApi(param.id);
        } else {
          toast.error("Some went wrong!");
        }
      }
    } catch (err) {
      throw err;
    }
  };

  const toggleHandler = async (data, type) => {
    const obj = {
      id: data.id,
      status: data.status === "active" ? "inactive" : "active",
    };

    try {
      const res = await serve.status(obj);
      if (res.status === "success") {
        SectionlistApi()
      } else {
        toast.error("something went wrong!");
      }
    } catch (err) {
      toast.error("something went wrong!");
      throw err;
    }
  };
  return (
    <Formik
      initialValues={values}
      validationSchema={VoucherSchema}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {(props) => (
        <form className="" onSubmit={props.handleSubmit}>
          {sectionList.map((v, i) => (
            <div>
              <div className="card mb-0 mt-3">
                <div className="card-header d-flex justify-content-between">
                  <h5>
                    Section {i + 1} : {v.title}
                    <a
                      className="btn btn-outline-primary btn-sm me-2"
                      style={{ marginLeft: "20px" }}
                      href="#"
                      onClick={() => {
                        getSectionDetailApi(v.id);
                      }}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </a>
                    <Link
                      to="#"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => deleteSectionHandle(v.id)}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </Link>
                  </h5>
                  <div
                    className="buttons"
                    onClick={() => {
                      props.resetForm();
                      setActive((prev) => ({ [v.id]: true }));
                      setSectionListId(v.id);
                      setValues({
                        subheadline: "",
                        uploadvideo: "",
                        is_preview: "",
                        previewVideo: "",
                      });
                    }}
                  >
                    <Link
                      className="btn btn-outline-primary btn-sm me-2"
                      to="#"
                    >
                      <i className="fa fa-plus"></i> Add Video
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  {active[v.id] && (
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Sub Headline
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              name="subheadline"
                              value={props.values.subheadline}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              type="text"
                              placeholder="Enter headline"
                            />{" "}
                            {props.touched.subheadline &&
                            props.errors.subheadline ? (
                              <div className="formik-errors bg-error">
                                {props.errors.subheadline}
                              </div>
                            ) : null}
                          </div>
                          <div
                            className={
                              props.values.uploadvideo
                                ? "form-group col-md-5"
                                : "form-group col-md-6"
                            }
                          >
                            <label className="form-label">
                              Upload Video
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              name="uploadvideo"
                              onChange={(e) => {
                                props.setFieldValue(
                                  "uploadvideo",
                                  e.target.files[0]
                                );
                                setFileName(e.target.files?.[0]?.name);
                                handleChange(e, "uploadvideo");
                              }}
                              onBlur={props.handleBlur}
                              type="file"
                              accept="video/*"
                            />{" "}
                            {props.touched.uploadvideo &&
                            props.errors.uploadvideo ? (
                              <div className="formik-errors bg-error">
                                {props.errors.uploadvideo}
                              </div>
                            ) : null}
                          </div>
                          {props.values.uploadvideo && (
                            <div
                              className="input-group-append col-md-1"
                              style={{
                                top: "25px",
                                paddingLeft: "0px",
                                height: "49px",
                                width: "55px",
                              }}
                            >
                              {props.values.uploadvideo && (
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
                          <div className="form-group col-md-4">
                            <label className="form-label">
                              Is Preview
                              <span className="text-danger">*</span>
                            </label>
                            <select
                              className="form-select"
                              onChange={props.handleChange}
                              value={props.values.is_preview}
                              name="is_preview"
                            >
                              <option value="" selected={false}>
                                Select level
                              </option>{" "}
                              <option value="1">Yes</option>
                              <option value="0">No</option>
                            </select>{" "}
                            {props.touched.is_preview &&
                            props.errors.is_preview ? (
                              <div className="formik-errors bg-error">
                                {props.errors.is_preview}
                              </div>
                            ) : null}
                          </div>
                          {props.values.is_preview == 1 && (
                            <>
                              <div className="form-group col-md-4">
                                <label className="form-label">
                                  Upload Preview Video
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  className="form-control"
                                  name="previewVideo"
                                  onChange={(e) => {
                                    props.setFieldValue(
                                      "previewVideo",
                                      e.target.files[0]
                                    );
                                    setPreviewFileName(
                                      e.target.files?.[0]?.name
                                    );
                                    handleChange(e, "previewVideo");
                                  }}
                                  onBlur={props.handleBlur}
                                  type="file"
                                  accept="video/*"
                                />
                                {props.touched.previewVideo &&
                                props.errors.previewVideo ? (
                                  <div className="formik-errors bg-error">
                                    {props.errors.previewVideo}
                                  </div>
                                ) : null}
                              </div>
                              {props.values.previewVideo && (
                                <div
                                  className="input-group-append col-md-1"
                                  style={{
                                    top: "25px",
                                    paddingLeft: "0px",
                                    height: "49px",
                                    width: "55px",
                                  }}
                                >
                                  {props.values.previewVideo && (
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
                            </>
                          )}
                          <div className="form-group col-md-2 open-button">
                            <button className="btn btn-primary" type="submit">
                              Save
                            </button>
                          </div>{" "}
                        </div>
                      </div>
                    </div>
                  )}
                  {v?.lectures?.length > 0 && (
                    <div className="card">
                      <div className="table-responsive">
                        <table className="table display dataTable">
                          <thead>
                            <tr>
                              <th>File Name</th>
                              <th>Status</th>
                              <th>Date</th>
                              <th>Action</th>
                            </tr>
                          </thead>

                          <tbody>
                            {(v?.lectures.map)((lecture, i) => (
                              <tr>
                                <td>
                                  <h6 className="task_title_0">
                                    {lecture.title}
                                  </h6>
                                </td>
                                <td className="text-center">
                                  <div className="checkbox checkbox-primary">
                                    <input
                                      id={lecture.id}
                                      type="checkbox"
                                      checked={lecture.status === "active"}
                                      onChange={(e) =>
                                        toggleHandler(lecture, "status")
                                      }
                                    />
                                  </div>
                                </td>
                                <td>
                                  {moment(lecture.updated_at).format("L")}
                                </td>
                                <td>
                                  <Link
                                    className="btn btn-outline-primary btn-sm me-2"
                                    to="#"
                                    onClick={() =>
                                      activeHandler(v.id, lecture.id)
                                    }
                                  >
                                    <i className="fa-solid fa-pen-to-square"></i>
                                  </Link>
                                  <Link
                                    to="#"
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => deleteHandle(lecture.id)}
                                  >
                                    <i className="fa-solid fa-trash-can"></i>
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    <ToastContainer autoClose={1000} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </form>
      )}
    </Formik>
  );
}
