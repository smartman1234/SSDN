import React, { useState, useEffect, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import axios from "axios";
import { FieldArray } from "formik";
import countryList from "react-select-country-list";
import StaticpageService from "../../../Services/StaticPageService/StaticePageService";

export default function Country({ props, imageUrl }) {
  const serve = new StaticpageService();
  const options = useMemo(() => countryList().getData(), []);
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
  const imageApi = async (props, name, e, type, oldimagename, index) => {
    
    let { file } = e.target.files[0];

    file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    if (name === `country_visa.${index}.flag`) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = function (e) {
        var image = new Image();
        image.src = e.target.result;
        image.onload = function () {
          var height = this.height;
          var width = this.width;
          
          if (height > 22 || width > 22) {
            alert(
              "Height should not exceed from 22px and width should not exceed from 22 px"
            );
          } else if (height < 22 || width < 22) {
            alert(
              "Height should not less than from 22 px and width should not less than from 22 px"
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
    }
  };
  return (
    <FieldArray
      name="country_visa"
      render={(arrayHelpers) => (
        <div>
          {arrayHelpers?.form?.values?.country_visa.map((v, index) => (
            <div className="row" key={index}>
              <div className="form-group col-md-5">
                <label className="form-label">
                  Country <span className="text-danger">*</span>
                </label>
               
                <Select
                  options={options}
                  value={props.values.country_visa?.[index]?.country}
                  name={`country_visa.${index}.country`}
                  onChange={(e) => {
                    props.setFieldValue(`country_visa.${index}.country`, e);
                  }}
                  placeholder={".....Select Country"}
                />
                {props.touched.country_visa?.[index]?.country &&
                props.errors.country_visa?.[index]?.country ? (
                  <div className="formik-errors bg-error">
                    {props.errors.country_visa?.[index]?.country}
                  </div>
                ) : null}
              </div>

              <div className="form-group col-md-5">
                <label className="form-label">
                  Flag <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name={`country_visa.${index}.flag`}
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    imageApi(
                      props,
                      `country_visa.${index}.flag`,
                      event,
                      "service",
                      props.values.country_visa?.[index]?.flag,
                      index
                    );
                  }}
                  placeholder="Enter slug"
                />
                {props.touched.country_visa?.[index]?.flag &&
                props.errors.country_visa?.[index]?.flag ? (
                  <div className="formik-errors bg-error">
                    {props.errors.country_visa?.[index]?.flag}
                  </div>
                ) : null}
              </div>
              {(
                props.values.country_visa?.[index]?.flag) ? (
                <div
                  className="input-group-append col-md-1"
                  style={{
                    top: "28px",
                    paddingLeft: "0px",
                    height: "50px",
                    width: "100px",
                  }}
                >
                  <img
                    src={
                     
                      imageUrl + props.values.country_visa?.[index]?.flag
                    }
                    alt="image"
                    style={{
                      padding: "0",
                      width: "100%",
                      height: "72%",
                    }}
                  />
                </div>
              ):""}

              {props.values.country_visa.length > 1 && (
                <div className="col-md-1 open-button">
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
