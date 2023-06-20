import React, { useState, useEffect,useContext } from "react";
import SEO from "../SEO/SEO";
import { CartContext } from "../../Container/Context";
import HeadingName from "../HeadingName/HeadingName";
import MetaService from "../../Services/MetaServices/MetaService";

export default function TermsConditionsPolicy() {
  const metaService = new MetaService();
  const { search, bannery } = useContext(CartContext);
  const [banner, setBannerImage] = bannery;
  const [data, setData] = useState({});
  const [meta, setMeta] = useState({
    title: "",
    keywords: "",
    description: "",
    breadcrumb: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    getmetaData("term-conditions");
    getPageBlock("term-conditions");
  }, []);

  const getmetaData = async () => {
    try {
      let response = await metaService.service("term-conditions");
      if (response.status === "success") {
        setData(response.data);
      }
    } catch (err) {
      throw err;
    }
  };
  const getPageBlock = async () => {
    try {
      let response = await metaService.getMetadetail("term-conditions");
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
      <HeadingName name="Terms & Conditions" home="Home" heading="Terms & Conditions" />
      <div className="edu-contact-us-area eduvibe-contact-us edu-section-gap bg-color-white">
        <div className="container eduvibe-animated-shape">
          <div className="row mt--20">
            <div className="col-lg-12">
              <p
                className="description ssdn-editor-font1"
                dangerouslySetInnerHTML={{ __html: data.block_description }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
