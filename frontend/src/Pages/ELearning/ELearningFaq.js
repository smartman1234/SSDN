import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import ELearningService from "../../Services/ELearningService/ELearningService";

export default function ELearningFaq() {
  const [faqs, setFaqs] = useState([]);  const [active, setActive] = useState({});
  const elearning = new ELearningService();

  const activeHandler = (id) => {
    setActive((prev) => ({ [id]: !prev[id] }));
  };
  useEffect(() => {
    ELearningCourseFaqsApi();
  }, []);
  const ELearningCourseFaqsApi = async () => {
    try {
      let response = await elearning.elearningfaqs();
      if (response) {
        setFaqs(response.data);
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <div className="edu-contact-us-area eduvibe-contact-us edu-section-gap">
      <div className="container eduvibe-animated-shape">
        <div className="col-lg-12">
          <div className="card mb--0">
            <div className="card-body">
              <div className="section-title text-start">
                <h3 className="title mb--30">FAQ's</h3>
              </div>
              <div
                className="edu-accordion-02 height-match-section3 mt--0"
                id="accordionExample441"
              >
                {faqs &&
                  faqs?.map((v, i) => (
                    <div
                      className={
                        active[i]
                          ? "edu-accordion-item bg-active"
                          : "edu-accordion-item"
                      }
                      key={i}
                    >
                      <div className="edu-accordion-header" id="headingOne123">
                        <button
                          className="edu-accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne123"
                          aria-expanded="true"
                          aria-controls="collapseOne123"
                          onClick={() => activeHandler(i)}
                        >
                          {v.title}
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
                            <p>{v.description}</p>
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
  );
}
