import React, { useEffect, useState, useContext } from "react";
import Map from "./Map";
import SEO from "../SEO/SEO";
import HeadingName from "../HeadingName/HeadingName";
import LetUsHelp from "../Home/LetUsHelp/LetUsHelp";
import MetaService from "../../Services/MetaServices/MetaService";
import { CartContext } from "../../Container/Context";

const DepartmentWise = React.lazy(() => import("./DepartmentWise"));

const GetInTouch = React.lazy(() => import("./GetInTouch"));

const Location = React.lazy(() => import("./Location"));

export default function ContactUs() {
  const { bannery } = useContext(CartContext);
  const [banner, setBannerImage] = bannery;
  const metaService = new MetaService();
  const [meta, setMeta] = useState({
    title: "",
    keywords: "",
    description: "",
    breadcrumb: "",
  });
  useEffect(() => {
    window.scroll(0, 0);
    getmetaData("contact-us");
  }, []);
  const getmetaData = async () => {
    try {
      let response = await metaService.getMetadetail("contact-us");
      if (response.status === "success") {
        setMeta({
          title: response.data.meta_title,
          Keywords: response.data.meta_keywords,
          description: response.data.meta_description,
          breadcrumb: response.data.breadcrumb,
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
        breacrumb={meta?.breadcrumb}
      />
       <HeadingName
                name="Contact Us"
                home="Home"
                heading="Contact Us"
            />
      <React.Suspense fallback="">
        <DepartmentWise />
      </React.Suspense>

      <div className="meter">
        <span style={{ width: "100%" }}>
          <span className="progress"></span>
        </span>
      </div>
      <React.Suspense fallback="">
      <GetInTouch />
      </React.Suspense>
     
      <React.Suspense fallback="">
      <Location />
      </React.Suspense>
    
      <Map />
      <LetUsHelp />
    </>
  );
}
