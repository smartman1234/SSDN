import React, { useState, useEffect, useContext } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { CartContext } from "../../Container/Context";
import MetaService from "../../Services/MetaServices/MetaService";
import HeadingName from "../HeadingName/HeadingName";
import LetUsHelp from "../Home/LetUsHelp/LetUsHelp";
export default function RecentPlacementAll() {
    const { bannery } = useContext(CartContext);
    const [banner, setBannerImage] = bannery;
    const metaService = new MetaService();
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [search, setSearch] = useState({
        start: 0,
        perPage: 12,
    });
    useEffect(() => {
        window.scroll(0, 0);
    }, []);
    useEffect(() => {
        ListApi();
    }, [search.perPage]);

    const apiCall = async (limit, offset) => {
        try {
            let response = await metaService.studentlist(limit, offset);
            if (response) {
                setData(response.data);
                setTotalCount(response.count);
                setTotalPages(response.count / 12);
            } else {
            }
        } catch (err) {
            throw err;
        }
    };

    const ListApi = async () => {
        await apiCall(search.perPage, search.start);
    };

    const loadMoreData = () => {
        setSearch({ ...search, perPage: search.perPage + 4 });
    };

    const showLesseHandler = () => {
        setSearch({ ...search, start: 0, perPage: 12 });
    };
    return (
        <>
            <HeadingName name="Placement" home="Home" heading="Placement" />

            <div className="eduvibe-about-three-mission edu-mission-vision-area edu-section-gap80 border-bottom-1 bg-color-white">
                <div className="container">
                    <div className="row">
                        {data?.length > 0 &&
                            data.map((v, i) => (
                                <div className="col-lg-3 mb--30" key={i}>
                                    <div className="edu-instructor-grid edu-instructor-1">
                                        <div className="edu-instructor">
                                            <div className="inner">
                                                <div className="thumbnail">
                                                    <a href="#">
                                                        <LazyLoadImage
                                                            loading="lazy"
                                                            src={v.profile}
                                                            alt="team images"
                                                            height="100%"
                                                            width="100%"
                                                        />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="edu-instructor-info">
                                            <h5 className="title">{v.name}</h5>
                                            <span className="desc">{v.designation}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
                {totalCount > data?.length ? (
                    <div className="row">
                        <div className="col-md-12 text-center mt--10">
                            <button className="edu-btn" onClick={loadMoreData}>Load More</button>
                        </div>
                    </div>
                ) : (
                    <div className="row">
                        <div className="col-md-12 text-center mt--10">
                            <button className="edu-btn" onClick={showLesseHandler}>
                                Show Less
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <LetUsHelp />
        </>
    );
}
