import fs from "fs";
import matter from "gray-matter";
import path from "path";
import yaml from "js-yaml";
import { getGalleryInfos } from "./galleries"

const articlesDirectoryEN = path.join(process.cwd(), "src/content/article/en");
const articlesDirectoryFR = path.join(process.cwd(), "src/content/article/fr");

export type ArticleContent = {
  readonly slug: string;
  readonly title: string;
  readonly date: string;
  readonly order: string;
  readonly image: string;
  readonly content: string;
};


let articleCache: ArticleContent[];

export function fetchArticlesContent(locale: string): ArticleContent[] {
  console.log("locale", locale)
  if (articleCache) {
    return articleCache;
  }

  let directory;


  if (locale === 'en') {
    directory = articlesDirectoryEN
  } else {
    directory = articlesDirectoryFR
  }

  const fileNames = fs.readdirSync(directory);
  console.log('filenames', fileNames)

  if (fileNames && fileNames.length) {
    const allProgData = fileNames
    .filter((it) => it.endsWith(".mdx"))
    .map((fileName) => {
      const fullPath = path.join(directory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      console.log('filecontents', fileContents)
      const matterResult = matter(fileContents, {
        engines: {
          yaml: (s) => yaml.safeLoad(s, { schema: yaml.JSON_SCHEMA }) as object,
        },
      });

      const matterData = {
        slug: matterResult.data.slug,
        title: matterResult.data.title,
        date: matterResult.data.date,
        order: matterResult.data.order,
        image: matterResult.data.image,
        content: matterResult.content,
      };
      console.log("matterData", matterData)
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
    return [];
  }
}


export function fetchArticleContent(slug: string, locale: string): ArticleContent {
  console.log("slug", slug, locale)

  let directory;

  if (locale === 'en') {
    directory = articlesDirectoryEN
  } else {
    directory = articlesDirectoryFR
  }

  const fileNames = fs.readdirSync(directory);
  if (fileNames && fileNames.length && slug) {
    const findArticle = fileNames
    .filter((it) => it.endsWith(".mdx"))
    .map((fileName) => {
      const fullPath = path.join(directory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");


      const matterResult = matter(fileContents, {
        engines: {
          yaml: (s) => yaml.safeLoad(s, { schema: yaml.JSON_SCHEMA }) as object,
        },
      });
      const matterData = {
        slug: matterResult.data.slug,
        title: matterResult.data.title,
        date: matterResult.data.date,
        order: matterResult.data.order,
        image: matterResult.data.image,
        content: matterResult.content,
      };
      if (matterData.slug === slug) {
        return matterData
      }
    })
    return findArticle[0]
  } 
}


