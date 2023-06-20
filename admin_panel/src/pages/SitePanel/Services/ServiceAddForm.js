import React from "react";
import { Editor } from "@tinymce/tinymce-react";
const ServicesAddForm = () => {
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h5>Add Service</h5>
        </div>
        <form className="form theme-form">
          <div className="card-body">
            <div className="row">
              <div className="form-group col-md-12">
                <label className="form-label">
                  Title <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter title"
                />
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Description <span className="text-danger">*</span>
                </label>
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
                <label className="form-label">Feature Description </label>
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
                <label className="form-label">
                  Icon <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  id="icon"
                  name="icon"
                  type="file"accept="image/*"
                />
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Icon Alt Tag <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  id="iconalt"
                  name="iconalt"
                  type="email"
                  placeholder="Enter Alt tag for icon"
                />
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Hover Icon <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  id="hicon"
                  name="hicon"
                  type="file"accept="image/*"
                />
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Hover Icon Alt Tag <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  id="hiconalt"
                  name="hiconalt"
                  type="email"
                  placeholder="Enter Alt tag for hover icon"
                />
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Featured Image <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  id="hicon"
                  name="hicon"
                  type="file"accept="image/*"
                />
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Feature Icon Alt Tag <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  id="hiconalt"
                  name="hiconalt"
                  type="email"
                  placeholder="Enter Alt tag for hover icon"
                />
              </div>
            </div>
          </div>
          <div className="card-footer text-end">
            <button className="btn btn-primary me-2" type="submit">
              Submit
            </button>
            <button className="btn btn-danger" type="reset">
              Reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ServicesAddForm;
