import { copyFile } from "fs";
import { GetStaticProps } from "next";
import { useState } from "react";
import galleries from "../../meta/galleries.yml";

export default function Index({}: any) {
  const [copy, setCopy] = useState();

  console.log("galleries", galleries.galleries);
  return (
    <div className={"layout-container"}>
      <div className={"inner-container"}>
        <div className={"interne"}>
          {galleries.galleries
            ? galleries.galleries.map((item) => (
                <div className={"box"}>
                  <p>Name: {item.name}</p>
                  <a
                    onClick={() => {
                      navigator.clipboard.writeText(item.slug) &&
                        setCopy(item.slug);
                    }}
                  >
                    Slug: {item.name}
                    {copy === item.slug ? (
                      <span>Copied!</span>
                    ) : (
                      <img src={"../icons/copy.png"} />
                    )}
                  </a>
                </div>
              ))
            : null}
          <style jsx>{`
            .interne {
              text-align: center;
              line-height: 1em;
            }

            .box {
              text-align: center;
              line-height: 1em;
            }

            .box img {
              cursor: pointer;
              width: 20px;
              margin-left: 10px;
            }

            .box span {
              color: green;
              margin-left: 10px;
              font-weight: 700;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}
