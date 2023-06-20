import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FieldArray } from "formik";
import axios from "axios";

export default function PaymentImage({ props, imageUrl }) {
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
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function (e) {
      var image = new Image();
      image.src = e.target.result;
      image.onload = function () {
        var height = this.height;
        var width = this.width;

        if (height > 302 || width > 178) {
          alert(
            "Height should not exceed from 302 px and width should not exceed from 178 px"
          );
        } else if (height < 302 || width < 178) {
          alert(
            "Height should not less than from 302 px and width should not less than from 178 px"
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
      name="payment_image"
      render={(arrayHelpers) => (
        <div>
          {arrayHelpers?.form?.values?.payment_image &&
            arrayHelpers?.form?.values?.payment_image.map((v, index) => (
              <div className="row" key={index}>
                <div
                  className={
                    props.values.image
                      ? "form-group col-md-5"
                      : "form-group col-md-5"
                  }
                >
                  <label className="form-label">
                    Image <span className="text-danger">size : 178*302</span>
                  </label>
                  <input
                    className="form-control"
                    name={`payment_image.${index}.image`}
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      imageApi(
                        props,
                        `payment_image.${index}.image`,
                        event,
                        "service",
                        props.values.payment_image?.[index]?.image
                      );
                    }}
                    placeholder="Enter slug"
                  />
                  {props.touched.payment_image?.[index]?.image &&
                  props.errors.payment_image?.[index]?.image ? (
                    <div className="formik-errors bg-error">
                      {props.errors.payment_image?.[index]?.image}
                    </div>
                  ) : null}
                </div>
                {props.values.payment_image?.[index]?.image && (
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
                        imageUrl + props.values.payment_image?.[index]?.image
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

                {props.values?.payment_image?.length > 1 && (
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
              </div>
            ))}
          <button
            className="btn btn-primary mb-4"
            type="button"
            onClick={() =>
              arrayHelpers.push({
                image: "",
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
