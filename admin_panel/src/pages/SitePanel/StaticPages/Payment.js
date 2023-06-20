import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import BankDetails from "./BankDetails";

import StaticpageService from "../../../Services/StaticPageService/StaticePageService";
import PaymentImage from "./PaymentImage";

export default function Payment({ pageName, slug }) {
  const [imageUrl, setImageurl] = useState("");
  const staticeService = new StaticpageService();
  const [value, setvalue] = useState({
    image: "",
    image1: "",
    debit: "",
    credit: "",
    online: "",
    note: "",
    bank_details: [
      {
        bank_name: "",
        holder_name: "",
        account_number: "",
        ifsc_code: "",
        branch_address: "",
      },
    ],
    payment_image: [{ image: "" }],
  });

  const [image, setImage] = useState();
  const [image1, setImage1] = useState();
  const onSubmit = (values) => {
    const formData = new FormData();

    formData.set("page_name", values.page_name);
    formData.set("page_slug", values.slug);
    formData.set("description[debit]", values.debit);
    formData.set("description[credit]", values.credit);
    formData.set("description[online]", values.online);
    formData.set("description[note]", values.note);
    formData.set(
      "description[bank_details]",
      JSON.stringify(values.bank_details)
    );
    formData.set(
        "description[payment_image]",
        JSON.stringify(values.payment_image)
      );

    const config = {
      headers: {
        content: "multipart/form-data",
        AUTHTOKEN: window.user?.data?.auth_token,
      },
    };
    axios
      .post(
        process.env.REACT_APP_API_BASEURL + "page/create-page-block",
        formData,
        config
      )
      .then((res) => {
        if (res.data?.status === "success") {
          toast.success("Record update successfully");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        throw err;
      });
  };


 

  useEffect(() => {
     getPageBlockData();
  }, []);

  const getPageBlockData = async () => {
    try {
      let response = await staticeService.getDetails(slug);

      if (response.status === "success") {
        setImageurl(response.data?.page_description?.image_url);

        setvalue({
          page_name: response.data.page_name,
          slug: response.data.page_slug,
          image: response.data?.page_description?.image,
          image1: response.data?.page_description?.image1,
          debit: response.data?.page_description?.debit,
          credit: response.data?.page_description?.credit,
          online: response.data?.page_description?.online,
          note: response.data?.page_description?.note,
          bank_details: JSON.parse(
            response.data?.page_description?.bank_details
          ),
          payment_image:JSON.parse(
            response.data?.page_description?.payment_image
          ),
        });
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <Formik
        initialValues={value}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {(props) => (
          <form className="form theme-form" onSubmit={props.handleSubmit}>
            <div className="row">
              <div className="form-group col-md-12" style={{ display: "none" }}>
                <label className="form-label">
                  Page / Blocks
                  <span className="text-danger">*</span>
                </label>

                <input
                  className="form-control"
                  name="page_name"
                  type="text"
                  placeholder="Enter slug"
                  disabled
                  defaultValue={pageName}
                />
                {props.touched.page_name && props.errors.page_name ? (
                  <div className="formik-errors bg-error">
                    {props.errors.page_name}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-12" style={{ display: "none" }}>
                <label className="form-label">
                  Slug <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="slug"
                  type="text"
                  placeholder="Enter slug"
                  disabled
                  defaultValue={slug}
                />
                {props.touched.slug && props.errors.slug ? (
                  <div className="formik-errors bg-error">
                    {props.errors.slug}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-12">
                <label className="form-label">
                  Debit Card Info <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="debit"
                  value={props.values.debit}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  type="text"
                  placeholder="Enter  debit card info"
                />
                {props.touched.debit && props.errors.debit ? (
                  <div className="formik-errors bg-error">
                    {props.errors.debit}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-12">
                <label className="form-label">
                  Credit Card Info <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="credit"
                  value={props.values.credit}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  type="text"
                  placeholder="Enter  credit card info"
                />
                {props.touched.credit && props.errors.credit ? (
                  <div className="formik-errors bg-error">
                    {props.errors.credit}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-12">
                <label className="form-label">
                  Online Info <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="online"
                  value={props.values.online}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  type="text"
                  placeholder="Enter  online  info"
                />
                {props.touched.online && props.errors.online ? (
                  <div className="formik-errors bg-error">
                    {props.errors.online}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-12">
                <label className="form-label">
                  Important Note <span className="text-danger">*</span>
                </label>
                {/* <Editor
                  className="form-control"
                  name="note"
                  value={props.values.note}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  type="text"
                /> */}
                 <Editor
                  textareaName="content"
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
                  value={props.values.note}
                  onEditorChange={(e) =>
                    props.setFieldValue("note", e)
                  }
                />
                {props.touched.note && props.errors.note ? (
                  <div className="formik-errors bg-error">
                    {props.errors.note}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-12">
                <label className="form-label fs-4 mb-0">Bank Details</label>
                <hr />
              </div>{" "}
              <BankDetails props={props} />
              <PaymentImage props={props} imageUrl={imageUrl}/>
              {/* <div
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
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    thumbImagehandle(e, props, "image");
                  }}
                  placeholder="Enter slug"
                />
                {props.touched.image && props.errors.image ? (
                  <div className="formik-errors bg-error">
                    {props.errors.image}
                  </div>
                ) : null}
              </div>
              {(image || imageUrl + props.values.image) && (
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
                    src={image || imageUrl + props.values.image}
                    alt="image"
                    style={{
                      padding: "0",
                      width: "100%",
                      height: "72%",
                    }}
                  />
                </div>
              )}
              <div
                className={
                  props.values.image1
                    ? "form-group col-md-5"
                    : "form-group col-md-5"
                }
              >
                <label className="form-label">
                  Image1 <span className="text-danger">size : 178*302</span>
                </label>
                <input
                  className="form-control"
                  name="image1"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    thumbImagehandle(e, props, "image1");
                  }}
                  placeholder="Enter slug"
                />
              </div>
              {(image1 || imageUrl + props.values.image1) && (
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
                    src={image1 || imageUrl + props.values.image1}
                    alt="image"
                    style={{
                      padding: "0",
                      width: "100%",
                      height: "72%",
                    }}
                  />
                </div>
              )} */}
            </div>
            <div className="form-group col-md-12 text-end">
              <button className="btn btn-primary me-2" type="submit">
                Submit
              </button>
            </div>
          </form>
        )}
      </Formik>
      <ToastContainer autoClose={1000} />
    </>
  );
}
