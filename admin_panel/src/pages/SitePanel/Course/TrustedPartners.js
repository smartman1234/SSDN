import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import axios from "axios";
import TrustedPartnersService from "../../../Services/TrustedParnersService/TrustedPartnersService";

export default function TrustedPartners() {
    const partnerServe = new TrustedPartnersService();
    const params = useParams();
    const navigate = useNavigate();
    const [image, setImage] = useState("");
    const [values, setValues] = useState({
        image: "",
        image_alt_tag: "",
    });

    const name = (
        <Link to="/trusted-partners" className="btn btn-primary">
            Back
        </Link>
    );

    const onSubmit = async (values) => {

        const formData = new FormData();
        if (values.id) {
            formData.set("id", values.id);
        }
        formData.set("image", values.image);
        formData.set("image_alt_tag", values.image_alt_tag);

        const config = {
            headers: {
                content: "multipart/form-data",
                AUTHTOKEN: window.user?.data?.auth_token,
            },
        };
        if (values.id) {
            try {
                const response = await axios.post(
                    process.env.REACT_APP_API_BASEURL + `partner/update-our-partner`,
                    formData,
                    config
                );
                if (response.data?.status === "success") {
                    toast.success("Record update successfully");
                    setTimeout(() => {
                        navigate("/trusted-partners");
                    }, [1000]);
                } else {
                    toast.error(response.data?.data?.image || response.data.message);
                }
            } catch (err) {
                throw err;
            }
        } else {
            axios
                .post(
                    process.env.REACT_APP_API_BASEURL + "partner/create-our-partner",
                    formData,
                    config
                )
                .then((res) => {
                    if (res.data?.status === "success") {
                        toast.success("Partner created successfully");
                        setTimeout(() => {
                            navigate("/trusted-partners");
                        }, [1000]);
                    } else if (res.data?.status === "fail") {
                        toast.error(res.data.message);
                    }
                })
                .catch((err) => {
                    throw err;
                });
        }
    };

    const VoucherSchema = Yup.object().shape({
        image: Yup.mixed().required("A file is required"),

        image_alt_tag: Yup.string().required("Required"),
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

    const handleFileInputChange = (e, props) => {

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

                if (height > 87 || width > 147) {
                    alert(
                        "Height should not exceed from 87px and width should not exceed from 147 px"
                    );
                } else if (height < 87 || width < 147) {
                    alert(
                        "Height should not less than from 87px and width should not less than from 147 px"
                    );
                } else {
                    getBase64(file)
                        .then((result) => {
                            file["base64"] = result;

                            setImage(result);
                        })
                        .catch((err) => {

                        });
                }
            };
        };
    };

    const getDetailApi = async () => {
        try {
            let response = await partnerServe.getDetail(params.id);
            if (response.status === "success") {
                setValues({
                    id: response.data.id,
                    image: response.data.image,
                    image_alt_tag: response.data.image_alt_tag,
                });
            }
        } catch (err) {
            throw err;
        }
    };

    useEffect(() => {
        if (params.id) {
            getDetailApi();
        }
    }, []);

    return (
        <>
            <div className="page-body">
                <Breadcrumb
                    heading={params.id ? "Edit Partner" : "Add Partner"}
                    add={name}
                />
                <div className="container-fluid support-ticket">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>{params.id ? "Edit Partner" : "Add partner"}</h5>
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
                                                    <div className="form-group col-md-4">
                                                        <label className="form-label">
                                                            image <span className="text-danger">*</span>
                                                        </label>
                                                        <span className="text-danger image-data">
                                                            Image Size: 147 X 87
                                                        </span>
                                                        <input
                                                            className="form-control"
                                                            onChange={(e) => {
                                                                props.setFieldValue(
                                                                    "image",
                                                                    e.target.files[0]
                                                                );
                                                                handleFileInputChange(e, props);
                                                            }}
                                                            onBlur={props.handleBlur}
                                                            name="image"
                                                            type="file"
                                                            accept="image/*"
                                                        />
                                                        {props.touched.image && props.errors.image ? (
                                                            <div className="formik-errors bg-error">
                                                                {props.errors.image}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                    <div className="form-group col-md-2">
                                                        {(image || props.values.image) && (
                                                            <img
                                                                src={image || props.values.image}
                                                                alt="image"
                                                                style={{
                                                                    padding: "0",
                                                                    width: "100%",
                                                                    height: "72%",
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                    <div className=" col-md-6">
                                                        <label className="form-label">
                                                            Image Alt Text <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            value={props.values.image_alt_tag}
                                                            onChange={props.handleChange}
                                                            onBlur={props.handleBlur}
                                                            name="image_alt_tag"
                                                            type="text"
                                                            placeholder="Enter image alt text"
                                                        />
                                                        {props.touched.image_alt_tag &&
                                                            props.errors.image_alt_tag ? (
                                                            <div className="formik-errors bg-error">
                                                                {props.errors.image_alt_tag}
                                                            </div>
                                                        ) : null}
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
