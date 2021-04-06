import fs from "fs";
import matter from "gray-matter";
import path from "path";
import yaml from "js-yaml";
import { getGalleryInfos } from "./galleries";

const programmesDirectoryEN = path.join(
  process.cwd(),
  "src/content/programme/en"
);
const programmesDirectoryFR = path.join(
  process.cwd(),
  "src/content/programme/fr"
);

export type ProgrammeContent = {
  readonly slug: string;
  readonly title: string;
  readonly intro: string;
  readonly month: string;
  readonly year: string;
  readonly start: string;
  readonly description: string;
  readonly type: string;
  readonly file: string;
  readonly galleries: any;
};

export type CalendarContent = {
  readonly slug: string;
  readonly title: string;
  readonly intro: string;
  readonly month: string;
  readonly year: string;
  readonly start: string;
  readonly description: string;
  readonly type: string;
  readonly category: string;
  readonly file: string;
  readonly galleries: any;
};

let programmeCache: any;

export function fetchProgrammesContent(locale: string): any {
  console.log("fetchProgrammesContent locale", locale);
  if (programmeCache) {
    return programmeCache;
  }

  let directory;

  if (locale === "en") {
    directory = programmesDirectoryEN;
  } else {
    directory = programmesDirectoryFR;
  }

  const fileNames = fs.readdirSync(directory);
  console.log("filenames", fileNames);

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
        const matterData = matterResult.data as {
          slug: string;
          title: string;
          month: string;
          year: string;
          start: string;
          description: string;
          type: string;
          file: string;
          galleries: string[];
        };
        return matterData;
      });

    programmeCache = allProgData.sort((a, b) => {
      if (a.start > b.start) {
        return 1;
      } else {
        return -1;
      }
    });
    return programmeCache;
  } else {
    return [];
  }
}

let calendarCache: CalendarContent[];

export function findCalendarContent(programmes: any): any {
  console.log("findCalendarContent", programmes);

  if (programmeCache) {
    calendarCache = programmeCache.map((item) => {
      const result = {
        slug: item.slug,
        title: item.title,
        intro: item.intro,
        month: item.month,
        year: item.year,
        start: item.start,
        description: item.description,
        type: item.type,
        category: item.category,
        file: item.file,
        galleries: getGalleryInfos(item.galleries),
      };
      return result;
    });
    return calendarCache;
  } else {
    return [];
  }
}

export function fetchProgrammeContent(slug: string, locale: string): any {
  console.log("fetchProgrammeContent slug", slug, locale);

  let directory;

  if (locale === "en") {
    directory = programmesDirectoryEN;
  } else {
    directory = programmesDirectoryFR;
  }

  const fileNames = fs.readdirSync(directory);
  if (fileNames && fileNames.length && slug) {
    let data = {};
    const findProgramme = fileNames
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
        console.log("matterdata", matterData);
        if (matterData.slug === slug) {
          console.log("matterdata", matterData);
          data = matterData;
        }
      });
    console.log("data", data);
    return data;
  } else {
    return {};
  }
}
