import fs from "fs";
import matter from "gray-matter";
import path from "path";
import yaml from "js-yaml";
import { getGalleryInfos } from "./galleries";

const articlesDirectoryEN = path.join(process.cwd(), "src/content/article/en");
const articlesDirectoryFR = path.join(process.cwd(), "src/content/article/fr");

export type ArticleContent = {
  readonly slug: string;
  readonly title: string;
  readonly intro: string;
  readonly year: string;
  readonly order: string;
  readonly image: string;
  readonly imageCredit: string;
  readonly galleries: any;
  readonly content: string;
  readonly programme: string;
};

export type ImgContent = {
  readonly articleImg: string;
  readonly credit: string;
};

let articleCache: any;

export function fetchArticlesContent(locale: string): any {
  if (articleCache) {
    return articleCache;
  }

  let directory;

  if (locale === "en") {
    directory = articlesDirectoryEN;
  } else {
    directory = articlesDirectoryFR;
  }

  const fileNames = fs.readdirSync(directory);

  if (fileNames && fileNames.length) {
    const allProgData = fileNames
      .filter((it) => it.endsWith(".mdx"))
      .map((fileName) => {
        const fullPath = path.join(directory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const matterResult = matter(fileContents, {
          engines: {
            yaml: (s) =>
              yaml.safeLoad(s, { schema: yaml.JSON_SCHEMA }) as object,
          },
        });

        const matterData = matterResult.data;
        return matterData;
      });

    articleCache = allProgData.sort((a, b) => {
      if (a.order < b.order) {
        return 1;
      } else {
        return -1;
      }
    });
    return articleCache;
  } else {
    return;
  }
}

export function fetchArticleContent(slug: string, locale: string): any {
  let directory;

  if (locale === "en") {
    directory = articlesDirectoryEN;
  } else {
    directory = articlesDirectoryFR;
  }

  const fileNames = fs.readdirSync(directory);
  if (fileNames && fileNames.length && slug) {
    let data = {};
    const findArticle = fileNames
      .filter((it) => it.endsWith(".mdx"))
      .map((fileName) => {
        const fullPath = path.join(directory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        const matterResult = matter(fileContents, {
          engines: {
            yaml: (s) =>
              yaml.safeLoad(s, { schema: yaml.JSON_SCHEMA }) as object,
          },
        });

        const matterData = {
          slug: matterResult.data.slug,
          title: matterResult.data.title,
          intro: matterResult.data.intro,
          date: matterResult.data.date ? matterResult.data.date : "",
          order: matterResult.data.order,
          image: matterResult.data.image,
          imageCredit: matterResult.data.imageCredit
            ? matterResult.data.imageCredit
            : "",
          content: matterResult.content,
          articleImgOne: matterResult.data.articleImgOne
            ? matterResult.data.articleImgOne
            : "",
          creditOne: matterResult.data.creditOne
            ? matterResult.data.creditOne
            : "",
          articleImgTwo: matterResult.data.articleImgTwo
            ? matterResult.data.articleImgTwo
            : "",
          creditTwo: matterResult.data.creditTwo
            ? matterResult.data.creditTwo
            : "",
          artistLink: matterResult.data.artistLink
            ? matterResult.data.artistLink
            : "",
          artistLinkName: matterResult.data.artistLinkName
            ? matterResult.data.artistLinkName
            : "",
          galleries: matterResult.data.galleries
            ? matterResult.data.galleries
            : [],
          programme: matterResult.data.programme
            ? matterResult.data.programme
            : "",
        };

        if (matterData.slug === slug) {
          data = matterData;
        }
      });
    return data;
  } else {
    return {};
  }
}
