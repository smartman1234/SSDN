import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import LetUsHelp from "../Home/LetUsHelp/LetUsHelp";
import ChooseTraining from "./ChooseTraining";
import Faq from "./Faq";
import CourseService from "../../Services/CourseService/CourseService";
import SEO from "../SEO/SEO";
import CitrixReview from "./CitrixReview";
import { CartContext } from "../../Container/Context";
import Cities from "./Cities";

const CourseBlog = React.lazy(() => import("./CourseBlog"));

const CourseBreadcrumb = React.lazy(() => import("./CourseBreadcrumb"));

const AboutCertification = React.lazy(() => import("./AboutCertification"));

const WhySsdn = React.lazy(() => import("./WhySsdn"));

const RelatedCourse = React.lazy(() => import("./RelatedCourse"));

const BuyTogetherSection = React.lazy(() => import("./BuyTogetherSection"));

const CitrixTraining = React.lazy(() => import("./CitrixTraining"));

const CourseEnquiryPopUp = React.lazy(() => import("./CourseEnquiryPopUp"));

const CourseCurriculum = React.lazy(() => import("./CourseCurriculum"));

const TrendingVoucherAndAssessment = React.lazy(() =>
  import("./TrendingVoucherAndAssessment")
);

export default function CourseDetails() {
  const { bannery } = useContext(CartContext);
  const [banner, setBannerImage] = bannery;
  const [CourseEnquiry, setCourseEnquiry] = useState(false);
  const courseServe = new CourseService();
  let params = useParams();
  params = params.id.replaceAll("-{{in-varcity}}", "");
  const [currency, setCurrency] = useState("");
  const [detailData, setDetailData] = useState({});
  const [trainingMode, setTrainingMode] = useState({});
  const [upcomimgBatches, setUpcomingBatches] = useState([]);
  const [title, seTitle] = useState([]);

  useEffect(() => {
    window.scroll(0, 0);
    detailApi();
  }, [params]);

  const detailApi = async () => {
    try {
      let response = await courseServe.detailCourse(params);
      if (response) {
        setDetailData(response.data);
        localStorage.setItem("coursedetaildata", JSON.stringify(response.data));
        setCurrency(response.data?.currency_symbol);
        setTrainingMode(response.data?.training_mode);
        setUpcomingBatches(response.data?.upcoming_batches);
        const blogs = response.data?.blogs;
        const arr = [];
        for (const key in blogs) {
          arr.push(blogs[key].title);
          seTitle(arr);
        }
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <SEO
        meta_title={
          detailData?.city_name
            ? detailData?.meta_title.replaceAll(
                "{{in VARCITY}}",
                detailData?.city_name
              )
            : detailData?.meta_title?.replaceAll("{{in VARCITY}}", "")
        }
        meta_description={
          detailData?.city_name
            ? detailData?.meta_description?.replaceAll(
                "{{in VARCITY}}",
                detailData?.city_name
              )
            : detailData?.meta_description?.replaceAll("{{in VARCITY}}", "")
        }
        meta_keyword={
          detailData?.city_name
            ? detailData?.meta_keyword?.replaceAll(
                "{{in VARCITY}}",
                detailData?.city_name
              )
            : detailData?.meta_keyword?.replaceAll("{{in VARCITY}}", "")
        }
        breacrumb={
          detailData?.city_name
            ? detailData?.breadcrumb?.replaceAll(
                "{{in VARCITY}}",
                detailData?.city_name
              )
            : detailData?.breadcrumb?.replaceAll("{{in VARCITY}}", "")
        }
      />
         <React.Suspense fallback="">
         <CourseBreadcrumb detailData={detailData} banner={banner} />
      </React.Suspense>
    
      <React.Suspense fallback="">
        <BuyTogetherSection
          detailData={detailData}
          setCourseEnquiry={setCourseEnquiry}
          CourseEnquiry={CourseEnquiry}
          params={params}
          currency={currency}
          trainingMode={trainingMode}
        />
      </React.Suspense>

      <React.Suspense fallback="">
        <CitrixTraining
          detailData={detailData}
          setCourseEnquiry={setCourseEnquiry}
          CourseEnquiry={CourseEnquiry}
          upcomimgBatches={upcomimgBatches}
        />
      </React.Suspense>

      {CourseEnquiry && (
        <React.Suspense fallback="">
          <CourseEnquiryPopUp
            setCourseEnquiry={setCourseEnquiry}
            CourseEnquiry={CourseEnquiry}
            detailData={detailData}
          />
        </React.Suspense>
      )}
      <React.Suspense fallback="">
        <CourseCurriculum detailData={detailData} params={params.id} />
      </React.Suspense>

      <ChooseTraining
        trainingMode={trainingMode}
        setCourseEnquiry={setCourseEnquiry}
        CourseEnquiry={CourseEnquiry}
      />
 <React.Suspense fallback="">
 <AboutCertification detailData={detailData} />
      </React.Suspense>
    
      <React.Suspense fallback="">
        <CitrixReview detailData={params} id={detailData?.id} />
      </React.Suspense>
      <React.Suspense fallback="">
        <WhySsdn detailData={detailData} />
      </React.Suspense>

      <Faq detailData={detailData} />
      <React.Suspense fallback="">
        <RelatedCourse
          detailData={detailData}
          detailApi={detailApi}
          params={params}
        />
      </React.Suspense>

      <React.Suspense fallback="">
        <TrendingVoucherAndAssessment detailData={detailData} />
      </React.Suspense>

      <Cities detailData={detailData} />

      <React.Suspense fallback="">
      <CourseBlog detailData={detailData?.blogs} title={title} />
      </React.Suspense>
     
      <LetUsHelp />
    </>
  );
}
