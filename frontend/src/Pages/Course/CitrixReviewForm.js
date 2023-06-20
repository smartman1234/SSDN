import React, { useState } from "react";
import { Formik } from "formik";
import ReactStars from "react-rating-stars-component";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import CourseService from "../../Services/CourseService/CourseService";

export default function CitrixReviewForm({ detailData, id }) {
  const course = new CourseService();
  const [value, setValue] = useState({
    name: "",
    email: "",
    comment: "",
    review: "",
  });

  const onSubmit = async (values, { resetForm }) => {
    let obj = {
      name: values.name,
      email: values.email,
      comment: values.comment,
      review: values.review,
      course_id: id,
    };

    try {
      let response = await course.reviewForm(obj);
      if (response.status === "success") {
        resetForm();
         toast.success(response.message);
        setValue({
          name: "",
          email: "",
          comment: "",
          review: "",
        });
      } else {
        toast.error(
          response.message ||
            response.data.review ||
            response.data.name ||
            response.data.email ||
            response.data.comment
        );
        setValue({
          name: "",
          email: "",
          comment: "",
          review: "",
        });
        resetForm();
      }
    } catch (err) {
      throw err;
    }
  };

  const ValidateSchema = Yup.object().shape({
    name: Yup.string().required("Required"),

    email: Yup.string().required("Required"),

    comment: Yup.string().required("Required"),
    review: Yup.string().required("Required"),
  });
  return (
    <div className="card">
      <div className="card-body">
        <div className="edu-comment-form">
          <div className="comment-form-inner">
            <h6 className="blog-page-title">Add Review</h6>
          </div>
          <Formik
            initialValues={value}
            onSubmit={onSubmit}
            enableReinitialize={true}
            validationSchema={ValidateSchema}
          >
            {(props) => (
              <form
                className="comment-form-style-1"
                onSubmit={props.handleSubmit}
              >
                <p className="comment-note mb--20">
                  Your email address will not be published. Required fields are
                  marked *
                </p>

                <div className="notification-text d-flex align-items-center mb--30">
                  <h6 className="mb--0 fontWeight600 title">Your Rating</h6>
                  <div className="rating">
                    <ReactStars
                      count={5}
                      name="review"
                      onChange={(event) => {
                        props.setFieldValue("review", event);
                      }}
                      size={24}
                      activeColor="#ffd700"
                    />
                    {props.touched.review && props.errors.review ? (
                      <div className="formik-errors bg-error">
                        {props.errors.review}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6 form-group">
                      <input
                        name="name"
                        type="text"
                        onBlur={props.handleBlur}
                        value={props.values.name}
                        className="form-control form-control-lg"
                        placeholder="Name*"
                        onChange={(event) => {
                          props.setFieldValue("name", event.target.value);
                        }}
                      />
                      {props.touched.name && props.errors.name ? (
                        <div className="formik-errors bg-error">
                          {props.errors.name}
                        </div>
                      ) : null}
                  </div>
                  <div className="col-lg-6 form-group">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        name="email"
                        onBlur={props.handleBlur}
                        value={props.values.email}
                        placeholder="Email*"
                        onChange={props.handleChange}
                      />
                      {props.touched.email && props.errors.email ? (
                        <div className="formik-errors bg-error">
                          {props.errors.email}
                        </div>
                      ) : null}
                    </div>
                  <div className="col-lg-12 form-group">
                      <textarea
                        className="form-control"
                        name="comment"
                        placeholder="Your comment"
                        onBlur={props.handleBlur}
                        value={props.values.comment}
                        onChange={(event) => {
                          props.setFieldValue("comment", event.target.value);
                        }}
                        maxLength="180"
                      />
                      {props.errors.comment ? (
                        <div className="formik-errors bg-error">
                          {props.errors.comment}
                        </div>
                      ) : null}
                  </div>
                  <div className="col-lg-12 form-group text-center">
                      <button className="edu-btn" type="submit">
                        Submit Now
                      </button>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    <ToastContainer autoClose={1000} />
    </div>
  );
}
