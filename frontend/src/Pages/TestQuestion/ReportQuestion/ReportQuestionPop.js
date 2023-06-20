import React, { useState } from "react";
import { useContext } from "react";
import { Formik } from "formik";
import { CartContext } from "../../../Container/Context";
import TestService from "../../../Services/TestService";
import { useEffect } from "react";
import { useRef } from "react";

function ReportedQuestionPop() {
  const { modal, reported, dataValue } = useContext(CartContext);
  const [modalOpen, setModalOpen] = modal;
  const [data, setData] = dataValue;
  const [loader, setLoader] = useState(false);
  const [reportQuestion, setReportQuestion] = reported;
  const [value, setValue] = useState({
    question: [],
  });
  const question_idInputRef = useRef();

  useEffect(() => {
    reportQuestion.map((v, i) =>
      setValue((oldValue) => {
        if (!oldValue?.question?.length) {
          return {
            question: [{ question_id: v.id, comment: "" }],
          };
        } else {
          return {
            question: [
              ...oldValue.question,
              { question_id: v.id, comment: "" },
            ],
          };
        }
      })
    );
  }, []);

  const testServe = new TestService();

  const onSubmit = async (values) => {
    let activity = {
      user_assessments_id: data.user_assessments_id,
      report_data: values.question,
    };
    setLoader(true);
    try {
      let response = await testServe.reportQuestion(activity);
      if (response.status === "success") {
        setLoader(false);
        sessionStorage.setItem("reportresponse", response.status);
        setModalOpen(false);
        setReportQuestion([]);
      } else {
        setLoader(false);
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <div
      className="modal in"
      id="modalReportedQuestion"
      style={{ display: "block" }}
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content" style={{ bordeRadius: "unset" }}>
          <div className="modal-header report-bg">
            <span
              className="modal-title"
              style={{ fontWeight: "900", fontSize: "large" }}
            >
              Reported Question Comments
            </span>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row form-group">
                <div className="col-md-1 fw-bold">
                  S.No.
                </div>
                <div className="col-md-7 fw-bold">
                  Question
                </div>
                <div className="col-md-4 fw-bold" >
                  Comment
                </div>
              </div>
              <Formik
                initialValues={value}
                onSubmit={onSubmit}
                enableReinitialize={true}
              >
                {(props) => (
                  <form onSubmit={props.handleSubmit}>
                    {reportQuestion.map((v, i) => (
                      <>
                        <div className="row form-group" key={i}>
                          <div
                            className="col-md-1"
                            style={{ fontWeight: "bold" }}
                          >
                            {i + 1}
                          </div>
                          <div className="col-md-7">
                            <input
                              type="text"
                              ref={question_idInputRef}
                              defaultValue={v.id}
                              id={`question.${i}.question_id`}
                              style={{ display: "none" }}
                              name={`question.${i}.question_id`}
                            />
                            <p
                              className=" ssdn-editor-font"
                              dangerouslySetInnerHTML={{ __html: v.question }}
                            />
                          </div>
                          <div className="col-md-4">
                            <textarea
                              className="form-control"
                              id={`question.${i}.comment`}
                              name={`question${i}.comment`}
                              onChange={(event) => {
                                props.setFieldValue(
                                  `question.${i}.comment`,
                                  event.target.value
                                );
                              }}
                            ></textarea>
                          </div>
                        </div>
                      </>
                    ))}
                    {loader ? (
                      <div className="col-lg-12 text-center mt-1">
                      <strong className="me-2">Loading...</strong>
                      <div className="spinner-border text-warning"
                      ></div>
                  </div>
                    ) : (
                      <div className="modal-footer">
                        <div className="col-sm-7">
                          <button
                            type="submit"
                            className="edu-btn"
                            id="modal-save-reportQuestion"
                          >
                            Submit
                          </button>
                        </div>
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
  );
}

export default ReportedQuestionPop;
