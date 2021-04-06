import { useRouter } from "next/router";
import { GetStaticPaths } from "next";
import Head from "next/head";
import BasicMeta from "../../components/meta/BasicMeta";
import OpenGraphMeta from "../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../components/meta/TwitterCardMeta";
import config from "../../lib/config";
import {
  ProgrammeContent,
  fetchProgrammesContent,
  fetchProgrammeContent,
} from "../../lib/programmes";
import { useEffect } from "react";
import ProgrammeSelected from "../../components/ProgrammeSelected";

type Props = {
  programme: ProgrammeContent;
  language: any;
  params: any;
};

export default function Index({ programme, language, params }: Props) {
  const router = useRouter();
  const { path } = router.query;
  const url = "/actualites/" + path;
  const title = programme.title;

  console.log("programme", programme, language, params, title);
  return (
    <div>
      <BasicMeta url={url} title={title} description={programme.intro} />
      <OpenGraphMeta url={url} title={title} description={programme.intro} />
      <TwitterCardMeta url={url} title={title} description={programme.intro} />
      {programme ? <ProgrammeSelected programme={programme} /> : null}
    </div>
  );
}

export async function getStaticPaths({ locale }) {
  const programmes = fetchProgrammesContent(locale);
  const paths = programmes.map((item) => ({
    params: { path: item.slug },
  }));
  return { paths, fallback: false };
}

export const getStaticProps = async ({ params, locale }) => {
  const programme = fetchProgrammeContent(params.path, locale);
  const language = locale || null;
  return {
    props: {
      programme,
      language,
      params,
    },
  };
};
