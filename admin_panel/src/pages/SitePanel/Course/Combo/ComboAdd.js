import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../../BreadCrumb/Breadcrumb";
const ComboAdd = () => {
  return (
    <>
      <div className="page-body">
        <Breadcrumb heading="Add Combo Course" />
        <div className="container-fluid support-ticket">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Add Combo Course </h5>
                </div>
                <form className="form theme-form">
                  <div className="card-body">
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label className="form-label">
                          Course Heading <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control"
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Enter course name"
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label className="form-label">
                          Description<span className="text-danger">*</span>
                        </label>
                        <textarea
                          className="form-control"
                          id="overview"
                          name="overview"
                          placeholder="Enter description"
                        ></textarea>
                      </div>
                      <div className="form-group col-md-6">
                        <label className="form-label">
                          Course Icon <span className="text-danger">*</span>
                        </label>
                        <span className="text-danger image-data">
                          Image Size: 260 X 100
                        </span>
                        <input
                          className="form-control"
                          id="logo"
                          name="logo"
                          type="file"accept="image/*"
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label className="form-label">
                          Icon Alt Tag <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control"
                          id="overviewheading"
                          name="overviewheading"
                          type="text"
                          placeholder="Enter icon alt tag text"
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label className="form-label">
                          Amount<span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control"
                          id="overviewheading"
                          name="overviewheading"
                          type="text"
                          placeholder="Enter amount"
                        />
                      </div>
                      <div className="text-start col-6">
                        <label>Difference Shown</label>
                        <div className="form-group m-t-10 m-checkbox-inline mb-0 custom-radio-ml">
                          <div className="radio radio-primary">
                            <input
                              id="actual"
                              type="radio"
                              name="actual"
                              value="actual"
                            />
                            <label className="mb-0" htmlFor="actual">
                              Actual
                            </label>
                          </div>
                          <div className="radio radio-primary">
                            <input
                              id="percentage"
                              type="radio"
                              name="percentage"
                              value="percentage"
                            />
                            <label className="mb-0" htmlFor="percentage">
                              Percentage
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="form-group col-md-6">
                        <label className="form-label">
                          Course Duration<span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control"
                          id="overviewheading"
                          name="overviewheading"
                          type="text"
                          placeholder="Enter duration"
                        />
                      </div>

                      <div className="form-group col-md-6">
                        <label className="form-label">
                          Duration Type <span className="text-danger">*</span>
                        </label>
                        <select
                          className="form-select"
                          id="category"
                          name="category"
                        >
                          <option>Select duration type</option>
                          <option>Hours(s)</option>
                          <option>Day(s)</option>
                          <option>Week(s)</option>
                          <option>Month(s)</option>
                        </select>
                      </div>
                      <div className="form-group col-md-6">
                        <label className="form-label">
                          Course List <span className="text-danger">*</span>
                        </label>
                        <select
                          className="form-select"
                          id="category"
                          name="category"
                        >
                          <option>Select courses</option>
                          <option>Technical Course</option>
                          <option>Process Course</option>
                          <option>Featured Course</option>
                        </select>
                      </div>
                      <div className="card-footer text-end">
                        <button className="btn btn-primary me-2" type="submit">
                          Submit
                        </button>
                        <button className="btn btn-danger" type="reset">
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComboAdd;
