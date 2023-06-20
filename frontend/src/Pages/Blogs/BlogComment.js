import React, { useState} from "react";
import Utils from "../../Utils/Utils";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function BlogComment({ comment }) {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState({
    name: "",
    email: "",
    message: "",
  });
  const onSubmit = async (values) => {
    const data = JSON.stringify({
      post: localStorage.getItem("blogid"),
      author_name: values.name,
      author_email: values.email,
      content: values.message,
    });

    const ACTION_URL = "http://blogs.ssdnemail.com/wp-json/wp/v2/comments";
    setLoading(true);
    fetch(ACTION_URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => {
        if (response.ok === true) {
          setLoading(false);
          toast.success("Your comment has been successfully posted ");
        } else {
          setLoading(false);
        }

        return response.json();
      })
      .then((object) => {})
      .catch((error) => console.error("Error:", error));
  };
  const ValidateSchema = Yup.object().shape({
    name: Yup.string().required(),

    email: Yup.string().required(),

    message: Yup.string().required(),
  });

  const dated = (time) => {
    let d = time?.split("T");
    return d?.[0];
  };
  return (
    <>
      {" "}
      {comment?.length > 0 && (
        <div className="edu-comment-area mt--50">
          <h5 className="blog-page-title">
            {comment?.length} Comment{comment?.length > 1 ? "s" : ""}
          </h5>
          <div className="comment-list-wrapper mt--40">
            {comment?.length > 0 &&
              comment.map((v, i) => (
                <div className="comment" key={i}>
                  <div className="thumbnail">
                     <LazyLoadImage
                      src="/assets/images/comment.png"
                      alt="Comment Images"
                      height="100%"
                      width="100%"
                    />
                  </div>
                  <div className="comment-content">
                    <h6 className="title">{v?.author_name}</h6>
                    <span className="date">{dated(v?.date)}</span>
                    <p
                      className="ssdn-editor-font1"
                      dangerouslySetInnerHTML={{
                        __html: Utils.titleCase(v?.content?.rendered),
                      }}
                    ></p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      <div className="card">
        <div className="card-body">
          <div className="edu-comment-form">
            <div className="comment-form-top">
              <h5 className="blog-page-title">Leave Comment</h5>
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
                  action="#"
                  onSubmit={props.handleSubmit}
                >
                  <p className="comment-note">
                    Your email address will not be published. Required fields
                    are marked *
                  </p>
                  <div className="row">
                    <div className="col-lg-6 form-group">
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
                    <div className="col-lg-6 form-group">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          placeholder="Enter email*"
                          onChange={(event) => {
                            props.setFieldValue("email", event.target.value);
                          }}
                          onBlur={props.handleBlur}
                          value={props.values.email}
                        />
                        {props.touched.email && props.errors.email ? (
                          <div className="formik-errors bg-error">
                            {props.errors.email}
                          </div>
                        ) : null}
                    </div>
                    <div className="col-lg-12 form-group">
                        <textarea
                          placeholder="Your comment"
                          name="message"
                          onChange={(event) => {
                            props.setFieldValue("message", event.target.value);
                          }}
                          onBlur={props.handleBlur}
                          value={props.values.message}
                        ></textarea>{" "}
                        {props.touched.message && props.errors.message ? (
                          <div className="formik-errors bg-error">
                            {props.errors.message}
                          </div>
                        ) : null}
                    </div>
                        {loading ? (
                          <div className="col-lg-12 text-center mt-1">
                          <strong className="me-2">Loading...</strong>
                          <div className="spinner-border text-warning"
                          ></div>
                      </div>
                        ) : (
                          <button className="edu-btn" type="submit">
                            Submit
                          </button>
                        )}
                  </div>
                </form>
              )}
            </Formik>
            <ToastContainer autoClose={1000} />
          </div>
        </div>
      </div>
    </>
  );
}
