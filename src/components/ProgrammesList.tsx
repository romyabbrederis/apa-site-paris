import React from "react";
import { ProgrammeContent } from "../lib/programmes";

type Props = {
  programmes: ProgrammeContent[];

};
export default function ProgrammesList(programmes: ProgrammeContent[]): any {
  console.log('programmes', programmes)
  return (
    <div className={"container"}>
      <div className={"programmes"}>
        <ul className={"programmes-list"}>
          {programmes.map((item, i) => (
            <li key={i}>
              {item.title}
            </li>
          ))}
        </ul>

      </div>
      <style jsx>{`
        .container {
          display: flex;
          margin: 0 auto;
          max-width: 1200px;
          width: 100%;
          padding: 0 1.5rem;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        li {
          list-style: none;
        }
        .programmes {
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;
        }
        .programmes li {
          margin-bottom: 1.5rem;
        }
        .programmes-list {
          flex: 1 0 auto;
        }
        }
      `}</style>
    </div>
  );
}
