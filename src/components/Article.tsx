import React from "react";
import { ArticleContent } from "../lib/articles";
import Link from "next/link";
import { useRouter } from "next/router";
import { COLOR_GREY } from "../../public/styles/general";

type Props = {
  article: ArticleContent;
  content: any;
};

export default function Article({ article, content }: Props): any {
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
              <p>{content}</p>
            </div>
          </div>
          <div />
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 769px) {
          .article {
          }

          .article-title-image {
            width: 100%;
            object-fit: contain;
          }

          .article-text-container {
            background: white;
            border: 1px solid black;
            padding: 10px 10px 100px 10px;
            overflow: hidden;
          }

          .article-text-inner {
            background: white;
          }
        }

        @media (min-width: 769px) {
          .article {
            display: grid;
            grid-template-columns: auto 40% minmax(400px, 600px) auto;
            grid-gap: 10px;
            overflow: hidden;
            height: 100vh;
            position: fixed;
            top: 100px;
          }

          .article-title-image {
            overflow: hidden;
            height: 90vh;
            width: 100%;
            object-fit: contain;
          }

          .article-text-container {
            overflow: hidden;
            height: 80vh;
            background: white;
            overflow: scroll;
            border: 1px solid black;
            padding: 10px;
          }

          .article-text-inner {
            overflow: scroll;
            background: white;
          }
        }
      `}</style>
    </div>
  ) : (
    <h1>no article</h1>
  );
}
