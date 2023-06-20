import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AssessmentService from "../../Services/AssessmentService";

const AssessmentLogPop = React.lazy(() => import("./AssessmentLogPop"));

export default function MyAssessmentLog({ data }) {
  const assessentServe = new AssessmentService();
  const [logPop, setLogPop] = useState(false);
  const [logList, setLogList] = useState([]);

  const AssessmentLogPopApi = async (data) => {
    try {
      let response = await assessentServe.assessmentlog(data);
      if (response.status === "success") {
        setLogPop(true);
        setLogList(response.data);
      } else {
        setLogPop(false);
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <>
      <Link
        to="#"
        className="edu-btn"
        onClick={() => AssessmentLogPopApi(data)}
      >
        Get Assessment Log
      </Link>
      {logPop && (
        <React.Suspense fallback="">
          <AssessmentLogPop
            logPop={logPop}
            setLogPop={setLogPop}
            logList={logList}
          />
        </React.Suspense>
      )}
    </>
  );
}
