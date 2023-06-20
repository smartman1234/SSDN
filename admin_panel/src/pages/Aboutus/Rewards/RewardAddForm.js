import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const RewardAddForm = () => {
  const param=useParams()
  const navigate = useNavigate();
  const location = useLocation();
  const path_name = location.pathname;
  const split_d = path_name.split("/");
  const id_ = Number(split_d[2]);
  const [formData, setformData] = useState([]);
  const [image, setImage] = useState("");
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
      error.image = "please choose image";
    }
    if (
      formData.image_alt_tag === null ||
      formData.image_alt_tag === undefined ||
      formData.image_alt_tag === ""
    ) {
      error.image_alt_tag = "please enter image alt tag";
    }
    setformError(error);
    if (Object.keys(error).length === 0) {
      var myHeaders = new Headers();
      myHeaders.append("AUTHTOKEN", auth_token);

      var formdata = new FormData();
        formdata.append("image", formData.image);
      formdata.append("image_alt_tag", formData.image_alt_tag);
      if(param.id){
        formdata.append("id", id);
      }
     

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
      };

      if (param.id) {
        fetch(
          `${url}reward-recongnition/update-reward-recognition`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            if (result.status === "success") {
              toast.success("Reward Updated Successful !", {
                position: toast.POSITION.TOP_RIGHT,
              });
              setTimeout(() => {
                navigate(`/rewards`);
              }, 2000);
            } else {
              toast.error("Something want wrong !", {
                position: toast.POSITION.TOP_RIGHT,
              });
              setTimeout(() => {
                navigate(`/rewards/` + id);
              }, 2000);
            }
          })
          .catch((error) => console.log("error", error));
      } else {
        fetch(
          `${url}reward-recongnition/create-reward-recognition`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            if (result.status === "success") {
              toast.success("Reward Added Successful !", {
                position: toast.POSITION.TOP_RIGHT,
              });
              setTimeout(() => {
                navigate(`/rewards`);
              }, 2000);
            } else {
              toast.error("Something want wrong !", {
                position: toast.POSITION.TOP_RIGHT,
              });
              setTimeout(() => {
                navigate(`/rewards/` + id);
              }, 2000);
            }
          })
          .catch((error) => console.log("error", error));
      }
    } else {
      setformError(error);
    }
  };

  const GetRewardContent = async () => {
    var myHeaders = new Headers();
    myHeaders.append("AUTHTOKEN", auth_token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(
      `${url}reward-recongnition/get-reward-recognition/${id_}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.message === "Success") {
          setformData(result?.data);
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    if (param.id) {
      GetRewardContent();
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
    file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function (e) {
      var image = new Image();
      image.src = e.target.result;
      image.onload = function () {
        var height = this.height;
        var width = this.width;
        
        if (height > 335 || width > 250) {
          alert(
            "Height should not exceed from 335 px and width should not exceed from 250 px"
          );
        } else if (height < 330 || width < 245) {
          alert(
            "Height should not less than from 330 px and width should not less than from 245 px"
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
          <h5>{param.id ? "Edit" : "Add"} Reward</h5>
        </div>
        <form
          className="form theme-form"
          onSubmit={(e) => SubmitFormData(e, id_)}
        >
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <label className="form-label">Image </label>
                <span className="text-danger image-data">
                  Image Size: 245 X 335
                </span>{" "}
                <span className="text-danger">*</span>
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
                  onChange={(e) => handlefileUploading(e, "image")}
                  placeholder="Enter role name"
                />
                {(image || formData.image) && (
                  <img src={image || formData.image} className="w-50" alt="image"/>
                )}
                <p className="error_msg">{formError.image}</p>
              </div>
              <div className="col-md-6">
                <label className="form-label">
                  Image Alt Tag <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  id="image_alt_tag"
                  name="image_alt_tag"
                  type="text"
                  defaultValue={formData.image_alt_tag}
                  onChange={handlerequest}
                  placeholder="Enter alt tag for icon"
                />
                <p className="error_msg">{formError.image_alt_tag}</p>
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
      </div>
    <ToastContainer autoClose={1000} />
    </>
  );
};

export default RewardAddForm;
