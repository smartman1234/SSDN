import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import MetaService from "../../Services/MetaServices/MetaService";

export default function Recruiters() {
    const metaService = new MetaService();
    const [data, setData] = useState([]);
    const [search, setSearch] = useState({
        start: 0,
        perPage: 12,
    });

    useEffect(() => {
        ListApi();
    }, []);

    const apiCall = async (limit, offset) => {
        try {
            let response = await metaService.recruitlist(limit, offset);
            if (response) {
                setData(response.data);
            } else {
            }
        } catch (err) {
            throw err;
        }
    };

    const ListApi = async () => {
        await apiCall(search.perPage, search.start);
    };

    const loadMoreHandler = () => {
        setSearch({ ...search, perPage: search.perPage + 1 });
    };
    return (
        <div className="eduvibe-about-three-mission edu-mission-vision-area edu-section-gap bg-color-white">
            <div className="wrapper">
                <div className="container eduvibe-animated-shape">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <div className="section-title text-center">
                                <span className="pre-title">
                                    Top Companies where SSDN Technologies placed students
                                </span>
                                <h3 className="title">Our Recruiters</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row mt--30">
                        {data?.length > 0 &&
                            data.map((v, i) => (
                                <div
                                    className="col-lg-2 col-md-4 col-sm-12 text-center mb--10"
                                    key={i}
                                >
                                    <LazyLoadImage loading="lazy" src={v.image} alt="IBM"
                                        height="100%"
                                        width="100%" />
                                </div>
                            ))}
                            
                        <div className="col-md-12 text-center mt--10">
                            <Link className="edu-btn" to="/our-recruiters" onClick={loadMoreHandler}>
                                Load More
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
