import about_fr from "../content/about/about_fr.json";
import about_en from "../content/about/about_en.json";

export type PartnerContent = {
  readonly name: string;
  readonly link: string;
  readonly partner: string;
}

export type AboutContent = {
  readonly slug: string;
  readonly title: string;
  readonly text: string;
  readonly logo: string;
  readonly partners: PartnerContent[];

};

let AboutPage: AboutContent

export function getAboutPage(language: string): AboutContent {
  if (language === "en") {
    AboutPage = about_en
  } else {
    AboutPage = about_fr
  }
  return AboutPage
} 