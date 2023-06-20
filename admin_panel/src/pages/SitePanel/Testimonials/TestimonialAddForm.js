import React, { useContext, useEffect, useState, useMemo } from "react";
import { json, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "@tinymce/tinymce-react";
import Select from "react-select";
import countryList from "react-select-country-list";
import ELearningCourseService from "../../../Services/ELearningService/ELearningCourseService";
import TestimonialService from "../../../Services/TestimonialService/TestimonialService";
const TestimonialsAddForm = () => {
  const [value, setValue] = useState("");
  const [courseList, setCourseList] = useState([]);
  const options = useMemo(() => countryList().getData(), []);
  const [categoryLists, setCategoryLists] = useState([]);
  const [image, setImage] = useState();
  const serve = new ELearningCourseService();
  const testimonial = new TestimonialService();
  const navigate = useNavigate();
  const params = useParams();
  const [values, setValues] = useState({
    by: "",
    icon: "",
    facebook_link: "",
    twitter_link: "",
    google_link: "",
    linkedin_link: "",
    location: "",
    type: "",
    course: "",
    date: "",
    description: "",
    profession: "",
    review: "",
  });

  const VoucherSchema = Yup.object().shape({
    by: Yup.mixed().required("Required"),
    icon: Yup.mixed().required("Required"),
    date: Yup.string().required("Required"),

    // location: Yup.mixed().required("Required"),
    type: Yup.string().required("Required"),
    course: Yup.mixed().required("Required"),
    description: Yup.string().required("Required"),
    review: Yup.number().required("Required"),
  });

  const onSubmit = async (values) => {
    const formData = new FormData();
    if (values.id) {
      formData.set("id", values.id);
    }

    formData.set("name", values.by);
    formData.set("image", values.icon);

    formData.set("facebook_link", values.facebook_link);
    formData.set("google_link", values.google_link);
    formData.set("twitter_link", values.twitter_link);
    formData.set("linkedin_link", values.linkedin_link);
    formData.set("designation", values.profession);
    formData.set("location", JSON.stringify(values.location));

    formData.set("type", values.type);

    formData.set("course", values.course);
    formData.set("date", values.date);
    formData.set("discription", values.description);
    formData.set("review", values.review);

    const config = {
      headers: {
        content: "multipart/form-data",
        AUTHTOKEN: window.user?.data?.auth_token,
      },
    };
    if (values.id) {
      try {
        const response = await axios.post(
          process.env.REACT_APP_API_BASEURL + `testimonial/testimonial-update`,
          formData,
          config
        );
        if (response.data?.status === "success") {
          toast.success("Record update successfully");
          setTimeout(() => {
            navigate("/testimonials");
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
          process.env.REACT_APP_API_BASEURL + "testimonial/testimonial-create",
          formData,
          config
        )
        .then((res) => {
          if (res?.data?.status === "success") {
            toast.success("Record created successfully");
            setTimeout(() => {
              navigate("/testimonials");
            }, [1000]);
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          throw err;
        });
    }
  };

  const getParentCategory = async () => {
    let obj = { parent_id: "-1" };
    try {
      let response = await serve.parentcategory(obj);
      if (response) {
        const arr = response.data.map((v) => {
          return { value: v.id, label: v.name };
        });
        setCategoryLists(arr);
      }
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    if (params.id) {
      getDataById();
    }
    getParentCategory();
    courseListApi();
  }, []);

  const getDataById = async () => {
    try {
      let response = await testimonial.getdata(params.id);
      if (response) {
        let courses = {};
        courses["value"] = response.data?.course?.id;
        courses["label"] = response.data?.course?.name;
        setValues({
          id: response.data.id,
          by: response.data.name,
          description: response.data.discription,
          facebook_link: response.data.facebook_link,
          google_link: response.data.google_link,
          twitter_link: response.data.twitter_link,
          linkedin_link: response.data.linkedin_link,
          type: response.data.type,
          profession: response.data.designation,
          date: response.data.date,
          location: JSON.parse(response.data?.location || "[]"),
          icon: response.data.image,
          course: response.data.course,
          review:response.data.review
        });
      } else {
        toast.error(response);
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

        getBase64(file)
          .then((result) => {
            file["base64"] = result;

            setImage(result);
          })
          .catch((err) => {});
      };
    };
  };

  const courseListApi = async () => {
    try {
      let response = await testimonial.courselist();
      if (response) {
        setCourseList(response.data);
      } else {
        toast.error(response);
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h5>Add Testimonial</h5>
        </div>
        <Formik
          initialValues={values}
          validationSchema={VoucherSchema}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          {(props) => (
            <>
              <form className="" onSubmit={props.handleSubmit}>
                <div className="card-body">
                  <div className="row">
                    <div className="form-group col-md-6">
                      <label className="form-label">
                        By <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        value={props.values.by}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        name="by"
                        type="text"
                        placeholder="Enter full-name of the student"
                      />{" "}
                      {props.touched.by && props.errors.by ? (
                        <div className="formik-errors bg-error">
                          {props.errors.by}
                        </div>
                      ) : null}
                    </div>
                    <div
                      className={
                        props.values.icon
                          ? "form-group col-md-5"
                          : "form-group col-md-6"
                      }
                    >
                      <label className="form-label">
                        Photo <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        onChange={(e) => {
                          props.setFieldValue("icon", e.target.files[0]);
                          handleFileInputChange(e);
                        }}
                        onBlur={props.handleBlur}
                        name="icon"
                        type="file"
                        accept="image/*"
                      />{" "}
                      {props.touched.icon && props.errors.icon ? (
                        <div className="formik-errors bg-error">
                          {props.errors.icon}
                        </div>
                      ) : null}
                    </div>{" "}
                    {(image || props.values.icon) && (
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
                          src={image || props.values.icon}
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
                        Designation 
                      </label>
                      <input
                        className="form-control"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        name="profession"
                        type="text"
                        value={props.values.profession}
                        placeholder="Enter designation"
                      />
                    </div>{" "}
                    <div className="form-group col-md-6">
                      <label className="form-label">Facebook Link</label>
                      <input
                        className="form-control"
                        value={props.values.facebook_link}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        name="facebook_link"
                        type="url"
                      />
                      {props.touched.facebook_link &&
                      props.errors.facebook_link ? (
                        <div className="formik-errors bg-error">
                          {props.errors.facebook_link}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group col-md-6">
                      <label className="form-label">Twitter Link</label>
                      <input
                        className="form-control"
                        value={props.values.twitter_link}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        name="twitter_link"
                        type="url"
                      />{" "}
                      {props.touched.twitter_link &&
                      props.errors.twitter_link ? (
                        <div className="formik-errors bg-error">
                          {props.errors.twitter_link}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group col-md-6">
                      <label className="form-label">Google Link</label>
                      <input
                        className="form-control"
                        value={props.values.google_link}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        name="google_link"
                        type="url"
                      />{" "}
                      {props.touched.google_link && props.errors.google_link ? (
                        <div className="formik-errors bg-error">
                          {props.errors.google_link}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group col-md-6">
                      <label className="form-label">Linkedin Link</label>
                      <input
                        className="form-control"
                        value={props.values.linkedin_link}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        name="linkedin_link"
                        type="url"
                      />{" "}
                      {props.touched.linkedin_link &&
                      props.errors.linkedin_link ? (
                        <div className="formik-errors bg-error">
                          {props.errors.linkedin_link}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group col-md-6">
                      <label className="form-label">Location</label>
                      <Select
                        options={options}
                        value={props.values.location}
                        onChange={(value) => {
                          props.setFieldValue("location", value);
                        }}
                        name="location"
                      />{" "}
                      {props.touched.location && props.errors.location ? (
                        <div className="formik-errors bg-error">
                          {props.errors.location}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group col-md-6">
                      <label className="form-label">Type <span className="text-danger">*</span></label>
                      <select
                        className="form-select"
                        value={props.values.type}
                        onChange={(e) => {
                          props.setFieldValue("type", e.target.value);
                        }}
                        onBlur={props.handleBlur}
                      >
                        <option value="">Select option</option>
                        <option value="retail">Retail</option>
                        <option value="corporate">Corporate</option>
                        <option value="video">Video</option>
                      </select>
                      {props.touched.type && props.errors.type ? (
                        <div className="formik-errors bg-error">
                          {props.errors.type}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group col-md-6">
                      <label className="form-label">Course <span className="text-danger">*</span></label>
                      <input
                        onChange={props.handleChange}
                        className="form-control"
                        value={props.values.course}
                        name="course"
                        placeholder="Enter course"
                      />
                      {props.touched.course && props.errors.course ? (
                        <div className="formik-errors bg-error">
                          {props.errors.course}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group col-md-6">
                      <label className="form-label">Date <span className="text-danger">*</span></label>
                      <input
                        className="form-control"
                        value={props.values.date}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        name="date"
                        type="date"
                      />{" "}
                      {props.touched.date && props.errors.date ? (
                        <div className="formik-errors bg-error">
                          {props.errors.date}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group col-md-6">
                      <label className="form-label">Review <span className="text-danger">*</span></label>
                      <input
                        className="form-control"
                        value={props.values.review}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        name="review"
                        type="number"
                        min={0}
                        placeholder="Choose review"
                      />{" "}
                      {props.touched.review && props.errors.review ? (
                        <div className="formik-errors bg-error">
                          {props.errors.review}
                        </div>
                      ) : null}
                    </div>
                    {props.values.type === "video" ? (
                      <div className="form-group col-md-12">
                        <label className="form-label">
                          Message <span className="text-danger">*</span>
                        </label>
                        <textarea
                          className="form-control"
                          value={props.values.description}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          name="description"
                          type="text"
                        />{" "}
                        {props.touched.description &&
                        props.errors.description ? (
                          <div className="formik-errors bg-error">
                            {props.errors.description}
                          </div>
                        ) : null}
                      </div>
                    ) : (
                      <div className="form-group col-md-12">
                        <label className="form-label">
                          Message <span className="text-danger">*</span>
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
                          value={props.values.description}
                          onEditorChange={(e) =>
                            props.setFieldValue("description", e)
                          }
                        />{" "}
                        {props.touched.description &&
                        props.errors.description ? (
                          <div className="formik-errors bg-error">
                            {props.errors.description}
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>
                </div>
                <div className="card-footer text-end">
                  <button className="btn btn-primary me-2" type="submit">
                    Submit
                  </button>
                </div>
              </form>{" "}
            <ToastContainer autoClose={1000} />
            </>
          )}
        </Formik>
      </div>
    </>
  );
};

export default TestimonialsAddForm;
