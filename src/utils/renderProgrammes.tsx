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
      case "now":
        newData = programmes.filter((item) => item.type === "now");
        return newData;
        break;
      case "past":
        newData = programmes.filter((item) => item.type === "past");
        return newData;
        break;
      case "upcoming":
        newData = programmes.filter((item) => item.type === "upcoming");
        return newData;
        break;
      default:
    }
  };

  return renderFX();
}
