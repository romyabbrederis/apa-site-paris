import home_fr from "../content/home/home_fr.json";
import home_en from "../content/home/home_en.json";

export type HomeContent = {
  readonly tltitle: string;
  readonly tlimage: string;
  readonly tllink: string;
  readonly bltitle: string;
  readonly bllink: string;
  readonly bltext: string;
  readonly brtitle: string;
  readonly brlink: string;
  readonly brimage: string;
};

let HomePage: HomeContent;

export function getHomePage(language: string): HomeContent {
  if (language === "en") {
    HomePage = home_en;
  } else {
    HomePage = home_fr;
  }
  return HomePage;
}
