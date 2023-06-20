import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, FieldArray } from "formik";
import CourseService from "../../../Services/CourseService/CourseService";
import CourseCourseService from "../../../Services/CourseService/CourseCourseService";
import Faq from "./Faq";
import AnalyticalsSkill from "./AnalyticalsSkill";

const ELearningCreateCourse = ({
    props,
    allCategoryList,
    values,
    categoryLists,
    setBlogForm,
}) => {
    const [trainingMode, setTrainingMode] = useState([]);
    const [realtedCourseList, setRelatedCourse] = useState([]);
    const [image, setImage] = useState("");
    const [demoImage, setDemoImage] = useState("");
    const [thumbImage, setThumbImage] = useState("");
    const [ogImage, setOgImage] = useState("");
    const courseServe = new CourseCourseService();
    const [showQuestion, setShowQuestion] = useState(0);
    const [discount, setDiscount] = useState(false);

    const InrDiscount = () => {
        setDiscount(true);
    };

    const PriceHandle = (i) => {
        setShowQuestion(i);
    };

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

    useEffect(() => {
        relatedCourse();
    }, []);

    const relatedCourse = async () => {
        try {
            let response = await courseServe.realtedList();
            if (response) {
                const arr = response.data.map((v) => {
                    return { value: v.value, label: v.label };
                });
                setRelatedCourse(arr);
            }
        } catch (err) {
            throw err;
        }
    };

    const mediaImagehandle = (e, name) => {
        
        let { file } = e.target.files[0];

        file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        if (name === "certificate_demo_image") {
            var reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = function (e) {
                var image = new Image();
                image.src = e.target.result;
                image.onload = function () {
                    var height = this.height;
                    var width = this.width;
                    if (height > 360 || width > 500) {
                        alert(
                            "Height should not exceed from 360px and width should not exceed from 500 px"
                        );
                    } else if (height < 340 || width < 450) {
                        alert(
                            "Height should not less than from 340px and width should not less than from 450 px"
                        );
                    } else {
                        getBase64(file)
                            .then((result) => {
                                file["base64"] = result;

                                setDemoImage(result);
                            })
                            .catch((err) => {
                                
                            });
                    }
                };
            };
        } else {
            getBase64(file)
                .then((result) => {
                    file["base64"] = result;
                    if (name === "media") {
                        setImage(result);
                    } else if (name === "thumb_image") {
                        setThumbImage(result);
                    } else if (name === "og_image") {
                        setOgImage(result);
                    }
                })
                .catch((err) => {
                    
                });
        }
    };

    return (
        <>
            <form className="" onSubmit={props.handleSubmit}>
                <div className="row">
                    { }
                    <div className="form-group col-md-6">
                        <label className="form-label">
                            Category <span className="text-danger">*</span>
                        </label>
                        <Select
                            onChange={(value) => props.setFieldValue("category_id", value)}
                            options={categoryLists}
                            value={props.values.category_id}
                            name="category_id"
                        />
                        {props.touched.category_id && props.errors.category_id ? (
                            <div className="formik-errors bg-error">
                                {props.errors.category_id}
                            </div>
                        ) : null}
                    </div>
                    <div className="form-group col-md-6">
                        <label className="form-label">
                            Name <span className="text-danger">*</span>
                        </label>
                        <input
                            className="form-control"
                            name="name"
                            onChange={(event) => {
                                props.setFieldValue("name", event.target.value);
                                props.setFieldValue("slug", event.target.value);
                            }}
                            value={props.values.name}
                            type="text"
                            placeholder="Enter course name"
                        />
                        {props.touched.name && props.errors.name ? (
                            <div className="formik-errors bg-error">{props.errors.name}</div>
                        ) : null}
                    </div>
                    <div className="form-group col-md-6">
                        <label className="form-label">
                            Heading <span className="text-danger">*</span>
                        </label>
                        <input
                            className="form-control"
                            name="heading"
                            onChange={(event) => {
                                props.setFieldValue("heading", event.target.value);
                            }}
                            value={props.values.heading}
                            type="text"
                            placeholder="Enter course name"
                        />
                        {props.touched.heading && props.errors.heading ? (
                            <div className="formik-errors bg-error">
                                {props.errors.heading}
                            </div>
                        ) : null}
                    </div>
                    <div className="form-group col-md-6">
                        <label className="form-label">
                            Slug <span className="text-danger">*</span>
                        </label>
                        <input
                            className="form-control"
                            name="slug"
                            value={
                                props.values.slug
                                    ? props.values.slug.trim().replaceAll(" ", "-").toLowerCase()
                                    : ""
                            }
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            type="text"
                            placeholder="Enter slug"
                        />
                        {props.touched.slug && props.errors.slug ? (
                            <div className="formik-errors bg-error">{props.errors.slug}</div>
                        ) : null}
                    </div>
                    <div className="form-group col-md-6">
                        <label className="form-label">Course Level <span className="text-danger">*</span></label>
                        <select
                            className="form-select"
                            onChange={props.handleChange}
                            value={props.values.course_level}
                            name="course_level"
                        >
                            <option value="" selected={false}>
                                Select level
                            </option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="expert">Expert</option>
                        </select>{" "}
                        {props.touched.course_level && props.errors.course_level ? (
                            <div className="formik-errors bg-error">
                                {props.errors.course_level}
                            </div>
                        ) : null}
                    </div>
                    <div className="form-group col-md-6">
                        <label className="form-label">Language <span className="text-danger">*</span></label>
                        <input
                            className="form-control"
                            name="language"
                            type="text"
                            value={props.values?.language}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            placeholder="Enter about title"
                        />
                        {props.touched.language && props.errors.language ? (
                            <div className="formik-errors bg-error">
                                {props.errors.language}
                            </div>
                        ) : null}
                    </div>
                    <div className="form-group col-md-6">
                        <label className="form-label">
                            Certificate Required <span className="text-danger">*</span>
                        </label>
                        <select
                            className="form-select"
                            onChange={props.handleChange}
                            value={props.values.is_certificate}
                            name="is_certificate"
                        >
                            <option value="" selected={false}>
                                Select Yes or No
                            </option>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                        </select>
                        {props.touched.is_certificate && props.errors.is_certificate ? (
                            <div className="formik-errors bg-error">
                                {props.errors.is_certificate}
                            </div>
                        ) : null}
                    </div>
                    <div className="form-group col-md-6">
                        <label className="form-label">
                            Instructor <span className="text-danger">*</span>
                        </label>
                        <input
                            className="form-control"
                            name="instructor"
                            value={props.values?.instructor}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            type="text"
                            placeholder="Enter duration"
                        />
                        {props.touched.instructor && props.errors.instructor ? (
                            <div className="formik-errors bg-error">
                                {props.errors.instructor}
                            </div>
                        ) : null}
                    </div>
                    <h5>Course Description</h5>
                    <hr></hr>
                    <div className="form-group col-md-4">
                        <label className="form-label">
                            Option 1 <span className="text-danger">*</span>
                        </label>
                        <input
                            className="form-control"
                            value={props.values?.description_option1}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            name="description_option1"
                            type="text"
                            placeholder="enter option "
                        />
                        {props.touched.description_option1 &&
                            props.errors.description_option1 ? (
                            <div className="formik-errors bg-error">
                                {props.errors.description_option1}
                            </div>
                        ) : null}
                    </div>
                    <div className="form-group col-md-4">
                        <label className="form-label">
                            Option 2 <span className="text-danger">*</span>
                        </label>
                        <input
                            className="form-control"
                            value={props.values?.description_option2}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            name="description_option2"
                            type="text"
                            placeholder="enter option "
                        />
                        {props.touched.description_option2 &&
                            props.errors.description_option2 ? (
                            <div className="formik-errors bg-error">
                                {props.errors.description_option2}
                            </div>
                        ) : null}
                    </div>{" "}
                    <div className="form-group col-md-4">
                        <label className="form-label">
                            Option 3 <span className="text-danger">*</span>
                        </label>
                        <input
                            className="form-control"
                            value={props.values?.description_option3}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            name="description_option3"
                            type="text"
                            placeholder="enter option "
                        />
                        {props.touched.description_option3 &&
                            props.errors.description_option3 ? (
                            <div className="formik-errors bg-error">
                                {props.errors.description_option3}
                            </div>
                        ) : null}
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="contact" className="form-label">
                            Price Type <span className="text-danger">*</span>
                        </label>
                        <div className="col">
                            <div className="form-group m-t-10 m-checkbox-inline mb-0 custom-radio-ml">
                                <div
                                    className="radio radio-primary"
                                    onClick={() => PriceHandle(1)}
                                >
                                    <input
                                        id="free"
                                        type="radio"
                                        name="price_type"
                                        value="free"
                                        onChange={props.handleChange}
                                        checked={props.values.price_type === "free"}
                                    />
                                    <label className="form-label mb-0" htmlFor="free">
                                        Free
                                    </label>
                                </div>
                                <div
                                    className="radio radio-primary"
                                    onClick={() => PriceHandle(2)}
                                >
                                    <input
                                        id="paid"
                                        type="radio"
                                        name="price_type"
                                        checked={props.values.price_type === "paid"}
                                        onChange={props.handleChange}
                                        value="paid"
                                    />
                                    <label className="form-label mb-0" htmlFor="paid">
                                        Paid
                                    </label>
                                </div>
                            </div>
                            {props.touched.price_type && props.errors.price_type ? (
                                <div className="formik-errors bg-error">
                                    {props.errors.price_type}
                                </div>
                            ) : null}
                        </div>
                    </div>
                    {showQuestion === 2 || props.values.price_type === "paid" ? (
                        <>
                            <div className="form-group col-md-3">
                                <label className="col-form-label">
                                    Actual Price (INR) <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="actualprice"
                                    name="inr_price"
                                    placeholder="Actual price in INR"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.inr_price}
                                />
                                {props.touched.inr_price && props.errors.inr_price ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.inr_price}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="contact">
                                    Discount (INR) <span className="text-danger">*</span>
                                </label>
                                <div className="col">
                                    <div className="form-group m-t-10 m-checkbox-inline mb-0 custom-radio-ml">
                                        <div
                                            className="radio radio-primary"
                                            onClick={InrDiscount}
                                        >
                                            <input
                                                id="is_inr"
                                                type="radio"
                                                name="is_inr_discount"
                                                value="1"
                                                checked={props.values.is_inr_discount == "1"}
                                                onChange={props.handleChange}
                                            />
                                            <label className="mb-0" htmlFor="is_inr">
                                                Yes
                                            </label>
                                        </div>
                                        <div
                                            className="radio radio-primary"
                                            onClick={() => setDiscount(false)}
                                        >
                                            <input
                                                id="inr_discount"
                                                type="radio"
                                                name="is_inr_discount"
                                                onChange={props.handleChange}
                                                checked={props.values.is_inr_discount == "0"}
                                                value="0"
                                            />
                                            <label className="mb-0" htmlFor="inr_discount">
                                                No
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                {props.touched.is_inr_discount &&
                                    props.errors.is_inr_discount ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.is_inr_discount}
                                    </div>
                                ) : null}
                            </div>
                            {(discount || props.values.is_inr_discount == "1") && (
                                <div className="form-group col-md-3">
                                    <label className="col-form-label">INR Discount (%)</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="actualprice"
                                        name="inr_discount_price"
                                        placeholder="INR Discount (%)"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.inr_discount_price}
                                    />
                                    {props.touched.inr_discount_price &&
                                        props.errors.inr_discount_price ? (
                                        <div className="formik-errors bg-error">
                                            {props.errors.inr_discount_price}
                                        </div>
                                    ) : null}
                                </div>
                            )}
                        </>
                    ) : null}
                    <div className="row p-0">
                        <div
                            className={
                                props.values.media_type === "image"
                                    ? "form-group col-md-4"
                                    : "form-group col-md-6"
                            }
                        >
                            <label className="form-label">
                                Media Type <span className="text-danger">*</span>
                            </label>
                            <select
                                className="form-select"
                                onChange={props.handleChange}
                                value={props.values.media_type}
                                name="media_type"
                            >
                                <option value="" select="false">
                                    Select type
                                </option>
                                <option value="video">Video</option>
                                <option value="image">Image</option>
                            </select>
                            {props.touched.media_type && props.errors.media_type ? (
                                <div className="formik-errors bg-error">
                                    {props.errors.media_type}
                                </div>
                            ) : null}
                        </div>
                        {props.values.media_type === "image" && (
                            <>
                                <div
                                    className={
                                        props.values.media
                                            ? "form-group col-md-3"
                                            : "form-group col-md-4"
                                    }
                                >
                                    <label className="form-label">Image <span className="text-danger">*</span></label>
                                    <input
                                        className="form-control"
                                        name="media"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            props.setFieldValue("media", e.target.files[0]);
                                            mediaImagehandle(e, "media");
                                        }}
                                        onBlur={props.handleBlur}
                                        placeholder="Enter course overview heading"
                                    />
                                    {props.touched.media && props.errors.media ? (
                                        <div className="formik-errors bg-error">
                                            {props.errors.media}
                                        </div>
                                    ) : null}
                                </div>
                                {(image || props.values.media) && (
                                    <div
                                        className="input-group-append col-md-2"
                                        style={{
                                            top: "25px",
                                            paddingLeft: "0px",
                                            height: "49px",
                                            width: "55px",
                                        }}
                                    >
                                        {(image || props.values.media) && (
                                            <img
                                                src={image || props.values.media}
                                                alt="image"
                                                style={{
                                                    padding: "0",
                                                    width: "100%",
                                                    height: "72%",
                                                }}
                                            />
                                        )}
                                    </div>
                                )}
                                <div className="form-group col-md-4">
                                    <label className="form-label">Image Alt Tag <span className="text-danger">*</span></label>
                                    <input
                                        className="form-control"
                                        name="image_alt_tag"
                                        type="text"
                                        value={props.values?.image_alt_tag}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        placeholder="Enter image alt tag"
                                    />
                                    {props.touched.image_alt_tag && props.errors.image_alt_tag ? (
                                        <div className="formik-errors bg-error">
                                            {props.errors.image_alt_tag}
                                        </div>
                                    ) : null}
                                </div>
                            </>
                        )}
                        {props.values.media_type === "video" && (
                            <>
                                <div className="form-group col-md-6">
                                    <label className="form-label">Video Type <span className="text-danger">*</span></label>
                                    <select
                                        className="form-select"
                                        name="video_type"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.video_type}
                                    >
                                        <option value="" select="false">
                                            Select type
                                        </option>
                                        <option value="media_file">Media file</option>
                                        <option value="link">Link</option>
                                    </select>
                                    {props.touched.video_type && props.errors.video_type ? (
                                        <div className="formik-errors bg-error">
                                            {props.errors.video_type}
                                        </div>
                                    ) : null}
                                </div>

                                {props.values.video_type === "media_file" && (
                                    <>
                                        <div
                                            className={
                                                props.values.media
                                                    ? "form-group col-md-5"
                                                    : "form-group col-md-6"
                                            }
                                        >
                                            <label className="form-label">Media <span className="text-danger">*</span></label>
                                            <input
                                                className="form-control"
                                                name="media"
                                                type="file"
                                                accept="video/*"
                                                onChange={(e) => {
                                                    
                                                    props.setFieldValue("media", e.target.files[0]);
                                                }}
                                                onBlur={props.handleBlur}
                                            />
                                            {props.touched.media && props.errors.media ? (
                                                <div className="formik-errors bg-error">
                                                    {props.errors.media}
                                                </div>
                                            ) : null}
                                        </div>
                                        {props.values.media && (
                                            <div
                                                className="input-group-append col-md-1"
                                                style={{
                                                    top: "25px",
                                                    paddingLeft: "0px",
                                                    height: "49px",
                                                    width: "55px",
                                                }}
                                            >
                                                {props.values.media && (
                                                    <img
                                                        src="/assets/images/video-icon.webp"
                                                        alt="image"
                                                        style={{
                                                            padding: "0",
                                                            width: "100%",
                                                            height: "72%",
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        )}
                                        <div
                                            className={
                                                props.values.thumb_image
                                                    ? "form-group col-md-5"
                                                    : "form-group col-md-6"
                                            }
                                        >
                                            <label className="form-label">Thumb Image <span className="text-danger">*</span></label>
                                            <input
                                                className="form-control"
                                                name="thumb_image"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    mediaImagehandle(e, "thumb_image");
                                                    props.setFieldValue("thumb_image", e.target.files[0]);
                                                }}
                                                onBlur={props.handleBlur}
                                                placeholder="Enter course overview heading"
                                            />
                                            {props.touched.thumb_image && props.errors.thumb_image ? (
                                                <div className="formik-errors bg-error">
                                                    {props.errors.thumb_image}
                                                </div>
                                            ) : null}
                                        </div>
                                        {(thumbImage || props.values.thumb_image) && (
                                            <div
                                                className="input-group-append col-md-1"
                                                style={{
                                                    top: "25px",
                                                    paddingLeft: "0px",
                                                    height: "49px",
                                                    width: "55px",
                                                }}
                                            >
                                                {
                                                    <img
                                                        src={thumbImage || props.values.thumb_image}
                                                        alt="image"
                                                        style={{
                                                            padding: "0",
                                                            width: "100%",
                                                            height: "72%",
                                                        }}
                                                    />
                                                }
                                            </div>
                                        )}
                                    </>
                                )}
                                {props.values.video_type === "link" && (
                                    <>
                                        <div className="form-group col-md-6">
                                            <label className="form-label">Media</label>
                                            <input
                                                className="form-control"
                                                name="media"
                                                type="text"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.media}
                                            />
                                            {props.touched.media && props.errors.media ? (
                                                <div className="formik-errors bg-error">
                                                    {props.errors.media}
                                                </div>
                                            ) : null}
                                        </div>

                                        <div
                                            className={
                                                props.values.thumb_image
                                                    ? "form-group col-md-5"
                                                    : "form-group col-md-6"
                                            }
                                        >
                                            <label className="form-label">Thumb Image</label>
                                            <input
                                                className="form-control"
                                                name="thumb_image"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    mediaImagehandle(e, "thumb_image");
                                                    props.setFieldValue("thumb_image", e.target.files[0]);
                                                }}
                                                onBlur={props.handleBlur}
                                                placeholder="Enter course overview heading"
                                            />
                                            {props.touched.thumb_image && props.errors.thumb_image ? (
                                                <div className="formik-errors bg-error">
                                                    {props.errors.thumb_image}
                                                </div>
                                            ) : null}
                                        </div>
                                        {(thumbImage || props.values.thumb_image) && (
                                            <div
                                                className="input-group-append col-md-1"
                                                style={{
                                                    top: "25px",
                                                    paddingLeft: "0px",
                                                    height: "49px",
                                                    width: "55px",
                                                }}
                                            >
                                                {
                                                    <img
                                                        src={thumbImage || props.values.thumb_image}
                                                        alt="image"
                                                        style={{
                                                            padding: "0",
                                                            width: "100%",
                                                            height: "72%",
                                                        }}
                                                    />
                                                }
                                            </div>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </div>
                    {props.values.is_certificate === "1" && (
                        <>
                            <div className="form-group col-md-6">
                                <label className="form-label">
                                    Certificate Name <span className="text-danger">*</span>
                                </label>
                                <input
                                    className="form-control"
                                    name="certificate_name"
                                    value={props.values?.certificate_name}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    type="text"
                                    placeholder="Enter duration"
                                />
                                {props.touched.certificate_name &&
                                    props.errors.certificate_name ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.certificate_name}
                                    </div>
                                ) : null}
                            </div>
                        </>
                    )}{" "}
                    <div className="form-group col-md-6">
                        <label className="form-label">
                            Duration <span className="text-danger">*</span>
                        </label>
                        <input
                            className="form-control"
                            name="duration"
                            value={props.values?.duration}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            type="number"
                            placeholder="Enter duration"
                        />
                        {props.touched.duration && props.errors.duration ? (
                            <div className="formik-errors bg-error">
                                {props.errors.duration}
                            </div>
                        ) : null}
                    </div>
                    <div className="form-group col-md-6">
                        <label className="form-label">
                            Duration Type <span className="text-danger">*</span>
                        </label>
                        <select
                            className="form-select"
                            onChange={props.handleChange}
                            value={props.values.duration_time}
                            name="duration_time"
                        >
                            <option value="" select="false">
                                Select type
                            </option>
                            <option value="hour">Hours(s)</option>
                            <option value="day">Day(s)</option>
                            <option value="week">Week(s)</option>
                            <option value="month">Month(s)</option>
                        </select>
                        {props.touched.duration_time &&
                            props.errors.duration_time ? (
                            <div className="formik-errors bg-error">
                                {props.errors.duration_time}
                            </div>
                        ) : null}
                    </div>
                    <div className="form-group col-md-6">
                        <label className="form-label">
                            Certificate Title <span className="text-danger">*</span>
                        </label>
                        <input
                            className="form-control"
                            name="certification_title"
                            value={props.values?.certification_title}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            type="text"
                            placeholder="Enter duration"
                        />
                        {props.touched.certification_title &&
                            props.errors.certification_title ? (
                            <div className="formik-errors bg-error">
                                {props.errors.certification_title}
                            </div>
                        ) : null}
                    </div>{" "}
                    <div
                        className={
                            demoImage || props.values.certificate_demo_image
                                ? "form-group col-md-5"
                                : "form-group col-md-6"
                        }
                    >
                        <label className="form-label">Certificate Demo Image <span className="text-danger">*</span></label>
                        <input
                            className="form-control"
                            name="certificate_demo_image"
                            type="file"
                            onChange={(e) => {
                                props.setFieldValue(
                                    "certificate_demo_image",
                                    e.target.files[0]
                                );
                                mediaImagehandle(e, "certificate_demo_image");
                            }}
                            onBlur={props.handleBlur}
                        />
                        {props.touched.certificate_demo_image &&
                            props.errors.certificate_demo_image ? (
                            <div className="formik-errors bg-error">
                                {props.errors.certificate_demo_image}
                            </div>
                        ) : null}
                    </div>
                    {(demoImage || props.values.certificate_demo_image) && (
                        <div
                            className="input-group-append col-md-2"
                            style={{
                                top: "25px",
                                paddingLeft: "0px",
                                height: "49px",
                                width: "55px",
                            }}
                        >
                            {(demoImage || props.values.certificate_demo_image) && (
                                <img
                                    src={demoImage || props.values.certificate_demo_image}
                                    alt="image"
                                    style={{
                                        padding: "0",
                                        width: "100%",
                                        height: "72%",
                                    }}
                                />
                            )}
                        </div>
                    )}{" "}
                    <div className="form-group col-md-6">
                        <label className="form-label">
                            Certificate Overview <span className="text-danger">*</span>
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
                            value={props.values.certificate_overview}
                            onEditorChange={(e) =>
                                props.setFieldValue("certificate_overview", e)
                            }
                        />
                        {props.touched.certificate_overview &&
                            props.errors.certificate_overview ? (
                            <div className="formik-errors bg-error">
                                {props.errors.certificate_overview}
                            </div>
                        ) : null}
                    </div>
                    <div className="form-group col-md-6">
                        <div className="row p-0">
                            <div className="form-group col-md-12 p-0">
                                {" "}
                                <label className="form-label">Overview Title <span className="text-danger">*</span></label>
                                <input
                                    className="form-control"
                                    name="overview_title"
                                    type="text"
                                    value={props.values?.overview_title}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    placeholder="Enter course code"
                                />
                                {props.touched.overview_title && props.errors.overview_title ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.overview_title}
                                    </div>
                                ) : null}
                            </div>{" "}
                            <div className="form-group col-md-12 p-0">
                                <label className="form-label"> Overview <span className="text-danger">*</span></label>
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
                                    value={props.values.overview}
                                    onEditorChange={(e) => props.setFieldValue("overview", e)}
                                />
                                {props.touched.overview && props.errors.overview ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.overview}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>{" "}
                    <div className="form-group col-md-6">
                        <label className="form-label">
                            Related Courses <span className="text-danger">*</span>
                        </label>
                        <Select
                            onChange={(value) => {
                                props.setFieldValue("related_course", value);
                            }}
                            options={realtedCourseList}
                            value={props.values.related_course}
                            name="related_course"
                            isMulti
                        />
                        {props.touched.related_course && props.errors.related_course ? (
                            <div className="formik-errors bg-error">
                                {props.errors.related_course}
                            </div>
                        ) : null}
                    </div>
                    <div className="form-group col-md-6">
                        <label className="form-label">Analytics Skill Title <span className="text-danger">*</span></label>
                        
                        <input
                            className="form-control"
                            name="analytic_skil_title"
                            type="text"
                            value={props.values?.analytic_skil_title}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            placeholder="Enter analytics skill title"
                        />{" "}
                        {props.touched.analytic_skil_title &&
                            props.errors.analytic_skil_title ? (
                            <div className="formik-errors bg-error">
                                {props.errors.analytic_skil_title}
                            </div>
                        ) : null}
                    </div>{" "}
                    <AnalyticalsSkill props={props} />
                    <Faq props={props} />
                    <h5>Meta Tag Details</h5>
                    <hr></hr>
                    <div className="form-group col-md-6">
                        <label className="form-label">
                            Meta Tag Title <span className="text-danger">*</span>
                        </label>
                        <input
                            className="form-control"
                            value={props.values?.meta_title}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            name="meta_title"
                            type="text"
                            placeholder="Enter meta tag title"
                        />
                        {props.touched.meta_title && props.errors.meta_title ? (
                            <div className="formik-errors bg-error">
                                {props.errors.meta_title}
                            </div>
                        ) : null}
                    </div>
                    <div className="form-group col-md-6">
                        <label className="form-label">
                            Meta Tag Keywords <span className="text-danger">*</span>
                        </label>
                        <input
                            className="form-control"
                            name="meta_keyword"
                            value={props.values?.meta_keyword}
                            onChange={props.handleChange}
                            type="text"
                            placeholder="Enter meta tag keywords"
                        />
                        {props.touched.meta_keyword && props.errors.meta_keyword ? (
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
                            name="meta_description"
                            value={props.values?.meta_description}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            placeholder="Enter meta tag description"
                        ></textarea>
                        {props.touched.meta_description && props.errors.meta_description ? (
                            <div className="formik-errors bg-error">
                                {props.errors.meta_description}
                            </div>
                        ) : null}
                    </div>
                    <div className="form-group col-md-6">
                        <label className="form-label">BreadCrumb Schema</label>
                        <textarea
                            className="form-control"
                            name="breadcrumb"
                            value={props.values?.breadcrumb}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            placeholder="Enter breadcrumb"
                        ></textarea>
                    </div>
                    <h5>OG Details</h5>
                    <hr></hr>
                    <div className="form-group col-md-6">
                        <label className="form-label">OG Title</label>
                        <input
                            className="form-control"
                            name="og_title"
                            value={props.values?.og_title}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            type="text"
                            placeholder="Enter og title"
                        />
                        {props.touched.og_title && props.errors.og_title ? (
                            <div className="formik-errors bg-error">
                                {props.errors.og_title}
                            </div>
                        ) : null}
                    </div>
                    <div className="form-group col-md-6">
                        <label className="form-label">OG URL</label>
                        <input
                            className="form-control"
                            value={props.values?.og_url}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            name="og_url"
                            type="text"
                            placeholder="Enter og url"
                        />
                        {props.touched.og_url && props.errors.og_url ? (
                            <div className="formik-errors bg-error">
                                {props.errors.og_url}
                            </div>
                        ) : null}
                    </div>
                    <div className="form-group col-md-6">
                        <label className="form-label">OG Description</label>
                        <textarea
                            className="form-control"
                            value={props.values?.og_description}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            name="og_description"
                            placeholder="Enter og description"
                        />
                        {props.touched.og_description && props.errors.og_description ? (
                            <div className="formik-errors bg-error">
                                {props.errors.og_description}
                            </div>
                        ) : null}
                    </div>
                    <div
                        className={
                            props.values.og_image
                                ? "form-group col-md-5"
                                : "form-group col-md-6"
                        }
                    >
                        <label className="form-label">OG Image</label>
                        <input
                            className="form-control"
                            name="og_image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                props.setFieldValue("og_image", e.target.files[0]);
                                mediaImagehandle(e, "og_image");
                            }}
                        />
                        {props.touched.og_image && props.errors.og_image ? (
                            <div className="formik-errors bg-error">
                                {props.errors.og_image}
                            </div>
                        ) : null}
                    </div>
                    {(ogImage || props.values.og_image) && (
                        <div
                            className="input-group-append col-md-1"
                            style={{
                                top: "25px",
                                paddingLeft: "14px",
                                height: "49px",
                                width: "88px",
                            }}
                        >
                            {(ogImage || props.values.og_image) && (
                                <img
                                    src={ogImage || props.values.og_image}
                                    alt="image"
                                    style={{
                                        padding: "0",
                                        width: "100%",
                                        height: "72%",
                                    }}
                                />
                            )}
                        </div>
                    )}
                    <div className="card-footer text-end">
                        <button className="btn btn-primary" type="submit">
                            Submit
                        </button>
                    </div>
                </div>
              <ToastContainer autoClose={1000} />
            </form >
        </>
    );
};

export default ELearningCreateCourse;
