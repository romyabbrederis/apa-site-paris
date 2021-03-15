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
  readonly start: string;
  readonly description: string;
  readonly type: string;
  readonly file: string;
  readonly galleries: string[];
};

export type CalendarContent = {
  readonly title: string;
  readonly month: string;
  readonly year: string;
  readonly date: string;
  readonly galleries: string[];
};

let programmeCache: ProgrammeContent[];

export function fetchProgrammeContent(locale: string): ProgrammeContent[] {
  console.log("locale", locale)
  if (programmeCache) {
    return programmeCache;
  }

  let directory;

  if (locale === 'en') {
    directory = programmesDirectoryEN
  } else {
    directory = programmesDirectoryFR
  }

  const fileNames = fs.readdirSync(directory);
  console.log('filenames', fileNames)

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
        month: string;
        year: string;
        start: string;
        description: string;
        type: string;
        file: string;
        galleries: string[];
      };
      const slug = fileName.replace(/\.mdx$/, "");
      if (matterData.slug !== slug) {
        throw new Error(
          "slug field not match with the path of its content source"
        );
      }

      return matterData;
    });
    console.log('allProgData', allProgData)

    programmeCache = allProgData.sort((a, b) => {
      if (a.start < b.start) {
        return 1;
      } else {
        return -1;
      }
    });
    return programmeCache;
}

// let calendarCache: CalendarContent[];

// export function findCalendarContent(programmes: ProgrammeContent[]): CalendarContent[] {
//   console.log('findCalendarContent', programmes) 
  
//   programmes.map(item => {
//     const result = {
//       title: item.title,
//       month: item.month,
//       year: item.year,
//       start: item.start,
//       galleries: item.galleries
//     }
//     calendarCache.push(result)
//   })

//   return calendarCache
// }