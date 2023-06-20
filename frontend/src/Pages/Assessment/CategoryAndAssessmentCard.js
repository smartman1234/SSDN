import React from "react";

const AssessmentCard = React.lazy(() => import("./AssessmentCard"));
const AssessmentCategory = React.lazy(() => import("./AssessmentCategory"));

export default function CategoryAndAssessmentCard({
  gettingChildCategoryId,
  categoryName,
  getCategoryListApiData,
  search,
  setSearch,
  childId,
  name,
}) {
  return (
    <div className="row mt--20">
      <div className="col-lg-3">
        <aside className="edu-course-sidebar">
        <React.Suspense fallback="">
        <AssessmentCategory
            gettingChildCategoryId={gettingChildCategoryId}
            categoryName={categoryName}
            getCategoryListApiData={getCategoryListApiData}
            search={search}
            setSearch={setSearch}
          />
      </React.Suspense>
          
        </aside>
      </div>
      <React.Suspense fallback="">
        <AssessmentCard childId={childId} name={name} search={search} />
      </React.Suspense>
    </div>
  );
}
