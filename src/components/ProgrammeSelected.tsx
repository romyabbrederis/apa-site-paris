import React, { useState, useEffect } from "react";
import { ProgrammeContent } from "../lib/programmes";
import ActionButton from "./ActionButton";
import { useRouter } from "next/router";

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
          <div className={"download-section"}>
            <ActionButton
              title={"Telechargement du Flyer"}
              url={programme.file}
              type="pdf"
            />
          </div>
          <img
            onClick={() => router.back()}
            src="../../icons/close.png"
            className={"close-icon"}
          />
          <p>{programme.description}</p>
          {programme.galleries
            ? programme.galleries
                .sort((a, b) => a.start - b.start)
                .map((item, index) => (
                  <div className={"gallery-dates"}>
                    <h5 key={index}>{item.date}</h5>
                    <div key={index}>
                      <h5>{item.galleries}</h5>
                      {item.artist ? <p>Artist: {item.artist}</p> : null}
                    </div>
                  </div>
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
                display: flex;
              }

              .close-icon {
                position: absolute;
                top: 0px;
                right: 0;
                width: 30px;
              }
            }

            @media (min-width: 769px) {
              .download-section {
                position: absolute;
                right: 0;
                top: 100px;
              }

              .gallery-dates {
                display: flex;
                justify-content: space-between;
                width: 50%;
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
