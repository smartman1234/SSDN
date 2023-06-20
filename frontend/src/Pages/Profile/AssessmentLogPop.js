import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Utils from "../../Utils/Utils";
import AssessmentService from "../../Services/AssessmentService";
import { useState } from "react";

const QuestionAnswerLog = React.lazy(() => import("./QuestionAnswerLog"));

export default function AssessmentLogPop({ logPop, setLogPop, logList }) {
  const [reportList, setReportList] = useState([]);
  const [questionPop, setQuestionPop] = useState(false);
  const QuestionLog = async (id) => {
    setQuestionPop(true);
    const assessentServe = new AssessmentService();
    try {
      setReportList([]);
      let response = await assessentServe.questionlog(id);
      if (response.status === "success") {
        setReportList(response.data?.questions);
      } else {
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <div
      className={logPop ? "modal fade show" : "modal fade"}
      style={logPop ? { display: "block" } : { display: "none" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Assessment Logs
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setLogPop(false)}
            ></button>
          </div>
          {logList.length > 0 ? (
            <div className="modal-body ">
              <div className="table-responsive">
                <table className="table text-nowrap">
                  <thead>
                    <tr>
                      <th style={{ textAlign: "center" }}>S.No.</th>
                      <th style={{ textAlign: "center" }}>Date</th>
                      <th style={{ textAlign: "center" }}>Total Questions</th>
                      <th style={{ textAlign: "center" }}>Questions Attempted</th>
                      <th style={{ textAlign: "center" }}>Scored Marks</th>
                      <th style={{ textAlign: "center" }}>Result</th>
                      <th style={{ textAlign: "center" }}>Correct / Incorrect</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logList.map((v, i) => (
                      <tr key={i} className="align-middle">
                        <td style={{ textAlign: "center" }}>{i + 1}</td>
                        <td style={{ textAlign: "center" }}>
                          {moment(v.created_at).format("lll")}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {v.total_questions}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {v.attempted_question}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {v?.score === null ? "0" : v.score}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {Utils.titleCase(
                            v?.result === null ? "Fail" : v?.result
                          )}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Link
                            to="#"
                            className="edu-btn"
                            onClick={() => QuestionLog(v.id)}
                          >
                            View
                          </Link>
                          {questionPop && (

<React.Suspense fallback="">
<QuestionAnswerLog
                              questionPop={questionPop}
                              setQuestionPop={setQuestionPop}
                              reportList={reportList}
                            />
</React.Suspense>
                          
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="modal-body d-flex justify-content-center">
              <div className="p-2">No assessment log available</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
