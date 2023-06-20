import React, { useRef, useState } from "react";
import { FieldArray, Formik } from "formik";
import axios from "axios";
import SubQuestion from "../SubQuestion";
import { ToastContainer, toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";

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

const AddOption = ({ name, question, questionIndex, props, editorRef }) => (
    <FieldArray
        name={name}
        render={(arrayHelpers) => (
            <div>
                {question?.options?.map((option, index) => (
                    <div className="row" key={index}>
                        <div className="form-group col-md-11">
                            <label htmlFor="contact">
                                Options {index + 1} <span className="text-danger">*</span>
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
                                onEditorChange={(e) => {
                                    props.handleChange({
                                        target: {
                                            name: `${name}.${index}.answer`,
                                            value: e,
                                        },
                                    });
                                }}
                            />
                        </div>
                        
                        {index === 0 ? (
                            <div
                                className="form-group col-md-1"
                                style={{ marginTop: "26px" }}
                            >
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    onClick={() => arrayHelpers.push(index + 1, "")}
                                >
                                    <span>
                                        <i className="fa-solid fa-plus"></i>
                                    </span>
                                </button>
                            </div>
                        ) : (
                            <div
                                className="form-group col-md-1"
                                style={{ marginTop: "26px" }}
                            >
                                <button
                                    className="btn btn-danger"
                                    type="button"
                                    onClick={() => arrayHelpers.remove(index)}
                                >
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        )}
    />
);

export default function QuestionCreate({ setEventValues, eventValues, props }) {
    const [images, setImages] = useState("");
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
        }
    };
    const addMoreQuestion = (e) => {
        this.setState((prevState) => ({
            bookDetails: [
                ...prevState.bookDetails,
                {
                    index: Math.random(),
                    name: "",
                    author: "",
                    type: "",
                    dateOfPublish: "",
                    price: "",
                },
            ],
        }));
    };
    return (
        <FieldArray name="questions">
            {(fieldArray) => {
                const { form, insert, pop } = fieldArray;
                const { values } = form;
                const { questions } = values;

                return questions?.map((question, index) => (
                    <div className="col-md-12 p-0" key={index}>
                        <div className="form-group col-md-4">
                            <label htmlFor="contact">
                                Exam Question {index + 1} Type
                                <span className="text-danger"> * </span>
                            </label>
                            <select
                                name={`questions.${index}.type`}
                                value={props.values.questions[index].type}
                                onChange={(e) => {
                                    props.setFieldValue(
                                        `questions.${index}.type`,

                                        e.target.value
                                    );
                                }}
                                className="form-select digits"
                            >
                                <option value="" selected={false} disabled>
                                    Select question type
                                </option>
                                <option value="radio">Radio</option>
                                <option value="checkbox">Checkbox</option>
                                <option value="drop_down">Dropdown</option>
                                <option value="drag_drop_group">Drag & Drop</option>
                                <option value="group_question">group_question</option>
                            </select>
                            {props.touched.questions?.[index]?.type &&
                                props.errors.questions?.[index]?.type ? (
                                <div className="formik-errors bg-error">
                                    {props.errors.questions?.[index]?.type}
                                </div>
                            ) : null}
                        </div>
                        <hr />
                        {(props.values.questions[index].type === "radio" ||
                            props.values.questions[index].type === "checkbox" ||
                            props.values.questions[index].type === "drop_down") && (
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="form-group col-md-12">
                                            <label htmlFor="contact">
                                                Question {index + 1}
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
                                                            name: `questions.${index}.question`,
                                                            value: e,
                                                        },
                                                    })
                                                }
                                            />
                                            {props.touched.questions?.[index]?.question &&
                                                props.errors.questions?.[index]?.question ? (
                                                <div className="formik-errors bg-error">
                                                    {props.errors.questions?.[index]?.question}
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
                                    <div className="row mt-2">
                                        <div className="form-group col-md-10">
                                            <label htmlFor="contact">
                                                Exam Question Answer
                                                <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                name={`questions.${index}.answer_ids`}
                                                className="form-control"
                                                placeholder="Answer of exam question"
                                                onChange={(e) => {
                                                    props.setFieldValue(
                                                        `questions.${index}.answer_ids`,

                                                        e.target.value.toUpperCase()
                                                    );
                                                }}
                                            />

                                            {props.touched.questions?.[index]?.answer_ids &&
                                                props.errors.questions?.[index]?.answer_ids ? (
                                                <div className="formik-errors bg-error">
                                                    {props.errors.questions?.[index]?.answer_ids}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            )}
                        {props.values.questions[index].type === "drag_drop_group" && (
                                <div className="card">
                                    <div className="card-body">
                                            <div className="row">
                                                <div className="form-group col-md-12">
                                                    <label htmlFor="contact">
                                                        Question {index + 1}
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
                                                        onEditorChange={(e) =>
                                                            props.handleChange({
                                                                target: {
                                                                    name: `questions.${index}.question`,
                                                                    value: e,
                                                                },
                                                            })
                                                        }
                                                    />
                                                    {props.touched.questions?.[index]?.question &&
                                                        props.errors.questions?.[index]?.question ? (
                                                        <div className="formik-errors bg-error">
                                                            {props.errors.questions?.[index]?.question}
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
                                                imageApi={imageApi}
                                                images={images}
                                                question={question}
                                                editorRef={editorRef}
                                            />
                                    </div>
                                </div>
                        )}
                        {props.values.questions[index].type === "group_question" && (
                            <div className="">
                                <div className="col-xl-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <label>
                                                Paragraph Question
                                                <span className="text-danger">*</span>
                                            </label>
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
                                                        file_browser_callback_types: "file image media",
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
                                                                name: `questions.${index}.question`,
                                                                value: e,
                                                            },
                                                        })
                                                    }
                                                />
                                                {props.touched.questions?.[index]?.question &&
                                                    props.errors.questions?.[index]?.question ? (
                                                    <div className="formik-errors bg-error">
                                                        {props.errors.questions?.[index]?.question}
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
                        {index === questions.length - 1 && (
                            <div
                                className="form-group col"
                                style={{
                                    marginTop: "26px",
                                }}
                            >
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        addMoreQuestion();
                                    }}

                                    type="button"
                                >
                                    Add More Question
                                </button>
                                {questions.length > 1 && (
                                    <button
                                        className="btn btn-danger"
                                        onClick={() =>
                                            pop(index - 1, {
                                                question_id: "",
                                                question: "",
                                                images: "",
                                                answer_ids: "",
                                                options: [
                                                    {
                                                        answer: "",
                                                        images: "",
                                                        option_id: "",
                                                    },
                                                ],
                                                sub_question: [
                                                    {
                                                        question: "",
                                                        image: "",
                                                        type: "",
                                                        answer_ids: "",
                                                        options: [
                                                            {
                                                                answer: "",
                                                                image: "",
                                                            },
                                                        ],
                                                    },
                                                ],
                                            })
                                        }
                                        type="button"
                                    >
                                        remove question
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                ));
            }}
        </FieldArray>
    );
}
