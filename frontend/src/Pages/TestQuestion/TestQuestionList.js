import React, { useEffect, useState, } from "react";
import { Formik } from "formik";
import { Tabs, Tab, Row, } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import TestService from "../../Services/TestService";
import GroupQuestion from "./GroupQuestion";
import Timer from "./Timer";
import DragDropQuestion from "./DragDropQuestion";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useContext } from "react";
import { CartContext } from "../../Container/Context";
import DragDrop from "./DragDrop";
import Pagination from "../../Container/Pagination";

const TestQuestionList = () => {
    let PageSize = 1;
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const { testResult, modal, reported, dataValue, } =
        useContext(CartContext);
    const [modalOpen, setModalOpen] = modal;
    const [countTime, setCountTime] = useState(1);
    const params = useParams();
    const [name, setName] = useState("");
    const [reportQuestion, setReportQuestion] = reported;
    const [duration, setDuration] = useState("");
    const [testResponse, setTestResponse] = testResult;
    const [questionList, setQuestionList] = useState([]);
    const [isActive, setIsActive] = useState(0);
    const [optionCount, setoptionCount] = useState(0);
    const [questionIds, setQuestionIds] = useState([]);
    const [quesId, setQuesId] = useState("");
    const [dragDropState, setDragDropState] = useState({});
    const [selectedItem, setSelectedItem] = useState(0);
    const [reviewQuestion, setReviewQuestion] = useState({});

    const [count, setCount] = useState(0);

    const [currentTab, setCurrentTab] = useState(0);
    const [values, setValues] = useState({
        questions: [
            {
                question: [{ question_id: "", answer: [] }],
            },
        ],
    });

    const [data, setData] = dataValue;
    const testServe = new TestService();

    useEffect(() => {
        window.scroll(0, 0);
        TestQuestionListApi();
        return () => {
            sessionStorage.removeItem("reviewed-items");
        };
    }, []);

    const questionlength = questionList?.length - 1;
    const TestQuestionListApi = async () => {
        let obj = { assessments_slug: params.id };
        try {
            let response = await testServe.testQuestionList(obj);
            if (response) {
                for (const i of response.data?.questions) {
                }
                setName(response.data?.name);
                setData(response.data);
                setDuration(response.data?.duration);
                setQuestionList(response.data?.questions);
            } else {
                toast.error();
            }
        } catch (error) {
            throw error;
        }
    };

    const handleSubmit = (values, { resetForm }) => {
        const items = values?.questions?.filter((v) =>
            v?.question.map((v) => {
                return {
                    ...v,
                    answer: v?.answer.filter((k) => k),
                };
            })
        );
        let reviewedquestion = Object.keys(reviewQuestion);
        reviewedquestion = reviewedquestion.filter(function (key) {
            return reviewQuestion[key];
        });
        reviewedquestion = reviewedquestion.map((v) => parseInt(v) + 1);
        const reviewConfirmation = window.confirm(
            questionIds.length > 0
                ? `${reviewedquestion.join()} Question Numbers are there for review. Do you still want to submit the assessment?`
                : "Do you want to submit Assessment ?"
        );

        let activity = {
            user_assessments_id: data.user_assessments_id,
        };
        let answerArray = [];

        for (const i of items) {
            for (const j of i.question) {
                answerArray.push(j);
            }
        }
        let dataToPush = answerArray.map((v) => {
            return { ...v, answer: v?.answer.filter((k) => k) };
        });
        dataToPush = dataToPush.filter((v) => {
            if (v.question_id) {
                return { question_id: v.question_id, answer: v.answer };
            }
        });
        let obj = {
            user_assessments_id: data.user_assessments_id,
            question_data: dataToPush,
        };

        try {
            if (dataToPush.length >= 1) {
                testServe
                    .answersubmitted(obj)
                    .then((res) => {
                        if (res.status === "success") {
                            setTestResponse(res.data);
                            if (reviewConfirmation) {
                                testServe
                                    .testsubmitted(activity)
                                    .then((res) => {
                                        if (res.status === "success") {
                                            navigate(`/exam-result/${res.data.user_assessments_id}`);
                                            setModalOpen(true);

                                            setTestResponse(res.data);
                                        } else {
                                            toast.error("something went wrong");
                                        }
                                    })
                                    .catch(() => {
                                        toast.error("something went wrong");
                                    });
                            }

                            resetForm();
                            setValues({
                                questions: [
                                    {
                                        question: [{ question_id: "", answer: [] }],
                                    },
                                ],
                            });
                        } else {
                            toast.error("something went wrong");
                        }
                    })
                    .catch(() => {
                        toast.error("something went wrong");
                    });
            } else {
                if (reviewConfirmation) {
                    testServe
                        .testsubmitted(activity)
                        .then((res) => {
                            if (res.status === "success") {
                                navigate(`/exam-result/${res.data.user_assessments_id}`);
                                setModalOpen(true);

                                setTestResponse(res.data);
                            } else {
                                toast.error("something went wrong");
                            }
                        })
                        .catch(() => {
                            toast.error("something went wrong");
                        });
                }
            }
        } catch (err) {
            throw err;
        }
    };

    let report = [];
    const ReportQuestionHandle = (e, v) => {
        if (e.target.checked) {
            setReportQuestion([...reportQuestion, v]);
        } else {
            const selectedReportQuestion = reportQuestion.filter((e) => {
                return e.id !== v.id;
            });
            setReportQuestion(selectedReportQuestion);
        }
    };



    const reviewQuestionQuestionHandle = (index, event, questionIndex) => {
        let selected;
        if (event.target.checked) {
            selected = [...questionIds, index];

            setQuesId(index);
            setQuestionIds(selected);
            setSelectedItem((isActive * 1) % questionList.length);
        } else {
            selected = questionIds.filter((v, i) => v !== index);
            setQuestionIds(selected);
        }
        setReviewQuestion({
            ...reviewQuestion,
            [questionIndex]: !reviewQuestion[questionIndex],
        });
    };

    const takingInitialState = (data) => {
        setDragDropState(data);
    };

    window.onbeforeunload = function () {
        return "Your upload will be lost if you leave the page, are you sure?";
    };
    return (
        <div className="container-fluid">
            <Formik
                initialValues={values}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {(props) => (
                    <>
                        <form onSubmit={props.handleSubmit}>
                            <div className="mt-4 mb-4">
                                <div className="col-md-12">
                                    <div className="edu-card ssdn-hover card-type-3 radius-small">
                                        <div className="inner">
                                            <div className="content">
                                                <Row>
                                                    <div className="col-md-12 for-slide-ssdn">
                                                        <Pagination
                                                            className="pagination-bar"
                                                            currentPage={currentPage}
                                                            totalCount={questionList.length}
                                                            pageSize={PageSize}
                                                            onPageChange={(page) => {
                                                                setCurrentPage(page);
                                                                setCurrentTab(page - 1);
                                                            }}
                                                            setIsActive={setIsActive}
                                                            isActive={isActive}
                                                            count={count}
                                                            currentTab={currentTab}
                                                            reviewQuestion={reviewQuestion}
                                                        />
                                                    </div>
                                                    <Tabs
                                                        activeKey={currentTab}
                                                        id="controlled-tab-example"
                                                        className="main_tab mt--10"
                                                    >
                                                        {questionList.map((v, questionIndex) => (
                                                            <Tab
                                                                key={questionIndex}
                                                                eventKey={questionIndex}
                                                                disabled={currentTab !== 0}
                                                            >
                                                                <div className="card-top bg-color-data">
                                                                    <div className="author-meta">
                                                                        <div className="author-thumb">
                                                                            <span className="author-title">
                                                                                No of Questions :{" "}
                                                                                <strong>
                                                                                    {data.number_of_question}
                                                                                </strong>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <ul className="edu-meta meta-02">
                                                                        <li>
                                                                            Left Time :
                                                                            <strong>
                                                                                <Timer
                                                                                    duration={duration}
                                                                                    setCountTime={setCountTime}
                                                                                    countTime={countTime}
                                                                                />
                                                                            </strong>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <div className="card-top">
                                                                    <div className="author-meta">
                                                                        <div className="author-thumb">
                                                                            <span className="author-title ">
                                                                                Question : {questionIndex + 1} of{" "}
                                                                                {questionList.length}
                                                                            </span>
                                                                            <span className="author-title m-3">
                                                                                {name}
                                                                            </span>
                                                                        </div>
                                                                    </div>

                                                                    <ul className="edu-meta meta-02">
                                                                        <li>
                                                                            <div className="edu-form-check">
                                                                                <input
                                                                                    type="checkbox"
                                                                                    id={questionIndex}
                                                                                    name={questionIndex}
                                                                                    value={v.question}
                                                                                    onChange={(e) =>
                                                                                        ReportQuestionHandle(e, v)
                                                                                    }
                                                                                />
                                                                                <label htmlFor={questionIndex}>
                                                                                    Report Question
                                                                                </label>
                                                                            </div>
                                                                        </li>
                                                                        <li>
                                                                            <div className="edu-form-check">
                                                                                <input
                                                                                    type="checkbox"
                                                                                    id={`review_${questionIndex}`}
                                                                                    name={`review_${questionIndex}`}
                                                                                    value={v.id}
                                                                                    onChange={(event) =>
                                                                                        reviewQuestionQuestionHandle(
                                                                                            v.id,
                                                                                            event,
                                                                                            currentTab
                                                                                        )
                                                                                    }
                                                                                />
                                                                                <label
                                                                                    htmlFor={`review_${questionIndex}`}
                                                                                >
                                                                                    Review Question
                                                                                </label>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                {(v.type === "radio" ||
                                                                    v.type === "checkbox") && (
                                                                        <>
                                                                            <span>Question. {questionIndex + 1}</span>
                                                                            <div className="ssdn-editor-font">
                                                                                <h6
                                                                                    className="title-question"
                                                                                    dangerouslySetInnerHTML={{
                                                                                        __html: v.question,
                                                                                    }}
                                                                                />
                                                                            </div>

                                                                            {v.options.map((option, optionIndex) => (
                                                                                <div key={optionIndex}>
                                                                                    {v.type === "radio" && (
                                                                                        <div className="edu-form-check mb-2">
                                                                                            <input
                                                                                                type="radio"
                                                                                                id={`option.id.${option.id}`}
                                                                                                name={`questions.${questionIndex}.question.${0}.answer`}
                                                                                                value={option.option_id}
                                                                                                onChange={(e) => {
                                                                                                    props.setFieldValue(
                                                                                                        `questions.${questionIndex}.question.${0}.question_id`,
                                                                                                        v.id
                                                                                                    );
                                                                                                    props.setFieldValue(
                                                                                                        `questions.${questionIndex}.question.${0}.answer`,
                                                                                                        [option.option_id]
                                                                                                    );
                                                                                                }}
                                                                                            />

                                                                                            <label
                                                                                                htmlFor={`option.id.${option.id}`}
                                                                                            >
                                                                                                <p
                                                                                                    className="mb-0 ssdn-editor-font"
                                                                                                    dangerouslySetInnerHTML={{
                                                                                                        __html: option.answer,
                                                                                                    }}
                                                                                                />
                                                                                            </label>
                                                                                        </div>
                                                                                    )}
                                                                                    {v.type === "checkbox" && (
                                                                                        <div className="edu-form-check mb-2">
                                                                                            <input
                                                                                                type="checkbox"
                                                                                                id={`option.id.${option.id}`}
                                                                                                name={`questions.${questionIndex}.question.${0}.answer.${optionIndex}`}
                                                                                                value={option.option_id}
                                                                                                onChange={(e) => {
                                                                                                    props.setFieldValue(
                                                                                                        `questions.${questionIndex}.question.${0}.question_id`,
                                                                                                        v.id
                                                                                                    );

                                                                                                    props.setFieldValue(
                                                                                                        `questions.${questionIndex}.question.${0}.answer.${optionIndex}`,
                                                                                                        e.target.checked
                                                                                                            ? e.target.value
                                                                                                            : ""
                                                                                                    );
                                                                                                }}
                                                                                            />

                                                                                            <label
                                                                                                htmlFor={`option.id.${option.id}`}
                                                                                            >
                                                                                                <p
                                                                                                    className="mb-0 ssdn-editor-font"
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

                                                                {v.type === "drop_down" && (
                                                                    <>
                                                                        <span>Question. {questionIndex + 1}</span>
                                                                        <div className="ssdn-editor-font">
                                                                            <h6
                                                                                className="title-question"
                                                                                dangerouslySetInnerHTML={{
                                                                                    __html: v.question,
                                                                                }}
                                                                            />
                                                                        </div>
                                                                        <div className="edu-form-check mb-2 col-md-4">
                                                                            <select
                                                                                className="form-select"
                                                                                onChange={(e) => {
                                                                                    props.setFieldValue(
                                                                                        `questions.${questionIndex}.question.${0}.question_id`,
                                                                                        v.id
                                                                                    );
                                                                                    props.setFieldValue(
                                                                                        `questions.${questionIndex}.question.${0}.answer`,
                                                                                        [e.target.value]
                                                                                    );
                                                                                }}
                                                                            >
                                                                                <option value="0">
                                                                                    Select Answer
                                                                                </option>
                                                                                {v.options.map((v, i) => (
                                                                                    <option value={v.option_id} key={i}>
                                                                                        <p
                                                                                            className=" ssdn-editor-font"
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

                                                                {v.type === "drag_drop" && (
                                                                    <>
                                                                        <span>Question. {questionIndex + 1}</span>
                                                                        <div className="ssdn-editor-font">
                                                                            <h2
                                                                                className="title-question"
                                                                                dangerouslySetInnerHTML={{
                                                                                    __html: v.question,
                                                                                }}
                                                                            />
                                                                        </div>
                                                                        <div className="row">
                                                                            <DragDrop
                                                                                options={v.options}
                                                                                index={questionIndex}
                                                                                props={props}
                                                                                name={`questions.${questionIndex}.question`}
                                                                                questionId={v}
                                                                                takingInitialState={
                                                                                    takingInitialState
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </>
                                                                )}
                                                                {v.type === "drag_drop_group" && (
                                                                    <DndProvider backend={HTML5Backend}>
                                                                        <DragDropQuestion
                                                                            list={v}
                                                                            props={props}
                                                                            value={v}
                                                                            name={`questions.${questionIndex}.question`}
                                                                            index={questionIndex}
                                                                            count={count}
                                                                            setCount={setCount}
                                                                            currentTab={currentTab}
                                                                            setoptionCount={setoptionCount}
                                                                            setCurrentTab={setCurrentTab}
                                                                            optionCount={optionCount}
                                                                            handleSubmit={handleSubmit}
                                                                            isActive={isActive}
                                                                            values={values}
                                                                            setValues={setValues}
                                                                        />
                                                                    </DndProvider>
                                                                )}
                                                                {v.type === "group_question" && (
                                                                    <GroupQuestion
                                                                        list={v}
                                                                        props={props}
                                                                        value={v}
                                                                        setValues={setValues}
                                                                        currentTab={currentTab}
                                                                        values={values}
                                                                        name={`questions.${questionIndex}.question`}
                                                                        index={questionIndex}
                                                                        count={count}
                                                                        setCount={setCount}
                                                                        setoptionCount={setoptionCount}
                                                                        optionCount={optionCount}
                                                                        isActive={isActive}
                                                                    />
                                                                )}
                                                            </Tab>
                                                        ))}
                                                    </Tabs>
                                                </Row>
                                                <div className="card-bottom">
                                                    <div className="edu-rating text-center w-100">
                                                        <div className="d-flex justify-content-between ssdn-flex">
                                                            <div className="d-flex">
                                                                <div
                                                                    className="read-more-btn"
                                                                    style={
                                                                        currentTab === 0
                                                                            ? { pointerEvents: "none" }
                                                                            : {}
                                                                    }
                                                                    onClick={() => {
                                                                        setValues({ ...values });
                                                                        setCurrentTab((prev) => prev - 1);
                                                                        setCurrentPage(currentPage - 1);
                                                                    }}
                                                                >
                                                                    <button
                                                                        className="edu-btn me-2 ssdn-button-data"
                                                                        type="button"
                                                                        style={
                                                                            currentTab === 0
                                                                                ? { background: "bisque" }
                                                                                : {}
                                                                        }
                                                                    >
                                                                        <i className="ri-arrow-left-s-line"></i>
                                                                        Previous
                                                                    </button>
                                                                </div>
                                                                <div className="read-more-btn"
                                                                    style={
                                                                        currentTab === questionlength
                                                                            ? { pointerEvents: "none" }
                                                                            : {}
                                                                    }
                                                                    disabled={currentTab === questionlength}
                                                                >
                                                                    <button
                                                                        className="edu-btn ssdn-button-data"
                                                                        type="button"
                                                                        style={
                                                                            currentTab === questionlength
                                                                                ? { background: "bisque" }
                                                                                : {}
                                                                        }
                                                                        onClick={() => {
                                                                            setValues({ ...values });
                                                                            setCurrentTab((prev) => prev + 1);
                                                                            setCurrentPage(currentPage + 1);
                                                                        }}
                                                                    >
                                                                        Next
                                                                        <i className="ri-arrow-right-s-line"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className="read-more-btn">
                                                                <button className="edu-btn" type="submit">
                                                                    Submit Exam
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </>
                )}
            </Formik>
        </div>
    );
};

export default TestQuestionList;
