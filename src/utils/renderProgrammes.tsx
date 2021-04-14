import { useEffect } from "react";
import { ProgrammeContent, CalendarContent } from "../lib/programmes";

// type Props = {
//   programmes: any;
//   type: string;
// };

export function renderProgrammes(programmes, type) {
  let newData;
  const renderFX = () => {
    switch (type) {
      case "en cours":
        newData = programmes.filter((item) => item.type === "en cours");
        return newData;
        break;
      case "prochainement":
        newData = programmes.filter((item) => item.type === "prochainement");
        return newData;
        break;
      case "passé":
        newData = programmes.filter((item) => item.type === "passée");
        return newData;
        break;
      default:
    }

    return newData;
  };

  return renderFX();
}
