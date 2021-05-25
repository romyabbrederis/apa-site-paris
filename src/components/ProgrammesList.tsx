import React, { useState, useEffect } from "react";
import { ProgrammeContent } from "../lib/programmes";
import ProgrammeSelected from "./ProgrammeSelected";
import TimeButton from "./TimeButton";
import { renderProgrammes } from "../utils/renderProgrammes";
import { useRouter } from "next/router";
import Link from "next/link";
import { getLocale } from "../utils/localeChecker";
import Image from "next/image";

type Props = {
  programmes: ProgrammeContent[];
};

export default function ProgrammesList({ programmes }: Props): any {
  const [type, setType] = useState("en cours");
  const [data, setData] = useState([]);
  const [mobileDevice, setMobilDevice] = useState<boolean>();

  useEffect(() => {
    const newData = renderProgrammes(programmes, type);
    setData(newData);
  }, [type]);

  useEffect(() => {
    const newData = renderProgrammes(programmes, "en cours");
    if (newData.length) {
      setType("en cours");
    } else {
      setType("prochainement");
    }
  }, []);

  useEffect(() => {
    const newData = renderProgrammes(programmes, type);
    setData(newData);
  }, []);

  useEffect(() => {
    const windowSize = window.matchMedia("(max-width: 769px)");
    setMobilDevice(windowSize.matches);
    window.addEventListener("resize", function () {
      setMobilDevice(windowSize.matches);
    });
  }, []);

  const changeType = (value: string) => {
    setType(value);
  };

  return (
    <div className={"layout-container"} style={{ backgroundColor: "#E5E5E5" }}>
      <div className={"inner-container"}>
        <TimeButton changeType={changeType} type={type} />
        <div className={"programmes"}>
          {data && data.length ? (
            <div className={"programmes-list"}>
              {data.map((item, i) => (
                <div key={item.slug} className={"programme-box"}>
                  {mobileDevice ? (
                    <Link href={"/calendrier/" + item.slug}>
                      <div className={"programme-title-container"}>
                        <p className={"category"}>{item.category}</p>
                        <h4>
                          {item.month} {item.year}
                        </h4>
                        <h4>{item.title}</h4>

                        <p>{item.intro}</p>
                        <img
                          className={"down-icon"}
                          alt="icon"
                          src="/icons/down.png"
                        />
                      </div>
                    </Link>
                  ) : (
                    <Link href={"/calendrier/" + item.slug}>
                      <div className={"programme-title-container"}>
                        <div className={"month-date"}>
                          <h3 className={"date-space"}>
                            {item.month} {item.year}
                            <p className={"category"}>{item.category}</p>
                          </h3>
                          <div>
                            <h3>{item.title}</h3>
                          </div>
                        </div>
                        <p>{item.intro}</p>
                        <img src="/icons/down.png" className={"down-icon"} />
                      </div>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <style jsx>{`
          .category {
            font-style: italic;
            margin: 0;
            font-size: 14px;
          }
          .container {
            background: #e5e5e5;
            overflow: scroll;
          }

          @media (max-width: 769px) {
            .programme-title-container {
              position: relative;
              height: 100%;
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
              padding: 10px 10px;
              margin: 10px 0;
            }

            .programme-box-selected {
              background: white;
              border: 1px solid black;
              color: black;
              height: 100%;
              padding: 0 10px;
              margin: 10px 0;
            }

            .programmes-list {
              flex: 0 0 auto;
              position: relative;
            }

            .down-icon {
              position: absolute;
              right: 0;
              top: 0;
              width: 30px;
            }
          }

          @media (min-width: 769px) {
            .programme-title-container {
              position: relative;
            }

            .month-date {
              text-align: left;
              margin-right: 5px;
              display: flex;
            }

            .date-space {
              margin-right: 10%;
            }

            .programme-box {
              cursor: pointer;
              background: black;
              color: white;
              border: 1px solid black;
              height: 100%;
              padding: 10px 10px;
              margin: 10px 0;
            }

            .programme-box:hover {
              color: #ffd506;
              transition-duration: 1s;
            }

            .programme-box-selected {
              background: white;
              border: 1px solid black;
              color: black;
              height: 100%;
              padding: 0 10px;
              margin: 10px 0;
            }

            .programmes-list {
              flex: 0 0 auto;
              position: relative;
            }

            .down-icon {
              position: absolute;
              right: 10px;
              top: 0;
              width: 30px;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
