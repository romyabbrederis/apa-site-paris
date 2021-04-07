import React, { useState, useEffect } from "react";
import { CalendarContent } from "../lib/programmes";
import { COLOR_YELLOW } from "../../public/styles/general";
import TimeButton from "./TimeButton";
import { renderProgrammes } from "../utils/renderProgrammes";
import CalendarSelected from "./CalendarSelected";
import Link from "next/link";
import { getLocale } from "../utils/localeChecker";
import Image from "next/image";

type Props = {
  events: any;
};

export default function CalendarsList({ events }: Props): any {
  const [type, setType] = useState("en cours");
  const [data, setData] = useState([]);

  const changeType = (value: string) => {
    setType(value);
  };

  useEffect(() => {
    const newData = renderProgrammes(events, "en cours");
    if (newData.length) {
      setType("en cours");
    } else {
      setType("prochainement");
    }
  }, []);

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
    <div className={"layout-container"} style={{ backgroundColor: "#E5E5E5" }}>
      <div className={"inner-container"}>
        <TimeButton changeType={changeType} type={type} />
        <div className={"events"}>
          {data.map((item, i) => (
            <Link key={i + item.slug} href={"/calendrier/" + item.slug}>
              <div className={"events-list"}>
                <p>{item.category}</p>
                <h3 key={i}>
                  {item.month} {item.year}
                </h3>
                <h3 key={i} className={"title"}>
                  {item.title}
                </h3>
                <img src="/icons/add.png" alt="icon" className={"down-icon"} />
              </div>
            </Link>
          ))}
        </div>
        <style jsx>{`
        .container {
          display: flex;
          margin: 0 auto;
          max-width: 1200px;
          width: 100%;
          padding: 0 1.5rem;
          min-height: 100vh;
          overflow: scroll;
        }

        @media (max-width: 769px) {
          .events {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-bottom: 50px;
          }

          .events-list {
            border: 1px solid black;
            background: white;
            cursor: pointer;
            width: 200px;
            height: 200px;
            text-align: left;
            line-height: 0.8em;
            position: relative;
            padding: 5px;
            margin: 20px 0;
          }

          .down-icon {
            width: 30px;
            position: absolute;
            bottom: 5px;
            right: 5px;
          }
        }
       

        @media (min-width: 769px) {
          .events {
            display: flex;
            justify-content: flex-start;
            margin-bottom: 50px;
          }

          .events-list {
            border: 1px solid black;
            background: white;
            cursor: pointer;
            width: 200px;
            height: 200px;
            text-align: left;
            line-height: 0.8em;
            position: relative;
            padding: 5px;
            margin:  50px 20px 10px 0;
          }

          .down-icon {
            width: 30px;
            position: absolute;
            bottom: 5px;
            right: 5px;
          }
        }

        .events-list p{
          font-style: italic;
          margin: 0;
        }

        .title {
          color: ${COLOR_YELLOW};
        }
        .button {
          background: ${COLOR_YELLOW};
          color: black;
          padding: 0 10px;
          position: relative;
        }

        
        }
      `}</style>
      </div>
    </div>
  ) : (
    <h1> no events </h1>
  );
}
