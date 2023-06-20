import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { FieldArray } from "formik";
import Utils from "../../../utils/Utils";

function SubQuestionOption({
  name,
  props,
  imageApi,
  questionIndex,
  answer_ids,
  sub_questionIndex,
  editorRef,
}) {
  return (
    <>
      <FieldArray
        name={name}
        render={(fieldArray) => (
          <>
            {fieldArray.form.values.questions[questionIndex].sub_question[
              sub_questionIndex
            ].options &&
              fieldArray.form.values.questions[questionIndex].sub_question[
                sub_questionIndex
              ].options.map((v, index) => (
                <div className="row align-items-center" key={index}>
                  <div className="form-group col-md-9">
                    <label htmlFor="contact">
                      Options <span className="text-danger">*</span>
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
                    {props.touched.questions?.[questionIndex]?.sub_question?.[
                      sub_questionIndex
                    ]?.options?.[index]?.answer &&
                    props.errors.questions?.[questionIndex]?.sub_question?.[
                      sub_questionIndex
                    ]?.options?.[index]?.answer ? (
                      <div className="formik-errors bg-error">
                        {
                          props.errors?.questions?.[questionIndex]
                            ?.sub_question?.[sub_questionIndex]?.options?.[
                            index
                          ]?.answer
                        }
                      </div>
                    ) : null}
                  </div>
                  {props.values?.questions?.[questionIndex]?.sub_question[
                    sub_questionIndex
                  ]?.type === "checkbox" ? (
                    <div className="form-group col-md-2">
                      <input
                        type="checkbox"
                        name={`${answer_ids}.${index}`}
                        placeholder="Answer of exam question"
                        onChange={(e) => {
                        
                          props.setFieldValue(
                            `${answer_ids}.${index}`,

                            e.target.checked ? e.target.value : ""
                          );
                        }}
                        value={[Utils.alphabet(index)]}
                        className="me-2"
                      />
                      <label htmlFor={`${answer_ids}.${index}`}>Answer</label>
                      {props.touched.questions?.[questionIndex]?.sub_question?.[
                        sub_questionIndex
                      ]?.answer_ids &&
                      props.errors.questions?.[questionIndex]?.sub_question?.[
                        sub_questionIndex
                      ]?.answer_ids ? (
                        <div className="formik-errors bg-error">
                          {
                            props.errors.questions?.[questionIndex]
                              ?.sub_question[sub_questionIndex]?.answer_ids
                          }
                        </div>
                      ) : null}
                      <input
                        type="text"
                        name={`${name}.${index}.option_id`}
                        defaultValue={Utils.alphabet(index)}
                        style={{ display: "none" }}
                      />
                    </div>
                  ) : (
                    <div className="form-group col-md-2">
                      <input
                        type="radio"
                        name={`${answer_ids}`}
                        placeholder="Answer of exam question"
                        onChange={(e) => {
                         
                          props.setFieldValue(
                            `${answer_ids}`,

                            [e.target.value]
                          );
                        }}
                        className="me-2"
                        value={[Utils.alphabet(index)]}
                      />
                      <label htmlFor={`${answer_ids}`}>Answer </label>
                      {props.touched.questions?.[questionIndex]?.sub_question?.[
                        sub_questionIndex
                      ]?.answer_ids &&
                      props.errors.questions?.[questionIndex]?.sub_question?.[
                        sub_questionIndex
                      ]?.answer_ids ? (
                        <div className="formik-errors bg-error">
                          {
                            props.errors.questions?.[questionIndex]
                              ?.sub_question[sub_questionIndex]?.answer_ids
                          }
                        </div>
                      ) : null}
                      <input
                        type="text"
                        name={`${name}.${index}.option_id`}
                        defaultValue={Utils.alphabet(index)}
                        style={{ display: "none" }}
                      />
                    </div>
                  )}

                  {fieldArray.form.values?.questions?.[questionIndex]
                    ?.sub_question[sub_questionIndex]?.options?.length > 1 && (
                    <div className="form-group col-md-1">
                      <button
                        className="btn btn-danger"
                        type="button"
                        onClick={() => {
                          fieldArray.remove(index);
                        }}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            <div className="form-group col-md-2" style={{ marginTop: "26px" }}>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => {
                  fieldArray.push({ answer: "", option_id: "" });
                }}
              >
                Add more options
              </button>
            </div>
          </>
        )}
      />
    </>
  );
}

export default SubQuestionOption;
