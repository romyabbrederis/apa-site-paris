import React, { useState, useEffect } from "react";
import { ProgrammeContent } from "../lib/programmes";

type Props = {
  programme: ProgrammeContent;
};

export default function ProgrammeSelected({ programme }: Props): any {
  return programme ? (
    <div className={"programme-selected-container"}>
      <p>{programme.description}</p>
      {programme.galleries.map((item) => (
        <h5>{item}</h5>
      ))}
      <div className={"download-section"}>
        <a href={programme.file} download>
          Telechargement Flyer
        </a>
      </div>
      <style jsx>{`
        .programme-selected-container {
          position: relative;
        }

        @media (max-width: 769px) {
          .download-section {
            padding-bottom: 10px;
            text-align: right;
          }
        }

        @media (min-width: 769px) {
          .download-section {
            position: absolute;
            right: 0;
            bottom: 0;
          }
        }
      `}</style>
    </div>
  ) : null;
}
