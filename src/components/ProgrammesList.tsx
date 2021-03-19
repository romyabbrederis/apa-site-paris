import React, { useState, useEffect } from "react";
import { ProgrammeContent } from "../lib/programmes";
import ProgrammeSelected from "./ProgrammeSelected";
import TimeButton from "./TimeButton";
import { renderProgrammes } from "../utils/renderProgrammes";

type Props = {
  programmes: ProgrammeContent[];
};

export default function ProgrammesList({ programmes }: Props): any {
  console.log("programmes", programmes);
  const [type, setType] = useState("now");
  const [data, setData] = useState([]);
  const [select, setSelect] = useState("");

  console.log("data", data, select);

  useEffect(() => {
    const newData = renderProgrammes(programmes, type);
    setData(newData);
  }, [type]);

  useEffect(() => {
    const newData = renderProgrammes(programmes, type);
    setData(newData);
  }, []);

  useEffect(() => {
    console.log(select);
  }, [select]);

  const changeType = (value: string) => setType(value);

  console.log("data", data);

  return (
    <div className={"layout-container"} style={{ backgroundColor: "#E5E5E5" }}>
      <div className={"inner-container"}>
        <TimeButton changeType={changeType} type={type} />
        <div className={"programmes"}>
          {data && data.length ? (
            <div className={"programmes-list"}>
              {data.map((item, i) => (
                <div
                  key={i}
                  className={
                    select === item.slug
                      ? "programme-box-selected"
                      : "programme-box"
                  }
                >
                  <div
                    className={"programme-title-container"}
                    onClick={() => setSelect(item.slug)}
                  >
                    <div className={"month-date"}>
                      <h3>{item.month}</h3>
                      <h3>{item.year}</h3>
                    </div>
                    <h3>{item.title}</h3>
                  </div>
                  {select === item.slug ? (
                    <img
                      className={"close-icon"}
                      src="./icons/close.png"
                      onClick={() => setSelect("hi")}
                    />
                  ) : null}
                  {select === item.slug ? (
                    <ProgrammeSelected programme={item} />
                  ) : null}
                </div>
              ))}
            </div>
          ) : (
            <h1>no programm</h1>
          )}
        </div>
        <style jsx>{`
          .container {
            background: #e5e5e5;
          }

          .programme-box {
            cursor: pointer;
            padding: 0 10px;
            background: black;
            color: white;
          }

          .programme-box-selected {
            padding: 0 10px;
            background: white;
            color: black;
          }

          @media (max-width: 769px) {
            .programme-title-container {
              display: flex;
              justify-content: space-between;
              width: 90%;
              position: relative;
            }

            .close-icon {
              position: absolute;
              top: 10px;
              right: 10px;
              width: 20px;
              cursor: pointer;
            }
          }

          @media (min-width: 769px) {
            .programme-title-container {
              display: flex;
              justify-content: space-between;
              max-width: 60%;
              position: relative;
            }

            .close-icon {
              position: absolute;
              top: 10px;
              right: 10px;
              width: 30px;
              cursor: pointer;
            }
          }

          .month-date {
            text-align: right;
          }

          .programmes {
            display: flex;
            flex-direction: column;
            flex: 1 1 auto;
          }

          @media (max-width: 769px) {
            .programmes-list {
              flex: 0 0 auto;
              background: white;
              border: 1px solid black;
              position: relative;
            }
          }

          @media (min-width: 769px) {
            .programmes-list {
              flex: 0 0 auto;
              background: white;
              margin-right: 20px;
              border: 1px solid black;
              position: relative;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
