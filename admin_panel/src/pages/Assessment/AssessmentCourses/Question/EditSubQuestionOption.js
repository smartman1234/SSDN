import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { FieldArray } from "formik";
import Utils from "../../../../utils/Utils";

function EditSubQuestionOption({
  name,
  props,
  imageApi,
  questionIndex,
  answer_ids,
  subIndex,
  sub_questionIndex,
  optionName,
}) {

  const editorRef = useRef(null);
  return (
    <div className="row">
      <FieldArray
        name={name}
        render={(fieldArray) => (
          <div>
            {props.values?.sub_question?.[subIndex]?.options &&
              props.values?.sub_question?.[subIndex]?.options.map(
                (v, index) => (
                  <div key={index} className="row">
                    <div className="form-group col-md-6">
                      <label htmlFor="contact">
                        Options {(index + 1)}
                        <span className="text-danger">*</span>
                      </label>

                      <Editor
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
                          props.values?.sub_question?.[subIndex]?.options?.[
                            index
                          ]?.answer
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
                      {props.touched.sub_question?.[subIndex]?.options?.[index]
                        ?.answer &&
                      props.errors.sub_question?.[subIndex]?.options?.[index]
                        ?.answer ? (
                        <div className="formik-errors bg-error">
                          {
                            props.errors.sub_question?.[subIndex]?.options?.[
                              index
                            ]?.answer
                          }
                        </div>
                      ) : null}
                    </div>
                    {props.values?.sub_question?.[subIndex].type === "radio" ||
                    props.values?.sub_question?.[subIndex].type ===
                      "drop_down" ? (
                      <div className="form-group col-md-2">
                        <label htmlFor={`${optionName}.answer_ids`}>
                          Answer
                        </label>
                        <input
                          type="radio"
                          name={`${optionName}.answer_ids`}
                          placeholder="Answer of exam question"
                          checked={
                            typeof props.values?.sub_question?.[subIndex]
                              ?.answer_ids === "string"
                              ? props.values?.sub_question?.[
                                  subIndex
                                ]?.answer_ids
                                  .split(",")
                                  .indexOf(Utils.alphabet(index)) > -1
                              : props.values?.sub_question?.[
                                  subIndex
                                ]?.answer_ids.indexOf(Utils.alphabet(index)) >
                                -1
                          }
                          onChange={(e) => {
                            props.setFieldValue(
                              `${optionName}.answer_ids`,

                              [e.target.value]
                            );
                          }}
                          value={[Utils.alphabet(index)]}
                        />
                        <input
                          type="text"
                          name={`${name}.${index}.option_id`}
                          defaultValue={Utils.alphabet(index)}
                          style={{ display: "none" }}
                        />
                      </div>
                    ) : (
                      <div className="form-group col-md-2">
                        <label htmlFor={`${optionName}.answer_ids.${index}`}>
                          Answer
                        </label>
                        <input
                          type="checkbox"
                          className="me-2"
                          id={`${optionName}.answer_ids.${index}`}
                          name={`${optionName}.answer_ids`}
                          placeholder="Answer of exam question"
                          checked={
                            typeof props.values?.sub_question?.[subIndex]
                              ?.answer_ids === "string"
                              ? props.values?.sub_question?.[
                                  subIndex
                                ]?.answer_ids
                                  .split(",")
                                  .indexOf(Utils.alphabet(index)) > -1
                              : props.values?.sub_question?.[
                                  subIndex
                                ]?.answer_ids.indexOf(Utils.alphabet(index)) >
                                -1
                          }
                          onChange={(e) => {
                            const { checked, value } = e.target;
                            if (checked) {
                              props.setFieldValue(
                                `${optionName}.answer_ids`,

                                [
                                  ...props.values?.sub_question?.[subIndex]
                                    ?.answer_ids,
                                  value,
                                ]
                              );
                              
                            } else {
                              props.setFieldValue(
                                `${optionName}.answer_ids`,
                                typeof props.values?.sub_question?.[subIndex]
                                  ?.answer_ids === "string"
                                  ? props.values?.sub_question?.[
                                      subIndex
                                    ]?.answer_ids
                                      .split(",")
                                      .filter((e) => e != value)
                                  : props.values?.sub_question?.[
                                      subIndex
                                    ]?.answer_ids.filter((e) => e != value)
                              );
                            }
                          }}
                          value={[Utils.alphabet(index)]}
                        />
                        {props.touched.sub_question?.[subIndex]?.answer_ids &&
                        props.errors.sub_question?.[subIndex]?.answer_ids ? (
                          <div className="formik-errors bg-error">
                            {props.errors.sub_question?.[subIndex]?.answer_ids}
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

                    {props.values?.sub_question[subIndex]?.options?.length >
                      1 && (
                      <div className="form-group col-md-2">
                        <button
                          className="btn btn-danger"
                          type="button"
                          onClick={() => {
                            fieldArray.remove(index);
                          }}
                        >
                          remove option
                        </button>
                      </div>
                    )}
                  </div>
                )
              )}
            <div className="form-group col-md-1" style={{ marginTop: "26px" }}>
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
          </div>
        )}
      />
    </div>
  );
}

export default EditSubQuestionOption;
