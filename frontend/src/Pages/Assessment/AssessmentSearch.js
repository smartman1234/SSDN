import React from 'react'

export default function AssessmentSearch({search,searchAssessmentList}) {
  return (
    <div className="row align-items-center justify-content-center">
    <div className="col-lg-6">
      <div className="edu-search-box-wrapper text-start">
        <div className="edu-search-box">
          <form>
            <input
              type="text"
              placeholder="Search Assessment ..."
              value={search.searchTxt}
              onChange={(e) => searchAssessmentList(e)}
            />
            <button className="search-button">
              <i className="ri-search-line"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}
