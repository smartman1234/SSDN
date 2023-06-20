import React, { useState } from "react";
import SubQuestionOption from "./SubQuestionOption";
import { FieldArray } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import Utils from "../../../utils/Utils";

function SubQuestion({
  props,
  index,
  imageApi,
  AddOption,
  answer_id,
  images,
  question,
  subIndex,
  name,
  editorRef,
}) {
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
    <>
      {question.type === "group_question" && (
        <FieldArray
          name={`${name}`}
          render={(fieldArray) => (
            <div>
              {question.sub_question &&
                question.sub_question.map((v, i) => (
                  <div className="col-md-12 mt-3">
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label htmlFor="contact">
                          Sub Question {Utils.alphabet(i)} Type
                          <span className="text-danger">*</span>
                        </label>

                        <select
                          name={`${name}.${i}.type`}
                          onChange={(e) => {
                            props.setFieldValue(
                              `${name}.${i}.type`,

                              e.target.value
                            );
                          }}
                          required
                          className="form-select digits"
                        >
                          <option value="0">Select question type</option>
                          <option value="radio">Radio</option>
                          <option value="checkbox">Checkbox</option>
                          <option value="drop_down">Dropdown</option>
                        </select>
                        {props.touched.questions?.[index]?.sub_question?.[i]
                          ?.type &&
                        props.errors.questions?.[index]?.sub_question?.[i]
                          ?.type ? (
                          <div className="formik-errors bg-error">
                            {
                              props.errors.questions?.[index]?.sub_question?.[i]
                                ?.type
                            }
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="row">
                      <div className="form-group col-md-12">
                        <label htmlFor="contact">
                          Sub Question {Utils.alphabet(i)}
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
                          onEditorChange={(e) =>
                            props.handleChange({
                              target: {
                                name: `${name}.${i}.question`,
                                value: e,
                              },
                            })
                          }
                        />
                        {props.touched.questions?.[index]?.sub_question?.[i]
                          ?.question &&
                        props.errors.questions?.[index]?.sub_question?.[i]
                          ?.question ? (
                          <div className="formik-errors bg-error">
                            {
                              props.errors.questions?.[index]?.sub_question?.[i]
                                ?.question
                            }
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <SubQuestionOption
                      name={`${name}.${i}.options`}
                      answer_ids={`${name}.${i}.answer_ids`}
                      imageApi={imageApi}
                      props={props}
                      sub_questionIndex={i}
                      questionIndex={index}
                      editorRef={editorRef}
                      fieldArray={fieldArray}
                    />

                    <hr style={{ border: "2px solid #f1f1f1" }} />
                    {question?.sub_question.length > 1 && (
                      <div
                        className="form-group col-md-1"
                        style={{ marginTop: "26px" }}
                      >
                        <button
                          className="btn btn-danger"
                          type="button"
                          onClick={() => {
                            fieldArray.remove(i);
                          }}
                        >
                          <i className="fa-solid fa-minus"></i>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              <div
                className="form-group col-md-2"
                style={{ marginTop: "26px" }}
              >
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => {
                    fieldArray.push({
                      question: "",
                      type: "",
                      answer_ids: "",
                      options: [{ answer: "" }],
                    });
                  }}
                >
                  Add Sub Question
                </button>
              </div>
            </div>
          )}
        />
      )}
      {question.type === "drag_drop_group" && (
        <FieldArray
          name={`${name}`}
          render={(fieldArray) => (
            <div>
              {question.sub_question &&
                question.sub_question.map((v, i) => (
                  <div className="col-md-12" key={i}>
                    <div className="row align-items-center">
                      <div className="form-group col-md-9">
                        <label htmlFor="contact">
                          Sub Question {convert(i + 1)}
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
                          onEditorChange={(e) => {
                            props.handleChange({
                              target: {
                                name: `${name}.${i}.question`,
                                value: e,
                              },
                            });
                            props.setFieldValue(
                              `${name}.${i}.type`,
                              "drag_drop"
                            );
                          }}
                        />
                        {props.touched.questions?.[index]?.sub_question?.[i]
                          ?.question &&
                        props.errors.questions?.[index]?.sub_question?.[i]
                          ?.question ? (
                          <div className="formik-errors bg-error">
                            {
                              props.errors.questions?.[index]?.sub_question?.[i]
                                ?.question
                            }
                          </div>
                        ) : null}
                      </div>

                      <div className="form-group col-md-3">
                        {props.values.questions?.[index]?.options.map(
                          (v, key) => (
                            <div>
                              <input
                                type="radio"
                                name={`${name}.${i}.answer_ids`}
                                placeholder="Answer of exam question"
                                value={[Utils.alphabet(key)]}
                                onChange={(e) => {
                                  props.setFieldValue(
                                    `${name}.${i}.answer_ids`,

                                    [e.target.value]
                                  );
                                }}
                                className="me-2"
                              />
                              <label htmlFor={`${name}.${i}.answer_ids`}>
                                Answer {Utils.alphabet(key)}
                                <span className="text-danger">*</span>
                              </label>
                            </div>
                          )
                        )}
                        {props.touched.questions?.[index]?.sub_question?.[i]
                          ?.answer_ids &&
                        props.errors.questions?.[index]?.sub_question?.[i]
                          ?.answer_ids ? (
                          <div className="formik-errors bg-error">
                            {
                              props.errors.questions?.[index]?.sub_question[i]
                                ?.answer_ids
                            }
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <input
                      type="text"
                      defaultValue="drag_drop"
                      name={`${name}.${i}.type`}
                      style={{ display: "none" }}
                    />
                  
                    <div className="row mt-2">
                      {props.values.questions?.[index]?.sub_question.length >
                        1 && (
                        <div
                          className="form-group col-md-3"
                          style={{ marginTop: "26px" }}
                        >
                          <button
                            className="btn btn-danger"
                            type="button"
                            onClick={() => fieldArray.remove(i)}
                          >
                            <span>Remove sub question</span>
                          </button>
                        </div>
                      )}
                    </div>

                    <hr style={{ border: "2px solid #f1f1f1" }} />
                  </div>
                ))}
              <div
                className="form-group col-md-1"
                style={{ marginTop: "26px" }}
              >
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() =>
                    fieldArray.push({
                      question: "",
                      type: "",
                      answer_ids: "",
                    })
                  }
                >
                  <span>
                    <i className="fa-solid fa-plus"></i>
                  </span>
                </button>
              </div>
            </div>
          )}
        />
      )}
    </>
  );
}

export default SubQuestion;
