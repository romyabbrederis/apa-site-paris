import { GetStaticProps } from "next";
import Head from "next/head";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import ArticleList from "../components/ArticleList";
import config from "../lib/config";
import { HomeContent, getHomePage } from "../lib/home";

type Props = {
  data: HomeContent;
  language: any;
};

export default function Index({ data, language }: Props) {
  const url = "/actualites";
  const title = "Actualités";

  console.log("data", data, language);
  return (
    <div>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <Home data={data} />
    </div>
  );
}

export const getStaticProps = async (context) => {
  const { locale } = context;

  const data = getHomePage("fr");
  const language = locale || null;
  return {
    props: {
      data,
      language,
    },
  };
};
