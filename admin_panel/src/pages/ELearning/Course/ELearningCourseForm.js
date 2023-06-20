import React, { useContext, useEffect, useState } from "react";
import { json, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import CourseCourseService from "../../../Services/CourseService/CourseCourseService";
import CourseService from "../../../Services/CourseService/CourseService";
import ELearningCreateCourse from "./ELearningCreateCourse";
import ELearningCourseService from "../../../Services/ELearningService/ELearningCourseService";

function ELearningCourseForm() {
  const navigate = useNavigate();
  const params = useParams();
  const [ogImage, setOgImage] = useState("");
  const [blogForm, setBlogForm] = useState(false);
  const [mainForm, setMainForm] = useState(true);
  const [allCategoryList, setAllCategoryList] = useState([]);
  const [curriculumForm, setCurriculumForm] = useState(false);
  const [categoryLists, setCategoryLists] = useState([]);
  const [values, setValues] = useState({
    category_id: "",
    heading: "",
    name: "",
    slug: "",
    price_type: "",
    inr_price: "",
    is_inr_discount: "",
    inr_discount_price: "",
    media_type: "",
    video_type: "",
    description_option1: "",
    description_option2: "",
    description_option3: "",
    media: "",
    thumb_image: "",
    image_alt_tag: "",
    overview_title: "",
    course_level: "",
    overview: "",
    language: "",
    faqs: [{ title: "", description: "" }],
    analytic_skil_title: "",
    analytic_skils: [{ description: "" }],
    instructor: "",
    is_certificate: "",
    certificate_name: "",
    duration: "",
    duration_time: "",
    certification_title: "",
    certificate_overview: "",
    certificate_demo_image: "",

    related_course: "",
    meta_title: "",
    meta_keyword: "",
    meta_description: "",
    breadcrumb: "",
    og_title: "",
    og_url: "",
    og_image: "",
    og_description: "",
  });

  const serve = new ELearningCourseService();
  const courseServe = new CourseCourseService();
  const VoucherSchema = Yup.object().shape({
    category_id: Yup.mixed().required("Required"),
    name: Yup.string().required("Required"),
    heading: Yup.string().required("Required"),
    slug: Yup.string().required("Required"),
    description_option1: Yup.string().required("Required"),
    description_option2: Yup.string().required("Required"),
    description_option3: Yup.string().required("Required"),
    price_type: Yup.string().required("Required"),
    inr_price: Yup.string()
      .when("price_type", {
        is: (price_type) => price_type && price_type === "paid",
        then: Yup.string().required("Please provide INR Price").nullable(),
      })
      .nullable(),
    is_inr_discount: Yup.string()
      .when("price_type", {
        is: (price_type) => price_type === "paid",
        then: Yup.string().required("Is INR Discount Required").nullable(),
      })
      .nullable(),
    inr_discount_price: Yup.string()
      .when("is_inr_discount", {
        is: (is_inr_discount) => is_inr_discount && is_inr_discount === "1",
        then: Yup.string()
          .min(0, "Min value 0.")
          .max(100, "Percentage can not be more than 100%.")
          .required()
          .nullable(),
      })
      .nullable(),
    media_type: Yup.string().required("Required"),
    video_type: Yup.string()
      .when("media_type", {
        is: (media_type) => media_type && media_type === "video",
        then: Yup.string().required("Required"),
      })
      .nullable(),
    media: Yup.mixed().required("Required"),
    thumb_image: Yup.mixed().when("media_type", {
      is: (media_type) => media_type === "video",
      then: Yup.mixed().required("Required"),
    }),
    image_alt_tag: Yup.string().when("media_type", {
      is: "image",
      then: Yup.string().required("Required").nullable(),
    }),
    overview_title: Yup.string().required("Required"),
    overview: Yup.string().required("Required"),
    language: Yup.string().required("Required"),
    instructor: Yup.string().required("Required"),
    duration: Yup.string().required("Required"),
    duration_time: Yup.string().required("Required"),
    related_course: Yup.array().required("Required"),
    analytic_skil_title: Yup.string().required("Required"),
    analytic_skils: Yup.array(
      Yup.object().shape({
        description: Yup.string().required("Required"),
      })
    ),
    faqs: Yup.array(
      Yup.object().shape({
        title: Yup.string().required("Required"),
        description: Yup.string().required("Required"),
      })
    ),
    is_certificate: Yup.string().required("Required"),
    course_level: Yup.string().required("Required"),
    certification_title: Yup.string().required("Required"),

    certificate_name: Yup.string()
      .when("is_certificate", {
        is: (is_certificate) => is_certificate && is_certificate == "1",
        then: Yup.string().required("Required"),
      })
      .nullable(),
    certificate_overview: Yup.string().required("Required"),

    certificate_demo_image: Yup.mixed().required("Required"),
    related_course: Yup.array().required("Required"),

    meta_title: Yup.string().required("Required"),
    meta_keyword: Yup.string().required("Required"),
    meta_description: Yup.string().required("Required"),
  });

  const onSubmit = async (values) => {
    let related_courseArr =
      values.related_course &&
      values.related_course.map((v) => {
        return v.value;
      });
    const formData = new FormData();
    if (values.id) {
      formData.set("id", values.id);
    }
    formData.set("categories_id", parseInt(values.category_id.value));

    formData.set("name", values.name);
    formData.set("heading", values.heading);
    formData.set(
      "slug",
      values.slug
        .trim()

        .replaceAll(" ", "-")
        .toLowerCase()
    );
    formData.set("description_option_1", values.description_option1);
    formData.set("description_option_2", values.description_option2);
    formData.set("description_option_3", values.description_option3);
    formData.set("price_type", values.price_type);
    if (values.price_type === "paid") {
      formData.set("inr_price", values.inr_price);
      formData.set("is_inr_discount", values.is_inr_discount);
      if (values.is_inr_discount == "1") {
        formData.set("inr_discount_price", values.inr_discount_price);
      }
    }
    formData.set("media_type", values.media_type);
    if (values.media_type === "video") {
      formData.set("video_type", values.video_type);
    }

    formData.set("media", values.media);
    if (values.media_type === "video") {
      formData.set("thumb_image", values.thumb_image);
    } else {
      formData.set("media_alt_tag", values.image_alt_tag);
    }
    formData.set("overview", values.overview);
    formData.set("instructor", values.instructor);
    formData.set("language", values.language);
    formData.set("overview_title", values.overview_title);
    formData.set("course_level", values.course_level);
    formData.set("is_certificate", values.is_certificate);
    formData.set("analytic_skil_title", values.analytic_skil_title);
    formData.set("is_certificate", values.is_certificate);
    formData.set("certificate_name", values.certificate_name);
    formData.set("course_duration", values.duration);
    formData.set("course_duration_time", values.duration_time);
    formData.set("certificate_title", values.certification_title);
    formData.set("certificate_overview", values.certificate_overview);
    formData.set("certificate_demo_image", values.certificate_demo_image);

    formData.set("meta_title", values.meta_title);
    formData.set("meta_keyword", values.meta_keyword);
    formData.set("meta_description", values.meta_description);
    formData.set("breadcrumb", values.breadcrumb);
    formData.set("og_title", values.og_title);
    formData.set("og_url", values.og_url);
    formData.set("og_image", values.og_image);
    formData.set("og_description", values.og_description);
    formData.set("related_course", related_courseArr);
    formData.set("analytic_skils", JSON.stringify(values.analytic_skils));
    formData.set("faqs", JSON.stringify(values.faqs));

    let obj = {
      name: values.name,
      slug: values.slug
        .trim()

        .replaceAll(" ", "-")
        .toLowerCase(),
    };

    const config = {
      headers: {
        content: "multipart/form-data",
        AUTHTOKEN: window.user?.data?.auth_token,
      },
    };

    if (values.id) {
      try {
        const response = await axios.post(
          process.env.REACT_APP_API_BASEURL + `e-learning/update-course`,
          formData,
          config
        );
        if (response.data?.status === "success") {
          toast.success("Record update successfully");
          setTimeout(() => {
            navigate("/e-learning-course");
          }, [1000]);
        } else {
          toast.error(response.data?.message);
        }
      } catch (err) {
        throw err;
      }
    } else {
      const response = await serve.uniqueslug(obj);
      if (response.status === "success") {
        axios
          .post(
            process.env.REACT_APP_API_BASEURL + "e-learning/create-course",
            formData,
            config
          )
          .then((res) => {
            if (res.data?.status === "success") {
              toast.success("Course created successfully");
              setTimeout(() => {
                navigate("/e-learning-course");
              }, [1000]);
            } else if (res.data?.status === "fail") {
              toast.error(res.data?.message);
            }
          })
          .catch((err) => {
            throw err;
          });
      } else {
        toast.error(response.data.name);
      }
    }
  };

  const getParentCategory = async () => {
    let obj = { parent_id: "-1" };
    try {
      let response = await serve.parentcategory(obj);
      if (response) {
        const arr = response.data.map((v) => {
          return { value: v.id, label: v.name };
        });
        setCategoryLists(arr);
      }
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    if (params.id) {
      getDataById();
    }
    getParentCategory();
  }, []);

  const getDataById = async () => {
    try {
      let response = await serve.edit(params.id);
      if (response) {
        const category = {};
         category["label"] = response.data?.category?.name;
         category["value"] = response.data?.category?.id;
        setValues({
          id: response.data.id,
          category_id: category,
          name: response.data.name,
          heading: response.data.heading,
          slug: response.data.slug,
          description_option1: response.data.description_option_1,
          description_option2: response.data.description_option_2,
          description_option3: response.data.description_option_3,
          price_type: response.data.price_type,
          inr_price: response.data.inr_price ? response.data.inr_price : "",
          is_inr_discount: response.data.is_inr_discount,
          inr_discount_price: response.data.inr_discount_price
            ? response.data.inr_discount_price
            : "",
          media_type: response.data.media_type,
          video_type: response.data.video_type,
          media: response.data.media,
          image_alt_tag: response.data.media_alt_tag
            ? response.data.media_alt_tag
            : "",
          analytic_skil_title: response.data.analytic_skil_title,
          analytic_skils: JSON.parse(response.data.analytic_skils),
          faqs: response.data.faqs,
          thumb_image: response.data.thumb_image,
          overview_title: response.data.overview_title,
          overview: response.data.overview,
          language: response.data.language,
          duration: response.data.course_duration,
          duration_time: response.data.course_duration_time,
          is_certificate: response.data.is_certificate,
          certificate_name: response.data.certificate_name,
          instructor: response.data.instructor,
          course_level: response.data.course_level,
          certification_title: response.data.certificate_title,
          certificate_demo_image: response.data.certificate_demo_image,
          certificate_overview: response.data.certificate_overview,
          related_course: response.data.selected_related_course,
          meta_title: response.data.meta_title,
          meta_keyword: response.data.meta_keyword,
          meta_description: response.data.meta_description,
          og_title: response.data.og_title ? response.data.og_title : "",
          og_url: response.data.og_url ? response.data.og_url : "",
          og_description: response.data.og_description
            ? response.data.og_description
            : "",
          og_image: response.data.og_image ? response.data.og_image : "",

          breadcrumb: response.data.breadcrumb ? response.data.breadcrumb : "",
        });

      } else {
        toast.error(response);
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <div className="page-body">
      <Breadcrumb heading=" E-Learning" />
      <div className="container-fluid support-ticket">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                {mainForm && <h5>{params.id?"Edit":"Add"} E-Learning</h5>}
              </div>
              <div className="card-body">
                {mainForm && (
                  <Formik
                    initialValues={values}
                    validationSchema={VoucherSchema}
                    onSubmit={onSubmit}
                    enableReinitialize={true}
                  >
                    {(props) => (
                      <ELearningCreateCourse
                        props={props}
                        allCategoryList={allCategoryList}
                        values={values}
                        categoryLists={categoryLists}
                        ogImage={ogImage}
                        setOgImage={setOgImage}
                      />
                    )}
                  </Formik>
                )}
              </div>
            </div>
          <ToastContainer autoClose={1000} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ELearningCourseForm;
