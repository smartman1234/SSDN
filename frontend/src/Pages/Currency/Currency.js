import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CurrencyService from "../../Services/CurrencyService/CurrencyService";

export default function Currency() {
  const navigate = useNavigate();
  const [currencyList, setCurrencyList] = useState([]);
  const currency = new CurrencyService();
  useEffect(() => {
    localStorage.getItem("currency");
    getCurrencyApi();
  }, []);

  const getCurrencyApi = async () => {
    try {
      let response = await currency.currency();
      if (response) {
        setCurrencyList(response.data);
        if (localStorage.getItem("currency") === null) {
          localStorage.setItem("currency", "INR");
        }
      }
    } catch (err) {
      throw err;
    }
  };

  const getCurrencyDetail = async (id) => {
    try {
      let response = await currency.detail(id);
      if (response) {
        const currency = response.data.currency;
        localStorage.setItem("currency", currency || "INR");
        localStorage.setItem("symbol", response.data?.currency_symbol || "₹");
        window.location.reload();
      }
    } catch (err) {
      throw err;
    }
  };

  return (
      <select
        className="form-select"
        onChange={(e) => {
          if (window.location.pathname === "/ordersuccess") {
            navigate("/");
          } else {
            getCurrencyDetail(e.target.value);
          }
        }}
      >
        {currencyList &&
          currencyList.map((v, i) => (
            <option
              key={i}
              value={v.currency}
              selected={
                v.currency === localStorage.getItem("currency") ? true : false
              }
            >
              {v.currency}
            </option>
          ))}
      </select>
  );
}
