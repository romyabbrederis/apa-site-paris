import fs from "fs";
import matter from "gray-matter";
import path from "path";
import yaml from "js-yaml";

const programmesDirectoryEN = path.join(process.cwd(), "src/pages/programme/en");
const programmesDirectoryFR = path.join(process.cwd(), "src/pages/programme/fr");

export type ProgrammeContent = {
  readonly slug: string;
  readonly title: string;
  readonly month: string;
  readonly year: string;
  readonly date: string;
  readonly description: string;
  readonly type: string;
  readonly file: string;
  readonly galleries: string[];
};

let postCache: PostContent[];

export function fetchProgrammeContent(locale: string): ProgrammeContent[] {
  console.log("locale", locale)
  if (postCache) {
    return postCache;
  }

  let directory;

  if (locale === 'en') {
    directory = programmesDirectoryEN
  } else {
    directory = programmesDirectoryFR
  }

  const fileNames = fs.readdirSync(directory);
  console.log('filenames', fileNames)

  const allPostsData = fileNames
    .filter((it) => it.endsWith(".mdx"))
    .map((fileName) => {
      // Read markdown file as string
      const fullPath = path.join(directory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents, {
        engines: {
          yaml: (s) => yaml.safeLoad(s, { schema: yaml.JSON_SCHEMA }) as object,
        },
      });
      const matterData = matterResult.data as {
         slug: string;
        title: string;
        month: string;
        year: string;
        date: string;
        description: string;
        type: string;
        file: string;
        galleries: string[];
      };
      const slug = fileName.replace(/\.mdx$/, "");

      // Validate slug string
      if (matterData.slug !== slug) {
        throw new Error(
          "slug field not match with the path of its content source"
        );
      }

      return matterData;
    });
    console.log('allPostsData', allPostsData)

    postCache = allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
    return postCache;
}