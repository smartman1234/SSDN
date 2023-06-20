import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import StaticpageService from "../../../Services/StaticPageService/StaticePageService";

export default function SpecialOffer({ pageName, slug }) {
  const [imageUrl, setImageurl] = useState("");
  const staticeService = new StaticpageService();
  const [notFound, setNotFound] = useState({
    page_name: "",
    page_slug: "",
    block_description: "",
    status: "",
    end_time: "",
  });
  const [image, setImage] = useState();

  const onSubmit = (values) => {
    const formData = new FormData();

    formData.set("page_name", values.page_name);
    formData.set("page_slug", values.slug);
    formData.set("block_description", values.block_description);
    formData.set("description[is_active]", values.status);
    formData.set("description[end_time]", values.end_time);
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

  const ValidateSchema = Yup.object().shape({
    block_description: Yup.string().required("Required"),
  });

  useEffect(() => {
    getPageBlockData();
  }, []);

  const getPageBlockData = async () => {
    try {
      let response = await staticeService.getDetails(slug);

      if (response.status === "success") {
        setImageurl(response.data?.page_description?.image_url);

        setNotFound({
          page_name: response.data.page_name,
          slug: response.data.page_slug,
          block_description: response.data.block_description,
          status: response.data?.page_description?.is_active,
          end_time: response.data?.page_description?.end_time,
        });
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <Formik
        initialValues={notFound}
        onSubmit={onSubmit}
        enableReinitialize={true}
        validationSchema={ValidateSchema}
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

              <div className="form-group col-md-6">
                <label className="form-label">Block Description</label>
                <span className="text-danger">*</span>
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
                  value={props.values.block_description}
                  onEditorChange={(e) =>
                    props.setFieldValue("block_description", e)
                  }
                />
                {props.touched.block_description &&
                props.errors.block_description ? (
                  <div className="formik-errors bg-error">
                    {props.errors.block_description}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                {" "}
                <div className="form-group col-md-6">
                  <label className="form-label">
                    Status <span className="text-danger">*</span>
                  </label>
                  <div className="col">
                    <div className="form-group m-t-15 m-checkbox-inline mb-0 custom-radio-ml">
                      <div className="radio radio-primary">
                        <input
                          id="active"
                          type="radio"
                          className="form-label"
                          name="status"
                          value={1}
                          checked={props.values.status == "1"}
                          onChange={props.handleChange}
                        />
                        <label className="form-label" htmlFor="active">
                          Active
                        </label>
                      </div>
                      <div className="radio radio-primary">
                        <input
                          id="inactive"
                          type="radio"
                          name="status"
                          onChange={props.handleChange}
                          checked={props.values.status == "0"}
                          value={0}
                        />
                        <label className="form-label" htmlFor="inactive">
                          InActive
                        </label>
                      </div>
                    </div>
                  </div>
                  {props.touched.status && props.errors.status ? (
                    <div className="formik-errors bg-error">
                      {props.errors.status}
                    </div>
                  ) : null}
                </div>
                <div className="form-group col-md-12">
                  <label className="form-label">
                    End Date <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    name="end_time"
                    type="date"
                    onChange={props.handleChange}
                    value={props.values.end_time}
                  />
                  {props.touched.end_time && props.errors.end_time ? (
                    <div className="formik-errors bg-error">
                      {props.errors.end_time}
                    </div>
                  ) : null}
                </div>
              </div>
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
