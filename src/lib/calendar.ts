// import fs from "fs";
// import matter from "gray-matter";
// import path from "path";
// import yaml from "js-yaml";
// import { ProgrammeContent } from "./programmes";

// export type CalendarContent = {
//   readonly title: string;
//   readonly month: string;
//   readonly year: string;
//   readonly date: string;
//   readonly galleries: string[];
// };

// let calendarCache: CalendarContent[];

// export function findCalendarContent({ programmes }: ProgrammeContent[]): CalendarContent[] {
//   console.log('findCalendarContent', programmes) 
  
//   calendarCache  = programmes.map(item => {
//     const result = {
//       title: item.title,
//       month: item.month,
//       year: item.year,
//       start: item.start,
//       galleries: item.galleries
//     }
//     return result
//   })
//   return calendarCache
// }