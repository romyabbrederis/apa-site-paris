import React, { useEffect } from "react";
import { ArticleContent } from "../lib/articles";
import Link from "next/link";
import { useRouter } from "next/router";
import { COLOR_YELLOW } from "../../public/styles/general";
import { getLocale } from "../utils/localeChecker";
import Image from "next/image";

type Props = {
  articles: ArticleContent[];
};

export default function ArticlesList({ articles }: Props): any {
  return articles.length ? (
    <div
      className={"layout-container"}
      style={{ backgroundColor: COLOR_YELLOW }}
    >
      <div className={"inner-container"}>
        <div className={"articles-list"}>
          <div />
          {articles.map((item, i) => (
            <Link key={item.slug} href={"/actualites/" + item.slug}>
              <div key={i} className={"article"}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={"article-image"}
                />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.date}</p>
                  <p className={"text"}>
                    {item.intro.replace(/(([^\s]+\s+){20}).+/, "$1...")}
                  </p>
                </div>
              </div>
            </Link>
          ))}
          <div />
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 769px) {
          .articles-list {
            display: grid;
            grid-template-columns: 100%;
            grid-gap: 10px;
          }

          .article {
            background: white;
            border: 1px solid black;
            grid-gap: 5px;
            padding: 10px;
            height: 300px;
            cursor: pointer;
            line-height: 1em;
            overflow: hidden;
          }

          .article-image {
            width: 100%;
            object-fit: cover;
            height: 100px;
          }

          .text {
            text-overflow: ellipsis;
            width: 100%;
          }
        }

        @media (min-width: 769px) {
          .articles-list {
            display: grid;
            grid-template-columns: auto 500px 500px auto;
            grid-gap: 10px;
          }

          .article {
            background: white;
            border: 1px solid black;
            display: grid;
            grid-template-columns: 50% 50%;
            grid-gap: 5px;
            padding: 10px;
            height: 250px;
            cursor: pointer;
          }

          .article-image {
            width: 100%;
            object-fit: cover;
            height: 250px;
          }

          .text {
            width: 100%;
          }
        }
      `}</style>
    </div>
  ) : null;
}
