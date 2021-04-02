import React from "react";

type Props = {
  changeType: any;
  type: string;
};

const TimeButton = ({ changeType, type }: Props): any => {
  const button = ["now", "upcoming", "past"];

  return (
    <div className={"button-container"}>
      {button.map((item, i) => (
        <div
          className={type === item ? "button-selected" : "button"}
          key={i}
          onClick={() => changeType(item)}
        >
          {item}
        </div>
      ))}
      <style jsx>{`
        .button-container {
          display: flex;
          font-weight: 500;
        }

        .button {
          padding: 8px 20px;
          margin: 10px 10px 10px 0;
          height: 20px;
          background: white;
          border: 1px solid black;
          cursor: pointer;
        }

        .button-selected {
          padding: 8px 20px;
          margin: 10px 10px 10px 0;
          background: #ffd506;
          border: 1px solid black;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default TimeButton;
