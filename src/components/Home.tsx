import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Home = ({ data, programme }) => {
  const {
    bllink,
    bltext,
    bltitle,
    brimage,
    brlink,
    brtitle,
    tlimage,
    tllink,
    tltitle,
  } = data;
  const { title, month, year, description, galleries } = programme;
  const router = useRouter();
  const { pathname } = router;
  const [mobileDevice, setMobilDevice] = useState<boolean>();

  //  ** work-around
  const localeURL = pathname.split("/")[1];
  const link_en = "/en/programme/";
  const link_fr = "/programme/";

  useEffect(() => {
    const windowSize = window.matchMedia("(max-width: 640px)");
    window.addEventListener("resize", function () {
      setMobilDevice(windowSize.matches);
    });
  }, []);

  console.log("data");
  return (
    <div className={"container"}>
      <div className={"left-top"}>
        <h1 className={"title"}>{tltitle}</h1>
        <img src={tlimage} className={"image"} />
      </div>

      <div className={"right-top"}>
        <div className={"programme-container"}>
          <div className={"programme-top"}>
            <div>
              <p className={"headline"}>{month}</p>
              <p className={"headline"}>{year}</p>
            </div>
            <p className={"headline"}>{title}</p>
          </div>
          {mobileDevice ? null : <p>{description}</p>}
        </div>

        <Link href={localeURL === "en" ? link_en : link_fr}>
          <div className={"button"}>Voir les programmes</div>
        </Link>
      </div>

      <div className={"left-bottom"}>
        <Link href={bllink}>
          <div>
            <h1> {bltitle}</h1>
            {mobileDevice ? null : <p> {bltext}</p>}
          </div>
        </Link>
      </div>

      <div className={"right-bottom"}>
        <Link href={brlink}>
          <div>
            <h1 className={"title"}> {brtitle}</h1>
            <img src={brimage} className={"image"} />
          </div>
        </Link>
      </div>

      <style jsx>{`
        @media (max-width: 769px) {
          .container {
            display: grid;
            grid-template-columns: 50% 50%;
            grid-gap: 5px;
            wdith: 100%;
            height: 96vh;
            margin-top: 35px;
          }

          .left-top {
            grid-column: 1 / 4;
            position: relative;
            overflow: hidden;
            cursor: pointer;
          }

          .right-top {
            grid-column: 1 / 3;
            position: relative;
            padding: 10px;
            background-color: #f2f2f2;
            border: 1px solid black;
            min-height: 20vh;
          }

          .left-bottom {
            grid-column: 1 / 2;
            position: relative;
            padding: 10px;
            cursor: pointer;
            background-color: #ffd506;
            max-height: 30vh;
            text-overflow: ellipsis;
          }

          .right-bottom {
            grid-column: 2 / 4;
            position: relative;
            cursor: pointer;
            max-height: 30vh;
          }

          .image {
            min-height: 100%;
            min-width: 100%;
            object-fit: cover;
          }

          .title {
            position: absolute;
            left: 10%;
            top: 10px;
          }

          .programme-container {
            background: white;
            border: 1px solid black;
            padding: 10px;
            min-height: 10vh;
          }

          .programme-top {
            display: flex;
            text-align: right;
            justify-content: space-evenly;
          }

          .button {
            background: white;
            border: 1px solid black;
            padding: 5px 10px;
            width: 200px;
            position: absolute;
            left: 10px;
            bottom: 10px;
            text-align: center;
            cursor: pointer;
          }

          .button :hover {
            background: black;
            color: white;
          }

          .headline {
            font-size: 14px;
            font-weight: 700;
            line-height: 0em;
          }
        }

        @media (min-width: 769px) {
          .container {
            display: grid;
            grid-template-columns: 20% 20% 20% 20% 20%;
            grid-gap: 10px;
            wdith: 100%;
            height: 90%;
            margin-top: 7vh;
            overflow: hidden;
          }

          .left-top {
            grid-column: 1 / 4;
            position: relative;
            overflow: hidden;
            cursor: pointer;
          }

          .right-top {
            grid-column: 4 / 6;
            position: relative;
            padding: 10px;
            background-color: #f2f2f2;
            padding: 10px;
            width: 100%;
          }

          .left-bottom {
            grid-column: 1 / 3;
            position: relative;
            padding: 10px;
            cursor: pointer;
            background-color: #ffd506;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
          }

          .right-bottom {
            grid-column: 3 / 6;
            position: relative;
            cursor: pointer;
          }

          .image {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .title {
            position: absolute;
            left: 10%;
            top: 10px;
            font-size: 60px;
          }

          .programme-container {
            background: white;
            border: 1px solid black;
            margin-right: 60px;
            padding: 10px;
          }

          .programme-top {
            display: flex;
            text-align: right;
            justify-content: space-evenly;
          }

          .button {
            background: white;
            border: 1px solid black;
            padding: 5px 10px;
            width: 100px;
            position: absolute;
            left: 10px;
            bottom: 10px;
            text-align: center;
            cursor: pointer;
          }

          .button :hover {
            background: black;
            color: white;
          }

          .headline {
            font-size: 18px;
            font-weight: 700;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
