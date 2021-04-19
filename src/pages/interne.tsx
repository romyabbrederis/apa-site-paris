import { copyFile } from "fs";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useState } from "react";
import galleries from "../../meta/galleries.yml";
import { fetchArticlesContent } from "../lib/articles";
import { fetchProgrammesContent } from "../lib/programmes";

export default function Index({ articles, programmes }: any) {
  const [copy, setCopy] = useState();
  return (
    <div className={"layout-container"}>
      <Head>
        <meta name="googlebot" content="noindex" />
      </Head>

      <div className={"inner-container"}>
        <div className={"interne"}>
          <h1>Galeries</h1>
          {galleries.galleries
            ? galleries.galleries.map((item) => (
                <div className={"box"}>
                  <div>
                    <a
                      className={"title"}
                      onClick={() => {
                        navigator.clipboard.writeText(item.name) &&
                          setCopy(item.name);
                      }}
                    >
                      Name: {item.name}
                      {copy === item.name ? (
                        <span>Copied!</span>
                      ) : (
                        <img src={"../icons/copy.png"} />
                      )}
                    </a>
                  </div>
                  <div>
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
                </div>
              ))
            : null}
          <hr />
          <h1>Artistes / Blog Posts</h1>
          {articles
            ? articles.map((item) => (
                <div className={"box"}>
                  <div>
                    <a
                      className={"title"}
                      onClick={() => {
                        navigator.clipboard.writeText(item.title) &&
                          setCopy(item.title);
                      }}
                    >
                      Title: {item.title}
                      {copy === item.title ? (
                        <span>Copied!</span>
                      ) : (
                        <img src={"../icons/copy.png"} />
                      )}
                    </a>
                  </div>
                  <div>
                    <a
                      onClick={() => {
                        navigator.clipboard.writeText(item.slug) &&
                          setCopy(item.slug);
                      }}
                    >
                      Slug: {item.slug}
                      {copy === item.slug ? (
                        <span>Copied!</span>
                      ) : (
                        <img src={"../icons/copy.png"} />
                      )}
                    </a>
                  </div>
                </div>
              ))
            : null}
          <hr />
          <h1>Programmes</h1>
          {programmes
            ? programmes.map((item) => (
                <div className={"box"}>
                  <div>
                    <a
                      className={"title"}
                      onClick={() => {
                        navigator.clipboard.writeText(item.title) &&
                          setCopy(item.title);
                      }}
                    >
                      Title: {item.title}
                      {copy === item.title ? (
                        <span>Copied!</span>
                      ) : (
                        <img src={"../icons/copy.png"} />
                      )}
                    </a>
                  </div>
                  <div>
                    <a
                      onClick={() => {
                        navigator.clipboard.writeText(item.slug) &&
                          setCopy(item.slug);
                      }}
                    >
                      Slug: {item.slug}
                      {copy === item.slug ? (
                        <span>Copied!</span>
                      ) : (
                        <img src={"../icons/copy.png"} />
                      )}
                    </a>
                  </div>
                </div>
              ))
            : null}
          <style jsx>{`
            .interne {
              text-align: center;
              line-height: 1em;
            }

            .box {
              line-height: 2em;
              margin-bottom: 20px;
            }

            .title {
              font-weight: 500;
              text-align: left;
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

export const getStaticProps = async (context) => {
  const { locale } = context;
  const articles = fetchArticlesContent("fr");
  const programmes = fetchProgrammesContent("fr");

  return {
    props: {
      articles,
      programmes,
    },
  };
};
