import React from "react";
import { CalendarContent } from "../lib/programmes";

type Props = {
  event: CalendarContent;
  setSelect: any;
};

const CalendarSelected = ({ event, setSelect }: Props): any => {
  const { title, month, year, start, type, galleries } = event;

  return (
    <div className={"calendar-container"}>
      <img
        className={"close-icon"}
        src="./icons/close.png"
        onClick={() => setSelect(undefined)}
      />
      <div className={"modal-container"}>
        <h3 className={"text"}>{month}</h3>
        {galleries
          ? galleries.map((item, i) => (
              <div className={"frame"}>
                <h4>{item.name}</h4>
                <p>{item.address}</p>
              </div>
            ))
          : null}
      </div>

      <div className={"modal-container"}>
        <h3>{title}</h3>
      </div>

      <style jsx>{`
        .calendar-container {
          background: white;
          border: 1px solid black;
          min-height: 30vh;
          margin: 0 0 10px 0;
          display: flex;
          justify-items: center;
          position: relative;
        }

        .close-icon {
          width: 30px;
          position: absolute;
          top: 10px;
          right: 10px;
          cursor: pointer;
        }

        .modal-container {
          flex-basis: 50%;
          margin: 10px;
        }

        .text {
          text-align: right;
        }

        .frame {
          border: 1px solid black;
          padding: 0 10px 10px 10px;
        }
      `}</style>
    </div>
  );
};

export default CalendarSelected;
