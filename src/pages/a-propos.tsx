import { GetStaticProps } from "next";
import Head from "next/head";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import { AboutContent, getAboutPage } from "../lib/abouts";
import About from "../components/pages/About";
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import meta from "../../config.json";

type Props = {
  data: AboutContent;
  mdxSource: any;
  language: any;
};

const components = { About };

export default function Index({ data, mdxSource, language }: Props) {
  const url = "/a-propos";
  const title = data.title;

  console.log("data", data);

  const content = hydrate(mdxSource, { components });

  return (
    <div>
      <BasicMeta
        url={url}
        title={title}
        description={meta.apropos_description_fr}
      />
      <OpenGraphMeta
        url={url}
        title={title}
        description={meta.apropos_description_fr}
      />
      <TwitterCardMeta
        url={url}
        title={title}
        description={meta.apropos_description_fr}
      />
      <About data={data} content={content} />
    </div>
  );
}

export const getStaticProps = async (context) => {
  const { locale } = context;
  const data = getAboutPage(locale);
  const mdxSource = await renderToString(data.text, { components });
  const language = locale || null;
  return {
    props: {
      data,
      mdxSource,
      language,
    },
  };
};
