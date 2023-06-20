import React, { useState, useEffect } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
export default function ClientsPera() {
    const url = process.env.REACT_APP_API_BASEURL;
    const [Clients, setClients] = useState([]);
    const [count, setCount] = useState(0);
    const [search, setSearch] = useState({
        start: 0,
        perPage: 8,
    });
    const GetClients = async () => {
        var requestOptions = {
            method: "GET",
        };

        fetch(
            `${url}web/about/our-client/${search.perPage}/${search.start}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                if (result.status === "success") {
                    setClients(result.data);
                    setCount(result.count);
                }
            })
            .catch((error) => console.log("error", error));
    };

    useEffect(() => {
        GetClients();
    }, [search]);
    const loadmoreHandler = () => {
        setSearch({ ...search, perPage: search.perPage + 8 });

    };
    const showLesseHandler = () => {
        setSearch({ ...search, start: 0, perPage: 8 });
    };
    return (
        <div className="edu-gallery-grid-area masonary-wrapper-activation home-one-cat edu-section-gap bg-image">
            <div className="wrapper">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <div className="section-title text-center">
                                <h3 className="title">
                                    Our <span className="down-mark-line">Clients</span>
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="row mt--20">
                        {Clients?.length > 0 &&
                            Clients.map((value, i) => (
                                <div className="col-md-3 mb-4" key={i}>
                                    <div className="edu-gallery-grid-item grid-metro-item">
                                        <div className="edu-gallery-grid">
                                            <LazyLoadImage
                                                className="w-100"
                                                src={value.logo}
                                                alt={value.logo_alt_tag}
                                                height="100%"
                                                width="100%"
                                            />
                                            <div className="hover-action">
                                                <h6 className="title">{value.title}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        {count > Clients?.length ? (
                            <div className="col-md-12 text-center mt--10">
                                <button className="edu-btn" onClick={loadmoreHandler}>
                                    Load More
                                </button>
                            </div>
                        ) : (
                            <div className="col-md-12 text-center mt--10">
                                <button className="edu-btn" onClick={showLesseHandler}>
                                    Show Less
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
