import contact_fr from "../content/contact/contact_fr.json";
import contact_en from "../content/contact/contact_en.json";

export type EmailsContent = {
  readonly name: string;
  readonly email: string;
}

export type FilesContent = {
  readonly name: string;
  readonly file: string;
}

export type ContactContent = {
  readonly slug: string;
  readonly title: string;
  readonly photo: string;
  readonly emails: EmailsContent[];
  readonly subtitle: string;
  readonly files: FilesContent[];

};

let ContactPage: ContactContent

export function getContactPage(language: string): ContactContent {
  if (language === "en") {
    ContactPage = contact_en
  } else {
    ContactPage = contact_fr
  }
  return ContactPage
} 