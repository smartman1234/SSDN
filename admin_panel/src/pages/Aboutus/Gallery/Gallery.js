import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../../container/Context";
import Breadcrumb from "../../BreadCrumb/Breadcrumb";

const GalleryList = React.lazy(() => import("./GalleryList"));

function Gallery() {
  const [gallery, setGallery] = useState(0);
  const { login, permissions } = useContext(Context);
  const [loginData, setLoginData] = login;
  const [pagesData, setPagesData] = useState([]);
  const [rolePermission, setRolePermission] = permissions;

  const gettingGallerylength = (num) => {
    setGallery(num);
  };
  useEffect(() => {
    setLoginData(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    const pages = loginData?.data?.role_permission;

    if (pages) {
      const items = [];
      for (const item of pages) {
        if (!item.parent_id) {
          items.push({
            ...item,
            child: pages.filter((v) => v.parent_id === item.id),
          });
        }
        if (item.slug === window.location.pathname.replace("/", "")) {
          setRolePermission(item.role_permission);
        }
      }
      setPagesData(items);
    }
  }, [loginData]);

  const name = (
    <Link to="/gallery/0" className="btn btn-primary">
      <i className="fa-solid fa-plus me-2"></i>Add Gallery
    </Link>
  );
  return (
    <div className="page-body">
      <Breadcrumb heading="Gallery" add={rolePermission.is_add == 1 && name} />
      <div className="container-fluid support-ticket">
        <div className="row">
          <div className="col-sm-12">
            <React.Suspense fallback="Loading...">
              <GalleryList gettingLength={gettingGallerylength} />
            </React.Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
