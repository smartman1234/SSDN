import React,{useState} from 'react'

export default function FirstRowCourse() {
    const [active, setActive] = useState(0);
    const activehandler = (id) => {
        setActive(id);
      };
  return (
    <div className="idname d-none d-md-block">
    <div className="container eduvibe-animated-shape">
      <div className="row">
        <div className="col-lg-12">
          <ul className="ssdn-click">
            <li onClick={() => activehandler(0)}>
              <a href="#Overview" className={active == 0 ? "active" : ""}>
                Overview
              </a>
            </li>
            <li onClick={() => activehandler(1)}>
              <a href="#Upcomimg" className={active == 1 ? "active" : ""}>
                Upcoming Batches
              </a>
            </li>
            <li onClick={() => activehandler(2)}>
              <a href="#Curriculum" className={active == 2 ? "active" : ""}>
                Curriculum
              </a>
            </li>
            <li onClick={() => activehandler(3)}>
              <a href="#Training" className={active == 3 ? "active" : ""}>
                Training Options
              </a>
            </li>
            <li onClick={() => activehandler(4)}>
              <a href="#Project" className={active == 4 ? "active" : ""}>
                Project
              </a>
            </li>
            <li onClick={() => activehandler(5)}>
              <a
                href="#Certification"
                className={active == 5 ? "active" : ""}
              >
                Certification
              </a>
            </li>
            <li onClick={() => activehandler(6)}>
              <a href="#Reviews" className={active == 6 ? "active" : ""}>
                Reviews
              </a>
            </li>
            <li onClick={() => activehandler(7)}>
              <a href="#Faqs" className={active == 7 ? "active" : ""}>
                Faqs
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  )
}
