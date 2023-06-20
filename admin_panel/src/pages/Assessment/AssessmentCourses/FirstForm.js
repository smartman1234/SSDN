import React, { useEffect, useState, useRef } from "react";
import { FieldArray, Formik } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AssessmentService from "../../../Services/AssessmentService";
import { useParams } from "react-router";

function FirstForm({ initialValues, onSubmit, basicDetail }) {
  const param = useParams();
  const assessmentServe = new AssessmentService();
  const [parentList, setParentList] = useState([{}]);
  const [image, setImage] = useState("");

  const ValidateSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    slug: Yup.string().required("Required"),
    categories_id: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    image: Yup.string().required("Required"),
    image_alt_tag: Yup.string().required("Required"),
    exam_instruction: Yup.string().required("Required"),
  });
  useEffect(() => {
    ParentListApi();
  }, []);

  const ParentListApi = async () => {
    let obj = {
      parent_id: -1,
    };
    try {
      let response = await assessmentServe.parentList(obj);
      if (response) {
        setParentList(response.data);
      }
    } catch (err) {
      throw err;
    }
  };

  const imageApi = async (props, name, file, type) => {
    const imageData = new FormData();
    imageData.append("image", file);
    imageData.append("type", type);

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

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize={true}
      validationSchema={ValidateSchema}
    >
      {(props) => (
        <form className="" onSubmit={props.handleSubmit}>
          {basicDetail && (
            <>
              <div style={basicDetail && { display: "block" }}>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label htmlFor="name">
                      Course Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Enter course name"
                      onChange={(event) => {
                        props.setFieldValue("name", event.target.value);
                        if (!param.id) {
                          props.setFieldValue("slug", event.target.value);
                        }
                      }}
                      onBlur={props.handleBlur}
                      value={props.values.name}
                    />
                    {props.touched.name && props.errors.name ? (
                      <div className="formik-errors bg-error">
                        {props.errors.name}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="lname">
                      Slug <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      id="lname"
                      type="text"
                      name="slug"
                      placeholder="slug"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.slug
                        .replaceAll(" ", "-")
                        .toLowerCase()}
                    />
                    {props.touched.slug && props.errors.slug ? (
                      <div className="formik-errors bg-error">
                        {props.errors.slug}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="contact">
                      Category <span className="text-danger">*</span>
                    </label>
                    <select
                      name="categories_id"
                      onChange={(e) => {
                        props.setFieldValue("categories_id", e.target.value);
                      }}
                      className="form-select digits"
                      value={props.values.categories_id}
                    >
                      <option value="0">Select category </option>
                      {parentList &&
                        parentList.map((v, index) => (
                          <option key={index} value={v.id}>
                            {v.name}
                          </option>
                        ))}
                    </select>
                    {props.touched.categories_id &&
                    props.errors.categories_id ? (
                      <div className="formik-errors bg-error">
                        {props.errors.categories_id}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="form-group col-md-10 p-0">
                        <label htmlFor="contact">
                          Image <span className="text-danger">*</span>
                        </label>

                        <input
                          className="form-control digits"
                          id="contact"
                          type="file"
                          accept="image/*"
                          name="image"
                          onChange={(event) => {
                            imageApi(
                              props,
                              "image",
                              event.target.files[0],
                              "assessment"
                            );
                          }}
                        />
                        {props.touched.image && props.errors.image ? (
                          <div className="formik-errors bg-error">
                            {props.errors.image}
                          </div>
                        ) : null}
                      </div>
                      <div
                        className="input-group-append col-md-2"
                        style={{
                          top: "25px",
                          paddingLeft: "0px",
                          height: "49px",
                          width: "55px",
                        }}
                      >
                        {(initialValues?.image || image) && (
                          <img
                            src={image || initialValues?.image}
                            alt="image"
                            style={{
                              padding: "0",
                              width: "100%",
                              height: "72%",
                            }}
                          />
                        )}
                      </div>

                      <div className="form-group col-md-12 p-0">
                        <label htmlFor="contact">
                          Image Alt Tag <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control digits"
                          id="contact"
                          type="text"
                          name="image_alt_tag"
                          placeholder="Alt tag for Icon"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.image_alt_tag}
                        />
                        {props.touched.image_alt_tag &&
                        props.errors.image_alt_tag ? (
                          <div className="formik-errors bg-error">
                            {props.errors.image_alt_tag}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="contact">
                      Description <span className="text-danger">*</span>
                    </label>
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
                      value={props.values.description}
                      onEditorChange={(e) =>
                        props.handleChange({
                          target: { name: "description", value: e },
                        })
                      }
                    />
                    {props.touched.description && props.errors.description ? (
                      <div className="formik-errors bg-error">
                        {props.errors.description}
                      </div>
                    ) : null}
                  </div>

                  <div className="form-group col-md-6">
                    <label htmlFor="contact">
                      Exam Instruction <span className="text-danger">*</span>
                    </label>
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
                      value={props.values.exam_instruction}
                      onEditorChange={(e) =>
                        props.handleChange({
                          target: { name: "exam_instruction", value: e },
                        })
                      }
                    />
                    {props.touched.exam_instruction &&
                    props.errors.exam_instruction ? (
                      <div className="formik-errors bg-error">
                        {props.errors.exam_instruction}
                      </div>
                    ) : null}
                  </div>

                  <div className="col-md-6">
                    <FieldArray
                      name="highlights"
                      render={(arrayHelpers) => (
                        <>
                          {arrayHelpers.form?.values?.highlights?.map(
                            (highlight, index) => (
                              <div className="row" key={index}>
                                <div className="form-group col-md-10 p-0">
                                  <label htmlFor="name">Highlight</label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    name={`highlights.${index}`}
                                    placeholder="Enter highlight"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.highlights?.[index]}
                                  />
                               
                                  {props.touched.highlights &&
                                  props.errors.highlights ? (
                                    <div className="formik-errors bg-error">
                                      {props.errors.highlights}
                                    </div>
                                  ) : null}
                                </div>
                                {props.values.highlights.length > 1 && (
                                  <div
                                    className="form-group col-md-2"
                                    style={{ marginTop: "26px" }}
                                  >
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      <i className="fa-solid fa-minus "></i>
                                    </button>
                                  </div>
                                )}
                              </div>
                            )
                          )}
                          <div className="form-group col-md-2">
                            <button
                              className="btn btn-primary"
                              type="button"
                              onClick={() => arrayHelpers.push("")}
                            >
                              <i className="fa-solid fa-plus "></i>
                            </button>
                          </div>
                        </>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="text-end btn-mb">
                <button
                  className="btn btn-primary"
                  type="submit"
                  style={basicDetail && { display: "inline" }}
                >
                  Next <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            </>
          )}
        </form>
      )}
    </Formik>
  );
}

export default FirstForm;
