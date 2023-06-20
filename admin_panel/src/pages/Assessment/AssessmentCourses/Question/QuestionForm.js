import React, { useState, useContext, useEffect, useRef } from "react";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FieldArray, Formik } from "formik";
import Select from "react-select";
import { Context } from "../../../../container/Context";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AssessmentCourseService from "../../../../Services/AssessmentCourseService";
import AssessmentService from "../../../../Services/AssessmentService";
import SubQuestion from "../SubQuestion";
import Breadcrumb from "../../../BreadCrumb/Breadcrumb";
import { Editor } from "@tinymce/tinymce-react";
import QuestionService from "../../../../Services/QuestionService";
import Utils from "../../../../utils/Utils";

const convert = (num) => {
  if (num < 1) {
    return "";
  }
  if (num >= 40) {
    return "XL" + convert(num - 40);
  }
  if (num >= 10) {
    return "X" + convert(num - 10);
  }
  if (num >= 9) {
    return "IX" + convert(num - 9);
  }
  if (num >= 5) {
    return "V" + convert(num - 5);
  }
  if (num >= 4) {
    return "IV" + convert(num - 4);
  }
  if (num >= 1) {
    return "I" + convert(num - 1);
  }
};
const imageApi = async (image, params, props, type, flag = 0) => {
  try {
    let images = [];
    images.push(image);
    const imageData = new FormData();
    imageData.append("image", image);
    imageData.append("type", type);

    const config = {
      headers: {
        content: "multipart/form-data",
        AUTHTOKEN: window.user?.data?.auth_token,
      },
    };
    let loading = false;
    const res = await axios.post(
      process.env.REACT_APP_API_BASEURL + "upload-image",
      imageData,
      config
    );
    if (res.data?.status === "success") {
      props?.setFieldValue(params, res.data.data);
      toast.success("Image uploaded successfully");
      if (flag === 1) {
        return res.data.path;
      }
    } else if (res.data?.status === "fail") {
      toast.error("image size is too large");
    }
  } catch (error) {
    toast.error("image snot uploaded");
  }
};

