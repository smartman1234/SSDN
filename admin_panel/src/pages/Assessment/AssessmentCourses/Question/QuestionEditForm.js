import React, { useState, useEffect, useRef } from "react";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { FieldArray, Formik } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AssessmentCourseService from "../../../../Services/AssessmentCourseService";
import QuestionService from "../../../../Services/QuestionService";
import EditSubQuestion from "./EditSubQuestion";
import Breadcrumb from "../../../BreadCrumb/Breadcrumb";
import { Editor } from "@tinymce/tinymce-react";
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
  answer_ids,
  deleteOptionHandle,
  validation,
}) => {
  return (
    <>
      
      <FieldArray
        name={name}
        render={(arrayHelpers) => (
          <div>
            {props.values?.options?.map((option, index) => (
              <div className="row align-items-center" key={index}>
                <div className="form-group col-md-8">
                  <label htmlFor="contact">Options {index + 1}</label>
                  <Editor
                    id={index}
                    textareaName="content"
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
                        var img = document.createElement("img");

                        img.id = "my_id";

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
                    value={props.values.options[index].answer}
                    onEditorChange={(e) =>
                      props.handleChange({
                        target: {
                          name: `${name}.${index}.answer`,
                          value: e,
                        },
                      })
                    }
                  />
                  {props.touched.options?.[index]?.answer &&
                  props.errors.options?.[index]?.answer ? (
                    <div className="formik-errors bg-error">
                      {props.errors.options?.[index]?.answer}
                    </div>
                  ) : null}
                </div>
                {(props.values.type === "radio" ||
                  props.values.type === "drop_down") && (
                  <div className="form-group col-md-2">
                    
                    <input
                      type="radio"
                      id="html"
                      required
                      checked={
                        props.values.answer_ids.indexOf(Utils.alphabet(index)) >
                        -1
                      }
                      name={`answer_ids`}
                      onChange={(e) => {
                        props.handleChange({
                          target: {
                            name: `answer_ids`,
                            value: [e.target.value],
                          },
                        });
                      }}
                      value={[Utils.alphabet(index)]}
                    />
                    <input
                      type="text"
                      defaultValue={Utils.alphabet(index)}
                      name={`${name}.${index}.option_id`}
                      style={{ display: "none" }}
                    />
                    <label htmlFor={`answer_ids`}>
                      Answer {index + 1} <span className="text-danger">*</span>
                    </label>
                    {validation ? (
                      <div className="formik-errors bg-error">Required</div>
                    ) : null}
                    {props.touched.answer_ids && props.errors.answer_ids ? (
                      <div className="formik-errors bg-error">
                        {props.errors.answer_ids}
                      </div>
                    ) : null}
                  </div>
                )}
                {props.values.type === "checkbox" && (
                  <div className="form-group col-md-2">
                    
                    <input
                      type="checkbox"
                      name={`answer_ids`}
                      onChange={(e) => {
                        const { value, checked } = e.target;
                        if (checked) {
                          props.setFieldValue(`answer_ids`, [
                            ...props.values.answer_ids,
                            e.target.value,
                          ]);
                        } else {
                          props.setFieldValue(
                            `answer_ids`,
                            props.values.answer_ids.filter((e) => e !== value)
                          );
                        }
                      }}
                      checked={
                        props.values.answer_ids?.indexOf(
                          Utils.alphabet(index)
                        ) > -1
                      }
                      value={Utils.alphabet(index)}
                    />
                    <input
                      type="text"
                      value={Utils.alphabet(index)}
                      style={{ display: "none" }}
                    />
                    <label htmlFor={`answer_ids.${index}`}>
                      Answer {index + 1} <span className="text-danger">*</span>
                    </label>
                    {props.values.answer_ids.length === 0 ? (
                      <div className="formik-errors bg-error">Required</div>
                    ) : null}
                    {props.touched.answer_ids && props.errors.answer_ids ? (
                      <div className="formik-errors bg-error">
                        {props.errors.answer_ids}
                      </div>
                    ) : null}
                  </div>
                )}
                {props.values.type === "drag_drop" && (
                  <div className="form-group col-md-2">
                    
                    <input
                      type="checkbox"
                      name={`answer_ids`}
                      onChange={(e) => {
                        const { value, checked } = e.target;
                        if (checked) {
                          props.setFieldValue(`answer_ids`, [
                            ...props.values.answer_ids,
                            e.target.value,
                          ]);
                        } else {
                          props.setFieldValue(
                            `answer_ids`,
                            props.values.answer_ids.filter((e) => e !== value)
                          );
                        }
                      }}
                      checked={
                        props.values.answer_ids.indexOf(Utils.alphabet(index)) >
                        -1
                      }
                      value={Utils.alphabet(index)}
                    />
                    <input
                      type="text"
                      value={Utils.alphabet(index)}
                      style={{ display: "none" }}
                    />
                    <label htmlFor={`answer_ids.${index}`}>
                      Answer {index + 1} <span className="text-danger">*</span>
                    </label>
                    {props.values.answer_ids.length === 0 ? (
                      <div className="formik-errors bg-error">Required</div>
                    ) : null}
                    {props.touched.answer_ids && props.errors.answer_ids ? (
                      <div className="formik-errors bg-error">
                        {props.errors.answer_ids}
                      </div>
                    ) : null}
                  </div>
                )}
                {props.values?.options?.length > 1 && (
                  <div className="form-group col-md-2">
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={() => {
                        arrayHelpers.remove(index);
                      }}
                    >
                      remove option
                    </button>
                  </div>
                )}
              </div>
            ))}
            <div className="form-group col-md-1" style={{ marginTop: "26px" }}>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => arrayHelpers.push({ answer: "", option_id: "" })}
              >
                <span>
                  <i className="fa-solid fa-plus"></i>
                </span>
              </button>
            </div>
            {props.values.type === "drag_drop" && (
              <>
                
                <label htmlFor="contact">Anwer Series</label>
                <p className="border border-dark p-2">
                  {props.values.answer_ids && props.values.answer_ids.join(",")}
                </p>
              </>
            )}
          </div>
        )}
      />
    </>
  );
};

