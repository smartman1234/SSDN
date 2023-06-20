import React, { useEffect, useState,  } from "react";
import Register from "./Register";
import SEO from "../SEO/SEO";
import MetaService from "../../Services/MetaServices/MetaService";

const LoginPage = React.lazy(() =>
  import("./LoginPage")
);

export default function Login(props) {
  const metaService = new MetaService();
  const [register, setRegister] = useState(false);
  const [meta, setMeta] = useState({
 
  });

  const RegisterHandle = () => {
    setRegister(!register);
  };
  useEffect(() => {
    getmetaData("login");
  }, []);
  const getmetaData = async () => {
    try {
      let response = await metaService.getMetadetail("login");
      if (response.status === "success") {
        setMeta(response.data);
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <>
   
    
          <SEO
            meta_title={meta?.meta_title}
            meta_description={meta?.meta_description}
            meta_keyword={meta?.meta_keywords}
            breacrumb={meta?.breadcrumb}
          />
          <div className="login-register-page-wrapper edu-section-gap bg-color-white">
                {register ? (
                  <Register register={register} setRegister={setRegister} />
                ) : (
                  <React.Suspense fallback="">
                  <LoginPage RegisterHandle={RegisterHandle} props={props} />
                </React.Suspense>
                 
                )}
          </div>
     
    </>
  );
}
