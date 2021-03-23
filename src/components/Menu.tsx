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

  const [page, setPage] = useState<string>();

  useEffect(() => {
    setPage(pathname.substring(1));
  }, [pathname]);

  useEffect(() => {
    const windowSize = window.matchMedia("(max-width: 640px)");
    window.addEventListener("resize", function () {
      setMobilDevice(windowSize.matches);
    });
  }, []);

  console.log("mobile", mobileDevice);

  return (
    <div className={"container"}>
      <img src={"../../logo.png"} className={"logo"} />
      {mobileDevice ? (
        <img className={"burger"} src="./icons/menu.png" />
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

      <style jsx>{`
        .container {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          margin: 0 auto;
          padding: 10px 0;
          width: 100%;
          height: 5vh;
        }

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
        }

        @media (min-width: 769px) {
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
