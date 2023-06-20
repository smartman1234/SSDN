import React, { useEffect, useState, useMemo } from "react";
import { Editor } from "@tinymce/tinymce-react";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import StaticpageService from "../../../Services/StaticPageService/StaticePageService";
import Students from "./Students";
import Accommodations from "./Accomodations";
import Country from "./Country";

export default function Internationals({ pageName, slug }) {
    const [flag, setFlag] = useState("");
    const [imageUrl, setImageurl] = useState("");

    const staticeService = new StaticpageService();
    const [image, setImage] = useState();
    const [TrainedImage, setTrainedImage] = useState();
    const [finishImage, setFinishImage] = useState();
    const [facilityImage, setFacilityImage] = useState();
    const [card1Image, setCard1Image] = useState();
    const [card2Image, setCard2Image] = useState();
    const [values, setValues] = useState({
        page_name: "",
        page_slug: "",
        help_desk: "",
        visa_on_arrival: "",
        country_visa: [{ country: "", flag: "" }],
        our_learner_description: "",
        students: [
            { name: "", country: "", course: "", image: "", image_alt_tag: "" },
        ],
        our_goal: "",
        get_trained: "",
        get_trained_image: "",
        get_trained_image_alt_tag: "",
        accomodation_description: "",
        accomodations: [
            {
                hotel_name: "",
                avg_review: "",
                total_review: "",
                mobile: "",
                location: "",
                image: "",
                image_alt_tag: "",
            },
        ],
        start_finish_image: "",
        transportation: "",
        transportation_bus: "",
        transportation_metro: "",
        transportation_cab: "",
        flight_description_1: "",
        flight_description_2: "",
        flights_service1: "",
        flights_service2: "",
        flights_service3: "",
        flights_service4: "",
        meal: "",
        currency_changes: "",
        help_desk_card: "",
        our_facility_image: "",
        our_facility_image_alt_tag: "",
    });

    const onSubmit = (values) => {
        const formData = new FormData();

        formData.set("page_name", values.page_name);
        formData.set("page_slug", values.page_slug);
        formData.set("description[help_desk]", values.help_desk);
        formData.set("description[visa_on_arrival]", values.visa_on_arrival);
        formData.set(
            "description[country_visa]",
            JSON.stringify(values.country_visa)
        );
        formData.set(
            "description[our_learner_description]",
            values.our_learner_description
        );
        formData.set("description[students]", JSON.stringify(values.students));
        formData.set("description[our_goal]", values.our_goal);
        formData.set("description[get_trained]", values.get_trained);
        formData.set("description[get_trained_image]", values.get_trained_image);
        formData.set(
            "description[get_trained_image_alt_tag]",
            values.get_trained_image_alt_tag
        );
        formData.set(
            "description[accomodation_description]",
            values.accomodation_description
        );
        formData.set(
            "description[accomodations]",
            JSON.stringify(values.accomodations)
        );
        formData.set("description[start_finish_image]", values.start_finish_image);
        formData.set("description[transportation]", values.transportation);
        formData.set("description[transportation_bus]", values.transportation_bus);
        formData.set(
            "description[transportation_metro]",
            values.transportation_metro
        );
        formData.set("description[transportation_cab]", values.transportation_cab);
        formData.set(
            "description[flight_description_1]",
            values.flight_description_1
        );
        formData.set(
            "description[flight_description_2]",
            values.flight_description_2
        );
        formData.set("description[flights_services]", [
            values.flights_service1,
            values.flights_service2,
            values.flights_service3,
            values.flights_service4,
        ]);
        formData.set("description[meal]", values.meal);
        formData.set("description[currency_changes]", values.currency_changes);
        formData.set("description[help_desk_card]", values.help_desk_card);
        formData.set("description[our_facility_image]", values.our_facility_image);
        formData.set(
            "description[our_facility_image_alt_tag]",
            values.our_facility_image_alt_tag
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
        help_desk: Yup.string().required("Required"),
        visa_on_arrival: Yup.string().required("Required"),
        country_visa: Yup.array(
            Yup.object().shape({
                country: Yup.mixed().required("Required"),
                flag: Yup.mixed().required("Required"),
            })
        ),
        our_learner_description: Yup.string().required("Required"),
        students: Yup.array(
            Yup.object().shape({
                name: Yup.string().required("Required"),
                country: Yup.mixed().required("Required"),
                course: Yup.mixed().required("Required"),
                image: Yup.string().required("Required"),
                image_alt_tag: Yup.string().required("Required"),
            })
        ),
        our_goal: Yup.string().required("Required"),
        get_trained: Yup.string().required("Required"),
        get_trained_image: Yup.string().required("Required"),
        get_trained_image_alt_tag: Yup.string().required("Required"),
        accomodation_description: Yup.string().required("Required"),
        accomodations: Yup.array(
            Yup.object().shape({
                hotel_name: Yup.string().required("Required"),
                avg_review: Yup.string().required("Required"),
                total_review: Yup.string().required("Required"),
                mobile: Yup.string().required("Required"),
                location: Yup.string().required("Required"),
                image: Yup.string().required("Required"),
                image_alt_tag: Yup.string().required("Required"),
            })
        ),
        start_finish_image: Yup.string().required("Required"),
        transportation: Yup.string().required("Required"),
        transportation_bus: Yup.string().required("Required"),
        transportation_metro: Yup.string().required("Required"),
        transportation_cab: Yup.string().required("Required"),
        flight_description_1: Yup.string().required("Required"),
        flight_description_2: Yup.string().required("Required"),
        flights_service1: Yup.string().required("Required"),
        flights_service2: Yup.string().required("Required"),
        flights_service3: Yup.string().required("Required"),
        flights_service4: Yup.string().required("Required"),
        meal: Yup.string().required("Required"),
        currency_changes: Yup.string().required("Required"),
        help_desk_card: Yup.string().required("Required"),
        our_facility_image: Yup.string().required("Required"),
        our_facility_image_alt_tag: Yup.string().required("Required"),
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

                if (name === "get_trained_image") {
                    if (height > 235 || width > 365) {
                        alert(
                            "Height should not exceed from 235px and width should not exceed from 365 px"
                        );
                    } else if (height < 235 || width < 365) {
                        alert(
                            "Height should not less than from 235px and width should not less than from 365 px"
                        );
                    } else {
                        getBase64(file)
                            .then((result) => {
                                file["base64"] = result;
                                setTrainedImage(result);
                                props.setFieldValue("get_trained_image", file);
                            })
                            .catch((err) => {
                                throw err;
                            });
                    }
                } else if (name === "start_finish_image") {
                    if (height > 213 || width > 1155) {
                        alert(
                            "Height should not exceed from 213px and width should not exceed from 1155 px"
                        );
                    } else if (height < 213 || width < 1155) {
                        alert(
                            "Height should not less than from 212px and width should not less than from 1155 px"
                        );
                    } else {
                        getBase64(file)
                            .then((result) => {
                                file["base64"] = result;
                                setFinishImage(result);
                                props.setFieldValue("start_finish_image", file);
                            })
                            .catch((err) => {

                            });
                    }
                } else if (name === "our_facility_image") {
                    if (height > 213 || width > 1155) {
                        alert(
                            "Height should not exceed from 213px and width should not exceed from 1155 px"
                        );
                    } else if (height < 213 || width < 1155) {
                        alert(
                            "Height should not less than from 212px and width should not less than from 1155 px"
                        );
                    } else {
                        getBase64(file)
                            .then((result) => {
                                file["base64"] = result;
                                setFacilityImage(result);
                                props.setFieldValue("our_facility_image", file);
                            })
                            .catch((err) => {

                            });
                    }
                } else if (name === "suitable_card_1_image") {

                    getBase64(file)
                        .then((result) => {
                            file["base64"] = result;
                            setCard1Image(result);
                            props.setFieldValue("suitable_card_1_image", file);
                        })
                        .catch((err) => {

                        });
                }
                else if (name === "suitable_card_2_image") {
                    getBase64(file)
                        .then((result) => {
                            file["base64"] = result;
                            setCard2Image(result);
                            props.setFieldValue("suitable_card_2_image", file);
                        })
                        .catch((err) => {

                        });
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
                let arr = (response.data?.page_description.flights_services.split(","));
                setValues({
                    page_name: response.data.page_name,
                    page_slug: response.data.page_slug,
                    help_desk: response.data?.page_description?.help_desk,
                    visa_on_arrival: response.data?.page_description?.visa_on_arrival,
                    country_visa: JSON.parse(
                        response.data?.page_description?.country_visa || "[]"
                    ),
                    our_learner_description:
                        response.data?.page_description?.our_learner_description,
                    students: JSON.parse(
                        response.data?.page_description?.students || "[]"
                    ),
                    our_goal: response.data?.page_description?.our_goal,
                    get_trained: response.data?.page_description?.get_trained,
                    get_trained_image: response.data?.page_description?.get_trained_image,
                    get_trained_image_alt_tag:
                        response.data?.page_description?.get_trained_image_alt_tag,
                    accomodation_description:
                        response.data?.page_description?.accomodation_description,
                    accomodations: JSON.parse(
                        response.data?.page_description?.accomodations || "[]"
                    ),
                    start_finish_image:
                        response.data?.page_description?.start_finish_image,
                    transportation: response.data?.page_description?.transportation,
                    transportation_bus:
                        response.data?.page_description?.transportation_bus,
                    transportation_metro:
                        response.data?.page_description?.transportation_metro,
                    transportation_cab:
                        response.data?.page_description?.transportation_cab,
                    flight_description_1:
                        response.data?.page_description?.flight_description_1,
                    flight_description_2:
                        response.data?.page_description?.flight_description_2,
                    flights_service1: arr[0],
                    flights_service2: arr[1],
                    flights_service3: arr[2],
                    flights_service4: arr[3],
                    meal: response.data?.page_description?.meal,
                    currency_changes: response.data?.page_description?.currency_changes,
                    help_desk_card: response.data?.page_description?.help_desk_card,
                    our_facility_image:
                        response.data?.page_description?.our_facility_image,
                    our_facility_image_alt_tag:
                        response.data?.page_description?.our_facility_image_alt_tag,
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
                                <label className="form-label fs-4">Visa</label>
                                <hr />
                            </div>{" "}
                            <div className="form-group col-md-6">
                                <label className="form-label">
                                    Help Desk <span className="text-danger">*</span>
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
                                    value={props.values.help_desk}
                                    onEditorChange={(e) => props.setFieldValue("help_desk", e)}
                                />
                                {props.touched.help_desk && props.errors.help_desk ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.help_desk}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group col-md-6">
                                <label className="form-label">
                                    Visa On Arrival <span className="text-danger">*</span>
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
                                    value={props.values.visa_on_arrival}
                                    onEditorChange={(e) =>
                                        props.setFieldValue("visa_on_arrival", e)
                                    }
                                />
                                {props.touched.visa_on_arrival &&
                                    props.errors.visa_on_arrival ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.visa_on_arrival}
                                    </div>
                                ) : null}
                            </div>

                            <div className="form-group col-md-12">
                                <label className="form-label fs-4">Country Visa</label>
                                <span className="text-danger">*</span>
                            </div>
                            <Country props={props} imageUrl={imageUrl} />
                            <div className="form-group col-md-12">
                                <label className="form-label fs-4">Our Learner</label>
                                <hr />
                            </div>{" "}
                            <div className="form-group col-md-12">
                                <label className="form-label">
                                    Our Learner Description <span className="text-danger">*</span>
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
                                    value={props.values.our_learner_description}
                                    onEditorChange={(e) =>
                                        props.setFieldValue("our_learner_description", e)
                                    }
                                />
                                {props.touched.our_learner_description &&
                                    props.errors.our_learner_description ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.our_learner_description}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group col-md-12">
                                <label className="form-label fs-4">
                                    Students
                                </label>
                                <hr />
                            </div>
                            <Students props={props} imageUrl={imageUrl} />
                            <div className="form-group col-md-12">
                                <label className="form-label fs-4">Goal</label>
                                <hr />
                            </div>{" "}
                            <div className="form-group col-md-12">
                                <label className="form-label">
                                    Our Goal <span className="text-danger">*</span>
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
                                    value={props.values.our_goal}
                                    onEditorChange={(e) => props.setFieldValue("our_goal", e)}
                                />
                                {props.touched.our_goal && props.errors.our_goal ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.our_goal}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group col-md-12">
                                <label className="form-label fs-4">Get Trained</label>
                                <hr />
                            </div>{" "}
                            <div className="form-group col-md-6">
                                <label className="form-label">
                                    Get Trained <span className="text-danger">*</span>
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
                                    value={props.values.get_trained}
                                    onEditorChange={(e) => props.setFieldValue("get_trained", e)}
                                />
                                {props.touched.get_trained && props.errors.get_trained ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.get_trained}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group col-md-6"> 
                            <div className="row">  
                            <div
                                className={
                                    props.values.about_experiance_image
                                        ? "form-group col-md-10"
                                        : "form-group col-md-10"
                                }
                            >
                                <label className="form-label">
                                    Get Trained Image
                                    <span className="text-danger"> 365 * 235</span>
                                </label>
                                <input
                                    className="form-control"
                                    name="get_trained_image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        thumbImagehandle(e, props, "get_trained_image");
                                    }}
                                    placeholder="Enter slug"
                                />
                                {props.touched.get_trained_image &&
                                    props.errors.get_trained_image ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.get_trained_image}
                                    </div>
                                ) : null}
                            </div>
                                {(TrainedImage || imageUrl + props.values.get_trained_image) && (
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
                                                TrainedImage || imageUrl + props.values.get_trained_image
                                            }
                                            alt="image"
                                            style={{
                                                padding: "0",
                                                width: "100%",
                                                height: "72%",
                                            }}
                                        />
                                    </div>
                                )}</div>

                                <div className="form-group col-md-12">
                                    <label className="form-label">
                                        Get Trained Image Alt Tag{" "}
                                        <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        className="form-control"
                                        name="get_trained_image_alt_tag"
                                        type="text"
                                        placeholder="Enter skill get_trained_image_alt_tag"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.get_trained_image_alt_tag}
                                    />
                                    {props.touched.get_trained_image_alt_tag &&
                                        props.errors.get_trained_image_alt_tag ? (
                                        <div className="formik-errors bg-error">
                                            {props.errors.get_trained_image_alt_tag}
                                        </div>
                                    ) : null}
                                </div> </div>

                            <div className="form-group col-md-12">
                                <label className="form-label fs-4">Accommodation</label>
                                <hr />
                            </div>{" "}
                            <div className="form-group col-md-12">
                                <label className="form-label">
                                    Accommodation Description{" "}
                                    <span className="text-danger">*</span>
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
                                    value={props.values.accomodation_description}
                                    onEditorChange={(e) =>
                                        props.setFieldValue("accomodation_description", e)
                                    }
                                />
                                {props.touched.accomodation_description &&
                                    props.errors.accomodation_description ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.accomodation_description}
                                    </div>
                                ) : null}
                            </div>

                            <Accommodations props={props} imageUrl={imageUrl} />
                            <div className="form-group col-md-12">
                                <label className="form-label fs-4">FROM START TO FINISH</label>
                                <hr />
                            </div>{" "}
                            <div
                                className={
                                    props.values.about_experiance_image
                                        ? "form-group col-md-10"
                                        : "form-group col-md-10"
                                }
                            >
                                <label className="form-label">
                                    Start Finish image <span className="text-danger">*</span>
                                </label>
                                <input
                                    className="form-control"
                                    name="start_finish_image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        thumbImagehandle(e, props, "start_finish_image");
                                    }}
                                    placeholder="Enter slug"
                                />
                                {props.touched.start_finish_image &&
                                    props.errors.start_finish_image ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.start_finish_image}
                                    </div>
                                ) : null}
                            </div>
                            {(finishImage || imageUrl + props.values.start_finish_image) && (
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
                                            finishImage || imageUrl + props.values.start_finish_image
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
                            <div className="form-group col-md-12">
                                <label className="form-label fs-4">Transportation</label>
                                <hr />
                            </div>{" "}
                            <div className="form-group col-md-6">
                                <label className="form-label">
                                    Transportation <span className="text-danger">*</span>
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
                                    value={props.values.transportation}
                                    onEditorChange={(e) =>
                                        props.setFieldValue("transportation", e)
                                    }
                                />
                                {props.touched.transportation && props.errors.transportation ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.transportation}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group col-md-6">
                                <label className="form-label">
                                    Transportation Bus <span className="text-danger">*</span>
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
                                    value={props.values.transportation_bus}
                                    onEditorChange={(e) =>
                                        props.setFieldValue("transportation_bus", e)
                                    }
                                />
                                {props.touched.transportation_bus &&
                                    props.errors.transportation_bus ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.transportation_bus}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group col-md-6">
                                <label className="form-label">
                                    Transportation Metro <span className="text-danger">*</span>
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
                                    value={props.values.transportation_metro}
                                    onEditorChange={(e) =>
                                        props.setFieldValue("transportation_metro", e)
                                    }
                                />
                                {props.touched.transportation_metro &&
                                    props.errors.transportation_metro ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.transportation_metro}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group col-md-6">
                                <label className="form-label">
                                    Transportation Cab <span className="text-danger">*</span>
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
                                    value={props.values.transportation_cab}
                                    onEditorChange={(e) =>
                                        props.setFieldValue("transportation_cab", e)
                                    }
                                />
                                {props.touched.transportation_cab &&
                                    props.errors.transportation_cab ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.transportation_cab}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group col-md-12">
                                <label className="form-label fs-4">Flight</label>
                                <hr />
                            </div>{" "}
                            <div className="form-group col-md-6">
                                <label className="form-label">
                                    Flight Description1 <span className="text-danger">*</span>
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
                                    value={props.values.flight_description_1}
                                    onEditorChange={(e) =>
                                        props.setFieldValue("flight_description_1", e)
                                    }
                                />
                                {props.touched.flight_description_1 &&
                                    props.errors.flight_description_1 ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.flight_description_1}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group col-md-6">
                                <label className="form-label">
                                    Flight Description2<span className="text-danger">*</span>
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
                                    value={props.values.flight_description_2}
                                    onEditorChange={(e) =>
                                        props.setFieldValue("flight_description_2", e)
                                    }
                                />
                                {props.touched.flight_description_2 &&
                                    props.errors.flight_description_2 ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.flight_description_2}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group col-md-6">
                                <label className="form-label">
                                    Flight Service1<span className="text-danger">*</span>
                                </label>
                                <input
                                    className="form-control"
                                    name="flights_service1"
                                    type="text"
                                    value={props.values.flights_service1}
                                    onChange={props.handleChange}
                                    placeholder="Enter flights_service1"
                                />
                                {props.touched.flights_service1 &&
                                    props.errors.flights_service1 ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.flights_service1}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group col-md-6">
                                <label className="form-label">
                                    Flight Service2<span className="text-danger">*</span>
                                </label>
                                <input
                                    className="form-control"
                                    name="flights_service2"
                                    type="text"
                                    value={props.values.flights_service2}
                                    onChange={props.handleChange}
                                    placeholder="Enter flights_service1"
                                />
                                {props.touched.flights_service2 &&
                                    props.errors.flights_service2 ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.flights_service2}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group col-md-6">
                                <label className="form-label">
                                    Flight Service3<span className="text-danger">*</span>
                                </label>
                                <input
                                    className="form-control"
                                    name="flights_service3"
                                    type="text"
                                    onChange={props.handleChange}
                                    value={props.values.flights_service3}
                                    placeholder="Enter flights_service1"
                                />
                                {props.touched.flights_service3 &&
                                    props.errors.flights_service3 ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.flights_service3}
                                    </div>
                                ) : null}
                            </div>

                            <div className="form-group col-md-6">
                                <label className="form-label">
                                    Flight Service4<span className="text-danger">*</span>
                                </label>
                                <input
                                    className="form-control"
                                    name="flights_service4"
                                    type="text"
                                    value={props.values.flights_service4}
                                    onChange={props.handleChange}
                                    placeholder="Enter flights_service1"
                                />
                                {props.touched.flights_service4 &&
                                    props.errors.flights_service4 ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.flights_service4}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group col-md-6">
                                <label className="form-label">
                                    Meal<span className="text-danger">*</span>
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
                                    value={props.values.meal}
                                    onEditorChange={(e) => props.setFieldValue("meal", e)}
                                />
                                {props.touched.meal && props.errors.meal ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.meal}
                                    </div>
                                ) : null}
                            </div>

                            <div className="form-group col-md-6">
                                <label className="form-label">
                                    Currency Changes<span className="text-danger">*</span>
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
                                    value={props.values.currency_changes}
                                    onEditorChange={(e) =>
                                        props.setFieldValue("currency_changes", e)
                                    }
                                />
                                {props.touched.currency_changes &&
                                    props.errors.currency_changes ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.currency_changes}
                                    </div>
                                ) : null}
                            </div>

                            <div className="form-group col-md-12">
                                <label className="form-label">
                                    Help Desk Card<span className="text-danger">*</span>
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
                                    value={props.values.help_desk_card}
                                    onEditorChange={(e) =>
                                        props.setFieldValue("help_desk_card", e)
                                    }
                                />
                                {props.touched.help_desk_card && props.errors.help_desk_card ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.help_desk_card}
                                    </div>
                                ) : null}
                            </div>
                            <div className="form-group col-md-12">
                                <label className="form-label fs-4">Our Facilities</label>
                                <hr />
                            </div>{" "}
                            <div className="form-group col-md-5">
                                <label className="form-label">
                                    Our Facility Image <span className="text-danger">*</span>
                                </label>
                                <input
                                    className="form-control"
                                    name="our_facility_image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        thumbImagehandle(e, props, "our_facility_image");
                                    }}
                                    placeholder="Enter slug"
                                />
                                {props.touched.our_facility_image &&
                                    props.errors.our_facility_image ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.our_facility_image}
                                    </div>
                                ) : null}
                            </div>
                            {(facilityImage ||
                                imageUrl + props.values.our_facility_image) && (
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
                                                facilityImage ||
                                                imageUrl + props.values.our_facility_image
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
                                    Our Facility Image Alt Tag{" "}
                                    <span className="text-danger">*</span>
                                </label>
                                <input
                                    className="form-control"
                                    name="our_facility_image_alt_tag"
                                    type="text"
                                    placeholder="Enter skill our_facility_image_alt_tag"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.our_facility_image_alt_tag}
                                />
                                {props.touched.our_facility_image_alt_tag &&
                                    props.errors.our_facility_image_alt_tag ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.our_facility_image_alt_tag}
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
