import React, { useState, useEffect } from "react";
import { ProgrammeContent } from "../lib/programmes";
import ProgrammeSelected from "./ProgrammeSelected";
import TimeButton from "./TimeButton";
import { renderProgrammes } from "../utils/renderProgrammes";
import { useRouter } from "next/router";
import Link from "next/link";

type Props = {
  programmes: ProgrammeContent[];
};

export default function ProgrammesList({ programmes }: Props): any {
  console.log("programmes", programmes);
  const router = useRouter();
  const { pathname } = router;

  const [type, setType] = useState("now");
  const [data, setData] = useState([]);
  const [mobileDevice, setMobilDevice] = useState<boolean>();

  const localeURL = pathname.split("/")[1];
  const link_en = "/en/programme/";
  const link_fr = "/programme/";

  useEffect(() => {
    const newData = renderProgrammes(programmes, type);
    setData(newData);
  }, [type]);

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

  console.log("data", data);

  return (
    <div className={"layout-container"} style={{ backgroundColor: "#E5E5E5" }}>
      <div className={"inner-container"}>
        <TimeButton changeType={changeType} type={type} />
        <div className={"programmes"}>
          {data && data.length ? (
            <div className={"programmes-list"}>
              {data.map((item, i) => (
                <div key={i} className={"programme-box"}>
                  {mobileDevice ? (
                    <Link
                      href={
                        localeURL === "en"
                          ? link_en + item.slug
                          : link_fr + item.slug
                      }
                    >
                      <div className={"programme-title-container"}>
                        <h4>
                          {item.month} {item.year}
                        </h4>
                        <h4>{item.title}</h4>
                        <p>{item.intro}</p>
                        <img
                          src="../../icons/down.png"
                          className={"down-icon"}
                        />
                      </div>
                    </Link>
                  ) : (
                    <Link
                      href={
                        localeURL === "en"
                          ? link_en + item.slug
                          : link_fr + item.slug
                      }
                    >
                      <div className={"programme-title-container"}>
                        <div className={"month-date"}>
                          <h3 className={"date-space"}>
                            {item.month} {item.year}
                          </h3>
                          <h3>{item.title}</h3>
                        </div>
                        <p>{item.intro}</p>
                        <img
                          src="../../icons/down.png"
                          className={"down-icon"}
                        />
                      </div>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <style jsx>{`
          .container {
            background: #e5e5e5;
            overflow: scroll;
          }

          @media (max-width: 769px) {
            .programme-title-container {
              position: relative;
              height: 100%;
            }

            .close-icon {
              position: absolute;
              top: 10px;
              right: 10px;
              width: 30px;
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
              right: 10px;
              top: 0;
              width: 30px;
            }
          }

          @media (min-width: 769px) {
            .programme-title-container {
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
