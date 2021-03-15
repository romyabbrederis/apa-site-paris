import menu_fr from "../../meta/menu_fr.yml";

export type MenuContent = {
  readonly slug: string;
  readonly name: string;
};

let menu: MenuContent[]

export function getMenu(language: string): any {
  if (menu === "en") {
    menu = menu_fr.items
  } else {
    menu = menu_fr.items
  }
  return menu
} 