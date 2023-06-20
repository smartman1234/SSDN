import React, { useState, useEffect } from "react";
import MetaService from "../../Services/MetaServices/MetaService";

const SearchPop = React.lazy(() => import("../SearchPop/SearchPop"));

const Menu = React.lazy(() => import("./Menu"));

const Mobile = React.lazy(() => import("./Mobile"));

export default function Header() {
  const metaService = new MetaService();
  const [data, setData] = useState({});
  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

  const isSticky = (e) => {
    const header = document.querySelector(".header-sticky");
    const scrollTop = window.scrollY;
    scrollTop >= 250
      ? header?.classList.add("sticky")
      : header?.classList.remove("sticky");
  };

  const [isActive, setActive] = useState("false");
  const ToggleClass = () => {
    setActive(!isActive);
  };
  useEffect(() => {
    getmetaData("offer");
  }, []);
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

  return (
    <>
      <header className="edu-header header-sticky disable-transparent header-default">
        <div className="container-fluid">
        <React.Suspense fallback="">
        <Menu isActive={isActive} setActive={setActive} />
        </React.Suspense>
         
        </div>
      </header>
      <React.Suspense fallback="">
      <Mobile isActive={isActive} setActive={setActive} />
        </React.Suspense>
     
      {SearchPop && (
        <React.Suspense fallback="">
          <SearchPop />
        </React.Suspense>
      )}
    </>
  );
}
