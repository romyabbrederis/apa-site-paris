import { useRouter } from "next/router";
import { GetStaticPaths } from "next";
import Head from "next/head";
import BasicMeta from "../../../components/meta/BasicMeta";
import OpenGraphMeta from "../../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../../components/meta/TwitterCardMeta";
import Article from "../../../components/Article";
import config from "../../../lib/config";
import {
  ArticleContent,
  fetchArticlesContent,
  fetchArticleContent,
} from "../../../lib/articles";
import { useEffect } from "react";

type Props = {
  article: ArticleContent;
  language: any;
  params: any;
};

export default function Index({ article, language, params }: Props) {
  const router = useRouter();
  const { path } = router.query;
  const url = "/fr/actualites/" + path;
  const title = article.title;

  console.log("article", article, language, params, title);
  return (
    <div>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      {article ? <Article article={article} /> : null}
    </div>
  );
}

export async function getStaticPaths() {
  const articles = fetchArticlesContent("fr");
  const paths = articles.map((item) => ({
    params: { path: item.slug },
  }));
  return { paths, fallback: false };
}

export const getStaticProps = async ({ params, locale }) => {
  const article = fetchArticleContent(params.path, "fr");
  const language = locale || null;
  return {
    props: {
      article,
      language,
      params,
    },
  };
};
