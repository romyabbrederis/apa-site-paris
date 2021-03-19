import { getMenu } from "../lib/menus";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useWindowSize } from "../utils/useWindowSize";
import { useRouter } from "next/router";
import { COLOR_YELLOW } from "../../public/styles/general";

export default function Menu() {
  const menus = getMenu("fr");
  const size = useWindowSize();
  const router = useRouter();
  const { pathname } = router;
  const [width, setWidth] = useState<number>();
  const [page, setPage] = useState<string>();

  console.log("size", size, page);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    setPage(pathname.substring(1));
  }, [pathname]);

  return (
    <div className={"container"}>
      <img src={"./logo.png"} className={"logo"} />
      {width > 768 ? (
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
      ) : (
        <img className={"burger"} src="./icons/menu.png" />
      )}

      <style jsx>{`
        .container {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          margin: 0 auto;
          padding: 10px 0;
          width: 100%;
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
            width: 150px;
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
