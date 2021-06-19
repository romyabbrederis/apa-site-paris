import React, { useState, useEffect } from "react";
import { ArticleContent } from "../lib/articles";
import Link from "next/link";
import { useRouter } from "next/router";
import { COLOR_GREY } from "../../public/styles/general";
import ActionButton from "./ActionButton";
import { getSlug } from "../lib/galleries";
import { fetchProgrammeContent } from "../lib/programmes";
import Image from "next/image";

type Props = {
  article: any;
  content: any;
};

export default function Article({ article, content }: Props): any {
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
            <a key={item.galleries} target="_blank">
              <p>{item.galleries} </p>
            </a>
          ))
        : null}
      <hr />
      <Link href={"/programme/" + article.programme}>
        <a>
          <p>
            Program associe
            <img src={"/icons/external-link.png"} className={"icon-image"} />
          </p>
        </a>
      </Link>
      <hr />
      <style jsx>{`
        .icon-image {
          width: 25px;
          margin-left: 10px;
        }
      `}</style>
    </>
  );

  return article && article.title ? (
    <div className={"layout-container"}>
      <div className={"inner-container"}>
        <article className={"article"}>
          <div />
          <div>
            <div className={"article-title-image"}>
              <img src={article.image} className={"article-title-image"} />
              {article.imageCredit ? (
                <p className={"image-credit"}>{article.imageCredit}</p>
              ) : (
                ""
              )}
            </div>
            {mobileDevice ? null : ArticleInfo}
          </div>
          <div className={"article-text-container"}>
            <div className={"article-text-inner "}>
              <h1>{article.title}</h1>
              <p>{content}</p>
              {article.artistLink ? (
                <div className={"link-artist"}>
                  <ActionButton
                    title={
                      article.artistLinkName ? article.artistLinkName : "Lien"
                    }
                    url={article.artistLink}
                    type="external"
                  />
                </div>
              ) : null}

              <div key={article.creditOne} className={"article-image"}>
                {article.articleImgOne && (
                  <img src={article.articleImgOne} alt={article.creditOne} />
                )}
                {article.creditOne && <p>{article.creditOne}</p>}
              </div>

              <div key={article.creditOne} className={"article-image"}>
                {article.articleImgTwo && (
                  <img src={article.articleImgTwo} alt={article.creditTwo} />
                )}
                {article.creditTwo && <p>{article.creditTwo}</p>}
              </div>

              {mobileDevice ? ArticleInfo : null}
            </div>
          </div>
          <div />
        </article>
      </div>
      <style jsx>{`
        .link-artist {
          margin: 30px 0;
        }
        .image-credit {
          font-style: italic;
          text-align: center;
        }

        @media (max-width: 769px) {
          .article {
            margin-bottom: 50px;
          }

          .article-title-image {
            width: 100%;
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

          .icon {
            width: 25px;
            margin-right: 10px;
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
            width: 100%;
            margin-top: 30px;
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

          .icon {
            width: 25px;
            margin-right: 10px;
          }
        }
      `}</style>
    </div>
  ) : null;
}
