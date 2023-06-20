import React, { useState, useEffect, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import axios from "axios";
import { Formik, Form, Field, FieldArray } from "formik";
import countryList from "react-select-country-list";
import StaticpageService from "../../../Services/StaticPageService/StaticePageService";

export default function Students({
  props,
  values,
  getDataById,
  setValues,
  imageUrl,
}) {
  const serve = new StaticpageService();
  const [CourseList, setCourse] = useState([]);
  const options = useMemo(() => countryList().getData(), []);
  const [image, setImage] = useState();
  useEffect(() => {
    relatedCourse();
  }, []);
  const relatedCourse = async () => {
    try {
      let response = await serve.realtedList();
      if (response) {
        const arr = response.data.map((v) => {
          return { value: v.value, label: v.label };
        });
        setCourse(arr);
      }
    } catch (err) {
      throw err;
    }
  };

  const imageApi = async (props, name, e, type, oldimagename, index) => {
    let { file } = e.target.files[0];

    file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function (e) {
      var image = new Image();

      image.src = e.target.result;

      image.onload = function () {
        var height = this.height;
        var width = this.width;

        const imageData = new FormData();
        imageData.append("image", file);
        imageData.append("type", type);
        imageData.append("image_name", oldimagename);

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
              props.setFieldValue(name, res.data.data);
              setImage(res.data.path);
              toast.success("Image uploaded successfully");
            } else if (res.data?.status === "fail") {
              toast.error("image size is too large");
            }
          })
          .catch((err) => {
            throw err;
          });
      };
    };
  };
  return (
    <FieldArray
      name="students"
      render={(arrayHelpers) => (
        <div>
          {arrayHelpers?.form?.values?.students?.map((v, index) => (
            <div className="row" key={index}>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Name <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name={`students.${index}.name`}
                  value={props.values.students?.[index]?.name}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  type="text"
                  placeholder="Enter  name"
                />{" "}
                {props.touched.students?.[index]?.name &&
                props.errors.students?.[index]?.name ? (
                  <div className="formik-errors bg-error">
                    {props.errors.students?.[index]?.name}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Country <span className="text-danger">*</span>
                </label>
                <Select
                  options={options}
                  value={props.values.students?.[index]?.country}
                  name="country"
                  onChange={(e) => {
                    props.setFieldValue(`students.${index}.country`, e);
                  }}
                  placeholder={".....Select Country"}
                />
                {props.touched.students?.[index]?.country &&
                props.errors.students?.[index]?.country ? (
                  <div className="formik-errors bg-error">
                    {props.errors.students?.[index]?.country}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Course <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  onChange={props.handleChange}
                  value={props.values.students?.[index]?.course}
                  name={`students.${index}.course`}
                />
                {props.touched.students?.[index]?.name &&
                props.errors.students?.[index]?.name ? (
                  <div className="formik-errors bg-error">
                    {props.errors.students?.[index]?.name}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-5">
                <label className="form-label">
                  Image <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name={`students.${index}.image`}
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    imageApi(
                      props,
                      `students.${index}.image`,
                      event,
                      "service",
                      props.values.students?.[index]?.image
                    );
                  }}
                  placeholder="Enter slug"
                />
                {props.touched.students?.[index]?.image &&
                props.errors.students?.[index]?.image ? (
                  <div className="formik-errors bg-error">
                    {props.errors.students?.[index]?.image}
                  </div>
                ) : null}
              </div>
              {props.values.students?.[index]?.image && (
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
                    src={imageUrl + props.values.students?.[index]?.image}
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
                  Image Alt Tag <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name={`students.${index}.image_alt_tag`}
                  value={props.values.students?.[index]?.image_alt_tag}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  type="text"
                  placeholder="Enter  image_alt_tag"
                />{" "}
                {props.touched.students?.[index]?.image_alt_tag &&
                props.errors.students?.[index]?.image_alt_tag ? (
                  <div className="formik-errors bg-error">
                    {props.errors.students?.[index]?.image_alt_tag}
                  </div>
                ) : null}
              </div>
              {props.values.students.length > 1 && (
                <div className="col-md-2 open-button">
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => {
                      arrayHelpers.remove(index);
                    }}
                  >
                    -
                  </button>
                </div>
              )}
              <hr />
            </div>
          ))}
          <button
            className="btn btn-primary mb-4"
            type="button"
            onClick={() =>
              arrayHelpers.push({
                title: "",
                link: "",
              })
            }
          >
            +
          </button>
          <ToastContainer autoClose={1000} />
        </div>
      )}
    />
  );
}
