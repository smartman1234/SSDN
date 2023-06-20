import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../Container/Context";
import { Formik } from "formik";
import * as Yup from "yup";
import UserService from "../../Services/UserService";



export default function SearchPop() {
  const navigate = useNavigate();
  const [items, setItem] = useState([]);

  const [values, setValues] = useState({
    searched: "",
  });
  const { search } = useContext(CartContext);
  const [SearchModal, setSearchModal] = search;
  const serve = new UserService();

  useEffect(() => {
    localStorage.getItem("searchtype");
    if (SearchModal) {
      SearchList();
    }
  }, []);

  const SearchList = async () => {
    try {
      let response = await serve.searchList();
      if (response) {
        setItem(response.data);
      }
    } catch (err) {
      throw err;
    }
  };

  const SearchData = async (id, type) => {
    try {
      let response = await serve.searchdata(id, type);
      if (response) {
        localStorage.setItem("searchtype", "all");
        localStorage.setItem("searchedData", JSON.stringify(response.data));
        localStorage.setItem("searchdataCount", response.count);
        setItem(response.data);

        navigate(`/search/${id}`);
      } else {
        console.log("error");
      }
    } catch (err) {
      throw err;
    }
  };

  const onSubmit = async (values) => {
    SearchData(values.searched, "all");
    setValues({
      searched: "",
    });
    setSearchModal(false);
  };
  const onKeyDow = (e) => {
    if (e.keyCode === 13) {
      SearchData(e.target.value, "all");
      setValues({
        searched: "",
      });
      setSearchModal(false);
    }
  };
  const handleNameClick = (value, props) => {
    props.setFieldValue("searched", value.name);
    if (props.values.searched === "") {
      SearchList();
    }
    SearchList([]);
  };
  const ValidateSchema = Yup.object().shape({
    searched: Yup.string().required("Required"),
  });
  return (
    <>
      <div
        className={SearchModal ? "edu-search-popup open" : "edu-search-popup"}
      >
        <div className="close-button" onClick={() => setSearchModal(false)}>
          <button className="close-trigger">
            <i className="ri-close-line"></i>
          </button>
        </div>
        <div className="inner">
          <Formik
            initialValues={values}
            onSubmit={onSubmit}
            enableReinitialize={true}
            validationSchema={ValidateSchema}
          >
            {(props) => (
              <form className="search-form" onSubmit={props.handleSubmit}>
                <input
                  type="text"
                  name="searched"
                  onChange={(e) => {
                    props.setFieldValue("searched", e.target.value);
                  }}
                  onKeyDown={(e) => onKeyDow(e)}
                  className="eduvibe-search-popup-field"
                  placeholder="Search Here..."
                /> {props.touched.searched && props.errors.searched ? (
                  <div className="formik-errors bg-error">
                    {props.errors.searched}
                  </div>
                ) : null}
                <div
                  style={
                    props.values.searched
                      ? {
                          overflow: "auto",
                          height: "204px",
                          position: "absolute",
                          backgroundColor: "var(--color-white)",
                          borderBottom: "1px solid #ced4da",
                          boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, .35)",
                        }
                      : {}
                  }
                >
                  {props.values.searched?.length > 0 &&
                    items.map((v, i) => (
                      <div
                        className="pt-2 search-person"
                        key={i}
                        onClick={() => handleNameClick(v, props)}
                      >
                        {v.name}
                      </div>
                    ))}
                </div>
                <button className="submit-button" type="submit">
                  <i className="icon-search-line"></i>
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
