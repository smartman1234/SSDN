import React from "react";
import { Editor } from "@tinymce/tinymce-react";
const TestimonialsAddForm = () => {
    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h5>Add Special Offer</h5>
                </div>
                <form className="form theme-form">
                    <div className="card-body">
                        <div className="row">
                            <div className="form-group col-md-6">
                                <div className="row">
                                    <div className="form-group col-md-12">
                                        <label className="form-label">Title <span className="text-danger">*</span></label>
                                        <input className="form-control" id="by" name="by" type="text" placeholder="Enter title" />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label className="form-label">Category</label>
                                        <select className="form-select">
                                            <option>Select category</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label className="form-label">URL <span className="text-danger">*</span></label>
                                        <input className="form-control" id="by" name="by" type="text" placeholder="Enter url" />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label className="form-label">Image</label>
                                        <input className="form-control" id="icon" name="icon" type="file" accept="image/*"/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="form-label">Duration <span className="text-danger">*</span></label>
                                        <input className="form-control" id="title" name="title" type="number" placeholder="Enter duration" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="form-label">Duration Type <span className="text-danger">*</span></label>
                                        <select className="form-select" id="category" name="category">
                                            <option>Select duration type</option>
                                            <option>Hours(s)</option>
                                            <option>Day(s)</option>
                                            <option>Week(s)</option>
                                            <option>Month(s)</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label className="form-label">Date</label>
                                        <input className="form-control" id="icon" name="icon" type="date" />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group col-md-6">
                                <label className="form-label">About Description <span className="text-danger">*</span></label>
                                <Editor
                                    textareaName="content"
                                    apiKey="j1g23ad6n3ra8f5lbnbe3nldrui85ygcv9zwc1ao74848kmj"
                                    init={{
                                        plugins: [
                                            "advlist",
                                            "autolink",
                                            "lists",
                                            "link",
                                            "image",
                                            "charmap",
                                            "preview",
                                            "anchor",
                                            "searchreplace",
                                            "visualblocks",
                                            "code",
                                            "fullscreen",
                                            "insertdatetime",
                                            "media",
                                            "table",
                                            "help",
                                            "wordcount",
                                        ],

                                        toolbar:
                                            " undo redo | blocks | image code | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help ",
                                    }}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label className="form-label">Original Price (INR)</label>
                                <input className="form-control" id="icon" name="icon" type="text" />
                            </div>
                            <div className="form-group col-md-6">
                                <label className="form-label">Discounted Price (INR)</label>
                                <input className="form-control" id="icon" name="icon" type="text" />
                            </div>
                            <div className="form-group col-md-6">
                                <label className="form-label">Discounted Percentage (INR)</label>
                                <input className="form-control" id="icon" name="icon" type="text" />
                            </div>
                            <div className="form-group col-md-6">
                                <label className="form-label">Original Price (USD)</label>
                                <input className="form-control" id="icon" name="icon" type="text" />
                            </div>
                            <div className="form-group col-md-6">
                                <label className="form-label">Discounted Price (USD)</label>
                                <input className="form-control" id="icon" name="icon" type="text" />
                            </div>
                            <div className="form-group col-md-6">
                                <label className="form-label">Discounted Percentage (USD)</label>
                                <input className="form-control" id="icon" name="icon" type="text" />
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

export default TestimonialsAddForm;