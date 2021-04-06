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
import { getGallery } from "../../lib/galleries";
import { findEventDetails } from "../../lib/galleries";
import { useEffect } from "react";
import CalendarSelected from "../../components/CalendarSelected";
import galleries from "../../../meta/galleries.yml";

type Props = {
  galerie: any;
  language: any;
  params: any;
};

export default function Index({ galerie, language, params }: Props) {
  const router = useRouter();
  const { path } = router.query;
  const url = "/galerie/" + path;
  const title = galerie.title;

  console.log("galerie", galerie);
  return (
    <div>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
    </div>
  );
}

export async function getStaticPaths() {
  const paths = galleries.galleries.map((item) => ({
    params: { path: item.slug },
  }));
  return { paths, fallback: false };
}

export const getStaticProps = async ({ params, locale }) => {
  const galerie = getGallery(params.path);
  const language = locale || null;
  return {
    props: {
      galerie,
      language,
      params,
    },
  };
};
