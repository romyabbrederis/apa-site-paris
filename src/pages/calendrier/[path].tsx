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
import { findEventDetails } from "../../lib/galleries";
import { useEffect } from "react";
import CalendarSelected from "../../components/CalendarSelected";

type Props = {
  event: any;
  language: any;
  params: any;
};

export default function Index({ event }: Props) {
  const router = useRouter();
  const { path } = router.query;
  const url = "/actualites/" + path;
  const title = event.title;

  console.log("event", event, title);
  return (
    <div>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      {event ? <CalendarSelected event={event} /> : null}
    </div>
  );
}

export async function getStaticPaths() {
  const programmes = fetchProgrammesContent("fr");
  const paths = programmes.map((item) => ({
    params: { path: item.slug },
  }));
  return { paths, fallback: false };
}

export const getStaticProps = async ({ params, locale }) => {
  const event = fetchProgrammeContent(params.path, "fr");
  const language = locale || null;
  return {
    props: {
      event,
      language,
      params,
    },
  };
};
