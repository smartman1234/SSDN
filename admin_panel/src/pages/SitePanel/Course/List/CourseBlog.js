import React, { useState } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import CourseCourseService from "../../../../Services/CourseService/CourseCourseService";

export default function CourseBlog({
  props,
  setBlogForm,
  setMainForm,
  setCurriculumForm,
  blogValue,
  setBlogValue,
  values,
  curriculumValue,
}) {
  const navigate = useNavigate();
  const serve = new CourseCourseService();
  const [blogImage1, setBlogImage1] = useState("");
  const [blogImage2, setBlogImage2] = useState("");
  const [blogImage3, setBlogImage3] = useState("");
  const onSubmit = async (value) => {
    setMainForm(false);
    setBlogForm(true);
    setCurriculumForm(false);

    let categoryArr =
      values.sub_category_id &&
      values.sub_category_id.map((v) => {
        return v.value;
      });

    let related_courseArr =
      values.related_course &&
      values.related_course.map((v) => {
        return v.value;
      });

    const cities =
      values.cities &&
      values.cities.map((v) => {
        return v.value;
      });

    const blogData = [
      {
        title: value.label1,
        link: value.link1,
        image: value.label1_image,
        date: value.date1,
      },
      {
        title: value.label2,
        link: value.link2,
        image: value.image2,
        date: value.date2,
      },
      {
        title: value.label3,
        link: value.link3,
        image: value.label3_image,
        date: value.date3,
      },
    ];
    const formData = new FormData();
    if (values.id) {
      formData.set("id", values.id);
    }
    formData.set(
      "default_course_categories_id",
      parseInt(values.default_course_categories_id.value)
    );
    formData.set("sub_category_id", categoryArr.join(","));
    formData.set("name", values.name);
    formData.set("heading", values.heading);
    formData.set(
      "slug",
      values.slug
        .trim()
        .replaceAll(" {{in VARCITY}}", "")
        .replaceAll(" ", "-")
        .toLowerCase()
    );
    formData.set("price_type", values.price_type);
    if (values.price_type === "paid") {
      formData.set("inr_price", values.inr_price);
      formData.set("is_inr_discount", values.is_inr_discount);
      if (values.is_inr_discount === "1") {
        formData.set("inr_discount_price", values.inr_discount_price);
      }
    }
    formData.set("media_type", values.media_type);
    if (values.media_type === "video") {
      formData.set("video_type", values.video_type);
    }
    formData.set("course_mode", values.mode1 +" "+ values.mode2);
    formData.set("media", values.media);
    if (values.media_type === "video") {
      formData.set("thumb_image", values.thumb_image);
    } else {
      formData.set("media_alt_tag", values.image_alt_tag);
    }
    formData.set("assignments", values.assignments);
    formData.set("code", values.code);
    formData.set("live_project", values.live_project);
    formData.set("course_overview", values.course_overview);
    formData.set("course_duration", values.course_duration);
    formData.set("course_duration_time", values.course_duration_time);

    formData.set("free_demo_description", values.free_demo_description);
    formData.set("about_title", values.about_title);
    formData.set("about", values.about);
    formData.set("curriculum_title", curriculumValue.curriculum_title);
    formData.set("curriculum", curriculumValue.curriculum);
    formData.set("certification_title", values.certification_title);
    formData.set("certification", values.certification);
    formData.set("certification_image", values.certification_image);
    formData.set(
      "certification_image_alt_tag",
      values.certification_image_alt_tag
    );

    formData.set("project_title", values.project_title);
    formData.set("project", values.project);
    formData.set("project_image", values.project_image);
    formData.set("project_image_alt_tag", values.project_image_alt_tag);
    formData.set(
      "project_what_will_get_title",
      values.project_what_will_get_title
    );
    formData.set("project_what_will_get", values.project_what_will_get);
    formData.set("project_pre_request_title", values.project_pre_request_title);
    formData.set("project_pre_request", values.project_pre_request);
    formData.set(
      "project_target_audience_title",
      values.project_target_audience_title
    );
    formData.set("project_target_audience", values.project_target_audience);
    formData.set("cities", cities && cities.join(","));

    formData.set("meta_title", values.meta_title);
    formData.set("meta_keyword", values.meta_keyword);
    formData.set("meta_description", values.meta_description);
    formData.set("breadcrumb", values.breadcrumb);
    formData.set("og_title", values.og_title);
    formData.set("og_url", values.og_url);
    formData.set("og_image", values.og_image);
    formData.set("og_description", values.og_description);
    formData.set("pdf", curriculumValue.pdf);
    formData.set("related_course",related_courseArr&& related_courseArr.join(","));
    formData.set(
      "curriculum_accordion",
      JSON.stringify(curriculumValue.curriculum_accordion)
    );
    formData.set("faqs", JSON.stringify(curriculumValue.faqs));
    formData.set("blogs", JSON.stringify(blogData));

    let obj = {
      name: values.name,
      slug: values.slug
        .trim()
        .replaceAll(" {{in VARCITY}}", "")
        .replaceAll(" ", "-")
        .toLowerCase(),
    };
    const config = {
      headers: {
        content: "multipart/form-data",
        AUTHTOKEN: window.user?.data?.auth_token,
      },
    };
    if (values.id) {
      try {
        const response = await axios.post(
          process.env.REACT_APP_API_BASEURL + `course/update-course`,
          formData,
          config
        );
        if (response.data?.status === "success") {
          toast.success("Record update successfully");
          setTimeout(() => {
            navigate("/course-list");
          }, [1000]);
        } else {
          toast.error(response.data?.message);
        }
      } catch (err) {
        throw err;
      }
    } else {
      const response = await serve.uniqueslug(obj);
      if (response.status === "success") {
        axios
          .post(
            process.env.REACT_APP_API_BASEURL + "course/add-course",
            formData,
            config
          )
          .then((res) => {
            if (res.data?.status === "success") {
              toast.success("Course created successfully");
              setTimeout(() => {
                navigate("/course-list");
              }, [1000]);
            } else if (res.data?.status === "fail") {
              toast.error(res.data.message);
            }
          })
          .catch((err) => {
            throw err;
          });
      } else {
        toast.error(response.data.name);
      }
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

  const handleFileInputImage = (e, props, name) => {
    
    let { file } = e.target.files[0];

    file = e.target.files[0];

    getBase64(file)
      .then((result) => {
        file["base64"] = result;
        

        if (name === "label1_image") {
          setBlogImage1(result);
        } else if (name === "image2") {
          setBlogImage2(result);
        } else if (name === "label3_image") {
          setBlogImage3(result);
        }
      })
      .catch((err) => {
        
      });
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
  const BlogBackBtn = () => {
    setCurriculumForm(true);
    setBlogForm(false);
    setMainForm(false);
  };
  return (
    <Formik
      initialValues={blogValue}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {(props) => (
        <form className="card-body" onSubmit={props.handleSubmit}>
          <div className="row">
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
              />
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
                    "course_blog"
                  );
                }}
                onBlur={props.handleBlur}
                name="label1_image"
                type="file"
                accept="image/*"
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
              />
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
                    "course_blog"
                  );
                }}
                onBlur={props.handleBlur}
                name="image2"
                type="file"
                accept="image/*"
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
              />
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
                    "course_blog"
                  );
                }}

                onBlur={props.handleBlur}
                name="label3_image"
                type="file"
                accept="image/*"
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
              <button
                className="btn btn-danger me-2"
                type="button"
                onClick={BlogBackBtn}
              >
                Previous
              </button>
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}
