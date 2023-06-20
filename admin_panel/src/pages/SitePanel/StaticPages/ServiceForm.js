import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import StaticpageService from "../../../Services/StaticPageService/StaticePageService";

export default function ServiceForm({ pageName, slug }) {
    const staticeService = new StaticpageService();
    const [successImage, setSuccessImage] = useState();
    const [solution1Image, setSolution1Image] = useState();
    const [solution2Image, setSolution2Image] = useState();
    const [solution3Image, setSolution3Image] = useState();
    const [imageUrl, setImageurl] = useState("");
    const [values, setValues] = useState({
        page_name: "",
        slug: "",
        skill_title: "",
        success_title: "",
        success_description: "",
        success_image: "",
        business_solution_title: "",
        solution_1_title: "",
        solution_1_image: "",
        solution_1_image_alt_tag: "",
        solution_1_description: "",
        solution_2_title: "",
        solution_2_image: "",
        solution_2_image_alt_tag: "",
        solution_2_description: "",
        solution_3_title: "",
        solution_3_image: "",
        solution_3_image_alt_tag: "",
        solution_3_description: "",
        work_process_title: "",
        process_1_title: "",
        process_1_description: "",
        process_2_title: "",
        process_2_description: "",
        process_3_title: "",
        process_3_description: "",
        consulting_service: "",
        service_1_title: "",
        service_1_description: "",
        service_2_title: "",
        service_2_description: "",
        service_3_title: "",
        service_3_description: "",
    });

    const onSubmit = (values) => {
        const formData = new FormData();

        formData.set("page_name", values.page_name);
        formData.set("page_slug", values.slug);
        formData.set("description[skill_title]", values.skill_title);
        formData.set("description[success_title]", values.success_title);
        formData.set(
            "description[success_description]",
            values.success_description
        );
        formData.set("description[success_image]", values.success_image);
        formData.set(
            "description[business_solution_title]",
            values.business_solution_title
        );
        formData.set("description[solution_1_title]", values.solution_1_title);
        formData.set("description[solution_1_image]", values.solution_1_image);
        formData.set(
            "description[solution_1_image_alt_tag]",
            values.solution_1_image_alt_tag
        );
        formData.set(
            "description[solution_1_description]",
            values.solution_1_description
        );
        formData.set("description[solution_2_title]", values.solution_2_title);
        formData.set("description[solution_2_image]", values.solution_2_image);
        formData.set(
            "description[solution_2_image_alt_tag]",
            values.solution_2_image_alt_tag
        );
        formData.set(
            "description[solution_2_description]",
            values.solution_2_description
        );
        formData.set("description[solution_3_title]", values.solution_3_title);
        formData.set("description[solution_3_image]", values.solution_3_image);
        formData.set(
            "description[solution_3_image_alt_tag]",
            values.solution_3_image_alt_tag
        );
        formData.set(
            "description[solution_3_description]",
            values.solution_3_description
        );
        formData.set("description[work_process_title]", values.work_process_title);
        formData.set("description[process_1_title]", values.process_1_title);
        formData.set(
            "description[process_1_description]",
            values.process_1_description
        );
        formData.set("description[process_2_title]", values.process_2_title);
        formData.set(
            "description[process_2_description]",
            values.process_2_description
        );
        formData.set("description[process_3_title]", values.process_3_title);
        formData.set(
            "description[process_3_description]",
            values.process_3_description
        );
        formData.set("description[consulting_service]", values.consulting_service);
        formData.set("description[service_1_title]", values.service_1_title);
        formData.set(
            "description[service_1_description]",
            values.service_1_description
        );
        formData.set("description[service_2_title]", values.service_2_title);
        formData.set(
            "description[service_2_description]",
            values.service_2_description
        );
        formData.set("description[service_3_title]", values.service_3_title);
        formData.set(
            "description[service_3_description]",
            values.service_3_description
        );

        const config = {
            headers: {
                content: "multipart/form-data",
                AUTHTOKEN: window.user?.data?.auth_token,
            },
        };
        axios
            .post(
                process.env.REACT_APP_API_BASEURL + "page/create-page-block",
                formData,
                config
            )
            .then((res) => {
                if (res.data?.status === "success") {
                    toast.success("Record update successfully");
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => {
                throw err;
            });
    };

    const ValidateSchema = Yup.object().shape({
        skill_title: Yup.string().required("Required"),
        success_title: Yup.string().required("Required"),
        success_description: Yup.string().required("Required"),
        success_image: Yup.mixed().required("Required"),
        business_solution_title: Yup.string().required("Required"),
        solution_2_title: Yup.string().required("Required"),
        solution_1_image: Yup.mixed().required("Required"),
        solution_1_image_alt_tag: Yup.string().required("Required"),
        solution_1_description: Yup.string().required("Required"),
        solution_2_title: Yup.string().required("Required"),
        solution_2_image: Yup.mixed().required("Required"),
        solution_2_image_alt_tag: Yup.string().required("Required"),
        solution_2_description: Yup.string().required("Required"),
        solution_3_title: Yup.string().required("Required"),
        solution_3_image: Yup.mixed().required("Required"),
        solution_3_image_alt_tag: Yup.string().required("Required"),
        solution_3_description: Yup.string().required("Required"),
        work_process_title: Yup.string().required("Required"),
        process_1_title: Yup.string().required("Required"),
        process_1_description: Yup.string().required("Required"),
        process_2_title: Yup.string().required("Required"),
        process_2_description: Yup.string().required("Required"),
        process_3_title: Yup.string().required("Required"),
        process_3_description: Yup.string().required("Required"),
        consulting_service: Yup.string().required("Required"),
        service_1_title: Yup.string().required("Required"),
        service_1_description: Yup.string().required("Required"),
        service_2_title: Yup.string().required("Required"),
        service_2_description: Yup.string().required("Required"),
        service_3_title: Yup.string().required("Required"),
        service_3_description: Yup.string().required("Required"),
    });
    const getBase64 = (file) => {
        return new Promise((resolve) => {
            let fileInfo;
            let baseURL = "";
            let reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = () => {
                baseURL = reader.result;
                resolve(baseURL);
            };
        });
    };

    const thumbImagehandle = (e, props, name) => {
        let { file } = e.target.files[0];

        file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function (e) {
            var image = new Image();

            image.src = e.target.result;

            image.onload = function () {
                var height = this.height;
                var width = this.width;

                if (name === "success_image") {
                    if (height > 460 || width > 460) {
                        alert(
                            "Height should not exceed from 460px and width should not exceed from 460 px"
                        );
                    } else if (height < 455 || width < 455) {
                        alert(
                            "Height should not less than from 455px and width should not less than from 455 px"
                        );
                    } else {
                        getBase64(file)
                            .then((result) => {
                                file["base64"] = result;
                                setSuccessImage(result);
                                props.setFieldValue("success_image", file);
                            })
                            .catch((err) => {

                            });
                    }
                } else if (name === "solution_1_image") {
                    if (height > 495 || width > 800) {
                        alert(
                            "Height should not exceed from 495px and width should not exceed from 800 px"
                        );
                    } else if (height < 490 || width < 750) {
                        alert(
                            "Height should not less than from 490px and width should not less than from 750 px"
                        );
                    } else {
                        getBase64(file)
                            .then((result) => {
                                file["base64"] = result;
                                setSolution1Image(result);
                                props.setFieldValue("solution_1_image", file);

                            })
                            .catch((err) => {

                            });
                    }
                } else if (name === "solution_2_image") {
                    if (height > 495 || width > 800) {
                        alert(
                            "Height should not exceed from 495px and width should not exceed from 800 px"
                        );
                    } else if (height < 490 || width < 750) {
                        alert(
                            "Height should not less than from 490px and width should not less than from 750 px"
                        );
                    } else {
                        getBase64(file)
                            .then((result) => {
                                file["base64"] = result;
                                setSolution2Image(result);
                                props.setFieldValue("solution_2_image", file);

                            })
                            .catch((err) => {

                            });
                    }
                } else if (name === "solution_3_image") {
                    if (height > 495 || width > 800) {
                        alert(
                            "Height should not exceed from 495px and width should not exceed from 800 px"
                        );
                    } else if (height < 490 || width < 750) {
                        alert(
                            "Height should not less than from 490px and width should not less than from 750 px"
                        );
                    } else {
                        getBase64(file)
                            .then((result) => {
                                file["base64"] = result;
                                setSolution3Image(result);
                                props.setFieldValue("solution_3_image", file);

                            })
                            .catch((err) => {

                            });
                    }
                }
            };
        };
    };

    useEffect(() => {
        getPageBlockData();
    }, []);

    const getPageBlockData = async () => {
        try {
            let response = await staticeService.getDetails(slug);

            if (response.status === "success") {
                setImageurl(response.data?.page_description?.image_url);

                setValues({
                    page_name: response.data.page_name,
                    slug: response.data.page_slug,
                    title: response.data.block_title,
                    description: response.data.block_description,
                    skill_title: response.data?.page_description?.skill_title,
                    success_title: response.data?.page_description?.success_title,
                    success_description:
                        response.data?.page_description?.success_description,
                    success_image: response.data?.page_description?.success_image,
                    business_solution_title:
                        response.data?.page_description?.business_solution_title,
                    solution_1_title: response.data?.page_description?.solution_1_title,
                    solution_1_image: response.data?.page_description?.solution_1_image,
                    solution_1_image_alt_tag:
                        response.data?.page_description?.solution_1_image_alt_tag,
                    solution_1_description:
                        response.data?.page_description?.solution_1_description,
                    solution_2_title: response.data?.page_description?.solution_2_title,
                    solution_2_image: response.data?.page_description?.solution_2_image,
                    solution_2_image_alt_tag:
                        response.data?.page_description?.solution_2_image_alt_tag,
                    solution_2_description:
                        response.data?.page_description?.solution_2_description,
                    solution_3_title: response.data?.page_description?.solution_3_title,
                    solution_3_image: response.data?.page_description?.solution_3_image,
                    solution_3_image_alt_tag:
                        response.data?.page_description?.solution_3_image_alt_tag,
                    solution_3_description:
                        response.data?.page_description?.solution_3_description,
                    work_process_title:
                        response.data?.page_description?.work_process_title,
                    process_1_title: response.data?.page_description?.process_1_title,
                    process_1_description:
                        response.data?.page_description?.process_1_description,
                    process_2_title: response.data?.page_description?.process_2_title,
                    process_2_description:
                        response.data?.page_description?.process_2_description,
                    process_3_title: response.data?.page_description?.process_3_title,
                    process_3_description:
                        response.data?.page_description?.process_3_description,
                    consulting_service:
                        response.data?.page_description?.consulting_service,
                    service_1_title: response.data?.page_description?.service_1_title,
                    service_1_description:
                        response.data?.page_description?.service_1_description,
                    service_2_title: response.data?.page_description?.service_2_title,
                    service_2_description:
                        response.data?.page_description?.service_2_description,
                    service_3_title: response.data?.page_description?.service_3_title,
                    service_3_description:
                        response.data?.page_description?.service_3_description,
                });
            }
        } catch (err) {
            throw err;
        }
    };

    return (
        <>
            <Formik
                initialValues={values}
                onSubmit={onSubmit}
                enableReinitialize={true}
                validationSchema={ValidateSchema}
            >
                {(props) => (
                    <form className="form theme-form" onSubmit={props.handleSubmit}>
                        <div className="row">
                            <div className="form-group col-md-12" style={{ display: "none" }}>
                                <label className="form-label">
                                    Page / Blocks
                                    <span className="text-danger">*</span>
                                </label>

                                <input
                                    className="form-control"
                                    name="page_name"
                                    type="text"
                                    placeholder="Enter slug"
                                    disabled
                                    defaultValue={pageName}
                                />
                                {props.touched.page_name && props.errors.page_name ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.page_name}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group col-md-12" style={{ display: "none" }}>
                                <label className="form-label">
                                    Slug <span className="text-danger">*</span>
                                </label>
                                <input
                                    className="form-control"
                                    name="slug"
                                    type="text"
                                    placeholder="Enter slug"
                                    disabled
                                    defaultValue={slug}
                                />
                                {props.touched.slug && props.errors.slug ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.slug}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group col-md-12">
                                <label className="form-label fs-4">Skills</label>
                                <hr />
                            </div>{" "}
                            <div className="form-group col-md-6">
                                <label className="form-label">
                                    Skill Title <span className="text-danger">*</span>
                                </label>
                                <input
                                    className="form-control"
                                    name="skill_title"
                                    type="text"
                                    placeholder="Enter skill title"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.skill_title}
                                />
                                {props.touched.skill_title && props.errors.skill_title ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.skill_title}
                                    </div>
                                ) : null}
                            </div>{" "}
                            <div className="form-group col-md-6">
                                <label className="form-label">
                                    Success Title <span className="text-danger">*</span>
                                </label>
                                <input
                                    className="form-control"
                                    name="success_title"
                                    type="text"
                                    placeholder="Enter success title"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.success_title}
                                />
                                {props.touched.success_title && props.errors.success_title ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.success_title}
                                    </div>
                                ) : null}
                            </div>
                            <div
                                className={
                                    props.values.success_image
                                        ? "form-group col-md-5"
                                        : "form-group col-md-6"
                                }
                            >
                                <label className="form-label">
                                    Image <span className="text-danger">*</span>
                                </label>
                                <input
                                    className="form-control"
                                    name="success_image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        thumbImagehandle(e, props, "success_image");
                                    }}
                                    placeholder="Enter slug"
                                />
                                {props.touched.success_image && props.errors.success_image ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.success_image}
                                    </div>
                                ) : null}
                            </div>
                            {(successImage || imageUrl + props.values.success_image) && (
                                <div
                                    className="input-group-append col-md-1"
                                    style={{
                                        top: "25px",
                                        paddingLeft: "0px",
                                        height: "49px",
                                        width: "55px",
                                    }}
                                >
                                    <img
                                        src={successImage || imageUrl + props.values.success_image}
                                        alt="image"
                                        style={{
                                            padding: "0",
                                            width: "100%",
                                            height: "72%",
                                        }}
                                    />
                                </div>
                            )}
                            <div className="form-group col-md-6">
                                <label className="form-label"> Description <span className="text-danger">*</span></label>
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
                                    value={props.values.success_description}
                                    onEditorChange={(e) =>
                                        props.setFieldValue("success_description", e)
                                    }
                                />
                                {props.touched.success_description &&
                                    props.errors.success_description ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.success_description}
                                    </div>
                                ) : null}
                            </div>{" "}
                            <div className="form-group col-md-12">
                                <label className="form-label fs-4">What we provide</label>
                                <hr />
                            </div>{" "}
                            <div className="form-group col-md-6">
                                <label className="form-label">
                                    Business Solution Title <span className="text-danger">*</span>
                                </label>
                                <input
                                    className="form-control"
                                    name="business_solution_title"
                                    type="text"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.business_solution_title}
                                    placeholder="Enter business solution title"
                                />
                                {props.touched.business_solution_title &&
                                    props.errors.business_solution_title ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.business_solution_title}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group col-md-6 ">
                                <label className="form-label">
                                    Solution1 Title <span className="text-danger">*</span>
                                </label>
                                <input
                                    className="form-control"
                                    name="solution_1_title"
                                    type="text"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.solution_1_title}
                                    placeholder="Enter solution1 title"
                                />
                                {props.touched.solution_1_title &&
                                    props.errors.solution_1_title ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.solution_1_title}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group col-md-5 me-4">
                                <label className="form-label">
                                    Solution1 Image <span className="text-danger">*</span>
                                </label>
                                <input
                                    className="form-control"
                                    name="solution_1_image"
                                    type="file"
                                    onChange={(e) => {
                                        thumbImagehandle(e, props, "solution_1_image");
                                    }}
                                    placeholder="Enter slug"
                                />
                                {props.touched.solution_1_image &&
                                    props.errors.solution_1_image ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.solution_1_image}
                                    </div>
                                ) : null}
                            </div>
                            {(solution1Image || imageUrl + props.values.solution_1_image) && (
                                <div
                                    className="input-group-append col-md-1 ml-2"
                                    style={{
                                        top: "25px",
                                        paddingLeft: "0px",
                                        height: "49px",
                                        width: "55px",
                                    }}
                                >
                                    <img
                                        src={
                                            solution1Image || imageUrl + props.values.solution_1_image
                                        }
                                        alt="image"
                                        style={{
                                            padding: "0",
                                            width: "100%",
                                            height: "72%",
                                        }}
                                    />
                                </div>
                            )}
                            <div className="form-group col-md-6">
                                <label className="form-label">
                                    Solution 1 Alt Tag <span className="text-danger">*</span>
                                </label>
                                <input
                                    className="form-control"
                                    name="solution_1_image_alt_tag"
                                    type="text"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.solution_1_image_alt_tag}
                                    placeholder="Enter solution 1 alt tag"
                                />
                                {props.touched.solution_1_image_alt_tag &&
                                    props.errors.solution_1_image_alt_tag ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.solution_1_image_alt_tag}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group col-md-12">
                                <label className="form-label">Solution 1 Description <span className="text-danger">*</span></label>
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
                                    value={props.values.solution_1_description}
                                    onEditorChange={(e) =>
                                        props.setFieldValue("solution_1_description", e)
                                    }
                                />
                                {props.touched.solution_1_description &&
                                    props.errors.solution_1_description ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.solution_1_description}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group col-md-6">
                                <label className="form-label">
                                    Solution 2 Title <span className="text-danger">*</span>
                                </label>
                                <input
                                    className="form-control"
                                    name="solution_2_title"
                                    type="text"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.solution_2_title}
                                    placeholder="Enter solution 2 title"
                                />
                                {props.touched.solution_2_title &&
                                    props.errors.solution_2_title ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.solution_2_title}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group col-md-5 ">
                                <label className="form-label">
                                    Solution 2 Image <span className="text-danger">*</span>
                                </label>
                                <input
                                    className="form-control"
                                    name="solution_2_image"
                                    type="file"
                                    onChange={(e) => {
                                        thumbImagehandle(e, props, "solution_2_image");
                                    }}
                                    placeholder="Enter slug"
                                />
                                {props.touched.solution_2_image &&
                                    props.errors.solution_2_image ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.solution_2_image}
                                    </div>
                                ) : null}
                            </div>
                            {(solution2Image || imageUrl + props.values.solution_2_image) && (
                                <div
                                    className="input-group-append col-md-1"
                                    style={{
                                        top: "25px",
                                        paddingLeft: "0px",
                                        height: "49px",
                                        width: "55px",
                                    }}
                                >
                                    <img
                                        src={
                                            solution2Image || imageUrl + props.values.solution_2_image
                                        }
                                        alt="image"
                                        style={{
                                            padding: "0",
                                            width: "100%",
                                            height: "72%",
                                        }}
                                    />
                                </div>
                            )}
                            <div className="form-group col-md-5">
                                <label className="form-label">
                                    Solution 2 Alt Tag <span className="text-danger">*</span>
                                </label>
                                <input
                                    className="form-control"
                                    name="solution_2_image_alt_tag"
                                    type="text"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.solution_2_image_alt_tag}
                                    placeholder="Enter solution 2 alt tag"
                                />
                                {props.touched.solution_2_image_alt_tag &&
                                    props.errors.solution_2_image_alt_tag ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.solution_2_image_alt_tag}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group col-md-12">
                                <label className="form-label">Solution2 Description <span className="text-danger">*</span></label>
                                
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
                                    value={props.values.solution_2_description}
                                    onEditorChange={(e) =>
                                        props.setFieldValue("solution_2_description", e)
                                    }
                                />
                                {props.touched.solution_2_description &&
                                    props.errors.solution_2_description ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.solution_2_description}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group col-md-6">
                                <label className="form-label">
                                    Solution 3 Title <span className="text-danger">*</span>
                                </label>
                                <input
                                    className="form-control"
                                    name="solution_3_title"
                                    type="text"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.solution_3_title}
                                    placeholder="Enter solution 3 title"
                                />
                                {props.touched.solution_3_title &&
                                    props.errors.solution_3_title ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.solution_3_title}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group col-md-5 me-4">
                                <label className="form-label">
                                    Solution 3 Image <span className="text-danger">*</span>
                                </label>
                                <input
                                    className="form-control"
                                    name="solution_3_image"
                                    type="file"
                                    onChange={(e) => {
                                        thumbImagehandle(e, props, "solution_3_image");
                                    }}
                                    placeholder="Enter slug"
                                />
                                {props.touched.solution_3_image &&
                                    props.touched.solution_3_image &&
                                    props.errors.solution_3_image ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.solution_3_image}
                                    </div>
                                ) : null}
                            </div>
                            {(solution3Image || imageUrl + props.values.solution_3_image) && (
                                <div
                                    className="input-group-append col-md-1"
                                    style={{
                                        top: "25px",
                                        paddingLeft: "0px",
                                        height: "49px",
                                        width: "55px",
                                    }}
                                >
                                    <img
                                        src={
                                            solution3Image || imageUrl + props.values.solution_3_image
                                        }
                                        alt="image"
                                        style={{
                                            padding: "0",
                                            width: "100%",
                                            height: "72%",
                                        }}
                                    />
                                </div>
                            )}
                            <div className="form-group col-md-6">
                                <label className="form-label">
                                    Solution 3 Alt Tag <span className="text-danger">*</span>
                                </label>
                                <input
                                    className="form-control"
                                    name="solution_3_image_alt_tag"
                                    type="text"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.solution_3_image_alt_tag}
                                    placeholder="Enter solution 3 alt tag"
                                />
                                {props.touched.solution_3_image_alt_tag &&
                                    props.errors.solution_3_image_alt_tag ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.solution_3_image_alt_tag}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group col-md-12">
                                <label className="form-label">Solution 3 Description <span className="text-danger">*</span></label>
                                
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
                                    value={props.values.solution_3_description}
                                    onEditorChange={(e) =>
                                        props.setFieldValue("solution_3_description", e)
                                    }
                                />
                                {props.touched.solution_3_description &&
                                    props.errors.solution_3_description ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.solution_3_description}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group col-md-12">
                                <label className="form-label fs-4">
                                    OUR WORK PROCESS INFRASTRUCTURE
                                </label>
                                <hr />
                            </div>{" "}
                            <div className="form-group col-md-12">
                                <label className="form-label">
                                    Work Process Title <span className="text-danger">*</span>
                                </label>
                                <input
                                    className="form-control"
                                    name="work_process_title"
                                    type="text"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.work_process_title}
                                    placeholder="Enter work process title"
                                />
                                {props.touched.work_process_title &&
                                    props.errors.work_process_title ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.work_process_title}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group col-md-6">
                                <label className="form-label">
                                    Process 1 Title <span className="text-danger">*</span>
                                </label>
                                <input
                                    className="form-control"
                                    name="process_1_title"
                                    type="text"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.process_1_title}
                                    placeholder="Enter process 1 title"
                                />
                                {props.touched.process_1_title &&
                                    props.errors.process_1_title ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.process_1_title}
                                    </div>
                                ) : null}
                            </div>{" "}
                            <div className="form-group col-md-6">
                                <label className="form-label">
                                    Process 2 Title <span className="text-danger">*</span>
                                </label>
                                <input
                                    className="form-control"
                                    name="process_2_title"
                                    type="text"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.process_2_title}
                                    placeholder="Enter process 2 title"
                                />
                                {props.touched.process_2_title &&
                                    props.errors.process_2_title ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.process_2_title}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group col-md-6">
                                <label className="form-label">Process 1 Description <span className="text-danger">*</span></label>
                                
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
                                    value={props.values.process_1_description}
                                    onEditorChange={(e) =>
                                        props.setFieldValue("process_1_description", e)
                                    }
                                />
                                {props.touched.process_1_description &&
                                    props.errors.process_1_description ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.process_1_description}
                                    </div>
                                ) : null}
                            </div>{" "}
                            <div className="form-group col-md-6">
                                <label className="form-label">Process 2 Description <span className="text-danger">*</span></label>
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
                                    value={props.values.process_2_description}
                                    onEditorChange={(e) =>
                                        props.setFieldValue("process_2_description", e)
                                    }
                                />
                                {props.touched.process_2_description &&
                                    props.errors.process_2_description ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.process_2_description}
                                    </div>
                                ) : null}
                            </div>{" "}
                            <div className="form-group col-md-6">
                                <label className="form-label">
                                    Process 3 Title <span className="text-danger">*</span>
                                </label>
                                <input
                                    className="form-control"
                                    name="process_3_title"
                                    type="text"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.process_3_title}
                                    placeholder="Enter process 3 title"
                                />
                                {props.touched.process_3_title &&
                                    props.errors.process_3_title ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.process_3_title}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group col-md-6">
                                <label className="form-label">Process 3 Description <span className="text-danger">*</span></label>
                                
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
                                    value={props.values.process_3_description}
                                    onEditorChange={(e) =>
                                        props.setFieldValue("process_3_description", e)
                                    }
                                />
                                {props.touched.process_3_description &&
                                    props.errors.process_3_description ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.process_3_description}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group col-md-12">
                                <label className="form-label fs-4">Services</label>
                                <hr />
                            </div>{" "}
                            <div className="form-group col-md-12">
                                <label className="form-label">
                                    Consulting Service <span className="text-danger">*</span>
                                </label>
                                <input
                                    className="form-control"
                                    name="consulting_service"
                                    type="text"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.consulting_service}
                                    placeholder="Enter consulting service"
                                />
                                {props.touched.consulting_service &&
                                    props.errors.consulting_service ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.consulting_service}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group col-md-6">
                                <label className="form-label">
                                    Service 1 Title <span className="text-danger">*</span>
                                </label>
                                <input
                                    className="form-control"
                                    name="service_1_title"
                                    type="text"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.service_1_title}
                                    placeholder="Enter service 1 title"
                                />
                                {props.touched.service_1_title &&
                                    props.errors.service_1_title ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.service_1_title}
                                    </div>
                                ) : null}
                            </div>{" "}
                            <div className="form-group col-md-6">
                                <label className="form-label">
                                    Service 2 Title <span className="text-danger">*</span>
                                </label>
                                <input
                                    className="form-control"
                                    name="service_2_title"
                                    type="text"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.service_2_title}
                                    placeholder="Enter  service 2 title"
                                />
                                {props.touched.service_2_title &&
                                    props.errors.service_2_title ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.service_2_title}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group col-md-6">
                                <label className="form-label">Service 1 Description <span className="text-danger">*</span></label>
                                
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
                                    value={props.values.service_1_description}
                                    onEditorChange={(e) =>
                                        props.setFieldValue("service_1_description", e)
                                    }
                                />
                                {props.touched.service_1_description &&
                                    props.errors.service_1_description ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.service_1_description}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group col-md-6">
                                <label className="form-label">Service 2 Description <span className="text-danger">*</span></label>
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
                                    value={props.values.service_2_description}
                                    onEditorChange={(e) =>
                                        props.setFieldValue("service_2_description", e)
                                    }
                                />
                                {props.touched.service_2_description &&
                                    props.errors.service_2_description ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.service_2_description}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group col-md-6">
                                <label className="form-label">
                                    Service 3 Title <span className="text-danger">*</span>
                                </label>
                                <input
                                    className="form-control"
                                    name="service_3_title"
                                    type="text"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.service_3_title}
                                    placeholder="Enter service 2 title"
                                />
                                {props.touched.service_3_title &&
                                    props.errors.service_3_title ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.service_3_title}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group col-md-6">
                                <label className="form-label">Service 3 Description <span className="text-danger">*</span></label>
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
                                    value={props.values.service_3_description}
                                    onEditorChange={(e) =>
                                        props.setFieldValue("service_3_description", e)
                                    }
                                />
                                {props.touched.service_3_description &&
                                    props.touched.service_3_description &&
                                    props.errors.service_3_description ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.service_3_description}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <div className="form-group col-md-12 text-end">
                            <button className="btn btn-primary me-2" type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
          <ToastContainer autoClose={1000} />
        </>
    );
}
