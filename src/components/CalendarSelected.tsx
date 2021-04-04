import React, { useEffect, useState } from "react";
import { CalendarContent } from "../lib/programmes";
import { findMap, getSlug } from "../lib/galleries";
import ActionButton from "./ActionButton";
import { useRouter } from "next/router";
import Link from "next/link";

type Props = {
  event: any;
};

const CalendarSelected = ({ event }: Props): any => {
  const {
    title,
    description,
    intro,
    month,
    year,
    start,
    type,
    galleries,
  } = event;
  // const [galMap, setGalMap] = useState({ map: "", name: "" });
  const router = useRouter();
  const { pathname } = router;
  const [showMore, setShowMore] = useState(galleries[0].galleries);

  const localeURL = pathname.split("/")[1];
  const link_en = "/en/gallery/";
  const link_fr = "/galerie/";

  // useEffect(() => {
  //   if (event && galleries.length) {
  //     extractLink(galleries[0].map, galleries[0].slug);
  //   }
  // }, [galleries]);

  console.log("showmore", showMore);

  return event ? (
    <div className={"layout-container"} style={{ backgroundColor: "#F2F2F2" }}>
      <div className={"inner-container"}>
        <div className={"calendar-container"}>
          <img
            className={"close-icon"}
            src="../../icons/close.png"
            onClick={() => router.back()}
          />
          <div className={"modal-container"}>
            <h3 className={"text"}>{month}</h3>
          </div>

          <div className={"modal-container"}>
            <h3>{title}</h3>
          </div>
        </div>

        <p>{intro}</p>

        <div className={"galleries-container"}>
          {galleries
            ? galleries.map((item, i) => (
                <div
                  className={
                    item.galleries === showMore ? "frame-selected" : "frame"
                  }
                  onClick={() =>
                    setShowMore(
                      item.galleries !== showMore ? item.galleries : ""
                    )
                  }
                >
                  {item.galleries === showMore ? (
                    <img
                      className={"down-arrow-open"}
                      src={`../../icons/down-arrow.png`}
                    />
                  ) : (
                    <img
                      className={"down-arrow-close"}
                      src={`../../icons/down-arrow-white.png`}
                    />
                  )}

                  <div className={"date-name-container"}>
                    <h4>{item.date}</h4>
                    <h4 className={"gallery-name"}>{item.galleries}</h4>
                  </div>
                  {item.galleries === showMore ? (
                    <div>
                      <p>Artist: {item.artist}</p>
                      <p>{item.text}</p>
                      <p>{getSlug(item.galleries).street}</p>
                      <p>{getSlug(item.galleries).city}</p>
                      <p>{getSlug(item.galleries).country}</p>
                      <a href={`tel:${getSlug(item.galleries).phone}`}>
                        <p>{getSlug(item.galleries).phone}</p>
                      </a>
                      <p></p>
                      <a href={`tel:${getSlug(item.galleries).email}`}>
                        <p>{getSlug(item.galleries).email} </p>
                      </a>
                      <ActionButton
                        title={"SITE WEB"}
                        url={
                          localeURL === "en"
                            ? link_en + getSlug(item.galleries).slug
                            : link_fr + getSlug(item.galleries).slug
                        }
                        type={"external"}
                      />
                      {item.article ? (
                        <ActionButton
                          title={"article"}
                          url={
                            localeURL === "en"
                              ? link_en + item.article
                              : link_fr + item.article
                          }
                          type={"link"}
                        />
                      ) : null}
                    </div>
                  ) : null}

                  {/* <iframe
                    src={findMap(item.galleries)}
                    width="100%"
                    height="450"
                    style={{ border: "none", filter: "greyscale(100%)" }}
                  ></iframe> */}
                </div>
              ))
            : null}
        </div>

        <style jsx>{`
          p {
            margin: 15px 0;
          }

          @media (max-width: 769px) {
            .calendar-container {
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
              background: black;
              color: white;
              padding: 0 10px 10px 10px;
              cursor: pointer;
              margin: 20px 0;
            }

            .frame-selected {
              border: 1px solid black;
              padding: 0 10px 10px 10px;
              background: white;
              color: black;
              margin: 20px 0;
            }

            .date-name-container {
            }

            .date-name-container h4 {
              margin-right: 10%;
            }

            .down-arrow-close {
              transform: rotate(0deg);
              position: absolute;
              right: 10px;
              top: 25px;
              width: 30px;
            }

            .down-arrow-open {
              transform: rotate(180deg);
              position: absolute;
              right: 10px;
              top: 25px;
              width: 30px;
            }

            .galleries-container {
              position: relative;
            }
          }

          @media (min-width: 769px) {
            .calendar-container {
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
              background: black;
              color: white;
              padding: 0 10px 10px 10px;
              cursor: pointer;
              margin: 20px 0;
            }

            .frame-selected {
              border: 1px solid black;
              background: white;
              color: black;
              padding: 0 10px 10px 10px;
              cursor: pointer;
              margin: 20px 0;
            }

            .date-name-container {
              display: flex;
            }

            .date-name-container h4 {
              margin-right: 10%;
            }

            .down-arrow-close {
              transform: rotate(0deg);
              position: absolute;
              right: 10px;
              top: 25px;
              width: 30px;
            }

            .down-arrow-open {
              transform: rotate(180deg);
              position: absolute;
              right: 10px;
              top: 25px;
              width: 30px;
            }

            .galleries-container {
              position: relative;
            }
          }
        `}</style>
      </div>
    </div>
  ) : null;
};

export default CalendarSelected;
