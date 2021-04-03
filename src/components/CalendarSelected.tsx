import React, { useEffect, useState } from "react";
import { CalendarContent } from "../lib/programmes";

type Props = {
  event: CalendarContent;
  setSelect: any;
};

const CalendarSelected = ({ event, setSelect }: Props): any => {
  const { title, month, year, start, type, galleries } = event;
  const [galMap, setGalMap] = useState({ map: "", name: "" });

  useEffect(() => {
    if (event && galleries.length) {
      extractLink(galleries[0].map, galleries[0].slug);
    }
  }, [galleries]);

  const extractLink = (map, name) => {
    console.log("map", map, name);
    if (map) {
      const firstSplit = map.split('src="');
      const secondSplit = firstSplit[1].split('" width');
      setGalMap({
        map: secondSplit[0],
        name: name,
      });
    } else {
      setGalMap({
        map: "",
        name: name,
      });
    }
  };

  return event ? (
    <div className={"calendar-container"}>
      <img
        className={"close-icon"}
        src="./icons/close.png"
        onClick={() => setSelect(undefined)}
      />
      <div className={"modal-container"}>
        <h3 className={"text"}>{month}</h3>
      </div>

      <div className={"modal-container"}>
        <h3>{title}</h3>
      </div>

      <div className={"modal-container"}>
        {galleries
          ? galleries.map((item, i) => (
              <div
                className={
                  galMap.name === item.slug ? "frame-selected" : "frame"
                }
                onClick={() => extractLink(item.maps, item.slug)}
              >
                <h4 className={"gallery-name"}>{item.name}</h4>
                <p>{item.address}</p>
              </div>
            ))
          : null}
      </div>

      <div className={"modal-container"}>
        <iframe
          src={galMap.map}
          width="100%"
          height="450"
          style={{ border: "none", filter: "greyscale(100%)" }}
        ></iframe>
      </div>

      <style jsx>{`
        @media (max-width: 769px) {
          .calendar-container {
            background: white;
            border: 1px solid black;
            height: fit-content;
            margin: 0 0 10px 0;
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
            text-align: left;
          }

          .frame {
            border: 1px solid black;
            padding: 0 10px 10px 10px;
          }

          .frame-selected {
            border: 1px solid black;
            background: black;
            color: white;
            padding: 0 10px 10px 10px;
            cursor: pointer;
          }
        }

        @media (min-width: 769px) {
          .calendar-container {
            background: white;
            border: 1px solid black;
            min-height: 30vh;
            margin: 0 0 10px 0;
            display: grid;
            grid-template-columns: 50% 50%;
            grid-gap: 5px;
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
            margin: 10px;
          }

          .text {
            text-align: right;
          }

          .gallery-name {
            cursor: pointer;
          }

          .gallery-name :hover {
            color: #ffd506;
          }

          .frame {
            border: 1px solid black;
            padding: 0 10px 10px 10px;
            cursor: pointer;
          }

          .frame-selected {
            border: 1px solid black;
            background: black;
            color: white;
            padding: 0 10px 10px 10px;
            cursor: pointer;
          }
        }
      `}</style>
    </div>
  ) : null;
};

export default CalendarSelected;
