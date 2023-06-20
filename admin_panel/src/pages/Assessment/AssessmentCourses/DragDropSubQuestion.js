import React from "react";
import SubQuestionOption from "./SubQuestionOption";
import { FieldArray } from "formik";

function DragDropSubQuestion({
  props,
  index,
  imageApi,
  AddOption,
  images,
  question,
  subIndex,
  name,
}) {
  const convert = (num) => {
    if (num < 1) {
      return "";
    }
    if (num >= 40) {
      return "XL" + convert(num - 40);
    }
    if (num >= 10) {
      return "X" + convert(num - 10);
    }
    if (num >= 9) {
      return "IX" + convert(num - 9);
    }
    if (num >= 5) {
      return "V" + convert(num - 5);
    }
    if (num >= 4) {
      return "IV" + convert(num - 4);
    }
    if (num >= 1) {
      return "I" + convert(num - 1);
    }
  };

  return (
    <FieldArray
      name={`${name}.${index}`}
      render={(fieldArray) => (
        <div>
          <div className="col-md-12">
            <div className="row">
              <div className="form-group col-md-5">
             
                <label htmlFor="contact">
                  Sub Question {convert(subIndex + 1)}
                </label>
                <textarea
                  name={`${name}.${index + 1}.question`}
                  className="form-control"
                  placeholder="Question of exam"
                  onChange={(e) => {
                    props.setFieldValue(
                      `${name}.${index + 1}.question`,

                      e.target.value
                    );
                  }}
                />
              </div>

              <div className="form-group col-md-3">
                <input
                  type="file"accept="image/*"
                  name={`${name}.${index + 1}.image`}
                  onChange={(event) => {
                    imageApi(
                      event.target.files[0],
                      `${name}.${index + 1}.image`,
                      props,
                      "question_answer"
                    );
                  }}
                  className="form-control"
                  style={{ marginTop: "26px" }}
                />
              </div>
            </div>

            <div className="row mt-2">
              <div className="form-group col-md-8">
                <label htmlFor="contact">
                  Answer {convert(subIndex + subIndex)}
                </label>
                <input
                  name={`${name}.${index + 1}.answer_ids`}
                  className="form-control"
                  placeholder="Answer of exam question"
                  onChange={(e) => {
                    props.setFieldValue(
                      `${name}.${index + 1}.answer_ids`,

                      e.target.value
                    );
                  }}
                ></input>
              </div>
              {index === 0 ? (
                <div
                  className="form-group col-md-1"
                  style={{ marginTop: "26px" }}
                >
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => fieldArray.insert(index, "")}
                  >
                    <span>
                      <i className="fa-solid fa-plus"></i>
                    </span>
                  </button>
                </div>
              ) : (
                <div
                  className="form-group col-md-1"
                  style={{ marginTop: "26px" }}
                >
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => fieldArray.remove(index)}
                  >
                      <i className="fa-solid fa-minus"></i>
                  </button>
                </div>
              )}
            </div>
            <hr style={{ border: "2px solid #f1f1f1" }} />
          </div>
        </div>
      )}
    />
  );
}

export default DragDropSubQuestion;
