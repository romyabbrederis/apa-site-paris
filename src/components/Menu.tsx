import { getMenu } from "../lib/menus";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { COLOR_YELLOW } from "../../public/styles/general";
import Image from "next/image";

export default function Menu() {
  const menus = getMenu("fr");
  const router = useRouter();
  const { pathname } = router;
  const [mobileDevice, setMobilDevice] = useState<boolean>();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const [page, setPage] = useState<string>();

  useEffect(() => {
    setPage(pathname.substring(1));
  }, [pathname]);

  useEffect(() => {
    const windowSize = window.matchMedia("(max-width: 800px)");
    setMobilDevice(windowSize.matches);
    window.addEventListener("resize", function () {
      setMobilDevice(windowSize.matches);
    });
  }, []);

  const mobileMenu = (
    <div className={"mobile-container"}>
      <div className={"top-part"}>
        <Link href={"/"}>
          <a>
            <img
              className={"mobile-logo-menu"}
              src={"/logo.png"}
              onClick={() => setMenuOpen(false)}
            />
          </a>
        </Link>
        <img
          className={"close-icon"}
          src="/icons/close.png"
          onClick={() => setMenuOpen(false)}
        />
      </div>

      {menus.map((item, i) => (
        <Link href={item.slug} key={i}>
          <a className={"border-box"} onClick={() => setMenuOpen(false)}>
            {item.name}
          </a>
        </Link>
      ))}
      <div className="social-media">
        <a
          href="https://www.facebook.com/Pour-lart-pour-lAfrique-112508294214218"
          target="_blank"
        >
          <img src="/icons/facebook.png" alt="facebook" className="icons" />
        </a>
        <a
          href="https://www.instagram.com/pourlartpourlafrique/"
          target="_blank"
        >
          <img src="/icons/instagram.png" alt="instagram" className="icons" />
        </a>
      </div>
      <style jsx>{`
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

        @-webkit-keyframes fade-in-top {
          0% {
            -webkit-transform: translateY(-50px);
            transform: translateY(-50px);
            opacity: 0;
          }
          100% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes fade-in-top {
          0% {
            -webkit-transform: translateY(-50px);
            transform: translateY(-50px);
            opacity: 0;
          }
          100% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
            opacity: 1;
          }
        }
        .icons {
          width: 20px;
          margin: 5px;
        }

        .social-media {
          margin: 10px 0;
          display: flex;
          justify-content: center;
        }

        .mobile-container {
          background: #ffd506;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 11;
          min-height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-top: 30px;
          -webkit-animation: slide-in-right 0.5s
            cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
          animation: slide-in-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            both;
        }

        .border-box {
          color: black;
          border: 2px solid black;
          padding: 30px 0;
          text-align: center;
          margin: 5px 0;
          -webkit-animation: fade-in-top 0.2s
            cubic-bezier(0.39, 0.575, 0.565, 1) 0.6s both;
          animation: fade-in-top 0.2s cubic-bezier(0.39, 0.575, 0.565, 1) 0.6s
            both;
          text-transform: uppercase;
          color: black;
          letter-spacing: 2px;
          font-weight: 600;
        }

        .close-icon {
          width: 30px;
          position: fixed;
          top: 10px;
          right: 10px;
        }

        .mobile-logo-menu {
          position: fixed;
          z-index: 13;
          top: 0;
          width: 120px;
          background: white;
        }

        .top-part {
          background: white;
          position: fixed;
          z-index: 13;
          top: 0;
          left: 0;
          right: 0;
          height: 60px;
          width: 100%;
        }
      `}</style>
    </div>
  );

  return (
    <div>
      {menuOpen ? mobileMenu : null}
      <div className={"container"}>
        <Link href="/">
          <a>
            <img className={"logo"} src={"/logo.png"} alt="logo" />
          </a>
        </Link>
        {mobileDevice ? (
          <>
            <h4 className={"menu-title"}>
              {pathname.split("/")[1].toUpperCase()}
            </h4>
            <img
              className={"burger"}
              src="/icons/menu.png"
              onClick={() => setMenuOpen(true)}
            />
          </>
        ) : (
          <>
            {menus.map((item, i) => (
              <Link key={item.slug} href={item.slug}>
                <a
                  className={
                    pathname.split("/")[1] ===
                    item.name.replace(/\s+/g, "-").toLowerCase()
                      ? "current-menu"
                      : "non-current-menu"
                  }
                >
                  {item.name}
                </a>
              </Link>
            ))}

            <a
              href="https://www.facebook.com/Pour-lart-pour-lAfrique-112508294214218"
              target="_blank"
            >
              <img src="/icons/facebook.png" alt="facebook" className="icons" />
            </a>
            <a
              href="https://www.instagram.com/pourlartpourlafrique/"
              target="_blank"
            >
              <img
                src="/icons/instagram.png"
                alt="instagram"
                className="icons"
              />
            </a>
          </>
        )}
      </div>
      <style jsx>{`
        .icons {
          width: 20px;
        }

        @media (max-width: 800px) {
          .menu-title {
            position: fixed;
            top: -5px;
            right: 80px;
            color: #ffd506;
          }

          .burger {
            position: fixed;
            right: 10px;
            top: 10px;
            visibility: visible;
            width: 50px;
          }

          .logo {
            width: 120px;
            position: fixed;
            left: 0;
            top: -3px;
            cursor: pointer;
          }

          .container {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            margin: 0 auto;
            padding: 10px 0;
            width: 100%;
            height: 35px;
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            background: white;
            z-index: 10;
          }

          .current-menu {
            color: ${COLOR_YELLOW};
            border-bottom: 3px solid ${COLOR_YELLOW};
            padding-bottom: 3px;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: 500;
            font-size: 14px;
          }

          .non-current-menu {
            border-bottom: 3px solid white;
            text-transform: uppercase;
            color: black;
            letter-spacing: 2px;
            font-weight: 500;
            font-size: 14px;
          }
        }

        @media (min-width: 769px) {
          .container {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            margin: 0 auto;
            padding: 10px 0;
            width: 100%;
            height: 5vh;
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            background: white;
            z-index: 10;
          }

          .current-menu {
            color: ${COLOR_YELLOW};
            border-bottom: 3px solid ${COLOR_YELLOW};
            padding-bottom: 3px;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: 500;
            font-size: 14px;
          }

          .non-current-menu {
            border-bottom: 3px solid white;
            text-transform: uppercase;
            color: black;
            letter-spacing: 2px;
            font-weight: 600;
            font-size: 14px;
          }

          .logo {
            width: 150px;
          }
        }
      `}</style>
    </div>
  );
}
