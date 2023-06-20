import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import ReportedQuestionService from "../../../Services/ReportedQuestionService";

function ReportedQuestionForm() {
  const [questionData, setQuestionData] = useState({
    question: [{ id: "", admin_comment: "", status: "" }],
    user_assessments_id: "",
  });
  const [mainData, setMaindata] = useState([]);
  const [admin, setAdmin] = useState();
  const [status, setStatus] = useState("");

  const [data, setData] = useState();
  const [userComment, setUserComment] = useState("");
  const question = new ReportedQuestionService();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.id) {
      ReportedQuestionDetail();
    }
  }, []);

  const onSubmit = async (values) => {
    if (values.user_assessments_id) {
      let obj = {
        user_assessments_id: values.user_assessments_id,

        question: values.question,
      };
    
      try {
        let response = await question.updateQuestion(obj);
        if (response.status === "success") {
        
          navigate("/reported-questions");
        } else {
        
          toast.error(
            response.data.question || response.data.user_assessments_id
          );
        }
      } catch (err) {
        throw new err();
      }
    }
  };
  const ReportedQuestionDetail = async () => {
    try {
      let response = await question.questionDetail(params?.id);
      if (response) {
        setMaindata(response.data);

        for (const i of response.data) {
          setAdmin(i.admin_comment);
        }

        let item = [];
        response.data.forEach((v, i) => {
          return (item[i] = {
            status: v.status,
            admin_comment: v.admin_comment,
            id: v.id,
          });
        });

        setQuestionData({
          user_assessments_id: params?.id,
          question: item,
        });
      } else {
      }
    } catch (err) {
      throw err;
    }
  };

  const name = (
    <Link to="/reported-questions">
      <button className="btn btn-primary" id="nextBtn" type="button">
        Back
      </button>
    </Link>
  );
  return (
    <div className="page-body">
      <Breadcrumb
        heading="View Reported Questions"
        subheading="Reported Question"
        add={name}
      />
      <div className="container-fluid support-ticket">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>View Reported Question</h5>
              </div>

              <div className="card-body">
                <Formik
                  initialValues={questionData}
                  onSubmit={onSubmit}
                  enableReinitialize={true}
                >
                  {(props) => (
                    <form className="" onSubmit={props.handleSubmit}>
                      {mainData?.map((v, i) => (
                        <div className="widget-joins card widget-arrow" key={i}>
                          <div>
                            <input
                              type="text"
                              name="user_assessments_id"
                              value={props.values.user_assessments_id}
                              style={{ display: "none" }}
                            />
                          </div>
                          <div className="row">
                            <div className="col-sm-6 b-b-light p-r-0 p-l-0">
                              <div className="media ">
                                <div className="align-self-center text-start ">
                                  <label htmlFor="name">Question</label>
                                  <p
                                    className="mb-0 ssdn-editor-font"
                                    dangerouslySetInnerHTML={{
                                      __html: v.questions?.question,
                                    }}
                                  />
                                  <input
                                    type="text"
                                    name={`question.${i}.id`}
                                    value={props.values.question[i]?.id}
                                    style={{ display: "none" }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-6 b-b-light p-r-0 p-l-0">
                              <div className="media row">
                                <div className="align-self-center text-start p-r-0 p-l-0">
                                  <label htmlFor="name">Question Option</label>
                                  <ul>
                                    {v.questions?.options?.map((option, id) => (
                                      <li className="row" key={id}>
                                        <div className="align-self-center p-l-0 col-md-6 media-body">
                                          <p className="ssdn-editor-font"
                                            dangerouslySetInnerHTML={{
                                              __html: option.answer,
                                            }}
                                          />
                                        </div>
                                        <span className="col-md-6 font-primary">
                                          {option.images?.image ? (
                                            <img
                                              src={option.images?.image}
                                              style={{
                                                width: "30px",
                                                height: "30px",
                                              }}
                                            />
                                          ) : null}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-6 p-r-0 p-l-0">
                              <div className="media row">
                                <div className="align-self-center text-start p-r-0 p-l-0">
                                  <label htmlFor="name">User Comment</label>
                                  <p className="mb-3">{v.comment}</p>
                                </div>
                                <div className="align-self-center text-start p-r-0 p-l-0">
                                  <label htmlFor="status">Status</label>
                                  <div>
                                    
                                    <p>{v.status}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-6 p-r-0 p-l-0">
                              <div className="media row">
                                <div className="align-self-center text-start form-group p-r-0 p-l-0">
                                  <label htmlFor="name">Admin Comment</label>
                                  <div>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name={`question.${i}.admin_comment`}
                                      onChange={props.handleChange}
                                      value={
                                        props.values.question?.[i]
                                          ?.admin_comment
                                      }
                                      placeholder="Enter comment"
                                    />
                                  </div>
                                </div>

                                <div className="align-self-center  text-start col-6">
                                  <div className="form-group m-t-15 m-checkbox-inline mb-0 custom-radio-ml">
                                    <div className="radio radio-primary">
                                      <input
                                        id={`approve.${i}`}
                                        type="radio"
                                        name={`question.${i}.status`}
                                        value="approve"
                                        checked={
                                          props.values.question?.[i]?.status ===
                                          ""
                                            ? v.status === "approve"
                                            : props.values.question?.[i]
                                                ?.status === "approve"
                                        }
                                        onChange={(e) => {
                                          props.setFieldValue(
                                            `question.${i}.status`,

                                            e.target.value
                                          );
                                        }}
                                      />

                                      <label
                                        className="mb-0"
                                        htmlFor={`approve.${i}`}
                                      >
                                        Approve
                                      </label>
                                    </div>
                                    <div className="radio radio-primary">
                                      <input
                                        id={`reject.${i}`}
                                        type="radio"
                                        name={`question.${i}.status`}
                                        checked={
                                          props.values.question?.[i]?.status ===
                                          ""
                                            ? v.status === "reject"
                                            : props.values.question?.[i]
                                                ?.status === "reject"
                                        }
                                        value="reject"
                                        onChange={(e) => {
                                          props.setFieldValue(
                                            `question.${i}.status`,

                                            e.target.value
                                          );
                                        }}
                                      />
                                      <label
                                        className="mb-0"
                                        htmlFor={`reject.${i}`}
                                      >
                                        Reject
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="text-end btn-mb">
                        <button
                          className="btn btn-primary"
                          type="submit"
                          style={{ display: "inline" }}
                        >
                          Update
                        </button>
                      </div>
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

export default ReportedQuestionForm;
