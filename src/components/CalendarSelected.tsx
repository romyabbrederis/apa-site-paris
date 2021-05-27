import React, { useEffect, useState } from "react";
import { CalendarContent } from "../lib/programmes";
import { findMap, getGallery, extractLink } from "../lib/galleries";
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
    category,
  } = event;
  const [galMap, setGalMap] = useState("");
  const router = useRouter();
  const { pathname } = router;
  const [showMore, setShowMore] = useState(undefined);

  useEffect(() => {
    if (showMore) {
      const result = findMap(showMore);
      const map = result ? extractLink(result.maps) : {};
      setGalMap(map);
    }
  }, [showMore]);

  return event ? (
    <div className={"layout-container"} style={{ backgroundColor: "#F2F2F2" }}>
      <div className={"inner-container"}>
        <div className={"calendar-container"}>
          <img
            className={"close-icon"}
            src="/icons/close.png"
            onClick={() => router.back()}
          />
          <div className={"modal-container"}>
            <div>
              <h3 className={"text"}>{month}</h3>
            </div>
          </div>

          <div className={"modal-container"}>
            <h3>{title}</h3>
          </div>
        </div>

        <p className={"category"}>Type: {category}</p>

        <p>{intro}</p>

        <div className={"galleries-container"}>
          <hr />
          <div className={"date-name-container"}>
            <div className={"date"}>
              <p>Date</p>
            </div>
            <div className={"gallery-name"}>
              <p>Galerie</p>
            </div>
            <div className={"artist"}>
              <p>Artist</p>
            </div>
          </div>
          {galleries
            ? galleries.map((item, i) => (
                <div
                  key={item.galerySlug}
                  className={
                    item.galerySlug === showMore ? "frame-selected" : "frame"
                  }
                >
                  {item.galerySlug === showMore ? (
                    <img
                      src={`/icons/down-arrow.png`}
                      className={"down-arrow-open"}
                      onClick={() =>
                        setShowMore(
                          item.galerySlug !== showMore ? item.galerySlug : ""
                        )
                      }
                    />
                  ) : (
                    <img
                      className={"down-arrow-close"}
                      src={`/icons/down-arrow-white.png`}
                      onClick={() =>
                        setShowMore(
                          item.galerySlug !== showMore ? item.galerySlug : ""
                        )
                      }
                    />
                  )}

                  <div className={"date-name-container"}>
                    <h4
                      className={"date"}
                      onClick={() =>
                        setShowMore(
                          item.galerySlug !== showMore ? item.galerySlug : ""
                        )
                      }
                    >
                      {item.date}
                    </h4>
                    <h4
                      className={"gallery-name"}
                      onClick={() =>
                        setShowMore(
                          item.galerySlug !== showMore ? item.galerySlug : ""
                        )
                      }
                    >
                      {item.galleries}
                    </h4>
                    <h4
                      className={"artist"}
                      onClick={() =>
                        setShowMore(
                          item.galerySlug !== showMore ? item.galerySlug : ""
                        )
                      }
                    >
                      {item.artist && item.artist}
                    </h4>
                  </div>
                  {item.galerySlug === showMore &&
                  getGallery(item.galerySlug) ? (
                    <div>
                      <hr />
                      {item.artist && <h4>{item.artist}</h4>}
                      {item.text && <p>Description: {item.text}</p>}
                      <hr />
                      <div className={"gallery-info"}>
                        <p>
                          {getGallery(item.galerySlug).street &&
                            getGallery(item.galerySlug).street}
                        </p>
                        <p>
                          {getGallery(item.galerySlug).city &&
                            getGallery(item.galerySlug).city}
                        </p>
                        <p>
                          {getGallery(item.galerySlug).country &&
                            getGallery(item.galerySlug).country}
                        </p>
                        {getGallery(item.galerySlug).phone && (
                          <a href={`tel:${getGallery(item.galerySlug).phone}`}>
                            <p>{getGallery(item.galerySlug).phone}</p>
                          </a>
                        )}
                        <p></p>
                        {getGallery(item.galerySlug) &&
                          getGallery(item.galerySlug).email && (
                            <a
                              href={`tel:${getGallery(item.galerySlug).email}`}
                            >
                              <p>{getGallery(item.galerySlug).email} </p>
                            </a>
                          )}
                      </div>
                      {getGallery(item.galerySlug).website && (
                        <ActionButton
                          title={"SITE WEB"}
                          url={getGallery(item.galerySlug).website}
                          type={"external"}
                        />
                      )}

                      {item.article ? (
                        <ActionButton
                          title={"article"}
                          url={getLocale() + item.article}
                          type={"link"}
                        />
                      ) : null}

                      {galMap ? (
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
                      ) : null}
                    </div>
                  ) : null}
                </div>
              ))
            : null}
        </div>

        <style jsx>{`
          .category {
            font-style: italic;
            text-align: left;
          }

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

            .artist {
              flex-basis: 30%;
              font-weight: 400;
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
              grid-template-columns: 30% 70%;
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

            .date {
              flex-basis: 20%;
            }

            .artist {
              flex-basis: 30%;
              font-weight: 400;
            }

            .gallery-name {
              cursor: pointer;
              flex-basis: 40%;
            }

            .gallery-name :hover {
              color: #ffd506;
              transition-duration: 0.3s;
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