const AddOption = ({
  name,
  question,
  questionIndex,
  props,
  editorRef,
  letter,
  setCheckboxAns,
  checkboxAns,
}) => {
  return (
    <FieldArray
      name={name}
      render={(arrayHelpers) => (
        <div>
          {question?.options?.map((option, index) => {
            return (
              <div className="row align-items-center" key={index}>
                <div className="form-group col-md-6">
                  <label htmlFor="contact">
                    Options {Utils.alphabet(index)}
                    <span className="text-danger">*</span>
                  </label>

                  <Editor
                    textareaName={`${name}.${index}.answer`}
                    apiKey="j1g23ad6n3ra8f5lbnbe3nldrui85ygcv9zwc1ao74848kmj"
                    onInit={(evt, editor) => {
                      editorRef.current = editor;
                    }}
                    init={{
                      image_title: true,
                      automatic_uploads: true,
                      file_browser_callback_types: "file image media",
                      height: "200px",
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
                      file_picker_callback: function (cb, value, meta) {
                        var input = document.createElement("input");
                        input.setAttribute("type", "file");
                        input.setAttribute("accept", "image/*");
                        input.onchange = async function () {
                          var file = this.files[0];
                          const imagePathApi = await imageApi(
                            file,
                            "image",
                            props,
                            "question_answer",
                            1
                          );

                          cb(imagePathApi, {
                            text: "My text",
                          });
                        };
                        input.click();
                      },
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                    value={
                      props.values.questions[questionIndex].options[index]
                        .answer
                    }
                    onEditorChange={(e) => {
                      props.handleChange({
                        target: {
                          name: `${name}.${index}.answer`,
                          value: e,
                        },
                      });
                      props.setFieldValue(
                        `${name}.${index}.option_id`,
                        Utils.alphabet(index)
                      );
                    }}
                  />
                  {props.touched.questions?.[questionIndex]?.options?.[index]
                    ?.answer &&
                  props.errors.questions?.[questionIndex]?.options?.[index]
                    ?.answer ? (
                    <div className="formik-errors bg-error">
                      {
                        props.errors.questions?.[questionIndex]?.options?.[
                          index
                        ]?.answer
                      }
                    </div>
                  ) : null}
                </div>
                {(props.values.questions[questionIndex].type === "radio" ||
                  props.values.questions[questionIndex].type ===
                    "drop_down") && (
                  <div className="form-group col-md-3">
                    
                    <input
                      type="radio"
                      name={`questions.${questionIndex}.answer_ids`}
                      onChange={(e) => {
                        props.handleChange({
                          target: {
                            name: `questions.${questionIndex}.answer_ids`,
                            value: [e.target.value],
                          },
                        });
                      }}
                      value={[Utils.alphabet(index)]}
                      className="me-2"
                    />
                    <input
                      type="text"
                      defaultValue={Utils.alphabet(index)}
                      name={`${name}.${index}.option_id`}
                      style={{ display: "none" }}
                    />
                    <label htmlFor={`questions.${questionIndex}.answer_ids`}>
                      Answer {index + 1} <span className="text-danger">*</span>
                    </label>
                    {props.touched.questions?.[questionIndex]?.answer_ids &&
                    props.errors.questions?.[questionIndex]?.answer_ids ? (
                      <div className="formik-errors bg-error">
                        {props.errors.questions?.[questionIndex]?.answer_ids}
                      </div>
                    ) : null}
                  </div>
                )}

                {props.values.questions[questionIndex].type === "checkbox" && (
                  <div className="form-group col-md-3">
                    
                    <input
                      type="checkbox"
                      name={`questions.${questionIndex}.answer_ids.${index}`}
                      className="me-2"
                      onChange={(e) => {
                        const { value, checked } = e.target;
                       
                        if (checked) {
                          props.setFieldValue(
                            `questions.${questionIndex}.answer_ids`,
                            [
                              ...props.values.questions[questionIndex]
                                .answer_ids,
                              e.target.value,
                            ]
                          );
                        
                        } else {
                          props.setFieldValue(
                            `questions.${questionIndex}.answer_ids`,
                            props.values.questions?.[
                              questionIndex
                            ]?.answer_ids.filter((e) => e !== value)
                          );
                        
                        }
                      }}
                      value={Utils.alphabet(index)}
                    />
                    <label
                      htmlFor={`questions.${questionIndex}.answer_ids.${index}`}
                    >
                      Answer {index + 1} <span className="text-danger">*</span>
                    </label>
                    {props.touched.questions?.[questionIndex]?.answer_ids &&
                    props.errors.questions?.[questionIndex]?.answer_ids ? (
                      <div className="formik-errors bg-error">
                        {props.errors.questions?.[questionIndex]?.answer_ids}
                      </div>
                    ) : null}
                  </div>
                )}
                {props.values.questions[questionIndex].type ===
                  "drag_drop" && (
                  <div className="form-group col-md-3">
                    
                    <input
                      type="checkbox"
                      name={`questions.${questionIndex}.answer_ids.${index}`}
                      className="me-2"
                      onChange={(e) => {
                        const { value, checked } = e.target;
                       
                        if (checked) {
                          props.setFieldValue(
                            `questions.${questionIndex}.answer_ids`,
                            [
                              ...props.values.questions[questionIndex]
                                .answer_ids,
                              e.target.value,
                            ]
                          );
                        
                        } else {
                          props.setFieldValue(
                            `questions.${questionIndex}.answer_ids`,
                            props.values.questions?.[
                              questionIndex
                            ]?.answer_ids.filter((e) => e !== value)
                          );
                        
                        }
                      }}
                      value={Utils.alphabet(index)}
                    />
                    {props.touched.questions?.[questionIndex]?.answer_ids &&
                    props.errors.questions?.[questionIndex]?.answer_ids ? (
                      <div className="formik-errors bg-error">
                        {props.errors.questions?.[questionIndex]?.answer_ids}
                      </div>
                    ) : null}
                  </div>
                )}
                {question?.options?.length > 1 && (
                  <div className="form-group col-md-1">
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={() => {
                        arrayHelpers.remove(index);
                      }}
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
          <div className="form-group col-md-1" style={{ marginTop: "26px" }}>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => {
                arrayHelpers.push({ answer: "", option_id: "" });
              }}
            >
              <span>
                <i className="fa-solid fa-plus"></i>
              </span>
            </button>
          </div>
          {props.values.questions[questionIndex].type ===
            "drag_drop" && (
            <>
              
              <label htmlFor="contact">Anwer Series</label>
              <p className="border border-dark p-2">
                {props.values.questions?.[questionIndex]?.answer_ids.join(",")}
              </p>
            </>
          )}
        </div>
      )}
    />
  );
};
function QuestionForm() {
  const navigate = useNavigate();
  const params = useParams();
  const [images, setImages] = useState("");
  const [checkboxAns, setCheckboxAns] = useState([]);
  const editorRef = useRef(null);

  const [eventValues, setEventValues] = useState({
    add_questions: "",
    question_file: "",
    questions: [
      {
        question: "",
        type: "",
        answer_ids: [],
        options: [{ answer: "", option_id: "" }],
        sub_question: [
          {
            question: "",
            type: "",
            answer_ids: [],
            options: [{ answer: "", option_id: "" }],
          },
        ],
      },
    ],
  });
  const EventSchema = Yup.object().shape({
    add_questions: Yup.string().required("Required"),
    question_file: Yup.mixed()
      .when("add_questions", {
        is: (add_questions) => add_questions && add_questions === "file",
        then: Yup.mixed().required("You need to provide a csv file"),
      })
      .nullable(),

    questions: Yup.array().when("add_questions", {
      is: (add_questions) => add_questions && add_questions === "manual",
      then: Yup.array(
        Yup.object().shape({
          question: Yup.string().required("Required"),
          type: Yup.string().required("Please select type "),
          answer_ids: Yup.array().when("type", {
            is: (type) =>
              type === "radio" || type === "checkbox" || type === "drop_down"||type==="drag_drop",
            then: Yup.array().min(1, "Required").required("Required"),
          }),
          options: Yup.array().when("type", {
            is: (type) =>
              type === "radio" ||
              type === "checkbox" ||
              type === "drop_down" ||type==="drag_drop"||
              type === "drag_drop_group",
            then: Yup.array(
              Yup.object().shape({
                answer: Yup.string().required("Required"),
              })
            ),
          }),
          sub_question: Yup.array().when("type", {
            is: (type) =>
              type === "drag_drop_group" || type === "group_question",
            then: Yup.array(
              Yup.object().shape({
                question: Yup.string().required("Required"),
                answer_ids: Yup.array().min(1, "Required").required("Required"),
                type: Yup.string().required("Required"),
                options: Yup.array().when("type", {
                  is: (type) =>
                    type === "radio" ||
                    type === "checkbox" ||
                    type === "drop_down",
                  then: Yup.array(
                    Yup.object().shape({
                      answer: Yup.string().required("Required"),
                    })
                  ),
                }),
              })
            ),
          }),
        })
      ),
    }),
  });


  const EventFormHandle = async (values, e) => {
    const formData = new FormData();
    if (values.id) {
      formData.set("id", values.id);
    }
    formData.set("assessment_id", params.id);
    formData.set("add_questions", values.add_questions);

    if (values.add_questions === "manual") {
      formData.append("questions", JSON.stringify(values.questions));
    }
    if (values.add_questions === "file") {
      formData.set("question_file", values.question_file);
    }

    const config = {
      headers: {
        content: "multipart/form-data",
        AUTHTOKEN: window.user?.data?.auth_token,
      },
    };

    axios
      .post(
        process.env.REACT_APP_API_BASEURL + "assessment-question-create",
        formData,
        config
      )
      .then((res) => {
        if (res.data?.status === "success") {
          toast.success("Question created successfully");
          setTimeout(() => {
            navigate(`/question-list/${params.id}`);
          }, 1000);
        } else if (res.data?.status === "fail") {
          toast.error("You have missed field");
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <div className="page-body">
      <Breadcrumb heading="Add Question" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <Formik
                  initialValues={eventValues}
                  onSubmit={EventFormHandle}
                  enableReinitialize={true}
                  validationSchema={EventSchema}
                >
                  {(props) => (
                    <form className="" onSubmit={props.handleSubmit}>
                      <>
                        <div className="tab" style={{ display: "block" }}>
                          <div className="row">
                            <div className="form-group col-md-6">
                              <label htmlFor="contact">
                                Select Question Type
                                <span className="text-danger">*</span>
                              </label>
                              <div className="col">
                                <div className="form-group m-t-15 m-checkbox-inline mb-0 custom-radio-ml">
                                  <div className="radio radio-primary">
                                    <input
                                      id="manual1"
                                      type="radio"
                                      name="add_questions"
                                      checked={
                                        props.values.add_questions === "manual"
                                      }
                                      onChange={props.handleChange}
                                      value="manual"
                                    />
                                    <label className="mb-0" htmlFor="manual1">
                                      Manual
                                    </label>
                                  </div>

                                  <div className="radio radio-primary">
                                    <input
                                      id="file"
                                      type="radio"
                                      name="add_questions"
                                      checked={
                                        props.values.add_questions === "file"
                                      }
                                      onChange={props.handleChange}
                                      value="file"
                                    />
                                    <label className="mb-0" htmlFor="file">
                                      File
                                    </label>
                                  </div>
                                  {props.touched.add_questions &&
                                  props.errors.add_questions ? (
                                    <div className="formik-errors bg-error">
                                      {props.errors.add_questions}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>

                            {props.values.add_questions === "manual" && (
                              <div className="row manual">
                                <FieldArray
                                  name="questions"
                                  render={(arrayHelpers) => (
                                    <div>
                                      {arrayHelpers?.form?.values?.questions?.map(
                                        (question, index) => (
                                          <div
                                            className="col-md-12 p-0"
                                            key={index}
                                          >
                                            <div className="row">
                                              <div className="form-group col-md-4">
                                                <label htmlFor="contact">
                                                  Exam Question {index + 1} Type
                                                  <span className="text-danger">
                                                    *
                                                  </span>
                                                </label>
                                                <select
                                                  required
                                                  name={`questions.${index}.type`}
                                                  value={
                                                    props.values.questions[
                                                      index
                                                    ].type
                                                  }
                                                  onChange={(e) => {
                                                    props.setFieldValue(
                                                      `questions.${index}.type`,

                                                      e.target.value
                                                    );
                                                  }}
                                                  className="form-select digits"
                                                >
                                                  <option
                                                    value=""
                                                    selected={false}
                                                    
                                                  >
                                                    Select question type
                                                  </option>
                                                  <option value="radio">
                                                    Radio
                                                  </option>
                                                  <option value="checkbox">
                                                    Checkbox
                                                  </option>
                                                  <option value="drop_down">
                                                    Dropdown
                                                  </option>
                                                  <option value="drag_drop">
                                                    Single Drag & Drop
                                                  </option>
                                                  <option value="drag_drop_group">
                                                    Multiple Drag & Drop
                                                  </option>
                                                  <option value="group_question">
                                                    group_question
                                                  </option>
                                                </select>
                                                {props.touched.questions?.[
                                                  index
                                                ]?.type &&
                                                props.errors.questions?.[index]
                                                  ?.type ? (
                                                  <div className="formik-errors bg-error">
                                                    {
                                                      props.errors.questions?.[
                                                        index
                                                      ]?.type
                                                    }
                                                  </div>
                                                ) : null}
                                              </div>

                                              {(props.values.questions[index]
                                                .type === "radio" ||
                                                props.values.questions[index]
                                                  .type === "checkbox" ||
                                                props.values.questions[index]
                                                  .type === "drop_down" ||
                                                props.values.questions[index]
                                                  .type ===
                                                  "drag_drop") && (
                                                <div className="col-md-12">
                                                  <div className="row">
                                                    <div className="form-group col-md-12">
                                                      <label htmlFor="contact">
                                                        Question {index + 1}
                                                        <span className="text-danger">
                                                          *
                                                        </span>
                                                      </label>
                                                      <Editor
                                                        apiKey="j1g23ad6n3ra8f5lbnbe3nldrui85ygcv9zwc1ao74848kmj"
                                                        onInit={(
                                                          evt,
                                                          editor
                                                        ) => {
                                                          editorRef.current =
                                                            editor;
                                                        }}
                                                        init={{
                                                          image_title: true,
                                                          automatic_uploads: true,
                                                          file_browser_callback_types:
                                                            "file image media",
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
                                                          file_picker_callback:
                                                            function (
                                                              cb,
                                                              value,
                                                              meta
                                                            ) {
                                                              var input =
                                                                document.createElement(
                                                                  "input"
                                                                );
                                                              input.setAttribute(
                                                                "type",
                                                                "file"
                                                              );
                                                              input.setAttribute(
                                                                "accept",
                                                                "image/*"
                                                              );

                                                              input.onchange =
                                                                async function () {
                                                                  var file =
                                                                    this
                                                                      .files[0];

                                                                  const imagePathApi =
                                                                    await imageApi(
                                                                      file,
                                                                      "image",
                                                                      props,
                                                                      "question_answer",
                                                                      1
                                                                    );

                                                                  cb(
                                                                    imagePathApi,
                                                                    {
                                                                      text: "My text",
                                                                    }
                                                                  );
                                                                };
                                                              input.click();
                                                            },
                                                          content_style:
                                                            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                                        }}
                                                        value={
                                                          props.values
                                                            .questions[index]
                                                            .question
                                                        }
                                                        onEditorChange={(e) =>
                                                          props.handleChange({
                                                            target: {
                                                              name: `questions.${index}.question`,
                                                              value: e,
                                                            },
                                                          })
                                                        }
                                                      />
                                                      {props.touched
                                                        .questions?.[index]
                                                        ?.type &&
                                                      props.errors.questions?.[
                                                        index
                                                      ]?.question ? (
                                                        <div className="formik-errors bg-error">
                                                          {
                                                            props.errors
                                                              .questions?.[
                                                              index
                                                            ]?.question
                                                          }
                                                        </div>
                                                      ) : null}
                                                    </div>
                                                  </div>
                                                  <AddOption
                                                    name={`questions.${index}.options`}
                                                    question={question}
                                                    questionIndex={index}
                                                    props={props}
                                                    editorRef={editorRef}
                                                    checkboxAns={checkboxAns}
                                                    setCheckboxAns={
                                                      setCheckboxAns
                                                    }
                                                  />
                                                </div>
                                              )}
                                              {props.values.questions[index]
                                                .type ===
                                                "drag_drop_group" && (
                                                <div className="card">
                                                  <div className="card-body">
                                                    <div className="col-md-12">
                                                      <div className="row">
                                                        <div className="form-group col-md-12">
                                                          <label htmlFor="contact">
                                                            Question {index + 1}
                                                            <span className="text-danger">
                                                              *
                                                            </span>
                                                          </label>
                                                          <Editor
                                                            textareaName="content"
                                                            apiKey="j1g23ad6n3ra8f5lbnbe3nldrui85ygcv9zwc1ao74848kmj"
                                                            onInit={(
                                                              evt,
                                                              editor
                                                            ) => {
                                                              editorRef.current =
                                                                editor;
                                                            }}
                                                            init={{
                                                              image_title: true,
                                                              automatic_uploads: true,
                                                              file_browser_callback_types:
                                                                "file image media",
                                                              height: "200px",
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
                                                              file_picker_callback:
                                                                function (
                                                                  cb,
                                                                  value,
                                                                  meta
                                                                ) {
                                                                  var input =
                                                                    document.createElement(
                                                                      "input"
                                                                    );
                                                                  input.setAttribute(
                                                                    "type",
                                                                    "file"
                                                                  );
                                                                  input.setAttribute(
                                                                    "accept",
                                                                    "image/*"
                                                                  );
                                                                  input.onchange =
                                                                    async function () {
                                                                      var file =
                                                                        this
                                                                          .files[0];

                                                                      const imagePathApi =
                                                                        await imageApi(
                                                                          file,
                                                                          "image",
                                                                          props,
                                                                          "question_answer",
                                                                          1
                                                                        );

                                                                      cb(
                                                                        imagePathApi,
                                                                        {
                                                                          text: "My text",
                                                                        }
                                                                      );
                                                                    };
                                                                  input.click();
                                                                },
                                                              content_style:
                                                                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                                            }}
                                                            onEditorChange={(
                                                              e
                                                            ) =>
                                                              props.handleChange(
                                                                {
                                                                  target: {
                                                                    name: `questions.${index}.question`,
                                                                    value: e,
                                                                  },
                                                                }
                                                              )
                                                            }
                                                          />
                                                          {props.touched
                                                            .questions?.[index]
                                                            ?.question &&
                                                          props.errors
                                                            .questions?.[index]
                                                            ?.question ? (
                                                            <div className="formik-errors bg-error">
                                                              {
                                                                props.errors
                                                                  .questions?.[
                                                                  index
                                                                ]?.question
                                                              }
                                                            </div>
                                                          ) : null}
                                                        </div>
                                                      </div>

                                                      <AddOption
                                                        name={`questions.${index}.options`}
                                                        question={question}
                                                        questionIndex={index}
                                                        props={props}
                                                        editorRef={editorRef}
                                                      />
                                                      <SubQuestion
                                                        props={props}
                                                        index={index}
                                                        name={`questions.${index}.sub_question`}
                                                        answer_id={`questions.${index}`}
                                                        imageApi={imageApi}
                                                        images={images}
                                                        question={question}
                                                        editorRef={editorRef}
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                              )}
                                              {props.values.questions[index]
                                                .type === "group_question" && (
                                                <div className="">
                                                  <div className="col-xl-12">
                                                    <div className="card">
                                                      <div className="card-body">
                                                        <label>
                                                          Paragraph Question
                                                          <span className="text-danger">
                                                            *
                                                          </span>
                                                        </label>
                                                        <div>
                                                          <Editor
                                                            textareaName="content"
                                                            apiKey="j1g23ad6n3ra8f5lbnbe3nldrui85ygcv9zwc1ao74848kmj"
                                                            onInit={(
                                                              evt,
                                                              editor
                                                            ) => {
                                                              editorRef.current =
                                                                editor;
                                                            }}
                                                            init={{
                                                              image_title: true,
                                                              automatic_uploads: true,
                                                              file_browser_callback_types:
                                                                "file image media",
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
                                                              file_picker_callback:
                                                                function (
                                                                  cb,
                                                                  value,
                                                                  meta
                                                                ) {
                                                                  var input =
                                                                    document.createElement(
                                                                      "input"
                                                                    );
                                                                  input.setAttribute(
                                                                    "type",
                                                                    "file"
                                                                  );
                                                                  input.setAttribute(
                                                                    "accept",
                                                                    "image/*"
                                                                  );
                                                                  input.onchange =
                                                                    async function () {
                                                                      var file =
                                                                        this
                                                                          .files[0];

                                                                      const imagePathApi =
                                                                        await imageApi(
                                                                          file,
                                                                          "image",
                                                                          props,
                                                                          "question_answer",
                                                                          1
                                                                        );

                                                                      cb(
                                                                        imagePathApi,
                                                                        {
                                                                          text: "My text",
                                                                        }
                                                                      );
                                                                    };
                                                                  input.click();
                                                                },
                                                              content_style:
                                                                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                                            }}
                                                            onEditorChange={(
                                                              e
                                                            ) =>
                                                              props.handleChange(
                                                                {
                                                                  target: {
                                                                    name: `questions.${index}.question`,
                                                                    value: e,
                                                                  },
                                                                }
                                                              )
                                                            }
                                                          />
                                                          {props.touched
                                                            .questions?.[index]
                                                            ?.question &&
                                                          props.errors
                                                            .questions?.[index]
                                                            ?.question ? (
                                                            <div className="formik-errors bg-error">
                                                              {
                                                                props.errors
                                                                  .questions?.[
                                                                  index
                                                                ]?.question
                                                              }
                                                            </div>
                                                          ) : null}
                                                        </div>

                                                        <SubQuestion
                                                          props={props}
                                                          index={index}
                                                          name={`questions.${index}.sub_question`}
                                                          imageApi={imageApi}
                                                          images={images}
                                                          question={question}
                                                          editorRef={editorRef}
                                                        />
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              )}
                                              <div
                                                className="form-group col-md-4"
                                                style={{
                                                  marginTop: "26px",
                                                }}
                                              >
                                                {arrayHelpers?.form?.values
                                                  ?.questions?.length > 1 && (
                                                  <button
                                                    className="btn btn-danger"
                                                    onClick={() =>
                                                      arrayHelpers.remove(index)
                                                    }
                                                    type="button"
                                                  >
                                                    remove question
                                                  </button>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        )
                                      )}

                                      <button
                                        className="btn btn-primary"
                                        onClick={() =>
                                          arrayHelpers.push({
                                            question: "",
                                            answer_ids: [],
                                            options: [
                                              {
                                                answer: "",
                                                option_id: "",
                                              },
                                            ],
                                            sub_question: [
                                              {
                                                question: "",
                                                type: "",
                                                answer_ids: "",
                                                options: [
                                                  {
                                                    answer: "",
                                                    option_id: "",
                                                  },
                                                ],
                                              },
                                            ],
                                          })
                                        }
                                        type="button"
                                      >
                                        Add more question
                                      </button>
                                    </div>
                                  )}
                                />
                              </div>
                            )}
                            {props.values.add_questions === "file" && (
                              <div className="row">
                                <div className="form-group col-md-6">
                                  <label htmlFor="contact">
                                    Exam File
                                    <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="file"
                                    accept=".csv"
                                    className="form-control"
                                    name="question_file"
                                    onChange={(event) => {
                                      props.setFieldValue(
                                        "question_file",
                                        event.target.files[0]
                                      );
                                    }}
                                  />
                                  {props.touched.question_file &&
                                  props.errors.question_file ? (
                                    <div className="formik-errors bg-error">
                                      {props.errors.question_file}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="text-end btn-mb mt-3">
                            <button
                              className="btn btn-primary"
                              id="nextBtn"
                              type="submit"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </>
                    </form>
                  )}
                </Formik>

                <div className="text-center">
                  <span className="step"></span>
                  <span className="step"></span>
                  <span className="step"></span>
                  <span className="step"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <ToastContainer autoClose={1000} />
    </div>
  );
}

export default QuestionForm;
