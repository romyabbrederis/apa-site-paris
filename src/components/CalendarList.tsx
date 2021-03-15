import React from "react";
import { CalendarContent } from "../lib/programmes";

type Props = {
  events: CalendarContent[];
};

export default function CalendarsList({ events }:  Props): any {
  console.log('events', events)
  return (
    <div className={"container"}>
      <div className={"events"}>
        <h1>Calendrier</h1>
        <ul className={"events-list"}>
          {events.map((item, i) => (
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
        .events {
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;
        }
        .events li {
          margin-bottom: 1.5rem;
        }
        .events-list {
          flex: 1 0 auto;
        }
        }
      `}</style>
    </div>
  );
}
