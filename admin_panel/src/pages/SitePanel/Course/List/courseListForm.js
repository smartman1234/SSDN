import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, FieldArray } from "formik";
import CourseService from "../../../../Services/CourseService/CourseService";
import CourseCourseService from "../../../../Services/CourseService/CourseCourseService";
import CourseBlog from "./CourseBlog";

const CourseListForm = ({
  props,
  allCategoryList,
  values,
  categoryLists,
  setBlogForm,
  ogImage,
  setOgImage,
}) => {
  const param = useParams();
  const [trainingMode, setTrainingMode] = useState([]);
  const [realtedCourseList, setRelatedCourse] = useState([]);
  const courseServe = new CourseCourseService();
  const [showQuestion, setShowQuestion] = useState(0);
  const [thumbImage, setThumbImage] = useState("");
  const [projectImage, setProjectImage] = useState("");
  const [certificateImage, setCertificateImage] = useState("");
  const [mediaImage, setMediaImage] = useState("");
  const [discount, setDiscount] = useState(false);
  const [cities, setCities] = useState([]);

  const InrDiscount = () => {
    setDiscount(true);
  };

  const PriceHandle = (i) => {
    setShowQuestion(i);
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      let reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  useEffect(() => {
    relatedCourse();
    listOfCities();
  }, []);

  const relatedCourse = async () => {
    try {
      let response = await courseServe.realtedList();
      if (response) {
        const arr = response.data.map((v) => {
          return { value: v.value, label: v.label };
        });
        setRelatedCourse(arr);
      }
    } catch (err) {
      throw err;
    }
  };

  const listOfCities = async () => {
    try {
      let response = await courseServe.ListOfCities();
      if (response) {
        setCities(response.data);
      }
    } catch (err) {
      throw err;
    }
  };

  const thumbImagehandle = (e, props, name) => {
    let { file } = e.target.files[0];

    file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function (e) {
      var image = new Image();
      image.src = e.target.result;
      image.onload = function () {
        var height = this.height;
        var width = this.width;
        getBase64(file)
          .then((result) => {
            file["base64"] = result;
            if (name === "thumb_image") {
              setThumbImage(result);
            } else if (name === "project_image") {
              setProjectImage(result);
            } else if (name === "certification_image") {
              setCertificateImage(result);
            } else if (name === "og_image") {
              setOgImage(result);
            } else if (name === "media") {
              if (height > 360 || width > 360) {
                alert(
                  "Height should not exceed from 360 px and width should not exceed from 360 px"
                );
              } else if (height < 360 || width < 360) {
                alert(
                  "Height should not less than from 360 px and width should not less than from 360 px"
                );
              } else {
                props.setFieldValue("media", file);
                setMediaImage(result);
              }
            }
          })
          .catch((err) => {});
      };
    };
  };

  return (
    <>
      <form className="" onSubmit={props.handleSubmit}>
        <div className="row">
          <div className="form-group col-md-6">
            <label className="form-label">
              Course Default Category <span className="text-danger">*</span>
            </label>

            <Select
              onChange={(value) =>
                props.setFieldValue("default_course_categories_id", value)
              }
              options={allCategoryList}
              value={props.values.default_course_categories_id}
              name="default_course_categories_id"
            />
            {props.touched.default_course_categories_id &&
            props.errors.default_course_categories_id ? (
              <div className="formik-errors bg-error">
                {props.errors.default_course_categories_id}
              </div>
            ) : null}
          </div>
          <div className="form-group col-md-6">
            <label className="form-label">
              Category <span className="text-danger">*</span>
            </label>
            <Select
              onChange={(value) =>
                props.setFieldValue("sub_category_id", value)
              }
              options={allCategoryList}
              value={props.values.sub_category_id}
              name="sub_category_id"
              isMulti
            />
            {props.touched.sub_category_id && props.errors.sub_category_id ? (
              <div className="formik-errors bg-error">
                {props.errors.sub_category_id}
              </div>
            ) : null}
          </div>
          <div className="form-group col-md-6">
            <label className="form-label">
              Course Name <span className="text-danger">*</span>
            </label>
            <input
              className="form-control"
              name="name"
              onChange={(event) => {
                props.setFieldValue("name", event.target.value);
                if (!param.id) {
                  props.setFieldValue("slug", event.target.value);
                }
              }}
              value={props.values.name}
              type="text"
              placeholder="Enter course name"
            />
            {props.touched.name && props.errors.name ? (
              <div className="formik-errors bg-error">{props.errors.name}</div>
            ) : null}
          </div>
          <div className="form-group col-md-6">
            <label className="form-label">
              Heading <span className="text-danger">*</span>
            </label>
            <input
              className="form-control"
              name="heading"
              onChange={(event) => {
                props.setFieldValue("heading", event.target.value);
              }}
              value={props.values.heading}
              type="text"
              placeholder="Enter course name"
            />
            {props.touched.heading && props.errors.heading ? (
              <div className="formik-errors bg-error">
                {props.errors.heading}
              </div>
            ) : null}
          </div>
          <div className="form-group col-md-4">
            <label className="form-label">
              Course URL <span className="text-danger">*</span>
            </label>
            <input
              className="form-control"
              name="slug"
              value={
                props.values.slug
                  ? props.values.slug
                      .trim()
                      .replaceAll(" {{in VARCITY}}", "")
                      .replaceAll(" ", "-")
                      .toLowerCase()
                  : ""
              }
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              type="text"
              placeholder="Enter course url"
            />
            {props.touched.slug && props.errors.slug ? (
              <div className="formik-errors bg-error">{props.errors.slug}</div>
            ) : null}
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="contact" className="form-label">
              Price Type <span className="text-danger">*</span>
            </label>
            <div className="col">
              <div className="form-group m-t-10 m-checkbox-inline mb-0 custom-radio-ml">
                <div
                  className="radio radio-primary"
                  onClick={() => PriceHandle(1)}
                >
                  <input
                    id="free"
                    type="radio"
                    name="price_type"
                    value="free"
                    onChange={props.handleChange}
                    checked={props.values.price_type === "free"}
                  />
                  <label className="form-label mb-0" htmlFor="free">
                    Free
                  </label>
                </div>
                <div
                  className="radio radio-primary"
                  onClick={() => PriceHandle(2)}
                >
                  <input
                    id="paid"
                    type="radio"
                    name="price_type"
                    checked={props.values.price_type === "paid"}
                    onChange={props.handleChange}
                    value="paid"
                  />
                  <label className="form-label mb-0" htmlFor="paid">
                    Paid
                  </label>
                </div>
              </div>
              {props.touched.price_type && props.errors.price_type ? (
                <div className="formik-errors bg-error">
                  {props.errors.price_type}
                </div>
              ) : null}
            </div>
          </div>
          {showQuestion === 2 || props.values.price_type === "paid" ? (
            <>
              <div className="form-group col-md-3">
                <label className="col-form-label">
                  Actual Price (INR) <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="actualprice"
                  name="inr_price"
                  placeholder="Actual price in INR"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.inr_price}
                />
                {props.touched.inr_price && props.errors.inr_price ? (
                  <div className="formik-errors bg-error">
                    {props.errors.inr_price}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="contact">
                  Discount (INR) <span className="text-danger">*</span>
                </label>
                <div className="col">
                  <div className="form-group m-t-10 m-checkbox-inline mb-0 custom-radio-ml">
                    <div className="radio radio-primary" onClick={InrDiscount}>
                      <input
                        id="is_inr"
                        type="radio"
                        name="is_inr_discount"
                        value="1"
                        checked={props.values.is_inr_discount === "1"}
                        onChange={props.handleChange}
                      />
                      <label className="mb-0" htmlFor="is_inr">
                        Yes
                      </label>
                    </div>
                    <div
                      className="radio radio-primary"
                      onClick={() => setDiscount(false)}
                    >
                      <input
                        id="inr_discount"
                        type="radio"
                        name="is_inr_discount"
                        onChange={props.handleChange}
                        checked={props.values.is_inr_discount === "0"}
                        value="0"
                      />
                      <label className="mb-0" htmlFor="inr_discount">
                        No
                      </label>
                    </div>
                  </div>
                </div>
                {props.touched.is_inr_discount &&
                props.errors.is_inr_discount ? (
                  <div className="formik-errors bg-error">
                    {props.errors.is_inr_discount}
                  </div>
                ) : null}
              </div>
              {(discount || props.values.is_inr_discount === "1") && (
                <div className="form-group col-md-3">
                  <label className="col-form-label">INR Discount (%)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="actualprice"
                    name="inr_discount_price"
                    placeholder="INR Discount (%)"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.inr_discount_price}
                  />
                  {props.touched.inr_discount_price &&
                  props.errors.inr_discount_price ? (
                    <div className="formik-errors bg-error">
                      {props.errors.inr_discount_price}
                    </div>
                  ) : null}
                </div>
              )}
            </>
          ) : null}
          <div className="form-group m-checkbox-inline col-md-4">
            <label htmlFor="contact" className="form-label">
              Mode <span className="text-danger">*</span>
            </label>
            <div>
              {" "}
              <div className="checkbox checkbox-dark">
                <input
                  id="inline-1"
                  type="checkbox"
                  name="mode1"
                  value="online"
                  onChange={(e) => {
                    if (e.target.checked) {
                      props.setFieldValue("mode1", e.target.value);
                    } else {
                      props.setFieldValue("mode1", "");
                    }
                  }}
                  checked={"online" === props.values.mode1}
                  onBlur={props.handleBlur}
                />
                <label htmlFor="inline-1">Online</label>
              </div>
              <div className="checkbox checkbox-dark">
                <input
                  id="inline-2"
                  type="checkbox"
                  name="mode2"
                  checked={"offline" === props.values.mode2}
                  value="offline"
                  onChange={(e) => {
                    if (e.target.checked) {
                      props.setFieldValue("mode2", e.target.value);
                    } else {
                      props.setFieldValue("mode2", "");
                    }
                  }}
                  onBlur={props.handleBlur}
                />
                <label htmlFor="inline-2">Offline</label>
              </div>{" "}
              {props.touched.mode1 && props.errors.mode1 ? (
                <div className="formik-errors bg-error">
                  {props.errors.mode1}
                </div>
              ) : null}
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-4 p-0">
              <label className="form-label">
                Media Type <span className="text-danger">*</span>
              </label>
              <select
                className="form-select"
                onChange={props.handleChange}
                value={props.values.media_type}
                name="media_type"
              >
                <option value="" select="false">
                  Select type
                </option>
                <option value="video">Video</option>
                <option value="image">Image</option>
              </select>
              {props.touched.media_type && props.errors.media_type ? (
                <div className="formik-errors bg-error">
                  {props.errors.media_type}
                </div>
              ) : null}
            </div>
            {props.values.media_type === "image" && (
              <>
                <div
                  className={
                    props.values.media
                      ? "form-group col-md-3"
                      : "form-group col-md-4"
                  }
                >
                  <label className="form-label">
                    Image <span className="text-danger">* 360 X 360</span>
                  </label>
                  <input
                    className="form-control"
                    name="media"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      thumbImagehandle(e, props, "media");
                    }}
                    onBlur={props.handleBlur}
                    placeholder="Enter course overview heading"
                  />
                  {props.touched.media && props.errors.media ? (
                    <div className="formik-errors bg-error">
                      {props.errors.media}
                    </div>
                  ) : null}
                </div>
                {(mediaImage || props.values.media) && (
                  <div
                    className="input-group-append col-md-2"
                    style={{
                      top: "25px",
                      paddingLeft: "0px",
                      height: "49px",
                      width: "55px",
                    }}
                  >
                    <img
                      src={mediaImage || props.values.media}
                      alt="image"
                      style={{
                        padding: "0",
                        width: "100%",
                        height: "72%",
                      }}
                    />
                  </div>
                )}
                <div className="form-group col-md-4">
                  <label className="form-label">
                    Image alt tag <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    name="image_alt_tag"
                    type="text"
                    value={props.values?.image_alt_tag}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    placeholder="Enter image alt tag"
                  />
                  {props.touched.image_alt_tag && props.errors.image_alt_tag ? (
                    <div className="formik-errors bg-error">
                      {props.errors.image_alt_tag}
                    </div>
                  ) : null}
                </div>
              </>
            )}
            {props.values.media_type === "video" && (
              <>
                <div className="form-group col-md-4">
                  <label className="form-label">
                    Video Type <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    name="video_type"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.video_type}
                  >
                    <option value="" select="false">
                      Select type
                    </option>
                    <option value="media_file">Media file</option>
                    <option value="link">Link</option>
                  </select>
                  {props.touched.video_type && props.errors.video_type ? (
                    <div className="formik-errors bg-error">
                      {props.errors.video_type}
                    </div>
                  ) : null}
                </div>{" "}
                {props.values.video_type === "media_file" && (
                  <>
                    <div
                      className={
                        props.values.media
                          ? "form-group col-md-5"
                          : "form-group col-md-6"
                      }
                    >
                      <label className="form-label">Media</label>
                      <input
                        className="form-control"
                        name="media"
                        type="file"
                        accept="video/*"
                        onChange={(e) => {
                          props.setFieldValue("media", e.target.files[0]);
                        }}
                        onBlur={props.handleBlur}
                      />
                      {props.touched.media && props.errors.media ? (
                        <div className="formik-errors bg-error">
                          {props.errors.media}
                        </div>
                      ) : null}
                    </div>
                    {props.values.media && (
                      <div
                        className="input-group-append col-md-1"
                        style={{
                          top: "25px",
                          paddingLeft: "0px",
                          height: "49px",
                          width: "55px",
                        }}
                      >
                        {props.values.media && (
                          <img
                            src="/assets/images/video-icon.webp"
                            alt="image"
                            style={{
                              padding: "0",
                              width: "100%",
                              height: "72%",
                            }}
                          />
                        )}
                      </div>
                    )}
                    <div
                      className={
                        props.values.thumb_image
                          ? "form-group col-md-5"
                          : "form-group col-md-6"
                      }
                    >
                      <label className="form-label">Thumb Image</label>
                      <input
                        className="form-control"
                        name="thumb_image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          props.setFieldValue("thumb_image", e.target.files[0]);
                          thumbImagehandle(e, props, "thumb_image");
                        }}
                        onBlur={props.handleBlur}
                        placeholder="Enter course overview heading"
                      />
                      {props.touched.thumb_image && props.errors.thumb_image ? (
                        <div className="formik-errors bg-error">
                          {props.errors.thumb_image}
                        </div>
                      ) : null}
                    </div>
                    {(thumbImage || props.values.thumb_image) && (
                      <div
                        className="input-group-append col-md-1"
                        style={{
                          top: "25px",
                          paddingLeft: "0px",
                          height: "49px",
                          width: "55px",
                        }}
                      >
                        <img
                          src={thumbImage || props.values.thumb_image}
                          alt="image"
                          style={{
                            padding: "0",
                            width: "100%",
                            height: "72%",
                          }}
                        />
                      </div>
                    )}
                  </>
                )}
                {props.values.video_type === "link" && (
                  <>
                    <div className="form-group col-md-6">
                      <label className="form-label">Media</label>
                      <input
                        className="form-control"
                        name="media"
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.media}
                      />
                      {props.touched.media && props.errors.media ? (
                        <div className="formik-errors bg-error">
                          {props.errors.media}
                        </div>
                      ) : null}
                    </div>

                    <div
                      className={
                        props.values.thumb_image
                          ? "form-group col-md-5"
                          : "form-group col-md-6"
                      }
                    >
                      <label className="form-label">Thumb Image</label>
                      <input
                        className="form-control"
                        name="thumb_image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          props.setFieldValue("thumb_image", e.target.files[0]);
                          thumbImagehandle(e, props, "thumb_image");
                        }}
                        onBlur={props.handleBlur}
                        placeholder="Enter course overview heading"
                      />
                      {props.touched.thumb_image && props.errors.thumb_image ? (
                        <div className="formik-errors bg-error">
                          {props.errors.thumb_image}
                        </div>
                      ) : null}
                    </div>
                    {(thumbImage || props.values.thumb_image) && (
                      <div
                        className="input-group-append col-md-1"
                        style={{
                          top: "25px",
                          paddingLeft: "0px",
                          height: "49px",
                          width: "55px",
                        }}
                      >
                        <img
                          src={thumbImage || props.values.thumb_image}
                          alt="image"
                          style={{
                            padding: "0",
                            width: "100%",
                            height: "72%",
                          }}
                        />
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
          <div className="form-group col-md-4">
            <label className="form-label">Code</label>
            <input
              className="form-control"
              name="code"
              type="text"
              value={props.values?.code}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              placeholder="Enter course code"
            />
          </div>
          <div className="form-group col-md-4">
            <label className="form-label">Assignment</label>
            <input
              className="form-control"
              type="number"
              name="assignments"
              value={props.values.assignments}
              onChange={props.handleChange}
              min="0"
              placeholder="Chosse assignment"
            />
            {props.touched.assignments && props.errors.assignments ? (
              <div className="formik-errors bg-error">
                {props.errors.assignments}
              </div>
            ) : null}
          </div>
          <div className="form-group col-md-4">
            <label className="form-label">Live Project</label>
            <input
              type="number"
              className="form-control"
              name="live_project"
              onChange={props.handleChange}
              value={props.values.live_project}
              min="0"
              placeholder="Chosse live project"
            />
            {props.touched.live_project && props.errors.live_project ? (
              <div className="formik-errors bg-error">
                {props.errors.live_project}
              </div>
            ) : null}
          </div>
          <div className="form-group col-md-6">
            <label className="form-label">
              Duration <span className="text-danger">*</span>
            </label>
            <input
              className="form-control"
              name="course_duration"
              value={props.values?.course_duration}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              type="number"
              min="0"
              placeholder="Enter duration"
            />
            {props.touched.course_duration && props.errors.course_duration ? (
              <div className="formik-errors bg-error">
                {props.errors.course_duration}
              </div>
            ) : null}
          </div>
          <div className="form-group col-md-6">
            <label className="form-label">
              Duration Type <span className="text-danger">*</span>
            </label>
            <select
              className="form-select"
              onChange={props.handleChange}
              value={props.values.course_duration_time}
              name="course_duration_time"
            >
              <option value="" select="false">
                Select type
              </option>
              <option value="Hour(s)">Hours(s)</option>
              <option value="Day(s)">Day(s)</option>
              <option value="Week(s)">Week(s)</option>
              <option value="Month(s)">Month(s)</option>
            </select>
            {props.touched.course_duration_time &&
            props.errors.course_duration_time ? (
              <div className="formik-errors bg-error">
                {props.errors.course_duration_time}
              </div>
            ) : null}
          </div>
          <div className="form-group col-md-6">
            <label className="form-label">Course Overview</label>

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
              value={props.values.course_overview}
              onEditorChange={(e) => props.setFieldValue("course_overview", e)}
            />
            {props.touched.course_overview && props.errors.course_overview ? (
              <div className="formik-errors bg-error">
                {props.errors.course_overview}
              </div>
            ) : null}
          </div>
          <div className="form-group col-md-6">
            <label className="form-label">Free Demo Description</label>
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
              value={props.values.free_demo_description}
              onEditorChange={(e) =>
                props.setFieldValue("free_demo_description", e)
              }
            />
            {props.touched.free_demo_description &&
            props.errors.free_demo_description ? (
              <div className="formik-errors bg-error">
                {props.errors.free_demo_description}
              </div>
            ) : null}
          </div>
          <div className="form-group col-md-6">
            <label className="form-label">About Title</label>

            <input
              className="form-control"
              name="about_title"
              type="text"
              value={props.values?.about_title}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              placeholder="Enter about title"
            />
            {props.touched.about_title && props.errors.about_title ? (
              <div className="formik-errors bg-error">
                {props.errors.about_title}
              </div>
            ) : null}
          </div>
          <div className="form-group col-md-6">
            <label className="form-label">Project Title</label>
            <input
              className="form-control"
              name="project_title"
              value={props.values?.project_title}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              type="text"
              placeholder="Enter project title"
            />
            {props.touched.project_title && props.errors.project_title ? (
              <div className="formik-errors bg-error">
                {props.errors.project_title}
              </div>
            ) : null}
          </div>
          <div className="form-group col-md-6">
            <label className="form-label">About Description </label>

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
              value={props.values.about}
              onEditorChange={(e) => props.setFieldValue("about", e)}
            />
            {props.touched.about && props.errors.about ? (
              <div className="formik-errors bg-error">{props.errors.about}</div>
            ) : null}
          </div>
          <div className="form-group col-md-6">
            <label className="form-label">Project Description</label>

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
              value={props.values.project}
              onEditorChange={(e) => props.setFieldValue("project", e)}
            />
            {props.touched.project && props.errors.project ? (
              <div className="formik-errors bg-error">
                {props.errors.project}
              </div>
            ) : null}
          </div>{" "}
          <div
            className={
              props.values.project_image
                ? "form-group col-md-5"
                : "form-group col-md-6"
            }
          >
            <label className="form-label">Project Image</label>
            <input
              className="form-control"
              name="project_image"
              onChange={(e) => {
                props.setFieldValue("project_image", e.target.files[0]);
                thumbImagehandle(e, props, "project_image");
              }}
              onBlur={props.handleBlur}
              type="file"
              accept="image/*"
            />
            {props.touched.project_image && props.errors.project_image ? (
              <div className="formik-errors bg-error">
                {props.errors.project_image}
              </div>
            ) : null}
          </div>
          {(projectImage || props.values.project_image) && (
            <div className="input-group-append col-md-1">
              <img
                src={projectImage || props.values.project_image}
                alt="image"
                style={{
                  padding: "0",
                  width: "100%",
                  height: "72%",
                }}
              />
            </div>
          )}
          <div className="form-group col-md-6 col-md-6">
            <label className="form-label">Project Image Alt Tag</label>

            <input
              className="form-control"
              name="project_image_alt_tag"
              value={props.values?.project_image_alt_tag}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              type="text"
              placeholder="Enter project image alt text"
            />
            {props.touched.project_image_alt_tag &&
            props.errors.project_image_alt_tag ? (
              <div className="formik-errors bg-error">
                {props.errors.project_image_alt_tag}
              </div>
            ) : null}
          </div>
          <div className="form-group col-md-6">
            <label className="form-label">
              Project What Will You Get Title
            </label>
            <input
              className="form-control"
              name="project_what_will_get_title"
              type="text"
              value={props.values?.project_what_will_get_title}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              placeholder="Enter what will you get title"
            />
            {props.touched.project_what_will_get_title &&
            props.errors.project_what_will_get_title ? (
              <div className="formik-errors bg-error">
                {props.errors.project_what_will_get_title}
              </div>
            ) : null}
          </div>
          <div className="form-group col-md-6">
            <label className="form-label">Pre-requisite Title</label>
            <input
              className="form-control"
              name="project_pre_request_title"
              value={props.values?.project_pre_request_title}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              type="text"
              placeholder="Enter pre-requisite title"
            />
            {props.touched.project_pre_request_title &&
            props.errors.project_pre_request_title ? (
              <div className="formik-errors bg-error">
                {props.errors.project_pre_request_title}
              </div>
            ) : null}
          </div>
          <div className="form-group col-md-6">
            <label className="form-label">What Will You Get Description</label>

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
              value={props.values.project_what_will_get}
              onEditorChange={(e) =>
                props.setFieldValue("project_what_will_get", e)
              }
            />
            {props.touched.project_what_will_get &&
            props.errors.project_what_will_get ? (
              <div className="formik-errors bg-error">
                {props.errors.project_what_will_get}
              </div>
            ) : null}
          </div>
          <div className="form-group col-md-6">
            <label className="form-label">Pre-requisite Description</label>

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
              value={props.values.project_pre_request}
              onEditorChange={(e) =>
                props.setFieldValue("project_pre_request", e)
              }
            />
            {props.touched.project_pre_request &&
            props.errors.project_pre_request ? (
              <div className="formik-errors bg-error">
                {props.errors.project_pre_request}
              </div>
            ) : null}
          </div>
          <div className="form-group col-md-6">
            <label className="form-label">Target Audiance Title</label>
            <input
              className="form-control"
              name="project_target_audience_title"
              value={props.values?.project_target_audience_title}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              type="text"
              placeholder="Enter target audiance title"
            />
            {props.touched.project_target_audience_title &&
            props.errors.project_target_audience_title ? (
              <div className="formik-errors bg-error">
                {props.errors.project_target_audience_title}
              </div>
            ) : null}
          </div>
          <div className="form-group col-md-6">
            <label className="form-label">List of City</label>
            <Select
              onChange={(value) => {
                props.setFieldValue("cities", value);
              }}
              options={cities}
              value={props.values.cities}
              name="cities"
              isMulti
            />
          </div>
          <div className="form-group col-md-6">
            <label className="form-label">Target Audiance Description</label>

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
              value={props.values.project_target_audience}
              onEditorChange={(e) =>
                props.setFieldValue("project_target_audience", e)
              }
            />
            {props.touched.project_target_audience &&
            props.errors.project_target_audience ? (
              <div className="formik-errors bg-error">
                {props.errors.project_target_audience}
              </div>
            ) : null}
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="form-group col-md-12">
                <label className="form-label">Certificate Title</label>
                <input
                  className="form-control"
                  name="certification_title"
                  value={props.values?.certification_title}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  type="text"
                  placeholder="Enter certification title"
                />
                {props.touched.certification_title &&
                props.errors.certification_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.certification_title}
                  </div>
                ) : null}
              </div>
              <div
                className={
                  props.values.certification_image
                    ? "form-group col-md-12"
                    : "form-group col-md-12"
                }
              >
                <label className="form-label">Certification Image</label>
                <input
                  className="form-control"
                  name="certification_image"
                  onChange={(e) => {
                    props.setFieldValue(
                      "certification_image",
                      e.target.files[0]
                    );
                    thumbImagehandle(e, props, "certification_image");
                  }}
                  onBlur={props.handleBlur}
                  type="file"
                  accept="image/*"
                />
                {props.touched.certification_image &&
                props.errors.certification_image ? (
                  <div className="formik-errors bg-error">
                    {props.errors.certification_image}
                  </div>
                ) : null}
              </div>
              {(certificateImage || props.values.certification_image) && (
                <div className="input-group-append col-md-12">
                  <img
                    src={certificateImage || props.values.certification_image}
                    alt="image"
                    style={{
                      padding: "0",
                      width: "100%",
                      height: "72%",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="form-group col-md-6">
            <label className="form-label">Certification Description</label>

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
              value={props.values.certification}
              onEditorChange={(e) => props.setFieldValue("certification", e)}
            />
            {props.touched.certification && props.errors.certification ? (
              <div className="formik-errors bg-error">
                {props.errors.certification}
              </div>
            ) : null}
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="form-group col-md-12">
                <label className="form-label">
                  Certification Image Alt Tag{" "}
                </label>

                <input
                  className="form-control"
                  name="certification_image_alt_tag"
                  value={props.values?.certification_image_alt_tag}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  type="text"
                  placeholder="Enter certificate image alt text"
                />
                {props.touched.certification_image_alt_tag &&
                props.errors.certification_image_alt_tag ? (
                  <div className="formik-errors bg-error">
                    {props.errors.certification_image_alt_tag}
                  </div>
                ) : null}
              </div>{" "}
              <div className="form-group col-md-12">
                <label className="form-label">Related Courses</label>
                <Select
                  onChange={(value) => {
                    props.setFieldValue("related_course", value);
                  }}
                  options={realtedCourseList}
                  value={props.values.related_course}
                  name="related_course"
                  isMulti
                />
                {props.touched.related_course && props.errors.related_course ? (
                  <div className="formik-errors bg-error">
                    {props.errors.related_course}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <h5>Meta Tag Details</h5>
          <hr></hr>
          <div className="form-group col-md-6">
            <label className="form-label">
              Meta Tag Title <span className="text-danger">*</span>
            </label>
            <input
              className="form-control"
              value={props.values?.meta_title}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              name="meta_title"
              type="text"
              placeholder="Enter meta tag title"
            />
            {props.touched.meta_title && props.errors.meta_title ? (
              <div className="formik-errors bg-error">
                {props.errors.meta_title}
              </div>
            ) : null}
          </div>
          <div className="form-group col-md-6">
            <label className="form-label">
              Meta Tag Keywords <span className="text-danger">*</span>
            </label>
            <input
              className="form-control"
              name="meta_keyword"
              value={props.values?.meta_keyword}
              onChange={props.handleChange}
              type="text"
              placeholder="Enter meta tag keywords"
            />
            {props.touched.meta_keyword && props.errors.meta_keyword ? (
              <div className="formik-errors bg-error">
                {props.errors.meta_keyword}
              </div>
            ) : null}
          </div>
          <div className="form-group col-md-6">
            <label className="form-label">
              Meta Tag Description <span className="text-danger">*</span>
            </label>
            <textarea
              className="form-control"
              name="meta_description"
              value={props.values?.meta_description}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              placeholder="Enter meta tag description"
            ></textarea>
            {props.touched.meta_description && props.errors.meta_description ? (
              <div className="formik-errors bg-error">
                {props.errors.meta_description}
              </div>
            ) : null}
          </div>
          <div className="form-group col-md-6">
            <label className="form-label">BreadCrumb Schema</label>
            <textarea
              className="form-control"
              name="breadcrumb"
              value={props.values?.breadcrumb}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              placeholder="Enter breadcrumb"
            ></textarea>
          </div>
          <h5>OG Details</h5>
          <hr></hr>
          <div className="form-group col-md-6">
            <label className="form-label">OG Title</label>
            <input
              className="form-control"
              name="og_title"
              value={props.values?.og_title}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              type="text"
              placeholder="Enter og title"
            />
            {props.touched.og_title && props.errors.og_title ? (
              <div className="formik-errors bg-error">
                {props.errors.og_title}
              </div>
            ) : null}
          </div>
          <div className="form-group col-md-6">
            <label className="form-label">OG URL</label>
            <input
              className="form-control"
              value={props.values?.og_url}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              name="og_url"
              type="text"
              placeholder="Enter og url"
            />
            {props.touched.og_url && props.errors.og_url ? (
              <div className="formik-errors bg-error">
                {props.errors.og_url}
              </div>
            ) : null}
          </div>
          <div className="form-group col-md-6">
            <label className="form-label">OG Description</label>
            <textarea
              className="form-control"
              value={props.values?.og_description}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              name="og_description"
              placeholder="Enter og description"
            />
            {props.touched.og_description && props.errors.og_description ? (
              <div className="formik-errors bg-error">
                {props.errors.og_description}
              </div>
            ) : null}
          </div>
          <div
            className={
              props.values.og_image
                ? "form-group col-md-5"
                : "form-group col-md-6"
            }
          >
            <label className="form-label">OG Image</label>
            <input
              className="form-control"
              name="og_image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                props.setFieldValue("og_image", e.target.files[0]);
                thumbImagehandle(e, props, "og_image");
              }}
            />
            {props.touched.og_image && props.errors.og_image ? (
              <div className="formik-errors bg-error">
                {props.errors.og_image}
              </div>
            ) : null}
          </div>
          {(ogImage || props.values.og_image) && (
            <div
              className="input-group-append col-md-1"
              style={{
                top: "25px",
                paddingLeft: "14px",
                height: "49px",
                width: "88px",
              }}
            >
              {(ogImage || props.values.og_image) && (
                <img
                  src={ogImage || props.values.og_image}
                  alt="image"
                  style={{
                    padding: "0",
                    width: "100%",
                    height: "72%",
                  }}
                />
              )}
            </div>
          )}
          <div className="card-footer text-end">
            <button className="btn btn-danger me-2" type="reset">
              Reset
            </button>
            <button className="btn btn-primary" type="submit">
              Next
            </button>
          </div>
        </div>
        <ToastContainer autoClose={1000} />
      </form>
    </>
  );
};

export default CourseListForm;
