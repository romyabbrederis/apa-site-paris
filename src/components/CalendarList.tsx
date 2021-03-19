import React, { useState, useEffect } from "react";
import { CalendarContent } from "../lib/programmes";
import { COLOR_YELLOW } from "../../public/styles/general";
import TimeButton from "./TimeButton";
import { renderProgrammes } from "../utils/renderProgrammes";

type Props = {
  events: CalendarContent[];
};

export default function CalendarsList({ events }: Props): any {
  const [type, setType] = useState("now");
  const [data, setData] = useState([]);

  const changeType = (value: string) => setType(value);

  useEffect(() => {
    const newData = renderProgrammes(events, type);
    setData(newData);
  }, [type]);

  useEffect(() => {
    const newData = renderProgrammes(events, type);
    setData(newData);
  }, []);

  console.log("events", events);
  return events.length ? (
    <div className={"layout-container"}>
      <div className={"inner-container"}>
        <TimeButton changeType={changeType} type={type} />
        <div className={"events"}>
          {data.map((item, i) => (
            <div className={"events-list"}>
              <h3 key={i}>{item.month}</h3>
              <h3 key={i}>{item.year}</h3>
              <h3 key={i} className={"title"}>
                {item.title}
              </h3>
            </div>
          ))}
        </div>
        <style jsx>{`
        .container {
          display: flex;
          margin: 0 auto;
          max-width: 1200px;
          width: 100%;
          padding: 0 1.5rem;
        }
        
        .events {
          display: flex;
          justify-content: center;
        }

        .events-list {
          border: 1px solid black;
          width: 200px;
          height: 200px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          line-height: 0.8em;
        }
        .title {
          color: ${COLOR_YELLOW}
        }
        }
      `}</style>
      </div>
    </div>
  ) : (
    <h1> no events </h1>
  );
}