function QuestionEditForm() {
  const navigate = useNavigate();
  const params = useParams();
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
    }
  };
  const Question = new QuestionService();
  const [validation, setValidation] = useState(false);
  const [question, setQuestionId] = useState(null);
  const [type, setType] = useState("");
  const [options, setOptions] = useState([]);
  const [answerId, setAnswerId] = useState([]);
  const [images, setImages] = useState("");

  const [aid, setAId] = useState(null);
  const [eventValues, setEventValues] = useState({
    question: "",

    type: "",
    answer_ids: [],
    options: [{ answer: "", image: "" }],
    sub_question: [
      {
        question: "",
        type: "",
        answer_ids: [],
        options: [{ answer: "" }],
      },
    ],
  });
  const EventSchema = Yup.object().shape({
    question: Yup.string().required(),

    options: Yup.array().when("type", {
      is: (type) =>
        type === "radio" ||
        type === "checkbox" ||
        type === "drop_down" ||
        type === "drag_drop_group",
      then: Yup.array(
        Yup.object().shape({
          answer: Yup.string().required("Required"),
        })
      ),
    }),

    sub_question: Yup.array().when("type", {
      is: (type) => type === "drag_drop_group" || type === "group_question",
      then: Yup.array(
        Yup.object().shape({
          question: Yup.string().required("Required"),
          type: Yup.string().required("Required"),
          options: Yup.array().when("type", {
            is: (type) =>
              type === "radio" || type === "checkbox" || type === "drop_down",
            then: Yup.array(
              Yup.object().shape({
                answer: Yup.string().required("Required"),
              })
            ),
          }),
        })
      ),
    }),
  });

  const EventFormHandle = async (values, e) => {
    if (
      (type === "radio" ||
        type === "checkbox" ||
        type === "drop_down" ||
        type === "drag_drop") &&
      values.answer_ids.length === 0
    ) {
      setValidation(true);
    } else {
      setValidation(false);
      setEventValues(values);

      const formData = new FormData(e.target);
      if (values.id) {
        formData.set("id", values.id);
      }

      formData.set("question", values.question);
      formData.set("type", values.type);
      formData.set("answer_ids", values.answer_ids);
      formData.set("options", JSON.stringify(values.options));

      formData.set("sub_question", JSON.stringify(values.sub_question));

      const config = {
        headers: {
          content: "multipart/form-data",
          AUTHTOKEN: window.user?.data?.auth_token,
        },
      };
      try {
        const response = await axios.post(
          process.env.REACT_APP_API_BASEURL +
            `assessment-question-update/${values.id}`,
          formData,
          config
        );
        if (response.data?.status === "success") {
          toast.success("Record update successfully");
          setTimeout(() => {
            navigate(`/question-list/${aid}`);
          }, [1000]);
        } else {
          toast.error("Please check your Fields. Something is missing");
        }
      } catch (err) {
        throw err;
      }
    }
  };
  useEffect(() => {
    if (params.id) {
      QuestionByIdApi();
    }
  }, []);

  const QuestionByIdApi = async () => {
    let obj = {
      question_id: params?.id,
    };
    try {
      let response = await Question.questionDetail(obj);
      if (response) {
        setType(response.data.type);
        setOptions(response.data.options);
        setQuestionId(response.data?.id);
        setAId(response.data.assessments_id);
        setEventValues({
          id: response.data.id,
          question: response.data.question,
          answer_ids:
            response.data.answer_ids && response.data.answer_ids.split(","),
          question_file: "",
          type: response.data.type,
          options: response.data.options,
          sub_question: response.data.sub_question,
        });
      } else {
        toast.error(response?.error);
      }
    } catch (err) {
      throw err;
    }
  };

  const deleteOptionHandle = async (dataId, option_id, index) => {
    if (dataId) {
      try {
        if (window.confirm("Are you sure you want to delete this record?")) {
          let response = await Question.deleteOption(dataId);
          if (response) {
            toast.success(response.message);
            setEventValues((current) => {
              return {
                ...current,

                answer_ids: current.answer_ids.filter((v, i) => {
                  return v !== Utils.alphabet(index);
                }),

                options: current.options.filter((v, i) => {
                  return v._id !== dataId;
                }),
              };
            });
            QuestionByIdApi();
          } else {
            toast.error("Some went wrong!");
          }
        }
      } catch (err) {
        throw err;
      }
    }
  };

  const deleteQuestionHandle = async (dataId, id) => {
    try {
      if (window.confirm("Are you sure you want to delete this record?")) {
        let response = await Question.deleteQuestion(dataId);
        if (response) {
          toast.success(response.message);
          setEventValues((current) => {
            return {
              ...current,
              sub_question: [
                {
                  ...current.sub_question,

                  question: current?.sub_question?.filter((v) => {
                    return v.id !== id;
                  }),
                },
              ],
            };
          });
          QuestionByIdApi();
        } else {
          toast.error("Some went wrong!");
        }
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className="page-body">
      <Breadcrumb heading="Question Detail" subheading="Questions" />
      <div className="container-fluid support-ticket">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Edit Assessment Courses</h5>
              </div>
              <div className="card-body">
                <Formik
                  initialValues={eventValues}
                  onSubmit={EventFormHandle}
                  enableReinitialize={true}
                  validationSchema={EventSchema}
                >
                  {(props) => (
                    <form className="" onSubmit={props.handleSubmit}>
                      {
                        <>
                          <div className="tab" style={{ display: "block" }}>
                            <div className="row">
                              <div className="row manual">
                                <div className="col-md-12">
                                  <div className="form-group col-md-4">
                                    <div className="col-md-">
                                      <label htmlFor="contact">
                                        Exam Question Type
                                      </label>
                                      <select
                                        name="type"
                                        disabled
                                        value={props.values.type}
                                        onChange={(e) => {
                                          props.setFieldValue(
                                            "type",

                                            e.target.value
                                          );
                                        }}
                                        className="form-control digits"
                                      >
                                        <option value="">
                                          Select question type
                                        </option>
                                        <option value="radio">Radio</option>
                                        <option value="checkbox">
                                          Checkbox
                                        </option>
                                        <option value="drop_down">
                                          Dropdown
                                        </option>
                                        <option value="group_question">
                                          Group_question
                                        </option>
                                        <option value="drag_drop_group">
                                          Drag_Drop_group
                                        </option>
                                        <option value="drag_drop">
                                          Drag_Drop
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                  {props.values.type === "checkbox" ||
                                  props.values.type === "radio" ||
                                  props.values.type === "drop_down" ||
                                  props.values.type === "drag_drop" ? (
                                    <div className="col-md-12">
                                      <div className="row">
                                        <div className="form-group col-md-12">
                                          <label htmlFor="contact">
                                            Question
                                          </label>
                                          <Editor
                                            textareaName="content"
                                            apiKey="j1g23ad6n3ra8f5lbnbe3nldrui85ygcv9zwc1ao74848kmj"
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
                                              file_picker_callback: function (
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
                                                    var file = this.files[0];

                                                    const imagePathApi =
                                                      await imageApi(
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
                                            value={props.values.question}
                                            onEditorChange={(e) =>
                                              props.handleChange({
                                                target: {
                                                  name: "question",
                                                  value: e,
                                                },
                                              })
                                            }
                                          />
                                         
                                          {props.touched.question &&
                                          props.errors.question ? (
                                            <div className="formik-errors bg-error">
                                              {props.errors.question}
                                            </div>
                                          ) : null}
                                        </div>
                                      </div>
                                      <AddOption
                                        name={`options`}
                                        answer_ids={`answer_ids`}
                                        props={props}
                                        editorRef={editorRef}
                                        deleteOptionHandle={deleteOptionHandle}
                                        validation={validation}
                                        type={type}
                                      />
                                    </div>
                                  ) : null}
                                  {props.values.type === "drag_drop_group" ? (
                                    <>
                                      <div className="mb-3">
                                        <div className="col-xl-12 mb-3">
                                          <label>Paragraph Question</label>

                                          <div>
                                            <Editor
                                              textareaName="content"
                                              apiKey="j1g23ad6n3ra8f5lbnbe3nldrui85ygcv9zwc1ao74848kmj"
                                              onInit={(evt, editor) => {
                                                editorRef.current = editor;
                                              }}
                                              init={{
                                                selector: "textarea",
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
                                                  " undo redo | blocks |image code | formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help ",
                                                file_picker_callback: function (
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
                                                      var file = this.files[0];

                                                      const imagePathApi =
                                                        await imageApi(
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
                                              value={props.values.question}
                                              onEditorChange={(e) =>
                                                props.handleChange({
                                                  target: {
                                                    name: "question",
                                                    value: e,
                                                  },
                                                })
                                              }
                                            />
                                            {props.touched.question &&
                                            props.errors.question ? (
                                              <div className="formik-errors bg-error">
                                                {props.errors.question}
                                              </div>
                                            ) : null}
                                          </div>
                                        </div>

                                        <AddOption
                                          name={`options`}
                                          props={props}
                                          editorRef={editorRef}
                                          validation={validation}
                                        />
                                      </div>
                                      <div className="col-xl-12">
                                        <div className="card">
                                          <div className="card-body">
                                            <EditSubQuestion
                                              props={props}
                                              name={`sub_question`}
                                              imageApi={imageApi}
                                              images={images}
                                              deleteQuestionHandle={
                                                deleteQuestionHandle
                                              }
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  ) : null}
                                  {props.values.type === "group_question" && (
                                    <>
                                      <div className="mb-3">
                                        <div className="col-xl-12">
                                          <label>Paragraph Question</label>
                                          <div>
                                            <Editor
                                              textareaName="content"
                                              apiKey="j1g23ad6n3ra8f5lbnbe3nldrui85ygcv9zwc1ao74848kmj"
                                              onInit={(evt, editor) => {
                                                editorRef.current = editor;
                                              }}
                                              init={{
                                                image_title: true,
                                                automatic_uploads: true,
                                                file_browser_callback_types:
                                                  "file image media",
                                                plugins: "image code",

                                                toolbar:
                                                  " undo redo | image code | formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help ",
                                                file_picker_callback: function (
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
                                                      var file = this.files[0];

                                                      const imagePathApi =
                                                        await imageApi(
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
                                              value={props.values.question}
                                              onEditorChange={(e) =>
                                                props.handleChange({
                                                  target: {
                                                    name: "question",
                                                    value: e,
                                                  },
                                                })
                                              }
                                            />
                                            {props.touched.question &&
                                            props.errors.question ? (
                                              <div className="formik-errors bg-error">
                                                {props.errors.question}
                                              </div>
                                            ) : null}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="">
                                        <div className="col-xl-12">
                                          <div className="card">
                                            <div className="card-body">
                                              <EditSubQuestion
                                                props={props}
                                                name="sub_question"
                                                imageApi={imageApi}
                                                images={images}
                                                deleteQuestionHandle={
                                                  deleteQuestionHandle
                                                }
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>

                              {props.values.add_questions === "file" && (
                                <div className="row">
                                  <div className="form-group col-md-6">
                                    <label htmlFor="contact">Exam File</label>
                                    <input
                                      type="file"accept="image/*"
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
                          <ToastContainer autoClose={1000} />
                          </div>
                        </>
                      }
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionEditForm;
