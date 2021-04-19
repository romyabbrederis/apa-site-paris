import { GetStaticProps } from "next";
import Head from "next/head";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import { ContactContent, getContactPage } from "../lib/contacts";
import Contact from "../components/pages/Contact";
import meta from "../../config.json";

type Props = {
  data: ContactContent;
  language: any;
};

export default function Index({ data, language }: Props) {
  const url = "/contact";
  const title = data.title;

  return (
    <div>
      <BasicMeta
        url={url}
        title={title}
        description={meta.contact_description_fr}
      />
      <OpenGraphMeta
        url={url}
        title={title}
        description={meta.contact_description_fr}
      />
      <TwitterCardMeta
        url={url}
        title={title}
        description={meta.contact_description_fr}
      />
      <Contact data={data} />
    </div>
  );
}

export const getStaticProps = async (context) => {
  const { locale } = context;
  const data = getContactPage(locale);
  const language = locale || null;
  return {
    props: {
      data,
      language,
    },
  };
};
