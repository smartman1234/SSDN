import React from "react";

function QuestionModal({ openModal, setOpenModal }) {
  const modalCloseHandle = () => {
    setOpenModal(false);
  };
  return (
    <>
      {openModal ? (
        <div
          className={
            openModal ? "modal fade text-start show" : "modal fade text-start"
          }
          style={openModal ? { display: "block" } : { display: "none" }}
          tabIndex="-1"
          aria-labelledby="myModalLabel33"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="myModalLabel33">
                  Add Education Details
                </h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={modalCloseHandle}
                />
              </div>
              <form action="#">
                <div className="modal-body">
                  <div className="row">
                    <div className="mb-1 col-md-6">
                      <label className="form-label" htmlFor="school-name">
                        School / College <span className="text-danger"> *</span>
                      </label>
                      <input
                        type="text"
                        name="school_college"
                        id="school-name"
                        className="form-control"
                        placeholder="Ex.Boston University"
                      />
                    </div>
                    <div className="mb-1 col-md-6">
                      <label className="form-label" htmlFor="degree-name">
                        Degree<span className="text-danger"> *</span>
                      </label>
                      <input
                        type="text"
                        name="degree"
                        id="degree-name"
                        className="form-control"
                        placeholder="Ex. Bachelor's"
                      />
                    </div>
                    <div className="mb-1 col-md-6">
                      <label className="form-label" htmlFor="field-name">
                        Field of Study
                      </label>
                      <input
                        type="text"
                        name="field_of_study"
                        id="field-name"
                        className="form-control"
                        placeholder="Ex. Business"
                      />
                    </div>
                    <div className="mb-1 col-md-6">
                      <label className="form-label" htmlFor="start-date">
                        Start Date
                      </label>
                      <input
                        type="date"
                        name="start_date"
                        id="start-date"
                        className="form-control flatpickr-input"
                      />
                    </div>
                    <div className="mb-1 col-md-6">
                      <label className="form-label" htmlFor="end-date">
                        End date
                      </label>
                      <input
                        type="date"
                        name="end_date"
                        id="end-date"
                        className="form-control flatpickr-input"
                      />
                    </div>
                  </div>
                </div>
              </form>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary ">
                  Submit
                </button>
                <button
                  type="reset"
                  className="btn btn-danger "
                  data-bs-dismiss="modal"
                  onClick={modalCloseHandle}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default QuestionModal;
