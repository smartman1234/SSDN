import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import axios from "axios";
import { Formik, Form, Field, FieldArray } from "formik";
import CountryDropdown from "country-dropdown-with-flags-for-react";
import StaticpageService from "../../../Services/StaticPageService/StaticePageService";

export default function Accommodations({
  props,
  values,
  getDataById,
  setValues,
  imageUrl,
}) {
  const serve = new StaticpageService();
  const [CourseList, setCourse] = useState([]);
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
          
          if (height > 289 || width > 375) {
            alert(
              "Height should not exceed from 289 px and width should not exceed from 375 px"
            );
          } else if (height < 289 || width < 375) {
            alert(
              "Height should not less than from 289 px and width should not less than from 375 px"
            );
          } else {
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
          }
        };
       };
  };
  return (
    <FieldArray
      name="accomodations"
      render={(arrayHelpers) => (
        <div>
          {arrayHelpers?.form?.values?.accomodations?.map((v, index) => (
            <div className="row" key={index}>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Hotel Name <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name={`accomodations.${index}.hotel_name`}
                  value={props.values.accomodations?.[index]?.hotel_name}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  type="text"
                  placeholder="Enter  hotel_name"
                />{" "}
                {props.touched.accomodations?.[index]?.hotel_name &&
                props.errors.accomodations?.[index]?.hotel_name ? (
                  <div className="formik-errors bg-error">
                    {props.errors.accomodations?.[index]?.hotel_name}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Average Review <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name={`accomodations.${index}.avg_review`}
                  value={props.values.accomodations?.[index]?.avg_review}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  type="text"
                  placeholder="Enter  avg_review"
                />{" "}
                {props.touched.accomodations?.[index]?.avg_review &&
                props.errors.accomodations?.[index]?.avg_review ? (
                  <div className="formik-errors bg-error">
                    {props.errors.accomodations?.[index]?.avg_review}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Total Review <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name={`accomodations.${index}.total_review`}
                  value={props.values.accomodations?.[index]?.total_review}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  type="text"
                  placeholder="Enter  total_review"
                />{" "}
                {props.touched.accomodations?.[index]?.total_review &&
                props.errors.accomodations?.[index]?.total_review ? (
                  <div className="formik-errors bg-error">
                    {props.errors.accomodations?.[index]?.total_review}
                  </div>
                ) : null}
              </div>
              <div className="col-lg-6">
                {" "}
                <label className="form-label">
                  Contact <span className="text-danger">*</span>
                </label>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name={`accomodations.${index}.mobile`}
                    value={props.values.accomodations?.[index]?.mobile}
                    onChange={props.handleChange}
                    placeholder="Phone"
                  />
                  {props.touched.mobile && props.errors.mobile ? (
                    <div className="formik-errors bg-error">
                      {props.errors.mobile}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="col-lg-6">
                {" "}
                <label className="form-label">
                  Location <span className="text-danger">*</span>
                </label>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name={`accomodations.${index}.location`}
                    value={props.values.accomodations?.[index]?.location}
                    onChange={props.handleChange}
                    placeholder="Phone"
                  />
                  {props.touched.location && props.errors.location ? (
                    <div className="formik-errors bg-error">
                      {props.errors.location}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="form-group col-md-5">
                <label className="form-label">
                  Image <span className="text-danger">375*289</span>
                </label>
                <input
                  className="form-control"
                  name={`accomodations.${index}.image`}
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    imageApi(
                        props,
                        `accomodations.${index}.image`,
                        event,
                        "service",props.values.accomodations?.[index]?.image
                    );
                }}
                  placeholder="Enter slug"
                />
                {props.touched.accomodations?.[index]?.image &&
                props.errors.accomodations?.[index]?.image ? (
                  <div className="formik-errors bg-error">
                    {props.errors.accomodations?.[index]?.image}
                  </div>
                ) : null}
              </div>
              {(
                props.values.accomodations?.[index]?.image) && (
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
                    src={
                     
                      imageUrl + props.values.accomodations?.[index]?.image
                    }
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
                  name={`accomodations.${index}.image_alt_tag`}
                  value={props.values.accomodations?.[index]?.image_alt_tag}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  type="text"
                  placeholder="Enter  image_alt_tag"
                />{" "}
                {props.touched.accomodations?.[index]?.image_alt_tag &&
                props.errors.accomodations?.[index]?.image_alt_tag ? (
                  <div className="formik-errors bg-error">
                    {props.errors.accomodations?.[index]?.image_alt_tag}
                  </div>
                ) : null}
              </div>
              {props.values.accomodations.length > 1 && (
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
