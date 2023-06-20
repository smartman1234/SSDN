import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import { Link } from "react-router-dom";
import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import BlogService from "../../../Services/BlogServices/BlogService";

export default function BlogForm() {
  const navigate = useNavigate();
  const serve = new BlogService();
  const [image, setImage] = useState();
  const [imageUrl, setImageurl] = useState("");
  const params = useParams();
  const [value, setValue] = useState({
    title: "",
    link: "",
    image: "",
    created_date: "",
  });

  const onSubmit = async (values) => {
    const formData = new FormData();
    if (values.id) {
      formData.set("id", values.id);
    }
    formData.set("title", values.title);
    formData.set("link", values.link);
    formData.set("image", values.image);
    formData.set("created_date", values.created_date);

    const config = {
      headers: {
        content: "multipart/form-data",
        AUTHTOKEN: window.user?.data?.auth_token,
      },
    };
    if (values.id) {
      try {
        const response = await axios.post(
          process.env.REACT_APP_API_BASEURL + `blog/update-blog`,
          formData,
          config
        );
        if (response.data?.status === "success") {
          toast.success("Record update successfully");
          setTimeout(() => {
            navigate("/blogs");
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
          process.env.REACT_APP_API_BASEURL + "blog/create-blog",
          formData,
          config
        )
        .then((res) => {
          if (res.data?.status === "success") {
            toast.success("Record created successfully");
            setTimeout(() => {
              navigate("/blogs");
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

  const ValidateSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    link: Yup.string().required("Required"),
    image: Yup.mixed().required("Required"),
    created_date: Yup.string().required("Required"),
  });

  useEffect(() => {
    if (params.id) {
      getDetailApi();
    }
  }, []);

  const getDetailApi = async () => {
    try {
      let response = await serve.getDetail(params.id);
      if (response) {
        setValue({
          id:response.data.id,
          title: response.data?.title,
          link: response.data?.link,
          image: response.data?.image,
          created_date: response.data?.created_date,
        });
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
          getBase64(file)
            .then((result) => {
              file["base64"] = result;
              setImage(result);
              props.setFieldValue("image", file);
            })
            .catch((err) => {
              throw err;
            });
        }
      };
    };
  };

  return (
    <>
      <div className="page-body">
        <Breadcrumb
          heading={params.id ? "Edit Blog " : "Add Blog "}
        />
        <div className="container-fluid support-ticket">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>
                    {params.id ? "Edit Blog" : "Add Blog"}
                  </h5>
                </div>
                <Formik
                  initialValues={value}
                  onSubmit={onSubmit}
                  enableReinitialize={true}
                  validationSchema={ValidateSchema}
                >
                  {(props) => (
                    <form
                      className="form theme-form"
                      onSubmit={props.handleSubmit}
                    >
                      <div className="card-body">
                        <div className="row">
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Title <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              name="title"
                              type="text"
                              placeholder="Enter title"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.title}
                            />
                            {props.touched.title && props.errors.title ? (
                              <div className="formik-errors bg-error">
                                {props.errors.title}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Link <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              name="link"
                              type="text"
                              placeholder="Enter link"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.link}
                            />
                            {props.touched.link && props.errors.link ? (
                              <div className="formik-errors bg-error">
                                {props.errors.link}
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
                              Image <span className="text-danger">*</span>
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

                          <div
                            className="input-group-append col-md-1"
                            style={{
                              top: "25px",
                              paddingLeft: "0px",
                              height: "49px",
                            }}
                          >
                            <img
                              src={image || props.values.image}
                              alt="image"
                              style={{
                                padding: "0",
                                width: "100%",
                                height: "72%",
                              }}
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Created Date{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              name="created_date"
                              type="date"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.created_date}
                            />
                            {props.touched.created_date &&
                            props.errors.created_date ? (
                              <div className="formik-errors bg-error">
                                {props.errors.created_date}
                              </div>
                            ) : null}
                          </div>
                          <div className="text-end btn-mb">
                            <button className="btn btn-primary" type="submit">
                              Submit{" "}
                            </button>
                          </div>
                        </div>
                      </div>
                    <ToastContainer autoClose={1000} />
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
