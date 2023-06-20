import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import CourseCourseService from "../../../Services/CourseService/CourseCourseService";
import Faq from "../Course/Faq";
import { Context } from "../../../container/Context";
import ELearningCourseService from "../../../Services/ELearningService/ELearningCourseService";

export default function CreateELearningFaq() {
  const params = useParams();
  const { login, permissions } = useContext(Context);
  const [rolePermission, setRolePermission] = permissions;
  const serve = new ELearningCourseService();
  const [values, setValues] = useState({
    faqs: [{ title: "", description: "" }],
  });
  const VoucherSchema = Yup.object().shape({
    faqs: Yup.array(
      Yup.object().shape({
        title: Yup.string().required("Required"),
        description: Yup.string().required("Required"),
      })
    ),
  });
  const onSubmit = async (values) => {

    const formData = new FormData();

    formData.set("faqs", JSON.stringify(values.faqs));

    const config = {
      headers: {
        content: "multipart/form-data",
        AUTHTOKEN: window.user?.data?.auth_token,
      },
    };

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_BASEURL + `e-learning/create-update-faq`,
        formData,
        config
      );
      if (response.data?.status === "success") {
        toast.success("Record update successfully");
      } else {
        toast.error(response.data?.message);
      }
    } catch (err) {
      throw err;
    }
  };
  useEffect(() => {
    getDataById();
  }, []);

  const getDataById = async () => {
    try {
      let response = await serve.faqList();
      if (response) {
        setValues({
          faqs: response.data,
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
      <Breadcrumb heading="Add FAQS" />
      <div className="container-fluid support-ticket">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Add FAQS</h5>
              </div>
              <div className="card-body">
                <Formik
                  initialValues={values}
                  validationSchema={VoucherSchema}
                  onSubmit={onSubmit}
                  enableReinitialize={true}
                >
                  {(props) => (
                    <>
                      <form className="" onSubmit={props.handleSubmit}>
                        <Faq
                          props={props}
                          values={values}
                          getDataById={getDataById}
                          setValues={setValues}
                        />
                        <div className="card-footer text-end">
                          {rolePermission.is_add == 1 ? (
                            <button className="btn btn-primary" type="submit">
                              Submit
                            </button>
                          ): <button className="btn btn-primary" type="submit" disabled>
                          Submit
                        </button>}
                        </div>
                      </form>
                    </>
                  )}
                </Formik>
              </div>
            </div>
          <ToastContainer autoClose={1000} />
          </div>
        </div>
      </div>
    </div>
  );
}
