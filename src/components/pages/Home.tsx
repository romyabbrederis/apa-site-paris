import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { COLOR_YELLOW } from "../../../public/styles/general";

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

  useEffect(() => {
    const windowSize = window.matchMedia("(max-width: 900px)");
    setMobilDevice(windowSize.matches);
    window.addEventListener("resize", function () {
      setMobilDevice(windowSize.matches);
    });
  }, []);

  return (
    <div className={"container"}>
      <Link href={tllink}>
        <div className={"left-top"}>
          <div className={"title"}>
            <h1>{tltitle}</h1>
          </div>
        </div>
      </Link>
      <Link href={bllink}>
        <div className={"right-top"}>
          <div className={"rt-name"}>
            <h1> {bltitle}</h1>
            <p>
              {mobileDevice
                ? bltext.length > 200
                  ? bltext.substring(0, 200) + " ..."
                  : bltext
                : bltext.length > 500
                ? bltext.substring(0, 500) + " ..."
                : bltext}
            </p>
          </div>
        </div>
      </Link>

      <div className={"left-bottom"}>
        {programmes && !mobileDevice
          ? programmes.map((item) => (
              <div key={item.title} className={"programme-container"}>
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

        <Link href={"/programme"}>
          <div className={"button"}>Voir les programmes</div>
        </Link>
      </div>

      <Link href={brlink}>
        <div className={"right-bottom"}>
          <div className={"title"}>
            <h1> {brtitle}</h1>
          </div>
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

        @media (max-width: 900px) {
          .container {
            display: grid;
            grid-template-columns: 50% 50%;
            grid-gap: 5px;
            wdith: 100%;
            height: 94vh;
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
            cursor: pointer;
            background-color: #ffd506;
            min-height: 30vh;
            text-overflow: ellipsis;
            overflow: hidden;
            -webkit-animation: slide-in-right 0.7s
              cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s both;
            animation: slide-in-right 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)
              0.3s both;
            width: 90%;
          }

          .right-top p {
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .left-bottom {
            grid-column: 1 / 2;
            padding: 10px;
            background-color: #f2f2f2;
            border: 1px solid black;
            min-height: max-content;

            -webkit-animation: slide-in-left 0.7s
              cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s both;
            animation: slide-in-left 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)
              0.4s both;
          }

          .left-bottom button {
            width: 100%;
          }

          .rt-name {
            position: absolute;
            color: black;
            left: 10px;
            top: 0;
            text-align: left;
          }

          .rt-name p {
            padding-right: 5px;
            line-height: 1.6em;
          }

          .rt-name:hover {
            color: white;
            transition-duration: 0.3s;
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
            transition-duration: 0.3s;
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
            background: black;
            color: white;
            border: 1px solid black;
            padding: 10px 20px;
            position: absolute;
            left: 10px;
            top: 10px;
            right: 10px;
            bottom: 10px;
            text-align: center;
            cursor: pointer;
            text-transform: lowercase;
            font-weight: 500;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .button :hover {
            background: black;
            color: white;
            transition-duration: 0.3s;
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

        @media (min-width: 900px) {
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

            background-size: cover;
            min-height: 30vh;
          }

          .right-top {
            grid-column: 4 / 6;
            position: relative;
            padding: 10px;
            cursor: pointer;
            background-color: #ffd506;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 90%;
            -webkit-animation: slide-in-right 0.7s
              cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s both;
            animation: slide-in-right 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)
              0.3s both;
          }

          .right-top:hover {
            background: grey;
            transition-duration: 0.3s;
          }

          .left-bottom {
            grid-column: 1 / 3;
            position: relative;
            background-color: #f2f2f2;
            width: 100%;
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
            background: rgb(255, 255, 255);
            background-image: url(${brimage});
            background-size: cover;
            min-height: 30vh;
          }

          .image {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .rt-name {
            position: absolute;
            color: black;
            left: 20px;
            top: 10px;
            font-size: 24px;
            line-height: 1.3em;
          }

          .rt-name:hover {
            color: white;
            transition-duration: 0.3s;
          }

          .rt-name p {
            font-size: 18px;
            padding-right: 5px;
            line-height: 1.6em;
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
            transition-duration: 0.3s;
          }

          h1:hover {
            color: ${COLOR_YELLOW};
            transition-duration: 0.3s;
          }

          .programme-container {
            background: black;
            border: 1px solid black;
            margin-left: 10px;
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
            transition-duration: 0.3s;
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
