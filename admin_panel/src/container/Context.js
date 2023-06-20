import React, { createContext, useState, useEffect } from "react";

export const Context = createContext();
const { Provider } = Context;

export const ContextProvider = (props) => {
  const [loginData, setLoginData] = useState({});
  const [rolePermission, setRolePermission] = useState({});
  const [pagesData, setPagesData] = useState([]);
  const [firstForm, setFirstForm] = useState(true);
  const [secondForm, setSecondForm] = useState(false);
  const [thirdForm, SetThirdForm] = useState(false);
  const [questionForm, setQuestionForm] = useState(false);
  const [voucher, setVoucher] = useState([]);

  return (
    <Provider
      value={{
        first: [firstForm, setFirstForm],
        second: [secondForm, setSecondForm],
        third: [thirdForm, SetThirdForm],
        last: [questionForm, setQuestionForm],
        voucherValues: [voucher, setVoucher],
        login: [loginData, setLoginData],
        permissions: [rolePermission, setRolePermission],
        pages: [pagesData, setPagesData],
      }}
    >
      {props.children}
    </Provider>
  );
};
