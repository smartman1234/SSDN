import React, { useContext, useState, useEffect, useRef } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const EnquiryFormFields = React.lazy(() =>
  import("./EnquiryFormFields")
);

export default function BlogEnquiryForm() {
  const [loader, setLoader] = useState(false);

  const [ip, setIP] = useState("");
  const [value, setValue] = useState({
    name: "",
    email: "",
    mobile: "",
    course: "",
  });

  const onSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("mobile", values.mobile);
    formData.append("email", values.email);
    formData.append("course_voucher_assessment", values.course);
    formData.append("ip_address", ip);
    formData.append("type", "blog");

    const config = {
      headers: {
        content: "multipart/form-data",
      },
    };
    setLoader(true);
    axios
      .post(process.env.REACT_APP_API_BASEURL + "web/enquiry", formData, config)
      .then((res) => {
        if (res.data.status === "success") {
          setLoader(false);
          resetForm();
          toast.success(res.data?.message);
          setValue({ name: "", email: "", mobile: "", course: "" });
        } else {
          setLoader(false);
          resetForm();
          toast.error(res.data?.message);
          setValue({ name: "", email: "", mobile: "", course: "" });
        }
      })
      .catch((err) => {
        setLoader(false);
        throw err;
      });
  };
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const ValidateSchema = Yup.object().shape({
    name: Yup.string().required(),

    email: Yup.string().required(),

    mobile: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required(),

    course: Yup.string().required(),
  });

  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    setIP(res.data.ip);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <aside className="card mt--20">
      <div className="edu-course-widget widget-category">
        <div className="inner">
          <h5 className="widget-title">Enquiry Form</h5>
        </div>
        <div className="textwidget">
          <Formik
            initialValues={value}
            onSubmit={onSubmit}
            enableReinitialize={true}
            validationSchema={ValidateSchema}
          >
            {(props) =>  <React.Suspense fallback="">
            <EnquiryFormFields props={props} loader={loader} />
      </React.Suspense>}
          </Formik>
        </div>
      </div>
      <ToastContainer />
    </aside>
  );
}
