import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Tabs, Tab, Row, Col, Container } from "react-bootstrap";
import Utils from "../../Utils/Utils";

const DragDropQuestion = (list, count) => {
  const [questionId, setQuestionId] = useState("");
  const [optionId, setOptionId] = useState("");
  const [currentTab, setCurrentTab] = useState(0);

  function dragStarted(evt) {
    const arr = evt.dataTransfer.setData("text", evt.target.id);
    setOptionId(evt.target.id);
  }
  const fileDropped = (ev, option, id, subIndex) => {
    setQuestionId(id);
    let splitedIndex = optionId.split("_");
    ev.preventDefault();
    var data = ev.dataTransfer.getData("Text");
    ev.target.appendChild(document.getElementById(data));
    if (ev.target.id === "darganddrop") {
      list.props.setFieldValue(`${list.name}.${subIndex}.question_id`, id);
      list.props.setFieldValue(`${list.name}.${subIndex}.answer`, [
        splitedIndex[0],
      ]);
    } else {
      let nData = list?.props?.values?.questions;


      nData = nData.map(function(el){
        el.question = el.question.filter(function(x, i){ return i!==subIndex; });
        return el;
      });
      let questionsData = [];
      list.props.setValues({ questions: nData });
    }
  };

  function allowDrop(evt) {
    evt.preventDefault();
  }

  function dragEnd(ev) {
    if (ev.dataTransfer.dropEffect == "none") {
      var parent = document.getElementById(
        ev.target.getAttribute("data-parent")
      );

      parent.appendChild(ev.target);
    }
  }

  return (
    <div className="row question-answer-data">
      <div className="col-md-6" style={{ borderRight: "1px solid #eee" }}>
        <span>Question. {list?.index + 1}</span>
        <h6
          className="title-question para title ssdn-editor-font"
          dangerouslySetInnerHTML={{ __html: list.list.question }}
        />
        <p className="p-3 fw-bold ">
          Drag your answer in the blank box
          <i className="fa-sharp fa-solid fa-arrow-right p-3"></i>
        </p>
        {list.list?.options?.map((sub, subIndex) => (
          <div className="mt-3">
            
            <div className="content p-0" key={subIndex}>
              <div className="edu-form-check mb-0">
                <ul className="mb-0" draggable>
                  <li
                    id={`ansers_${sub.id}`}
                    className="title mt-0"
                    onDrop={(ev) =>
                      fileDropped(ev, sub.option_id, questionId, subIndex)
                    }
                    onDragOver={(ev) => allowDrop(ev, sub.option_id, sub.id)}
                  >
                    <div
                      id={`${sub.option_id}_${sub.id}`}
                      draggable="true"
                      onDragStart={(ev) => dragStarted(ev)}
                      onDragEnd={(event) => dragEnd(event)}
                      dangerouslySetInnerHTML={{ __html: sub.answer }}
                      className="draggable-items ssdn-editor-font"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="col-md-6">
        <Tabs
          activeKey={currentTab}
          id="controlled-tab-example"
          className="main_tab"
        >
          {list.list?.sub_question?.map((sub, subIndex) => (
            <Tab key={subIndex} eventKey={subIndex} disabled={currentTab !== 0}>
              <div className="content ssdn-drag" key={subIndex}>
                <div className="edu-form-check mb-2">
                  <span>({Utils?.alphabet(subIndex)?.toLowerCase()})</span>
                  <h6
                    className="title ssdn-editor-font"
                    dangerouslySetInnerHTML={{ __html: sub.question }}
                  />
                  <div
                    className="drop-content ssdn-editor-font ssdn-height p-3"
                    id={`darganddrop`}
                    onDrop={(ev) =>
                      fileDropped(ev, sub.option_id, sub.id, subIndex)
                    }
                    onDragOver={(ev) => allowDrop(ev, sub.option_id, sub.id)}
                  />
                </div>
              </div>
            </Tab>
          ))}
        </Tabs>
        <div className="card-bottom">
          <div className="d-flex justify-content-center mb--10">
            <div
              className="read-more-btn"
              style={
                currentTab === 0
                  ? { pointerEvents: "none", justifyContent: "space-between" }
                  : {}
              }
              onClick={() => {
                setCurrentTab((prev) => prev - 1);
              }}
            >
              <Link
                className="edu-btn me-2"
                to="#"
                style={currentTab === 0 ? { background: "bisque" } : {}}
              >
                <i className="ri-arrow-left-s-line"></i>
                Previous
              </Link>
            </div>

            <div
              className="read-more-btn"
              style={
                currentTab === list.list?.sub_question.length - 1
                  ? { pointerEvents: "none", display: "none" }
                  : {}
              }
              onClick={() => {
                list.setCount(list.count + 1);
                setCurrentTab((prev) => prev + 1);
              }}
            >
              <Link
                className="edu-btn"
                to="#"
                style={
                  currentTab === list.list?.sub_question.length - 1
                    ? { background: "bisque" }
                    : {}
                }
              >
                Next<i className="ri-arrow-right-s-line"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DragDropQuestion;
