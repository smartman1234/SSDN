import React, { useState, useEffect } from "react";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";

export default function SelectAllAssessment({ props, assessment }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    setSelectedOptions([{ label: "All", value: "*" }, ...assessment]);
    setTimeout(function () {
      let optList = document.getElementsByClassName("css-1qprcsu-option");
      for (let i = 0; i < optList.length; i++) {
        let item = optList[i];
        let index = i;
        addTitle(item, index);
      }
    }, 100);
  }, []);

  function addTitle(item, index) {
    let val = item.innerText;
    item.title = val;
  }
  function getDropdownButtonLabel({ placeholderButtonLabel, value }) {
    if (value && value.some((o) => o.value === "*")) {
      return `${placeholderButtonLabel}: All`;
    } else {
      return `${placeholderButtonLabel}: ${value.length} selected`;
    }
  }

  function onChange(value, event) {
    if (event.action === "select-option" && event.option.value === "*") {
      props.setFieldValue("assessment", this.options);
      this.setState(this.options);
    } else if (
      event.action === "deselect-option" &&
      event.option.value === "*"
    ) {
      props.setFieldValue("assessment", []);
      this.setState([]);
    } else if (event.action === "deselect-option") {
      props.setFieldValue(
        "voucher",
        value.filter((o) => o.value !== "*")
      );
      this.setState(value.filter((o) => o.value !== "*"));
    } else if (value.length === this.options.length - 1) {
      props.setFieldValue("assessment", this.options);
      this.setState(this.options);
    } else {
      props.setFieldValue("assessment", value);
      this.setState(value);
    }
  }
  return (
    <ReactMultiSelectCheckboxes
      options={[{ label: "All", value: "*" }, ...assessment]}
      placeholderButtonLabel="Select "
      getDropdownButtonLabel={getDropdownButtonLabel}
      value={props.values.assessment}
      onChange={onChange}
      setState={setSelectedOptions}
    />
  );
}
