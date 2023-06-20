import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const ClientAddForm = () => {
  const param = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const path_name = location.pathname;
  const split_d = path_name.split("/");
  const id_ = Number(split_d[2]);
  const [formData, setformData] = useState([]);
  const [formError, setformError] = useState([]);
  const [image, setImage] = useState("");

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

  const GetClientContent = async () => {
    var myHeaders = new Headers();
    myHeaders.append("AUTHTOKEN", auth_token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(`${url}client/get-our-client/${id_}`, requestOptions)
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
      formData.logo === null ||
      formData.logo === undefined ||
      formData.logo === ""
    ) {
      error.logo = "Please choose logo";
    }
    if (
      formData.logo_alt_tag === null ||
      formData.logo_alt_tag === undefined ||
      formData.logo_alt_tag === ""
    ) {
      error.logo_alt_tag = "Please enter logo alt tag";
    }
    if (
      formData.title === null ||
      formData.title === undefined ||
      formData.title === ""
    ) {
      error.title = "Please enter title";
    }
    setformError(error);
    if (Object.keys(error).length === 0) {
      var myHeaders = new Headers();
      myHeaders.append("AUTHTOKEN", auth_token);

      var formdata = new FormData();
      formdata.append("logo", formData.logo);
      formdata.append("logo_alt_tag", formData.logo_alt_tag);
      formdata.append("title", formData.title);
      if (param.id) {
        formdata.append("id", id);
      }

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
      };

      if (param.id) {
        fetch(`${url}client/update-our-client`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result.status === "success") {
              toast.success("Client Updated Successful !", {
                position: toast.POSITION.TOP_RIGHT,
              });
              setTimeout(() => {
                navigate(`/client`);
              }, 2000);
            } else {
              toast.error("Something want wrong !", {
                position: toast.POSITION.TOP_RIGHT,
              });
            }
          })
          .catch((error) => console.log("error", error));
      } else {
        fetch(`${url}client/create-our-client`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result.status === "success") {
              toast.success("Client Added Successful !", {
                position: toast.POSITION.TOP_RIGHT,
              });
              setTimeout(() => {
                navigate(`/client`);
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

  useEffect(() => {
    if (param.id) {
      GetClientContent();
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
        if (height > 184 || width > 276) {
          alert(
            "Height should not exceed from 184 px and width should not exceed from 276 px"
          );
        } else if (height < 184 || width < 276) {
          alert(
            "Height should not less than from 184 px and width should not less than from 276 px"
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

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h5>{id_ !== 0 ? "Edit" : "Add"} Client</h5>
        </div>
        <form
          className="form theme-form"
          onSubmit={(e) => SubmitFormData(e, id_)}
        >
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <label className="form-label">
                  Title <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  id="title"
                  onChange={handlerequest}
                  name="title"
                  defaultValue={formData.title}
                  type="text"
                  placeholder="Enter enter title"
                />
                <p className="error_msg">{formError.title}</p>
              </div>
              <div className="col-md-4">
                <label className="form-label">
                  Logo <span className="text-danger">*</span>
                </label>
                <span className="text-danger image-data">
                  Image Size: 276 × 184
                </span>
                <input
                  type="hidden"
                  className="form-control"
                  defaultValue={formData.image}
                  name="image"
                />
                {}
                <input
                  className="form-control"
                  id="logo"
                  name="logo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    handlefileUploading(e, "logo");
                  }}
                  placeholder="Enter role name"
                />
                {(image || formData.logo) && (
                  <img src={image || formData.logo} className="w-50" alt="logo"/>
                )}

                <p className="error_msg">{formError.logo}</p>
              </div>
              <div className="col-md-4">
                <label className="form-label">
                  Logo Alt Tag <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  id="logo_alt_tag"
                  onChange={handlerequest}
                  name="logo_alt_tag"
                  defaultValue={formData.logo_alt_tag}
                  type="text"
                  placeholder="Enter alt tag for icon"
                />
                <p className="error_msg">{formError.logo_alt_tag}</p>
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

export default ClientAddForm;
