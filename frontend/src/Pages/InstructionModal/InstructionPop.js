import React, { useContext, useState,  } from "react";
import { CartContext } from "../../Container/Context";
import { Link } from "react-router-dom";

export default function InstructionPop({
  assessmentdata,
  handleClose,
  modalId,
}) {
  const { modal,  } =
    useContext(CartContext);
  const [modalOpen, setModalOpen] = modal;

  const closeModalhandle = () => {
    handleClose(modalId);
  };
  return (
    <>
      <div
        className="modal in"
        style={{ display: "block" }}
      >
        <div className="modal-dialog " role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Exam Instruction
              </h5>
              <button type="button" className="btn-close" onClick={closeModalhandle}></button>
            </div>

            <div className="modal-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <p
                      className="text-start ssdn-editor-font "
                      dangerouslySetInnerHTML={{
                        __html: assessmentdata.exam_instruction,
                      }}
                    />
                  </div>
                </div>
                <div className="col-lg-12 text-end ">
                  
                  <a href="#"
                    className="edu-btn btn-bg-alt"
                    onClick={closeModalhandle}
                  >
                    Cancel
                  </a>
                  <Link
                    to={`/do-assessment/${assessmentdata.slug}`}
                    className="edu-btn btn-bg-alt ms-3"
                    onClick={setModalOpen(false)}
                  >
                    Okay
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
