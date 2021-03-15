import { GetStaticProps } from "next";
import Head from "next/head";
import BasicMeta from "../../../components/meta/BasicMeta";
import OpenGraphMeta from "../../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../../components/meta/TwitterCardMeta";
import ProgrammesList from "../../../components/ProgrammesList";
import config from "../../../lib/config";
import { ProgrammeContent, fetchProgrammeContent } from "../../../lib/programmes";

type Props = {
  programmes: ProgrammeContent[];
  language: any;
};

export default function Index({ programmes, language }: Props) {
  const url = "/programme";
  const title = "Programme";

  console.log("programmes", programmes, language)
  return (
    <div>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <ProgrammesList programmes={programmes} />
    </div>
  );
}

export const getStaticProps = async (context) => {
  const { locale } = context;

  const programmes = fetchProgrammeContent('fr')
  const language = locale || null;
  return {
    props: {
      programmes,
      language
    },
  };
};
