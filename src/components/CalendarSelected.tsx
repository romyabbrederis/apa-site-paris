import React, { useEffect, useState } from "react";
import { CalendarContent } from "../lib/programmes";
import { findMap, getSlug, extractLink } from "../lib/galleries";
import ActionButton from "./ActionButton";
import { useRouter } from "next/router";
import Link from "next/link";
import { getLocale } from "../utils/localeChecker";
import Image from "next/image";

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
  const [galMap, setGalMap] = useState("");
  const router = useRouter();
  const { pathname } = router;
  const [showMore, setShowMore] = useState(undefined);

  // useEffect(() => {
  //   if (event && galleries.length) {
  //     extractLink(galleries[0].map, galleries[0].slug);
  //   }
  // }, [galleries]);

  useEffect(() => {
    if (showMore) {
      const result = findMap(showMore);
      const map = extractLink(result.maps);
      setGalMap(map);
    }
  }, [showMore]);
  console.log("showmore", showMore);

  return event ? (
    <div className={"layout-container"} style={{ backgroundColor: "#F2F2F2" }}>
      <div className={"inner-container"}>
        <div className={"calendar-container"}>
          <div className={"close-icon"}>
            <Image
              src="/icons/close.png"
              width={30}
              height={30}
              objectFit="contain"
              layout="intrinsic"
              onClick={() => router.back()}
            />
          </div>
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
                  key={item.galleries}
                  className={
                    item.galleries === showMore ? "frame-selected" : "frame"
                  }
                >
                  {item.galleries === showMore ? (
                    <div className={"down-arrow-open"}>
                      <Image
                        src={`/icons/down-arrow.png`}
                        width={30}
                        height={30}
                        objectFit="contain"
                        layout="intrinsic"
                        onClick={() =>
                          setShowMore(
                            item.galleries !== showMore ? item.galleries : ""
                          )
                        }
                      />
                    </div>
                  ) : (
                    <div className={"down-arrow-close"}>
                      <Image
                        src={`/icons/down-arrow-white.png`}
                        width={30}
                        height={30}
                        objectFit="contain"
                        layout="intrinsic"
                        onClick={() =>
                          setShowMore(
                            item.galleries !== showMore ? item.galleries : ""
                          )
                        }
                      />
                    </div>
                  )}

                  <div className={"date-name-container"}>
                    <h4
                      onClick={() =>
                        setShowMore(
                          item.galleries !== showMore ? item.galleries : ""
                        )
                      }
                    >
                      {item.date}
                    </h4>
                    <h4
                      className={"gallery-name"}
                      onClick={() =>
                        setShowMore(
                          item.galleries !== showMore ? item.galleries : ""
                        )
                      }
                    >
                      {item.galleries}
                    </h4>
                    <h4
                      className={"gallery-name"}
                      onClick={() =>
                        setShowMore(
                          item.galleries !== showMore ? item.galleries : ""
                        )
                      }
                    >
                      {item.artist && item.artist}
                    </h4>
                  </div>
                  {item.galleries === showMore ? (
                    <div>
                      <hr />
                      <h4>Artist: {item.artist}</h4>
                      <p>Description: {item.text}</p>
                      <hr />
                      <div className={"gallery-info"}>
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
                      </div>
                      <ActionButton
                        title={"SITE WEB"}
                        url={getSlug(item.galleries).website}
                        type={"external"}
                      />

                      {item.article ? (
                        <ActionButton
                          title={"article"}
                          url={getLocale() + item.article}
                          type={"link"}
                        />
                      ) : null}

                      <iframe
                        src={galMap}
                        width="100%"
                        height="300"
                        style={{
                          border: "none",
                          filter: "greyscale(100%)",
                          marginTop: "30px",
                        }}
                      ></iframe>
                    </div>
                  ) : null}
                </div>
              ))
            : null}
        </div>

        <style jsx>{`
          p {
            margin: 15px 0;
          }

          .gallery-info {
            font-size: 14px;
            line-height: 1em;
            font-style: italic;
            width: max-content;
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
              position: relative;
            }

            .frame-selected {
              border: 1px solid black;
              padding: 0 10px 10px 10px;
              background: white;
              color: black;
              margin: 20px 0;
              position: relative;
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
              top: 10px;
              width: 30px;
            }

            .down-arrow-open {
              transform: rotate(180deg);
              position: absolute;
              right: 10px;
              top: 10px;
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
              position: relative;
            }

            .frame-selected {
              border: 1px solid black;
              background: white;
              color: black;
              padding: 0 10px 10px 10px;
              cursor: pointer;
              margin: 20px 0;
              position: relative;
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
              top: 10px;
              width: 30px;
            }

            .down-arrow-open {
              transform: rotate(180deg);
              position: absolute;
              right: 10px;
              top: 10px;
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
