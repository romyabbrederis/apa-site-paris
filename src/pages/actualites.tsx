import { GetStaticProps } from "next";
import Head from "next/head";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import ArticleList from "../components/ArticleList";
import config from "../lib/config";
import { ArticleContent, fetchArticlesContent } from "../lib/articles";

type Props = {
  articles: ArticleContent[];
  language: any;
};

export default function Index({ articles, language }: Props) {
  const url = "/actualites";
  const title = "Actualités";

  console.log("articles", articles, language)
  return (
    <div>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <h1>{title}</h1>
      <ArticleList articles={articles} />
    </div>
  );
}

export const getStaticProps = async (context) => {
  const { locale } = context;

  const articles = fetchArticlesContent('fr')
  const language = locale || null;
  return {
    props: {
      articles,
      language
    },
  };
};
