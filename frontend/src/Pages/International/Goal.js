import React from 'react'

export default function Goal({ detailData }) {
  return (
    <div className="col-lg-12 mt--30">
      <div className="section-title text-center">
        <h3 className="title pt-5">Our Goal</h3>
        <p
          className="mt--20"
          dangerouslySetInnerHTML={{ __html: detailData.our_goal }}
        />
      </div>
    </div>
  )
}
