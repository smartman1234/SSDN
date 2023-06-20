import React, { useRef } from "react";
import { FieldArray } from "formik";
import EditSubQuestionOption from "./EditSubQuestionOption";
import { Editor } from "@tinymce/tinymce-react";
import Utils from "../../../../utils/Utils";

function EditSubQuestion({ props, imageApi, name, deleteQuestionHandle }) {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
    }
  };
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

  return (
    <FieldArray
      name={`${name}`}
      render={(arrayHelpers) => (
        <div>
          <div className="col-md-12">
            <div className="row">
              {props.values.type === "group_question" && (
                <>
                  {props.values.sub_question.map((v, index) => (
                    <div>
                      <div className="form-group col-md-6">
                        <label htmlFor="contact">
                          Sub Question {convert(index + 1)} Type
                        </label>
                        <select
                          name={`${name}.${index}.type`}
                          value={props.values.sub_question[index]?.type}
                          onChange={(e) => {
                            props.setFieldValue(
                              `${name}.${index}.type`,

                              e.target.value
                            );
                          }}
                          className="form-select digits"
                        >
                          <option value="0">Select question type</option>
                          <option value="radio">Radio</option>
                          <option value="checkbox">Checkbox</option>
                          <option value="drop_down">Dropdown</option>
                        </select>
                        {props.touched.sub_question?.[index]?.type &&
                        props.errors.sub_question?.[index]?.type ? (
                          <div className="formik-errors bg-error">
                            {props.errors.sub_question?.[index]?.type}
                          </div>
                        ) : null}
                      </div>
                      <div className="form-group col-md-12">
                        <label htmlFor="contact">
                          Sub Question {convert(index + 1)}
                        </label>
                        <Editor
                          textareaName="content"
                          className="mb-3"
                          apiKey="j1g23ad6n3ra8f5lbnbe3nldrui85ygcv9zwc1ao74848kmj"
                          onInit={(evt, editor) => {
                            editorRef.current = editor;
                          }}
                          init={{
                            image_title: true,
                            automatic_uploads: true,
                            file_browser_callback_types: "file image media",

                            height: 300,

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
                          name={`${name}.${index}.question`}
                          value={props.values.sub_question[index]?.question}
                          onEditorChange={(e) =>
                            props.handleChange({
                              target: {
                                name: `${name}.${index}.question`,
                                value: e,
                              },
                            })
                          }
                        />
                        {props.touched.sub_question?.[index]?.question &&
                        props.errors.sub_question?.[index]?.question ? (
                          <div className="formik-errors bg-error">
                            {props.errors.sub_question?.[index]?.question}
                          </div>
                        ) : null}
                      </div>
                      <EditSubQuestionOption
                        name={`${name}.${index}.options`}
                        optionName={`${name}.${index}`}
                        imageApi={imageApi}
                        subIndex={index}
                        props={props}
                      />

                      {props.values?.sub_question?.length > 1 && (
                        <div
                          className="form-group col-md-12"
                          style={{ marginTop: "26px" }}
                        >
                          <button
                            className="btn btn-danger"
                            type="button"
                            onClick={() => {
                              deleteQuestionHandle(v.id);
                            }}
                          >
                            <span>remove sub question</span>
                          </button>

                          <hr></hr>
                        </div>
                      )}
                    </div>
                  ))}
                  <div
                    className="form-group col-md-12"
                    style={{ marginTop: "26px" }}
                  >
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={() => {
                        arrayHelpers.push({
                          question: "",
                          type: "",
                          answer_ids: [],
                          options: [{ answer: "", option_id: "" }],
                        });
                      }}
                    >
                      <span>Add sub Question</span>
                    </button>
                  </div>
                </>
              )}

              {props.values.type === "drag_drop_group" && (
                <div>
                  {props.values?.sub_question &&
                    props.values?.sub_question?.map((v, index) => (
                      <div className="col-md-12" key={index}>
                        <div className="row">
                          <div
                            className="form-group col-md-4"
                            style={{ display: "none" }}
                          >
                            
                            <label htmlFor="contact">
                              Sub Question {convert(index)} Type
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              name={`${name}.${index}.type`}
                              value="drag_drop"
                              className="form-control digits"
                              style={{ display: "none" }}
                            />
                          </div>

                          <div className="form-group col-md-12">
                            <label htmlFor="contact">
                              Sub Question {convert(index + 1)}
                              <span className="text-danger">*</span>
                            </label>
                            <Editor
                              textareaName="content"
                              apiKey="j1g23ad6n3ra8f5lbnbe3nldrui85ygcv9zwc1ao74848kmj"
                              onInit={(evt, editor) => {
                                editorRef.editorRef.current = editor;
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
                                file_picker_callback: function (
                                  cb,
                                  value,
                                  meta
                                ) {
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
                                props.values.sub_question?.[index]?.question
                              }
                              onEditorChange={(e) => {
                                props.handleChange({
                                  target: {
                                    name: `${name}.${index}.question`,
                                    value: e,
                                  },
                                });
                                props.setFieldValue(
                                  `${name}.${index}.type`,
                                  "drag_drop"
                                );
                              }}
                            />

                            {props.errors.sub_question?.[index]?.question ? (
                              <div className="formik-errors bg-error">
                                {props.errors.sub_question?.[index]?.question}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <input
                          type="text"
                          defaultValue="drag_drop"
                          name={`${name}.${index}.type`}
                          style={{ display: "none" }}
                        />

                        <div className="row mt-2">
                          {props.values?.options?.map((v, key) => (
                            <div className="row">
                              <div className="form-group col-md-3">
                                <input
                                  type="radio"
                                  className="me-2"
                                  name={`${name}.${index}.answer_ids`}
                                  checked={props.values.sub_question?.[
                                    index
                                  ]?.answer_ids?.includes(Utils.alphabet(key))}
                                  placeholder="Answer of exam question"
                                  value={[Utils.alphabet(key)]}
                                  onChange={(e) => {
                                    props.setFieldValue(
                                      `${name}.${index}.answer_ids`,

                                      e.target.value
                                    );
                                  }}
                                />
                                <label htmlFor={`${name}.${index}.answer_ids`}>
                                  Answer {Utils.alphabet(key)}
                                  <span className="text-danger">*</span>
                                </label>
                                {props.errors.sub_question?.[index]
                                  ?.answer_ids ? (
                                  <div className="formik-errors bg-error">
                                    {
                                      props.errors.sub_question?.[index]
                                        ?.answer_ids
                                    }
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          ))}

                          {props.values.sub_question?.length > 1 && (
                            <div
                              className="form-group col-md-2"
                              style={{ marginTop: "26px" }}
                            >
                              <button
                                className="btn btn-danger"
                                type="button"
                                onClick={() => {
                                   arrayHelpers.remove(index);
                                  deleteQuestionHandle(v.id);
                                }}
                              >
                                remove sub question
                              </button>
                            </div>
                          )}
                        </div>

                        <hr style={{ border: "2px solid #f1f1f1" }} />
                      </div>
                    ))}
                  <div
                    className="form-group col-md-2"
                    style={{ marginTop: "26px" }}
                  >
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({
                          question: "",
                          type: "",
                          answer_ids: "",
                        })
                      }
                    >
                      Add sub question
                    </button>
                  </div>
                </div>
              )}
            </div>

            <hr style={{ border: "2px solid #f1f1f1" }} />
          </div>
        </div>
      )}
    />
  );
}

export default EditSubQuestion;
