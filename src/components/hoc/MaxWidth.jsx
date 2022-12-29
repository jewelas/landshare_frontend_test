import React from "react";

const MaxWidth = ({ maxWidth, children }) => {
  const style = {
    maxWidth: maxWidth + "px",
    width: "100%",
  };
  return <div style={style}>{children}</div>;
};

export default MaxWidth;
