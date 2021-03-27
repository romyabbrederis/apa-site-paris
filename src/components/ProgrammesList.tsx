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
  const [mobileDevice, setMobilDevice] = useState<boolean>();

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

  useEffect(() => {
    const windowSize = window.matchMedia("(max-width: 769px)");
    setMobilDevice(windowSize.matches);
    window.addEventListener("resize", function () {
      setMobilDevice(windowSize.matches);
    });
  }, []);

  const changeType = (value: string) => {
    setType(value);
    setSelect(undefined);
  };

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
                  {mobileDevice ? (
                    <div
                      className={"programme-title-container"}
                      onClick={() => setSelect(item.slug)}
                    >
                      <h4>
                        {item.month} {item.year}
                      </h4>
                      <h4>{item.title}</h4>
                    </div>
                  ) : (
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
                  )}

                  <img src="../../icons/down.png" className={"down-icon"} />

                  {select === item.slug ? (
                    <img
                      className={"close-icon"}
                      src="../../icons/close.png"
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
            overflow: scroll;
          }

          @media (max-width: 769px) {
            .programme-title-container {
              width: 90%;
              position: relative;
              height: 100%;
            }

            .close-icon {
              position: absolute;
              top: 10px;
              right: 10px;
              width: 20px;
              cursor: pointer;
            }

            .month-date {
              text-align: left;
              margin-right: 5px;
            }

            .programme-box {
              cursor: pointer;
              background: black;
              color: white;
              border: 1px solid black;
              height: 100%;
              padding: 0 10px;
            }

            .programme-box-selected {
              background: white;
              border: 1px solid black;
              color: black;
              height: 100%;
              padding: 0 10px;
            }

            .programmes-list {
              flex: 0 0 auto;
              position: relative;
            }

            .down-icon {
              position: absolute;
              right: 10px;
              top: 10px;
              width: 30px;
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

            .month-date {
              text-align: right;
            }

            .programme-box {
              cursor: pointer;
              padding: 0 10px;
              background: black;
              color: white;
              height: 100%;
            }

            .programme-box-selected {
              padding: 0 10px;
              background: white;
              color: black;
              height: 100%;
            }

            .programmes-list {
              flex: 0 0 auto;
              background: white;
              margin-right: 20px;
              border: 1px solid black;
              position: relative;
            }

            .down-icon {
              position: absolute;
              right: 45%;
              bottom: 1px;
              width: 30px;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
