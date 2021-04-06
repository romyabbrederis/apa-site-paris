import { GetStaticProps } from "next";
import Head from "next/head";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import { fetchLegales } from "../lib/legales";
import Contact from "../components/pages/Contact";
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import Legales from "../components/pages/Legales";

const components = { Legales };

export default function Index({ mdxSource }: any) {
  const url = "/legales";
  const title = "Mentiones Legales";

  const content = hydrate(mdxSource, { components });
  console.log("content", content);

  return (
    <div>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      {content ? <Legales content={content} /> : null}
    </div>
  );
}

export const getStaticProps = async (context) => {
  const data = fetchLegales();
  const mdxSource = await renderToString(data.content, { components });
  return {
    props: {
      mdxSource,
    },
  };
};
