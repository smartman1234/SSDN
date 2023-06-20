import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { LazyLoadImage } from 'react-lazy-load-image-component';

import GetInTouchService from "../../Services/ContactServices/GetInTouchService";

const QueryFormField = React.lazy(() => import("./QueryFormField"));

export default function QueryForm() {
  const [verify, setVerify] = useState(false);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const getInTouch = new GetInTouchService();
  const [ip, setIP] = useState("");
  const [nameErrorMsg, setNameErrormsg] = useState("");
  const [token, setToken] = useState(false);
  const [value, setValue] = useState({
    token: "token",
    name: "",
    email: "",
    mobile: "",
    ip_address: "",
    message: "",
  });
  useEffect(() => {
    if (window.user?.data?.auth_token) {
      setToken(true);
      setValue({ ...value, token: window.user?.data?.auth_token });
    }

    getData();
  }, []);

  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    setIP(res.data.ip);
  };
  const onSubmit = async (values, { resetForm }) => {
    let obj = {};

    obj["ip_address"] = ip;
    obj["message"] = values.message;
    obj["name"] = values.name;
    obj["email"] = values.email;
    obj["mobile"] = values.mobile;
    obj["ip_address"] = ip;
    obj["message"] = values.message;

    if (verify) {
      setLoader(true);
      try {
        let response = await getInTouch.query(obj);
        if (response.status === "success") {
          setLoader(false);
          resetForm();
          setValue({
            name: "",
            email: "",
            mobile: "",
            ip_address: "",
            message: "",
          });
          toast.success(response.message);
        } else {
          setLoader(false);
          toast.error(
            response.data.email || response.data.name || response.data.mobile
          );
          resetForm();
          setValue({
            name: "",
            email: "",
            mobile: "",
            ip_address: "",
            message: "",
          });
        }
      } catch (err) {
        throw err;
      }
    } else {
      setError(" Please fill Recapcha correctly ");
    }
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const ValidateSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    mobile: Yup.string()
      .matches(phoneRegExp, "mobile number is not valid")
      .required("Required")
      .min(10, "too short")
      .max(10, "too long"),
    message: Yup.string().required("Required"),
  });

  const nameErrorhandle = (e) => {
    if (e.target.value.length >= 0) {
      setNameErrormsg("Required");
    } else if (e.target.value.length < 3) {
      setNameErrormsg("too short!");
    } else {
    }
  };
  return (
    <div className="resolve-query">
      <div className="resolve-query-img text-center">
         <LazyLoadImage
          src="/assets/images/Form.png"
          alt="image"
          height="100%"
          width="100%"
        />
      </div>
      <div
        className="col-lg-12"
        style={{ borderBottom: "1px solid rgba(45, 40, 78, 0.07)" }}
      >
        <div className="section-title text-center">
          <span className="pre-title">Let's Resolve Your Query</span>
        </div>
      </div>
      <Formik
        initialValues={value}
        onSubmit={onSubmit}
        enableReinitialize={true}
        validationSchema={ValidateSchema}
      >
        {(props) => (
            <React.Suspense fallback="">
             <QueryFormField
            props={props}
            setVerify={setVerify}
            nameErrorhandle={nameErrorhandle}
            error={error}
            loader={loader}
          />
          </React.Suspense>
        
        )}
      </Formik>{" "}
      <ToastContainer autoClose={1000} />
    </div>
  );
}
