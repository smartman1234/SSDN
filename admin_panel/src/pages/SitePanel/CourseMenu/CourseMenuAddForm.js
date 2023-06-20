import React from "react";
const CourseMenuAddForm = () => {
    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h5>Add Course Menu</h5>
                </div>
                <form className="form theme-form">
                    <div className="card-body">
                        <div className="row">
                            <div className="form-group col-md-4">
                                <label className="form-label">Menu Label <span className="text-danger">*</span></label>
                                <input className="form-control" id="course" name="course" type="text" placeholder="Enter menu label" />
                            </div>
                            <div className="form-group col-md-4">
                                <label className="form-label">Menu Type <span className="text-danger">*</span></label>
                                <select className="form-select">
                                    <option selected={false} disabled>Select menu type</option>
                                    <option>Brand</option>
                                    <option>Topic</option>
                                </select>
                            </div>
                            <div className="form-group col-md-4">
                                <label className="form-label">Menu URL <span className="text-danger">*</span></label>                                
                                <input className="form-control" id="question" name="question" type="text" placeholder="Enter menu url" />
                            </div>
                            <div className="form-group col-md-12 text-end">
                                <button className="btn btn-primary me-2" type="submit">Submit</button>
                                <button className="btn btn-danger" type="reset">Reset</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CourseMenuAddForm;