import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { COLOR_YELLOW } from "../../public/styles/general";

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
    setMobilDevice(windowSize.matches);
    window.addEventListener("resize", function () {
      setMobilDevice(windowSize.matches);
    });
  }, []);

  console.log("data");
  return (
    <div className={"container"}>
      <Link href={tllink}>
        <div className={"left-top"}>
          <div className={"title"}>
            <h1>{tltitle}</h1>
          </div>
          <img src={tlimage} className={"image"} />
        </div>
      </Link>

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

      <Link href={bllink}>
        <div className={"left-bottom"}>
          <div className={"lb-title"}>
            <h1> {bltitle}</h1>
          </div>
        </div>
      </Link>

      <Link href={brlink}>
        <div className={"right-bottom"}>
          <div className={"title"}>
            <h1> {brtitle}</h1>
          </div>
          <img src={brimage} className={"image"} />
        </div>
      </Link>

      <style jsx>{`
        @keyframes slide-in-top {
          0% {
            -webkit-transform: translateY(-1000px);
            transform: translateY(-1000px);
            opacity: 0;
          }
          100% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
            opacity: 1;
          }
        }

        @-webkit-keyframes slide-in-right {
          0% {
            -webkit-transform: translateX(1000px);
            transform: translateX(1000px);
            opacity: 0;
          }
          100% {
            -webkit-transform: translateX(0);
            transform: translateX(0);
            opacity: 1;
          }
        }

        @-webkit-keyframes slide-in-left {
          0% {
            -webkit-transform: translateX(-1000px);
            transform: translateX(-1000px);
            opacity: 0;
          }
          100% {
            -webkit-transform: translateX(0);
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slide-in-left {
          0% {
            -webkit-transform: translateX(-1000px);
            transform: translateX(-1000px);
            opacity: 0;
          }
          100% {
            -webkit-transform: translateX(0);
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slide-in-right {
          0% {
            -webkit-transform: translateX(1000px);
            transform: translateX(1000px);
            opacity: 0;
          }
          100% {
            -webkit-transform: translateX(0);
            transform: translateX(0);
            opacity: 1;
          }
        }

        @-webkit-keyframes slide-in-bottom {
          0% {
            -webkit-transform: translateY(1000px);
            transform: translateY(1000px);
            opacity: 0;
          }
          100% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes slide-in-bottom {
          0% {
            -webkit-transform: translateY(1000px);
            transform: translateY(1000px);
            opacity: 0;
          }
          100% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
            opacity: 1;
          }
        }

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
            -webkit-animation: slide-in-top 0.7s
              cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s both;
            animation: slide-in-top 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)
              0.2s both;
          }

          .right-top {
            grid-column: 1 / 3;
            position: relative;
            padding: 10px;
            background-color: #f2f2f2;
            border: 1px solid black;
            min-height: 20vh;
            -webkit-animation: slide-in-right 0.7s
              cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s both;
            animation: slide-in-right 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)
              0.3s both;
          }

          .left-bottom {
            grid-column: 1 / 2;
            position: relative;
            padding: 10px;
            cursor: pointer;
            background-color: #ffd506;
            max-height: 30vh;
            text-overflow: ellipsis;
            -webkit-animation: slide-in-left 0.7s
              cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s both;
            animation: slide-in-left 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)
              0.4s both;
          }

          .lb-title {
            position: absolute;
            color: black;
            left: 20px;
            top: 10px;
            width: 50%;
            text-align: center;
            font-size: 10px;
            text-align: center;
          }

          .right-bottom {
            grid-column: 2 / 4;
            position: relative;
            cursor: pointer;
            max-height: 30vh;
            -webkit-animation: slide-in-bottom 0.7s
              cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s both;
            animation: slide-in-bottom 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)
              0.5s both;
          }

          .image {
            min-height: 100%;
            min-width: 100%;
            object-fit: cover;
          }

          .title {
            position: absolute;
            color: black;
            left: 20px;
            bottom: 10px;
            width: 50%;
            background: white;
            text-align: center;
            font-size: 10px;
            text-align: center;
            border: 1px solid black;
          }

          .title:hover {
            background: white;
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
            height: 93vh;
            margin-top: 70px;
            overflow: hidden;
          }

          .left-top {
            grid-column: 1 / 4;
            position: relative;
            overflow: hidden;
            cursor: pointer;
            -webkit-animation: slide-in-top 0.7s
              cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s both;
            animation: slide-in-top 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)
              0.2s both;
          }

          .right-top {
            grid-column: 4 / 6;
            position: relative;
            padding: 10px;
            background-color: #f2f2f2;
            padding: 10px;
            width: 100%;
            -webkit-animation: slide-in-right 0.7s
              cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s both;
            animation: slide-in-right 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)
              0.3s both;
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
            -webkit-animation: slide-in-left 0.7s
              cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s both;
            animation: slide-in-left 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)
              0.4s both;
          }

          .right-bottom {
            grid-column: 3 / 6;
            position: relative;
            cursor: pointer;
            -webkit-animation: slide-in-bottom 0.7s
              cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s both;
            animation: slide-in-bottom 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)
              0.5s both;
          }

          .image {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .lb-title {
            position: absolute;
            color: black;
            left: 20px;
            top: 10px;
            width: 50%;
            text-align: center;
            font-size: 24px;
            text-align: center;
          }

          .title {
            position: absolute;
            color: black;
            left: 5px;
            bottom: 10px;
            width: 90%;
            background: white;
            text-align: center;
            border: 1px solid black;
            font-size: 15px;
          }

          .title:hover {
            background: white;
          }

          h1:hover {
            color: ${COLOR_YELLOW};
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
