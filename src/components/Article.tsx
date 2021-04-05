import React, { useState, useEffect } from "react";
import { ArticleContent } from "../lib/articles";
import Link from "next/link";
import { useRouter } from "next/router";
import { COLOR_GREY } from "../../public/styles/general";
import ActionButton from "./ActionButton";
import { getSlug } from "../lib/galleries";
import { fetchProgrammeContent } from "../lib/programmes";

type Props = {
  article: any;
  content: any;
};

export default function Article({ article, content }: Props): any {
  console.log("article", article.programme.toString());
  const [mobileDevice, setMobilDevice] = useState<boolean>();

  useEffect(() => {
    const windowSize = window.matchMedia("(max-width: 640px)");
    setMobilDevice(windowSize.matches);
    window.addEventListener("resize", function () {
      setMobilDevice(windowSize.matches);
    });
  }, []);

  const ArticleInfo = (
    <>
      <hr />
      <h2>Galeries</h2>
      {article.galleries
        ? article.galleries.map((item) => (
            <a href={getSlug(item.galleries).website} target="_blank">
              <p>{item.galleries}</p>
            </a>
          ))
        : null}
      <hr />
      <h2>Program associe</h2>
      {article.programme}
      {/* <Link href="/">soon</Link> */}
      <hr />
    </>
  );

  return article && article.title ? (
    <div className={"layout-container"}>
      <div className={"inner-container"}>
        <div className={"article"}>
          <div />
          <div>
            <img src={article.image} className={"article-title-image"} />
            {mobileDevice ? null : ArticleInfo}
          </div>
          <div className={"article-text-container"}>
            <div className={"article-text-inner "}>
              <h1>{article.title}</h1>
              <p>{content}</p>
              {article.Images
                ? article.Images.map((item) => (
                    <div className={"article-image"}>
                      <img src={item.articleImg} alt={item.credit} />
                      <p>{item.credit}</p>
                    </div>
                  ))
                : null}
              {mobileDevice ? ArticleInfo : null}
            </div>
          </div>
          <div />
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 769px) {
          .article {
            margin-bottom: 50px;
          }

          .article-title-image {
            width: 100%;
            object-fit: contain;
          }

          .article-text-container {
            background: white;
            padding: 10px 10px 100px 10px;
            overflow: hidden;
          }

          .article-text-inner {
            background: white;
          }

          .article-image {
            width: 100%;
            padding: 50px 0;
            text-align: center;
            display: block;
          }

          .article-image p {
            line-height: 0em;
            font-style: italic;
            font-size: 14px;
          }

          .article-image img {
            width: 90%;
            object-fit: contain;
          }
        }

        @media (min-width: 769px) {
          .article {
            display: grid;
            grid-template-columns: auto minmax(40%, 400px) minmax(400px, 600px) auto;
            grid-gap: 30px;
            top: 100px;
            margin-bottom: 50px;
          }

          .article-title-image {
            overflow: hidden;
            width: 100%;
            object-fit: contain;
          }

          .article-image {
            width: 100%;
            padding: 50px 0;
            text-align: center;
            display: block;
          }

          .article-image p {
            line-height: 0em;
            font-style: italic;
            font-size: 14px;
          }

          .article-image img {
            object-fit: contain;
            width: 80%;
          }
        }
      `}</style>
    </div>
  ) : null;
}
