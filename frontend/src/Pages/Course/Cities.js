import React from 'react'
import { Link } from "react-router-dom";
import Utils from "../../Utils/Utils";
export default function Cities({ detailData }) {
  return (
    <div className="home-one-cat edu-section-gap">
      <div className="container">
        {detailData?.selected_cities?.length > 0 && (
          <>
            <h5 className="widget-title">Popular Cities</h5>
            <div className="tag-list">
              {detailData?.selected_cities?.map((v, i) => (
                <Link
                  to={`/${detailData?.category?.slug}/${detailData?.slug}-${v.name}-city`}
                  key={i}
                >
                  {Utils.titleCase(v.name)}
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
