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
};

export default function Index({ data, programmes, language }: Props) {
  const url = "/";
  const title = "Home";

  function minimumWaitingTime() {
    const queries = [2, 1, 1, 1];

    queries.sort((a, b) => a - b);

    let totalTime = queries[0];
    let adding = queries[0];

    const newArray = queries.slice(1, queries.length);

    newArray.map((item, index) => {
      if (index === newArray.length - 1) {
        totalTime += item;
      } else {
        let newTime = item + queries[0];
        totalTime += newTime;
      }
    });
    console.log(totalTime);
    return totalTime;
  }

  useEffect(() => {
    minimumWaitingTime();
  }, []);

  console.log("data", data, programmes, language);
  return (
    <div>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <Home data={data} programmes={programmes} />
      <Newsletter />
    </div>
  );
}

export const getStaticProps = async (context) => {
  const { locale } = context;
  const programmes = fetchProgrammesContent("fr").slice(0, 3) || {};
  const data = getHomePage("fr") || null;
  const language = locale || null;
  return {
    props: {
      data,
      programmes,
      language,
    },
  };
};
