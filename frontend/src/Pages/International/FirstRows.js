import React,{useState} from 'react'

export default function FirstRows() {
    const [active, setActive] = useState("");
  return (
    <div className="idname d-none d-md-block">
    <div className="container eduvibe-animated-shape">
      <div className="row">
        <div className="col-lg-12">
          <ul className="ssdn-click">
            <li onClick={() => setActive(0)}>
              <a href="#visa" className={active == 0 && "active"}>
                Visa Help Desk
              </a>
            </li>
            <li onClick={() => setActive(1)}>
              <a
                href="#internationalstudent"
                className={active == 1 && "active"}
              >
                International Students
              </a>
            </li>
            <li onClick={() => setActive(2)}>
              <a href="#gettrained" className={active == 2 && "active"}>
                Get Trained In India
              </a>
            </li>
            <li onClick={() => setActive(3)}>
              <a href="#accommodation" className={active == 3 && "active"}>
                Accommodation
              </a>
            </li>
            <li onClick={() => setActive(4)}>
              <a href="#directflight" className={active == 4 && "active"}>
                Direct Flight
              </a>
            </li>
            <li onClick={() => setActive(5)}>
              <a href="#meal" className={active == 5 && "active"}>
                Meal
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  )
}
