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
  readonly month: string;
  readonly year: string;
  readonly start: string;
  readonly description: string;
  readonly type: string;
  readonly file: string;
  readonly galleries: any;
};

export type CalendarContent = {
  readonly title: string;
  readonly month: string;
  readonly year: string;
  readonly start: string;
  readonly type: string;
  readonly galleries: any;
};

let programmeCache: ProgrammeContent[];

export function fetchProgrammesContent(locale: string): ProgrammeContent[] {
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
      if (a.start < b.start) {
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

export function findCalendarContent(
  programmes: ProgrammeContent[]
): CalendarContent[] {
  console.log("findCalendarContent", programmes);

  if (programmeCache) {
    calendarCache = programmeCache.map((item) => {
      const result = {
        title: item.title,
        month: item.month,
        year: item.year,
        start: item.start,
        type: item.type,
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
        const matterData = {
          slug: matterResult.data.slug,
          title: matterResult.data.title,
          intro: matterResult.data.intro,
          month: matterResult.data.month,
          year: matterResult.data.year,
          start: matterResult.data.start,
          description: matterResult.data.description,
          type: matterResult.data.type,
          category: matterResult.data.category,
          file: matterResult.data.file,
          galleries: matterResult.data.galleries,
        };
        console.log("matterdata", matterData);
        if (matterData.slug === slug) {
          return matterData;
        }
      });
    return findProgramme[0];
  } else {
    return {};
  }
}
