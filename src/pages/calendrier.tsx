import { GetStaticProps } from "next";
import Head from "next/head";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import CalendarList from "../components/CalendarList";
import config from "../lib/config";
import meta from "../../config.json";
import {
  CalendarContent,
  fetchProgrammesContent,
  findCalendarContent,
} from "../lib/programmes";

type Props = {
  events: CalendarContent[];
  language: any;
};

export default function Index({ events, language }: any) {
  const url = "/calendrier";
  const title = "Calendrier";

  console.log("events", events);
  return (
    <div>
      <BasicMeta
        url={url}
        title={title}
        description={meta.calendrier_description_fr}
      />
      <OpenGraphMeta
        url={url}
        title={title}
        description={meta.calendrier_description_fr}
      />
      <TwitterCardMeta
        url={url}
        title={title}
        description={meta.calendrier_description_fr}
      />
      <CalendarList events={events} />
    </div>
  );
}

export const getStaticProps = async (context) => {
  const { locale } = context;
  const programmes = fetchProgrammesContent("fr") || [];
  const events = findCalendarContent(programmes) || [];
  const language = locale || null;
  return {
    props: {
      events,
      language,
    },
  };
};
