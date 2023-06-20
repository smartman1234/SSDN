import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const CompaniesAddForm = () => {
  const param = useParams();
  const [updateimage, setUpdateImage] = useState();
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const path_name = location.pathname;
  const split_d = path_name.split("/");
  const id_ = Number(split_d[2]);
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

  const GetCompaniesContent = async () => {
    var myHeaders = new Headers();
    myHeaders.append("AUTHTOKEN", auth_token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(`${url}company/get-our-company/${id_}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          setformData(result?.data);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handlerequest = async (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value.trim() });
  };

  const SubmitFormData = async (e, id) => {
    e.preventDefault();
    if (
      formData.image === null ||
      formData.image === undefined ||
      formData.image === ""
    ) {
      error.image = "Please choose image";
    }
    if (
      formData.image_alt_tag === null ||
      formData.image_alt_tag === undefined ||
      formData.image_alt_tag === ""
    ) {
      error.image_alt_tag = "Please enter image alt tag";
    }
    if (
      formData.url === null ||
      formData.url === undefined ||
      formData.url === ""
    ) {
      error.url = "Please enter url";
    }
    setformError(error);
    if (Object.keys(error).length === 0) {
      var myHeaders = new Headers();
      myHeaders.append("AUTHTOKEN", auth_token);

      var formdata = new FormData();
        formdata.append("image", formData.image);
      formdata.append("image_alt_tag", formData.image_alt_tag);
      formdata.append("url", formData.url);
      if (param.id) {
        formdata.append("id", id);
      }

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
      };

      if (param.id) {
        fetch(`${url}company/update-our-company`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result.status === "success") {
              toast.success("Companies Updated Successful !", {
                position: toast.POSITION.TOP_RIGHT,
              });
              setTimeout(() => {
                navigate(`/companies`);
              }, 2000);
            } else {
              toast.error("Something want wrong !", {
                position: toast.POSITION.TOP_RIGHT,
              });
            }
          })
          .catch((error) => console.log("error", error));
      } else {
        fetch(`${url}company/create-our-company`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result.status === "success") {
              toast.success("Companies Added Successful !", {
                position: toast.POSITION.TOP_RIGHT,
              });
              setTimeout(() => {
                navigate(`/companies`);
              }, 2000);
            } else {
              toast.error("Something want wrong !", {
                position: toast.POSITION.TOP_RIGHT,
              });
            }
          })
          .catch((error) => console.log("error", error));
      }
    } else {
      setformError(error);
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

  const handlefileUploading = (e, type) => {
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
        if (height > 98 || width > 183) {
          alert(
            "Height should not exceed from 98 px and width should not exceed from 183 px"
          );
        } else if (height < 98 || width < 183) {
          alert(
            "Height should not less than from 98 px and width should not less than from 183 px"
          );
        } else {
          getBase64(file)
            .then((result) => {
              file["base64"] = result;
              setformData({ ...formData, [type]: file });
              setImage(result);
            })
            .catch((err) => {
              
            });
        }
      };
    };
  };

  useEffect(() => {
    if (param.id) {
      GetCompaniesContent();
    }
  }, []);
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h5>{id_ !== 0 ? "Edit" : "Add"} Companies</h5>
        </div>
        <form
          className="form theme-form"
          onSubmit={(e) => SubmitFormData(e, id_)}
        >
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <label className="form-label">
                  Image <span className="text-danger">*</span>
                </label>
                <span className="text-danger image-data">
                  Image Size: 183 × 98 px
                </span>
                <input
                  type="hidden"
                  className="form-control"
                  defaultValue={formData.image}
                  name="image"
                />
                <input
                  className="form-control"
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];

                    handlefileUploading(e, "image");
                  }}
                  placeholder="Enter role name"
                />
                {(image || formData.image) && (
                  <img src={image || formData.image} className="w-50 mt-3" alt="image"/>
                )}
                <p className="error_msg">{formError.image}</p>
              </div>
              <div className="col-md-4">
                <label className="form-label">
                  Image Alt Tag <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  id="image_alt_tag"
                  onChange={handlerequest}
                  name="image_alt_tag"
                  defaultValue={formData.image_alt_tag}
                  type="text"
                  placeholder="Enter alt tag for icon"
                />
                <p className="error_msg">{formError.image_alt_tag}</p>
              </div>
              <div className="col-md-4">
                <label className="form-label">
                  Url <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  id="url"
                  onChange={handlerequest}
                  name="url"
                  defaultValue={formData.url}
                  type="text"
                  placeholder="Enter URL"
                />
                <p className="error_msg">{formError.url}</p>
              </div>
            </div>
          </div>
          <div className="card-footer text-end">
            <button className="btn btn-primary me-2" type="submit">
              Submit
            </button>
            <button className="btn btn-danger" type="reset">
              Reset
            </button>
          </div>
        </form>
      <ToastContainer autoClose={1000} />
      </div>
    </>
  );
};

export default CompaniesAddForm;
