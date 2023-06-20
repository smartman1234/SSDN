import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ManageUserService from "../../Services/ManageUserService/ManageUserService";
import Utils from "../../utils/Utils";

export default function AssignTask({ id, map, setMap }) {
    const serve = new ManageUserService();
    const [categoryList, setCategoryList] = useState([]);
    const [assessgnment, setAssessment] = useState([]);
    const [value, setValue] = useState({
        name: "",
    });

    const onSubmit = async (values) => {
        let obj = {
            user_id: id,
            assessment_id: values.name?.value,
        };


        try {
            let response = await serve.assessgnmentassigntouser(obj);
            if (response.status === "success") {
                toast.success(response.message);
                setMap({ [id]: false });
            } else {
                toast.error(response.message);
            }
        } catch (err) {
            throw err;
        }
    };

    const ValidateSchema = Yup.object().shape({
        name: Yup.mixed().required("Required"),
    });
    useEffect(() => {
        CategoryListApi(id);
        AssignAssessment();
    }, []);
    const CategoryListApi = async (id) => {
        try {
            let response = await serve.userexamlist(id);
            if (response) {
                setCategoryList(response.data);
            }
        } catch (err) {
            throw err;
        }
    };

    const AssignAssessment = async () => {
        try {
            let response = await serve.assessgnment();
            if (response) {
                const arr = response.data.map((v) => {
                    return {
                        value: v.value,
                        label:
                            v.label +
                            "/" +
                            v?.category?.name +
                            "/" +
                            v.level +
                            "/" +
                            v.duration +
                            "mins",
                    };
                });
                setAssessment(arr);
            }
        } catch (err) {
            throw err;
        }
    };

    return (
        <>
            <div
                className={map[id] ? "modal fade show" : "modal fade"}
                id="view-details"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                style={map[id] ? { display: "block" } : { display: "none" }}
            >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Map Exam With User
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => setMap({ [id]: false })}
                            ></button>
                        </div>
                        <div
                            className="modal-body"
                            style={{ overflow: "scroll", height: "500px" }}
                        >
                            <Formik
                                initialValues={value}
                                validationSchema={ValidateSchema}
                                onSubmit={onSubmit}
                                enableReinitialize={true}
                            >
                                {(props) => (
                                    <form onSubmit={props.handleSubmit} className="mb-4">
                                        <div className="input-box col-md-12">
                                            <label>Exam</label>
                                        </div>
                                        <div className="input-box col-md-12">
                                            <Select
                                                onChange={(value) =>
                                                    props.setFieldValue("name", value)
                                                }
                                                options={assessgnment}
                                                value={props.values.name}
                                                name="name"
                                            />
                                            {props.touched.name && props.errors.name ? (
                                                <div className="formik-errors bg-error">
                                                    {props.errors.name}
                                                </div>
                                            ) : null}
                                        </div>

                                        <div className="text-end mt-3">
                                            <button className="edu-btn" type="submit">
                                                Save
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </Formik>

                            <table
                                className="display dataTable no-footer"
                                id="basic-1"
                                role="grid"
                                aria-describedby="basic-1_info"
                            >
                                <thead>
                                    <tr role="row">
                                        <th style={{ width: "50.725px" }} className="text-center">
                                            S.no.
                                        </th>
                                        <th style={{ width: "30%" }}>Assignment</th>
                                        <th style={{ width: "172.725px" }}>Category</th>
                                        <th style={{ width: "172.725px" }}>Level</th>
                                        <th style={{ width: "250.938px" }}>Duration</th>
                                        <th style={{ width: "130.2px" }}>Attempted</th>
                                        <th style={{ width: "100.5625px" }} className="text-center">
                                            Expiring In (Days)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categoryList?.map((v, i) => {
                                        return (
                                            <tr role="row" className="odd align-middle" key={i}>
                                                <td className="text-center">{i + 1}</td>
                                                <td>{v.name}</td>
                                                <td className="text-center">{v?.category?.name}</td>
                                                <td>{Utils.titleCase(v?.level)}</td>
                                                <td>{v?.duration} mins</td>
                                                <td className="text-center"> {v?.total_attempted}</td>
                                                <td className="text-center">
                                                    {v?.order_transaction?.exp_days}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>

        </>
    );
}
