import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const TimelineAddForm = () => {
 
  const navigate = useNavigate();
  const location = useLocation();
  const path_name = location.pathname;
  const split_d = path_name.split("/");
  let id_ = Number(split_d[2]);
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

  const GetTimeLineContent = async () => {
    var myHeaders = new Headers();
    myHeaders.append("AUTHTOKEN", auth_token);

    var requestOptions = {
      headers: myHeaders,
      method: "GET",
    };

    fetch(`${url}timeline/get-timeline/${id_}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          setformData(result.data);
          id_ = result?.data?.id;
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handleEditor = async (e, type) => {
    setformData({ ...formData, [type]: e.target.getContent() });
  };
  const handlerequest = async (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value.trim() });
  };

  const SubmitFormData = async (e, id) => {
    e.preventDefault();
    if (
      formData.date === null ||
      formData.date === undefined ||
      formData.date === ""
    ) {
      error.date = "Please choose date";
    }
    if (
      formData.title === null ||
      formData.title === undefined ||
      formData.title === ""
    ) {
      error.title = "Please enter title";
    }
    if (
      formData.discription === null ||
      formData.discription === undefined ||
      formData.discription === ""
    ) {
      error.discription = "Please enter description";
    }
    setformError(error);
    if (Object.keys(error).length === 0) {
      var myHeaders = new Headers();
      myHeaders.append("AUTHTOKEN", auth_token);

      var formdata = new FormData();
      formdata.append("date", formData.date);
      formdata.append("title", formData.title);
      formdata.append("discription", formData.discription);
      formdata.append("id", id);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
      };

      if (id !== 0) {
        fetch(`${url}timeline/update-timeline`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result.status === "success") {
              toast.success("Gallery Updated Successful !", {
                position: toast.POSITION.TOP_RIGHT,
              });
              setTimeout(() => {
                navigate(`/timeline`);
              }, 2000);
            } else {
              toast.error("Something want wrong !", {
                position: toast.POSITION.TOP_RIGHT,
              });
              setTimeout(() => {
                navigate(`/timeline/` + id);
              }, 2000);
            }
          })
          .catch((error) => console.log("error", error));
      } else {
        fetch(`${url}timeline/create-timeline`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result.status === "success") {
              toast.success("Gallery Added Successful !", {
                position: toast.POSITION.TOP_RIGHT,
              });
              setTimeout(() => {
                navigate(`/timeline`);
              }, 2000);
            } else {
              toast.error("Something want wrong !", {
                position: toast.POSITION.TOP_RIGHT,
              });
              setTimeout(() => {
                navigate(`/timeline/` + id);
              }, 2000);
            }
          })
          .catch((error) => console.log("error", error));
      }
    } else {
      setformError(error);
    }
  };

  useEffect(() => {
    GetTimeLineContent();
  }, []);

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h5>Add Timeline</h5>
        </div>
        <form
          className="form theme-form"
          onSubmit={(e) => SubmitFormData(e, id_)}
        >
          <div className="card-body">
            <div className="row">
              <div className="form-group col-md-6">
                <label className="form-label">
                  Date <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  id="date"
                  name="date"
                  type="date"
                  defaultValue={formData.date}
                  onChange={handlerequest}
                  placeholder="Enter role name"
                />
                <p className="error_msg">{formError.date}</p>
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Year <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  id="title"
                  name="title"
                  type="text"
                  defaultValue={formData.title}
                  onChange={handlerequest}
                  placeholder="Enter heading"
                />
                <p className="error_msg">{formError.title}</p>
              </div>
              <div className="form-group col-md-12">
                <label className="form-label">
                  Description <span className="text-danger">*</span>
                </label>
                <Editor
                  textareaName="discription"
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
                  initialValue={formData.discription}
                  onEditorChange={(e) => handleEditor(e, "discription")}
                />
           
                <p className="error_msg">{formError.discription}</p>
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

export default TimelineAddForm;
