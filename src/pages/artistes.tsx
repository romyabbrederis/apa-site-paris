import { GetStaticProps } from "next";
import Head from "next/head";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import ArticleList from "../components/ArticleList";
import config from "../lib/config";
import { ArticleContent, fetchArticlesContent } from "../lib/articles";
import meta from "../../config.json";

type Props = {
  articles: ArticleContent[];
  language: any;
};

export default function Index({ articles, language }: Props) {
  const url = "/artistes";
  const title = "Artistes";

  return (
    <div>
      <BasicMeta
        url={url}
        title={title}
        description={meta.calendrier_description_fr}
      />
      <OpenGraphMeta
        url={url}
        title={title}
        description={meta.calendrier_description_fr}
      />
      <TwitterCardMeta
        url={url}
        title={title}
        description={meta.calendrier_description_fr}
      />
      <ArticleList articles={articles} />
    </div>
  );
}

export const getStaticProps = async (context) => {
  const { locale } = context;

  const articles = fetchArticlesContent(locale);
  const language = locale || null;
  return {
    props: {
      articles,
      language,
    },
  };
};
