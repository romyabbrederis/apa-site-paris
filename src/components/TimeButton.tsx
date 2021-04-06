import React from "react";

type Props = {
  changeType: any;
  type: string;
};

const TimeButton = ({ changeType, type }: Props): any => {
  const button = ["en cours", "prochainement", "passée"];

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
        @media (max-width: 769px) {
          .button-container {
            display: flex;
            flex-direction: column;
            font-weight: 500;
          }

          .button {
            padding: 8px 20px;
            margin: 5px;
            vertical-align: center;
            background: white;
            border: 1px solid black;
            cursor: pointer;
          }

          .button-selected {
            padding: 8px 20px;
            margin: 5px;
            background: #ffd506;
            border: 1px solid black;
            cursor: pointer;
          }
        }

        @media (min-width: 769px) {
          .button-container {
            display: flex;
            font-weight: 500;
          }

          .button {
            padding: 8px 20px;
            margin: 10px 10px 10px 0;
            vertical-align: center;
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
        }
      `}</style>
    </div>
  );
};

export default TimeButton;
