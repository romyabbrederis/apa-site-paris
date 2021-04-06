import React, { useState, useEffect } from "react";
import { ProgrammeContent } from "../lib/programmes";
import ActionButton from "./ActionButton";
import { useRouter } from "next/router";
import Link from "next/link";
import { COLOR_YELLOW } from "../../public/styles/general";

type Props = {
  programme: ProgrammeContent;
};

export default function ProgrammeSelected({ programme }: Props): any {
  console.log("programme", programme);
  const router = useRouter();

  return programme ? (
    <div className={"layout-container"} style={{ backgroundColor: "white" }}>
      <div className={"inner-container"}>
        <div className={"programme-selected-container"}>
          <h1>{programme.title}</h1>
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
            onClick={() => router.back()}
            src="../../icons/close.png"
            className={"close-icon"}
          />
          <p>{programme.description}</p>
          {/* {programme && programme.category ? (
            <p>Type: {programme.category}</p>
          ) : null} */}
          <hr />
          {programme.galleries
            ? programme.galleries
                .sort((a, b) => a.start - b.start)
                .map((item, index) => (
                  <Link key={item.slug} href={"/calendrier/" + programme.slug}>
                    <div className={"gallery-dates"}>
                      <h5 key={index}>{item.date}</h5>
                      <div key={index}>
                        <h5>{item.galleries}</h5>
                        {item.artist && !item.articleRelation ? (
                          <p>Artist: {item.artist}</p>
                        ) : null}

                        {item.artist && item.articleRelation ? (
                          <Link href={"/actualites/" + item.articleRelation}>
                            <a className={"artist-exists"}>
                              <p>
                                Artist: {item.artist}{" "}
                                <img src={"../../icons/external-link.png"} />{" "}
                              </p>
                            </a>
                          </Link>
                        ) : null}
                      </div>
                      <hr />
                    </div>
                  </Link>
                ))
            : null}

          <style jsx>{`
            .programme-selected-container {
              position: relative;
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
              }

              .artist-exists:hover {
                color: grey;
              }

              .artist-exists img {
                width: 20px;
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
