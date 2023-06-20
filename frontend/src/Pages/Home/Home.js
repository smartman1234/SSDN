import React, { useState, useEffect } from "react";
import LearningOpportunies from "./LearningOpportunities/LearningOpportunies";

import SsdnWork from "./SSDNWork/SsdnWork";
import LetUsHelp from "./LetUsHelp/LetUsHelp";
import LastSection from "./LastSection/LastSection";
import MetaService from "../../Services/MetaServices/MetaService";
import SEO from "../SEO/SEO";

const WhyChooseUs = React.lazy(() =>
  import("./WhyChooseUs/WhyChooseUs")
);

const SelfAnaysis = React.lazy(() =>
  import("./SelfAnalysis/SelfAnaysis")
);

const WeOffer = React.lazy(() =>
  import("./WeOffer/WeOffer")
);

const TrendingCertificateExam = React.lazy(() =>
  import("./TrendingCertificateExam/TrendingCertificateExam")
);

const Testimonial = React.lazy(() => import("./Testimonial/Testimonial"));

const OurKeySupports = React.lazy(() =>
  import("./OurKeySupports/OurKeySupports")
);

const JoinUs = React.lazy(() => import("./JoinUs/JoinUs"));

const HomeEnquiry = React.lazy(() => import("./HomeEnquiry"));

const AboutUs = React.lazy(() => import("./AboutUs/AboutUs"));

const BannerSection = React.lazy(() => import("./BannerSection/BannerSection"));

const LatestNews = React.lazy(() => import("./LatestNews/LatestNews"));

export default function Home() {
  const [data, setData] = useState({});
  const metaService = new MetaService();
  const [meta, setMeta] = useState({
    title: "",
    keywords: "",
    description: "",
  });

  useEffect(() => {
    window.scroll(0, 0);
    getmetaData("home");
    getPageBlock("home");
    return () => {
      localStorage.removeItem("prevurl");
    };
  }, []);

  const getPageBlock = async () => {
    try {
      let response = await metaService.service("home");
      if (response.status === "success") {
        setData(response.data);
      }
    } catch (err) {
      throw err;
    }
  };
  const getmetaData = async () => {
    try {
      let response = await metaService.getMetadetail("home");
      if (response.status === "success") {
        setMeta({
          title: response.data.meta_title,
          Keywords: response.data.meta_keywords,
          description: response.data.meta_description,
        });
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <SEO
        meta_title={meta?.title}
        meta_description={meta?.description}
        meta_keyword={meta?.Keywords}
      />

<React.Suspense fallback="">
<BannerSection data={data} />
      </React.Suspense>
    
      <LearningOpportunies data={data} />
      <React.Suspense fallback="">
        <AboutUs data={data} />
      </React.Suspense>

      <React.Suspense fallback="">
      <WeOffer />
      </React.Suspense>

    
      <React.Suspense fallback="">
        <OurKeySupports />
      </React.Suspense>
      <React.Suspense fallback="">
        <JoinUs data={data} />
      </React.Suspense>
      <React.Suspense fallback="">
      <SelfAnaysis data={data} />
      </React.Suspense>
     
      <React.Suspense fallback="">
        <TrendingCertificateExam />
      </React.Suspense>

      <React.Suspense fallback="">
      <WhyChooseUs data={data} />
      </React.Suspense>

     
      <div className="meter">
        <span style={{ width: "100%" }}>
          <span className="progress"></span>
        </span>
      </div>
      <React.Suspense fallback="">
        <HomeEnquiry />
      </React.Suspense>

      <React.Suspense fallback="">
        <Testimonial />
      </React.Suspense>

      <SsdnWork />
      <LetUsHelp />
      <React.Suspense fallback="">
      <LatestNews />
      </React.Suspense>
    
      <LastSection data={data} />
    </>
  );
}
