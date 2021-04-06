import { GetStaticProps } from "next";
import Head from "next/head";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import ProgrammesList from "../components/ProgrammesList";
import config from "../lib/config";
import { ProgrammeContent, fetchProgrammesContent } from "../lib/programmes";
import meta from "../../config.json";

type Props = {
  programmes: ProgrammeContent[];
  language: any;
};

export default function Index({ programmes, language }: Props) {
  const url = "/programme";
  const title = "Programme";

  return (
    <div>
      <BasicMeta
        url={url}
        title={title}
        description={meta.programme_description_fr}
      />
      <OpenGraphMeta
        url={url}
        title={title}
        description={meta.programme_description_fr}
      />
      <TwitterCardMeta
        url={url}
        title={title}
        description={meta.programme_description_fr}
      />
      <ProgrammesList programmes={programmes} />
    </div>
  );
}

export const getStaticProps = async (context) => {
  const { locale } = context;
  const programmes = fetchProgrammesContent(locale);
  const language = locale || null;
  return {
    props: {
      programmes,
      language,
    },
  };
};
