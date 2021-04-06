import React, { useEffect, useState } from "react";
import { COLOR_YELLOW } from "../../public/styles/general";
import Link from "next/link";
import Image from "next/image";

const ActionButton = ({ title, url, type }: any) => {
  const [returnStatement, setReturnStatement] = useState();
  const PDFComponent = (
    <a href={url} download>
      {title}{" "}
      <Image
        src={"/icons/download.png"}
        className={"icon-button"}
        alt="icon"
        width={20}
        height={20}
      />
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
        <Image
          src={"/icons/external-link.png"}
          className={"icon-button"}
          alt="icon"
          width={20}
          height={20}
        />
        <style jsx>{`
          .icon-button {
            width: 20px;
            margin: 0 5px;
          }
        `}</style>
      </a>
    </Link>
  );

  const ExternalComponent = (
    <a href={url} target="_blank">
      {title}
      <Image
        src={"/icons/external-link.png"}
        className={"icon-button"}
        alt="icon"
        width={20}
        height={20}
      />
      <style jsx>{`
        .icon-button {
          width: 20px;
          margin: 0 5px;
        }
      `}</style>
    </a>
  );

  const checkType = (type) => {
    switch (type) {
      case "pdf":
        return PDFComponent;
        break;
      case "link":
        return LinkComponent;
        break;
      case "external":
        return ExternalComponent;
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
            width: max-content;
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
            width: max-content;
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
