import { GetStaticProps } from "next";
import Head from "next/head";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import Home from "../components/pages/Home";
import config from "../lib/config";
import { HomeContent, getHomePage } from "../lib/homes";
import { ProgrammeContent, fetchProgrammesContent } from "../lib/programmes";
import { useEffect } from "react";
import Newsletter from "../components/Newsletter";
import meta from "../../config.json";

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

  const description =
    "L’association Pour l’art pour l’Afrique vous propose de découvrir l’art contemporain d’Afrique à Paris et en Île-de-France du 6 au 29 mai 2021.";
  return (
    <div>
      <BasicMeta
        url={url}
        title={title}
        description={meta.home_description_fr}
      />
      <OpenGraphMeta
        url={url}
        title={title}
        description={meta.home_description_fr}
      />
      <TwitterCardMeta
        url={url}
        title={title}
        description={meta.home_description_fr}
      />
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
