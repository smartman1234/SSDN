import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import { Formik } from "formik";
import { Context } from "../../../../container/Context";
import ContactusService from "../../../../Services/SitePanelServices/ContactusService";

const DepartmentWiseAddForm = () => {
  const contactServe = new ContactusService();
  const { login, permissions } = useContext(Context);
  const [loginData, setLoginData] = login;
  const [pagesData, setPagesData] = useState([]);
  const [rolePermission, setRolePermission] = permissions;
  const [values, setValues] = useState({
    contact: "",
    whatsapp: "",
  });
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const VoucherSchema = Yup.object().shape({
    contact: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Required")
      .min(10, "too short")
      .max(10, "too long"),
    whatsapp: Yup.string()
      .matches(phoneRegExp, "whatsapp number is not valid")
      .required("Required")
      .min(10, "too short")
      .max(10, "too long"),
  });

  const onSubmit = async (values, { resetForm }) => {

    let obj = {
      contact_number: values.contact,
      contact_whatsapp_number: values.whatsapp,
    };

    try {
      let response = await contactServe.contactus(obj);
      if (response.status === "success") {
        toast.success(" Update Successfully");
      } else {
      }
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    getDataApi();
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

  const getDataApi = async () => {
    try {
      let response = await contactServe.getData();
      if (response.status === "success") {
        setValues({
          contact: response.data.contact_number,
          whatsapp: response.data.contact_whatsapp_number,
        });
      } else {
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h5>Contact Us Strip</h5>
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
                  <div className="form-group col-md-6">
                    <label className="form-label">
                      Call Contact No <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="contact"
                      type="tel"
                      placeholder="Enter call contact no"
                      onChange={props.handleChange}
                      value={props.values.contact}
                    />
                    {props.touched.contact && props.errors.contact ? (
                      <div className="formik-errors bg-error">
                        {props.errors.contact}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-group col-md-6">
                    <label className="form-label">
                      Whatsapp Contact No <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="whatsapp"
                      type="tel"
                      placeholder="Enter whatsapp contact no"
                      onChange={props.handleChange}
                      value={props.values.whatsapp}
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
                {rolePermission.is_add == 1 ? (
                  <button className="btn btn-primary me-2" type="submit">
                    Submit
                  </button>
                ) : (
                  <button
                    className="btn btn-primary me-2"
                    type="submit"
                    disabled
                  >
                    Submit
                  </button>
                )}
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
