import React, { useState, useEffect } from "react";
import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import { Editor } from "@tinymce/tinymce-react";
import * as Yup from "yup";
import { Formik } from "formik";
import VideoContent from "./VideoContent";
import Section from "./Section";
import { useParams } from "react-router";
import ElearningVideoService from "../../../Services/ELearningService/ElearningVideoService";

export default function ELearningCreateVideo() {
  const [sectionHeadingForm, setSectionHeadingForm] = useState(false);
  const [sectionList, setSectionList] = useState([]);
  const param = useParams();
  const [sectionId, setSectionId] = useState("");
  const [active, setActive] = useState(false);
  const [values, setValues] = useState({
    headline: "",
    description: "",
  });

  const serve = new ElearningVideoService();

  const SectionlistApi = async () => {
    try {
      let response = await serve.sectionlist(param.id);
      if (response) {
        setSectionList(response.data);
        for (const i in response.data) {
        }
      }
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    SectionlistApi();
  }, []);

  const getSectionDetailApi = async (id) => {
    setSectionHeadingForm(true);
    try {
      let response = await serve.sectiondetail(id);
      if (response) {
        setValues({
          id: response.data.id,
          headline: response.data.title,
          description: response.data.what_will_able_to_do,
        });
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <div className="page-body">
      <Breadcrumb heading="Add Video Course" />
      <div className="container-fluid support-ticket">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Add Video Course </h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card">
                      <div className="card-body">
                        <>
                          <VideoContent
                            active={active}
                            setActive={setActive}
                            values={values}
                            param={param}
                            sectionList={sectionList}
                            sectionHeadingForm={sectionHeadingForm}
                            setSectionHeadingForm={setSectionHeadingForm}
                            SectionlistApi={SectionlistApi}
                          />

                          <div className="row mt-5">
                            <div className="col-md-12">
                              {sectionList.length > 0 && (
                                <Section
                                  param={param}
                                  sectionId={sectionId}
                                  active={active}
                                  setActive={setActive}
                                  sectionList={sectionList}
                                  setSectionList={setSectionList}
                                  SectionlistApi={SectionlistApi}
                                  sectionHeadingForm={sectionHeadingForm}
                                  setSectionHeadingForm={setSectionHeadingForm}
                                  getSectionDetailApi={getSectionDetailApi}
                                />
                              )}
                            </div>
                          </div>
                        </>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
