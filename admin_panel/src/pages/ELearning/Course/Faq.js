import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, FieldArray } from "formik";
import ELearningCourseService from "../../../Services/ELearningService/ELearningCourseService";

export default function Faq({ props, values, getDataById, setValues }) {
    const serve = new ELearningCourseService();
    const deleteHandle = async (dataId) => {
        try {
            if (window.confirm("Are you sure you want to delete this record?")) {
                let response = await serve.faqDelete(dataId);
                if (response) {
                    toast.success(response.message);

                    const remainingData = values.faqs.filter((v) => {
                        return v._id !== dataId;
                    });
                    getDataById();
                    setValues(remainingData);
                } else {
                    toast.error("Some went wrong!");
                }
            }
        } catch (err) {
            throw err;
        }
    };
    return (
        <FieldArray
            name="faqs"
            render={(arrayHelpers) => (
                <div>
                    {arrayHelpers?.form?.values?.faqs?.map((v, index) => (
                        <div className="row p-0" key={index} >
                            <div className="form-group col-md-12">
                                <label className="form-label">
                                    FAQs Title <span className="text-danger">*</span>
                                </label>
                                <input
                                    className="form-control"
                                    name={`faqs.${index}.title`}
                                    value={props.values.faqs?.[index]?.title}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    type="text"
                                    placeholder="Enter faqs title"
                                />{" "}
                                {props.touched.faqs?.[index]?.title &&
                                    props.errors.faqs?.[index]?.title ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.faqs?.[index]?.title}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group col-md-12">
                                <label className="form-label">
                                    FAQs Description <span className="text-danger">*</span>
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
                                    value={props.values.faqs?.[index]?.description}
                                    onEditorChange={(e) => props.setFieldValue(`faqs.${index}.description`, e)}
                                />
                                {props.touched.faqs?.[index]?.description &&
                                    props.errors.faqs?.[index]?.description ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.faqs?.[index]?.description}
                                    </div>
                                ) : null}
                            </div>

                            {props.values.faqs.length > 1 && (
                                <div className="form-group col-md-12 text-end">
                                    <button
                                        className="btn btn-danger"
                                        type="button"
                                        onClick={() => {
                                            if (
                                                window.location.pathname === "/create-e-learning-faqs"
                                            ) {
                                                deleteHandle(props.values?.faqs?.[index]?.id);
                                            }
                                            arrayHelpers.remove(index);
                                        }}
                                    >
                                        -
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="row">
                        <div className="form-group col-md-12">
                            <button
                                className="btn btn-primary"
                                type="submit"
                                onClick={() =>
                                    arrayHelpers.push({
                                        title: "",
                                        description: "",
                                    })
                                }
                            >
                                +
                            </button>
                        </div>
                    </div>
                  <ToastContainer autoClose={1000} />
                </div>
            )}
        />
    );
}
