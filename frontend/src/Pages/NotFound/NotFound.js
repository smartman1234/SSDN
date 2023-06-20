import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from "../SEO/SEO";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import MetaService from "../../Services/MetaServices/MetaService";

export default function NotFound() {
  const metaService = new MetaService();
  const [data, setData] = useState({});
  const [meta, setMeta] = useState({
    title: "",
    keywords: "",
    description: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    getmetaData("404");
    getPageBlock("404");
  }, []);

  const getmetaData = async () => {
    try {
      let response = await metaService.service("404");
      if (response.status === "success") {
        setData(response.data);
      }
    } catch (err) {
      throw err;
    }
  };
  const getPageBlock = async () => {
    try {
      let response = await metaService.getMetadetail("404");
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
      {" "}
      <SEO
        meta_title={meta?.title}
        meta_description={meta?.description}
        meta_keyword={meta?.Keywords}
      />{" "}
      <div className="edu-error-area eduvibe-404-page edu-error-style">
        <div className="container eduvibe-animated-shape">
          <div className="row">
            <div className="col-lg-12">
              <div className="content text-center">
                <div className="thumbnail mb--10">
                   <LazyLoadImage loading="lazy" src={data?.page_description?.image_url+data?.page_description?.image} alt="404 Images"
                                height="100%"
                                width="100%" />
                </div>
                <h4 className="title">{data?.block_title}</h4>
                <p className="text-center ssdn-editor-font1" dangerouslySetInnerHTML={{__html:data?.block_description}} />
                
                <div className="backto-home-btn">
                  <Link className="edu-btn" to="/">
                    Back To Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
