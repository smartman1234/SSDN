import React, { useContext, useState,  } from "react";
import { CartContext } from "../../Container/Context";
import { Link } from "react-router-dom";

export default function InstructionModal({
    assessmentdata,
}) {
    const { modal,  instructionPop } =
        useContext(CartContext);
    const [active, setActive] = useState(false);
    const [modalOpen, setModalOpen] = modal;
    const [instruction, setInstruction] = instructionPop;

    const closeModalhandle = () => {
        setInstruction(false);
        setActive(true);
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
                                        <div className="form-group text-left">
                                            <p className=" ssdn-editor-font"
                                                dangerouslySetInnerHTML={{
                                                    __html: assessmentdata.exam_instruction,
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 text-end ">
                                        
                                        <button
                                            className="edu-btn btn-bg-alt"
                                            onClick={closeModalhandle}
                                        >
                                            Cancel
                                        </button>
                                        <Link
                                            to={`/do-assessment/${assessmentdata.slug}`}

                                            className="edu-btn btn-bg-alt ms-3"
                                            onClick={() => {
                                                setModalOpen(false);
                                                setInstruction(false);
                                            }}
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
