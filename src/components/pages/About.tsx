import { AboutContent } from "../../lib/abouts";
import { COLOR_YELLOW } from "../../../public/styles/general";

type Props = {
  data: AboutContent;
  content: any;
};

export default function About({ data, content }: Props) {
  const { title, text, logo, partners } = data;

  return (
    <div
      className={"layout-container"}
      style={{ backgroundColor: COLOR_YELLOW }}
    >
      <div className={"inner-container"}>
        <div className={"headline-container"}>
          <h1 className={"extreme-title"}>{title}</h1>
          <img src={logo} className={"logo"} />
        </div>
        <p>{content}</p>

        <h3 className={"partner-title"}>Partenaires</h3>
        <div className={"partners-container"}>
          {partners.map((item, i) => (
            <a key={item.link} href={item.link} target="_blank">
              <img
                src={"../../.." + item.partner}
                className={"partner-image"}
              />
              <p>{item.name}</p>
            </a>
          ))}
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 769px) {
          .logo {
            width: 150px;
            object-fit: contain;
            margin: 20px 0;
          }

          .partner-title {
            margin-top: 50px;
          }

          .partner-image {
            width: 150px;
          }

          .partners-container {
            padding: 10px;
            background: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            height: 200px;
          }
        }

        @media (min-width: 769px) {
          .headline-container {
            display: flex;
            justify-content: space-between;
          }

          .logo {
            width: 300px;
            object-fit: contain;
          }

          .partner-title {
            margin-top: 100px;
          }

          .partner-image {
            width: 150px;
          }

          .partners-container {
            padding: 10px;
            background: white;
            display: flex;
            text-align: center;
          }

          p {
            color: black;
            text-align: justify;
            line-height: 1.2em;
          }

          span {
            line-height: 1.2em;
          }
        }
      `}</style>
    </div>
  );
}
