import React, { useEffect, useState } from "react";
import TestService from "../../Services/TestService";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../Container/Context";
import Utils from "../../Utils/Utils";
import { Link } from "react-router-dom";
import MetaService from "../../Services/MetaServices/MetaService";

const ReportedQuestionPop = React.lazy(() =>
  import("./ReportQuestion/ReportQuestionPop")
);

const ExamResult = () => {
  let url = process.env.REACT_APP_API_BASEURL;
  const testServe = new TestService();
  const metaService = new MetaService();
  const params = useParams();
  const { reported } = useContext(CartContext);
  const [reportQuestion, setReportQuestion] = reported;
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState({});
  const [meta, setMeta] = useState({
    title: "",
    keywords: "",
    description: "",
  });
  const ref = React.createRef();
  useEffect(() => {
    if (params.id) {
      testResultApiData();
    }
    getmetaData("exam-result");
  }, []);

  window.addEventListener("popstate", () => {
    window.history.go(1);
  });

  const testResultApiData = async () => {
    setLoading(true);
    try {
      let response = await testServe.testResultData(params.id);
      if (response) {
        setResultData(response.data);
        setLoading(false);
      } else {
        console.log();
      }
    } catch (error) {
      throw error;
    }
  };

  var date = new Date(resultData?.duration * 1000);
  var hh = date.getUTCHours();
  var mm = date.getUTCMinutes();
  var ss = date.getSeconds();
  if (hh < 10) {
    hh = "0" + hh;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  if (ss < 10) {
    ss = "0" + ss;
  }
  var t = hh + ":" + mm + ":" + ss;

  const getmetaData = async () => {
    try {
      let response = await metaService.getMetadetail("voucher");
      if (response.status === "success") {
        setMeta({
          title: response.data.meta_title,
          Keywords: response.data.meta_keywords,
          description: response.data.meta_description,
        });
      }
    } catch (err) {
      throw err;
    }
  };
  useEffect(() => {
    return () => {
      sessionStorage.removeItem("reportresponse");
    };
  }, []);
  return (
    <>
      {reportQuestion.length > 0 ? (
        <React.Suspense fallback="Loading...">
          <ReportedQuestionPop />
        </React.Suspense>
      ) : null}
      <div className="edu-course-details-area edu-section-gap bg-color-white">
        <div className="container">
          {loading ? (
            <div className="text-center mt-1">
              <strong className="me-2">Loading...</strong>
              <div className="spinner-border text-warning"></div>
            </div>
          ) : (
            <div className="row" style={{ justifyContent: "center" }}>
              <div className="col-xl-12 mt--0">
                <div className="course-details-card ">
                  <div className="course-details-content text-center">
                    <h2 className="ssdn-heading-result mb--5">Result</h2>
                    <h6 className="fw-bold mx-auto">
                      {Utils.titleCase(resultData?.assessment?.name)}
                    </h6>
                  </div>

                  <div className="card">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-md-4">
                          <div className="scrdtdiv">
                            <div
                              className={
                                resultData?.result === "pass"
                                  ? "circle-pass wrongTxt"
                                  : "circle wrongTxt"
                              }
                            >
                              <p>
                                <span>{resultData?.correct_question}</span>Out
                                of
                                {"  "} {resultData?.total_questions}
                              </p>
                            </div>
                            <div className="result-type text-center mt--10">
                              {resultData?.result === "fail" && (
                                <p className="text-danger text-center">
                                  You need to work hard!
                                </p>
                              )}
                              {resultData?.result === "pass" && (
                                <p className="text-success text-center">
                                  The Assessment has been Successfully cleared
                                </p>
                              )}
                              {sessionStorage.getItem("reportresponse") ===
                                "success" && (
                                <p className="text-success text-center">
                                  Your reported questions has been submitted
                                  successfully. We will check and update within
                                  48 hours
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="eduvibe-widget-details">
                            <div className="widget-content">
                              <ul>
                                <li>
                                  <span>Attempted </span>
                                  <span className="design-data">-</span>
                                  <span>{resultData?.attempted_question}</span>
                                </li>

                                <li>
                                  <span>Correct</span>
                                  <span className="design-data">-</span>
                                  <span>{resultData?.correct_question}</span>
                                </li>

                                <li>
                                  <span>InCorrect</span>
                                  <span className="design-data">-</span>
                                  <span>{resultData?.incorrect_question}</span>
                                </li>

                                <li>
                                  <span>Skipped</span>
                                  <span className="design-data">-</span>
                                  <span>{resultData?.skipped_question}</span>
                                </li>
                                <li>
                                  <span>Time spent</span>
                                  <span className="design-data">-</span>
                                  {t}
                                </li>
                                <li>
                                  <span>Result</span>
                                  <span className="design-data">-</span>
                                  <span>
                                    {Utils.titleCase(resultData?.result)}
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          {resultData?.certificate ? (
                            <div className="eduvibe-widget-details mt--35 text-center">
                              <a
                                className="edu-btn"
                                href={`${url}web/download-certificate/${params.id}`}
                                target="_blank"
                              >
                                Download Your Certificate
                              </a>
                            </div>
                          ) : (
                            <p className="text-center">
                              No Certificate in this course
                            </p>
                          )}
                        </div>
                        <div className="col-md-12 border-top text-center">
                          <Link
                            className="edu-btn text-center mt--20 me-5"
                            to="/my-assessment"
                          >
                            Revise Test
                          </Link>
                          <Link
                            className="edu-btn text-center mt--20"
                            to="/assessment"
                          >
                            Explore More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ExamResult;
