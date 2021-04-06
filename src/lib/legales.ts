import fs from "fs";
import matter from "gray-matter";
import path from "path";
import yaml from "js-yaml";

const legalesDirectory = path.join(process.cwd(), "src/content/legales/fr");
const privacyDirectory = path.join(process.cwd(), "src/content/privacy/fr");

let legalesCache: any;

export function fetchLegales(): any {
  if (legalesCache) {
    return legalesCache;
  }

  const fileNames = fs.readdirSync(legalesDirectory);
  console.log("filenames", fileNames);

  if (fileNames && fileNames.length) {
    const allProgData = fileNames
      .filter((it) => it.endsWith(".mdx"))
      .map((fileName) => {
        const fullPath = path.join(legalesDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const matterResult = matter(fileContents, {
          engines: {
            yaml: (s) =>
              yaml.safeLoad(s, { schema: yaml.JSON_SCHEMA }) as object,
          },
        });

        const matterData = {
          content: matterResult.content,
        };
        console.log("matterData", matterData);
        return matterData;
      });
    console.log(allProgData[0]);
    return allProgData[0];
  } else {
    return {};
  }
}

let privacyCache: any;

export function fetchPrivacy(): any {
  if (privacyCache) {
    return privacyCache;
  }
  const fileNames = fs.readdirSync(privacyDirectory);
  console.log("filenames", fileNames);
  if (fileNames && fileNames.length) {
    const allProgData = fileNames
      .filter((it) => it.endsWith(".mdx"))
      .map((fileName) => {
        const fullPath = path.join(privacyDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const matterResult = matter(fileContents, {
          engines: {
            yaml: (s) =>
              yaml.safeLoad(s, { schema: yaml.JSON_SCHEMA }) as object,
          },
        });

        const matterData = {
          content: matterResult.content,
        };
        console.log("matterData", matterData);
        return matterData;
      });
    console.log(allProgData[0]);
    return allProgData[0];
  } else {
    return {};
  }
}
