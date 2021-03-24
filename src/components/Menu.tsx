import { getMenu } from "../lib/menus";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { COLOR_YELLOW } from "../../public/styles/general";

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
    const windowSize = window.matchMedia("(max-width: 769px)");
    setMobilDevice(windowSize.matches);
    window.addEventListener("resize", function () {
      setMobilDevice(windowSize.matches);
    });
  }, []);

  console.log("mobile", mobileDevice);

  const mobileMenu = (
    <div className={"mobile-container"}>
      <img
        src="../../icons/close.png"
        className={"close-icon"}
        onClick={() => setMenuOpen(false)}
      />
      {menus.map((item, i) => (
        <Link href={item.slug} key={i}>
          <a className={"border-box"} onClick={() => setMenuOpen(false)}>
            {item.name}
          </a>
        </Link>
      ))}
      <style jsx>{`
        .mobile-container {
          background: #ffd506;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 2;
          height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .border-box {
          color: black;
          border: 2px solid black;
          padding: 30px 0;
          text-align: center;
          margin: 5px 0;
        }

        .close-icon {
          width: 30px;
          position: fixed;
          top: 5px;
          right: 5px;
        }
      `}</style>
    </div>
  );

  return (
    <div>
      {menuOpen ? mobileMenu : null}
      <div className={"container"}>
        <Link href="/">
          <img src={"../../logo.png"} className={"logo"} />
        </Link>
        {mobileDevice ? (
          <img
            className={"burger"}
            src="./icons/menu.png"
            onClick={() => setMenuOpen(true)}
          />
        ) : (
          menus.map((item, i) => (
            <Link href={item.slug} key={i} className={"menu"}>
              <a
                className={
                  page === item.name.replace(/\s+/g, "-").toLowerCase()
                    ? "current-menu"
                    : ""
                }
              >
                {item.name}
              </a>
            </Link>
          ))
        )}
      </div>
      <style jsx>{`
        @media (max-width: 769px) {
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
            top: 0;
          }

          .container {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            margin: 0 auto;
            padding: 10px 0;
            width: 100%;
            height: 3vh;
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            background: white;
            z-index: 10;
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
          }

          .logo {
            width: 150px;
          }
        }
      `}</style>
    </div>
  );
}
