import React from "react";
const FaqAddForm = () => {
    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h5>Add Faq</h5>
                </div>
                <form className="form theme-form">
                    <div className="card-body">
                        <div className="row">
                            <div className="form-group col-md-12">
                                <label className="form-label">Course <span className="text-danger">*</span></label>
                                <input className="form-control" id="course" name="course" type="text" placeholder="Enter course" />
                            </div>
                            <div className="form-group col-md-12">
                                <label className="form-label">Question <span className="text-danger">*</span></label>
                                <input className="form-control" id="question" name="question" type="text" placeholder="Enter question" />
                            </div>
                            <div className="form-group col-md-12">
                                <label className="form-label">Description <span className="text-danger">*</span></label>
                                <textarea className="form-control" id="description" name="description" placeholder="Enter description"></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer text-end">
                        <button className="btn btn-primary me-2" type="submit">Submit</button>
                        <button className="btn btn-danger" type="reset">Reset</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default FaqAddForm;