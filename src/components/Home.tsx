import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { COLOR_YELLOW } from "../../public/styles/general";

const Home = ({ data, programmes }) => {
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
  const router = useRouter();
  const { pathname } = router;
  const [mobileDevice, setMobilDevice] = useState<boolean>();
  //  ** work-around
  const localeURL = pathname.split("/")[1];
  const link_en = "/en/programme/";
  const link_fr = "/programme/";

  // const localeURL = pathname.split("/")[1];
  // const link_en = "/en/gallery/";
  // const link_fr = "/galerie/";

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
        </div>
      </Link>

      <div className={"right-top"}>
        {programmes && !mobileDevice
          ? programmes.map((item) => (
              <div className={"programme-container"}>
                <div className={"programme-top"}>
                  <div>
                    <h4>
                      {item.month} {item.year}
                    </h4>
                  </div>
                  <h3>{item.title}</h3>
                </div>
              </div>
            ))
          : null}

        <Link href={localeURL === "en" ? link_en : link_fr}>
          <div className={"button"}>Voir les programmes</div>
        </Link>
      </div>

      <Link href={bllink}>
        <div className={"left-bottom"}>
          <div className={"lb-name"}>
            <h1> {bltitle}</h1>
            <p>
              {mobileDevice
                ? bltext.replace(/(([^\s]+\s+){10}).+/, "$1...")
                : bltext.replace(/(([^\s]+\s+){30}).+/, "$1...")}
            </p>
          </div>
        </div>
      </Link>

      <Link href={brlink}>
        <div className={"right-bottom"}>
          <div className={"title"}>
            <h1> {brtitle}</h1>
          </div>
          {/* <img className={"image"} /> */}
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

        @keyframes change-images {
          0% {
            background-size: 70px 70px;
          }
          100% {
            background-size: cover;
          }
        }

        @-webkit-keyframes change-images {
          0% {
            background-size: 70px 70px;
          }
          100% {
            background-size: cover;
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
            background-image: url(${tlimage});
            background: linear-gradient(
                180deg,
                rgba(255, 255, 255, 0) 25%,
                rgba(0, 0, 0, 0.45702030812324934) 90%,
                rgba(0, 0, 0, 0.7973564425770308) 100%
              ),
              url(${tlimage});
            min-height: 30vh;
            -webkit-animation: change-images 7s
              cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
            animation: change-images 7s cubic-bezier(0.25, 0.46, 0.45, 0.94)
              infinite;
          }

          .right-top {
            grid-column: 1 / 3;
            position: relative;
            padding: 10px;
            background-color: #f2f2f2;
            border: 1px solid black;
            min-height: max-content;
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
            min-height: 30vh;
            text-overflow: ellipsis;
            overflow: hidden;
            -webkit-animation: slide-in-left 0.7s
              cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s both;
            animation: slide-in-left 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)
              0.4s both;
          }

          .left-bottom p {
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .lb-name {
            position: absolute;
            color: black;
            left: 10px;
            top: 0;
            text-align: left;
          }

          .lb-name:hover {
            color: white;
          }

          .right-bottom {
            grid-column: 2 / 4;
            position: relative;
            cursor: pointer;
            -webkit-animation: slide-in-bottom 0.7s
              cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s both;
            animation: slide-in-bottom 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)
              0.5s both;
            background: rgb(255, 255, 255);
            background-image: url(${brimage});
            background: linear-gradient(
                180deg,
                rgba(255, 255, 255, 0) 25%,
                rgba(0, 0, 0, 0.45702030812324934) 90%,
                rgba(0, 0, 0, 0.7973564425770308) 100%
              ),
              url(${brimage});
            object-fit: cover;
            min-height: 30vh;
            height: 100%;
            -webkit-animation: change-images 10s
              cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
            animation: change-images 10s cubic-bezier(0.25, 0.46, 0.45, 0.94)
              infinite;
          }

          .image {
            min-height: 100%;
            min-width: 100%;
            object-fit: cover;
          }

          .title {
            position: absolute;
            color: white;
            left: 10px;
            bottom: 0;
            width: 50%;
          }

          .title:hover {
            background: white;
          }

          .programme-container {
            background: black;
            color: white;
            border: 1px solid black;
            padding: 10px;
          }

          .programme-top {
            display: flex;
            text-align: left;
            justify-content: space-evenly;
            color: white;
          }

          .programme-top h4 {
            color: white;
          }

          .button {
            background: white;
            border: 1px solid black;
            padding: 10px 20px;
            width: 200px;
            position: absolute;
            left: 10px;
            bottom: 10px;
            text-align: center;
            cursor: pointer;
            text-transform: lowercase;
            font-weight: 500;
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

          h1 {
            font-size: 16px;
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
            background-image: url(${tlimage});
            background: linear-gradient(
                180deg,
                rgba(255, 255, 255, 0) 25%,
                rgba(0, 0, 0, 0.45702030812324934) 60%,
                rgba(0, 0, 0, 0.7973564425770308) 100%
              ),
              url(${tlimage});
            background-size: cover;
            min-height: 30vh;
          }

          .left-top:hover {
            background-image: url(${tlimage});
            background: linear-gradient(
                180deg,
                rgba(255, 255, 255, 0) 25%,
                rgba(0, 0, 0, 0.45702030812324934) 90%,
                rgba(0, 0, 0, 0.7973564425770308) 100%
              ),
              url(${tlimage});
            background-size: repeat;
          }

          .right-top {
            grid-column: 4 / 6;
            position: relative;
            background-color: #f2f2f2;
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

          .left-bottom:hover {
            background: grey;
          }

          .left-top:hover {
            background-image: url(${tlimage});
            background: linear-gradient(
                180deg,
                rgba(255, 255, 255, 0) 25%,
                rgba(0, 0, 0, 0.45702030812324934) 90%,
                rgba(0, 0, 0, 0.7973564425770308) 100%
              ),
              url(${tlimage});
            background-size: repeat;
          }

          .right-bottom {
            grid-column: 3 / 6;
            position: relative;
            cursor: pointer;
            -webkit-animation: slide-in-bottom 0.7s
              cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s both;
            animation: slide-in-bottom 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)
              0.5s both;
            background: rgb(255, 255, 255);
            background-image: url(${brimage});
            background: linear-gradient(
                180deg,
                rgba(255, 255, 255, 0) 25%,
                rgba(0, 0, 0, 0.45702030812324934) 60%,
                rgba(0, 0, 0, 0.7973564425770308) 100%
              ),
              url(${brimage});
            background-size: cover;
            min-height: 30vh;
          }

          .right-bottom:hover {
            background-image: url(${brimage});
            background: linear-gradient(
                180deg,
                rgba(255, 255, 255, 0) 25%,
                rgba(0, 0, 0, 0.45702030812324934) 90%,
                rgba(0, 0, 0, 0.7973564425770308) 100%
              ),
              url(${brimage});
            background-size: repeat;
          }

          .image {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .lb-name {
            position: absolute;
            color: black;
            left: 20px;
            top: 10px;
            font-size: 24px;
          }

          .lb-name:hover {
            color: white;
          }

          .lb-name p {
            font-size: 18px;
            padding-right: 5px;
          }

          .title {
            position: absolute;
            color: white;
            left: 20px;
            bottom: 10px;
            width: 90%;
            font-size: 34px;
          }

          .title:hover {
            color: ${COLOR_YELLOW};
          }

          h1:hover {
            color: ${COLOR_YELLOW};
          }

          .programme-container {
            background: black;
            border: 1px solid black;
            margin-right: 40px;
            padding: 5px;
            margin-bottom: 5px;
          }

          .programme-top {
          }

          .programme-top h4 {
            color: white;
          }

          .programme-top h3 {
            color: white;
          }

          .button {
            background: white;
            border: 1px solid black;
            padding: 10px 50px;
            width: max-content;
            position: absolute;
            left: 10px;
            bottom: 10px;
            text-align: center;
            cursor: pointer;
            text-transform: lowercase;
            font-weight: 500;
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
