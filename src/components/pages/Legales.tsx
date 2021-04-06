import React from "react";

const Legales = ({ content }) => {
  console.log("content", content);
  return (
    <div className={"layout-container"}>
      <div className={"inner-container"}>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Legales;
