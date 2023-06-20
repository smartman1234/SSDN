import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import axios from "axios";
import Select from "react-select";
import ELearningCategoryService from "../../../Services/ELearningService/ELearningService";

export default function ELearningCreateCategory() {
    const [allCategoryList, setAllCategoryList] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const serve = new ELearningCategoryService();
    const [parent, setCategory] = useState([]);
    const [values, setValues] = useState({
        heading: "",
        name: "",
        slug: "",
        parent: "",
        meta_title: "",
        meta_keyword: "",
        meta_description: "",
        breadcrumb: "",
    });

    const VoucherSchema = Yup.object().shape({
        heading: Yup.string().required("Required"),
        name: Yup.string().required("Required"),
        slug: Yup.string().required("Required"),
        meta_title: Yup.string().required("Required"),
        meta_keyword: Yup.string().required("Required"),
        meta_description: Yup.string().required("Required"),
    });

    const onSubmit = async (values) => {
        const formData = new FormData();
        if (values.id) {
            formData.set("id", values.id);
        }
        formData.set("name", values.name);
        formData.set("slug", values.slug.replaceAll(" ", "-").toLowerCase());
        formData.set("parent", values.parent);
        formData.set("heading", values.heading);
        formData.set("meta_title", values.meta_title);
        formData.set("meta_keyword", values.meta_keyword);
        formData.set("meta_description", values.meta_description);
        formData.set("breadcrumb", values.breadcrumb);
        const config = {
            headers: {
                content: "multipart/form-data",
                AUTHTOKEN: window.user?.data?.auth_token,
            },
        };
        if (values.id) {
            try {
                const response = await axios.post(
                    process.env.REACT_APP_API_BASEURL + `e-learning/update-category`,
                    formData,
                    config
                );
                if (response.data?.status === "success") {
                    toast.success("Record update successfully");
                    setTimeout(() => {
                        navigate("/e-learning-category");
                    }, [1000]);
                } else {
                    toast.error(response.data?.message);
                }
            } catch (err) {
                throw err;
            }
        } else {
            axios
                .post(
                    process.env.REACT_APP_API_BASEURL + "e-learning/category-create",
                    formData,
                    config
                )
                .then((res) => {
                    if (res.data?.status === "success") {
                        toast.success("Record created successfully");
                        setTimeout(() => {
                            navigate("/e-learning-category");
                        }, [1000]);
                    } else if (res.data?.status === "fail") {
                        toast.error("Name has been already taken !");
                    }
                })
                .catch((err) => {
                    throw err;
                });
        }
    };

    const getDepartmentDetail = async () => {
        try {
            let response = await serve.edit(params.id);
            if (response.status === "success") {
                setValues({
                    id: response.data.id,
                    heading: response.data.heading,
                    name: response.data.name,
                    parent: response.data.parent_category,
                    slug: response.data.slug,
                    meta_title: response.data.meta_title,
                    meta_keyword: response.data.meta_keyword,
                    meta_description: response.data.meta_description,
                    breadcrumb: response.data.breadcrumb ? response.data.breadcrumb : "",
                });
            } else {
            }
        } catch (err) {
            throw err;
        }
    };

    useEffect(() => {
        if (params.id) {
            getDepartmentDetail();
        }
    }, []);

    const name = (
        <Link to="/course-category" className="btn btn-primary">
            Back
        </Link>
    );

    return (
        <>
            <div className="page-body">
                <Breadcrumb
                    heading={params.id ? "Edit Course Category" : "Add Course Category"}
                    add={name}
                />
                <div className="container-fluid support-ticket">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>
                                        {params.id ? "Edit Course Category" : "Add Course Category"}
                                    </h5>
                                </div>
                                <Formik
                                    initialValues={values}
                                    validationSchema={VoucherSchema}
                                    onSubmit={onSubmit}
                                    enableReinitialize={true}
                                >
                                    {(props) => (
                                        <form className="" onSubmit={props.handleSubmit}>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="form-group col-md-12">
                                                        <label className="form-label">
                                                            Heading <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            name="heading"
                                                            type="text"
                                                            value={props.values.heading}
                                                            onChange={props.handleChange}
                                                            onBlur={props.handleBlur}
                                                            placeholder="Enter category heading"
                                                        />
                                                        {props.touched.heading && props.errors.heading ? (
                                                            <div className="formik-errors bg-error">
                                                                {props.errors.heading}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label className="form-label">
                                                            Name <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            value={props.values.name}
                                                            onChange={(event) => {
                                                                props.setFieldValue("name", event.target.value);
                                                                props.setFieldValue("slug", event.target.value);
                                                            }}
                                                            onBlur={props.handleBlur}
                                                            name="name"
                                                            type="text"
                                                            placeholder="Enter category name"
                                                        />
                                                        {props.touched.name && props.errors.name ? (
                                                            <div className="formik-errors bg-error">
                                                                {props.errors.name}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label className="form-label">
                                                            Slug <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            value={props.values.slug
                                                                .replaceAll(" ", "-")
                                                                .toLowerCase()}
                                                            onChange={props.handleChange}
                                                            onBlur={props.handleBlur}
                                                            name="slug"
                                                            type="text"
                                                            placeholder="Enter category slug"
                                                        />
                                                        {props.touched.slug && props.errors.slug ? (
                                                            <div className="formik-errors bg-error">
                                                                {props.errors.slug}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        {" "}
                                                        <label className="form-label">
                                                            Meta Tag Title <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            value={props.values.meta_title}
                                                            onChange={props.handleChange}
                                                            onBlur={props.handleBlur}
                                                            name="meta_title"
                                                            type="text"
                                                            placeholder="Enter meta tag title"
                                                        />
                                                        {props.touched.meta_title &&
                                                            props.errors.meta_title ? (
                                                            <div className="formik-errors bg-error">
                                                                {props.errors.meta_title}
                                                            </div>
                                                        ) : null}
                                                    </div>{" "}
                                                    <div className="form-group col-md-6">
                                                        <label className="form-label">
                                                            Meta Tag Keywords <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            value={props.values.meta_keyword}
                                                            onChange={props.handleChange}
                                                            onBlur={props.handleBlur}
                                                            name="meta_keyword"
                                                            type="text"
                                                            placeholder="Enter meta tag keywords"
                                                        />
                                                        {props.touched.meta_keyword &&
                                                            props.errors.meta_keyword ? (
                                                            <div className="formik-errors bg-error">
                                                                {props.errors.meta_keyword}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label className="form-label">
                                                            Meta Tag Description <span className="text-danger">*</span>
                                                        </label>
                                                        <textarea
                                                            className="form-control"
                                                            value={props.values.meta_description}
                                                            onChange={props.handleChange}
                                                            onBlur={props.handleBlur}
                                                            name="meta_description"
                                                            placeholder="Enter  meta tag description"
                                                        ></textarea>
                                                        {props.touched.meta_description &&
                                                            props.errors.meta_description ? (
                                                            <div className="formik-errors bg-error">
                                                                {props.errors.meta_description}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label className="form-label">
                                                            Breadcrumb / Event Scheme Description
                                                        </label>
                                                        <textarea
                                                            className="form-control"
                                                            value={props.values.breadcrumb}
                                                            onChange={props.handleChange}
                                                            onBlur={props.handleBlur}
                                                            name="breadcrumb"
                                                            placeholder="Enter  Breadcrumb / Event Scheme description"
                                                        ></textarea>
                                                    </div>
                                                    <div className="card-footer text-end">
                                                        <button
                                                            className="btn btn-primary"
                                                            type="submit"
                                                        >
                                                            Submit
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

          <ToastContainer autoClose={1000} />
        </>
    );
}
