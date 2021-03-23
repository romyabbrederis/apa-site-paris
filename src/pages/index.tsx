import { GetStaticProps } from "next";
import Head from "next/head";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import Home from "../components/Home";
import config from "../lib/config";
import { HomeContent, getHomePage } from "../lib/homes";
import { ProgrammeContent, fetchProgrammeContent } from "../lib/programmes";

type Props = {
  data: HomeContent;
  programme: ProgrammeContent;
  language: any;
};

export default function Index({ data, programme, language }: Props) {
  const url = "/";
  const title = "Home";

  console.log("data", data, programme, language);
  return (
    <div>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <Home data={data} programme={programme} />
    </div>
  );
}

export const getStaticProps = async (context) => {
  const { locale } = context;
  const programme = fetchProgrammeContent("fr")[0];
  const data = getHomePage("fr");
  const language = locale || null;
  return {
    props: {
      data,
      programme,
      language,
    },
  };
};
