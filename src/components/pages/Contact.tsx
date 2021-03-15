import { ContactContent } from "../../lib/contacts";

type Props = {
  data: ContactContent;
  title: string;
};

export default function Contact({ title, data }: Props) {
  return (
   <div>
     <h1>{title}</h1>
   </div>
  );
}
