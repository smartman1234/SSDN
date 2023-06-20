import React from "react";
import ShowMoreText from "react-show-more-text";

export default function QuestionAnswerLog({
  questionPop,
  setQuestionPop,
  reportList,
}) {
  const executeOnClick = (isExpanded) => {};

  return (
    <div
      className={questionPop ? "modal fade show" : "modal fade"}
      style={questionPop ? { display: "block" } : { display: "none" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <div className="modal-header d-flex">
            <h5 className="modal-title">
              Assessment Question Answer Logs
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setQuestionPop(false)}
            ></button>
          </div>
          <div className="modal-body ssdn-scroll-forquestion">
            <div className="table-responsive">
              <table className="table" style={{ whiteSpace: "break-spaces" }}>
                <thead>
                  <tr>
                    <th width="10%" className="text-center">
                      Sr No.
                    </th>
                    <th width="60%">Questions</th>
                    <th className="text-center">Correct Answer</th>
                    <th className="text-center">Status</th>
                  </tr>
                </thead>
                {reportList.length > 0 ? (
                  <tbody className="ssdn-question-answer">
                    {reportList.map((v, i) => (
                      <>
                        {v.sub_question.length <= 0 ? (
                          <tr className="align-middle"  key={i}>
                            <td className="text-center">{i + 1}</td>
                            <td>
                              <ShowMoreText
                                lines={2}
                                more="Show more"
                                less="Show less"
                                className="content-css mb-2"
                                anchorclassName="show-more-less-clickable"
                                onClick={executeOnClick}
                                expanded={false}
                                truncatedEndingComponent={"... "}
                              >
                                <p
                                  width="60%"
                                  className="ssdn-editor-font"
                                  dangerouslySetInnerHTML={{
                                    __html: v.question.replaceAll("...", ""),
                                  }}
                                ></p>
                              </ShowMoreText>
                            </td>

                            <td style={{ textAlign: "center", width: "180px" }}>
                              {v.result?.assessment_answer}
                            </td>
                            {v?.result?.is_right === 0 && (
                              <td style={{ textAlign: "center", color: "red" }}>
                                Incorrect
                              </td>
                            )}
                            {v?.result?.is_right === 1 && (
                              <td
                                style={{ textAlign: "center", color: "green" }}
                              >
                                Correct
                              </td>
                            )}
                            {v.result === null && (
                              <td style={{ textAlign: "center" }}>
                                not attempt
                              </td>
                            )}
                          </tr>
                        ) : (
                          <>
                            <tr className="align-middle">
                              <td
                                rowspan={v.sub_question?.length + 1}
                                className="text-center"
                              >
                                {i + 1}
                              </td>
                              <td>
                                <ShowMoreText
                                  lines={2}
                                  more="Show more"
                                  less="Show less"
                                  className="content-css pb-4 mb-4"
                                  anchorclassName="show-more-less-clickable"
                                  onClick={executeOnClick}
                                  expanded={false}
                                  width={550}
                                  truncatedEndingComponent={"... "}
                                >
                                  <p
                                    className="ssdn-editor-font"
                                    dangerouslySetInnerHTML={{
                                      __html: v.question.replaceAll("...", ""),
                                    }}
                                  ></p>
                                </ShowMoreText>
                              </td>

                              <td
                                style={{
                                  textAlign: "center",
                                  width: "180px",
                                }}
                              >
                                --
                              </td>
                              <td
                                style={{
                                  textAlign: "center",
                                  width: "180px",
                                }}
                              >
                                --
                              </td>
                            </tr>

                            {v.sub_question.map((value, i) => (
                              <>
                                <tr className="align-middle">
                                  <td>
                                    <ShowMoreText
                                      lines={2}
                                      more="Show more"
                                      less="Show less"
                                      className="content-css mb-2"
                                      anchorclassName="show-more-less-clickable"
                                      onClick={executeOnClick}
                                      expanded={false}
                                      truncatedEndingComponent={"... "}
                                    >
                                      <p
                                        className="ssdn-editor-font"
                                        dangerouslySetInnerHTML={{
                                          __html: value.question.replaceAll(
                                            "...",
                                            ""
                                          ),
                                        }}
                                      ></p>
                                    </ShowMoreText>
                                  </td>

                                  <td
                                    style={{
                                      textAlign: "center",
                                      width: "180px",
                                    }}
                                  >
                                    {value.result?.assessment_answer}
                                  </td>
                                  {v?.result?.is_right === 0 && (
                                    <td
                                      style={{
                                        textAlign: "center",
                                        color: "red",
                                      }}
                                    >
                                      Incorrect
                                    </td>
                                  )}
                                  {v?.result?.is_right === 1 && (
                                    <td
                                      style={{
                                        textAlign: "center",
                                        color: "green",
                                      }}
                                    >
                                      Correct
                                    </td>
                                  )}
                                  {v.result === null && (
                                    <td style={{ textAlign: "center" }}>
                                      not attempt
                                    </td>
                                  )}
                                </tr>
                              </>
                            ))}
                          </>
                        )}
                      </>
                    ))}
                  </tbody>
                ) : (
                  <p>No Question Answer Log available</p>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
