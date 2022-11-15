import React from "react";

const Checkbox = (props) => {
  return (
    <input
      id={props.id}
      name={props.name}
      type={props.type}
      value={props.value}
      onChange={props.handleClick}
      checked={props.isChecked}
    />
  );
};

export default Checkbox;
