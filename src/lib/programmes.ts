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
        type: item.type ? item.type : "passée",
        category: item.category ? item.category : "Autre",
        file: item.file ? item.file : "",
        galleries: item.galleries ? getGalleryInfos(item.galleries) : [],
      };
      return result;
    });
    return calendarCache;
  } else {
    return [];
  }
}

export function fetchProgrammeContent(slug: string, locale: string): any {
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
        if (matterData.slug === slug) {
          data = matterData;
        }
      });
    console.log("data", data);
    return data;
  } else {
    return {};
  }
}
