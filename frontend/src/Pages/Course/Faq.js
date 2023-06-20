import React from "react";
import { useState } from "react";

export default function Faq({ detailData }) {
  const data = detailData?.city_name;
  const [active, setActive] = useState({});
  const activeHandler = (id) => {
    setActive((prev) => ({ [id]: !prev[id] }));
  };
  return (
    <>{detailData?.faqs?.length > 0 && <div
      className="edu-contact-us-area eduvibe-contact-us edu-section-gap"
      id="Faqs"
    >
      <div className="container eduvibe-animated-shape">
        <div className="col-lg-12">
          <div className="card mb--0">
            <div className="card-body">
              <div className="section-title text-start">
                <h3 className="title mb--30">FAQ's</h3>
              </div>
              <div className="faqs-wrapper height-match-section3 ">
                <div className="edu-accordion-02" id="accordionExample5">
                  {detailData?.faqs?.length > 0 &&
                    detailData?.faqs.map((v, i) => (
                      <div
                        className={
                          active[i]
                            ? "edu-accordion-item bg-active"
                            : "edu-accordion-item"
                        }
                        key={i}
                      >
                        <div className="edu-accordion-header">
                          <button
                            className="edu-accordion-button"
                            type="button"
                            onClick={() => activeHandler(i)}
                          >
                            {i + 1}.{" "}
                            {data
                              ? v.title.replaceAll("{{in VARCITY}}", data)
                              : v.title.replaceAll("{{in VARCITY}}", "")}
                          </button>
                        </div>
                        {active[i] && (
                          <div
                            className={
                              active[i]
                                ? "accordion-collapse collapse show"
                                : "accordion-collapse collapse"
                            }
                          >
                            <div className="edu-accordion-body">
                              <p dangerouslySetInnerHTML={{__html:data
                                  ? v.description.replaceAll(
                                      "{{in VARCITY}}",
                                      data
                                    )
                                  : v.description.replaceAll(
                                      "{{in VARCITY}}",
                                      ""
                                    )}}/>
                                
                             
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>}</>
   
  );
}
