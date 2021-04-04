import React, { useEffect, useState } from "react";
import { COLOR_YELLOW } from "../../public/styles/general";
import Link from "next/link";

const ActionButton = ({ title, url, type }: any) => {
  const [returnStatement, setReturnStatement] = useState();

  const PDFComponent = (
    <a href={url} download>
      {title} <img src={"../../icons/download.png"} className={"icon-button"} />
      <style jsx>{`
        .icon-button {
          width: 20px;
          margin: 0 5px;
        }
      `}</style>
    </a>
  );

  const LinkComponent = (
    <Link href={url}>
      <a>
        {title}
        <img src={"../../icons/external-link.png"} className={"icon-button"} />
        <style jsx>{`
          .icon-button {
            width: 20px;
            margin: 0 5px;
          }
        `}</style>
      </a>
    </Link>
  );

  const checkType = (type) => {
    switch (type) {
      case "pdf":
        console.log("pdf case");
        return PDFComponent;
        break;
      case "link":
        return LinkComponent;
        break;
      default:
        return PDFComponent;
    }
  };

  return (
    <div>
      <div className={"button-container"}>{checkType(type)}</div>
      <style jsx>{`
        @media (max-width: 769px) {
          .button-container {
            letter-spacing: 3px;
            text-transform: uppercase;
            font-color: black;
            font-size: 14px;
            border-bottom: 3px solid ${COLOR_YELLOW};
            padding-bottom: 3px;
            padding: 0 5px;
          }

          .icon-button {
            width: 20px;
          }
        }

        @media (min-width: 769px) {
          .button-container {
            letter-spacing: 3px;
            text-transform: uppercase;
            font-color: black;
            border-bottom: 3px solid ${COLOR_YELLOW};
            padding-bottom: 3px;
            padding: 0 10px;
          }

          .icon-button {
            width: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default ActionButton;
