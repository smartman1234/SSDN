import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import Captcha from "react-numeric-captcha";
import WeOfferService from "../../Services/WeOfferService/WeOfferService";

export default function Offerpopup({ open, setOpen, endDate }) {
  const serve = new WeOfferService();
  const [verify, setVerify] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [value, setValue] = useState({
    name: "",
    email: "",
    mobile: "",
    course_name: "",
  });
  const countDownDate = new Date(endDate?.page_description?.end_time).getTime();

  useEffect(() => {
    const x = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setRemainingTime({
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      });

      if (distance < 0) {
        clearInterval(x);
      }
    }, 1000);
    return () => clearInterval(x);
  }, []);

  const onSubmit = async (values) => {
    let obj = {
      name: values.name,
      email: values.email,
      contact_number: values.mobile,
      course_name: values.course_name,
    };
    if (verify) {
      setError();
      setLoading(true);
      try {
        let response = await serve.availOffer(obj);
        if (response.status === "success") {
          toast.success("Your Enquiry has been Successfully submitted");
          setLoading(false);
          setOpen(false);
        } else {
          toast.error("Enquiry is already submitted for the day!");
          setLoading(false);
          setOpen(false);
        }
      } catch (err) {
        throw err;
      }
    } else {
      setError(" Please fill Recapcha correctly ");
    }
  };

  const ValidateSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required(),
    mobile: Yup.string().required(),
    course_name: Yup.string().required(),
  });

  return (
    <div
      className="modal in"
      style={open ? { display: "block" } : { display: "none" }}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        role="document"
      >
        <div className="modal-content " style={{ opacity: "1" }}>
          <div className="modal-header">
            <div>
              <h5 className="modal-title" >
                Avail Offer
              </h5>
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={() => setOpen(false)}
            ></button>
          </div>

          <div className="modal-body">
            <div className="row">
              <div className="col-md-6">
                <div className="background-color-dotted">
                  <div className="circle1 text-center">
                    <p
                      className="deal-of-day text-center"
                      dangerouslySetInnerHTML={{
                        __html: endDate?.block_description,
                      }}
                    ></p>
                    <button className="edu-btn">
                      {remainingTime?.days} D : {remainingTime?.hours} H :{" "}
                      {remainingTime?.minutes} M : {remainingTime?.seconds} S
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <Formik
                  initialValues={value}
                  onSubmit={onSubmit}
                  enableReinitialize={true}
                  validationSchema={ValidateSchema}
                >
                  {(props) => (
                    <form
                      className="row"
                      onSubmit={props.handleSubmit}
                    >
                      <>
                        <div className="col-lg-12 form-group">
                            <input
                              name="name"
                              type="text"
                              className="form-control"
                              placeholder="Enter user name*"
                              onChange={(event) => {
                                props.setFieldValue("name", event.target.value);
                              }}
                              onBlur={props.handleBlur}
                              value={props.values.name}
                            />{" "}
                            {props.touched.name && props.errors.name ? (
                              <div className="formik-errors bg-error">
                                {props.errors.name}
                              </div>
                            ) : null}
                        </div>
                        <div className="col-lg-12 form-group">
                            <input
                              type="email"
                              className="form-control"
                              id="contact-email"
                              name="email"
                              placeholder="Enter email*"
                              onChange={(event) => {
                                props.setFieldValue(
                                  "email",
                                  event.target.value
                                );
                              }}
                              onBlur={props.handleBlur}
                              value={props.values.email}
                            />{" "}
                            {props.touched.email && props.errors.email ? (
                              <div className="formik-errors bg-error">
                                {props.errors.email}
                              </div>
                            ) : null}
                        </div>
                        <div className="col-lg-12 form-group">
                            <input
                              type="text"
                              className="form-control"
                              name="mobile"
                              placeholder="Enter mobile no"
                              onChange={(event) => {
                                props.setFieldValue(
                                  "mobile",
                                  event.target.value
                                );
                              }}
                              onBlur={props.handleBlur}
                              value={props.values.mobile}
                            />{" "}
                            {props.touched.mobile && props.errors.mobile ? (
                              <div className="formik-errors bg-error">
                                {props.errors.mobile}
                              </div>
                            ) : null}
                        </div>
                      </>

                      <div className="col-lg-12 form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="course-name"
                            placeholder="Enter course name"
                            onChange={(event) => {
                              props.setFieldValue(
                                "course_name",
                                event.target.value
                              );
                            }}
                            onBlur={props.handleBlur}
                            value={props.values.course_name}
                          />{" "}
                          {props.touched.course_name &&
                          props.errors.course_name ? (
                            <div className="formik-errors bg-error">
                              {props.errors.course_name}
                            </div>
                          ) : null}
                      </div>
                      <div className="col-lg-12 form-group">
                        <div className="form-group">
                        <Captcha onChange={(e) => setVerify(e)} />
                          <div className="formik-errors bg-error">{error}</div>
                        </div>
                      </div>
                      {loading ? (
                        <div className="col-lg-12 text-center mt-1">
                        <strong className="me-2">Loading...</strong>
                        <div className="spinner-border text-warning"
                        ></div>
                    </div>
                      ) : (
                        <div className="col-lg-12 form-group text-end">
                          <button className="edu-btn mr--10" type="submit">
                            Avail Offer Now
                          </button>
                        </div>
                      )}
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  );
}
