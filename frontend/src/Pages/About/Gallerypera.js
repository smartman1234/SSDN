import React, { useState, useEffect } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';

const GalleryPopup = React.lazy(() => import("./GalleryPopup"));
export default function Gallerypera() {
    const [active, setActive] = useState({});
    const [id, setID] = useState({});
    const [data, setdata] = useState("");
    const [Gallery, setGallery] = useState([]);
    const [search, setSearch] = useState({
        start: 0,
        perPage: 4,
    });
    const [count, setCount] = useState(0);
    const url = process.env.REACT_APP_API_BASEURL;
    const GetGallery = async () => {
        var requestOptions = {
            method: "GET",
        };

        fetch(
            `${url}web/about/gallery/${search.perPage}/${search.start}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                if (result.status === "success") {
                    setGallery(result.data);
                    setCount(result.count);
                }
            })
            .catch((error) => console.log("error", error));
    };
    useEffect(() => {
        GetGallery();
    }, [search]);
    const loadmoreHandler = () => {
        setSearch({ ...search, perPage: search.perPage + 4 });
    };
    const showLesseHandler = () => {
        setSearch({ ...search, start: 0, perPage: 4 });
    };
    return (
        <div className="eduvibe-about-three-mission edu-mission-vision-area edu-section-gap border-bottom-1 bg-color-white">
            <div className="container eduvibe-animated-shape">
                <div className="row">
                    {Gallery.length > 0 &&
                        Gallery.map((value, i) => (
                            <div
                                className="col-md-3 mb-5"
                                key={i}
                                onClick={() => {
                                    setActive({ [i]: true });
                                    setdata(value);
                                    setID(i);
                                }}
                            >
                                <LazyLoadImage
                                    src={value.image}
                                    alt={value.image_alt_tag}
                                    height="100%"
                                    width="100%"
                                />
                            </div>
                        ))}
                </div>
                {active[id] ? (
                    <React.Suspense fallback="">
                        <GalleryPopup
                            i={id}
                            active={active}
                            setActive={setActive}
                            data={Gallery}
                            setdata={setdata}
                            id={id}
                            setID={setID}
                        />
                    </React.Suspense>

                ) : (
                    ""
                )}
                {count > Gallery?.length ? (
                    <div className="row">
                        <div className="col-md-12 text-center mt--20">
                            <button className="edu-btn" onClick={loadmoreHandler}>
                                Load More
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="row">
                        <div className="col-md-12 text-center mt--20">
                            <button className="edu-btn" onClick={showLesseHandler}>
                                Show Less
                            </button>
                        </div>
                    </div>
                )}

                <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
                    <div className="animated-image shape-image-1">
                        <LazyLoadImage
                            src="/assets\images\shapes\shape-04-01.png"
                            alt="Shape Thumb"
                            height="116px"
                            width="87px"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
