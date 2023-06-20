import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import CourseService from "../../Services/CourseService/CourseService";
export default function ExploreCourseCategory() {
    const courseServe = new CourseService();
    const [category, setCategory] = useState([]);
    const [categorySearch, setCategorySearch] = useState({
        start: 0,
        perPage: 10, 
        searchTxt: "",
        searchField: "",
    });

    const courseCategoryList = async () => {
        let activity = {
            limit: categorySearch?.perPage,
            offset: categorySearch?.start,
            query: categorySearch?.searchTxt,
            category_id: 0,
        };
        try {
            let response = await courseServe.categorylist(activity);
            if (response) {
                setCategory(response.data);
            }
        } catch (err) {
            throw err;
        }
    };

    useEffect(() => {
        courseCategoryList();
    }, []);
    return (
        <ul className="submenu data-menu">
            {category?.map((v, i) => (
                <li className="service-card service-card-5" key={i}>
                    <Link to={`/${v.slug}`} className="p-0 border-0">
                        <h6 className="title" key={i}>
                            {v.name}
                        </h6>
                        <p className="description">
                            {v.course_count} Course{v.course_count > 1 ? "s" : ""}
                        </p>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
