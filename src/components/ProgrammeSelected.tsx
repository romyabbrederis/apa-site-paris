import React, { useState, useEffect } from "react";
import { ProgrammeContent } from "../lib/programmes";
import ActionButton from "./ActionButton";

type Props = {
  programme: ProgrammeContent;
};

export default function ProgrammeSelected({ programme }: Props): any {
  console.log("programme", programme);

  return programme ? (
    <div className={"layout-container"}>
      <div className={"inner-container"}>
        <div className={"programme-selected-container"}>
          <h1>
            {programme.month} {programme.year}
          </h1>
          <h1>{programme.title}</h1>
          <div className={"download-section"}>
            <ActionButton
              title={"Telechargement du Flyer"}
              url={programme.file}
              type="pdf"
            />
          </div>
          <p>{programme.description}</p>
          {programme.galleries
            ? programme.galleries
                .sort((a, b) => a.start - b.start)
                .map((item, index) => (
                  <>
                    <h5 key={index}>
                      {item.date} | {item.galleries}
                    </h5>
                  </>
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
            }

            @media (min-width: 769px) {
              .download-section {
                position: absolute;
                right: 0;
                top: 100px;
              }
            }
          `}</style>
        </div>
      </div>
    </div>
  ) : null;
}
