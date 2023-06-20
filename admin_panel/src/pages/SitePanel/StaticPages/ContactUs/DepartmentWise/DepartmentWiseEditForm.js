import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import DepartmentwiseService from "../../../../../Services/SitePanelServices/DepartmentwiseService";
import * as Yup from "yup";
import { Formik } from "formik";

const DepartmentWiseAddForm = () => {
  const deparmentServe = new DepartmentwiseService();
  const navigate = useNavigate();
  const params = useParams();
  const [AboutId, setAboutId] = useState(0);
  const [formData, setformData] = useState([]);
  const [formError, setformError] = useState([]);
  const [values, setValues] = useState({
    name: "",
    email: "",
    contact: "",
    whatsapp: "",
  });
  const location = useLocation();
  const path_name = location.pathname;
  const split_d = path_name.split("/");
  const id_ = Number(split_d[2]);

  const getDepartmentDetail = async () => {
    try {
      let response = await deparmentServe.get(params.id);
      if (response.status === "success") {
        setValues({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          contact: response.data.mobile_number,
          whatsapp: response.data.whatsapp_number,
        });
      } else {
      }
    } catch (err) {
      throw err;
    }
  };

  const handlefileUploading = async (e, type) => {
    setformData({ ...formData, [type]: e.target.files[0] });
  };

  const handlerequest = async (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
 const VoucherSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[A-Za-z ]*$/, "Please enter valid name")
      .max(40)
      .required("Required"),
    email: Yup.string().email().required("Required"),
    contact: Yup.string()
      .required("Required"),
    whatsapp: Yup.string()
      .required("Required"),
  });
  const onSubmit = async (values, { resetForm }) => {
    let obj = {
      mobile_number: values.contact,
      whatsapp_number: values.whatsapp,
      email: values.email,
      name: values.name,
    };
    if (values.id) {
      obj["id"] = values.id;
    }

    try {
      if (values.id) {
        let response = await deparmentServe.update(obj);
        if (response.status === "success") {
          toast.success("Successfull");
          setTimeout(() => {
            navigate("/department-wise");
          }, [1000]);
        } else {
        }
      } else {
        let response = await deparmentServe.create(obj);
        if (response.status === "success") {
          setTimeout(() => {
            navigate("/department-wise");
          }, [1000]);
          toast.success("Successfull");

        } else {
        }
      }
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    getDepartmentDetail();
  }, []);
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h5>Edit Department Wise</h5>
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
                      Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      onChange={props.handleChange}
                      value={props.values.name}
                      name="name"
                      type="text"
                      placeholder="Enter name"
                    />
                    {props.touched.name && props.errors.name ? (
                      <div className="formik-errors bg-error">
                        {props.errors.name}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-group col-md-6">
                    <label className="form-label">
                      Email ID <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="email"
                      onChange={props.handleChange}
                      value={props.values.email}
                      type="email"
                      placeholder="Enter email id"
                    />
                    {props.touched.email && props.errors.email ? (
                      <div className="formik-errors bg-error">
                        {props.errors.email}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-group col-md-6">
                    <label className="form-label">
                      Phone No. <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      onChange={props.handleChange}
                      value={props.values.contact}
                      name="contact"
                      type="text"
                      placeholder="Enter phone no."
                    />
                    {props.touched.contact && props.errors.contact ? (
                      <div className="formik-errors bg-error">
                        {props.errors.contact}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-group col-md-6">
                    <label className="form-label">
                      WhatsApp No. <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      onChange={props.handleChange}
                      name="whatsapp"
                      value={props.values.whatsapp}
                      type="text"
                      placeholder="Enter whatsapp no."
                    />
                    {props.touched.whatsapp && props.errors.whatsapp ? (
                      <div className="formik-errors bg-error">
                        {props.errors.whatsapp}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="card-footer text-end">
                <button className="btn btn-primary me-2" type="submit">
                  Submit
                </button>
                <button className="btn btn-danger" type="reset">
                  Reset
                </button>
              </div>
            </form>
          )}
        </Formik>
      <ToastContainer autoClose={1000} />
      </div>
    </>
  );
};

export default DepartmentWiseAddForm;
