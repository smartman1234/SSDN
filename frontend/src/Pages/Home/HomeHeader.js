import React, { useState, useContext, useEffect } from "react";
import Mobile from "../Header/Mobile";
import Menu from "../Header/Menu";
import MetaService from "../../Services/MetaServices/MetaService";

const SearchPop = React.lazy(() => import("../SearchPop/SearchPop"));

const Offerpopup = React.lazy(() => import("./Offerpopup"));

export default function HomeHeader() {
    const [open, setOpen] = useState(false);
    const metaService = new MetaService();
    const [data, setData] = useState({});
    useEffect(() => {
        getmetaData("offer");
        window.addEventListener("scroll", isSticky);
        return () => {
            window.removeEventListener("scroll", isSticky);
        };
    }, []);

    const isSticky = (e) => {
        const header = document.querySelector(".header-sticky");
        const scrollTop = window.scrollY;
        scrollTop >= 250
            ? header?.classList?.add("sticky")
            : header?.classList?.remove("sticky");
    };

    const getmetaData = async () => {
        try {
            let response = await metaService.service("offer");
            if (response.status === "success") {
                setData(response.data);
            }
        } catch (err) {
            throw err;
        }
    };

    const [isActive, setActive] = useState("false");

    return (
        <>
            {data?.page_description?.is_active == 1 && (
                <div
                    className="header-note-area position-relative d-none d-md-block"
                    onClick={() => setOpen(true)}
                >
                    <div className="container-fluid">
                            {" "}
                            <p
                                className="text-center"
                                dangerouslySetInnerHTML={{ __html: data.block_description }}
                            ></p>
                    </div>{" "}
                </div>
            )}

            <header className="edu-header header-sticky header-transparent header-default">
                <div className="container-fluid">
                    <Menu isActive={isActive} setActive={setActive} />
                </div>
            </header>
            <Mobile isActive={isActive} setActive={setActive} />
            {SearchPop &&  <React.Suspense fallback="">
            <SearchPop />
                </React.Suspense>}
            {open ? (
                <React.Suspense fallback="">
                    <Offerpopup open={open} setOpen={setOpen} endDate={data} />
                </React.Suspense>
            ) : (
                ""
            )}
        </>
    );
}
