import React, { useState, useEffect } from "react";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";

export default function SelectAllCourse({ props, course }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    setSelectedOptions([{ label: "All", value: "*" }, ...course]);
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
      props.setFieldValue("course", this.options);
      this.setState(this.options);
    } else if (
      event.action === "deselect-option" &&
      event.option.value === "*"
    ) {
      props.setFieldValue("course", []);
      this.setState([]);
    } else if (event.action === "deselect-option") {
      props.setFieldValue(
        "course",
        value.filter((o) => o.value !== "*")
      );
      this.setState(value.filter((o) => o.value !== "*"));
    } else if (value.length === this.options.length - 1) {
      props.setFieldValue("course", this.options);
      this.setState(this.options);
    } else {
      props.setFieldValue("course", value);
      this.setState(value);
    }
  }
  return (
    <ReactMultiSelectCheckboxes
      options={[{ label: "All", value: "*" }, ...course]}
      placeholderButtonLabel="Select "
      getDropdownButtonLabel={getDropdownButtonLabel}
      value={props.values.course}
      onChange={onChange}
      setState={setSelectedOptions}
      className="w-100"
    />
  );
}
