import React, { useState, useEffect } from "react";
import { ProgrammeContent } from "../lib/programmes";
import ActionButton from "./ActionButton";
import { useRouter } from "next/router";
import Link from "next/link";
import { COLOR_YELLOW } from "../../public/styles/general";
import Image from "next/image";

type Props = {
  programme: ProgrammeContent;
};

export default function ProgrammeSelected({ programme }: Props): any {
  const router = useRouter();

  return programme ? (
    <div className={"layout-container"} style={{ backgroundColor: "white" }}>
      <div className={"inner-container"}>
        <div className={"programme-selected-container"}>
          <h1>{programme.title}</h1>
          <p className={"category"}>Type: {programme.category}</p>
          <h2>
            {programme.month} {programme.year}
          </h2>
          {programme.file ? (
            <div className={"download-section"}>
              <ActionButton
                title={"Telechargement du Flyer"}
                url={programme.file}
                type="pdf"
              />
            </div>
          ) : null}
          <img
            className={"close-icon"}
            onClick={() => router.back()}
            src="/icons/close.png"
          />
          <p>{programme.description}</p>
          {/* {programme && programme.category ? (
            <p>Type: {programme.category}</p>
          ) : null} */}
          <hr />
          <ul>
            {programme.galleries
              ? programme.galleries
                  .sort((a, b) => a.start - b.start)
                  .map((item, index) => (
                    <li className={"gallery-dates"}>
                      <Link
                        key={item.slug}
                        href={"/calendrier/" + programme.slug}
                      >
                        <h5 key={index}>{item.date}</h5>
                      </Link>
                      <div key={index}>
                        <Link
                          key={item.slug}
                          href={"/calendrier/" + programme.slug}
                        >
                          <h5>
                            {item.galleries}{" "}
                            <img
                              className={"link-icon"}
                              src={"/icons/external-link.png"}
                            />{" "}
                          </h5>
                        </Link>
                        {item.artist && !item.articleRelation ? (
                          <a>
                            <p>{item.artist}</p>
                          </a>
                        ) : null}

                        {item.artist && item.articleRelation ? (
                          <Link href={"/artistes/" + item.articleRelation}>
                            <a className={"artist-exists"}>
                              <p>
                                {item.artist}{" "}
                                <img
                                  src={"/icons/external-link.png"}
                                  className={"link-icon"}
                                />{" "}
                              </p>
                            </a>
                          </Link>
                        ) : null}
                      </div>
                      <hr />
                    </li>
                  ))
              : null}
          </ul>

          <style jsx>{`
            .category {
              font-style: italic;
            }

            .programme-selected-container {
              position: relative;
            }

            .link-icon {
              width: 20px;
              margin-left: 10px;
            }

            @media (max-width: 769px) {
              .download-section {
                padding-bottom: 10px;
                text-align: left;
                width: max-content;
              }

              .gallery-dates {
              }

              .close-icon {
                position: absolute;
                top: 0px;
                right: 0;
                width: 30px;
              }

              .artist-exists img {
                width: 20px;
              }
            }

            @media (min-width: 769px) {
              .download-section {
                position: absolute;
                right: 0;
                top: 100px;
              }

              .gallery-dates:hover h5 {
                color: ${COLOR_YELLOW};
                cursor: pointer;
                transition-duration: 0.3s;
              }

              .artist-exists:hover {
                color: grey;
                transition-duration: 0.3s;
              }

              .artist-exists img {
                width: 20px;
                margin-left: 10px;
              }

              .close-icon {
                position: absolute;
                top: 0px;
                right: 0;
                width: 30px;
                cursor: pointer;
              }
            }
          `}</style>
        </div>
      </div>
    </div>
  ) : null;
}
