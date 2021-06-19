const fs = require("fs");
const globby = require("globby");

async function generateSiteMap() {
  const pages = await globby([
    "./src/pages/**/*.tsx",
    "./src/pages/*.tsx",
    "!./src/pages/**/[path].tsx",
    "!./src/pages/[path].tsx",
    "!./src/pages/_*.tsx",
    "!./src/pages/api",
    "!./src/pages/interne.tsx",
  ]);

  const articles = await globby(["./src/content/article/fr/*.mdx"]);
  const programmes = await globby(["./src/content/programme/fr/*.mdx"]);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          ${pages
            .map((page) => {
              const path = page
                .replace("./src/pages/", "")
                .replace(".tsx", "")
                .replace(".md", "");
              const route = path === "index" ? "" : path;
              return `
                      <url>
                          <loc>${`https://pourlartpourlafrique.fr/${route}`}</loc>
                      </url>
                  `;
            })
            .join("")}

            ${articles
              .map((article) => {
                const path = article
                  .replace("./src/content/article/fr/", "")
                  .replace(".mdx", "");
                const route = "artistes/" + path;
                return `
              <url>
                  <loc>${`https://pourlartpourlafrique.fr/${route}`}</loc>
              </url>
          `;
              })
              .join("")}

              ${programmes
                .map((prog) => {
                  const path = prog
                    .replace("./src/content/programme/fr/", "")
                    .replace(".mdx", "");
                  const route = "programme/" + path;
                  return `
                <url>
                    <loc>${`https://pourlartpourlafrique.fr/${route}`}</loc>
                </url>
            `;
                })
                .join("")}
      </urlset>
  `;

  fs.writeFileSync("public/sitemap.xml", sitemap);
}

generateSiteMap();
