import { GetStaticProps } from "next";
import Head from "next/head";
import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import OpenGraphMeta from "../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../components/meta/TwitterCardMeta";
import CalendarList from "../../components/CalendarList";
import config from "../../lib/config";
import {
  CalendarContent,
  fetchProgrammesContent,
  findCalendarContent,
} from "../../lib/programmes";

type Props = {
  events: CalendarContent[];
  language: any;
};

export default function Index({ events, language }: Props) {
  const url = "/calendrier";
  const title = "Calendrier";

  console.log("events", events, language);
  return (
    <div>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <CalendarList events={events} />
    </div>
  );
}

export const getStaticProps = async (context) => {
  const { locale } = context;
  const programmes = fetchProgrammesContent("en");
  const events = findCalendarContent(programmes);
  const language = locale || null;
  return {
    props: {
      events,
      language,
    },
  };
};
