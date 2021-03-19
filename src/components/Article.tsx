import React from "react";
import { ArticleContent } from "../lib/articles";
import Link from "next/link"
import { useRouter } from 'next/router'

type Props = {
  article: ArticleContent;
};

export default function Article({ article }:  Props): any {
  console.log('article', article)
  return article ? 
    <div className={"container"}>
      <div className={"article"}>
      <img src={article.image}/>
        <ul>
          <li>
              {article.title}
            </li>
            <p>
              {article.content}
            </p>
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
        .article {
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;
        }
      `}</style>
    </div>
    : <h1>no article</h1>
}
