import React, { useContext, useEffect, useState } from "react";
import MetaService from "../../Services/MetaServices/MetaService";
import SEO from "../SEO/SEO";
import WhatWeOffer from "./WhatWeOffer";
import TimeLane from "./TimeLane";
import LetUsHelp from "../Home/LetUsHelp/LetUsHelp";
import HeadingName from "../HeadingName/HeadingName";
import { CartContext } from "../../Container/Context";

const WhoWeAre = React.lazy(() => import("./WhoWeAre"));

const VideoPara = React.lazy(() => import("./VideoPara"));

const Gallerypera = React.lazy(() => import("./Gallerypera"));

const AssociatedCompanies = React.lazy(() => import("./AssociatedCompanies"));

const ClientsPera = React.lazy(() =>
    import("./ClientsPera")
);

const RewardAndRecognisation = React.lazy(() =>
    import("./RewardAndRecognisation")
);

export default function About() {
    const { bannery } = useContext(CartContext);
    const [banner, setBannerImage] = bannery;
    useEffect(() => {
        window.scroll(0, 0);
        getmetaData("about");
    }, []);
    const metaService = new MetaService();
    const [meta, setMeta] = useState({
        title: "",
        keywords: "",
        description: "",
    });

    const getmetaData = async () => {
        try {
            let response = await metaService.getMetadetail("about");
            if (response.status === "success") {
                setMeta({
                    title: response.data.meta_title,
                    Keywords: response.data.meta_keywords,
                    description: response.data.meta_description,
                });
            }
        } catch (err) {
            throw err;
        }
    };

    return (
        <>
            <SEO
                meta_title={meta?.title}
                meta_description={meta?.description}
                meta_keyword={meta?.Keywords}
            />
            <HeadingName name="About Us" home="Home" heading="About Us" />
            <React.Suspense fallback="">
                <WhoWeAre />
            </React.Suspense>

            <WhatWeOffer />
            <React.Suspense fallback="">
                <Gallerypera />
            </React.Suspense>

            <TimeLane />
            <React.Suspense fallback="">
                <VideoPara />
            </React.Suspense>

            <React.Suspense fallback="">
                <RewardAndRecognisation />
            </React.Suspense>

            <React.Suspense fallback="">
                <ClientsPera />
            </React.Suspense>


            <React.Suspense fallback="">
                <AssociatedCompanies />
            </React.Suspense>

            <LetUsHelp />
        </>
    );
}
