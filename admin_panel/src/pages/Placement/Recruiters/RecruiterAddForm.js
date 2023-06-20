import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import { Link } from "react-router-dom";
import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PlacementService from "../../../Services/PlacementService/PlacementService";
const RecruiterAddForm = () => {
  const navigate = useNavigate();
  const serve = new PlacementService();
  const [image, setImage] = useState();
  const [imageUrl, setImageurl] = useState("");
  const params = useParams();
  const [value, setValue] = useState({
    image: "",
  });

  const onSubmit = async (values) => {
    const formData = new FormData();
    if (values.id) {
      formData.set("id", values.id);
    }
    formData.set("image", values.image);

    const config = {
      headers: {
        content: "multipart/form-data",
        AUTHTOKEN: window.user?.data?.auth_token,
      },
    };
    if (values.id) {
      try {
        const response = await axios.post(
          process.env.REACT_APP_API_BASEURL + `placement/update-placed-user`,
          formData,
          config
        );
        if (response.data?.status === "success") {
          toast.success("Record update successfully");
          setTimeout(() => {
            navigate("/recruiters");
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
          process.env.REACT_APP_API_BASEURL + "recruiter/create-recruiter",
          formData,
          config
        )
        .then((res) => {
          if (res.data?.status === "success") {
            toast.success("Record created successfully");
            setTimeout(() => {
              navigate("/recruiters");
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
    image: Yup.mixed().required("Required"),
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
          id: response.data.id,
          image: response.data?.profile,
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
          if (height > 69 || width > 230) {
            alert(
              "Height should not exceed from 69px and width should not exceed from 230 px"
            );
          } else if (height < 69 || width < 225) {
            alert(
              "Height should not less than from 69px and width should not less than from 225 px"
            );
          } else {
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
        }
      };
    };
  };

  const name = (
    <Link to="/create-blog" className="btn btn-primary">
      <i className="fa-solid fa-plus me-2"></i>back
    </Link>
  );
  return (
    <>
      <div className="page-body">
        <Breadcrumb heading={params.id ? "Edit Recruiter" : "Add Recruiter"} />
        <div className="container-fluid support-ticket">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>{params.id ? "Edit Recruiter" : "Add Recruiter"}</h5>
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
                          <div className="col-md-6 form-group">
                            <label className="form-label">
                              Image <span className="text-danger"> 230 * 69 *</span>
                            </label>
                            <input
                              className="form-control"
                              onChange={(e) => {
                                thumbImagehandle(e, props, "image");
                              }}
                              name="image"
                              accept="image/*"
                              type="file"
                            />{" "}
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
                              width: "55px",
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
                        </div>
                      </div>
                      <div className="card-footer text-end">
                        <button className="btn btn-primary me-2" type="submit">
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

    <ToastContainer autoClose={1000} />
    </>
  );
};

export default RecruiterAddForm;
