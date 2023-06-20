import React, { useState,  } from "react";
import { Tabs, Tab, Row, Col, Container } from "react-bootstrap";
import Utils from "../../Utils/Utils";

const GroupQuestion = (list, count) => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div className="row">
      <div className="col-md-6 col-sm-1">
        <span>Question {list.index + 1}</span>
        <div
          className="title para title-question ssdn-editor-font"
          dangerouslySetInnerHTML={{ __html: list.list.question }}
        />
      </div>

      <div className="col-md-6 col-sm-12">
        
        <Container>
          <Row>
            <Col>
              <Tabs
                activeKey={currentTab}
                id="controlled-tab-example"
                className="main_tab"
              >
                {list.list?.sub_question?.map((sub, subIndex) => (
                  <Tab
                    key={subIndex}
                    eventKey={subIndex}
                    disabled={currentTab !== 0}
                  >
                    <div className="content p-0" key={subIndex}>
                      {(sub.type === "radio" || sub.type === "checkbox") && (
                        <>
                          <div className="d-flex mt-3">
                            
                            <span className="me-3">
                              ({Utils?.alphabet(subIndex)?.toLowerCase()})
                            </span>
                            <h6
                              className="title ssdn-editor-font"
                              dangerouslySetInnerHTML={{ __html: sub.question }}
                            />
                          </div>

                          {sub?.options?.map((option, optionIndex) => (
                            <div className="content p-0" key={optionIndex}>
                              {sub.type === "radio" && (
                                <div className="edu-form-check mb-2">
                                  <input
                                    type="radio"
                                    id={`option.id.${option.id}`}
                                    name={`${list.name}.answer.${subIndex}`}
                                    value={option.option_id}
                                    onChange={(e) => {
                                      list.props.setFieldValue(
                                        `${list.name}.${subIndex}.question_id`,
                                        sub.id
                                      );

                                      list.props.setFieldValue(
                                        `${list.name}.${subIndex}.answer`,
                                        [option.option_id]
                                      );
                                    }}
                                  />

                                  <label htmlFor={`option.id.${option.id}`}>
                                    <p
                                      className="mb--0 ssdn-editor-font"
                                      dangerouslySetInnerHTML={{
                                        __html: option.answer,
                                      }}
                                    />
                                  </label>
                                </div>
                              )}
                              {sub.type === "checkbox" && (
                                <div className="edu-form-check mb-2">
                                  <input
                                    type="checkbox"
                                    id={`option.id.${option.id}`}
                                    name={`${list.name}.${subIndex}.answer.${subIndex}`}
                                    value={option.option_id}
                                    onChange={(e) => {
                                      list?.props.setFieldValue(
                                        `${list.name}.${subIndex}.question_id`,
                                        sub.id
                                      );

                                      list.props.setFieldValue(
                                        `${list.name}.${subIndex}.answer.${optionIndex}`,
                                        e.target.checked ? e.target.value : ""
                                      );
                                    }}
                                  />

                                  <label htmlFor={`option.id.${option.id}`}>
                                    <p
                                      className="mb--0 ssdn-editor-font"
                                      dangerouslySetInnerHTML={{
                                        __html: option.answer,
                                      }}
                                    />
                                  </label>
                                </div>
                              )}
                            </div>
                          ))}
                        </>
                      )}
                      {sub.type === "drop_down" && (
                        <>
                          <h6
                            className="title ssdn-editor-font"
                            dangerouslySetInnerHTML={{ __html: sub.question }}
                          />

                          <div className="edu-form-check mb-2">
                            <select
                              className="form-select"
                              name={`${list.name}.${subIndex}.answer`}
                              onChange={(e) => {
                                list.props.setFieldValue(
                                  `${list.name}.${subIndex}.question_id`,
                                  sub.id
                                );
                                list.props.setFieldValue(
                                  `${list.name}.${subIndex}.answer`,
                                  [e.target.value]
                                );
                              }}
                            >
                              <option value="0">select Answer</option>
                              {sub.options.map((v, i) => (
                                <option value={v.option_id} key={i}>
                                  <p className="ssdn-editor-font"
                                    dangerouslySetInnerHTML={{
                                      __html: v.answer,
                                    }}
                                  />
                                </option>
                              ))}
                            </select>
                          </div>
                        </>
                      )}
                    </div>
                  </Tab>
                ))}
              </Tabs>
            </Col>
          </Row>
          <div className="card-bottom">
            <div className="d-flex mb--10">
              <div
                className="read-more-btn"
                style={
                  currentTab === 0
                    ? { pointerEvents: "none", justifyContent: "space-between" }
                    : {}
                }
                onClick={() => {
                  list.setValues({ ...list.values });
                  setCurrentTab((prev) => prev - 1);
                }}
              >
                <button
                  className="edu-btn me-2 ssdn-button-data"
                  type="button"
                  style={currentTab === 0 ? { background: "bisque" } : {}}
                >
                  <i className="ri-arrow-left-s-line"></i>
                  Previous
                </button>
              </div>

              <div
                className="read-more-btn"
                style={
                  currentTab === list.list?.sub_question.length - 1
                    ? { pointerEvents: "none" }
                    : {}
                }
                onClick={() => {
                  list.setValues({ ...list.values });
                  setCurrentTab((prev) => prev + 1);
                }}
              >
                <button
                  className="edu-btn ssdn-button-data"
                  type="button"
                  style={
                    currentTab === list.list?.sub_question.length - 1
                      ? { background: "bisque" }
                      : {}
                  }
                >
                  Next<i className="ri-arrow-right-s-line"></i>
                </button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default GroupQuestion;
