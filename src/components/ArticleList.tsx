import React, { useEffect } from "react";
import { ArticleContent } from "../lib/articles";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  articles: ArticleContent[];
};

export default function ArticlesList({ articles }: Props): any {
  const router = useRouter();
  const { pathname } = router;

  return articles.length ? (
    <div className={"container"}>
      <div className={"articles"}>
        <ul className={"articles-list"}>
          {articles.map((item, i) => (
            <li key={i}>
              <Link href={pathname + "/" + item.slug}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          margin: 0 auto;
          max-width: 1200px;
          width: 100%;
          padding: 0 1.5rem;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        li {
          list-style: none;
        }
        .articles {
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;
        }
        .articles li {
          margin-bottom: 1.5rem;
        }
        .articles-list {
          flex: 1 0 auto;
        }
        }
      `}</style>
    </div>
  ) : (
    <h1>no programm</h1>
  );
}
