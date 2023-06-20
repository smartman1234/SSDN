import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import StaticpageService from "../../../Services/StaticPageService/StaticePageService";

export default function Home({ pageName, slug }) {
  const [imageUrl, setImageurl] = useState("");
  const[analysisImage,setAnalysisImage]=useState()
  const staticeService = new StaticpageService();
  const [image, setImage] = useState();
  const [aboutExperienceImage, setAboutExperienceImage] = useState();
  const [aboutImage, setAboutImage] = useState();
  const [card1Image, setCard1Image] = useState();
  const [card2Image, setCard2Image] = useState();
  const [values, setValues] = useState({
    page_name: "",
    page_slug: "",
    banner_title_1: "",
    banner_title_2: "",
    banner_description: "",
    banner_image: "",
    banner_image_alt_tag: "",
    our_learning_title: "",
    learning_1_title: "",
    learning_1_description: "",
    learning_2_title: "",
    learning_2_description: "",
    learning_3_title: "",
    learning_3_description: "",
    about_experiance_image: "",
    about_experiance_image_alt_tag: "",
    about_image: "",
    about_image_alt_tag: "",
    about_title_1: "",
    about_title_2: "",
    about_description: "",
    about_sub_title_1: "",
    about_sub_description_1: "",
    about_sub_title_2: "",
    about_sub_description_2: "",
    get_in_touch_title: "",
    suitable_title: "",
    suitable_card_1_title: "",
    suitable_card_1_description: "",
    suitable_card_1_image: "",
    suitable_card_1_image_alt_tag: "",
    suitable_card_2_title: "",
    suitable_card_2_description: "",
    suitable_card_2_image: "",
    suitable_card_2_image_alt_tag: "",
    analysis_title_1: "",
    analysis_title_2: "",analysis_image:"",
    analysis_card_1_title: "",
    analysis_card_1_description: "",
    analysis_card_2_title: "",
    analysis_card_2_description: "",
    analysis_card_3_title: "",
    analysis_card_3_description: "",
    analysis_card_4_title: "",
    analysis_card_4_description: "",
    your_intent_title: "",
    why_choose_us_title: "",
    we_take_pride_title: "",
    post_training_title_1: "",
    post_training_title_2: "",
    traning_card_1_title: "",
    traning_card_1_description: "",
    traning_card_2_title: "",
    traning_card_2_description: "",
    why_choose_button_link: "",
    quotes: "",
  });

  const onSubmit = (values) => {
    const formData = new FormData();

    formData.set("page_name", values.page_name);
    formData.set("page_slug", values.page_slug);
    formData.set("description[banner_title_1]", values.banner_title_1);
    formData.set("description[banner_title_2]", values.banner_title_2);
    formData.set("description[banner_description]", values.banner_description);
    formData.set("description[banner_image]", values.banner_image);
    formData.set(
      "description[banner_image_alt_tag]",
      values.banner_image_alt_tag
    );
    formData.set("description[our_learning_title]", values.our_learning_title);
    formData.set("description[learning_1_title]", values.learning_1_title);
    formData.set(
      "description[learning_1_description]",
      values.learning_1_description
    );
    formData.set("description[learning_2_title]", values.learning_2_title);
    formData.set(
      "description[learning_2_description]",
      values.learning_2_description
    );
    formData.set("description[learning_3_title]", values.learning_3_title);
    formData.set(
      "description[learning_3_description]",
      values.learning_3_description
    );
    formData.set(
      "description[about_experiance_image]",
      values.about_experiance_image
    );
    formData.set(
      "description[about_experiance_image_alt_tag]",
      values.about_experiance_image_alt_tag
    );
    formData.set("description[about_image]", values.about_image);
    formData.set(
      "description[about_image_alt_tag]",
      values.about_image_alt_tag
    );
    formData.set("description[about_title_1]", values.about_title_1);
    formData.set("description[about_title_2]", values.about_title_2);
    formData.set("description[about_description]", values.about_description);
    formData.set("description[about_sub_title_1]", values.about_sub_title_1);
    formData.set(
      "description[about_sub_description_1]",
      values.about_sub_description_1
    );
    formData.set("description[about_sub_title_2]", values.about_sub_title_2);
    formData.set(
      "description[about_sub_description_2]",
      values.about_sub_description_2
    );
    formData.set("description[get_in_touch_title]", values.get_in_touch_title);
    formData.set("description[suitable_title]", values.suitable_title);
    formData.set(
      "description[suitable_card_1_title]",
      values.suitable_card_1_title
    );
    formData.set(
      "description[suitable_card_1_description]",
      values.suitable_card_1_description
    );
    formData.set(
      "description[suitable_card_1_image]",
      values.suitable_card_1_image
    );
    formData.set(
      "description[suitable_card_1_image_alt_tag]",
      values.suitable_card_1_image_alt_tag
    );
    formData.set(
      "description[suitable_card_2_title]",
      values.suitable_card_2_title
    );
    formData.set(
      "description[suitable_card_2_description]",
      values.suitable_card_2_description
    );
    formData.set(
      "description[suitable_card_2_image]",
      values.suitable_card_2_image
    );
    formData.set(
      "description[suitable_card_2_image_alt_tag]",
      values.suitable_card_2_image_alt_tag
    );
    formData.set("description[analysis_title_1]", values.analysis_title_1);
    formData.set("description[analysis_title_2]", values.analysis_title_2);
    formData.set(
      "description[analysis_card_1_title]",
      values.analysis_card_1_title
    );
    formData.set(
      "description[analysis_image]",
      values.analysis_image
    );
    formData.set(
      "description[analysis_card_1_description]",
      values.analysis_card_1_description
    );
    formData.set(
      "description[analysis_card_2_title]",
      values.analysis_card_2_title
    );
    formData.set(
      "description[analysis_card_2_description]",
      values.analysis_card_2_description
    );
    formData.set(
      "description[analysis_card_3_title]",
      values.analysis_card_3_title
    );
    formData.set(
      "description[analysis_card_3_description]",
      values.analysis_card_3_description
    );
    formData.set(
      "description[analysis_card_4_title]",
      values.analysis_card_4_title
    );
    formData.set(
      "description[analysis_card_4_description]",
      values.analysis_card_4_description
    );
    formData.set("description[your_intent_title]", values.your_intent_title);
    formData.set(
      "description[why_choose_us_title]",
      values.why_choose_us_title
    );
    formData.set(
      "description[we_take_pride_title]",
      values.we_take_pride_title
    );
    formData.set(
      "description[post_training_title_1]",
      values.post_training_title_1
    );
    formData.set(
      "description[post_training_title_2]",
      values.post_training_title_2
    );
    formData.set(
      "description[traning_card_1_title]",
      values.traning_card_1_title
    );
    formData.set(
      "description[traning_card_1_description]",
      values.traning_card_1_description
    );
    formData.set(
      "description[traning_card_2_title]",
      values.traning_card_2_title
    );
    formData.set(
      "description[traning_card_2_description]",
      values.traning_card_2_description
    );
    formData.set(
      "description[why_choose_button_link]",
      values.why_choose_button_link
    );
    formData.set("description[quotes]", values.quotes);

    const config = {
      headers: {
        content: "multipart/form-data",
        AUTHTOKEN: window.user?.data?.auth_token,
      },
    };
    axios
      .post(
        process.env.REACT_APP_API_BASEURL + "page/create-page-block",
        formData,
        config
      )
      .then((res) => {
        if (res.data?.status === "success") {
          toast.success("Record update successfully");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  const ValidateSchema = Yup.object().shape({
    banner_title_1: Yup.string().required("Required").nullable(),
    banner_title_1: Yup.string().required("Required"),
    banner_title_2: Yup.string().required("Required"),
    banner_description: Yup.string().required("Required"),
    banner_image: Yup.mixed().required("Required"),
    banner_image_alt_tag: Yup.string().required("Required"),
    our_learning_title: Yup.string().required("Required"),
    learning_1_title: Yup.string().required("Required"),
    learning_1_description: Yup.string().required("Required"),
    learning_2_title: Yup.string().required("Required"),
    learning_2_description: Yup.string().required("Required"),
    learning_3_title: Yup.string().required("Required"),
    learning_3_description: Yup.string().required("Required"),
    about_experiance_image: Yup.mixed().required("Required"),
    about_experiance_image_alt_tag: Yup.string().required("Required"),
    about_image: Yup.mixed().required("Required"),
    about_image_alt_tag: Yup.string().required("Required"),
    about_title_1: Yup.string().required("Required"),
    about_title_2: Yup.string().required("Required"),
    about_description: Yup.string().required("Required"),
    about_sub_title_1: Yup.string().required("Required"),
    about_sub_description_1: Yup.string().required("Required"),
    about_sub_title_2: Yup.string().required("Required"),
    about_sub_description_2: Yup.string().required("Required"),
    get_in_touch_title: Yup.string().required("Required"),
    suitable_title: Yup.string().required("Required"),
    suitable_card_1_title: Yup.string().required("Required"),
    suitable_card_1_description: Yup.string().required("Required"),
    suitable_card_1_image: Yup.mixed().required("Required"),
    suitable_card_1_image_alt_tag: Yup.string().required("Required"),
    suitable_card_2_title: Yup.string().required("Required"),
    suitable_card_2_description: Yup.string().required("Required"),
    suitable_card_2_image: Yup.mixed().required("Required"),
    suitable_card_2_image_alt_tag: Yup.string().required("Required"),
    analysis_image: Yup.mixed().required("Required"),
    analysis_title_1: Yup.string().required("Required"),
    analysis_title_2: Yup.string().required("Required"),
    analysis_card_1_title: Yup.string().required("Required"),
    analysis_card_1_description: Yup.string().required("Required"),
    analysis_card_2_title: Yup.string().required("Required"),
    analysis_card_2_description: Yup.string().required("Required"),
    analysis_card_3_title: Yup.string().required("Required"),
    analysis_card_3_description: Yup.string().required("Required"),
    analysis_card_4_title: Yup.string().required("Required"),
    analysis_card_4_description: Yup.string().required("Required"),
    your_intent_title: Yup.string().required("Required"),
    why_choose_us_title: Yup.string().required("Required"),
    we_take_pride_title: Yup.string().required("Required"),
    post_training_title_1: Yup.string().required("Required"),
    post_training_title_2: Yup.string().required("Required"),
    traning_card_1_title: Yup.string().required("Required"),
    traning_card_1_description: Yup.string().required("Required"),
    traning_card_2_title: Yup.string().required("Required"),
    traning_card_2_description: Yup.string().required("Required"),
    why_choose_button_link: Yup.string().required("Required"),
    quotes: Yup.string().required("Required"),
  });

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

  const thumbImagehandle = (e, props, name) => {
    let { file } = e.target.files[0];

    file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function (e) {
      var image = new Image();
      image.src = e.target.result;
      image.onload = function () {
        var height = this.height;
        var width = this.width;
        
        if (name === "banner_image") {
          getBase64(file)
            .then((result) => {
              file["base64"] = result;
              setImage(result);
              props.setFieldValue("banner_image", file);
            })
            .catch((err) => {
              throw err;
            });
        }
        else if (name === "about_experiance_image") {
          getBase64(file)
            .then((result) => {
              file["base64"] = result;
              setAboutExperienceImage(result);
              props.setFieldValue("about_experiance_image", file);
            })
            .catch((err) => {
              
            });
        }
        else if (name === "about_image") {

          getBase64(file)
            .then((result) => {
              file["base64"] = result;
              setAboutImage(result);
              props.setFieldValue("about_image", file);

            })
            .catch((err) => {
              
            });
        }
        else if (name === "suitable_card_1_image") {

          getBase64(file)
            .then((result) => {
              file["base64"] = result;
              setCard1Image(result);
              props.setFieldValue("suitable_card_1_image", file);
            })
            .catch((err) => {
              
            });
        }
        else if (name === "suitable_card_2_image") {
          getBase64(file)
            .then((result) => {
              file["base64"] = result;
              setCard2Image(result);
              props.setFieldValue("suitable_card_2_image", file);
            })
            .catch((err) => {
              
            });
        }
        else if (name === "analysis_image") {
          getBase64(file)
            .then((result) => {
              file["base64"] = result;
              setAnalysisImage(result);
              props.setFieldValue("analysis_image", file);
            })
            .catch((err) => {
              
            });
        }
      };
    };
  };

  useEffect(() => {
    getPageBlockData();
  }, []);

  const getPageBlockData = async () => {
    try {
      let response = await staticeService.getDetails(slug);

      if (response.status === "success") {
        setImageurl(response.data?.page_description?.image_url);

        setValues({
          page_name: response.data.page_name,
          page_slug: response.data.page_slug,
          banner_title_1: response.data?.page_description?.banner_title_1,
          banner_title_2: response.data?.page_description?.banner_title_2,
          banner_description:
            response.data?.page_description?.banner_description,
          banner_image: response.data?.page_description?.banner_image,
          banner_image_alt_tag:
            response.data?.page_description?.banner_image_alt_tag,
          our_learning_title:
            response.data?.page_description?.our_learning_title,
          learning_1_title: response.data?.page_description?.learning_1_title,
          learning_1_description:
            response.data?.page_description?.learning_1_description,
          learning_2_title: response.data?.page_description?.learning_2_title,
          learning_2_description:
            response.data?.page_description?.learning_2_description,
          learning_3_title: response.data?.page_description?.learning_3_title,
          learning_3_description:
            response.data?.page_description?.learning_3_description,
          about_experiance_image:
            response.data?.page_description?.about_experiance_image,
          about_experiance_image_alt_tag:
            response.data?.page_description?.about_experiance_image_alt_tag,
          about_image: response.data?.page_description?.about_image,
          about_image_alt_tag:
            response.data?.page_description?.about_image_alt_tag,
          about_title_1: response.data?.page_description?.about_title_1,
          about_title_2: response.data?.page_description?.about_title_2,
          about_description: response.data?.page_description?.about_description,
          about_sub_title_1: response.data?.page_description?.about_sub_title_1,
          about_sub_description_1:
            response.data?.page_description?.about_sub_description_1,
          about_sub_title_2: response.data?.page_description?.about_sub_title_2,
          about_sub_description_2:
            response.data?.page_description?.about_sub_description_2,
          get_in_touch_title:
            response.data?.page_description?.get_in_touch_title,
          suitable_title: response.data?.page_description?.suitable_title,
          suitable_card_1_title:
            response.data?.page_description?.suitable_card_1_title,
          suitable_card_1_description:
            response.data?.page_description?.suitable_card_1_description,
          suitable_card_1_image:
            response.data?.page_description?.suitable_card_1_image,
          suitable_card_1_image_alt_tag:
            response.data?.page_description?.suitable_card_1_image_alt_tag,
          suitable_card_2_title:
            response.data?.page_description?.suitable_card_2_title,
          suitable_card_2_description:
            response.data?.page_description?.suitable_card_2_description,
          suitable_card_2_image:
            response.data?.page_description?.suitable_card_2_image,
          suitable_card_2_image_alt_tag:
            response.data?.page_description?.suitable_card_2_image_alt_tag,
          analysis_title_1: response.data?.page_description?.analysis_title_1,
          analysis_image:response.data?.page_description?.analysis_image,
          analysis_title_2: response.data?.page_description?.analysis_title_2,
          analysis_card_1_title:
            response.data?.page_description?.analysis_card_1_title,
          analysis_card_1_description:
            response.data?.page_description?.analysis_card_1_description,
          analysis_card_2_title:
            response.data?.page_description?.analysis_card_2_title,
          analysis_card_2_description:
            response.data?.page_description?.analysis_card_2_description,
          analysis_card_3_title:
            response.data?.page_description?.analysis_card_3_title,
          analysis_card_3_description:
            response.data?.page_description?.analysis_card_3_description,
          analysis_card_4_title:
            response.data?.page_description?.analysis_card_4_title,
          analysis_card_4_description:
            response.data?.page_description?.analysis_card_4_description,
          your_intent_title: response.data?.page_description?.your_intent_title,
          why_choose_us_title:
            response.data?.page_description?.why_choose_us_title,
          we_take_pride_title:
            response.data?.page_description?.we_take_pride_title,
          post_training_title_1:
            response.data?.page_description?.post_training_title_1,
          post_training_title_2:
            response.data?.page_description?.post_training_title_2,
          traning_card_1_title:
            response.data?.page_description?.traning_card_1_title,
          traning_card_1_description:
            response.data?.page_description?.traning_card_1_description,
          traning_card_2_title:
            response.data?.page_description?.traning_card_2_title,
          traning_card_2_description:
            response.data?.page_description?.traning_card_2_description,
          why_choose_button_link:
            response.data?.page_description?.why_choose_button_link,
          quotes: response.data?.page_description?.quotes,
        });
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <Formik
        initialValues={values}
        onSubmit={onSubmit}
        enableReinitialize={true}
        validationSchema={ValidateSchema}
      >
        {(props) => (
          <form className="form theme-form" onSubmit={props.handleSubmit}>
            <div className="row">
              <div className="form-group col-md-12" style={{ display: "none" }}>
                <label className="form-label">
                  Page / Blocks
                  <span className="text-danger">*</span>
                </label>

                <input
                  className="form-control"
                  name="page_name"
                  type="text"
                  placeholder="Enter slug"
                  disabled
                  defaultValue={pageName}
                />
                {props.touched.page_name && props.errors.page_name ? (
                  <div className="formik-errors bg-error">
                    {props.errors.page_name}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-12" style={{ display: "none" }}>
                <label className="form-label">
                  Slug <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="slug"
                  type="text"
                  placeholder="Enter slug"
                  disabled
                  defaultValue={slug}
                />
                {props.touched.slug && props.errors.slug ? (
                  <div className="formik-errors bg-error">
                    {props.errors.slug}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-12">
                <label className="form-label fs-4">Banner</label>
                <hr />
              </div>{" "}
              <div className="form-group col-md-6">
                <label className="form-label">
                  Banner Title 1 <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="banner_title_1"
                  type="text"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.banner_title_1}
                  placeholder="Enter banner title 1"
                />
                {props.touched.banner_title_1 && props.errors.banner_title_1 ? (
                  <div className="formik-errors bg-error">
                    {props.errors.banner_title_1}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Banner Title 2 <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="banner_title_2"
                  type="text"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.banner_title_2}
                  placeholder="Enter banner title 2"
                />
                {props.touched.banner_title_2 && props.errors.banner_title_2 ? (
                  <div className="formik-errors bg-error">
                    {props.errors.banner_title_2}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">Banner Description <span className="text-danger">*</span></label>
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
                  value={props.values.banner_description}
                  onEditorChange={(e) =>
                    props.setFieldValue("banner_description", e)
                  }
                />
                {props.touched.banner_description &&
                props.errors.banner_description ? (
                  <div className="formik-errors bg-error">
                    {props.errors.banner_description}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <div className="row">  
                <div className="form-group col-md-10">
                  <label className="form-label">
                    Banner Image <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    name="banner_image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      thumbImagehandle(e, props, "banner_image");
                    }}
                    placeholder="Enter slug"
                  />
                  {props.touched.banner_image && props.errors.banner_image ? (
                    <div className="formik-errors bg-error">
                      {props.errors.banner_image}
                    </div>
                  ) : null}
                </div>
                {(image || imageUrl + props.values.banner_image) && (
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
                      src={image || imageUrl + props.values.banner_image}
                      alt="image"
                      style={{
                        padding: "0",
                        width: "100%",
                        height: "72%",
                      }}
                    />
                  </div>
                )}
                <div className="form-group col-md-12">
                  <label className="form-label">
                    Banner Image Alt Tag <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    name="banner_image_alt_tag"
                    type="text"
                    placeholder="Enter skill banner image alt tag"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.banner_image_alt_tag}
                  />
                  {props.touched.banner_image_alt_tag &&
                  props.errors.banner_image_alt_tag ? (
                    <div className="formik-errors bg-error">
                      {props.errors.banner_image_alt_tag}
                    </div>
                  ) : null}
                </div></div>
              
              </div>
                <div className="form-group col-md-12">
                <label className="form-label fs-4">LEARNING OPPORTUNITY</label>
                <hr />
              </div>{" "}
              <div className="form-group col-md-12">
                <label className="form-label">
                  Our Learning Title <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="our_learning_title"
                  type="text"
                  placeholder="Enter our learning title"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.our_learning_title}
                />
                {props.touched.our_learning_title &&
                props.errors.our_learning_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.our_learning_title}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Learning 1 Title <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="learning_1_title"
                  type="text"
                  placeholder="Enter learning 1 title"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.learning_1_title}
                />
                {props.touched.learning_1_title &&
                props.errors.learning_1_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.learning_1_title}
                  </div>
                ) : null}
              </div> <div className="form-group col-md-6">
                <label className="form-label">
                  Learning 2 Title <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="learning_2_title"
                  type="text"
                  placeholder="Enter learning 2 title"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.learning_2_title}
                />
                {props.touched.learning_2_title &&
                props.errors.learning_2_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.learning_2_title}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Learning 1 Description <span className="text-danger">*</span>
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
                  value={props.values.learning_1_description}
                  onEditorChange={(e) =>
                    props.setFieldValue("learning_1_description", e)
                  }
                />
                {props.touched.learning_1_description &&
                props.errors.learning_1_description ? (
                  <div className="formik-errors bg-error">
                    {props.errors.learning_1_description}
                  </div>
                ) : null}
              </div>
             
              <div className="form-group col-md-6">
                <label className="form-label">
                  Learning 2 Description <span className="text-danger">*</span>
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
                  value={props.values.learning_2_description}
                  onEditorChange={(e) =>
                    props.setFieldValue("learning_2_description", e)
                  }
                />
                {props.touched.learning_2_description &&
                props.errors.learning_2_description ? (
                  <div className="formik-errors bg-error">
                    {props.errors.learning_2_description}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Learning 3 Title <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="learning_3_title"
                  type="text"
                  placeholder="Enter learning 3 title"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.learning_3_title}
                />
                {props.touched.learning_3_title &&
                props.errors.learning_3_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.learning_3_title}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Learning 3 Description <span className="text-danger">*</span>
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
                  value={props.values.learning_3_description}
                  onEditorChange={(e) =>
                    props.setFieldValue("learning_3_description", e)
                  }
                />
                {props.touched.learning_3_description &&
                props.errors.learning_3_description ? (
                  <div className="formik-errors bg-error">
                    {props.errors.learning_3_description}
                  </div>
                ) : null}
              </div> <div className="form-group col-md-12">
                <label className="form-label fs-4">About</label>
                <hr />
              </div>{" "}
              <div
                className={
                  props.values.about_experiance_image
                    ? "form-group col-md-5"
                    : "form-group col-md-5"
                }
              >
                <label className="form-label">
                  About Experience image <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="about_experiance_image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    thumbImagehandle(e, props, "about_experiance_image");
                  }}
                  placeholder="Enter slug"
                />
                {props.touched.about_experiance_image &&
                props.errors.about_experiance_image ? (
                  <div className="formik-errors bg-error">
                    {props.errors.about_experiance_image}
                  </div>
                ) : null}
              </div>
             
              {(aboutExperienceImage ||
                imageUrl + props.values.about_experiance_image) && (
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
                    src={
                      aboutExperienceImage ||
                      imageUrl + props.values.about_experiance_image
                    }
                    alt="image"
                    style={{
                      padding: "0",
                      width: "100%",
                      height: "72%",
                    }}
                  />
                </div>
              )}
              <div className="form-group col-md-6">
                <label className="form-label">
                  About Experiance Image Alt Tag <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="about_experiance_image_alt_tag"
                  type="text"
                  placeholder="Enter about experiance image alt tag"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.about_experiance_image_alt_tag}
                />
                {props.touched.about_experiance_image_alt_tag &&
                props.errors.about_experiance_image_alt_tag ? (
                  <div className="formik-errors bg-error">
                    {props.errors.about_experiance_image_alt_tag}
                  </div>
                ) : null}
              </div>
              <div
                className={
                  props.values.about_image
                    ? "form-group col-md-5"
                    : "form-group col-md-5"
                }
              >
                <label className="form-label">
                  About image <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="about_image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    thumbImagehandle(e, props, "about_image");
                  }}
                  placeholder="Enter slug"
                />
                {props.touched.about_image && props.errors.about_image ? (
                  <div className="formik-errors bg-error">
                    {props.errors.about_image}
                  </div>
                ) : null}
              </div>
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
                  src={aboutImage || imageUrl + props.values.about_image}
                  alt="image"
                  style={{
                    padding: "0",
                    width: "100%",
                    height: "72%",
                  }}
                />
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  About Image Alt Tag <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="about_image_alt_tag"
                  type="text"
                  placeholder="Enter about image alt tag"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.about_image_alt_tag}
                />
                {props.touched.about_image_alt_tag &&
                props.errors.about_image_alt_tag ? (
                  <div className="formik-errors bg-error">
                    {props.errors.about_image_alt_tag}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-12">
                <label className="form-label">
                  About Title 1 <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="about_title_1"
                  type="text"
                  placeholder="Enter about title 1"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.about_title_1}
                />
                {props.touched.about_title_1 && props.errors.about_title_1 ? (
                  <div className="formik-errors bg-error">
                    {props.errors.about_title_1}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-12">
                <label className="form-label">
                  About Title 2 <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="about_title_2"
                  type="text"
                  placeholder="Enter about title 2"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.about_title_2}
                />
                {props.touched.about_title_2 && props.errors.about_title_2 ? (
                  <div className="formik-errors bg-error">
                    {props.errors.about_title_2}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-12">
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
                  value={props.values.about_description}
                  onEditorChange={(e) =>
                    props.setFieldValue("about_description", e)
                  }
                />
                {props.touched.about_description &&
                props.errors.about_description ? (
                  <div className="formik-errors bg-error">
                    {props.errors.about_description}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  About Sub Title 1 <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="about_sub_title_1"
                  type="text"
                  placeholder="Enter about sub title 1"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.about_sub_title_1}
                />
                {props.touched.about_sub_title_1 &&
                props.errors.about_sub_title_1 ? (
                  <div className="formik-errors bg-error">
                    {props.errors.about_sub_title_1}
                  </div>
                ) : null}
              </div><div className="form-group col-md-6">
                <label className="form-label">
                  About Sub Title 2 <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="about_sub_title_2"
                  type="text"
                  placeholder="Enter about sub title 2"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.about_sub_title_2}
                />
                {props.touched.about_sub_title_2 &&
                props.errors.about_sub_title_2 ? (
                  <div className="formik-errors bg-error">
                    {props.errors.about_sub_title_2}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">About Sub Description 1 <span className="text-danger">*</span></label>
                
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
                  value={props.values.about_sub_description_1}
                  onEditorChange={(e) =>
                    props.setFieldValue("about_sub_description_1", e)
                  }
                />
                {props.touched.about_sub_description_1 &&
                props.errors.about_sub_description_1 ? (
                  <div className="formik-errors bg-error">
                    {props.errors.about_sub_description_1}
                  </div>
                ) : null}
              </div>
              
              <div className="form-group col-md-6">
                <label className="form-label">About Sub Description 2 <span className="text-danger">*</span></label>
                
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
                  value={props.values.about_sub_description_2}
                  onEditorChange={(e) =>
                    props.setFieldValue("about_sub_description_2", e)
                  }
                />
                {props.touched.about_sub_description_2 &&
                props.errors.about_sub_description_2 ? (
                  <div className="formik-errors bg-error">
                    {props.errors.about_sub_description_2}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-12">
                <label className="form-label fs-4">Get In Touch</label>
                <hr />
              </div>{" "}
              <div className="form-group col-md-12">
                <label className="form-label">
                  Get In Touch Title <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="get_in_touch_title"
                  type="text"
                  placeholder="Enter get in touch title"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.get_in_touch_title}
                />
                {props.touched.get_in_touch_title &&
                props.errors.get_in_touch_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.get_in_touch_title}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-12">
                <label className="form-label">
                  Suitable Title <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="suitable_title"
                  type="text"
                  placeholder="Enter skill suitable title"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.suitable_title}
                />
                {props.touched.suitable_title && props.errors.suitable_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.suitable_title}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Suitable Card 1 Title <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="suitable_card_1_title"
                  type="text"
                  placeholder="Enter suitable card 1 title"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.suitable_card_1_title}
                />
                {props.touched.suitable_card_1_title &&
                props.errors.suitable_card_1_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.suitable_card_1_title}
                  </div>
                ) : null}
              </div> <div className="form-group col-md-6">
                <label className="form-label">
                  Suitable Card 2 Title <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="suitable_card_2_title"
                  type="text"
                  placeholder="Enter suitable card 2 title"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.suitable_card_2_title}
                />
                {props.touched.suitable_card_2_title &&
                props.errors.suitable_card_2_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.suitable_card_2_title}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Suitable Card 1 Description <span className="text-danger">*</span>
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
                  value={props.values.suitable_card_1_description}
                  onEditorChange={(e) =>
                    props.setFieldValue("suitable_card_1_description", e)
                  }
                />
                {props.touched.suitable_card_1_description &&
                props.errors.suitable_card_1_description ? (
                  <div className="formik-errors bg-error">
                    {props.errors.suitable_card_1_description}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Suitable Card 2 Description <span className="text-danger">*</span>
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
                  value={props.values.suitable_card_2_description}
                  onEditorChange={(e) =>
                    props.setFieldValue("suitable_card_2_description", e)
                  }
                />
                {props.touched.suitable_card_2_description &&
                props.errors.suitable_card_2_description ? (
                  <div className="formik-errors bg-error">
                    {props.errors.suitable_card_2_description}
                  </div>
                ) : null}
              </div>
              <div
                className={
                  props.values.suitable_card_1_image
                    ? "form-group col-md-5"
                    : "form-group col-md-5"
                }
              >
                <label className="form-label">
                  Suitable card 1 Image <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="suitable_card_1_image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    thumbImagehandle(e, props, "suitable_card_1_image");
                  }}
                  placeholder="Enter slug"
                />
                {props.touched.suitable_card_1_image &&
                props.errors.suitable_card_1_image ? (
                  <div className="formik-errors bg-error">
                    {props.errors.suitable_card_1_image}
                  </div>
                ) : null}
              </div>
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
                  src={
                    card1Image || imageUrl + props.values.suitable_card_1_image
                  }
                  alt="image"
                  style={{
                    padding: "0",
                    width: "100%",
                    height: "72%",
                  }}
                />
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Suitable Card 1 Image Alt Tag <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="suitable_card_1_image_alt_tag"
                  type="text"
                  placeholder="Enter skill suitable card 1 image alt tag"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.suitable_card_1_image_alt_tag}
                />
                {props.touched.suitable_card_1_image_alt_tag &&
                props.errors.suitable_card_1_image_alt_tag ? (
                  <div className="formik-errors bg-error">
                    {props.errors.suitable_card_1_image_alt_tag}
                  </div>
                ) : null}
              </div>             
             
              <div
                className={
                  props.values.suitable_card_2_image
                    ? "form-group col-md-5"
                    : "form-group col-md-5"
                }
              >
                <label className="form-label">
                  Suitable card 2 Image <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="suitable_card_2_image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    thumbImagehandle(e, props, "suitable_card_2_image");
                  }}
                  placeholder="Enter slug"
                />
                {props.touched.suitable_card_2_image &&
                props.errors.suitable_card_2_image ? (
                  <div className="formik-errors bg-error">
                    {props.errors.suitable_card_2_image}
                  </div>
                ) : null}
              </div>
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
                  src={
                    card2Image || imageUrl + props.values.suitable_card_2_image
                  }
                  alt="image"
                  style={{
                    padding: "0",
                    width: "100%",
                    height: "72%",
                  }}
                />
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Suitable Card 2 Image Alt Tag <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="suitable_card_2_image_alt_tag"
                  type="text"
                  placeholder="Enter skill suitable card 2 image alt tag"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.suitable_card_2_image_alt_tag}
                />
                {props.touched.suitable_card_2_image_alt_tag &&
                props.errors.suitable_card_2_image_alt_tag ? (
                  <div className="formik-errors bg-error">
                    {props.errors.suitable_card_2_image_alt_tag}
                  </div>
                ) : null}
              </div>
               <div className="form-group col-md-12">
                <label className="form-label fs-4">SELF ANALYSIS</label>
                <hr />
              </div>{" "}
              <div className="form-group col-md-6">
                <label className="form-label">
                  Analysis Title 1 <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="analysis_title_1"
                  type="text"
                  placeholder="Enter skill analysis title 1"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.analysis_title_1}
                />
                {props.touched.analysis_title_1 &&
                props.errors.analysis_title_1 ? (
                  <div className="formik-errors bg-error">
                    {props.errors.analysis_title_1}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-5">
                <label className="form-label">
                 Image <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="analysis_image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    thumbImagehandle(e, props, "analysis_image");
                  }}
                  onBlur={props.handleBlur}
              
                />
                {props.touched.analysis_image &&
                props.errors.analysis_image ? (
                  <div className="formik-errors bg-error">
                    {props.errors.analysis_image}
                  </div>
                ) : null}
              </div>
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
                  src={
                    analysisImage || imageUrl + props.values.analysis_image
                  }
                  alt="image"
                  style={{
                    padding: "0",
                    width: "100%",
                    height: "72%",
                  }}
                />
              </div>
              <div className="form-group col-md-12">
                <label className="form-label">
                  Analysis Title 2 <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="analysis_title_2"
                  type="text"
                  placeholder="Enter skill analysis title 2"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.analysis_title_2}
                />
                {props.touched.analysis_title_2 &&
                props.errors.analysis_title_2 ? (
                  <div className="formik-errors bg-error">
                    {props.errors.analysis_title_2}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Analysis Card 1 Title <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="analysis_card_1_title"
                  type="text"
                  placeholder="Enter skill analysis card 1 title"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.analysis_card_1_title}
                />
                {props.touched.analysis_card_1_title &&
                props.errors.analysis_card_1_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.analysis_card_1_title}
                  </div>
                ) : null}
              </div>  <div className="form-group col-md-6">
                <label className="form-label">
                  Analysis Card 2 Title <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="analysis_card_2_title"
                  type="text"
                  placeholder="Enter skill analysis card 2 title"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.analysis_card_2_title}
                />
                {props.touched.analysis_card_2_title &&
                props.errors.analysis_card_2_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.analysis_card_2_title}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Analysis Card 1 Description <span className="text-danger">*</span>
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
                  value={props.values.analysis_card_1_description}
                  onEditorChange={(e) =>
                    props.setFieldValue("analysis_card_1_description", e)
                  }
                />
                {props.touched.analysis_card_1_description &&
                props.errors.analysis_card_1_description ? (
                  <div className="formik-errors bg-error">
                    {props.errors.analysis_card_1_description}
                  </div>
                ) : null}
              </div>
            
              <div className="form-group col-md-6">
                <label className="form-label">
                  Analysis Card 2 Description <span className="text-danger">*</span>
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
                  value={props.values.analysis_card_2_description}
                  onEditorChange={(e) =>
                    props.setFieldValue("analysis_card_2_description", e)
                  }
                />
                {props.touched.analysis_card_2_description &&
                props.errors.analysis_card_2_description ? (
                  <div className="formik-errors bg-error">
                    {props.errors.analysis_card_2_description}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Analysis Card 3 Title <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="analysis_card_3_title"
                  type="text"
                  placeholder="Enter skill analysis card 3 title"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.analysis_card_3_title}
                />
                {props.touched.analysis_card_3_title &&
                props.errors.analysis_card_3_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.analysis_card_3_title}
                  </div>
                ) : null}
              </div>  <div className="form-group col-md-6">
                <label className="form-label">
                  Analysis Card 4 Title <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="analysis_card_4_title"
                  type="text"
                  placeholder="Enter skill analysis card 4 title"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.analysis_card_4_title}
                />
                {props.touched.analysis_card_4_title &&
                props.errors.analysis_card_4_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.analysis_card_4_title}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Analysis Card 3 Description
                </label>
                <span className="text-danger">*</span>
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
                  value={props.values.analysis_card_3_description}
                  onEditorChange={(e) =>
                    props.setFieldValue("analysis_card_3_description", e)
                  }
                />
                {props.touched.analysis_card_3_description &&
                props.errors.analysis_card_3_description ? (
                  <div className="formik-errors bg-error">
                    {props.errors.analysis_card_3_description}
                  </div>
                ) : null}
              </div>
            
              <div className="form-group col-md-6">
                <label className="form-label">
                  Analysis Card 4 Description
                </label>
                <span className="text-danger">*</span>
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
                  value={props.values.analysis_card_4_description}
                  onEditorChange={(e) =>
                    props.setFieldValue("analysis_card_4_description", e)
                  }
                />
                {props.touched.analysis_card_4_description &&
                props.errors.analysis_card_4_description ? (
                  <div className="formik-errors bg-error">
                    {props.errors.analysis_card_4_description}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-12">
                <label className="form-label fs-4">Why Choose Us</label>
                <hr />
              </div>{" "}
              <div className="form-group col-md-12">
                <label className="form-label">
                  Your Intent Title <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="your_intent_title"
                  type="text"
                  placeholder="Enter skill your intent title"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.your_intent_title}
                />
                {props.touched.your_intent_title &&
                props.errors.your_intent_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.your_intent_title}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-12">
                <label className="form-label">
                  Why Choose Us Title <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="why_choose_us_title"
                  type="text"
                  placeholder="Enter skill why choose us title"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.why_choose_us_title}
                />
                {props.touched.why_choose_us_title &&
                props.errors.why_choose_us_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.why_choose_us_title}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-12">
                <label className="form-label">
                  We Take Pride Title <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="we_take_pride_title"
                  type="text"
                  placeholder="Enter skill we take pride title"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.we_take_pride_title}
                />
                {props.touched.we_take_pride_title &&
                props.errors.we_take_pride_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.we_take_pride_title}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Post Training Title 1 <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="post_training_title_1"
                  type="text"
                  placeholder="Enter skill post training title 1"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.post_training_title_1}
                />
                {props.touched.post_training_title_1 &&
                props.errors.post_training_title_1 ? (
                  <div className="formik-errors bg-error">
                    {props.errors.post_training_title_1}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Post Training Title 2 <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="post_training_title_2"
                  type="text"
                  placeholder="Enter skill post training title 2"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.post_training_title_2}
                />
                {props.touched.post_training_title_2 &&
                props.errors.post_training_title_2 ? (
                  <div className="formik-errors bg-error">
                    {props.errors.post_training_title_2}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Training Card 1 Title <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="traning_card_1_title"
                  type="text"
                  placeholder="Enter skill traning card 1 title"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.traning_card_1_title}
                />
                {props.touched.traning_card_1_title &&
                props.errors.traning_card_1_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.traning_card_1_title}
                  </div>
                ) : null}
              </div>  <div className="form-group col-md-6">
                <label className="form-label">
                  Training Card 2 Title <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="traning_card_2_title"
                  type="text"
                  placeholder="Enter skill traning card 2 title"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.traning_card_2_title}
                />
                {props.touched.traning_card_2_title &&
                props.errors.traning_card_2_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.traning_card_2_title}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Training Card 1 Description <span className="text-danger">*</span>
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
                  value={props.values.traning_card_1_description}
                  onEditorChange={(e) =>
                    props.setFieldValue("traning_card_1_description", e)
                  }
                />
                {props.touched.traning_card_1_description &&
                props.errors.traning_card_1_description ? (
                  <div className="formik-errors bg-error">
                    {props.errors.traning_card_1_description}
                  </div>
                ) : null}
              </div>
            
              <div className="form-group col-md-6">
                <label className="form-label">
                  Training Card 2 Description <span className="text-danger">*</span>
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
                  value={props.values.traning_card_2_description}
                  onEditorChange={(e) =>
                    props.setFieldValue("traning_card_2_description", e)
                  }
                />
                {props.touched.traning_card_2_description &&
                props.errors.traning_card_2_description ? (
                  <div className="formik-errors bg-error">
                    {props.errors.traning_card_2_description}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Why Choose Button Link  <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="why_choose_button_link"
                  type="text"
                  placeholder="Enter skill why choose button link"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.why_choose_button_link}
                />
                {props.touched.why_choose_button_link &&
                props.errors.why_choose_button_link ? (
                  <div className="formik-errors bg-error">
                    {props.errors.why_choose_button_link}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">
                  Quotes <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="quotes"
                  type="text"
                  placeholder="Enter skill quotes"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.quotes}
                />
                {props.touched.quotes && props.errors.quotes ? (
                  <div className="formik-errors bg-error">
                    {props.errors.quotes}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="form-group col-md-12 text-end">
              <button className="btn btn-primary me-2" type="submit">
                Submit
              </button>
            </div>
          </form>
        )}
      </Formik>
    <ToastContainer autoClose={1000} />
    </>
  );
}
