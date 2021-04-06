import { GetStaticProps } from "next";
import Head from "next/head";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import Home from "../components/Home";
import config from "../lib/config";
import { HomeContent, getHomePage } from "../lib/homes";
import { ProgrammeContent, fetchProgrammesContent } from "../lib/programmes";
import { useEffect } from "react";
import Newsletter from "../components/Newsletter";

type Props = {
  data: HomeContent;
  programmes: any;
  language: any;
  mailchimp: string;
};

export default function Index({
  data,
  programmes,
  language,
  mailchimp,
}: Props) {
  const url = "/";
  const title = "Home";

  console.log("data", data, programmes, language);
  return (
    <div>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <Home data={data} programmes={programmes} />
      <Newsletter mailchimp={mailchimp} />
    </div>
  );
}

export const getStaticProps = async (context) => {
  const { locale } = context;
  const programmes = fetchProgrammesContent(locale).slice(0, 3) || {};
  const data = getHomePage(locale) || null;
  const language = locale || null;
  const mailchimp = process.env.MAILCHIMP;
  return {
    props: {
      data,
      programmes,
      language,
      mailchimp,
    },
  };
};
