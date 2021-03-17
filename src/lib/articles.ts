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
  readonly galleryImages: string[];
};


let articleCache: ArticleContent[];

export function fetchArticleContent(locale: string): ArticleContent[] {
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

      const matterResult = matter(fileContents, {
        engines: {
          yaml: (s) => yaml.safeLoad(s, { schema: yaml.JSON_SCHEMA }) as object,
        },
      });
      const matterData = matterResult.data as {
        slug: string;
        title: string;
        date: string;
        order: string;
        image: string;
        galleryImages: string[];
      };

      const slug = fileName.replace(/\.mdx$/, "");
      if (matterData.slug !== slug) {
        throw new Error(
          "slug field not match with the path of its content source"
        );
      }
      return matterData;
    });
    
    articleCache = allProgData.sort((a, b) => {
      if (a.start < b.start) {
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


