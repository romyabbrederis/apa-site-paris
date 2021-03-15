import { AboutContent } from "../../lib/abouts";

type Props = {
  data: AboutContent;
  title: string;
};

export default function About({ title, data }: Props) {
  return (
   <div>
     <h1>{title}</h1>
   </div>
  );
}
