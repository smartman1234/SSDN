import React from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { Editor } from "@tinymce/tinymce-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FeedbackForm(props) {
  return (
    <div className="page-body">
      <div className="container-fluid">
        <div className="page-header">
          <div className="row">
            <div className="col-sm-6">
              <h3>Add Question</h3>
            </div>
           
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <Formik
                >
                  {(props) => (
                    <form className="" onSubmit={props.handleSubmit}>
                      <>
                        <div style={{ display: "block" }}>
                          <div className="form-group">
                            <label htmlFor="name">Feedback Question</label>
                            <input
                              className="form-control"
                              id="name"
                              type="text"
                              name="name"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="lname">Feedback Answer</label>
                            <textarea
                              className="form-control"
                              id="lname"
                              type="text"
                              name="slug"
                            />
                          </div>
                          
                         

                         
                        </div>
                        <div>
                          <div className="text-end btn-mb">
                            <button
                              className="btn btn-primary"
                              type="submit"
                              style={{ display: "inline" }}
                            >
                              Submit <i className="fa-solid fa-chevron-right"></i>
                            </button>
                          </div>
                        </div>
                      </>
                    </form>
                  )}
                </Formik>

                <div className="text-center">
                  <span className="step"></span>
                  <span className="step"></span>
                  <span className="step"></span>
                  <span className="step"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <ToastContainer autoClose={1000} />
    </div>
  );
}

export default FeedbackForm;
