import { GetStaticProps } from "next";
import Head from "next/head";
import BasicMeta from "../../components/meta/BasicMeta";
import OpenGraphMeta from "../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../components/meta/TwitterCardMeta";
import { AboutContent, getAboutPage } from "../../lib/abouts";
import About from "../../components/pages/About"

type Props = {
  data: AboutContent;
  language: any;
};

export default function Index({ data, language }: Props) {
  const url = "/en/about";
  const title = "Aabout";

  console.log("data", data, language)
  return (
    <div>        
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <About title={title} data={data} />
    </div>
  );
}

export const getStaticProps = async (context) => {
  const { locale } = context;
  const data = getAboutPage('en')
  const language = locale || null;
  return {
    props: {
      data,
      language
    },
  };
};
