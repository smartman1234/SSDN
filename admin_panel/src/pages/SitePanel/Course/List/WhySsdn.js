import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import * as Yup from "yup";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumb from "../../../BreadCrumb/Breadcrumb";
import CourseService from "../../../../Services/CourseService/CourseService";
import { Context } from "../../../../container/Context";

function WhySsdn() {
    const { login, permissions } = useContext(Context);
    const [loginData, setLoginData] = login;
    const [pagesData, setPagesData] = useState([]);
    const [rolePermission, setRolePermission] = permissions;
    const params = useParams();

    const [value, setValue] = useState({
        title: "",
        description: "",
        card_title_1: "",
        card_title_2: "",
        card_title_3: "",
        card_title_4: "",
        card_title_5: "",
        card_title_6: "",
        card_description_1: "",
        card_description_2: "",
        card_description_3: "",
        card_description_4: "",
        card_description_5: "",
        card_description_6: "",
    });
    const categoryServe = new CourseService();
    const VoucherSchema = Yup.object().shape({
        title: Yup.string().required("Required"),
        description: Yup.string().required("Required"),
        card_title_1: Yup.string().required("Required"),
        card_description_1: Yup.string().required("Required"),
        card_title_2: Yup.string().required("Required"),
        card_description_2: Yup.string().required("Required"),
        card_title_3: Yup.string().required("Required"),
        card_description_3: Yup.string().required("Required"),
        card_title_4: Yup.string().required("Required"),
        card_description_4: Yup.string().required("Required"),
        card_title_5: Yup.string().required("Required"),
        card_description_5: Yup.string().required("Required"),
        card_title_6: Yup.string().required("Required"),
        card_description_6: Yup.string().required("Required"),
    });

    const onSubmit = async (values) => {
        let obj = {
            title: values.title,
            description: values.description,
            card_title_1: values.card_title_1,
            card_description_1: values.card_description_1,
            card_title_2: values.card_title_2,
            card_description_2: values.card_description_2,
            card_title_3: values.card_title_3,
            card_description_3: values.card_description_3,
            card_title_4: values.card_title_4,
            card_description_4: values.card_description_4,
            card_title_5: values.card_title_5,
            card_description_5: values.card_description_5,
            card_title_6: values.card_title_6,
            card_description_6: values.card_description_6,
        };
        try {
            let response = await categoryServe.whyssdn(obj);
            if (response) {
                toast.success("updated Successfully");
            }
        } catch (err) {
            throw err;
        }
    };

    useEffect(() => {
        getDataById();
        setLoginData(JSON.parse(localStorage.getItem("user")));
    }, []);

    useEffect(() => {
        const pages = loginData?.data?.role_permission;

        if (pages) {
            const items = [];
            for (const item of pages) {
                if (!item.parent_id) {
                    items.push({
                        ...item,
                        child: pages.filter((v) => v.parent_id === item.id),
                    });
                }
                if (item.slug === window.location.pathname.replace("/", "")) {
                    setRolePermission(item.role_permission);
                }
            }
            setPagesData(items);
        }
    }, [loginData]);
    const getDataById = async () => {
        try {
            let response = await categoryServe.whyssdndetail();
            if (response) {
                setValue({
                    id: response.data.id,
                    title: response.data.title,
                    description: response.data.description,
                    card_title_1: response.data.card_title_1,
                    card_title_2: response.data.card_title_2,
                    card_title_3: response.data.card_title_3,
                    card_title_4: response.data.card_title_4,
                    card_title_5: response.data.card_title_5,
                    card_title_6: response.data.card_title_6,
                    card_description_1: response.data.card_description_1,
                    card_description_2: response.data.card_description_2,
                    card_description_3: response.data.card_description_3,
                    card_description_4: response.data.card_description_4,
                    card_description_5: response.data.card_description_5,
                    card_description_6: response.data.card_description_6,
                });
            } else {
                toast.error(response);
            }
        } catch (err) {
            throw err;
        }
    };
    return (
        <div className="page-body">
            <Breadcrumb heading="Why SSDN" />
            <div className="container-fluid support-ticket">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5> Why SSDN</h5>
                            </div>
                            <div className="card-body">
                                <Formik
                                    initialValues={value}
                                    validationSchema={VoucherSchema}
                                    onSubmit={onSubmit}
                                    enableReinitialize={true}
                                >
                                    {(props) => (
                                        <form className="" onSubmit={props.handleSubmit}>
                                            <div className="row">
                                                <div className="form-group col-md-6">
                                                    <label className="form-label">
                                                        Title <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        value={props.values.title}
                                                        onChange={props.handleChange}
                                                        onBlur={props.handleBlur}
                                                        name="title"
                                                        type="text"
                                                        placeholder="Enter title"
                                                    />
                                                    {props.touched.title && props.errors.title ? (
                                                        <div className="formik-errors bg-error">
                                                            {props.errors.title}
                                                        </div>
                                                    ) : null}
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className="form-label">
                                                        Title 1 <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        value={props.values.card_title_1}
                                                        onChange={props.handleChange}
                                                        onBlur={props.handleBlur}
                                                        name="card_title_1"
                                                        type="text"
                                                    />
                                                    {props.touched.card_title_1 &&
                                                        props.errors.card_title_1 ? (
                                                        <div className="formik-errors bg-error">
                                                            {props.errors.card_title_1}
                                                        </div>
                                                    ) : null}
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className="form-label">
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
                                                            props.setFieldValue("description", e)
                                                        }
                                                    />
                                                    {props.touched.description &&
                                                        props.errors.description ? (
                                                        <div className="formik-errors bg-error">
                                                            {props.errors.description}
                                                        </div>
                                                    ) : null}
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className="form-label">
                                                        Description 1 <span className="text-danger">*</span>
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
                                                        value={props.values.card_description_1}
                                                        onEditorChange={(e) =>
                                                            props.setFieldValue("card_description_1", e)
                                                        }
                                                    />
                                                    {props.touched.card_description_1 &&
                                                        props.errors.card_description_1 ? (
                                                        <div className="formik-errors bg-error">
                                                            {props.errors.card_description_1}
                                                        </div>
                                                    ) : null}
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className="form-label">
                                                        Title 2 <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        onChange={props.handleChange}
                                                        onBlur={props.handleBlur}
                                                        name="card_title_2"
                                                        value={props.values.card_title_2}
                                                        type="text"
                                                    />
                                                    {props.touched.card_title_2 &&
                                                        props.errors.card_title_2 ? (
                                                        <div className="formik-errors bg-error">
                                                            {props.errors.card_title_2}
                                                        </div>
                                                    ) : null}
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className="form-label">
                                                        Title 3 <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        value={props.values.card_title_3}
                                                        onChange={props.handleChange}
                                                        onBlur={props.handleBlur}
                                                        name="card_title_3"
                                                        type="text"
                                                        placeholder="Enter card title"
                                                    />
                                                    {props.touched.card_title_3 &&
                                                        props.errors.card_title_3 ? (
                                                        <div className="formik-errors bg-error">
                                                            {props.errors.card_title_3}
                                                        </div>
                                                    ) : null}
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className="form-label">
                                                        Description 2 <span className="text-danger">*</span>
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
                                                        value={props.values.card_description_2}
                                                        onEditorChange={(e) =>
                                                            props.setFieldValue("card_description_2", e)
                                                        }
                                                    />
                                                    {props.touched.card_description_2 &&
                                                        props.errors.card_description_2 ? (
                                                        <div className="formik-errors bg-error">
                                                            {props.errors.card_description_2}
                                                        </div>
                                                    ) : null}
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className="form-label">
                                                        Description 3 <span className="text-danger">*</span>
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
                                                        value={props.values.card_description_3}
                                                        onEditorChange={(e) =>
                                                            props.setFieldValue("card_description_3", e)
                                                        }
                                                    />
                                                    {props.touched.card_description_3 &&
                                                        props.errors.card_description_3 ? (
                                                        <div className="formik-errors bg-error">
                                                            {props.errors.card_description_3}
                                                        </div>
                                                    ) : null}
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className="form-label">
                                                        Title 4 <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        value={props.values.card_title_4}
                                                        onChange={props.handleChange}
                                                        onBlur={props.handleBlur}
                                                        name="card_title_4"
                                                        type="text"
                                                    />
                                                    {props.touched.card_title_4 &&
                                                        props.errors.card_title_4 ? (
                                                        <div className="formik-errors bg-error">
                                                            {props.errors.card_title_4}
                                                        </div>
                                                    ) : null}
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className="form-label">
                                                        Title 5 <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        value={props.values.card_title_5}
                                                        onChange={props.handleChange}
                                                        onBlur={props.handleBlur}
                                                        name="card_title_5"
                                                        type="text"
                                                        placeholder="Enter card title"
                                                    />
                                                    {props.touched.card_title_5 &&
                                                        props.errors.card_title_5 ? (
                                                        <div className="formik-errors bg-error">
                                                            {props.errors.card_title_5}
                                                        </div>
                                                    ) : null}
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className="form-label">
                                                        Description 4 <span className="text-danger">*</span>
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
                                                        value={props.values.card_description_4}
                                                        onEditorChange={(e) =>
                                                            props.setFieldValue("card_description_4", e)
                                                        }
                                                    />
                                                    {props.touched.card_description_4 &&
                                                        props.errors.card_description_4 ? (
                                                        <div className="formik-errors bg-error">
                                                            {props.errors.card_description_4}
                                                        </div>
                                                    ) : null}
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className="form-label">
                                                        Description 5 <span className="text-danger">*</span>
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
                                                        value={props.values.card_description_5}
                                                        onEditorChange={(e) =>
                                                            props.setFieldValue("card_description_5", e)
                                                        }
                                                    />
                                                    {props.touched.card_description_5 &&
                                                        props.errors.card_description_5 ? (
                                                        <div className="formik-errors bg-error">
                                                            {props.errors.card_description_5}
                                                        </div>
                                                    ) : null}
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className="form-label">
                                                        Title 6 <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        onChange={props.handleChange}
                                                        value={props.values.card_title_6}
                                                        onBlur={props.handleBlur}
                                                        name="card_title_6"
                                                        type="text"
                                                    />
                                                    {props.touched.card_title_6 &&
                                                        props.errors.card_title_6 ? (
                                                        <div className="formik-errors bg-error">
                                                            {props.errors.card_title_6}
                                                        </div>
                                                    ) : null}
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className="form-label">
                                                        Description 6 <span className="text-danger ">*</span>
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
                                                        value={props.values.card_description_6}
                                                        onEditorChange={(e) =>
                                                            props.setFieldValue("card_description_6", e)
                                                        }
                                                    />
                                                    {props.touched.card_description_6 &&
                                                        props.errors.card_description_6 ? (
                                                        <div className="formik-errors bg-error">
                                                            {props.errors.card_description_6}
                                                        </div>
                                                    ) : null}
                                                </div>
                                                <div className="card-footer text-end">
                                                    {rolePermission.is_add == 1 ? (
                                                        <button className="btn btn-primary" type="submit">
                                                            Submit
                                                        </button>
                                                    ) : (
                                                        <button className="btn btn-primary" type="submit" disabled>
                                                            Submit
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </form>
                                    )}
                                </Formik>
                            </div>
                          <ToastContainer autoClose={1000} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WhySsdn;
