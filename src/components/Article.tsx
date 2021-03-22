import React from "react";
import { ArticleContent } from "../lib/articles";
import Link from "next/link";
import { useRouter } from "next/router";
import { COLOR_GREY } from "../../public/styles/general";

type Props = {
  article: ArticleContent;
};

export default function Article({ article }: Props): any {
  console.log("article", article);
  return article ? (
    <div className={"layout-container"} style={{ backgroundColor: COLOR_GREY }}>
      <div className={"inner-container"}>
        <div className={"article"}>
          <div />
          <img src={article.image} className={"article-title-image"} />
          <div className={"article-text-container"}>
            <div className={"article-text-inner "}>
              <h2>{article.title}</h2>
              <p>{article.content}</p>
            </div>
          </div>
          <div />
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 769px) {
          .article {
            overflow: scroll;
          }

          .article-title-image {
            width: 100%;
            object-fit: contain;
          }

          .article-text-container {
            background: white;

            border: 1px solid black;
            padding: 10px;
          }

          .article-text-inner {
            overflow: scroll;
            height: 90vh;
            background: white;
          }
        }

        @media (min-width: 769px) {
          .article {
            display: grid;
            grid-template-columns: auto 500px 500px auto;
            grid-gap: 10px;
            overflow: hidden;
          }

          .article-title-image {
            overflow: hidden;
            height: 90vh;
            width: 100%;
            object-fit: contain;
          }

          .article-text-container {
            overflow: hidden;
            height: 90vh;
            background: white;
            border: 1px solid black;
            padding: 10px;
          }

          .article-text-inner {
            overflow: scroll;
            height: 90vh;
            background: white;
          }
        }
      `}</style>
    </div>
  ) : (
    <h1>no article</h1>
  );
}
