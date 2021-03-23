import home_fr from "../content/home/home_fr.json";
import home_en from "../content/home/home_en.json";

export function getHomePage(language: string): any {
  if (language === "en") {
    HomePage = home_en;
  } else {
    HomePage = home_fr;
  }
  return HomePage;
}
