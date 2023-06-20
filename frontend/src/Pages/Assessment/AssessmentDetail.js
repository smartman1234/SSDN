import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AssessmentService from "../../Services/AssessmentService";
import HeadingName from "../HeadingName/HeadingName";
import AssessmentDescription from "./AssessmentDescription";
import SEO from "../SEO/SEO";
import LetUsHelp from "../Home/LetUsHelp/LetUsHelp";

const AssessmentDetailCard = React.lazy(() => import("./AssessmentDetailCard"));

const AssessmentDetailSideCard = React.lazy(() =>
  import("./AssessmentDetailSideCard")
);

const RelatedVouchers = React.lazy(() => import("./RelatedVouchers"));

const Comment = React.lazy(() => import("../Comment/Comment"));

export default function AssessmentDetail() {
  const [assessmentdata, setAssessmentData] = useState({});
  const [highlight, setHighlight] = useState([]);
  const [slug, setSlug] = useState("");
  const assessmentServe = new AssessmentService();

  const params = useParams();
  useEffect(() => {
    AssessmentDetailApi();
  }, [slug]);

  const AssessmentDetailApi = async () => {
    try {
      let response = await assessmentServe.assessmentDetail(params.id);
      if (response) {
        setHighlight(JSON.parse(response.data?.highlights));
        setAssessmentData(response.data);
        sessionStorage.setItem(
          "assessmentheading",
          response.data?.category?.heading
        );
        sessionStorage.setItem("assessmentslug", response.data?.category?.slug);
      }
    } catch (err) {
      throw err;
    }
  };

  const gettingSlugFromRelatedAssessmentVoucher = (id) => {
    setSlug(id);
  };

  return (
    <>
      <SEO
        meta_title={assessmentdata?.meta_title}
        meta_description={assessmentdata?.meta_description}
        meta_keyword={assessmentdata?.meta_keyword}
        breacrumb={assessmentdata?.breadcrumb}
      />

      <HeadingName
        name="assessment"
        slug={params?.id?.replaceAll("-", " ")}
        home="Home"
        heading={assessmentdata?.name}
        category={assessmentdata?.category?.name}
       
      />

      <div className="edu-course-details-area edu-section-gap bg-color-white">
        <div className="container">
          <div className="row">
            <React.Suspense fallback="">
              <AssessmentDetailSideCard assessmentdata={assessmentdata} />
            </React.Suspense>

            <div className="course-details-content col-xl-8 col-lg-7">
              <React.Suspense fallback="">
                <AssessmentDetailCard
                  assessmentdata={assessmentdata}
                  highlight={highlight}
                />
              </React.Suspense>

              <AssessmentDescription assessmentdata={assessmentdata} />
              <React.Suspense fallback="">
              <Comment assessmentdata={assessmentdata} />
              </React.Suspense>
             
            </div>
          </div>
        </div>
      </div>
      {assessmentdata.related_vouchers?.length > 0 && (
        <div className="edu-course-details-area edu-section-gap home-one-cat">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="edu-course-wrapper">
                  <div className="section-title text-center mb--20">
                    <span className="pre-title">Related Voucher</span>
                    <h3 className="title">Voucher You May Like</h3>
                  </div>

                  <React.Suspense fallback="">
                    <RelatedVouchers
                      voucherDetail={assessmentdata.related_vouchers}
                      type="voucher"
                      gettingSlugFromRelatedAssessmentVoucher={
                        gettingSlugFromRelatedAssessmentVoucher
                      }
                    />
                  </React.Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <LetUsHelp />
    </>
  );
}
