import React, { useState, useContext, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../container/Context";

const TestimonialsAddForm = () => {
  const navigate = useNavigate();
  const [AboutId, setAboutId] = useState(0);
  const [formData, setformData] = useState([]);
  const { login, permissions } = useContext(Context);
  const [loginData, setLoginData] = login;
  const [pagesData, setPagesData] = useState([]);
  const [rolePermission, setRolePermission] = permissions;
  const [updateimage, setUpdateImage] = useState();
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

  const getHowDetail = async () => {
    var myHeaders = new Headers();
    myHeaders.append("AUTHTOKEN", auth_token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(`${url}about/get-about`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          setformData(result.data);
          setAboutId(result?.data?.id);
        }
      })
      .catch((error) => console.log("error", error));
  };


  const handlerequest = async (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const handleEditor = async (e, type) => {
    setformData({ ...formData, [type]: e.target.getContent() });
  };

  const SubmitFormData = async (e, id) => {
    e.preventDefault();
    if (
      formData.mission_description === null ||
      formData.mission_description === undefined ||
      formData.mission_description === ""
    ) {
      error.mission_description = "please enter mission description";
    }
    if (
      formData.mission_image === null ||
      formData.mission_image === undefined ||
      formData.mission_image === ""
    ) {
      error.mission_image = "please enter mission image";
    }
    if (
      formData.mission_alt_tag === null ||
      formData.mission_alt_tag === undefined ||
      formData.mission_alt_tag === ""
    ) {
      error.mission_alt_tag = "please enter mission alternet";
    }
    if (
      formData.mission_title === null ||
      formData.mission_title === undefined ||
      formData.mission_title === ""
    ) {
      error.mission_title = "please enter mission title";
    }
    if (
      formData.vision_description === null ||
      formData.vision_description === undefined ||
      formData.vision_description === ""
    ) {
      error.vision_description = "please enter vision description";
    }
    if (
      formData.vision_image === null ||
      formData.vision_image === undefined ||
      formData.vision_image === ""
    ) {
      error.vision_image = "please enter vision image";
    }
    if (
      formData.vision_alt_tag === null ||
      formData.vision_alt_tag === undefined ||
      formData.vision_alt_tag === ""
    ) {
      error.vision_alt_tag = "please enter vision alternet";
    }
    if (
      formData.vision_title === null ||
      formData.vision_title === undefined ||
      formData.vision_title === ""
    ) {
      error.vision_title = "please enter vision title";
    }
    if (
      formData.who_we_are_description === null ||
      formData.who_we_are_description === undefined ||
      formData.who_we_are_description === ""
    ) {
      error.who_we_are_description = "please enter who we are description";
    }
    if (
      formData.who_we_are_image === null ||
      formData.who_we_are_image === undefined ||
      formData.who_we_are_image === ""
    ) {
      error.who_we_are_image = "please enter who we are image";
    }

    if (
      formData.who_alt_tag === null ||
      formData.who_alt_tag === undefined ||
      formData.who_alt_tag === ""
    ) {
      error.who_alt_tag = "please enter who we are alternet";
    }
    if (
      formData.who_we_are_title === null ||
      formData.who_we_are_title === undefined ||
      formData.who_we_are_title === ""
    ) {
      error.who_we_are_title = "please enter who we are title";
    }
    setformError(error);
    if (Object.keys(error).length === 0) {
      var myHeaders = new Headers();
      myHeaders.append("AUTHTOKEN", auth_token);

      var formdata = new FormData();
      formdata.append("who_we_are_title", formData.who_we_are_title);
      formdata.append(
        "who_we_are_description",
        formData.who_we_are_description
      );
      if (typeof formData.who_we_are_image == "string") {
        formdata.append("who_we_are_image", formData.who_we_are_image);
      }
      formdata.append("who_alt_tag", formData.who_alt_tag);
      formdata.append("mission_title", formData.mission_title);
      formdata.append("mission_description", formData.mission_description);
      if (typeof formData.mission_image == "string") {
        formdata.append("mission_image", formData.mission_image);
      }
      formdata.append("mission_alt_tag", formData.mission_alt_tag);
      formdata.append("vision_title", formData.vision_title);
      formdata.append("vision_description", formData.vision_description);
      if (typeof formData.vision_image == "string") {
        formdata.append("vision_image", formData.vision_image);
      }
      formdata.append("vision_alt_tag", formData.vision_alt_tag);
      formdata.append("id", id);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
      };

      if (id !== 0) {
        fetch(`${url}about/update-about`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result.status === "success") {
              toast.success("How Updated Successful !", {
                position: toast.POSITION.TOP_RIGHT,
              });
              setTimeout(() => {
                navigate(`/how`);
              }, 2000);
            } else {
              toast.error("Something want wrong !", {
                position: toast.POSITION.TOP_RIGHT,
              });
            }
          })
          .catch((error) => console.log("error", error));
      } else {
        fetch(`${url}about/create-about`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result.status === "success") {
              toast.success("How Added Successful !", {
                position: toast.POSITION.TOP_RIGHT,
              });
              setTimeout(() => {
                navigate(`/how`);
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
    setLoginData(JSON.parse(localStorage.getItem("user")));
    getHowDetail();
  }, []);

  useEffect(() => {
    const pages = loginData?.data?.role_permission;

    if (pages) {
      const items = [];
      for (const item of pages) {
        if (!item.parent_id) {
          items.push({
            ...item,
            child: pages.filter((v) => v.parent_id === item.id),
          });
        }
        if (item.slug === window.location.pathname.replace("/", "")) {
          setRolePermission(item.role_permission);
        }
      }
      setPagesData(items);
    }
  }, [loginData]);

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

  const WhoWeAre = (e, type) => {
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
        if (height > 362 || width > 563) {
          alert(
            "Height should not exceed from 362 px and width should not exceed from 563 px"
          );
        } else if (height < 362 || width < 563) {
          alert(
            "Height should not less than from 362 px and width should not less than from 563 px"
          );
        } else {
          getBase64(file)
            .then((result) => {
              file["base64"] = result;
              setformData({ ...formData, [type]: result });
            })
            .catch((err) => {
              
            });
        }
      };
    };
  };

  const missionImage = (e, type) => {
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
        if (height > 362 || width > 563) {
          alert(
            "Height should not exceed from 362 px and width should not exceed from 563 px"
          );
        } else if (height < 362 || width < 563) {
          alert(
            "Height should not less than from 362 px and width should not less than from 563 px"
          );
        } else {
          getBase64(file)
            .then((result) => {
              file["base64"] = result;
              setformData({ ...formData, [type]: result });
            })
            .catch((err) => {
              
            });
        }
      };
    };
  };
  const VissionImage = (e, type) => {
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
        if (height > 362 || width > 563) {
          alert(
            "Height should not exceed from 362 px and width should not exceed from 563 px"
          );
        } else if (height < 362 || width < 563) {
          alert(
            "Height should not less than from 362 px and width should not less than from 563 px"
          );
        } else {
          getBase64(file)
            .then((result) => {
              file["base64"] = result;
              setformData({ ...formData, [type]: result });
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
          <h5>Add </h5>
        </div>
        <form
          className="form theme-form"
          onSubmit={(e) => SubmitFormData(e, AboutId)}
        >
          <div className="card-body">
            <div className="row">
              <div className="col-md-12">
                <h6>Who We Are </h6>
                <hr></hr>
              </div>
              <div className="col-md-6 p-0">
                <div className="row">
                  <div className="form-group col-md-12">
                    <label className="form-label">
                      Heading <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      id="who_we_are_title"
                      defaultValue={formData.who_we_are_title}
                      name="who_we_are_title"
                      type="text"
                      onChange={handlerequest}
                    />
                    <p className="text-danger error_msg">
                      {formError.who_we_are_title}
                    </p>
                  </div>
                  <div className="form-group col-md-6">
                    <label className="form-label">
                      Image
                      <span className="text-danger">size 563 × 362 px *</span>
                    </label>
                    <input
                      className="form-control"
                      id="who_we_are_image"
                      name="who_we_are_image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        WhoWeAre(e, "who_we_are_image");
                      }}
                    />
                    <p className="text-danger error_msg">
                      {formError.who_we_are_image}
                    </p>
                    <input
                      type="hidden"
                      className="form-control"
                      defaultValue={formData.who_we_are_image}
                      name="who_we_are_image"
                      onChange={(e) => WhoWeAre(e, "who_we_are_image")}
                    />
                    {(formData.who_we_are_image || updateimage) && (
                      <img
                        src={formData.who_we_are_image || url}
                        className="w-50 mt-2"
                      />
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <label className="form-label">Image Alt Tag</label>
                    <input
                      className="form-control"
                      id="who_alt_tag"
                      defaultValue={formData.who_alt_tag}
                      name="who_alt_tag"
                      type="text"
                      onChange={handlerequest}
                    />
                    <p className="text-danger error_msg">
                      {formError.who_alt_tag}
                    </p>
                  </div>
                </div>
              </div>

              <div className="form-group col-md-6">
                <label className="form-label">
                  Description <span className="text-danger">*</span>
                </label>
                <Editor
                  textareaName="who_we_are_description"
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
                  initialValue={formData.who_we_are_description}
                  onChange={(e) => handleEditor(e, "who_we_are_description")}
                />
                <p className="text-danger error_msg">
                  {formError.who_we_are_description}
                </p>
              </div>
              <div className="col-md-12 mt-4">
                <h6>Our Mission </h6>
                <hr></hr>
              </div>
              <div className="col-md-6 p-0">
                <div className="row">
                  <div className="form-group col-md-12">
                    <label className="form-label">
                      Heading <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      id="mission_title"
                      defaultValue={formData.mission_title}
                      name="mission_title"
                      type="text"
                      onChange={handlerequest}
                    />
                    <p className="text-danger error_msg">
                      {formError.mission_title}
                    </p>
                  </div>
                  <div className="form-group col-md-6">
                    <label className="form-label">
                      Image
                      <span className="text-danger">size 563 × 362 px *</span>
                    </label>
                    <input
                      className="form-control"
                      id="mission_image"
                      name="mission_image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        const url = URL.createObjectURL(file);
                        setUpdateImage(url);
                        missionImage(e, "mission_image");
                      }}
                    />
                    <input
                      className="form-control"
                      defaultValue={formData.mission_image}
                      name="mission_image"
                      type="hidden"
                      onChange={(e) => missionImage(e, "mission_image")}
                    />
                    <img src={formData.mission_image} className="w-50 mt-2" alt="image"/>
                    <p className="text-danger error_msg">
                      {formError.mission_image}
                    </p>
                  </div>
                  <div className="form-group col-md-6">
                    <label className="form-label">Image Alt Tag</label>
                    <input
                      className="form-control"
                      id="mission_alt_tag"
                      defaultValue={formData.mission_alt_tag}
                      name="mission_alt_tag"
                      type="text"
                      onChange={handlerequest}
                    />
                    <p className="text-danger error_msg">
                      {formError.mission_alt_tag}
                    </p>
                  </div>
                </div>
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Description <span className="text-danger">*</span>
                </label>
                <Editor
                  textareaName="mission_description"
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
                  initialValue={formData.mission_description}
                  onChange={(e) => handleEditor(e, "mission_description")}
                />
                <p className="text-danger error_msg">
                  {formError.mission_description}
                </p>
              </div>
              <div className="col-md-12 mt-4">
                <h6>Our Vision </h6>
                <hr></hr>
              </div>
              <div className="col-md-6 p-0">
                <div className="row">
                  <div className="form-group col-md-12">
                    <label className="form-label">
                      Heading <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      id="vision_title"
                      defaultValue={formData.vision_title}
                      name="vision_title"
                      type="text"
                      onChange={handlerequest}
                    />
                    <p className="text-danger error_msg">
                      {formError.vision_title}
                    </p>
                  </div>
                  <div className="form-group col-md-6">
                    <label className="form-label">
                      Image
                      <span className="text-danger">size 563 × 362 px *</span>
                    </label>
                    <input
                      className="form-control"
                      id="vision_image"
                      name="vision_image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        const url = URL.createObjectURL(file);
                        setUpdateImage(url);
                        VissionImage(e, "vision_image");
                      }}
                    />
                    <p className="text-danger error_msg">
                      {formError.vision_image}
                    </p>
                    <input
                      className="form-control"
                      defaultValue={formData.vision_image}
                      name="vision_image"
                      type="hidden"
                      onChange={(e) => VissionImage(e, "vision_image")}
                    />
                    <img src={formData.vision_image} className="w-50 mt-2" alt="image"/>
                  </div>
                  <div className="form-group col-md-6">
                    <label className="form-label">Image Alt Tag</label>
                    <input
                      className="form-control"
                      id="vision_alt_tag"
                      defaultValue={formData.vision_alt_tag}
                      name="vision_alt_tag"
                      type="text"
                      onChange={handlerequest}
                    />
                    <p className="text-danger error_msg">
                      {formError.vision_alt_tag}
                    </p>
                  </div>
                </div>
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Description <span className="text-danger">*</span>
                </label>
                <Editor
                  textareaName="vision_description"
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
                  initialValue={formData.vision_description}
                  onChange={(e) => handleEditor(e, "vision_description")}
                />
                <p className="text-danger error_msg">
                  {formError.vision_description}
                </p>
              </div>
            </div>
          </div>
          <div className="card-footer text-end">
            {rolePermission.is_add == 1 ? (
              <button className="btn btn-primary me-2" type="submit">
                Submit
              </button>
            ) : (
              <button className="btn btn-primary me-2" type="submit" disabled>
                Submit
              </button>
            )}
          </div>
        </form>
      <ToastContainer autoClose={1000} />
      </div>
    </>
  );
};

export default TestimonialsAddForm;
