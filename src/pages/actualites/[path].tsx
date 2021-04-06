import { useRouter } from "next/router";
import { GetStaticPaths } from "next";
import Head from "next/head";
import BasicMeta from "../../components/meta/BasicMeta";
import OpenGraphMeta from "../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../components/meta/TwitterCardMeta";
import Article from "../../components/Article";
import config from "../../lib/config";
import {
  ArticleContent,
  fetchArticlesContent,
  fetchArticleContent,
} from "../../lib/articles";
import { useEffect } from "react";
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";

type Props = {
  article: any;
  gal: any;
  mdxSource: any;
  language: any;
  params: any;
};

const components = { Article };

export default function Index({
  article,
  mdxSource,
  gal,
  language,
  params,
}: any) {
  const router = useRouter();
  const { path } = router.query;
  const url = "/actualites/" + path;
  const title = article.title;

  const content = hydrate(mdxSource, { components });

  console.log("article", article);
  return (
    <div>
      <BasicMeta
        url={url}
        title={title}
        description={article.intro + " | Galeries: " + gal.join(", ")}
        keywords={gal}
      />
      <OpenGraphMeta
        url={url}
        title={title}
        description={article.intro + " | Galeries: " + gal.join(", ")}
      />
      <TwitterCardMeta
        url={url}
        title={title}
        description={article.intro + " | Galeries: " + gal.join(", ")}
      />
      {article ? <Article article={article} content={content} /> : null}
    </div>
  );
}

export async function getStaticPaths() {
  const articles = fetchArticlesContent("fr");
  const paths = articles.map((item) => ({
    params: { path: item.slug },
  }));
  return { paths, fallback: false };
}

export const getStaticProps = async ({ params, locale }) => {
  const article = fetchArticleContent(params.path, "fr");
  const mdxSource = await renderToString(article.content, { components });
  const gal = [];
  const galleries = article.galleries.map((item) =>
    item.galleries ? gal.push(item.galleries) : "Galeries Paris"
  );

  const language = locale || null;
  return {
    props: {
      article,
      mdxSource,
      gal,
      language,
      params,
    },
  };
};
